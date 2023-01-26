import "./chatBot.css";
import { useEffect, useState, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { BiBot } from "react-icons/bi";
import { GrAttachment, GrImage, GrVideo, GrMicrophone } from "react-icons/gr";
import { FiSettings, FiMinusCircle } from "react-icons/fi";
import { BsFileEarmarkMusic, BsCamera, BsXCircle } from "react-icons/bs";
import { SiGooglesheets } from "react-icons/si";
import Tooltip from "@mui/material/Tooltip";
import logo from "../Components/Chatbot.png";
import logo2 from "../Components/images.png";
import axios from "axios";
import * as React from "react";
import "filepond/dist/filepond.min.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";

function Basic({ setDisplay }) {
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setbotTyping] = useState(false);
  const [attachmentClicked, setAttachmentClicked] = useState(false);
  const [settingsClicked, setSettingsClicked] = useState(false);
  const [userselection, setuserselection] = useState(false);
  const [userselectionText, setuserselectionText] = useState("");
  const [convId, setConvId] = useState("");
  const [files, setFiles] = useState([]);
  const [mediaBar, setMediaBar] = useState(false);
  const [inputValue, setInputvalue] = useState({});
  const [chatHistory, setchatHistory] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    createSession();
  }, []);
  useEffect(() => {
    const objDiv = document.getElementById("messageArea");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chat]);

  const rasaAPI = async function handleClick(name, msg) {
    axios
      .post(
        "https://odoo-test.eunimart.com/rasachatbot/post_message?db=odoo&username=admin&password=admin",
        {
          conversation_id: convId,
          message_content: msg,
        }
      )

      .then(response => {
        if (response.data.result) {
          let response1 = response.data.result.responses;
          const temp = response1[0] ? response1[0] : null;
          const temp1 = response1[1] ? response1[1] : null;
          const temp2 = response1[2] ? response1[2] : null;
          const temp3 = response1[3] ? response1[3] : null;
          console.log(temp1, "kkkk");
          const conversation_id = response.data.result["conversation_id/uuid"];
          const recipient_msg = temp ? temp["text"] : null;
          const recipient_msg1 = temp1 ? temp1["text"] : null;
          const recipient_msg2 = temp2 ? temp2["text"] : null;
          const recipient_msg3 = temp3 ? temp3["text"] : null;
          console.log(recipient_msg1, recipient_msg2, recipient_msg3, "2,3,4");
          const buttons = response.data.result["buttons"];
          const response_temp = {
            sender: "bot",
            conversation_id: conversation_id,
            msg: recipient_msg,
            msg2: recipient_msg1,
            msg3: recipient_msg2,
            msg4: recipient_msg3,
            buttons: buttons,
          };
          setbotTyping(false);

          setChat(chat => [...chat, response_temp]);
        } else {
          const response_temp = {
            sender: "bot",
            conversation_id: "err_msg" + Math.floor(Math.random() * 1000 + 1),
            msg: "Sorry we could not understand your message",
            buttons: [],
          };
          setTimeout(() => {
            setbotTyping(false);
            setChat(chat => [...chat, response_temp]);
          }, 2000);
        }
      });
  };

  async function createSession() {
    axios
      .post(
        "https://odoo-test.eunimart.com/rasachatbot/create_session?db=odoo&username=admin&password=admin",
        {
          user_id: localStorage.getItem("user_id"),
          token: localStorage.getItem("token"),
        }
      )

      .then(response => {
        if (response.data.result.chat_history) {
          setChat(response.data.result.chat_history);
        }

        // console.log(chat,chatHistory,"chatHistory")

        if (response.data.result.conversation_id) {
          setConvId(response.data.result.conversation_id);
        }
      });
  }

  //button handlers
  const handleSubmit = evt => {
    evt.preventDefault();
    const name = "eunimart";
    const request_temp = { sender: "user", msg: inputMessage };

    if (inputMessage !== "") {
      setChat(chat => [...chat, request_temp]);
      setbotTyping(true);
      setInputMessage("");
      rasaAPI(name, inputMessage);
    } else {
      window.alert("Please enter valid message");
    }
  };

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    console.log("wwwwwork", bottomRef.current.scrollIntoView);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSettings = () => {
    setSettingsClicked(prev => !prev);
  };
  const handleMin = () => {
    setDisplay(prev => !prev);
  };
  const handleAttachment = () => {
    setAttachmentClicked(prev => !prev);
  };
  const handleRespButton = button => {
    console.log("inputvalue", inputValue, button);
    let button_id = button.button_id;
    let button_type = button.button_type;
    if (button["text/title"] === "Book a Demo") {
      const request_temp = {
        sender: "user",
        msg: null,
        type: "input",
        nme: "Demo_emailID",
      };
      const request_temp1 = {
        sender: "bot",
        msg: "Enter your Email ID",
        type: "input",
        nme: "Demo_emailID",
      };
      setChat(chat => [...chat, request_temp1, request_temp]);
    }

    if (button["text/title"] === "View Order Status") {
      const request_temp = {
        sender: "user",
        msg: null,
        type: "input",
        nme: "sales_order_id",
      };
      const request_temp1 = {
        sender: "bot",
        msg: "Enter your Order ID",
        type: "input",
        nme: "sales_order_id",
      };
      setChat(chat => [...chat, request_temp1, request_temp]);
    }

    if (button["text/title"] === "Create SalesOrder") {
      const request_temp = {
        sender: "user",
        msg: null,
        type: "date",
        nme: "date",
      };
      const request_temp1 = {
        sender: "bot",
        msg: "Select Date",
        type: "date",
        nme: "date",
      };
      setChat(chat => [...chat, request_temp1, request_temp]);
    }

    if (button["text/title"] === "Rise Ticket with image") {
      const request_temp = {
        sender: "user",
        msg: null,
        type: "image",
        nme: "Reportimage",
      };
      const request_temp1 = {
        sender: "bot",
        msg: "Add image and description",
        type: "image",
        nme: "Reportimage",
      };
      const request_temp3 = {
        sender: "user",
        msg: null,
        type: "input",
        nme: "ReportDescription",
      };
      setChat(chat => [...chat, request_temp1, request_temp, request_temp3]);
    }

    if (button["text/title"] === "No") {
      const request_temp = {
        sender: "user",
        msg: null,
        type: "input",
        nme: "Sales_price",
      };
      const request_temp1 = {
        sender: "bot",
        msg: "Enter Sales Price",
        type: "input",
        nme: "Sales_price",
      };
      setChat(chat => [...chat, request_temp1, request_temp]);
    }
    if (button["text/title"] === "Yes") {
      const request_temp = {
        sender: "user",
        msg: null,
        type: "input",
        nme: "Varient_SKU",
      };
      const request_temp1 = {
        sender: "bot",
        msg: "Enter Varient SKU",
        type: "input",
        nme: "Varient_SKU",
      };
      setChat(chat => [...chat, request_temp1, request_temp]);
    }
    if (button["text/title"] == "Eunimart Sales Team") {
      const request_temp = {
        sender: "user",
        msg: null,
        type: "input",
        nme: "salesname",
      };
      const request_temp1 = {
        sender: "bot",
        msg: "Enter your Name",
        type: "input",
        nme: "salesname",
      };
      setChat(chat => [...chat, request_temp1, request_temp]);
    }
    if (button["text/title"] == "Enimart Support Team") {
      const request_temp = {
        sender: "user",
        msg: null,
        type: "input",
        nme: "supportname",
      };
      const request_temp1 = {
        sender: "bot",
        msg: "Enter your Name",
        type: "input",
        nme: "supportname",
      };
      setChat(chat => [...chat, request_temp1, request_temp]);
    }
    if (button["text/title"] === "Create Product") {
      const request_temp = {
        sender: "user",
        msg: null,
        type: "input",
        nme: "Product_Title",
      };
      const request_temp1 = {
        sender: "bot",
        msg: "Product Title",
        type: "input",
        nme: "Product_Title",
      };
      setChat(chat => [...chat, request_temp1, request_temp]);
    }
    if (
      button["text/title"] !== "Create SalesOrder" &&
      button["text/title"] !== "Create Product" &&
      button["text/title"] !== "Yes" &&
      button["text/title"] !== "No" &&
      button["text/title"] !== "Book a Demo" &&
      button["text/title"] !== "Eunimart Sales Team" &&
      button["text/title"] !== "Enimart Support Team" &&
      button["text/title"] !== "Rise Ticket with image" &&
      button["text/title"] !== "View Order Status"
    ) {
      const request_temp = { sender: "user", msg: button["text/title"] };
      setChat(chat => [...chat, request_temp]);
    }

    setuserselectionText(button["text/title"]);
    setuserselection(true);

    var payload1 = {};

    if (button_type === "salesorderid") {
      payload1 = {
        id: inputValue.sales_order_id,
      };
    }

    if (button_type === "RaisedTicket") {
      payload1 = {
        ticketDescription: inputValue.ReportDescription,
        // ticketImage:".png"

        // Demo_phoneNumber: inputValue.Demo_phoneNumber,
      };
    }

    if (button_type == "Demo") {
      payload1 = {
        Demo_emailID: inputValue.Demo_emailID,
        Demo_phoneNumber: inputValue.Demo_phoneNumber,
      };
    }

    if (button_type == "Eunimartsupport") {
      payload1 = {
        support_name: inputValue.supportname,
        support_phoneNumber: inputValue.supportphoneNumber,
        support_emailID: inputValue.supportEmailID,
      };
    }
    if (button_type == "Eunimartsales") {
      payload1 = {
        sales_name: inputValue.salesname,
        sales_phoneNumber: inputValue.salesphoneNumber,
        sales_emailID: inputValue.salesEmailID,
      };
    }

    if (button_type == "sales_order") {
      payload1 = {
        // {inputValue.price {
        currency_id: inputValue.currency == "USD" ? 2 : 1,
        customer_name: inputValue.customer_name,
        so_date: inputValue.date + "T22:19:32.8080397+05:30",
        price: inputValue.price,
        product_name: inputValue.product_title,
        quantity: inputValue.quantity,
      };
    } else if (button_type === "products") {
      payload1 = {
        // else{
        product_name: inputValue.product_name,
        cost_price: inputValue.cost_price,
        mrp: inputValue.mrp,
        package_Height: inputValue.Package_Height,
        package_Weight: inputValue.Package_Weight,
        package_Width: inputValue.Package_Width,
        package_length: inputValue.Package_length,
        sku_code: inputValue.Product_SKU_ID,
        product_type_id: inputValue.Product_Type,
        image_options: [
          {
            data: "",
            link: inputValue.Product_img_url,
            name: "image1",
            size: 200,
            type: "image/jpeg",
          },
        ],
        Sales_price: inputValue.Sales_price,
      };
    }

    axios
      .post("https://odoo-test.eunimart.com/rasachatbot/button_response", {
        // credentials: "same-origin",
        conversation_id: convId,
        button_id: Number(button_id),
        payload: payload1,
      })

      .then(response => {
        // console.log(response, ">>>>>>>>>>> response");
        // if (response.data) {
        if (button["text/title"] !== "Create SalesOrder") {
          let response1 = response.data.result.responses;
          // console.log(response.data.result.responses, ">>>>>>>>> let response");
          const temp = response1[0] ? response1[0] : null;
          const temp1 = response1[1] ? response1[1] : null;
          const temp2 = response1[2] ? response1[2] : null;
          const temp3 = response1[3] ? response1[3] : null;
          const conversation_id = response.data.result["conversation_id/uuid"];
          const recipient_msg = temp ? temp["text"] : null;
          const recipient_msg1 = temp1 ? temp1["text"] : null;
          const recipient_msg2 = temp2 ? temp2["text"] : null;
          const recipient_msg3 = temp3 ? temp3["text"] : null;
          const buttons = response.data.result["buttons"];
          const response_temp = {
            sender: "bot",
            conversation_id: conversation_id,
            msg: recipient_msg,
            msg2: recipient_msg1,
            msg3: recipient_msg2,
            msg4: recipient_msg3,
            buttons: buttons,
          };

          // console.log(response_temp, ">>>>>>>>>bot");
          setbotTyping(false);

          setChat(chat => [...chat, response_temp]);
        }
        // scrollBottom();
        // }
      });
  };
  const handleMedia = () => {
    // setFiles([]);
    setAttachmentClicked(prev => !prev);
    setMediaBar(prev => !prev);
  };

  const handleRestart = () => {
    setChat([]);
    setSettingsClicked(false);
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleCreateSO = b => {
    console.log("hi Po");
    // const request_temp = { sender: "bot", msg: "Enter Date" };
    // setChat((chat) => [...chat, request_temp]);
  };

  const handleUserSelection = (e, prop) => {
    console.log("handleUserSelection", e, e.target.value, prop);
    const tempValue = { ...inputValue, [prop]: e.target.value };
    setInputvalue(tempValue);
    console.log("inputValue", inputValue);
    const request_temp = {
      sender: "user",
      msg: null,
      type: "select",
      nme: "currency",
    };
    const request_temp1 = {
      sender: "bot",
      msg: "Select Currency",
      type: "select",
      nme: "currency",
    };
    setChat(chat => [...chat, request_temp1, request_temp]);
  };

  const handleInputNext = (e, prop) => {
    const tempValue = { ...inputValue, [prop]: e.target.value };
    setInputvalue(tempValue);
    console.log("inputValue", inputValue);
  };

  const handleproductInputnext = (e, prop) => {
    const tempValue = { ...inputValue, [prop]: e.target.value };
    setInputvalue(tempValue);
    console.log("inputValue", inputValue);
    // const request_temp = { sender: "user", msg: null, type: "input", nme: "Product_SKU_ID" };
    // const request_temp1 = { sender: "bot", msg: "Product SKU ID", type: "input", nme: "Product_SKU_ID" };
    // setChat((chat) => [...chat,request_temp1, request_temp]);
  };

  const handleKeyDown1 = (event, prop) => {
    if (event.key === "Enter") {
      if (prop == "sales_order_id") {
        const request_temp1 = {
          sender: "bot",
          buttons: [
            {
              "text/title": "Submit Order ID",
              button_id: 40,
              button_type: "salesorderid",
            },
            { "text/title": "Cancel", button_id: 41 },
          ],
          msg: "Select Option",
          nme: "Select_Option",
        };

        setChat(chat => [...chat, request_temp1]);
      }
      if (prop == "ReportDescription") {
        const request_temp1 = {
          sender: "bot",
          buttons: [
            {
              "text/title": "Submit Ticket",
              button_id: 34,
              button_type: "RaisedTicket",
            },
            { "text/title": "Cancel", button_id: 35 },
          ],
          msg: "Select Option",
          nme: "Select_Option",
        };

        setChat(chat => [...chat, request_temp1]);
      }

      if (prop == "Demo_emailID") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "Demo_phoneNumber",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter your phone number",
          type: "input",
          nme: "Demo_phoneNumber",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }

      if (prop == "supportname") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "supportphoneNumber",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter Mobile number",
          type: "input",
          nme: "supportphoneNumber",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }
      if (prop == "supportphoneNumber") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "supportEmailID",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter Email ID",
          type: "input",
          nme: "supportEmailID",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }

      if (prop == "supportEmailID") {
        const request_temp1 = {
          sender: "bot",
          buttons: [
            {
              "text/title": "Submit",
              button_id: 32,
              button_type: "Eunimartsupport",
            },
            { "text/title": "Cancel", button_id: 33 },
          ],
          msg: "Select Option",
          nme: "Select_Option",
        };

        setChat(chat => [...chat, request_temp1]);
      }

      if (prop == "salesname") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "salesphoneNumber",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter Mobile number",
          type: "input",
          nme: "salesphoneNumber",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }
      if (prop == "salesphoneNumber") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "salesEmailID",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter Email ID",
          type: "input",
          nme: "salesEmailID",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }

      if (prop == "salesEmailID") {
        const request_temp1 = {
          sender: "bot",
          buttons: [
            {
              "text/title": "Submit",
              button_id: 32,
              button_type: "Eunimartsales",
            },
            { "text/title": "Cancel", button_id: 33 },
          ],
          msg: "Select Option",
          nme: "Select_Option",
        };

        setChat(chat => [...chat, request_temp1]);
      }

      if (prop == "Demo_phoneNumber") {
        const request_temp1 = {
          sender: "bot",
          buttons: [
            { "text/title": "Submit", button_id: 32, button_type: "Demo" },
            { "text/title": "Cancel", button_id: 33 },
          ],
          msg: "Select Option",
          nme: "Select_Option",
        };

        setChat(chat => [...chat, request_temp1]);
      }
      if (prop == "Package_Weight") {
        const request_temp1 = {
          sender: "bot",
          buttons: [
            {
              "text/title": "Submit Form and Create PO",
              button_id: 26,
              button_type: "products",
            },
            { "text/title": "Cancel", button_id: 27 },
          ],
          msg: "Select Option",
          nme: "Select_Option",
        };

        setChat(chat => [...chat, request_temp1]);
      }

      if (prop == "price") {
        // const request_temp = {
        //   sender: "user",
        //   msg: null,

        //   nme: "Product_Varient",
        // };
        const request_temp1 = {
          sender: "bot",
          buttons: [
            {
              "text/title": "Submit Form and Create SO",
              button_id: 26,
              button_type: "sales_order",
            },
            { "text/title": "Cancel", button_id: 27 },
          ],
          msg: "Select Option",
          nme: "Select_Option",
        };

        setChat(chat => [...chat, request_temp1]);
      }

      if (prop == "Varient_SKU") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "variant_url",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter Variant URL",
          type: "input",
          nme: "variant_url",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }
      if (prop == "variant_url") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "variant_base_price",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter Variant Base Price",
          type: "input",
          nme: "variant_base_price",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }
      if (prop == "variant_base_price") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "Sales_price",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter Sales Price",
          type: "input",
          nme: "Sales_price",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }

      if (prop == "Sales_price") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "Cost_Price",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter Cost Price",
          type: "input",
          nme: "Cost_Price",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }
      if (prop == "Cost_Price") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "MRP",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter MRP",
          type: "input",
          nme: "MRP",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }
      if (prop == "MRP") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "select2",
          nme: "Variant_Currency",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Select Currency",
          type: "select2",
          nme: "Variant_Currency",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }

      if (prop == "Package_length") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "Package_Width",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter package Width",
          type: "input",
          nme: "Package_Width",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }
      if (prop == "Package_Width") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "Package_Height",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter package Height",
          type: "input",
          nme: "Package_Height",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }
      if (prop == "Package_Height") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "Package_Weight",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter package Weight",
          type: "input",
          nme: "Package_Weight",
        };
        setChat(chat => [...chat, request_temp1, request_temp]);
      }

      if (prop == "Product_img_url") {
        // const request_temp = {
        //   sender: "user",
        //   msg: null,

        //   nme: "Product_Varient",
        // };
        const request_temp1 = {
          sender: "bot",
          buttons: [{ "text/title": "Yes" }, { "text/title": "No" }],
          msg: "Select Product Varient",
          nme: "Product_Varient",
        };

        setChat(chat => [...chat, request_temp1]);
      }

      if (prop == "Product_Title") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "Product_SKU_ID",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter Product SKU ID",
          type: "input",
          nme: "Product_SKU_ID",
        };

        setChat(chat => [...chat, request_temp1, request_temp]);
      }

      if (prop == "Product_SKU_ID") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "select1",
          nme: "Product_Type",
          options: ["Packaging", "service", "Consumable", "Storage"],
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Select Product Type",
          type: "select",
          nme: "Product_Type",
          options: ["Packaging", "service", "Consumable", "Storage"],
        };

        setChat(chat => [...chat, request_temp1, request_temp]);
      }

      if (prop == "customer_name") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "product_title",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter Product Title",
          type: "input",
          nme: "product_title",
        };

        setChat(chat => [...chat, request_temp1, request_temp]);
      }
      if (prop == "product_title") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "quantity",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter Quantity",
          type: "input",
          nme: "quantity",
        };

        setChat(chat => [...chat, request_temp1, request_temp]);
      }
      if (prop == "quantity") {
        const request_temp = {
          sender: "user",
          msg: null,
          type: "input",
          nme: "price",
        };
        const request_temp1 = {
          sender: "bot",
          msg: "Enter Price",
          type: "input",
          nme: "price",
        };

        setChat(chat => [...chat, request_temp1, request_temp]);
      }
    }
  };

  const [currency, setCurrency] = React.useState("");
  const [Varientcurrency, setVarientcurrency] = React.useState("");
  const [Product_Type, setProduct_Type] = React.useState("");

  const handleChange2 = event => {
    setVarientcurrency(event.target.value);
    const tempValue1 = {
      ...inputValue,
      ["Variant_Currency"]: event.target.value,
    };
    // setCurrency(event.target.value);
    setInputvalue(tempValue1);
    const request_temp = {
      sender: "user",
      msg: null,
      type: "input",
      nme: "Package_length",
    };
    const request_temp1 = {
      sender: "bot",
      msg: "Enter package length",
      type: "input",
      nme: "Package_length",
    };
    setChat(chat => [...chat, request_temp1, request_temp]);
  };

  const handleChange1 = event => {
    setProduct_Type(event.target.value);
    const tempValue1 = { ...inputValue, ["Product_Type"]: event.target.value };
    setCurrency(event.target.value);
    setInputvalue(tempValue1);
    const request_temp = {
      sender: "user",
      msg: null,
      type: "input",
      nme: "Product_img_url",
    };
    const request_temp1 = {
      sender: "bot",
      msg: "Enter Product image URL",
      type: "input",
      nme: "Product_img_url",
    };

    setChat(chat => [...chat, request_temp1, request_temp]);
  };

  const handleChange = event => {
    const tempValue = { ...inputValue, ["currency"]: event.target.value };
    console.log(tempValue, "tempValue");
    setInputvalue(tempValue);
    const request_temp = {
      sender: "user",
      msg: null,
      type: "input",
      nme: "customer_name",
    };
    const request_temp1 = {
      sender: "bot",
      msg: "Enter Customer Name",
      type: "input",
      nme: "customer_name",
    };

    setChat(chat => [...chat, request_temp1, request_temp]);
  };

  //css code

  const stylecard = {
    maxWidth: "420px",
    paddingLeft: "0px",
    paddingRight: "0px",
    borderRadius: "8px",
    boxShadow: "0 16px 20px 0 rgba(0,0,0,0.4)",
  };
  const styleHeader = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px",

    position: "static",
    width: "420px",
    height: "97px",
    left: "0px",
    top: "0px",

    background: "#416BFF",
    borderRadius: " 8px 8px 0px 0px",

    flex: "none",
    order: "0",
    flexGrow: "0",
    margin: "0px 0px",
  };
  // const styleFooter = {
  //   borderTop: "1px solid black",
  //   borderRadius: "0px 0px 30px 30px",
  //   backgroundColor: "#8012c4",
  // };
  const styleBody = {
    paddingTop: "10px",
    height: "28rem",
    overflowY: "a",
    overflowX: "hidden",
  };

  return (
    <div className="chatBot-wrapper">
      <div className="container">
        <div className="row chatbot_align">
          <div className="card" style={stylecard}>
            <div className="card_header" style={styleHeader}>
              <div className="header_wrapper">
                <div className="pic_wrapper">
                  <div className="bot_pic">
                    <img src={logo} className="Bot_logo2" alt="Bot_logo" />
                  </div>
                </div>
                <div className="text_wrapper">
                  <div className="chatbot_top_text">EuniBot</div>
                  {/* <div className="chatbot_top_text_sec2">Here to help you</div> */}
                </div>
                <div className="icons_wrapper">
                  <Tooltip title="Settings">
                    <button className="settings_btn" onClick={handleSettings}>
                      <FiSettings></FiSettings>
                    </button>
                  </Tooltip>
                  {settingsClicked && (
                    <div className="settingDropdown">
                      <p>Send notification</p>
                      <p>Sound on</p>
                      <p>Mute notifications</p>
                      <p onClick={handleRestart}>Restart</p>
                    </div>
                  )}
                  <Tooltip title="Minimize">
                    <button className="settings_btn" onClick={handleMin}>
                      <FiMinusCircle></FiMinusCircle>
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="cardBody" id="messageArea" style={styleBody}>
              <div className="row msgarea">
                {chat.map((user, key) => (
                  <div key={key}>
                    {console.log("chat", chat)}

                    {/* {console.log(user, "user")} */}
                    {user.sender === "bot" ? (
                      <>
                        {user && user.msg != null && (
                          <div className="msgalignstart">
                            {/* <BiBot className="botIcon" /> */}
                            <img
                              src={logo}
                              className="bot_logo"
                              alt="Bot_logo"
                            />
                            <div className="botContent">
                              <h5 className="botmsg">{user.msg}</h5>
                            </div>
                          </div>
                        )}

                        {user && user.msg2 != null && (
                          <div className="msgalignstart">
                            {/* <BiBot className="botIcon" /> */}
                            <img
                              src={logo}
                              className="bot_logo"
                              alt="Bot_logo"
                            />
                            <div className="botContent">
                              <h5 className="botmsg">{user.msg2}</h5>
                            </div>
                          </div>
                        )}

                        {user && user.msg3 != null && (
                          <div className="msgalignstart">
                            {/* <BiBot className="botIcon" /> */}
                            <img
                              src={logo}
                              className="bot_logo"
                              alt="Bot_logo"
                            />
                            <div className="botContent">
                              <h5 className="botmsg">{user.msg3}</h5>
                            </div>
                          </div>
                        )}

                        {user &&
                          // user.msg2 != null || user.msg3 != null ||user.msg4 != null ||
                          user.buttons?.length > 0 && (
                            <div className="msgalignstart">
                              <img
                                src={logo}
                                className="bot_logo"
                                alt="Bot_logo"
                              />

                              <div className="botContent">
                                {/* {user && user.msg2 != null ? (
                                  <h5 className="botmsg">{user.msg2}</h5>
                                ) : null}

                                {user && user.msg3 != null ? (
                                  <h5 className="botmsg">{user.msg3}</h5>
                                ) : null}
                                {user && user.msg4 != null ? (
                                  <h5 className="botmsg">{user.msg4}</h5>
                                ) : null} */}

                                {user && user.buttons && user.buttons.length > 0
                                  ? user.buttons.map((button, key) => {
                                      return (
                                        <button
                                          key={key}
                                          onClick={() => {
                                            handleRespButton(button);
                                          }}
                                        >
                                          {button["text/title"]}
                                        </button>
                                      );
                                    })
                                  : null}
                              </div>
                            </div>
                          )}
                      </>
                    ) : (
                      <div className="msgalignend">
                        {user && user.msg != null ? (
                          <h5 className="usermsg">{user.msg}</h5>
                        ) : null}

                        {user && user.type && user.type === "date" ? (
                          <div className="botContent">
                            <input
                              type={"date"}
                              name={user.nme}
                              sx={{ Height: 200 }}
                              onChange={e => {
                                handleUserSelection(e, user.nme);
                              }}
                            />
                          </div>
                        ) : null}

                        {user && user.type && user.type === "image" ? (
                          <div className="botContent">
                            <UploadPreview />
                          </div>
                        ) : null}

                        {user && user.type && user.type === "input" ? (
                          <div className="botContent">
                            <input
                              type={"input"}
                              name={user.nme}
                              onChange={e => {
                                handleInputNext(e, user.nme);
                                handleproductInputnext(e, user.nme);
                              }}
                              onKeyDown={e => {
                                handleKeyDown1(e, user.nme);
                              }}
                            />
                          </div>
                        ) : null}

                        {user && user.type && user.type === "autocomplete" ? (
                          <div className="botContent">
                            <input
                              type={"input"}
                              name={user.nme}
                              onChange={e => {
                                handleInputNext(e, user.nme);
                                handleproductInputnext(e, user.nme);
                              }}
                              onKeyDown={e => {
                                handleKeyDown1(e, user.nme);
                              }}
                            />
                          </div>
                        ) : null}

                        {user && user.type && user.type == "select" ? (
                          <div className="botContent">
                            <FormControl sx={{ minWidth: 120 }}>
                              <InputLabel id="demo-simple-select-label">
                                Currency
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={inputValue["currency"]}
                                label="Age"
                                onChange={handleChange}
                              >
                                <MenuItem value={"INR"}>INR</MenuItem>
                                <MenuItem value={"USD"}>USD</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        ) : null}

                        {user && user.type && user.type === "select1" ? (
                          <div className="botContent">
                            <FormControl sx={{ minWidth: 120 }}>
                              <InputLabel id="demo-simple-select-label">
                                Product Type
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Product_Type}
                                label="Age"
                                onChange={handleChange1}
                              >
                                <MenuItem value={"Packaging"}>
                                  Packaging
                                </MenuItem>
                                <MenuItem value={"service"}>service</MenuItem>
                                <MenuItem value={"Consumable"}>
                                  Consumable
                                </MenuItem>
                                <MenuItem value={"Storage"}>Storage</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        ) : null}
                        {user && user.type && user.type == "select2" ? (
                          <div className="botContent">
                            <FormControl sx={{ minWidth: 120 }}>
                              <InputLabel id="demo-simple-select-label">
                                Currency
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Varientcurrency}
                                label="Age"
                                onChange={handleChange2}
                              >
                                <MenuItem value={"INR"}>INR</MenuItem>
                                <MenuItem value={"USD"}>USD</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        ) : null}

                        <div className="msgalignstart">
                          <img
                            src={logo2}
                            className="bot_logo1"
                            alt="Bot_logo"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {botTyping ? (
                  <div className="msgalignstart">
                    {/* <BiBot className="botIcon" /> */}
                    <img src={logo} className="bot_logo" alt="Bot_logo" />
                    <div className="botContent">
                      <div id="wave">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div ref={bottomRef} />
              </div>
            </div>

            {attachmentClicked && (
              <div className="attachmentSection">
                <Tooltip placement="top-start" arrow title="Image">
                  <button
                    onClick={() => {
                      handleMedia();
                    }}
                  >
                    <GrImage></GrImage>
                  </button>
                </Tooltip>
                <Tooltip placement="top-start" arrow title="Video">
                  <button
                    onClick={() => {
                      handleMedia();
                    }}
                  >
                    <GrVideo></GrVideo>
                  </button>
                </Tooltip>
                <Tooltip placement="top-start" arrow title="Record">
                  <button
                    onClick={() => {
                      handleMedia();
                    }}
                  >
                    <GrMicrophone></GrMicrophone>
                  </button>
                </Tooltip>
                <Tooltip placement="top-start" arrow title="Audio">
                  <button
                    onClick={() => {
                      handleMedia();
                    }}
                  >
                    <BsFileEarmarkMusic></BsFileEarmarkMusic>
                  </button>
                </Tooltip>
                <Tooltip placement="top-start" arrow title="Camera">
                  <button
                    onClick={() => {
                      handleMedia();
                    }}
                  >
                    <BsCamera></BsCamera>
                  </button>
                </Tooltip>
                <Tooltip placement="top-start" arrow title="Sheets">
                  <button
                    onClick={() => {
                      handleMedia();
                    }}
                  >
                    <SiGooglesheets></SiGooglesheets>
                  </button>
                </Tooltip>
              </div>
            )}
            {mediaBar && (
              <div className="attachmentSection-media">
                <button
                  onClick={() => {
                    handleMedia();
                  }}
                  className="cancelMediaBtn"
                >
                  <BsXCircle></BsXCircle>
                </button>
                {/* <FilePond
                  files={files}
                  onupdatefiles={setFiles}
                  allowMultiple={true}
                  maxFiles={10}
                  
                  name="files"
                  labelIdle='Drag and Drop your files or <span class="filepond--label-action">Browse</span>'
                /> */}

                <UploadPreview />
              </div>
            )}
            <div className="cardFooter text-white">
              <div className="row_footer">
                <div className="footer_wrapper">
                  <input
                    type="text"
                    className="type_box"
                    onChange={e => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    value={inputMessage}
                  />
                  <Tooltip placement="top-start" arrow title="Attachments">
                    <button
                      type="submit"
                      className="send_btn"
                      onClick={handleAttachment}
                    >
                      <GrAttachment className="sendBtn" />
                    </button>
                  </Tooltip>
                  <Tooltip placement="top-start" arrow title="Send">
                    <button
                      type="submit"
                      className="send_btn"
                      onClick={evt => {
                        handleSubmit(evt);
                      }}
                    >
                      <IoMdSend className="sendBtn" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basic;

class UploadPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: null };
    this.onChange = this.onChange.bind(this);
    this.resetFile = this.resetFile.bind(this);
  }
  onChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  }

  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null });
  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.onChange} />
        {this.state.file && (
          <div style={{ textAlign: "center" }}>
            <button onClick={this.resetFile}>Remove File</button>
          </div>
        )}
        <img style={{ width: "80%" }} src={this.state.file} />
      </div>
    );
  }
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
