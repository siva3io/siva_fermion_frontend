import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          padding: "4px",
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
          borderRight: "1px solid rgb(250 250 250)",

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
/*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License v3.0 as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License v3.0 for more details.
 You should have received a copy of the GNU Lesser General Public License v3.0
 along with this program.  If not, see <https://www.gnu.org/licenses/lgpl-3.0.html/>.
*/
