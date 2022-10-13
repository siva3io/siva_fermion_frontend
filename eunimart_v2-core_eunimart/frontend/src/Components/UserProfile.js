import React from "react";
import "./popup.css";
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import { useHistory } from "react-router-dom";

export default function UserProfile() {
    const navigate = useHistory();
    const userData = JSON.parse(localStorage.getItem("user_data"))
    console.log(userData,"userData")
    console.log("sampleSample")
    const logOut = () => {
        console.log("logOut");
        localStorage.clear();
        navigate.push("/login");
    
      };
  return (
    <div
    >
      <div className="modelContainer">
        <div className="backdrop"></div>
        <div className="profileContainer">
          <img
            src={userData?.profile?.link}
            className="Bot_logo2"
            alt="Profile"
          />
          <h1 style={{ color: "black",margin:0 }}>{`${userData?.first_name} ${userData?.last_name}`}</h1>
          <h3 style={{ margin: 0, fontWeight: "500" }}>
          {userData?.email}
          </h3>
          <h3 style={{ margin: 0, fontWeight: "500" }}>
          {userData?.mobile_number}
          </h3>
          <div className="roleCon">
          {
            userData?.access_template_id?.map((o) => 
            <div className="roleNames">{o?.name}</div>
            )
          }
          </div>

          {/* <div className="roleCon">
            <div className="roleNames">Roles</div>
            <div className="roleNames">Roles</div>
          </div> */}
        </div>
        <div className="breakLine"></div>
        <div className="secPart">
        <EventAvailableRoundedIcon sx={{color:"black",height:"50px",width:"50px",background:"lightgreen",borderRadius:"50%",padding:"2%"}}/>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} > <CachedRoundedIcon sx={{color:"blue",height:"40px",width:"40px"}}/> 
        <span style={{ margin: 0, fontWeight: "500" }}>Calendar sync is On</span>
         </div>
        </div>
        <div className="breakLine"></div>
        <div className="logoutBtnCon">

        <div className="logoutBtn" onClick={logOut}>
            Logout
        </div>

        <p>Privacy Policy .Terms of service</p>
        </div>
      </div>
    </div>
  );
}
