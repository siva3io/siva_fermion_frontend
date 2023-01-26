
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


const PricingViewData = () => {
    const dispatch = useDispatch();

    const { salesPriceListData } = useSelector(
        (state) => state.data
    );
    const { purchasePriceListData } = useSelector(
        (state) => state.data
    );

    console.log("salesPriceListData", salesPriceListData,purchasePriceListData)




    const salesHeadCells = [
        {
            key: "add_channel_of_sale.display_name",
            count: 2,
            numeric: true,
            type: "text",
            label: "Channel of Sale",
        },

        {
            key: "category_commission",
            numeric: false,
            type: "text",
            label: "Category Commission",
        },
        {
            key: "uom_details.name",
            count: 2,
            numeric: true,
            type: "text",
            label: "UoM (Unit of measure)",
        },

        {
            key: "quantity_value_type.display_name",
            count: 2,
            numeric: true,
            type: "text",
            label: "Quantity Value Type",
        },
        {
            key: "quantity_value.qty1",
            count: 2,
            numeric: true,
            type: "text",
            label: "Quantity Value",
        },
        {
            key: "mrp",
            numeric: true,
            type: "text",
            label: "MRP",
        },
        {
            key: "sale_rate",
            numeric: true,
            count: 2,
            type: "text",
            label: "Sale Rate",
        },
        {
            key: "duties",
            numeric: true,
            type: "text",
            label: "Duties/taxes",
        },
        {
            key: "pricing_options.display_name",
            numeric: true,
            count: 2,
            type: "text",
            label: "Pricing options",
        },
        {
            key: "price",
            numeric: true,
            type: "text",
            label: "Price",
        },
    ];


    const purchaseHeadcells = [
        {
            key: "vendor_name",
            count: 2,
            numeric: true,
            type: "text",
            label: "Vendor Name",
        },

        {
            key: "category_commission",
            numeric: false,
            type: "text",
            label: "Cost",
        },
        {
            key: "vendor_credit_period",
            numeric: true,
            type: "text",
            label: "Vendor Credit Period",
        },

        {
            key: "minimum_order_quantity",
            numeric: true,
            type: "text",
            label: "Minimum Order Quantity",
        },
        {
            key: "quantity_value_type.display_name",
            count: 2,
            numeric: true,
            type: "text",
            label: "Quantity Value Type",
        },
        {
            key: "quantity_value.qty1",
            count:2,
            numeric: true,
            type: "text",
            label: "Quantity Value",
        },
        {
            key: "mrp",
            numeric: true,
            type: "text",
            label: "MRP",
        },
        {
            key: "sales_period",
            numeric: true,
            type: "text",
            label: "Sales Period",
        },
        {
            key: "expected_delivery_time",
            numeric: true,
            type: "text",
            label: "Expected delivery Time",
        },
        {
            key: "credit_period",
            numeric: true,
            type: "text",
            label: "Credit Period",
        },
        {
            key: "lead_time",
            numeric: true,
            type: "text",
            label: "Lead Time",
        },
        {
            key: "price_quantity",
            numeric: true,
            type: "text",
            label: "Price/Qty",
        },
        {
            key: "vendor_rate",
            numeric: true,
            type: "text",
            label: "Vendor Rate",
        },
    ];


    const [customOptions, setCustomOptions] = useState([
    ]);



    return (
        <>
            <br />
            <>
                <div className="product-pricing-background">
                    <p className="companyDetailsOrder_header">Purchase Price List</p>
                    <br />
                    {purchasePriceListData && purchasePriceListData?.length > 0 && (
                        <Suspense fallback={<div>Loading... </div>}>
                            <RemoteWrapper>
                                <RemoteDynamicTable
                                    table_data={purchasePriceListData}
                                    headCells={purchaseHeadcells}
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
                    <p className="companyDetailsOrder_header">Sales Price List</p>
                    <br />
                    {salesPriceListData && salesPriceListData?.length > 0 && (
                        <Suspense fallback={<div>Loading... </div>}>
                            <RemoteWrapper>
                                <RemoteDynamicTable
                                    table_data={salesPriceListData}
                                    headCells={salesHeadCells}
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

export default PricingViewData;
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