import { Add } from "@mui/icons-material";
import { Alert, Button, Container, Stack, TextField } from "@mui/material";
import React from "react";

export const Form = (props) => {
  const [error, setError] = React.useState(false);
  const [hrsError, setHrsError] = React.useState(false);
  const [input, setInput] = React.useState({});

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setInput({ ...input, [name]: value });
  };

  const onFormSubmitHandler = (event) => {
    event.preventDefault();

    if (+props.entrySum + +props.badSum + +input?.no_hrs > 168) {
      setHrsError(true);
      return;
    }

    if (!input.task && !input.no_hrs) {
      setError("both");
    } else if (!input.task) {
      setError("task");
    } else if (!input.no_hrs) {
      setError("hrs");
    } else {
      setError(false);
      setHrsError(false);
      props.dataTransfer(input);
      setInput({});
    }
  };
  return (
    <Container>
      <Stack component="form" noValidate onSubmit={onFormSubmitHandler} gap={3}>
        <TextField
          id="outlined-basic"
          name="task"
          label="Enter a Task*"
          variant="outlined"
          autoFocus
          onChange={onChangeHandler}
          value={input?.task || ""}
          error={error === "both" || error === "task"}
        />
        <TextField
          id="outlined-number"
          label="No. of Hours*"
          name="no_hrs"
          type="number"
          onChange={onChangeHandler}
          value={input?.no_hrs || ""}
          InputLabelProps={{
            shrink: true,
          }}
          error={error === "both" || error === "hrs"}
        />
        {hrsError && (
          <Alert variant="filled" severity="error">
            Error: Total Allocated number of hours exceeded the total number of
            hours in a week.
          </Alert>
        )}
        {error && (
          <Alert variant="filled" severity="error">
            Error: Invalid Input Received.
          </Alert>
        )}
        <Button
          variant="contained"
          startIcon={<Add />}
          type="submit"
          color="success"
        >
          Add Task
        </Button>
      </Stack>
    </Container>
  );
};
