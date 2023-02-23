import { ArrowRightAlt, Delete, KeyboardBackspace } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

export const Display = (props) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      marginTop={4}
      justifyContent={{ xs: "center", md: "space-between" }}
      mx={2}
    >
      <Box width={{ xs: "90%", md: "45%" }} margin={{ xs: "auto" }}>
        <Typography variant="h4" textAlign={"center"}>
          Entry List
        </Typography>
        <Stack textAlign={"start"}>
          {props.entry_list.map((item, i) => (
            <Stack
              direction={"row"}
              justifyContent="space-between"
              marginBottom={2}
              key={i}
            >
              <Button disabled>{item.task}</Button>
              <Button disabled>{item.no_hrs} Hours</Button>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Tooltip title="Delete" placement="top">
                  <Button
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => props.delete_entry(i)}
                  >
                    Delete
                  </Button>
                </Tooltip>
                <Tooltip title="Move to Bad List" placement="top">
                  <Button
                    startIcon={<ArrowRightAlt />}
                    color="success"
                    onClick={() => props.badlist_move(i)}
                  >
                    Move
                  </Button>
                </Tooltip>
              </ButtonGroup>{" "}
            </Stack>
          ))}
        </Stack>
        {!(props.entry_list.length === 0) && (
          <Typography variant="h6" textAlign={"center"}>
            The total hours allocated for this week is {props.entrySum} Hours
          </Typography>
        )}
      </Box>
      <Box width={{ xs: "90%", md: "45%" }} margin={{ xs: "auto" }}>
        <Typography variant="h4" textAlign={"center"}>
          Bad List
        </Typography>
        <Stack textAlign={"start"}>
          {props.bad_list.map((item, i) => (
            <Stack
              direction={"row"}
              justifyContent="space-between"
              marginBottom={2}
              key={i}
            >
              <Button disabled>{item.task}</Button>
              <Button disabled>{item.no_hrs} Hours</Button>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Tooltip title="Delete">
                  <Button
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => props.delete_bad(i)}
                  >
                    {" "}
                    Delete
                  </Button>
                </Tooltip>
                <Tooltip title="Move to Entry List">
                  <Button
                    onClick={() => props.entrylist_move(i)}
                    startIcon={<KeyboardBackspace />}
                    color="warning"
                  >
                    Move
                  </Button>
                </Tooltip>
              </ButtonGroup>{" "}
            </Stack>
          ))}
        </Stack>
        {!(props.bad_list.length === 0) && (
          <Typography variant="h6" textAlign={"center"}>
            You can save: {props.badSum} Hours
          </Typography>
        )}
      </Box>
    </Stack>
  );
};
