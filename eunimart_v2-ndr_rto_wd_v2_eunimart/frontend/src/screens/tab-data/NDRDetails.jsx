import React, { useState, useEffect, Suspense } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import Box from "@mui/material/Box";

function NDRDetails({ data, edit }) {
  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  'use strict';
  var Non_Delivery_Request_1 = []
  var cdate = datePipe(data && data.created_date);
  {
    data && data?.ndr_lines && (data?.ndr_lines.map(item => {
      Non_Delivery_Request_1 = [
        {
          label: "NDRs ID",
          text: item.ndrs_id,
          type: "input"
        },
        {
          label: "NDRs Raised Date",
          text: datePipe(item.ndrs_raised_date),
          type: "input"
        },
        {
          label: "Payment Type",
          text: "--",
          type: "input"
        },
        {
          label: "Amount",
          text: data?.amount,
          type: "input"
        },
        {
          label: "Delivery Attempt",
          text: datePipe(item?.delivery_attempt_made),
          type: "input"
        },
        {
          label: "Last Delivery Attempt Date",
          text: datePipe(item.last_delivery_attempt_date),
          type: "input"
        },
        {
          label: "Failure Reason",
          text: item?.failure_reason,
          type: "input"
        },

      ]

    }))
  }
  return (
    <>
      {data && data?.ndr_lines && (data?.ndr_lines.map(x => {
        var index = data?.ndr_lines.findIndex(o => o == x)
        return (
          < RemoteViewBox view_data={Non_Delivery_Request_1} header={`Non Delivery Request # ${index + 1}`}
          />
        )
      }
      ))}

    </>
  )
}

export default NDRDetails


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