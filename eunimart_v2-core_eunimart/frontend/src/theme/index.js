import { createTheme } from "@mui/material";

const theme = createTheme({
  

  components: {
    
    MuiBox: {
      styleOverrides: {
        root: {
          padding:"4px"
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: "0px !important",
          paddingRight: "0px !important",
          width: "100%",
        },
      },
    },
  },
});
export default theme;

export const theme1 = createTheme({
  components: {
    MuiBox: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          padding: "4px",

        },
      },
    },
    // Name of the component
    MuiToolbar: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          position: "fixed",
          // backgroundColor: "#fff",
          width: "100%",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        // Name of the slot
        paper: {
          // Some CSS
          backgroundColor: "#001661",
          color: "#54DFFF",
          borderRight: "1px solid rgb(250 250 250)"

          // width:"56px",
          // height:"56px"
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          width: "12%",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          overflowY: "scroll",

        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          textTransform: "capitalize",
        },
      },
    },
  },
});