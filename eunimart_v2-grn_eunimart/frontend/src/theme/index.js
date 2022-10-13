import { createTheme } from "@mui/material";
import colors from "./colors";
// @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap");
const theme = createTheme({
  typography: {
    // fontFamily: "Poppins",
    // fontWeightLight: 200,
    // fontWeightMedium: 500,
    // fontWeightBold: 600,
  },
  palette: {
    primary: {
      main: colors.primary,
      dark: colors.darkPrimary,
      success: colors.success,
      // secondary: colors.secondary,
      // neonPurple: colors.neonPurple,
      // indigoThree: colors.indigoThree,
      // black: colors.black,
      // pink: colors.pink,
      // barbiePink: colors.barbiePinkTwo,
      // oragne: colors.oragne,
      // skyBlue: colors.skyBlue,
      // purple80: colors.purple80,
      // purple90: colors.purple90,
      // purple100: colors.purple100,
    },
    secondary: {
      main: colors.primaryBtn,
      // barbiePinkTwo: colors.barbiePinkTwo,
      // lightBlue: colors.lightBlue,
      // lightRed: colors.lightRed,
      // red10: colors.red10,
      // lightGray: colors.lightGray,
      // gray50: colors.gray50,
      // gray80: colors.gray80,
      // gray10: colors.gray10,
      // white: colors.white,
      // borderColor: colors.borderColor,
    },
    white: {
      main: colors.white,
    },
    // text: {
    //   primary: colors.primary,
    // },
    gradient: (direction, startColor, endColor) => {
      return `linear-gradient(${direction}, ${startColor}, ${endColor})`;
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "test" },
          style: {
            backgroundColor: colors.defaultState,
            borderRadius: "2px",
            padding: "8px 16px",
            minWidth: "130px",
            textTransform: "capitalize",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: colors.hover,
              boxShadow: "none",
            },
          },
        },

        {
          props: { variant: "contained" },
          style: {
            borderRadius: "5px",
            textTransform: "capitalize",
            "&:hover": {
              background: "secondary",
            },
          },
        },
      ],
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          // width: "100%",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },

    // MuiTabs: {
    //   styleOverrides: {
    //     root: {
    //       overflow: 'auto',
    //     },
    //   },
    // },
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 576,
  //     md: 768,
  //     lg: 991,
  //     xl: 1440,
  //   },
  // },
});
export default theme;
