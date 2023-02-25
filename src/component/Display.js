import { ArrowRightAlt, Delete, KeyboardBackspace } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

export const Display = (props) => {
  const smallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      marginTop={4}
      justifyContent={{ xs: "center", md: "space-between" }}
      alignItems="flex-start"
      mx={2}
    >
      <Box width={{ xs: "90%", md: "45%" }} margin={{ xs: "auto" }}>
        <Typography variant="h4" textAlign={"center"}>
          Entry List
        </Typography>
        <Stack
          height={"400px"}
          overflow="scroll"
          p={2}
          marginBottom={2}
          sx={{ border: "1px solid #dee2e6", borderRadius: "10px" }}
        >
          {props.entry_list.length === 0 && (
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              disabled
            >
              No Data Found!
            </Button>
          )}
          {props.entry_list.map((item, i) => (
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={"center"}
              p={2}
              marginBottom={2}
              key={i}
              sx={{ background: "#f8f9fa", borderRadius: "10px" }}
            >
              <Typography variant="button">{item.task}</Typography>
              <Typography variant="button">{item.no_hrs} Hours</Typography>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined primary button group"
                fullWidth={smallScreen ? true : false}
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
              </ButtonGroup>
            </Stack>
          ))}
        </Stack>
        {!(props.entry_list.length === 0 && props.bad_list.length === 0) && (
          <Typography variant="h6" textAlign={"center"}>
            The total hours allocated for this week is {props.entrySum} Hours
          </Typography>
        )}
      </Box>
      <Box width={{ xs: "90%", md: "45%" }} margin={{ xs: "auto" }}>
        <Typography variant="h4" textAlign={"center"}>
          Bad List
        </Typography>
        <Stack
          textAlign={"start"}
          height={"400px"}
          overflow="scroll"
          p={2}
          marginBottom={2}
          sx={{ border: "1px solid #dee2e6", borderRadius: "10px" }}
        >
          {props.bad_list.length === 0 && (
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              disabled
            >
              No Data Found!
            </Button>
          )}
          {props.bad_list.map((item, i) => (
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={"center"}
              p={2}
              marginBottom={2}
              key={i}
              sx={{ background: "#f8f9fa", borderRadius: "10px" }}
            >
              <Typography variant="button">{item.task}</Typography>
              <Typography variant="button">{item.no_hrs} Hours</Typography>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined primary button group"
                fullWidth={smallScreen ? true : false}
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
