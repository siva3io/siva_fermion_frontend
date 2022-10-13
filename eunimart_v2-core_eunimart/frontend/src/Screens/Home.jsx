import React, { useEffect, useRef, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import FolderIcon from "@mui/icons-material/Folder";
import LOGO from "../Assets/Images/Logo.png";
import CLOSE from "../Assets/Icons/open.svg";
import { ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import menuService from "../Services/menuService";
import {
  CardMedia,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  Typography,
  Box,
  ListItemIcon,
} from "@mui/material";
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import ChatBot from "../Components/ChatBot";
import logo from "../Components/Chatbot.png";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { theme1 } from "../theme";
import GLOBAL_API_SOURCE from "../GlobalApi";
import "../Components/popup.css";
import UserProfile from "../Components/UserProfile";
import inventoryAdjustmentApp from "../Components/inventoryAdjustmentApp";
import pickListApp from "../Components/pickListApp";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";

import DeliveryOrdersApp from "../components/DeliveryOrdersApp";
import SalesOrdersApp from "../Components/SalesOrdersApp";
import ShippingOrdersApp from "../Components/ShippingOrdersApp";
import AccessEngineApp from "../Components/AccessEngineApp";
import AccessEngineApp1 from "../Components/AccessEngineApp1";
import AccessEngineApp2 from "../Components/AccessEngineApp2";
import PurchaseOrders from "../Components/PurchaseOrders";
import Pricing from "../Components/Pricing";
import { createBrowserHistory } from "history";
import PurchaseReturns from "../Components/PurchaseReturns";
import Products from "../Components/Products";
import IST from "../Components/IST";
import LocationsApp from "../Components/LocationsApp";
import CreditNote from "../Components/CreditNote";
import DebitNote from "../Components/DebitNote";
import ScrapOrders from "../Components/ScrapOrders";
import SalesInvoice from "../Components/SalesInvoice";
import PurchaseInvoice from "../Components/PurchaseInvoice";
import contacts from "../Components/ContactsApp";
import Uom from "../Components/Uom";
import ASN from "../Components/ASN";
import GRN from "../Components/GRN";
import Settings from "../Components/Settings";
import Profile from "../Components/Profile";
import SalesReturns from "../Components/SalesReturns";
import NDR_WD_RTO from "../Components/NDR_WD_RTO";
// import omnichannel_web_marketplace from "../Components/omnichannel_web_marketplace";
// import omnichannel_virtualwh_retail from "../Components/omnichannel_virtualwh_retail";
// import omnichannel_logistic_localwh from "../Components/omnichannel_logistic_localwh";
import Marketplaces from "../Components/Marketplaces";
import Webstores from "../Components/Webstores";
import Retail from "../Components/Retail";
import VirtualWarehouse from "../Components/VirtualWarehouse";
import LogisticPartners from "../Components/LogisticPartners";
import LocalWarehouse from "../Components/LocalWarehouse";
import POS from "../Components/POS";
import Accounting from "../Components/Accounting";
const history = createBrowserHistory();

const base_url = GLOBAL_API_SOURCE.url;

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
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

// const reloadPage = () =>{
const reloadPage = () => {
  window.location.reload();
  console.log("reloadPage");
};
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
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

export default function MiniDrawer({ sessionId }) {
  const [state, setState] = useState({});
  const [display, setDisplay] = useState(false);
  const navigate = useHistory();
  const [value, setValue] = React.useState(0);
  const products = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const askSessionIdHandler = (name, ref) => {
    let details = { type: name, data: localStorage.getItem("token") };
    postCrossDomainMessage(details, ref);
  };

  const postCrossDomainMessage = (msg, ref) => {
    let win = ref.current.contentWindow;
    setTimeout(() => {
      win.postMessage(msg, "*");
    }, 2000);
  };

  const handleAppStoreClick = () => {
    setState({
      ...state,
      selectMenu: { route_path: "https://frontend.eunimart.com/appStore" },
      tabs: null,
    });
  };

  const menuChange = (item, index, tabs) => {
    console.log("item Dk", item);
    //navigate.push("/deliveryOrders");
    // <Link to="/deliveryOrders">deliveryOrders</Link>
    // if(index > 0)
    // {
    //   Link.to("/deliveryOrders");
    // }
    setState({ ...state, selectMenu: item, tabs });
    setValue(index);
  };

  const logOut = () => {
    console.log("logOut");
    localStorage.clear();
    navigate.push("/login");
  };
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ThemeProvider theme={theme1}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <StrictMode>
            <Provider store={store}>
              <Router history={history}>
                <MainMenu onChange={menuChange} />

                <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
                  <DrawerHeader style={{ minHeight: "8px" }} />
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      {
                        //state.tabs && state.tabs.map((tab, index)=> <Tab key={index} label={tab.module_name} onClick={()=> menuChange(tab, index, state.tabs)}/>)

                        state.tabs &&
                          state.tabs.map((tab, index) => (
                            <Link
                              to={tab.route_path.replace(
                                "https://frontend.eunimart.com",
                                ""
                              )}
                              style={{ color: "#000" }}
                            >
                              <Tab key={index} label={tab.module_name} />
                            </Link>
                          ))
                      }
                      <Box sx={{ marginLeft: "auto" }}>
                        <IconButton
                          color="inherit"
                          aria-label="open drawer"
                          edge="end"
                          sx={{
                            marginRight: 1,
                            color: "#001661",
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
                          }}
                        >
                          <GridViewIcon />
                        </IconButton>

                        <IconButton
                          color="inherit"
                          aria-label="open drawer"
                          edge="end"
                          onClick={() => {
                            setShowModal(true);
                          }}
                          sx={{
                            marginRight: 2,
                            // color: "#001661",
                            // ...(open && {  display: "flex",marginRight:"240px" }),
                          }}
                        >
                          <PersonRoundedIcon />
                        </IconButton>
                      </Box>
                    </Tabs>
                  </Box>
                  {/* <iframe
              src={state.selectMenu?.route_path}
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
            ></iframe>  */}

                  {/* <ul>
                      <li>
                        <Link to="/deliveryOrders">deliveryOrders</Link>
                      </li>
                      <li>
                        <Link to="/salesOrders">salesOrders</Link>
                      </li>
                    </ul>
                    <hr /> */}

                  <Switch>
                    <Route
                      path="/deliveryOrders"
                      component={DeliveryOrdersApp}
                    ></Route>
                    <Route
                      path="/salesOrders"
                      component={SalesOrdersApp}
                    ></Route>
                    <Route
                      path="/purchaseOrders"
                      component={PurchaseOrders}
                    ></Route>
                    <Route path="/pricing" component={Pricing}></Route>
                    <Route path="/products" component={Products}></Route>
                    <Route path="/uom" component={Uom}></Route>
                    <Route path="/asn" component={ASN}></Route>
                    <Route
                      path="/salesReturns"
                      component={SalesReturns}
                    ></Route>
                    <Route
                      path="/purchaseReturns"
                      component={PurchaseReturns}
                    ></Route>
                    <Route
                      path="/shippingOrders"
                      component={ShippingOrdersApp}
                    ></Route>
                    <Route
                      path="/access-templates"
                      component={AccessEngineApp}
                    ></Route>
                    <Route
                      path="/lookup-types"
                      component={AccessEngineApp1}
                    ></Route>
                    <Route
                      path="/lookup-codes"
                      component={AccessEngineApp2}
                    ></Route>
                    <Route
                      path="/inventoryAdjustment"
                      component={inventoryAdjustmentApp}
                    ></Route>

                    <Route path="/ndr" component={NDR_WD_RTO}></Route>
                    <Route path="/rto" component={NDR_WD_RTO}></Route>
                    <Route path="/wd" component={NDR_WD_RTO}></Route>
                    <Route path="/grn" component={GRN}></Route> 
                    <Route path="/ScrapOrders" component={ScrapOrders}></Route>
                    <Route path="/pickList" component={pickListApp}></Route>
                    <Route path="/ist" component={IST}></Route>
                    <Route path="/creditNote" component={CreditNote}></Route>
                    <Route path="/debitNote" component={DebitNote}></Route>

                    <Route path="/marketplaces" component={Marketplaces}></Route>
                    <Route path="/webstores" component={Webstores}></Route>
                    <Route path="/retail" component={Retail}></Route>
                    <Route path="/virtualWarehouse" component={VirtualWarehouse}></Route>
                    <Route path="/logisticspartners" component={LogisticPartners}></Route>
                    <Route path="/localWarehouse" component={LocalWarehouse}></Route>
                    <Route path="/accounting" component={Accounting}></Route>
                    <Route path="/pos" component={POS}></Route>

                    <Route
                      path="/salesInvoice"
                      component={SalesInvoice}
                    ></Route>
                    <Route
                      path="/PurchaseInvoice"
                      component={PurchaseInvoice}
                    ></Route>
                    <Route path="/contacts" component={contacts}></Route>
                    <Route
                      path="/PurchaseInvoice"
                      component={PurchaseInvoice}
                    ></Route>
                    <Route path="/locations" component={LocationsApp}></Route>
                    <Route path="/settings" component={Settings}></Route>
                    <Route path="/profile" component={Profile}></Route>
                    <Route path="/organisation" component={Profile}></Route>
                  </Switch>
                </Box>
              </Router>
            </Provider>
          </StrictMode>
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
      {showModal && (
        <>
          <div
            className="modal-backdrop"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="modal">
            <UserProfile />
          </div>
        </>
      )}
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
          setDisplay((prevState) => !prevState);
        }}
      >
        <img
          src={logo}
          style={{ overflow: "hidden" }}
          className="eunimart_logo1"
          alt="Bot_logo"
        />
      </div>
    </div>
  );
};

const MainMenu = (props) => {
  const [showModal, setShowModal] = useState(false);

  const [state, setState] = useState({});

  useEffect(() => {
    menuService().then((resp) => {
      if (resp.status == 200 && resp.data && resp.data.data) {
        var selectMenu = resp.data.data.filter((o) => o.parent_module_id)[0];
        var tabs = resp.data.data.filter(
          (o) => o.parent_module_id == selectMenu.parent_module_id
        );
        props.onChange(selectMenu, 0, tabs);
        //menuPress(selectMenu,0)
        setState({ ...state, data: resp.data.data });
      }
    });
  }, []);

  const menuPress = (item, index) => {
    console.log("menuPress", item);

    if (
      state.selectMenu &&
      item &&
      (item.id == state.selectMenu.id ||
        (state.selectMenu.parent_module_id &&
          item.id == state.selectMenu.parent_module_id))
    ) {
      setState({ ...state, collasped: !state.collasped });
      return;
    }

    setState({
      ...state,
      open: item ? true : !state.open,
      collasped: true,
      selectMenu: item,
    });
    if (item.parent_module_id) {
      var tabs = state.data.filter(
        (o) => o.parent_module_id == item.parent_module_id
      );
      props.onChange(item, index, tabs);
    } else {
      var selectMenu = state.data.filter(
        (o) => o.parent_module_id == item.id
      )[0];
      var tabs = state.data.filter((o) => o.parent_module_id == item.id);
      props.onChange(selectMenu, 0, tabs);
    }
  };

  return (
    <>
      <Drawer variant="permanent" open={state.open}>
        <DrawerHeader style={{ background: "#FAFAFA" }}>
          <ListItemButton
            // onClick={() => {
            //   handleClick();
            //   setValue(0);
            // }}
            sx={{
              minHeight: 48,
              justifyContent: state.open ? "initial" : "center",
              px: 2.5,
              background: "#FAFAFA",
            }}
          >
            <ListItemIcon
              sx={{
                maxWidth: "10px",
                mr: state.open ? 3 : "auto",
                justifyContent: "center",
                height: "47px",
                // color: "#54DFFF",

                ...(state.open && { display: "none" }),
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
              }}
              style={{ overflow: "hidden" }}
              component="img"
              // image="/static/media/Logo.ae5bb04df49982a2e1e5.png"
              image={LOGO}
              alt="Paella dish"
              onClick={reloadPage}
            />
          </ListItemButton>
        </DrawerHeader>

        <List style={{ backgroundColor: "#001661" }}>
          <IconButton
            style={{ color: "#54DFFF", marginLeft: "10px" }}
            aria-label="open drawer"
            onClick={() => menuPress(null, 0)}
            edge="start"
            sx={{
              marginLeft: "3px",
              color: "#001661",
              ...(state.open && { display: "none" }),
            }}
          >
            <img src={CLOSE} />
          </IconButton>
          <IconButton
            onClick={() => menuPress(null, 0)}
            style={{ color: "#54DFFF", marginLeft: "190px" }}
          >
            <MenuOpenIcon color="#54DFFF" />
          </IconButton>

          {state.data &&
            state.data
              .filter((o) => o.parent_module_id == null)
              .map((item, index) => (
                <>
                  {/* <IconButton
                style={{ color: "#54DFFF", marginLeft: "10px" }}
                aria-label="open drawer"
                onClick={() => menuPress(item)}
                edge="start"
                sx={{
                  marginLeft: "3px",
                  color: "#001661"
                }}
              >
              </IconButton> */}

                  <ListItemButton
                    onClick={() => menuPress(item, index)}
                    sx={{
                      minHeight: 48,
                      justifyContent: state.open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: state.open ? 3 : "auto",
                        justifyContent: "center",
                        color: "#54DFFF",
                      }}
                    >
                      {/* <FolderIcon /> */}
                      <img
                        src={`${base_url}/${item.image_option}`}
                        onError={({ e }) => {
                          e.onerror = null; // prevents looping
                          e.src =
                            "https://dev-api.eunimart.com/files/icons/MDM.svg";
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      style={{ overflow: "hidden" }}
                      primary={item.module_name}
                      value={item.module_name}
                    />

                    {(state.open &&
                      state.selectMenu &&
                      (state.selectMenu.id == item.id ||
                        (item.ParentModule &&
                          state.selectMenu.parent_module_id == item.id)) && (
                        <KeyboardArrowUpIcon />
                      )) ||
                      (state.open && <KeyboardArrowDownIcon />)}
                  </ListItemButton>

                  <Collapse
                    in={
                      state.open &&
                      state.collasped &&
                      state.selectMenu &&
                      (item.id == state.selectMenu.id ||
                        (state.selectMenu.ParentModule &&
                          item.id == state.selectMenu.parent_module_id))
                    }
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {state.data &&
                        state.data
                          .filter(
                            (o) =>
                              o.ParentModule && o.parent_module_id == item.id
                          )
                          .map((sitem, sindex) => (
                            // <ListItemButton onClick={() => menuPress(sitem, sindex)} sx={{ pl: 4, background: "#001661" }}>
                            //   <ListItemText primary={sitem.module_name} value={sitem.module_name} />
                            // </ListItemButton>
                            <Link
                              to={sitem.route_path.replace(
                                "https://frontend.eunimart.com",
                                ""
                              )}
                              style={{ color: "#54DFFF" }}
                            >
                              <ListItemButton
                                onClick={() => menuPress(sitem, sindex)}
                                sx={{ pl: 4, background: "#001661" }}
                              >
                                <ListItemText
                                  primary={sitem.module_name}
                                  value={sitem.module_name}
                                />
                              </ListItemButton>
                            </Link>
                          ))}
                    </List>
                  </Collapse>
                </>
              ))}
          {["Settings", "Profile", "Help"].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: state.open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: state.open ? 2 : "auto",
                  justifyContent: "center",

                  color: "#54DFFF",
                }}
              >
                {/* {index % 2 === 0 ? <SettingsApplicationsIcon /> : <PersonIcon />} */}
                {index === 0 && <SettingsIcon />}
                {index === 1 && <PersonIcon />}
                {index === 2 && <HelpOutlineRoundedIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ opacity: state.open ? 1 : 0 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};
