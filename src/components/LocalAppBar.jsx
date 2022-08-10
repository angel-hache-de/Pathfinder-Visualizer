import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

function LocalAppBar({ mode, toggleMode }) {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h5" color="inherit" component="div" mx={"auto"}>
          Breadth First Search (BFS)
        </Typography>
        <IconButton size="large" color="inherit" onClick={() => toggleMode()}>
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default LocalAppBar;
