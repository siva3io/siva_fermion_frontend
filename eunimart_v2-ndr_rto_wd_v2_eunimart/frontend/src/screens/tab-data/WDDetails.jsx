import React, { useState, useEffect, Suspense } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";

function WDDetails({ data, edit }) {
  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  var cdate = datePipe(data && data.created_date);

  const Weight_Discrepancy_Details = [
    {
      label: "Discrepancy Raised Date",
      text: datePipe(data?.created_date),
      type: "input"
    },
    {
      label: "Transaction ID",
      text: data?.transaction_id,
      type: "input"
    },
    {
      label: "Initial Weight Type",
      text: data?.initial_weight_type_id,
      type: "input"
    },
    {
      label: "Initial Weight Taken",
      text: data?.initial_weight_taken,
      type: "input"
    },
    {
      label: "Final Weight Type",
      text: data?.final_weight_type_id,
      type: "input"
    },
    {
      label: "Final Weight Taken",
      text: data.final_weight_taken,
      type: "input"
    },
    {
      label: "Initial Amount Charged",
      text: data?.shipping_order?.order?.so_payment_details?.total_amount,
      type: "input"
    },
    {
      label: "Final Amount Charged",
      text: data.final_amount,
      type: "input"
    },
    {
      label: "Discrepancy Amount",
      text: data.discrepancy_amount,
      type: "input"
    },

  ]

  const weight_Discrepancy_Proof = [
    {
      label: "Attachment Name",
      text: " ",
      type: "input"
    }
  ];




  return (
    <>

      <RemoteViewBox view_data={Weight_Discrepancy_Details} header={"Weight Discrepancy Details"} />

      <RemoteViewBox view_data={weight_Discrepancy_Proof} header={"Weight Discrepancy Proof"} />
    </>
  )
}

export default WDDetails


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