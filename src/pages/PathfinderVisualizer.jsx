import React, { useCallback, useMemo, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

import AccordionInfo from "../components/AccordionInfo";
import Board from "../components/Board";
import LocalAppBar from "../components/LocalAppBar";
import { getDesignTokens } from "../utils/theme";

import "./PathfinderVisualizer.css";

function PathfinderVisualizer() {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const [open, setOpen] = useState(false);
  const handleOnClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOnClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AccordionInfo open={open} handleOnClose={handleOnClose} />
      <LocalAppBar toggleMode={colorMode.toggleColorMode} mode={mode} />
      <div className={`container ${mode === "dark" && "dark-mode"}`}>
        <Board handleOnClickOpen={handleOnClickOpen} />
      </div>
    </ThemeProvider>
  );
}

export default PathfinderVisualizer;
