
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Suspense } from "react";
import ErrorBoundary from "../../../ErrorBoundary";
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));

const RemoteWrapper = ({ children }) => (
    <div
        style={{
            background: "white",
        }}
    >
        <ErrorBoundary>{children}</ErrorBoundary>
    </div>
);


const InventoryViewData = () => {
    const dispatch = useDispatch();

    const { purchaseReturnsData } = useSelector(
        (state) => state.data
    );
    const { salesReturnsData } = useSelector(
        (state) => state.data
    );
    const { salesHistoryData } = useSelector(
        (state) => state.data
    );



    console.log("salesPriceListData", salesReturnsData, salesHistoryData,purchaseReturnsData)




    const salesHistoryCells = [
        {
            key: "so_date",
            numeric: true,
            type: "date",
            label: "Date & Time",
        },
        {
            key: "channel_name",
            numeric: false,
            type: "text",
            label: "Channel",
        },
        {
            key: "so_payment_details.total_amount",
            count:2,
            numeric: true,
            type: "text",
            label: "Price",
        },
        {
            key: "quantity",
            numeric: true,
            type: "text",
            label: "Quantity",
        },
        {
            key: "sales_order_number",
            numeric: true,
            type: "text",
            label: "Order ID",
        },
        
    ];


    const salesReturnsHeadCells = [
        {
            key: "sr_date",
            numeric: true,
            type: "date",
            label: "Date & Time",
        },
        {
            key: "channel_name",
            numeric: false,
            type: "text",
            label: "Channel",
        },
        {
            key: "amount",
            numeric: true,
            type: "text",
            label: "Price",
        },
        {
            key: "quantity",
            numeric: true,
            type: "text",
            label: "Quantity",
        },
        {
            key: "sales_order.sales_order_number",
            count:2,
            numeric: true,
            type: "text",
            label: "Order ID",
        },
        {
            key: "sales_return_number",
            numeric: true,
            type: "text",
            label: "Sales Return ID",
        },
    ];

    const purchaseHistoryHeadCells = [
        {
            key: "date_and_time",
            numeric: true,
            type: "date",
            label: "Date & Time",
        },
        {
            key: "channel_name",
            numeric: false,
            type: "text",
            label: "Channel",
        },
        {
            key: "po_payment_details.total_amount",
            count:2,
            numeric: true,
            type: "text",
            label: "Price",
        },
        {
            key: "quantity",
            numeric: true,
            type: "text",
            label: "Quantity",
        },
        {
            key: "purchase_order_number",
            numeric: true,
            type: "text",
            label: "Purchase ID",
        },
       
    ];

    const [customOptions, setCustomOptions] = useState([
    ]);



    return (
        <>
            <br />
            <>
                <div className="product-pricing-background">
                    <p className="companyDetailsOrder_header">Sales History</p>
                    <br />
                    {salesHistoryData && salesHistoryData?.length > 0 && (
                        <Suspense fallback={<div>Loading... </div>}>
                            <RemoteWrapper>
                                <RemoteDynamicTable
                                    table_data={salesHistoryData}
                                    headCells={salesHistoryCells}
                                    customOptions={customOptions}
                                    setCustomOptions={setCustomOptions}
                                    info={{}}
                                    //   setParams={setParams}
                                    //   handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                                    //   setId={setId}
                                    enablepagination={false}
                                    checkDisable={false}

                                />
                            </RemoteWrapper>
                        </Suspense>
                    )}
                </div>
                <br />

                <div className="product-pricing-background">
                    <p className="companyDetailsOrder_header">Sales Returns</p>
                    <br />
                    {salesReturnsData && salesReturnsData?.length > 0 && (
                        <Suspense fallback={<div>Loading... </div>}>
                            <RemoteWrapper>
                                <RemoteDynamicTable
                                    table_data={salesReturnsData}
                                    headCells={salesReturnsHeadCells}
                                    customOptions={customOptions}
                                    setCustomOptions={setCustomOptions}
                                    info={{}}
                                    //   setParams={setParams}
                                    //   handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                                    //   setId={setId}
                                    enablepagination={false}
                                    checkDisable={false}

                                />
                            </RemoteWrapper>
                        </Suspense>
                    )}
                </div>

                <br/>

                <div className="product-pricing-background">
                    <p className="companyDetailsOrder_header">Purchase History</p>
                    <br />
                    {purchaseReturnsData && purchaseReturnsData?.length > 0 && (
                        <Suspense fallback={<div>Loading... </div>}>
                            <RemoteWrapper>
                                <RemoteDynamicTable
                                    table_data={purchaseReturnsData}
                                    headCells={purchaseHistoryHeadCells}
                                    customOptions={customOptions}
                                    setCustomOptions={setCustomOptions}
                                    info={{}}
                                    //   setParams={setParams}
                                    //   handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                                    //   setId={setId}
                                    enablepagination={false}
                                    checkDisable={false}

                                />
                            </RemoteWrapper>
                        </Suspense>
                    )}
                </div>
            </>


        </>
    );
};

export default InventoryViewData;

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