import React from "react";

import { createTheme } from "@mui/material/styles";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));
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








function ProductDetails({ views }) {




    const headCells = [

        {
            key: "product_name",

            type: "text",

            label: "Product Name",
        },
        {
            key: "sku_id",

            type: "text",
            label: "Product SKU ID",
        },

        {
            key: "quantity_sold",


            type: "text",
            label: "Quantity Sold",
        },
        {
            key: "uom",

            type: "text",

            label: "Unit of Measure",
        },

        {
            key: "serial_number",

            type: "text",
            label: "Serial Number",
        },
        {
            key: "quantity_returned",

            type: "text",
            label: "Quantity Returned",
        },
        {
            key: "rate",

            type: "text",
            label: "Rate",
        },
        {
            key: "discount",

            type: "text",
            label: "Discount",
        },
    
        {
            key: "tax",

            type: "text",
            label: "Tax",
        },
    
        {
            key: "amount",

            type: "text",
            label: "Amount",
        },


    ];

    const rows = views.sales_return_lines
    console.log(rows,".............")
    const theme = createTheme({
        components: {
            // Name of the component
            MuiFormControl: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        // overflow: "unset",
                        width: "100%",
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        fontFamily: "Inter !important",

                    },
                },
            },
            MuiAutocomplete: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        width: "100%!important",
                    },
                },
            },
        },
    });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    


    return (
        <div>

            {rows &&
                <RemoteViewBox_Table headCells={headCells} table_data={rows.map(item => {
                  console.log("item",item)
                    return {
                        product_name:(item && item?.product_details && item?.product_details.product_name?item?.product_details.product_name:"--"),
                        sku_id:(item && item.product_details && item.product_details.sku_id
                          ?item.product_details.sku_id
                          :"--"),
                        quantity_sold:(item && item.quantity_sold?item.quantity_sold:"--"),
                        uom:(item && item.uom && item.uom.base_uom?item.uom.base_uom:"--"),
                        serial_number:(item && item.serial_number?item.serial_number:"--"),
                        quantity_returned:(item && item.quantity_returned?item.quantity_returned:"--"),
                        rate:(item && item.rate ? item.rate:"--"),
                        discount:(item && item.discount?item.discount:"--"),
                        tax:(item && item.tax ?item.tax:"0"),
                        amount:(item && item.amount?item.amount:"--" )








                      



                    }
                })} header={"Order Line Item"} />
            }



        </div>
    );
}

export default ProductDetails;

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
