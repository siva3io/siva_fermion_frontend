import {
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import  {getcontactsRelatedById} from "../redux/Action/relatedContactAction"; 
import useStyles from "./styles";

const RelatedContact = ({ relatedContactData }) => {
  const classes = useStyles();
  const child = relatedContactData?.child_contacts;
  const parent = relatedContactData?.parent;
  const childLength = child?.length;
  const parentLength = parent?.length;

  const dispatch = useDispatch();
  const location = useLocation();
  // const { id } = useParams();
 
  const { id } = location.state ? location.state : { id: null };
  useEffect(() => {
    if (id) {
      dispatch(getcontactsRelatedById(id));
    } else {
      const tempid = location.pathname.split("/")[3];
      // dispatch(getcontactsById(tempid));
      dispatch(getcontactsRelatedById(tempid));
    }
  }, [location.state]);
  // const dispatch = useDispatch();

  useEffect(() => dispatch(getcontactsRelatedById(id)), [id]);

  const contactData = useSelector((state) => state.relatedContact.contact);

  return (
    <Grid
      sx={{ background: "none", mx: "16px", border: "none" }}
      className={classes.relatedContactContainer}
    >
      {/* <CommonCard
          cardType="ContactCard"
          imgPosition="Left"
          cardData={contactData?.parent}
        /> */}
      {contactData?.parent ? (
        <Typography
          component="div"
          className="relatedParentContacts_contact addMargin"
          sx={{ width: "fit-content" }}
        >
          <Typography
            variant="p"
            // className="relatedContacts_type"
            sx={{
              // my: "19px",
              fontFamily: "Poppins",
              color: "#121417",
              fontSize: "19px",
              fontWeight: 500,
            }}
          >
            Parent Contact
          </Typography>
          <Paper
            sx={{
              borderRadius: "8px",
              display: "flex",
              borderRadius: "16px",
              mt: "16px",
            }}
            elevation={1}
          >
            <CardContent
              style={{
                minWidth: 275,
                display: "flex",
                justifyContent: "space-between",
                textDecoration: "none !important",
              }}
            >
              <Typography>
                <img
                  className={`eucommoncardLeftImage`}
                  src={
                    contactData?.parent?.image?.data
                      ? "data:image/png;base64," +
                      contactData?.parent?.image?.data
                      : "https://www.iuminnesota.com/wp-content/uploads/2020/03/dummy-avatar-300x300-1.jpg"
                  }
                ></img>
              </Typography>
              <CardContent>
                <Typography
                  //   variant="h6"
                  component="div"
                  sx={{
                    textDecoration: "none",
                    fontSize: "19px",
                    fontWeight: 500,
                  }}
                >
                  {contactData?.parent?.name
                    ? contactData?.parent?.name.charAt(0).toUpperCase() +
                    contactData?.parent.name.slice(1)
                    : "--"}
                </Typography>
                <Typography
                  sx={{
                    mb: 1.5,
                    textDecoration: "none",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#001661",
                  }}
                  color="text.secondary"
                >
                  {contactData?.parent?.contact_type
                    ? contactData?.parent?.contact_type?.display_name.charAt(
                        0
                      ) +
                      contactData?.parent?.contact_type?.display_name.slice(1)
                    : "--"}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  <i
                    className="material-icons custom actionIcon marginStyle"
                    style={{ color: "#F3A445" }}
                  >
                    phone
                  </i>
                  {contactData?.parent?.primary_phone
                    ? contactData?.parent?.primary_phone
                    : "--"}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  <i
                    className="material-icons custom actionIcon marginStyle"
                    style={{ color: "#FC817C" }}
                  >
                    email
                  </i>
                  {contactData?.parent?.primary_email
                    ? contactData?.parent?.primary_email
                    : "--"}
                </Typography>
              </CardContent>
            </CardContent>
          </Paper>
        </Typography>
      ) : (
        <Typography className="nodata_text">No Related Contacts</Typography>
      )}

     
     
    </Grid>
  );
};

export default RelatedContact;








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