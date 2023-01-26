import React, { useState, useEffect, Suspense } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";

function RTODetails({ data, edit }) {
  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  var cdate = datePipe(data && data.created_date);

  const Return_To_Origin_Details = [
    {
      label: "Type",
      text: data?.shipping_order?.order?.payment_type_id,
      type: "input"
    },
    {
      label: "Amount",
      text: data?.shipping_order?.order?.so_payment_details?.total_amount,
      type: "input"
    },
    {
      label: "ESDD",
      text: datePipe(data?.estimate_delivery_date),
      type: "input"
    },
    {
      label: "PSDD",
      text: datePipe(data?.actual_delivery_date),
      type: "input"
    },
    {
      label: "RTO Cost",
      text: data?.rto_cost,
      type: "input"
    },

  ]




  return (
    <>

      <RemoteViewBox view_data={Return_To_Origin_Details} header={"Return To Origin Details"} />

    </>
  )
}

export default RTODetails

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