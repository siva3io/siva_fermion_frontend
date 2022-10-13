import React, { useState, useRef, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import loginService from "../Services/loginService";
import verifyOtpService from "../Services/verifyOtpService";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import phone from "../../src/Assets/Images/phone.jpeg";
import cardVector from "../../src/Assets/Images/cardVector.png";
import Vector from "../../src/Assets/Images/Vector.png";
import google from "../../src/Assets/Images/google.png";
import orLoginWith from "../../src/Assets/Images/orLoginWith.png";
import mail from "../../src/Assets/Images/mail.png";
import enterOtp from "../../src/Assets/Images/enterOtp.jpeg";
import redCardVector from "../../src/Assets/Images/redCardVector.png";
import password from "../../src/Assets/Images/password.png";
import "../App.css";
import video from '../../src/Assets/Images/login_background.mp4';

import login_background from "../../src/Assets/Images/login_background.mp4";
import userData from "../Services/userData";
const Login = ({ setSessionId }) => {
  const navigate = useHistory();
  const [step1, setStep] = useState("mobile");
  const [stepN, setStepUser] = useState(" ");
  let personId = localStorage.getItem("user_id");
  let loginResponseData = sessionStorage.getItem("loginDataResponse");
  let number = localStorage.getItem("email") || "";
  let lengthNumber = number?.length;
  let splictNumber = number.split("");
  let b = '';
  for (let i = 0; i < lengthNumber - 3; i++) {
    b += 'X'
  }
  b = b + splictNumber[lengthNumber - 3] + splictNumber[lengthNumber - 2] + splictNumber[lengthNumber - 1];
  // let b = "XXXXXXX" +splictNumber[7]+splictNumber[8]+splictNumber[9];
  let newStr = b;
  let otpVerify = sessionStorage.getItem("otp");
  let newUserVerify = null;
  useEffect(() => {
    sessionStorage.removeItem("otp");
    sessionStorage.clear();
  }, []);
  console.log(newUserVerify, "newUserVerify");
  console.log(personId, "personId");
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Please enter your Email/Phone Number";
    } else if (values.email.length < 9) {
      errors.email = "Must be 10 characters or greater";
    }
    if (values['otp'] == " ") {
      console.log(values.otp, "pranathi_checking");
      if (!values.otp) {
        errors.otp = "OTP Required";
      }
    }
    // if (!values.otp) {
    //   console.log(values.otp,"pranathi_checking");
    //   errors.otp = "OTP Required";
    // }
    if (values.otp) {
      sessionStorage.setItem("otp", values.otp);
      if (!values.otp) {
        console.log(values.otp, "pranathi_checking");
        // errors.otp = "OTP Required";
      }
      else if (values.otp.length < 6) {
        errors.otp = "Must be 6 characters";
      }
    }

    return errors;
  };

  const loginForm = useFormik({
    initialValues: {
      email: "",
      // password: "",
    },

    validate,
    onSubmit: (e) => {
      PostData(e.email);
      localStorage.setItem("email", e.email);
    },
  });
  //verifyForm
  const verifyOtp = () => {
    const re = /^[0-9\b]+$/;
    const id = parseInt(personId);
    // const otp = re.test(otpVerify);
    const otp = otpVerify;
    PostVerifyData(id, otp);
    console.log(otp, "otp on entering");
  };


  const PostVerifyData = async (id, otp) => {
    const verifyOtpResponse = await verifyOtpService(id, otp, "/auth/verify_otp");
    if (
      verifyOtpResponse &&
      verifyOtpResponse.data &&
      verifyOtpResponse.data.data["status"] === true
    ) {
      // localStorage.setItem("user_id", verifyOtpResponse.data.data.id);
      console.log("verifyOtpResponse",verifyOtpResponse)
      localStorage.setItem("user_data",JSON.stringify(verifyOtpResponse?.data?.data?.user));

      localStorage.setItem(
        "token",
        verifyOtpResponse?.data?.data?.token
      );
      localStorage.setItem(
        "Core_beta_x64",
        verifyOtpResponse?.data?.data?.token
      );
      localStorage.setItem("access_template_id", verifyOtpResponse?.data?.data?.access_template_id);
      console.log(verifyOtpResponse.data.data["token"], "token in verifyOtpResponse");
      console.log(typeof (localStorage.getItem("newUser")), "local storage newuser");

      if (localStorage.getItem("newUser") === "true") {
        console.log(localStorage.getItem("newUser"), "local storage newuser");
        const timer = setTimeout(() => {
          navigate.push("/onBoarding");
        }, 1000);
        return () => clearTimeout(timer);
      }
      else {
        navigate.push("/home");
        console.log("old userInfo ");
      }
      toast.success(verifyOtpResponse.data.data.message);
    } else {
      toast.error(verifyOtpResponse.data.data.message);
      navigate.push("/login");
      sessionStorage.removeItem("otp");
      sessionStorage.clear();
    }
    const userAutData = await userData()
    if(
      userAutData && userAutData.data
    )
    {
      localStorage.setItem("user_data",JSON.stringify(userAutData?.data?.data));

      console.log(userAutData,"userAutData")
    }
  };
  //verifyForm.onSubmit


  const PostData = async (email) => {
    const loginResponse = await loginService(email, "/auth/user_login");
    if (
      loginResponse &&
      loginResponse.data &&
      loginResponse.data.data.otp_sent === true
      // loginResponse.data.data.status === true
      // loginResponse.data.meta["success"] === true
    ) {
      console.log(loginResponse.data.meta, "login successresponse");
      setStep("getOtp");
      sessionStorage.setItem("loginDataResponse", loginResponse.data.meta["success"]);
      // const loginResponseData = true;
      navigate.push("/login");
      localStorage.setItem("user_id", loginResponse.data.data.id);
      localStorage.setItem("user_data", loginResponse.data["user"]);
      localStorage.setItem('token', loginResponse?.data?.data["token"]);
      


      localStorage.setItem(
        "Core_beta_x64",
        loginResponse?.data?.data["token"]
      );
      localStorage.setItem("access_template_id", loginResponse?.data?.data?.access_template_id);
      // var personId = loginResponse.data.data.id
      // console.log(personId,"personId");

      // localStorage.setItem(
      //   "token",
      //   JSON.stringify(loginResponse.data.data["token"])
      // );
      console.log(loginResponse, "loginResponse in login");
      console.log(loginResponse.data.data.new_user, "new_user");
      // setSessionId(loginResponse.data.data["token"]);
      setSessionId(loginResponse.data.data.id);

      // toast.success("Successfully Logged In");
      localStorage.setItem(
        "newUser",
        loginResponse.data.data.new_user
      );
    } else {
      setStepUser("userDoesntExist");
      // const errors = {};
      // errors.email = "User name does not exist.";
      // return errors;
      // console.log(loginResponse.meta.message,"toaster error");
      toast.error(loginResponse &&
        loginResponse.data && loginResponse.data["meta"]["success"]);
      // navigate.push("/login");
    }
  };
  const vidRef = useRef(null);
  const handlePlayVideo = () => {
    vidRef.current.play();
  };



  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      // alert("You have typed ");
      verifyOtp();
    }
  };
  useEffect(() => {
    handlePlayVideo();
  }, []);

  return (
    <div>
      <div className="login-wrapper">
        <video
          autoplay
          muted
          style={{
            objectFit: "cover",
            height: "100vh",
            width: "100vw",
            objectFit: "initial",
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
          ref={vidRef}
        >
          {/* <source
            src="https://bassam2704.s3.amazonaws.com/login_background+(1).mp4"
            type="video/mp4"
          /> */}
          <source src={video} type="video/mp4" />
        </video>
        <div className="main_wrapper">
          <div className="loginDiv">
            <div className="image-container">
              <p className="registerHeading"></p>
            </div>

            {/* {stepN && stepN !="userDoesntExist" && */}
            {
              stepN && stepN != "userDoesntExist" &&
              stepN && stepN != "one" &&
              <Box>
                <Typography
                  fontFamily="Poppins"
                  fontSize="31px"
                  fontWeight="700"
                  textAlign="center"
                  lineHeight="47px"
                  color="#001661"
                >
                  Welcome!
                </Typography>
              </Box>}
            {stepN && stepN == "userDoesntExist"
              && step1 && step1 != "getOtp" &&
              <Box>
                <Typography
                  fontFamily="Poppins"
                  fontSize="31px"
                  fontWeight="700"
                  textAlign="center"
                  lineHeight="47px"
                  color="#001661"
                >
                  Forgot Username?
                </Typography>
              </Box>}

            {stepN && stepN == "one" &&
              <Box>
                <Typography
                  fontFamily="Poppins"
                  fontSize="31px"
                  fontWeight="700"
                  textAlign="center"
                  lineHeight="47px"
                  color="#001661"
                >
                  Forgot Username?
                </Typography>
              </Box>
            }
            {/* {step1 && step1 == "mobile" && stepN && stepN !="one" &&   step1 && step1 != "getOtp" &&
            <Box>
            <Typography
              fontFamily="Poppins"
              fontSize="31px"
              fontWeight="700"
              textAlign="center"
              lineHeight="47px"
              color="#001661"
            >
              Welcome!
            </Typography>
          </Box>} */}


            {/* {loginForm.touched.password && loginForm.errors.password ? (
          <div className="errorMessage">{loginForm.errors.password}</div>
        ) : null} */}
            <form className="form-horizontal" onSubmit={loginForm.handleSubmit}>

              {loginForm.touched.email && loginForm.errors.email ? (
                <div className="errorMessage">{loginForm.errors.email}</div>
              ) : null}
              {step1 && step1 != "getOtp" &&
                stepN && stepN != "userDoesntExist" && (
                  <Box
                    sx={{
                      padding: "12px 16px",
                      width: "100%",
                      height: "65px",
                      borderRadius: "8px",
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    {stepN && stepN == "userDoesntExist"
                      && step1 && step1 != "getOtp" &&
                      <TextField
                        variant="standard"
                        placeholder="Please enter linked mobile number or email"
                        className="form-control-inline"
                        id="email"
                        name="email"
                        type="text"
                        boxShadow="2px,2px,10px,rgba(0, 0, 0, 0.15)"
                        fullWidth={true}
                        InputProps={{
                          startAdornment: (
                            <img
                              src={cardVector}
                              style={{
                                height: "20px",
                                width: "20px",
                                paddingRight: "14px",
                                padding: "10px",
                                cursor: "pointer",
                              }}
                            />
                          ),
                          disableUnderline: true,
                          endAdornment: (
                            <>
                              {loginForm &&
                                loginForm.values.email.length >= 9 &&
                                step1 == "mobile" && (
                                  <img
                                    src={Vector}
                                    style={{
                                      height: "24px",
                                      width: "24px",
                                      paddingRight: "14px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      loginForm.handleSubmit();
                                      // setStep("getOtp");
                                    }}
                                  />
                                )}
                              {loginForm &&
                                loginForm.values.email.length >= 9 &&
                                step1 == "email" && (
                                  <Typography
                                    fontFamily="Inter"
                                    fontSize="16px"
                                    textAlign="right"
                                    lineHeight="24px"
                                    color="#416BFF"
                                    width="124px"
                                    height="24px"
                                    marginRight="20.5px"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setStep("getOtp");
                                    }}
                                  >
                                    Get OTP
                                  </Typography>
                                )}
                            </>
                          ),
                        }}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        value={loginForm.values.email}
                      />}
                    {step1 && step1 != "getOtp" &&
                      stepN && stepN != "userDoesntExist" &&
                      <TextField
                        variant="standard"
                        placeholder="Mobile Number, Email or User Name"
                        className="form-control-inline"
                        id="email"
                        name="email"
                        type="text"
                        boxShadow="2px,2px,10px,rgba(0, 0, 0, 0.15)"
                        fullWidth={true}
                        InputProps={{
                          startAdornment: (
                            <img
                              src={cardVector}
                              style={{
                                height: "20px",
                                width: "20px",
                                paddingRight: "14px",
                                padding: "10px",
                                cursor: "pointer",
                              }}
                            />
                          ),
                          disableUnderline: true,
                          endAdornment: (
                            <>
                              {loginForm &&
                                loginForm.values.email.length >= 9 &&
                                step1 == "mobile" && (
                                  <img
                                    src={Vector}
                                    style={{
                                      height: "24px",
                                      width: "auto",
                                      paddingRight: "14px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      loginForm.handleSubmit();
                                      // setStep("getOtp");
                                    }}
                                  />
                                )}
                              {loginForm &&
                                loginForm.values.email.length >= 9 &&
                                step1 == "email" && (
                                  <Typography
                                    fontFamily="Inter"
                                    fontSize="16px"
                                    textAlign="right"
                                    lineHeight="24px"
                                    color="#416BFF"
                                    width="124px"
                                    height="24px"
                                    marginRight="20.5px"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setStep("getOtp");
                                    }}
                                  >
                                    Get OTP
                                  </Typography>
                                )}
                            </>
                          ),
                        }}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        value={loginForm.values.email}
                      />}
                    {console.log(loginForm, "login form updated")}
                  </Box>
                )}

              {/* {loginForm.touched.email && loginForm.errors.email ? (
                <div className="errorMessage">{loginForm.errors.email}</div>
              ) : null} */}


              {/* //RedErrorCode */}
              {stepN && stepN == "userDoesntExist" &&
                <Box
                  sx={{
                    padding: "12px 16px",
                    width: "100%",
                    height: "65px",
                    borderRadius: "8px",
                    color: "red",
                  }}
                  noValidate
                  autoComplete="off"
                >

                  <TextField
                    variant="standard"
                    placeholder="Mobile Number, Email or User Name"
                    className="form-control-inline"
                    id="emailErrorMessage"
                    name="email"
                    //  type="text"
                    color="red"
                    value="invalid user name"
                    boxShadow="2px,2px,10px,rgba(0, 0, 0, 0.15)"
                    fullWidth={true}
                    InputProps={{
                      startAdornment: (
                        <img
                          src={redCardVector}
                          style={{
                            height: "20px",
                            width: "20px",
                            paddingRight: "14px",
                            padding: "10px",
                            cursor: "pointer",
                          }}
                        />
                      ),
                      disableUnderline: true,
                      endAdornment: (
                        <>
                          {loginForm &&
                            loginForm.values.email.length > 9 &&
                            step1 == "mobile" && (
                              //  <img
                              //    src={Vector}
                              //    style={{
                              //      height: "24px",
                              //      width: "24px",
                              //      paddingRight: "14px",
                              //      cursor: "pointer",
                              //    }}
                              <Box
                                sx={{ cursor: "pointer" }}>
                                <Typography
                                  fontFamily="Inter"
                                  fontSize="16px"
                                  fontWeight="500"
                                  textAlign="center"
                                  lineHeight="47px"
                                  paddingRight="20px"
                                  color="#1A3DF5"
                                  cursor="pointer"
                                  onClick={() => {
                                    // setStepUser("one");
                                    window.location.reload()
                                    // localStorage.clear();
                                  }}
                                >
                                  Retry
                                </Typography>
                              </Box>

                            )}
                          {loginForm &&
                            loginForm.values.email.length > 9 &&
                            step1 == "email" && (
                              <Typography
                                fontFamily="Inter"
                                fontSize="16px"
                                textAlign="right"
                                lineHeight="24px"
                                color="#416BFF"
                                width="124px"
                                height="24px"
                                marginRight="20.5px"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setStep("getOtp");
                                }}
                              >
                                Get OTP
                              </Typography>
                            )}
                        </>
                      ),
                    }}
                    onChange={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                  //  value={loginForm.values.email}
                  />
                  {console.log(loginForm, "login form updated")}
                </Box>
              }
              {/* //RedErrorCode */}
              {/* //if user doesnt exist */}

              {stepN && stepN == "userDoesntExist" &&
                <Box
                  sx={{ cursor: "pointer" }}>
                  <Typography
                    fontFamily="Poppins"
                    fontSize="16px"
                    fontWeight="600"
                    textAlign="center"
                    lineHeight="47px"
                    color="#1A3DF5"
                    cursor="pointer"
                    onClick={() => {
                      setStepUser("one");
                      // setStepUser("userDoesntExist");
                      // window.location.reload()
                    }}
                  >
                    Have you logged in before ?
                  </Typography>
                </Box>
              }
              {/* //if user doesnt exist */}


              {step1 && step1 != "getOtp" && (
                <>
                  <div className="button_wrapper">
                    <div className="orWithButton">
                      <img
                        src={orLoginWith}
                        style={{
                          height: "Hug (721px)",
                          width: "100%",
                          paddingRight: "14px",
                          padding: "24px, 24px, 56px, 24px",
                          gap: "36px",
                          top: "196px",
                          // cursor: "pointer",
                        }}
                      />
                    </div>
                    <button class="social-signin google">
                      <img
                        src={google}
                        style={{
                          height: "19px",
                          width: "auto",
                          paddingRight: "14px",
                          cursor: "pointer",
                        }}
                      />
                      <Typography
                        fontFamily="Inter"
                        fontSize="16px"
                        fontWeight="500"
                      >
                        Log in with Google
                      </Typography>
                    </button>

                    <button class="social-signin twitter">
                      <TwitterIcon
                        style={{
                          height: "19px",
                          width: "auto",
                          paddingRight: "14px",
                          cursor: "pointer",
                        }}
                      />
                      <Typography
                        fontFamily="Inter"
                        fontSize="16px"
                        fontWeight="500"
                      >
                        Log in with Twitter
                      </Typography>
                    </button>

                    <button class="social-signin linkdln">
                      <LinkedInIcon
                        style={{
                          height: "19px",
                          width: "auto",
                          paddingRight: "14px",
                          cursor: "pointer",
                        }}
                      />
                      <Typography
                        fontFamily="Inter"
                        fontSize="16px"
                        fontWeight="500"
                      >
                        Log in with LinkedIn
                      </Typography>
                    </button>
                  </div>
                </>
              )}

              {
                //  loginResponseData &&
                //  loginResponseData == true &&
                step1 && step1 == "getOtp" &&
                // setStepUser("loginPageOne")
                (
                  <>
                    <Box
                      component="form"
                      sx={{
                        // "& > :not(style)": { m: 1 },
                        padding: "12px 16px",
                        // width:"420px !important",
                        // height: "65px",
                        display: "flex",
                        borderRadius: "8px",
                        justifyContent: "center",
                        width: "100%",
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <Typography
                        fontFamily="Inter"
                        fontSize="16px"
                        fontWeight="400"
                        textAlign="center"
                        lineHeight="24px"
                        width="40%"
                        color="#2D3847"
                        paddingRight="5px"

                      >
                        The OTP is send to
                      </Typography>
                      <Typography
                        fontFamily="Inter"
                        fontSize="16px"
                        fontWeight="400"
                        textAlign="center"
                        // width="50%"
                        lineHeight="24px"
                        color="#416BFF"
                      >
                        {b}
                      </Typography>
                    </Box>

                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1 },
                        padding: "12px 16px",
                        width: "351px!important",
                        height: "65px",
                        borderRadius: "8px",
                        paddingRight: "31px",
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        variant="standard"
                        placeholder="Enter OTP"
                        className="form-control-inline"
                        id="otp"
                        name="otp"
                        type="password"
                        pattern="[0-9]*"
                        // maxLength="6"
                        width="351px!important"
                        height="65px !important"
                        autoComplete="off"
                        fullWidth
                        // onKeyPress={(e) =>keyDownHandler(e)}
                        onInput={(e) => { e.target.value = (e.target.value).toString().slice(0, 6).replace(/\D/g, "") }}
                        // onInput = {(e) =>{ e.target.value = (e.target.value).toString().slice(0,6) }}
                        InputProps={{
                          maxLength: 6,
                          startAdornment: (
                            <img
                              src={password}
                              style={{

                                width: "47px",
                                paddingRight: "14px",
                                cursor: "pointer",
                                padding: "10px",
                              }}
                            />
                          ),
                          disableUnderline: true,
                          endAdornment: (
                            <>
                              {/* {loginForm && loginForm.values.password.length>7 && step1=="email" && */}
                              <Typography
                                fontFamily="Inter"
                                fontSize="16px"
                                textAlign="right"
                                lineHeight="24px"
                                color="#416BFF"
                                width="100%"
                                margin="24px"
                                style={{ cursor: "pointer", backgroundColor:"#0093de", color:"#fff", padding:"5px", textAlign:"center", borderRadius:"5px" }}
                                onClick={() => {
                                  // loginForm.handleSubmit();
                                  // verifyForm.handleSubmit();
                                  verifyOtp();

                                }}
                              // onClick={()=>!loginForm.isValid}
                              >
                                {" "}
                                Verify OTP{" "}
                              </Typography>
                              {/* } */}
                            </>
                          ),
                        }}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                      // value={loginForm.values.otp}
                      />
                      {console.log(loginForm, "login form updated")}
                    </Box>
                    {loginForm.touched.otp && loginForm.errors.otp ? (
                      <div className="errorMessage">{loginForm.errors.otp}</div>
                    ) : null}
                    
                  </>
                )} 
            </form> 
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;