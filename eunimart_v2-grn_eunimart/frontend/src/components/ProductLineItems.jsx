import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import RemoteViewBox_Table from "Remote/ViewBox_Table";


const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);



const ProductLineItems = (grnData) => {
  console.log(grnData,"grnData in grn")
  // const products=grnData?.grnData?.grn_order_lines
  const products = grnData?.grnData?.grn_order_lines?grnData?.grnData?.grn_order_lines[0]? grnData?.grnData?.grn_order_lines[0]: []: [];
  console.log(products,"products11")
  const products1=grnData?.grnData?.grn_order_lines

 
  const headCells = [
    {
      key: "product_name", 
      label: "Product Name",
      type: "text"
    },
    {
      key: "sku_id",  
      label: "Product SKU",
      type: "text"
    },  
    // {
    //   key: "inventory_id", 
    //   numeric: true,
    //   label: "Inventory ID",
    //   type: "text"
    // },  
    {
      key: "inventory_id",  
      label: "Inventory ID",
      type: "text"
    },  
    {
      key: "lot_number",  
      label: "LOT No.",
      type: "text"
    },  
      
    {
      key: "uom_id", 
      numeric: true,
      label: "UOM",
      type: "text"
    },  
    {
      key: "ordered_units",
      numeric: true,
      type: "text",
      label: "Ordered Units",
    },
    {
      key: "received_units",
      numeric: true,
      type: "text",
      label: "Recieved Units",
    },
    {
      key: "pending_units",
      numeric: true,
      type: "text",
      label: "Pending Units",
    },
    {
      key: "quality_check",
      numeric: true,
      type: "text",
      label: "Quality Checked",
    },
    {
      key: "shelf_location",
      numeric: true,
      type: "text",
      label: "Shelf Location",
    },
    {
      key: "rejected_quantities",
      numeric: true,
      type: "text",
      label: "Rejected Quantities",
    },
    {
      key: "reason_of_rejection",
      numeric: true,
      type: "text",
      label: "Reasons of Rejection",
    },
  ];


  return (
    <>


{products1 && 
      <RemoteViewBox_Table headCells={headCells} table_data={products1?.map(item=>{
          return {
            product_name: (item && item.product && item.product.product_name ? item.product.product_name : "--"),
            sku_id: (item && item.product && item.product.sku_id ? item.product.sku_id : "--"),
            // inventory_id: (item && item.product && item.product.inventory_details ? item.product.inventory_details : "??"),
            lot_number: (item && item.lot_number ? item.lot_number : "--"),
            Description:(item && item.Description && item.Description && item.Description.data? item.Description.data : "--"),
            uom_id: (item && item.uom && item.uom.name ? item.uom.name: "--"),
            ordered_units: (item && item.ordered_units ? item.ordered_units : 0),
            received_units: (item && item.received_units ? item.received_units : 0),
            pending_units: (item && item.pending_units ? item.pending_units : 0),
            quality_check: (item && item.quality_check ? "true" : "false"),
            shelf_location: (item && item.shelf_location ? item.shelf_location : 0),
            rejected_quantities: (item && item.rejected_quantities ? item.rejected_quantities : 0),
            reason_of_rejection: (item && item.reason_of_rejection ? item.reason_of_rejection : 0),
          }
        })} header={"Order Line Item"}/>
    }
       
      {/* {products1 && (
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteWrapper>
            <RemoteDynamicTable
              table_data={products1}
              headCells={headCells}
              tableHeight={true}
              checkDisable={false}
              enablepagination={false}
            />
          </RemoteWrapper>
        </Suspense>
      )} */}
 
     </>
  );
};

export default ProductLineItems;

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