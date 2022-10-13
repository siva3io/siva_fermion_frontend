import React, { useEffect, useState, Suspense } from "react";
import { useHistory } from "react-router-dom";
import RemoteDynamicTable from "Remote/DynamicTable";


export default function PurchaseOrders({purchaseOrdersData}) {
  const history = useHistory();

  const handleChangeDyanmicAppBar = (value) => {
    //setDynamicAppBar(value);
  };
  function handleViewProduct(id) {
    history.push(`/purchaseOrders/${id}`)
  }


  const [customOptions, setCustomOptions] = useState([
        {
      label: "view ",
      func: (purchase_id) => handleViewProduct(purchase_id),
    },
  ]);


  const headCells = [
    {
      key: "date_and_time",
      label: "PO Date & Time",
      type: "date"
    },
    {
      key: "purchase_order_number",
      label: "PO Number",
      type: "text"
    },
    {
      key: "reference_number",
      label: "Reference Number",
      type: "text"
    },
    {
      key: "vendor_details.vendor_contact",
      count: 2,
      label: "Vendor Name",
      type: "text"
    },
    {
      key: "status.display_name",
      count: 2,
      label: "Status",
      type: "text"
    },
    {
      key: "billed.display_name",
      count: 2,
      label: "Billed",
      type: "text"
    },
    {
      key: "paid.display_name",
      count: 2,
      label: "Paid",
      type: "text"
    },
    {
      key: "amount",
      label: "Amount",
      type: "text"
    },
    {
      key: "payment_terms.display_name",
      count: 2,
      label: "Payment Terms",
      type: "text"
    },
    {
      key: "expected_delivery_date",
      label: "Expected Shipment",
      type: "text"
    },

    {
      key: "action",
      label: "Action",
      type: "action"
    },
  ];
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleButtonClick = (value) => {
    history.push("/purchaseOrders/add");
  }

  return (
    <>

      {purchaseOrdersData  && (
        <div>
          <RemoteDynamicTable
            table_data={[purchaseOrdersData]}
            headCells={headCells}
            customOptions={customOptions}
            setCustomOptions={setCustomOptions}
            handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
            enablepagination={false}
          />
        </div>
      )}
    </>
  )
}
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