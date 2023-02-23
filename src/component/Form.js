import { Add } from "@mui/icons-material";
import { Alert, Button, Container, Stack, TextField } from "@mui/material";
import React from "react";

export const Form = (props) => {
  const [error, setError] = React.useState("no_error");
  const [hrsError, setHrsError] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const [inputNum, setInputNum] = React.useState("");

  const onInputTextChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  const onInputNumChangeHandler = (event) => {
    setInputNum(event.target.value);
  };

  const onFormSubmitHandler = (event) => {
    event.preventDefault();

    const task = event.target.task.value;
    const no_hrs = event.target.number_hrs.value;

    if (+props.entrySum + +props.badSum + +no_hrs > 168) {
      setHrsError(true);
      return;
    }

    if ((task.length === 0) & (no_hrs.length === 0)) {
      setError("both");
    } else {
      setError(true);
      props.dataTransfer({ task, no_hrs });
      setInputNum("");
      setInputText("");
    }
  };
  return (
    <Container>
      <Stack component="form" noValidate onSubmit={onFormSubmitHandler} gap={3}>
        {hrsError && (
          <Alert variant="filled" severity="error">
            Error: Total Allocated number of hours exceeded the total number of
            hours in a week.
          </Alert>
        )}
        <TextField
          id="outlined-basic"
          name="task"
          label="Enter a Task*"
          variant="outlined"
          onChange={onInputTextChangeHandler}
          value={inputText}
          error={error === "both"}
        />
        <TextField
          id="outlined-number"
          label="No. of Hours*"
          name="number_hrs"
          type="number"
          onChange={onInputNumChangeHandler}
          value={inputNum}
          InputLabelProps={{
            shrink: true,
          }}
          error={error === "both" || error === "hrs"}
        />
        <Button variant="contained" startIcon={<Add />} type="submit">
          Add Task
        </Button>
      </Stack>
    </Container>
  );
};
