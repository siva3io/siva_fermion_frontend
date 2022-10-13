import React, { useState, useEffect, Suspense } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";

function CycleCountDetails({ data, edit }) {
  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  var cdate = datePipe(data && data.created_date);

  const Cycle_Count_Data = [
    {
      label: "Cycle Count ID",
      text: data?.cycle_count_number,
      type: "input",
    },
    {
      label: "Created Date",
      text: datePipe(data?.created_date),
      type: "input",
    },
    {
      label: "Warehouse Name",
      text: data?.order_lines?.location_input_type?.display_name,
      type: "input",
    },
    {
      label: "Assign to",
      text: data?.partner?.name,
      type: "input",
    },
    {
      label: "Count Method",
      text: data?.count_method?.display_name,
      type: "input",
    },
  ];
  const headCells = [
    {
      key: "cycle_count_number",
      numeric: true,
      label: "Bin Number",
      type: "text",
    },
    {
      key: "count_method",
      count: 2,
      numeric: true,
      label: "Product SKU ID",
      type: "text",
    },
    {
      key: "count_method_display_name",
      count: 2,
      numeric: true,
      label: "Product Name",
      type: "text",
    },
    {
      key: "order_lines_recorded_quantity",
      count: 2,
      numeric: true,
      label: "Recorded Quantity",
      type: "date",
    },
    {
      key: "items_count",
      numeric: true,
      label: "Current Count",
      type: "text",
    },
    {
      key: "order_lines_iscrepancy_count",
      count: 2,
      numeric: true,
      label: "Discrepancy Count",
      type: "text",
    },
    {
      key: "order_lines.discrepancy_level",
      count: 2,
      numeric: true,
      label: "Discrepancy Level",
      type: "text",
    },
    {
      key: "order_lines.cycle_count_discrepancy_reason",
      count: 2,
      numeric: true,
      label: "Reason for Discrepancy",
      type: "text",
    },
  ];
  const Schedule_Count = [
    {
      label: "Schedule Date",
      text: datePipe(data?.schedule_date),
      type: "input",
    },
    {
      label: " ",
      text: " ",
      type: "input",
    },
    {
      label:
        "Auto Schedule Cycle Count on a regular interval for the same assignee",
      text: " ",
      type: "input",
    },
    {
      label: "Frequency",
      text: " ",
      type: "input",
    },
  ];

  return (
    <>
      <RemoteViewBox
        view_data={Cycle_Count_Data}
        header={"Cycle Count Details"}
      />

      {data && data ? (
        <RemoteViewBox_Table
          headCells={headCells}
          table_data={data}
          header={"Location Details "}
        />
      ) : (
        <></>
      )}

      <RemoteViewBox view_data={Schedule_Count} header={"Schedule Count"} />
    </>
  );
}

export default CycleCountDetails;

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
