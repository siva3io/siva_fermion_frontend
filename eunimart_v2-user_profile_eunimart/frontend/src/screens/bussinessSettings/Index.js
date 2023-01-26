import React, { useEffect, useState, Suspense } from "react";
import {
  loadAuthData,
  loadTimeZone,
  loadDateFormat,
  loadTimeFormat,
  loadAuthDataUpdate,
} from "../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ErrorBoundary from "../../ErrorBoundary";
import ProfileForm from "Remote/ProfileForm";
import { Box } from "@mui/system";
import { Start } from "@mui/icons-material";
import "./style.css";

const RemoteViewBox = React.lazy(() => import("Remote/ViewBox"));

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

export default function index() {
  const { authData, timeZone, timeFormat, dateFormat } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAuthData());
    dispatch(loadTimeZone());
    dispatch(loadTimeFormat());
    dispatch(loadDateFormat());
  }, []);

  const [mainData, setMainData] = useState({});

  const [generalDetails, setGeneralDetails] = useState();
  const [locationDetails, setLocationDetails] = useState();
  const [notifications, setNotifications] = useState();
  const [accountDetails, setAccountDetails] = useState();

  useEffect(() => {
    // console.log(authData?.preferences?.notification_settings?.email,"--------")

    setGeneralDetails([
      {
        label: "Full name",
        text: `${authData?.first_name} ${authData?.last_name}`,
        type: "input",
      },
      {
        label: "Email ID",
        text: authData?.email,
        type: "input",
      },
      {
        label: "Location",
        text: authData?.address_details?.location_name,
        type: "input",
      },
      {
        label: "Work Email ID",
        text: authData?.work_email,
        type: "input",
      },
      {
        label: "Two-step authentication",
        text: "True",
        type: "input",
      },
      // {
      //     label: "Password",
      //     text: "",
      //     type: "input"
      // },
    ]);

    setLocationDetails([
      {
        label: "Time Zone",
        type: "select",
        key: "time_zone",
        value: authData?.preferences?.time_zone
          ? {
            id: authData?.preferences?.time_zone?.id,
            label: authData?.preferences?.time_zone?.display_name,
          }
          : null,
      },
      {
        label: "Set Time Format",
        type: "radio",
        key: "time_format",
        sub: [
          {
            label: "12 hours",
            value: "12_HOURS",
            checked:
              authData?.preferences?.time_format?.display_name === "12 hours"
                ? true
                : false,
          },
          {
            label: "24 hours",
            value: "24_HOURS",
            checked:
              authData?.preferences?.time_format?.display_name === "24 hours"
                ? true
                : false,
          },
        ],
      },
      {
        label: "Set Date Format",
        type: "radio",
        key: "date_format",
        defaultVal: authData?.preferences?.date_format?.display_name,
        sub: [
          {
            label: "yyyy/mm/dd",
            value: "yyyy/mm/dd",
            checked:
              authData?.preferences?.date_format?.display_name === "yyyy/mm/dd"
                ? true
                : false,
          },
          {
            label: "dd/mm/yyyy",
            value: "dd/mm/yyyy",
            checked:
              authData?.preferences?.date_format?.display_name === "dd/mm/yyyy"
                ? true
                : false,
          },
          {
            label: "mm/dd/yyyy",
            value: "mm/dd/yyyy",
            checked:
              authData?.preferences?.date_format?.display_name === "mm/dd/yyyy"
                ? true
                : false,
          },
        ],
      },
      {
        label: "Set Time Zone Automatically",
        type: "toggle",
        key: "set_time_zone_automatically",
        value: authData?.preferences?.set_time_zone_automatically
          ? true
          : false,
      },
      {
        label: "Set Time Automatically",
        type: "toggle",
        key: "set_time_automatically",
        value: authData?.preferences?.set_time_automatically ? true : false,
        required: true,
      },
    ]);
    setNotifications([
      {
        label: "Email",
        type: "toggle",
        key: "email",
        value: authData?.preferences?.notification_settings?.email
          ? true
          : false,
        // value:true,
        required: true,
      },
      {
        label: "SMS",
        type: "toggle",
        key: "sms",
        value: authData?.preferences?.notification_settings?.sms ? true : false,
        required: true,
      },
      {
        label: "Reminder",
        type: "toggle",
        key: "reminder",
        value: authData?.preferences?.notification_settings?.reminder
          ? true
          : false,
        required: true,
      },
    ]);

    setAccountDetails([
      {
        label: "Access Type",
        text: authData?.access_template_id?.map((o) => o.name).join(", "),
        type: "input",
      },
      {
        label: "Designation",
        text: authData?.external_details?.designation,
        type: "input",
      },
      {
        label: "Manager or Team Head",
        text: authData?.team_head,
        type: "input",
      },
      {
        label: "Team name",
        text: authData?.external_details?.team_name,
        type: "input",
      },
    ]);
    // console.log("authData",authData)
  }, [authData]);
  // useEffect(()=>{
  //   console.log(dateFormat,"dateFormat")
  //   var newLocationDetails = locationDetails?.map(o=> {  if (o.key === "date_format"){ o.sub=dateFormat?.map((p)=>({label:p.display_name,value:p.id}))} return o})
  //   console.log(newLocationDetails,"newLocationDetails")
  //   setLocationDetails(newLocationDetails)

  // },[dateFormat])

  useEffect(() => {
    console.log(locationDetails, "locationDetails");
  }, [locationDetails]);

  useEffect(() => {
    console.log("mainData", mainData);
  }, [mainData]);

  const theme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          scroller: {
            background: "#fff",
          },
        },
      },
      MuiTabPanel: {
        styleOverrides: {
          root: {
            padding: "0px",
          },
        },
      },
    },
  });

  const handelInputChange = (key, value, index = null) => {
    setMainData({ ...mainData, [key]: value });
  };
  const handelSelectonChange = (key, value) => {
    if (key === "time_zone") {
      var n = locationDetails?.map((o) => {
        if (o.key == key) return { ...o, value: value };
        return o;
      });
      setLocationDetails(n);
    }
    setMainData({ ...mainData, [key]: value });
  };
  //   const handelRadionButtononChange = (key,value) =>{
  //     if (key == "date_format" || key == "time_format" ) {
  //       var newState = locationDetails?.map((o) => {
  //         if (o.key == key)
  //         {
  //           o.sub = o.sub.map((p) => {
  //             if (p.value == parseInt(value)){
  //               console.log(p.value,value,"p.value")
  //               p.checked = true;
  //             console.log(p,"pDataEndChecked")
  //             }
  //             else
  //             {p.checked = false}

  //             o.sub = p
  //             return p;
  //           });
  //           console.log(o,"oData")
  //         return o;}
  //       });
  //       console.log(newState,"newState")
  //       setLocationDetails(newState);

  //       setMainData({...mainData,[key]:value})

  //     }

  // }

  const handelRadionButtononChange = (prop, value) => {
    if (prop == "date_format" || prop == "time_format") {
      var OldState = locationDetails?.map((o) => {
        console.log(o, "dummy");
        if (o?.key == prop)
          o.sub.map((p) => {
            p.checked = false;
            return p;
          });
        return o;
      });
      setLocationDetails(OldState);
      var newState = locationDetails?.map((o) => {
        if (o?.key == prop)
          o.sub.map((p) => {
            if (p.value == value) p.checked = true;
            return p;
          });
        return o;
      });
      setLocationDetails(newState);

      setMainData({ ...mainData, [prop]: value });
    }
  };

  const handelToggleChange = (prop, value) => {
    console.log(prop, "toggler", value.target.checked);

    if (
      prop.key === "set_time_zone_automatically" ||
      prop.key === "set_time_automatically"
    )
      setLocationDetails(
        locationDetails?.map((o) => {
          if (o.key == prop.key)
            return { ...o, value: o?.value ? false : true };
          return o;
        })
      );
    else if (
      prop.key === "email" ||
      prop.key === "sms" ||
      prop.key === "reminder"
    )
      setNotifications(
        notifications?.map((o) => {
          if (o.key == prop.key)
            return { ...o, value: o?.value ? false : true };
          return o;
        })
      );
    setMainData({ ...mainData, [prop.key]: value.target.checked });
  };

  const handelSubmit = (type) => {
    console.log(mainData, "payloadMappingData");
    const payload = {
      id: authData?.id,
      preferences: {
        time_zone: {
          id: mainData?.time_zone?.id
            ? mainData?.time_zone?.id
            : authData?.preferences?.time_zone?.id,
          lookup_code: mainData?.time_zone?.lookup_code
            ? mainData?.time_zone?.lookup_code
            : authData?.preferences?.time_zone?.lookup_code,
          display_name: mainData?.time_zone?.label
            ? mainData?.time_zone?.label
            : authData?.preferences?.time_zone?.display_name,
        },
        date_format: {
          id:
            mainData?.date_format == "dd/mm/yyyy"
              ? 556
              : mainData?.date_format == "mm/dd/yyyy"
                ? 555
                : mainData?.date_format == "yyyy/mm/dd"
                  ? 557
                  : authData?.preferences?.date_format?.id,
          lookup_code: mainData?.date_format
            ? mainData?.date_format
            : authData?.preferences?.date_format?.lookup_code,
          display_name: mainData?.date_format
            ? mainData?.date_format
            : authData?.preferences?.date_format?.display_name,
        },
        time_format: {
          id:
            mainData?.time_format == "24_HOURS"
              ? 553
              : mainData?.time_format == "12_HOURS"
                ? 554
                : authData?.preferences?.time_format?.id,
          lookup_code: mainData?.time_format
            ? mainData?.time_format
            : authData?.preferences?.time_format,
          display_name: mainData?.time_format
            ? mainData?.time_format.toLowerCase().split("_").join(" ")
            : authData?.preferences?.time_format?.display_name,
        },
        notification_settings: {
          sms:
            mainData?.sms != null
              ? mainData?.sms
              : authData?.preferences?.notification_settings?.sms,
          email:
            mainData?.email != null
              ? mainData?.email
              : authData?.preferences?.notification_settings?.email,
          reminder:
            mainData?.reminder != null
              ? mainData?.reminder
              : authData?.preferences?.notification_settings?.reminder,
        },
        set_time_automatically:
          mainData?.set_time_automatically != null
            ? mainData?.set_time_automatically
            : authData?.preferences?.set_time_automatically,
        set_time_zone_automatically:
          mainData?.set_time_zone_automatically != null
            ? mainData?.set_time_zone_automatically
            : authData?.preferences?.set_time_zone_automatically,
      },
    };

    dispatch(loadAuthDataUpdate(payload));
    console.log(payload, "submitted");
  };
  // useEffect(()=>{console.log(locationDetails , "locationDetails")},[locationDetails])
  return (
    <>
      <ThemeProvider theme={theme}>
        {authData && timeZone && dateFormat && authData?.name && (
          <>
            <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>

              <div className="bot_pic">
                <img
                  src={authData?.profile?.link}
                  className="Bot_logo2"
                  alt="Bot_logo"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <h5 style={{ margin: 0 }} className="CardHeader">{authData?.Company?.company_name}</h5>
                <div className="CardContent">
                  <p>{authData?.Company?.email}</p>
                  <p>{authData?.address_details?.city} , {authData?.address_details?.state?.name} , {authData?.address_details?.country?.name}</p>
                </div>
              </div>
            </div>
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteViewBox
                view_data={generalDetails}
                header={"General Details "}
              />
            </Suspense>
            <Suspense fallback={<div>Loading... </div>}>
              <ProfileForm
                header={"Location Details"}
                data={locationDetails?.map((o) => {
                  switch (o?.key) {
                    case "time_zone":
                      o.data = timeZone?.map((p) => {
                        return { id: p?.id, label: p?.display_name };
                      });
                    // case "date_format":
                    //   o.sub = dateFormat?.map((p)=>({label:p.display_name,value:p.id, checked: p?.id == authData?.preferences?.date_format?.id ? true : false }))
                  }
                  return o;
                })}
                // sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",width:"50vw"}}

                IsButtonShow={true}
                ButtonText={"Submit"}
                handleButtonClick={handelSubmit}
                handelInputChange={handelInputChange}
                handelSelectonChange={handelSelectonChange}
                handelToggleChange={handelToggleChange}
                handelRadionButtononChange={handelRadionButtononChange}
              />
              <ProfileForm
                header={"Notifications Settings"}
                data={notifications?.map((o) => {
                  switch (o.key) {
                    case "time_zone":
                      // console.log(o,"list")
                      o.data = timeZone?.map((p) => {
                        return {
                          id: p?.id,
                          label: p?.display_name,
                          lookup_code: p?.lookup_code,
                        };
                      });
                  }
                  return o;
                })}
                // sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",width:"50vw"}}
                IsButtonShow={true}
                ButtonText={"Submit"}
                handleButtonClick={handelSubmit}
                handelInputChange={handelInputChange}
                handelSelectonChange={handelSelectonChange}
                handelToggleChange={handelToggleChange}
                handelRadionButtononChange={handelRadionButtononChange}
              />
              <RemoteViewBox
                view_data={accountDetails}
                header={"Account  Details"}
              />
            </Suspense>
          </>
        )}{" "}
      </ThemeProvider>
    </>
  );
}


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