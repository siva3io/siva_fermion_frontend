import React, { useEffect, useRef, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AirplayIcon from "@mui/icons-material/Airplay";
import InventoryIcon from "@mui/icons-material/Inventory";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import FolderIcon from "@mui/icons-material/Folder";
import LOGO from "../Assets/Images/Logo.png";
import Mdm from "../Assets/Icons/MDM.svg";
import Orders from "../Assets/Icons/Orders.svg";
import Inventory from "../Assets/Icons/Inventory.svg";
import Accounting from "../Assets/Icons/Accounting.svg";
import Returns from "../Assets/Icons/Returns.svg";
import Omini from "../Assets/Icons/Omnichannel.svg";
import CLOSE from "../Assets/Icons/open.svg";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import MailIcon from "@mui/icons-material/Mail";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  CardMedia,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  Box,
  Divider,
  ListItemIcon,
} from "@mui/material";

//analytics
import useAnalyticsEventTracker from "../useAnalyticsEventTracker";
import { useNavigate } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";

import ChatBot from "../Components/ChatBot";
import logo from "../Components/Chatbot.png";

const drawerWidth = 240;

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = theme => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
// const reloadPage = () =>{
const reloadPage = () => {
  window.location.reload();
  console.log("reloadPage");
  // window.open("https://frontend.eunimart.com/salesOrders","_self")
};
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // {...other}
    >
      {value === index && (
        <Box>
          {/* sx={{ p: 1, background: "#f9f9f9 !important" }} */}
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MiniDrawer({ sessionId }) {
  const [display, setDisplay] = useState(false);

  //analytics
  const gaEventTracker = useAnalyticsEventTracker("Contact us");
  //
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTabName("orders");
    setOptionSelected(ORDERS);
  }, []);
  const drawerWidth = 240;

  //mdm
  const contacts = useRef(null);
  const products = useRef(null);
  const locations = useRef(null);
  const uom = useRef(null);
  const pricing = useRef(null);
  const basicLocations = useRef(null);
  //orders
  const salesOrders = useRef(null);
  const ist = useRef(null);
  const scrapOrders = useRef(null);
  const deliveryOrders = useRef(null);
  const purchaseOrders = useRef(null);
  //inventory
  // const inventory = useRef(null);
  // const manualReplanishment = useRef(null);
  const asn = useRef(null);
  const grn = useRef(null);
  const inventoryAdjustment = useRef(null);
  const inventory = useRef(null);
  //inventory tasks
  const pickList = useRef(null);
  const cycleCount = useRef(null);
  //accounting
  const salesInvoice = useRef(null);
  const purchaseInvoice = useRef(null);
  const debitNote = useRef(null);
  const creditNote = useRef(null);
  const currencyExchange = useRef(null);
  const paymentTermsRecordPayment = useRef(null);
  //returns management
  const purchaseReturns = useRef(null);
  const salesReturns = useRef(null);
  //shipping management
  const shippingOrders = useRef(null);
  const ndr = useRef(null);
  const wd = useRef(null);
  const rto = useRef(null);
  //omnichannel hub
  const virtualWarehouse = useRef(null);
  const retail = useRef(null);
  const webstores = useRef(null);
  const marketplaces = useRef(null);
  const logisticsPartners = useRef(null);
  const localWarehouse = useRef(null);
  const appStore = useRef(null);

  const [askSessionId, setAskSessionId] = useState(null);

  const askSessionIdHandler = (name, ref) => {
    let details = { type: name, data: localStorage.getItem("token") };
    postCrossDomainMessage(details, ref);

    // setAskSessionId(name);
    // sendSessionIdHandler(name, ref);
  };

  // const sendSessionIdHandler = (name, ref) => {
  // let details = { type: name, data: { sessionId } };
  // postCrossDomainMessage(details, ref);
  // };

  const postCrossDomainMessage = (msg, ref) => {
    let win = ref.current.contentWindow;
    setTimeout(() => {
      win.postMessage(msg, "*");
    }, 2000);
  };

  const [openDrop, setOpenDrop] = React.useState(false);
  const [openOrder, setOpenOrder] = React.useState(false);
  const [openInventory, setOpenInventory] = React.useState(false);
  const [openInventoryTask, setOpenInventoryTask] = React.useState(false);
  const [openAccounting, setOpenAccounting] = React.useState(false);
  const [openReturnsManagement, setOpenReturnsManagement] =
    React.useState(false);
  const [openShippingManagement, setOpenShippingManagement] =
    React.useState(false);
  const [openOmnichannelHub, setOpenOmnichannelHub] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [openAppStore, setOpenAppStore] = React.useState(false);

  const MDM = [
    "Products",
    "Contacts",
    "Locations",
    "UOM",
    "Pricing",
    "Inventory-Decentralized",
    // "Basic Locations",
  ];
  const ORDERS = [
    "Sales orders",
    "IST",
    "Scrap Orders",
    "Delivery Orders",
    "Purchase Orders",
  ];
  const INVENTORY = ["ASN", "GRN", "Inventory Adjustment"];
  const INVENTORY_TASKS = ["Pick List", "Cycle Count"];
  // const INVOICING = ["Invoicing"];
  const ACCOUNTING = [
    "Sales Invoice",
    "Purchase Invoice",
    "Debit Note",
    "Credit Note",
    "Currency & Exchange",
    "Payment Terms & Record Payment",
  ];

  const RETURNS_MANAGEMENT = ["Purchase Returns", "Sales Returns"];

  const SHIPPING_MANAGEMENT = ["Shipping Orders", "NDR", "RTO", "WD"];
  const OMNICHANNEL_HUB = [
    "Virtual Warehouse",
    "Retail",
    "Webstores",
    "Marketplaces",
    "Logistics Partners",
    "Local Warehouse",
  ];

  const SETTINGS = ["Logout"];

  const [optionSelected, setOptionSelected] = useState(ORDERS);
  const [tabName, setTabName] = useState();
  const handleClick = () => {
    setOpenDrop(!openDrop);
    setOpenOrder(false);
    setOpenInventory(false);
    setOpenInventoryTask(false);
    setOpenAccounting(false);
    setOpenReturnsManagement(false);
    setOpenShippingManagement(false);
    setOpenOmnichannelHub(false);
    setOpenSettings(false);
    setTabName("mdm");
    setOptionSelected(MDM);
  };

  const handleOrderClick = () => {
    setOpenOrder(!openOrder);
    setOpenDrop(false);
    setOpenInventory(false);
    setOpenInventoryTask(false);
    setOpenAccounting(false);
    setOpenReturnsManagement(false);
    setOpenShippingManagement(false);
    setOpenOmnichannelHub(false);
    setOpenSettings(false);
    setOptionSelected(ORDERS);
    setTabName("orders");
  };

  const handleInventoryClick = () => {
    setOpenInventory(!openInventory);
    setOpenDrop(false);
    setOpenOrder(false);
    setOpenInventoryTask(false);
    setOpenAccounting(false);
    setOpenReturnsManagement(false);
    setOpenShippingManagement(false);
    setOpenOmnichannelHub(false);
    setOpenSettings(false);
    setOptionSelected(INVENTORY);
    setTabName("inventory");
  };
  const handleInventoryTaskClick = () => {
    setOpenInventoryTask(!openInventoryTask);
    setOpenDrop(false);
    setOpenOrder(false);
    setOpenInventory(false);
    setOpenAccounting(false);
    setOpenReturnsManagement(false);
    setOpenShippingManagement(false);
    setOpenOmnichannelHub(false);
    setOpenSettings(false);
    setOptionSelected(INVENTORY_TASKS);
    setTabName("inventoryTask");
  };

  const handleAccountingClick = () => {
    setOpenAccounting(!openAccounting);
    setOpenDrop(false);
    setOpenOrder(false);
    setOpenInventory(false);
    setOpenInventoryTask(false);
    setOpenReturnsManagement(false);
    setOpenShippingManagement(false);
    setOpenOmnichannelHub(false);
    setOpenSettings(false);
    setOptionSelected(ACCOUNTING);
    setTabName("accounting");
  };

  const handleReturnsManagementClick = () => {
    setOpenReturnsManagement(!openReturnsManagement);
    setOpenDrop(false);
    setOpenOrder(false);
    setOpenInventory(false);
    setOpenInventoryTask(false);
    setOpenAccounting(false);
    setOpenShippingManagement(false);
    setOpenOmnichannelHub(false);
    setOpenSettings(false);
    setOptionSelected(RETURNS_MANAGEMENT);
    setTabName("returnsManagement");
  };

  const handleShippingManagementClick = () => {
    setOpenShippingManagement(!openShippingManagement);
    setOpenDrop(false);
    setOpenOrder(false);
    setOpenInventory(false);
    setOpenInventoryTask(false);
    setOpenAccounting(false);
    setOpenReturnsManagement(false);
    setOpenOmnichannelHub(false);
    setOpenSettings(false);
    setOptionSelected(SHIPPING_MANAGEMENT);
    setTabName("shippingManagement");
  };

  const handleOmnichannelHubClick = () => {
    setOpenOmnichannelHub(!openOmnichannelHub);
    setOpenDrop(false);
    setOpenOrder(false);
    setOpenInventory(false);
    setOpenInventoryTask(false);
    setOpenAccounting(false);
    setOpenReturnsManagement(false);
    setOpenShippingManagement(false);
    setOpenSettings(false);
    setOptionSelected(OMNICHANNEL_HUB);
    setTabName("omnichannelHub");
  };

  const handleSettingsClick = () => {
    console.log("handleSettingsClick");
    setOpenSettings(!openSettings);
    // setOpenDrop(false);
    // setOpenOrder(false);
    // setOpenInventory(false);
    // setOpenInventoryTask(false);
    // setOpenAccounting(false);
    // setOpenReturnsManagement(false);
    // setOpenShippingManagement(false);
    // setOpenOmnichannelHub(false);
    // setOptionSelected(SETTINGS);
    // setTabName("settings");
  };

  const handleAppStoreClick = () => {
    setOpenAppStore(!openAppStore);
    setOpenDrop(false);
    setOpenOrder(false);
    setOpenInventory(false);
    setOpenInventoryTask(false);
    setOpenAccounting(false);
    setOpenReturnsManagement(false);
    setOpenShippingManagement(false);
    setOpenSettings(false);
    setOptionSelected(APP_STORE);
    setTabName("appStore");
  };
  const APP_STORE = ["eunimart appstore"];

  const logOut = () => {
    console.log("logOut");
    localStorage.clear();
    navigate("/login");
  };

  const theme1 = createTheme({
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

  return (
    <>
      <ThemeProvider theme={theme1}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/* <AppBar position="fixed" open={open}>
          <Toolbar>
            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                color: "#001661",

                ...(open && { display: "none" }),
              }}
            >
              <MenuOpenIcon />
            </IconButton> */}
          {/* <CardMedia
              sx={{
                objectFit: "contain",
                // background: "#001661",
                height: "47px",
              }}
              component="img"
              image="https://eunimart.com/wp-content/uploads/2021/10/Full-width-logo-1200-Px-5.png"
              alt="Paella dish"
            />

            <Box sx={{ flexGrow: 2 }} />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              sx={{
                marginRight: 1,
                color: "#001661",
                ...(open && { display: "flex"}),
              }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              sx={{
                marginRight: 2,
                color: "#001661",
                ...(open && {  display: "flex",marginRight:"240px" }),
              }}
            >
              <NotificationsNoneIcon />
            </IconButton>
          </Toolbar> */}
          {/* </AppBar>  */}
          <Drawer variant="permanent" open={open}>
            <DrawerHeader style={{ background: "#FAFAFA" }}>
              <ListItemButton
                // onClick={() => {
                //   handleClick();
                //   setValue(0);
                // }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  background: "#FAFAFA",
                }}
              >
                <ListItemIcon
                  sx={{
                    maxWidth: "10px",
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    height: "47px",
                    // color: "#54DFFF",

                    ...(open && { display: "none" }),
                  }}
                >
                  <img src={LOGO} onClick={reloadPage} />
                </ListItemIcon>
                <CardMedia
                  sx={{
                    objectFit: "contain",
                    background: "#FAFAFA",
                    height: "47px",
                    width: "210px",
                    // ...(open && { display: "none" }),
                    // ...(open != { display: "none" }),
                  }}
                  component="img"
                  image="https://eunimart.com/wp-content/uploads/2021/10/Full-width-logo-1200-Px-5.png.webp"
                  alt="Paella dish"
                  onClick={reloadPage}
                />
              </ListItemButton>
            </DrawerHeader>
            {/* <Divider /> */}
            <List style={{ backgroundColor: "#001661" }}>
              {/* MDM */}
              <IconButton
                // color="inherit"
                style={{ color: "#54DFFF", marginLeft: "10px" }}
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  // marginRight: 5,
                  marginLeft: "3px",
                  color: "#001661",

                  ...(open && { display: "none" }),
                }}
              >
                {/* <MenuOpenIcon /> */}
                <img src={CLOSE} />
              </IconButton>
              <IconButton
                onClick={handleDrawerClose}
                style={{ color: "#54DFFF", marginLeft: "190px" }}
              >
                {theme.direction === "rtl" ? (
                  <MenuOpenIcon color="#54DFFF" />
                ) : (
                  <MenuOpenIcon color="#54DFFF" />
                )}
              </IconButton>
              <ListItemButton
                onClick={() => {
                  handleClick();
                  setValue(0);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#54DFFF",
                  }}
                >
                  {/* <FolderIcon /> */}
                  <img src={Mdm} />
                </ListItemIcon>
                <ListItemText primary="MDM" value="MDM" />
                {/* onMouseOver={handleOver} */}
                {open ? (
                  openDrop ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                ) : null}
              </ListItemButton>

              {open && (
                <Collapse in={openDrop} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {MDM.map((item, index) => {
                      return (
                        <ListItemButton
                          sx={{ pl: 4, background: "#001661" }}
                          onClick={() => {
                            //   handleClick();
                            gaEventTracker(item);
                            setValue(index);
                          }}
                        >
                          <ListItemText primary={item} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}

              {/* ORDERS */}
              <ListItemButton
                onClick={() => {
                  handleOrderClick();
                  setValue(0);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#54DFFF",
                  }}
                >
                  {/* <AutoAwesomeMosaicIcon /> */}
                  <img src={Orders} />
                </ListItemIcon>
                <ListItemText primary="Order" value="Order" />
                {/* onMouseOver={handleOver} */}
                {open ? (
                  openOrder ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                ) : null}
              </ListItemButton>

              {open && (
                <Collapse in={openOrder} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {ORDERS.map((item, index) => {
                      return (
                        <ListItemButton
                          sx={{ pl: 4, background: "#001661" }}
                          onClick={() => {
                            //   handleOrderClick();
                            gaEventTracker(item);
                            setValue(index);
                          }}
                        >
                          <ListItemText primary={item} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}

              {/* Inventory */}
              <ListItemButton
                onClick={() => {
                  handleInventoryClick();
                  setValue(0);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#54DFFF",
                  }}
                >
                  {/* <InventoryIcon /> */}
                  <img src={Inventory} />
                </ListItemIcon>
                <ListItemText primary="Inventory" value="Inventory" />
                {/* onMouseOver={handleOver} */}
                {open ? (
                  openInventory ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                ) : null}
              </ListItemButton>

              {open && (
                <Collapse in={openInventory} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {INVENTORY.map((item, index) => {
                      return (
                        <ListItemButton
                          sx={{ pl: 4, background: "#001661" }}
                          onClick={() => {
                            //   handleInventoryClick();
                            gaEventTracker(item);
                            setValue(index);
                          }}
                        >
                          <ListItemText primary={item} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
              {/* Inventory task */}
              <ListItemButton
                onClick={() => {
                  handleInventoryTaskClick();
                  setValue(0);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#54DFFF",
                  }}
                >
                  <InventoryOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory Task" value="Inventory Task" />
                {/* onMouseOver={handleOver} */}
                {open ? (
                  openInventoryTask ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                ) : null}
              </ListItemButton>

              {open && (
                <Collapse in={openInventoryTask} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {INVENTORY_TASKS.map((item, index) => {
                      return (
                        <ListItemButton
                          sx={{ pl: 4, background: "#001661" }}
                          onClick={() => {
                            //   handleInventoryTaskClick();
                            setValue(index);
                          }}
                        >
                          <ListItemText primary={item} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
              {/* Accounting */}
              <ListItemButton
                onClick={() => {
                  handleAccountingClick();
                  setValue(0);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#54DFFF",
                  }}
                >
                  {/* <AccountBalanceIcon /> */}
                  <img src={Accounting} />
                </ListItemIcon>
                <ListItemText primary="Accounting" value="Accounting" />
                {/* onMouseOver={handleOver} */}
                {open ? (
                  openAccounting ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                ) : null}
              </ListItemButton>

              {open && (
                <Collapse in={openAccounting} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {ACCOUNTING.map((item, index) => {
                      console.log(">>>>>", item);
                      return (
                        <ListItemButton
                          sx={{ pl: 4, background: "#001661" }}
                          onClick={() => {
                            //   handleAccountingClick();
                            setValue(index);
                          }}
                        >
                          <ListItemText primary={item} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
              {/* Return management */}
              <ListItemButton
                onClick={() => {
                  handleReturnsManagementClick();
                  setValue(0);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#54DFFF",
                  }}
                >
                  {/* <InboxIcon /> */}
                  <img src={Returns} />
                </ListItemIcon>
                <ListItemText
                  primary="Returns Management"
                  value="Returns Management"
                />
                {/* onMouseOver={handleOver} */}
                {open ? (
                  openReturnsManagement ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                ) : null}
              </ListItemButton>

              {open && (
                <Collapse
                  in={openReturnsManagement}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {RETURNS_MANAGEMENT.map((item, index) => {
                      return (
                        <ListItemButton
                          sx={{ pl: 4, background: "#001661" }}
                          onClick={() => {
                            //   handleReturnsManagementClick();
                            setValue(index);
                          }}
                        >
                          <ListItemText primary={item} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
              {/* Shipping management */}
              <ListItemButton
                onClick={() => {
                  handleShippingManagementClick();
                  setValue(0);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#54DFFF",
                  }}
                >
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Shipping Management"
                  value="Shipping Management"
                />
                {/* onMouseOver={handleOver} */}
                {open ? (
                  openShippingManagement ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                ) : null}
              </ListItemButton>

              {open && (
                <Collapse
                  in={openShippingManagement}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {SHIPPING_MANAGEMENT.map((item, index) => {
                      return (
                        <ListItemButton
                          sx={{ pl: 4, background: "#001661" }}
                          onClick={() => {
                            //   handleShippingManagementClick();
                            setValue(index);
                          }}
                        >
                          <ListItemText primary={item} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
              {/* Omnichannel hub */}
              <ListItemButton
                onClick={() => {
                  handleOmnichannelHubClick();
                  setValue(0);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#54DFFF",
                  }}
                >
                  {/* <AirplayIcon /> */}
                  <img src={Omini} />
                </ListItemIcon>
                <ListItemText primary="OmnichannelHub" value="OmnichannelHub" />
                {/* onMouseOver={handleOver} */}
                {open ? (
                  openOmnichannelHub ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                ) : null}
              </ListItemButton>
              {open && (
                <Collapse in={openOmnichannelHub} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {OMNICHANNEL_HUB.map((item, index) => {
                      return (
                        <ListItemButton
                          sx={{ pl: 4, background: "#001661" }}
                          onClick={() => {
                            //   handleOmnichannelHubClick();
                            setValue(index);
                          }}
                        >
                          <ListItemText primary={item} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </List>
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            {/* <Divider /> */}
            <List style={{ backgroundColor: "#001661", marginTop: "auto" }}>
              {/* settings */}
              {/*  < ListItemButton
            onClick = {() => {
              handleSettingsClick();
            setValue(0);
            }}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "#54DFFF",
              }}
            >
              <SettingsIcon/>
            </ListItemIcon>
            <ListItemText primary="Settings" value="Settings" />
            {open ? (
              openSettings ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )
            ) : null}
          </ListItemButton> */}
              {open && (
                <Collapse in={openSettings} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {SETTINGS.map((item, index) => {
                      return (
                        <ListItemButton
                          sx={{ pl: 4, background: "#001661" }}
                          onClick={() => {
                            logOut();
                            setValue(index);
                          }}
                        >
                          <ListItemText primary={item} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
              {["Settings", "Profile", "Help"].map((text, index) => (
                <ListItemButton
                  key={text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",

                      color: "#54DFFF",
                    }}
                  >
                    {/* {index % 2 === 0 ? <SettingsApplicationsIcon /> : <PersonIcon />} */}
                    {index === 0 && <SettingsIcon />}
                    {index === 1 && <PersonIcon />}
                    {index === 2 && <HelpOutlineRoundedIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              ))}
            </List>
          </Drawer>

          <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <DrawerHeader style={{ minHeight: "8px" }} />
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {optionSelected?.map((item, i) => {
                  return <Tab label={item} {...a11yProps(i)} />;
                })}
                <Box
                  sx={{
                    marginLeft: "auto",
                    // marginRight: 2,
                    // display: "contents",
                    // display: "-webkit-inline-box"
                  }}
                >
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    sx={{
                      marginRight: 1,
                      color: "#001661",
                      // ...(open && { display: "contents"}),
                    }}
                  >
                    <SearchIcon />
                  </IconButton>

                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={() => {
                      handleAppStoreClick();
                    }}
                    sx={{
                      marginRight: 1,
                      marginLeft: 1,
                      // color: "#001661",
                      // ...(open && {  display: "flex",marginRight:"240px" }),
                    }}
                  >
                    <GridViewIcon />
                  </IconButton>

                  {/* <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={() => {
                  logOut();
                 }}
                sx={{
                  marginRight: 2,
                  // color: "#001661",
                  // ...(open && {  display: "flex",marginRight:"240px" }),
                }}
              >
                <LogoutIcon />
              </IconButton> */}
                </Box>
              </Tabs>
            </Box>

            {tabName === "mdm" && (
              <>
                <TabPanel
                  value={value}
                  index={0}
                  sx={{
                    color: "black",
                    fontWeight: "Bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src="https://frontend.eunimart.com/products"
                    onLoad={() => {
                      askSessionIdHandler("products", products);
                    }}
                    ref={products}
                    id="products"
                    title="products"
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",

                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <iframe
                    src="https://frontend.eunimart.com/contacts"
                    onLoad={() => {
                      askSessionIdHandler("contacts", contacts);
                    }}
                    ref={contacts}
                    id="contacts"
                    title="contacts"
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",

                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <iframe
                    src="https://frontend.eunimart.com/locations"
                    onLoad={() => {
                      askSessionIdHandler("locations", locations);
                    }}
                    ref={locations}
                    id="locations"
                    title="locations"
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",

                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <iframe
                    src="https://frontend.eunimart.com/uom"
                    onLoad={() => {
                      askSessionIdHandler("uom", uom);
                    }}
                    ref={uom}
                    id="uom"
                    title="uom"
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",

                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <iframe
                    src="https://frontend.eunimart.com/pricing"
                    onLoad={() => {
                      askSessionIdHandler("pricing", pricing);
                    }}
                    ref={pricing}
                    id="pricing"
                    title="pricing"
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",

                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                {/*  <TabPanel value={value} index={5}>
                <iframe
                  src="https://frontend.eunimart.com/basicLocations"
                  onLoad={() => {
                    askSessionIdHandler("basicLocations", basicLocations);
                  }}
                  ref={basicLocations}
                  id="basicLocations"
                  title="basicLocations"
                  style={{
                    width: "100%",
                    padding: "0px",
                    border: "none",
                    margin: "0px",
                    height: "92vh",
                    overflow: "auto",
                  }}
                ></iframe>
              </TabPanel> */}
                <TabPanel
                  value={value}
                  index={5}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/inventory`}
                    ref={inventory}
                    id="inventory"
                    title="inventory"
                    onLoad={() => {
                      askSessionIdHandler("inventory", inventory);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
              </>
            )}
            {tabName === "orders" && (
              <>
                <TabPanel
                  value={value}
                  index={0}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/salesOrders`}
                    ref={salesOrders}
                    id="sales_orders"
                    title="sales_orders"
                    onLoad={() => {
                      askSessionIdHandler("salesOrders", salesOrders);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <iframe
                    src={`https://frontend.eunimart.com/ist`}
                    ref={ist}
                    title="ist"
                    id="ist"
                    onLoad={() => {
                      askSessionIdHandler("ist", ist);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <iframe
                    src={`https://frontend.eunimart.com/scrapOrders`}
                    ref={scrapOrders}
                    title="scrapOrders"
                    id="scrapOrders"
                    onLoad={() => {
                      askSessionIdHandler("scrapOrders", scrapOrders);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <iframe
                    src={`https://frontend.eunimart.com/deliveryOrders`}
                    ref={deliveryOrders}
                    title="deliveryOrders"
                    id="deliveryOrders"
                    onLoad={() => {
                      askSessionIdHandler("deliveryOrders", deliveryOrders);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <iframe
                    src={`https://frontend.eunimart.com/purchaseOrders`}
                    ref={purchaseOrders}
                    title="purchaseOrders"
                    id="purchaseOrders"
                    onLoad={() => {
                      askSessionIdHandler("purchaseOrders", purchaseOrders);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
              </>
            )}
            {tabName === "inventory" && (
              <>
                {/* <TabPanel
                value={value}
                index={0}
                sx={{
                  color: "black",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <iframe
                  src={`https://frontend.eunimart.com/manualReplanishment`}
                  ref={manualReplanishment}
                  id="manualReplanishment"
                  title="manualReplanishment"
                  onLoad={() => {
                    askSessionIdHandler(
                      "manualReplanishment",
                      manualReplanishment
                    );
                  }}
                  style={{
                    width: "100%",
                    padding: "0px",
                    border: "none",
                    margin: "0px",
                    height: "92vh",
                    overflow: "auto",
                  }}
                ></iframe>
              </TabPanel> */}
                <TabPanel
                  value={value}
                  index={0}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/asn`}
                    ref={asn}
                    id="asn"
                    title="asn"
                    onLoad={() => {
                      askSessionIdHandler("asn", asn);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={1}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/grn`}
                    ref={grn}
                    id="grn"
                    title="grn"
                    onLoad={() => {
                      askSessionIdHandler("grn", grn);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={2}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/inventoryAdjustment`}
                    ref={inventoryAdjustment}
                    id="inventoryAdjustment"
                    title="inventoryAdjustment"
                    onLoad={() => {
                      askSessionIdHandler(
                        "inventoryAdjustment",
                        inventoryAdjustment
                      );
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
              </>
            )}
            {tabName === "inventoryTask" && (
              <>
                <TabPanel
                  value={value}
                  index={0}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/pickList`}
                    ref={pickList}
                    id="pickList"
                    title="pickList"
                    onLoad={() => {
                      askSessionIdHandler("pickList", pickList);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={1}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/cycleCount`}
                    ref={cycleCount}
                    id="cycleCount"
                    title="cycleCount"
                    onLoad={() => {
                      askSessionIdHandler("cycleCount", cycleCount);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
              </>
            )}
            {tabName === "accounting" && (
              <>
                <TabPanel
                  value={value}
                  index={0}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/salesInvoice`}
                    ref={salesInvoice}
                    id="salesInvoice"
                    title="salesInvoice"
                    onLoad={() => {
                      askSessionIdHandler("salesInvoice", salesInvoice);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={1}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/purchaseInvoice`}
                    ref={purchaseInvoice}
                    id="purchaseInvoice"
                    title="purchaseInvoice"
                    onLoad={() => {
                      askSessionIdHandler("purchaseInvoice", purchaseInvoice);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={2}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/debitNote`}
                    ref={debitNote}
                    id="debitNote"
                    title="debitNote"
                    onLoad={() => {
                      askSessionIdHandler("debitNote", debitNote);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={3}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/creditNote`}
                    ref={creditNote}
                    id="creditNote"
                    title="creditNote"
                    onLoad={() => {
                      askSessionIdHandler("creditNote", creditNote);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={4}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/currencyExchange`}
                    ref={currencyExchange}
                    id="currencyExchange"
                    title="currencyExchange"
                    onLoad={() => {
                      askSessionIdHandler("currencyExchange", currencyExchange);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={5}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/paymentTermsRecordPayment`}
                    ref={paymentTermsRecordPayment}
                    id="paymentTermsRecordPayment"
                    title="paymentTermsRecordPayment"
                    onLoad={() => {
                      askSessionIdHandler(
                        "paymentTermsRecordPayment",
                        paymentTermsRecordPayment
                      );
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
              </>
            )}
            {tabName === "returnsManagement" && (
              <>
                <TabPanel
                  value={value}
                  index={0}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/purchaseReturns`}
                    ref={purchaseReturns}
                    id="purchaseReturns"
                    title="purchaseReturns"
                    onLoad={() => {
                      askSessionIdHandler("purchaseReturns", purchaseReturns);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={1}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/salesReturns`}
                    ref={salesReturns}
                    id="salesReturns"
                    title="salesReturns"
                    onLoad={() => {
                      askSessionIdHandler("salesReturns", salesReturns);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
              </>
            )}
            {tabName === "shippingManagement" && (
              <>
                <TabPanel
                  value={value}
                  index={0}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/shippingOrders`}
                    ref={shippingOrders}
                    id="shippingOrders"
                    title="shippingOrders"
                    onLoad={() => {
                      askSessionIdHandler("shippingOrders", shippingOrders);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={1}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/ndr`}
                    ref={ndr}
                    id="ndr"
                    title="ndr"
                    onLoad={() => {
                      askSessionIdHandler("ndr", ndr);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={2}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/rto`}
                    ref={rto}
                    id="rto"
                    title="rto"
                    onLoad={() => {
                      askSessionIdHandler("rto", rto);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={3}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/wd`}
                    ref={wd}
                    id="wd"
                    title="wd"
                    onLoad={() => {
                      askSessionIdHandler("wd", wd);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
              </>
            )}

            {tabName === "omnichannelHub" && (
              <>
                <TabPanel
                  value={value}
                  index={0}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/virtualWarehouse`}
                    ref={virtualWarehouse}
                    id="virtualWarehouse"
                    title="virtualWarehouse"
                    onLoad={() => {
                      askSessionIdHandler("virtualWarehouse", virtualWarehouse);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={1}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/retail`}
                    ref={retail}
                    id="retail"
                    title="retail"
                    onLoad={() => {
                      askSessionIdHandler("retail", retail);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={2}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/webstores`}
                    ref={webstores}
                    id="webstores"
                    title="webstores"
                    onLoad={() => {
                      askSessionIdHandler("webstores", webstores);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={3}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/marketplaces`}
                    ref={marketplaces}
                    id="marketplaces"
                    title="marketplaces"
                    onLoad={() => {
                      askSessionIdHandler("marketplaces", marketplaces);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={4}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/logisticsPartners`}
                    ref={logisticsPartners}
                    id="logisticsPartners"
                    title="logisticsPartners"
                    onLoad={() => {
                      askSessionIdHandler(
                        "logisticsPartners",
                        logisticsPartners
                      );
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={5}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/localWarehouse`}
                    ref={localWarehouse}
                    id="localWarehouse"
                    title="localWarehouse"
                    onLoad={() => {
                      askSessionIdHandler("localWarehouse", localWarehouse);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
              </>
            )}

            {tabName === "appStore" && (
              <>
                <TabPanel
                  value={value}
                  index={0}
                  sx={{
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={`https://frontend.eunimart.com/appStore `}
                    ref={appStore}
                    id="appStore"
                    title="appStore"
                    onLoad={() => {
                      askSessionIdHandler("appStore", appStore);
                    }}
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",
                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </TabPanel>
              </>
            )}
          </Box>
        </Box>
      </ThemeProvider>

      <div className="App1">
        <div style={{ margin: "20px" }}>
          {display ? (
            <ChatBot setDisplay={setDisplay} />
          ) : (
            <InactiveBot setDisplay={setDisplay} />
          )}
          {/* <ChatBot /> */}
        </div>
      </div>
    </>
  );
}

const InactiveBot = ({ setDisplay }) => {
  const [showText, setShowText] = useState(false);
  return (
    <div className="deactive_bot1">
      {showText && (
        <div className="textWrapper1">
          <div style={{ padding: " 13px 25px 0px 25px" }}>
            <div className="chatbot_top_text1">Ask EuniBot</div>
            <div className="chatbot_top_text_sec2">Here to help you</div>
          </div>
        </div>
      )}

      <div
        className="bot_cirlce1"
        onMouseLeave={() => {
          setShowText(false);
        }}
        onMouseOver={() => {
          setShowText(true);
        }}
        onClick={() => {
          setDisplay(prevState => !prevState);
        }}
      >
        <img src={logo} className="eunimart_logo1" alt="Bot_logo" />
      </div>
    </div>
  );
};

{
  /* <Dropdown.Item>
              
              <Box sx={{ flexGrow: 1 }} />
              <IconButton size="small" color="inherit">
                <KeyboardArrowUpIcon/>
              </IconButton>
              <Dropdown.Submenu position="right" >
                {text.sub.map((subOption) => (
                  <Dropdown.Item>{subOption}</Dropdown.Item>
                ))}
              </Dropdown.Submenu>
            </Dropdown.Item> */
}

{
  /* {sideBarData.map((text,index) => 
            <>
                <ListItemButton
                onClick={text.clickEve}
                // key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:"#54DFFF"
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text.label} value={text.label} sx={{ opacity: open ? 1 : 0 }} />
                
                
              </ListItemButton>
              
              <Collapse in={openDrop} timeout="auto" unmountOnExit>
                  
            <List component="div" disablePadding>
              {text.sub.map((item, index) => {
                return (
                  <ListItemButton
                    sx={{ pl: 4, background: "#001661" }}
                    onClick={() => {
                        text.clickEve();
                      setValue(index);
                    }}
                  >
                    <ListItemText primary={item} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
              </>
            )} */
}
// const [sideBarData, setSideBarData] = useState([
//   {label:"MDM", clickEve:handleClick, openEve: openDrop, sub : MDM},
//   {label:"Orders", clickEve:handleOrderClick, openEve: openOrder, sub : ORDERS},
//   {label:"Inventory", clickEve:handleInventoryClick, openEve: openInventory, sub : INVENTORY},
//   {label:"Inventory Task", clickEve:handleInventoryTaskClick, openEve: openInventoryTask, sub : INVENTORY_TASKS},
//   {label:"Accounting", clickEve:handleAccountingClick, openEve: openAccounting, sub : ACCOUNTING},
//   {label:"Return", clickEve:handleReturnsManagementClick, openEve: openReturnsManagement, sub : RETURNS_MANAGEMENT},
//   {label:"Shipping", clickEve:handleShippingManagementClick, openEve: openShippingManagement, sub : SHIPPING_MANAGEMENT},
//   {label:"Omnichannel Hub", clickEve:handleOmnichannelHubClick, openEve: openOmnichannelHub, sub : OMNICHANNEL_HUB},
// ])

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
