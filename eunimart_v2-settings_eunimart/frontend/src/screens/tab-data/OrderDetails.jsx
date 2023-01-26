import React, { useState, useEffect } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import LinkM7 from "../LinkM5";
import NotificationSettings from "../NotificationSettings";

function OrderDetails({ data, edit }) {


  const [step4Data, setStep4Data] = useState({
    channel_name: "",
    currency: "",
    price_list: "",
    channel_status: "",
    order_tags: "",

    currency_id: "",
    price_list_id: "",
    channel_status: "",
    order_tags_id: "",

    enable_fba_fbf_to_fullfil_orders: false,
    select_the_3pl_facility: "",

    assign_auto_fullfilment: false,
    order_select_source_facility: "",
    order_select_source_facility_id: "",

    select_source_facility: "",
    select_source_facility_id: "",
    type_of_source: "",
    type_of_source_id: "",
    fixed_inventory: "",

    prices_include_taxes: "",
    prices_include_taxes_id: "",
    partial_fullfilment_shipping: false,
    email_for_shipping_orders: false,

    payment_method: "",
    payment_method_name: "",
    payment_method_description: "",

    inventory_type: "",
    automation_select_source_facility: "",
    sync_inventory: false,
    sync_price: false

  });
  console.log("sstep1", step4Data);
  useEffect(() => {
  }, [step4Data]);


  return (
    <>
      <LinkM7 staticForm={true} step4Data={step4Data}
        setStep4Data={setStep4Data} disabled_y={false}
        showActions={false} />

      <NotificationSettings staticForm={true} step4Data={step4Data}
        setStep4Data={setStep4Data} disabled_y={false}
        showActions={false} />

        
    </>
  )
}

export default OrderDetails


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