import React, { useState } from 'react'
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";

import SelectServiceableArea from '../Components/SelectServiceableArea';

export default function WarehouseDetails({ data, edit }) {

  console.log("in Reatis");
  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  var cdate = datePipe(data && data.created_date);

  const locationDetails = [
    {
      label: "Location Name",
      text: data?.name,
      type: "input"
    },
    {
      label: "Location Type",
      text: data?.LocationType?.display_name,
      type: "input"
    },
    {
      label: "Location ID",
      text: data?.LocationType?.id,
      type: "input"
    },
    {
      label: "Parent Location",
      text: data?.parent_location?.name,
      type: "input"
    },

    {
      label: "Address Line 1",
      text: data?.address?.address_line_1,
      type: "input"
    },
    {
      label: "Address Line 2",
      text: data?.address?.address_line_2,
      type: "input"
    },
    {
      label: "Address Line 3",
      text: data?.address?.address_line_3,
      type: "input"
    },
    {
      label: "Landmark",
      text: data?.address?.land_mark,
      type: "input"
    },
    {
      label: "Pincode",
      text: data?.address?.pin_code,
      type: "input"
    },
    {
      label: "Country",
      text: data?.address?.country?.name,
      type: "input"
    },
    {
      label: "State",
      text: data?.address?.state?.name,
      type: "input"
    },
    {
      label: "City",
      text: data?.address?.city,
      type: "input"
    }
  ];

  const wd = [
    {
      label: "create Date",
      text: datePipe(data?.created_date),
      type: "input"
    },
    {
      label: "Warehouse Activity",
      text: data?.is_active === true ? "Active" : "Inactive",
      type: "input"
    }
  ]

  const sld = [
    {
      label: "Latitude",
      text: data?.latitude,
      type: "input"
    },
    {
      label: "Longitude",
      text: data?.longitude,
      type: "input"
    },
  ];

  const extraDetails = [
    {
      label: "Email Address",
      text: data?.email,
      type: "input"
    },
    {
      label: "Phone Number",
      text: data?.mobile_number,
      type: "input"
    },
    {
      label: "Timezone",
      text: data?.timezone ? data?.timezone : "--",
      type: "input"
    }
  ]

  const advancedChannel =
    [
      {
        label: "Prices Includes Tax",
        text: data?.lat,
        type: "input"
      },
      {
        label: "Email Notification",
        text: data?.lng,
        type: "input"
      },
      {
        label: "Partial Fulfilment",
        text: data?.id,
        type: "input"
      }
    ]

  const inchargeDetails = [
    {
      label: "Incharge Name",
      text: data?.location_details?.location_incharge_details?.incharge_name,
      type: "input"
    },
    {
      label: "Email",
      text: data?.location_details?.location_incharge_details?.email,
      type: "input"
    },
    {
      label: "Company Name",
      text: data?.location_details?.location_incharge_details?.company_name,
      type: "input"
    },
    {
      label: "Mobile No.",
      text: data?.location_details?.location_incharge_details?.mobile_number,
      type: "input"
    },
    {
      label: "Upload Profile Picture",
      text: data?.location_details?.location_incharge_details?.mobile_number,
      type: "image"
    }
  ]

  const warehouseConfig = [
    {
      label: "Is Scrap Location ?",
      text: data?.location_details?.is_scrap_location === true ? "Yes" : "No",
      type: "input"
    },
    {
      label: "Is return Location?",
      text: data?.location_details?.is_return_location === true ? "Yes" : "No",
      type: "input"
    },
    {
      label: "Shipping Partners",
      text: data?.location_details?.shipping_partners?.partner_name,
      type: "input"
    },
    {
      label: "Integrated Channels",
      text: data?.location_details?.integrated_channels?.name,
      type: "input"
    },
  ]

  const wareHouseContactheadCells = [
    {
      key: "name",
      numeric: true,
      label: "Payment Method",
      type: "text"
    },
    {
      key: "mobile_number",
      numeric: true,
      label: "Phone Number",
      type: "text"
    },
    {
      key: "email",
      numeric: true,
      label: "Email Id",
      type: "text"
    },
    {
      key: "additional_phone_number",
      numeric: true,
      label: "Additional Phone Number",
      type: "text"
    },
    {
      key: "additional_email",
      numeric: true,
      label: "Additional Email ID",
      type: "text"
    },
    {
      key: "role",
      numeric: true,
      label: "Role",
      type: "text"
    }
  ];

  const wareHouseStorageManagementHeadCells = [
    {
      key: "zone_name",
      numeric: true,
      label: "Zone Name",
      type: "text"
    },
    {
      key: "zone_priority",
      numeric: true,
      label: "Zone Priority",
      type: "text"
    },
    {
      key: "layout_symmetric",
      numeric: true,
      label: "Layout Symmetric",
      type: "text"
    },
    {
      key: "rows_in_zone",
      numeric: true,
      label: "Rows in Zone",
      type: "text"
    },
    {
      key: "rows_in_racks",
      numeric: true,
      label: "Racks in Rows",
      type: "text"
    },
    {
      key: "racks_in_shelves",
      numeric: true,
      label: "Shelves in Racks",
      type: "text"
    },
    {
      key: "bins_in_shelves",
      numeric: true,
      label: "Bins in Shelves",
      type: "text"
    },
    {
      key: "total_bin_count",
      numeric: true,
      label: "Total Bin Count",
      type: "text"
    }
  ];

  const capacityMangement = [
    {
      label: "Racks Capacity*",
      text: data?.location_details?.racks_capacity,
      type: "input"
    },//text: data.location_details.warehouse_storage_management.map(o=>{return o.bins_in_shelves}),
    {
      label: "Racks UOM",
      text: data?.location_details?.racks_uom?.name,
      type: "input"
    },
    {
      label: "Shelves Capacity*",
      text: data?.location_details?.shelves_capacity,
      type: "input"
    },
    {
      label: "Shelves UOM",
      text: data?.location_details?.shelves_uom?.name,
      type: "input"
    },
    {
      label: "Bins Capacity*",
      text: data?.location_details?.bins_capacity,
      type: "input"
    },
    {
      label: "Bin UOM",
      text: data?.location_details?.bins_uom?.name,
      type: "input"
    },

  ]

  return (
    <>
      <RemoteViewBox view_data={locationDetails} header={"Location Details"} />
      <RemoteViewBox view_data={wd} header={"Warehouse Details"} />
      <RemoteViewBox view_data={sld} header={"Set Location"} />
      {
        data && data?.serviceable_area_ids
          ?
          (
            <SelectServiceableArea data={data?.serviceable_area_ids} />
          ) :
          <></>
      }
      <RemoteViewBox view_data={extraDetails} header={"Extra Details"} />
      {/* <RemoteViewBox view_data={advancedChannel} header={"Advance Channel Configure"} /> */}
      {
        data && data?.location_details?.contact_details &&
        <RemoteViewBox_Table headCells={wareHouseContactheadCells} table_data={data?.location_details?.contact_details} header={"Warehouse Contact Info"} />
      }
      <RemoteViewBox view_data={warehouseConfig} header={"Warehouse Configuration"} />
      {
        data && data?.location_details?.warehouse_storage_management &&
        <RemoteViewBox_Table headCells={wareHouseStorageManagementHeadCells} table_data={data?.location_details?.warehouse_storage_management} header={"Warehouse Storage Management"} />
      }
      <RemoteViewBox view_data={capacityMangement} header={"Warehouse Capacity Management"} />


    </>
  )
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