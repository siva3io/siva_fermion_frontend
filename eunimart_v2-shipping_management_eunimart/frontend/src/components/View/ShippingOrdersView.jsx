import React, { useEffect, useRef, useState } from "react";
import "./shippingOrdersView.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ShippingDetailView from './ShippingDetailView';

import  {getShippingById} from "../../redux/Action/shippingrdersViewbyId";
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
 const shippingOrdersView = () => {
  
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const location = useLocation();
  // const { id } = useParams();
 
  const { id } = location.state ? location.state : { id: null };
  console.log(id);
  useEffect(() => {
    if (id) {
      dispatch(getShippingById(id));
    //   dispatch(getNdrById(id));
    //   dispatch(getRtoById(id));
    //   dispatch(getWdById(id));
    console.log("else sate1")
    } else {
      console.log("else sate1")
      const tempid = location.pathname.split("/")[3];
      console.log("else sate",tempid)
      dispatch(getShippingById(tempid));
    //   dispatch(getNdrById(tempid));
    //   dispatch(getRtoById(tempid));
    //   dispatch(getWdById(tempid));
      // GetSingleIstViewReducer
    }
  }, [location.state]);
  //shipping management
  const ndr = useRef(null);
  const wd = useRef(null);
  const rto = useRef(null);
   //shipping management
  useEffect(() => dispatch(getShippingById(id)), [dispatch]);
  const soIDData = useSelector((state) => state.shippingView?.shippingViewData);
  console.log(soIDData,"id data Main page one");
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
  // //NDR
  // const ndrIDData = useSelector((state) => state.getNdrById?.ndr);
  // console.log(ndrIDData," NDR id data Main page one");
  // //NDR
  // //RTO
  // const rtoIDData = useSelector((state) => state.getRtoById?.rto);
  // console.log(rtoIDData," RTO id data Main page one");
  // //RTO

  // //WD
  // const wdIDData = useSelector((state) => state.getWdById?.wd);
  // console.log(wdIDData," RTO id data Main page one");
  // //WD

    const [toggleState, setToggleState] = useState(0);  
    const toggleTab = (index) => {
      setToggleState(index);
    };

    return (
      <>          
           <div className="sale-order-wrap">
        <div className="product-sale-order-wrap">
          <div className="product-sale-order-detail-wrap">
            <h6 className="product-name" style={{fontSize:"33px!important",fontFamily:"Poppins!important",fontWeight:"400"}}>{soIDData?.shipping_number}</h6>
            {/* <div className="product_status">
              <div className="">
                <p className="" style={{fontSize:"19px",fontFamily:"Poppins",fontWeight:"500"}}>Reference No</p>
              </div>
            </div> */}
          </div>
          <div>
          <MoreVertIcon/>
          </div>
        </div>
  

    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs static value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Shipping Details" {...a11yProps(0)} />
                    <Tab label="Non-Delivery Requests" {...a11yProps(1)} />
                    <Tab label="Return To Origin" {...a11yProps(2)} />
                    <Tab label="Weight Discrepancy"             {...a11yProps(3)} />
                   
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       {/* {soIDData && <IstSingleViewDetails soIDData={soIDData}/>} */}
       <div className="shippingpage">
        {soIDData &&
          <ShippingDetailView soIDData={soIDData}/>
        }
       </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
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
    {/* {ndrIDData && <Ndr soIDData={soIDData}  ndrIDData={ndrIDData}/>}  */}
      </TabPanel>
      <TabPanel value={value} index={2}>
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
       {/* {rtoIDData&& <Rto soIDData={soIDData} rtoIDData={rtoIDData}/> }  */}
                 </TabPanel>
                 <TabPanel value={value} index={3}>
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
          {/* {wdIDData && <Wd soIDData={soIDData} wdIDData={wdIDData}/>}        */}
            
                 </TabPanel>
      </Box>  
        </div>
</>
  );
};

export default shippingOrdersView;


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