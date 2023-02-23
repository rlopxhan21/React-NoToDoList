import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import "./App.css";
import { Display } from "./component/Display";
import { Form } from "./component/Form";

const theme = createTheme({});

function App() {
  const [entryData, setEntryData] = React.useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))?.entry
      : []
  );
  const [badData, setBadData] = React.useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))?.bad
      : []
  );

  const onSubmitHandler = (frmData) => {
    setEntryData([...entryData, frmData]);
    localStorage.setItem(
      "data",
      JSON.stringify({ entry: [...entryData, frmData], bad: badData })
    );
  };

  const onMoveToBadListHandler = (i) => {
    const newBadList = entryData[i];
    const newEntryData = entryData.filter((item, index) => index !== i);
    setEntryData(newEntryData);
    setBadData([...badData, newBadList]);

    localStorage.setItem(
      "data",
      JSON.stringify({
        entry: newEntryData,
        bad: [...badData, newBadList],
      })
    );
  };

  const onMoveToEntryListHandler = (i) => {
    const newEntryData = badData[i];
    const newBadData = badData.filter((item, index) => index !== i);
    setBadData(newBadData);
    setEntryData([...entryData, newEntryData]);

    localStorage.setItem(
      "data",
      JSON.stringify({
        entry: [...entryData, newEntryData],
        bad: newBadData,
      })
    );
  };

  const onEntryDeleteHandler = (i) => {
    const newEntryData = entryData.filter((item, index) => index !== i);
    setEntryData(newEntryData);
  };

  const onBadDataDeleteHandler = (i) => {
    const newBadData = badData.filter((item, index) => index !== i);
    setBadData(newBadData);
  };

  let entrySum = 0;
  entryData.map((item) => {
    entrySum = +item.no_hrs + entrySum;
  });

  let badSum = 0;
  badData.map((item) => {
    badSum = +item.no_hrs + badSum;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Typography variant="h1" textAlign={"center"}>
          Not To Do List
        </Typography>
        <Form
          dataTransfer={onSubmitHandler}
          entrySum={entrySum}
          badSum={badSum}
        />
        <Display
          entry_list={entryData}
          bad_list={badData}
          entrylist_move={onMoveToEntryListHandler}
          badlist_move={onMoveToBadListHandler}
          delete_entry={onEntryDeleteHandler}
          delete_bad={onBadDataDeleteHandler}
          entrySum={entrySum}
          badSum={badSum}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
