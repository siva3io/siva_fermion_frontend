import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Menu,
  MenuItem,
  Paper,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./ContactsViewMain.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabContext } from "@mui/lab";
import { Card } from "@mui/material";
import { lazy, Suspense } from "react";
import { getcontactsById } from "../redux/Action/contactsViewbyId";
import { getcontactsRelatedById } from "../redux/Action/relatedContactAction";
import ErrorBoundary from "../ErrorBoundary";
import RelatedContact from "./RelatedContact";
import ContactsDetail from "./ContactsDetail";
import MoreVertIcon from '@mui/icons-material/MoreVert';

//  import LocationCard from "./LocationCard";
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
const RemoteAddressCard = React.lazy(() => import("Remote/AddressCard"));
const RemoteLocationCard = React.lazy(() => import("Remote/LocationCard"));
const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ContactsViewMain = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();
  const location = useLocation();
  // const { id } = useParams();
  const products = useRef(null);
  const askSessionIdHandler = (name, ref) => {
    let details = { type: name, data: localStorage.getItem('token') };
    postCrossDomainMessage(details, ref);
  };
  const postCrossDomainMessage = (msg, ref) => {
    let win = ref.current.contentWindow;
    setTimeout(() => {
      win.postMessage(msg, "*");
    }, 2000);
  };
  const { id } = location.state ? location.state : { id: null };
  useEffect(() => {
    if (id) {
      dispatch(getcontactsById(id));
      // dispatch(getcontactsRelatedById(id));
    } else {
      const tempid = location.pathname.split("/")[3];
      dispatch(getcontactsById(tempid));
      // dispatch(getcontactsRelatedById(id));
    }
  }, [location.state]);
  // const dispatch = useDispatch();

  useEffect(() => dispatch(getcontactsById(id)), [dispatch]);

  useEffect(() => {
    dispatch(getcontactsById(id));
    // dispatch(getcontactsRelatedById(id));
  }, [id]);
  // useEffect(() => dispatch(getcontactsRelatedById(id)), [dispatch]);
  const contactData = useSelector((state) => state.viewData?.contactsViewData);
  useEffect(() => {

  }, [contactData]);
  const relatedContactData = useSelector((state) => state.relatedContact.contact);
  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  const [toggleState, setToggleState] = useState(0);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar

  const handleChangeDyanmicAppBar = (value) => {
    //setDynamicAppBar(value);
  };
  const [params, setParams] = useState({ limit: 10, offset: 1 });
  const [selectedId, setId] = useState(0);
  const [staticFields, setStaticFields] = useState([
    {
      label: "Contact Type",
      type: "input",

      text: contactData?.contact_type?.display_name
        ? contactData?.contact_type?.display_name
        : "0000000"
    },
    {
      label: "Last Name",
      type: "input",
      text: contactData?.parent?.last_name
        ? contactData?.parent?.last_name
        : "--"
    },
    {
      label: "Company Name",
      type: "input",
      text: contactData?.company_name
        ? contactData?.company_name
        : "--"
    },
    {
      label: "Relationship",
      type: "input",
      text: contactData?.receipt_routing?.display_name
        ? contactData?.receipt_routing?.display_name
        : "--"
    },
    {
      label: "Email",
      type: "input",
      text: contactData?.primary_email
        ? contactData?.primary_email
        : "--"
    },
    {
      label: "Contact Number",
      type: "input",
      text: contactData?.primary_phone
        ? contactData?.primary_phone
        : "--"
    },
    {
      label: "Parent Contact",
      type: "input",
      text: contactData?.parent?.primary_phone
        ? contactData?.parent?.primary_phone
        : "--"
    },
  ]);
  const [staticFieldsTwo, setStaticFieldsTwo] = useState([
    {
      label: "Name On Account",
      type: "input",
      text: contactData?.billing_details?.account_name
        ? contactData?.billing_details?.account_name
        : "--"
    },
    {
      label: "Account Number",
      type: "input",
      text: contactData?.billing_details?.account_number
        ? contactData?.billing_details?.account_number
        : "--"
    },
    {
      label: "Bank",
      type: "input",
      text: contactData?.billing_details?.bank_name
        ? contactData?.billing_details?.bank_name
        : "--"
    },
    {
      label: "IFSC Code",
      type: "input",
      text: contactData?.billing_details?.ifsc_code
        ? contactData?.billing_details?.ifsc_code
        : "--"
    },
    {
      label: "UPI",
      type: "input",
      text: contactData?.billing_details?.upi
        ? contactData?.billing_details?.upi
        : "--"
    },
  ]);
  const [staticFieldsThree, setStaticFieldsThree] = useState([
    {
      label: "Date of Birth",
      type: "input",
      text: contactData?.additional_information?.date_of_birth
        ? datePipe(contactData?.additional_information?.date_of_birth)
        : "--"
    },
    {
      label: "Emergency Contact",
      type: "input",
      text: contactData?.additional_information?.additional_contact
        ? contactData?.additional_information?.additional_contact
        : "--"
    },
    {
      label: "Work Information",
      type: "input",
      text: contactData?.billing_details?.bank_name
        ? contactData?.billing_details?.bank_name
        : "--"
    },
    {
      label: "Notes",
      type: "input",
      text: contactData?.billing_details?.ifsc_code
        ? contactData?.billing_details?.ifsc_code
        : "--"
    },
    {
      label: "Additional Information",
      type: "input",
      text: contactData?.billing_details?.upi
        ? contactData?.billing_details?.upi
        : "--"
    },
    {
      label: "Work Phone",
      type: "input",
      text: contactData?.additional_information?.emergency_contact
        ? contactData?.additional_information?.emergency_contact
        : "--"
    },
    {
      label: "Custom Field",
      type: "input",
      text: contactData?.billing_details?.upi
        ? contactData?.billing_details?.upi
        : "--"
    },
    {
      label: "Additional Contact",
      type: "input",
      text: contactData?.billing_details?.upi
        ? contactData?.billing_details?.upi
        : "--"
    },
    {
      label: "Additional Information",
      type: "input",
      text: contactData?.billing_details?.upi
        ? contactData?.billing_details?.upi
        : "--"
    },
    {
      label: "GST Doc",
      type: "input",
      text: contactData?.parent?.address_details?.gst_in_number
        ? contactData?.parent?.address_details?.gst_in_number
        : "--"
    },
    {
      label: "GST ID",
      type: "input",
      text: contactData?.address_details?.gst_in_number
        ? contactData?.address_details?.gst_in_number
        : "--"
    },
  ]);

  const DUMMY_DATA_heading_paymentHistory = [
    "Order Number",
    "Date",
    "Order contains",
    "Payment",
    "Advance",
    "Margin",
    "Payment Status",
    "Action",
  ];
  const DUMMY_DATA_details_paymentHistory = [
    {
      id: "1",
      orderNo: "234566765",
      Date: "26/12/2020",
      orderContaine: "Some product in few quantity",
      payment: "2000",
      advance: "1700",
      margin: "223",
      paymentStatus: "Status",
      action: "more_vert",
    },
    {
      id: "2",
      orderNo: "234566765",
      Date: "26/12/2020",
      orderContaine: "Some product in few quantity",
      payment: "2000",
      advance: "1700",
      margin: "223",
      paymentStatus: "Status",
      action: "more_vert",
    },
    {
      id: "3",
      orderNo: "234566765",
      Date: "26/12/2020",
      orderContaine: "Some product in few quantity",
      payment: "2000",
      advance: "1700",
      margin: "223",
      paymentStatus: "Status",
      action: "more_vert",
    },
    {
      id: "4",
      orderNo: "234566765",
      Date: "26/12/2020",
      orderContaine: "Some product in few quantity",
      payment: "2000",
      advance: "1700",
      margin: "223",
      paymentStatus: "Status",
      action: "more_vert",
    },
    {
      id: "5",
      orderNo: "234566765",
      Date: "26/12/2020",
      orderContaine: "Some product in few quantity",
      payment: "2000",
      advance: "1700",
      margin: "223",
      paymentStatus: "Status",
      action: "more_vert",
    },
    {
      id: "6",
      orderNo: "234566765",
      Date: "26/12/2020",
      orderContaine: "Some product in few quantity",
      payment: "2000",
      advance: "1700",
      margin: "223",
      paymentStatus: "Status",
      action: "more_vert",
    },
    {
      id: "7",
      orderNo: "234566765",
      Date: "26/12/2020",
      orderContaine: "Some product in few quantity",
      payment: "2000",
      advance: "1700",
      margin: "223",
      paymentStatus: "Status",
      action: "more_vert",
    },
    {
      id: "8",
      orderNo: "234566765",
      Date: "26/12/2020",
      orderContaine: "Some product in few quantity",
      payment: "2000",
      advance: "1700",
      margin: "223",
      paymentStatus: "Status",
      action: "more_vert",
    },
    {
      id: "9",
      orderNo: "234566765",
      Date: "26/12/2020",
      orderContaine: "Some product in few quantity",
      payment: "2000",
      advance: "1700",
      margin: "223",
      paymentStatus: "Status",
      action: "more_vert",
    },
    {
      id: "10",
      orderNo: "234566765",
      Date: "26/12/2020",
      orderContaine: "Some product in few quantity",
      payment: "2000",
      advance: "1700",
      margin: "223",
      paymentStatus: "Status",
      action: "more_vert",
    },
    {
      id: "11",
      orderNo: "234566765",
      Date: "26/12/2020",
      orderContaine: "Some product in few quantity",
      payment: "2000",
      advance: "1700",
      margin: "223",
      paymentStatus: "Status",
      action: "more_vert",
    },
  ];
  return (
    <>
      <Paper
        sx={{
          borderRadius: "8px",
          margin: "16px 16px 16px 16px",
        }}
      >
        <Card
          sx={{
            minWidth: 275,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "16px",
            boxShadow: "none",
          }}
        >
          <CardContent className={classes.justifyAllContent}>
            <Typography>
              <img
                className={`eucommoncardLeftImage`}
                src={
                  contactData && contactData.image_options && contactData.image_options.link != "" ? "data:image/png;base64," + contactData.image_options.data : "https://www.iuminnesota.com/wp-content/uploads/2020/03/dummy-avatar-300x300-1.jpg"
                  // contactData?.image_options
                  //   ? "data:image/png;base64," +
                  //   contactData?.image_options?.data
                  //   : "https://www.iuminnesota.com/wp-content/uploads/2020/03/dummy-avatar-300x300-1.jpg"
                }
              ></img>
            </Typography>
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontFamily: "Poppins" }}
              >
                {contactData?.first_name
                  ? contactData?.first_name.charAt(0).toUpperCase() +
                  contactData?.first_name.slice(1)
                  : contactData?.company_name}
              </Typography>

              <Typography className={classes.stateTypography}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#416BFF",
                  }}
                  className={classes.stateTypography}
                >
                  <i className="material-icons custom actionIcon setColor">
                    phone
                  </i>
                  <span>{contactData?.primary_phone}</span>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#416BFF",
                  }}
                  className={classes.stateTypography}
                >
                  <i className="material-icons custom actionIcon setMailColor">
                    email
                  </i>
                  {contactData?.primary_email}
                </Typography>
              </Typography>
            </CardContent>
          </CardContent>
          <CardActions>
            {/* <i
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="material-icons custom actionIcon"
            >
              more_vert
            </i> */}
            <MoreVertIcon onClick={handleClick} />
          </CardActions>
        </Card>
        <Box sx={{ width: "100%" }}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              className={classes.notebookVersionTwoTabWrapper}
            >
              <Tab
                disableRipple={true}
                className={classes.notebookVersionTwotabs}
                label="Contact Details"
                contactData={contactData}
                {...a11yProps(0)}
              />
              <Tab
                disableRipple={true}
                className={classes.notebookVersionTwotabs}
                label="Related Contacts"
                {...a11yProps(1)}
              />
              <Tab
                disableRipple={true}
                className={classes.notebookVersionTwotabs}
                label="Payment History"
                {...a11yProps(2)}
              />
              <Tab
                disableRipple={true}
                className={classes.notebookVersionTwotabs}
                label="Order History"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
        </Box>
      </Paper>

      <TabPanel value={value} index={0} contactData={contactData}>



        <ContactsDetail contactData={contactData} />
        {/* <ContactDetail contactData={contactData} /> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RelatedContact contactData={contactData} />

      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <PaymentHistory /> */}
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteWrapper>
            <Paper className={classes.contactPaper}>
              <h1>No Payment Details</h1>
              {/* <CommonTable
        heading={DUMMY_DATA_heading_paymentHistory}
        details={DUMMY_DATA_details_paymentHistory}
        tableFor="PaymentHistory"
      /> */}

              {/* <RemoteDynamicTable
          table_data={DUMMY_DATA_details_paymentHistory}
          headCells={DUMMY_DATA_heading_paymentHistory}
          info={params}
          // customOptions={customOptions}
          // setCustomOptions={setCustomOptions}
          setParams={setParams}
          handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
          setId={setId}
          enablepagination={false}
        /> */}
            </Paper>
          </RemoteWrapper>
        </Suspense>
      </TabPanel>
      <TabPanel value={value} index={3}>
        {/* <OrderHistory /> */}
        <iframe
          src="https://develop.eunimart.com/products"
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
    </>
  );
};

export default ContactsViewMain;








/*
Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)			
All rights reserved.			
This program is free software: you can redistribute it and/or modify			
it under the terms of the GNU General Public License as published by			
the Free Software Foundation, either version 3 of the License, or			
(at your option) any later version.			
This program is distributed in the hope that it will be useful,			
but WITHOUT ANY WARRANTY; without even the implied warranty of			
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the			
GNU General Public License for more details.			
You should have received a copy of the GNU General Public License			
along with this program. If not, see <http://www.gnu.org/licenses/>.			
*/