export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          // primary: amber,
          // divider: amber[200],
          // text: {
          //   primary: grey[900],
          //   secondary: grey[800],
          // },
          primary: {
            main: "#145DA0",
          },
          secondary: {
            main: "#edf2ff",
          },
          buttons: {
            main: "#2E8BC0",
            contrastText: "#ffffff",
          },
          icons: {
            main: "black",
          },
          links: {
            main: "blue"
          }
        }
      : {
          // palette values for dark mode
          // primary: deepOrange,
          // divider: deepOrange[700],
          // background: {
          //   default: deepOrange[900],
          //   paper: deepOrange[900],
          // },
          // text: {
          //   primary: '#fff',
          //   secondary: grey[500],
          // },
          primary: {
            main: "#44444C",
          },
          secondary: {
            main: "#D6D6D6",
          },
          buttons: {
            main: "#495057",
            contrastText: "#ffffff",
          },
          icons: {
            main: "#f4f3ee",
          },
          links: {
            main: "white"
          }
        }),
  },
});
