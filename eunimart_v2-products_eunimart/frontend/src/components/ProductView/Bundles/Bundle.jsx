
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


const ProductBundleDataTable = () => {

    const { productBundleData } = useSelector(
        (state) => state.data
    );


    console.log("productBundleData", productBundleData)




    const headCells = [
        {
            key: "bundle_name",
            numeric: true,
            type: "text",
            label: "Bundle Name",
        },
        {
            key: "bundle_id",
            numeric: false,
            type: "text",
            label: "Bundle ID",
        },
        {
            key: "sales_price",
            numeric: true,
            type: "text",
            label: "Selling Price",
        },

        {
            key: "instructions",
            numeric: true,
            type: "text",
            label: "Instructions",
        },
        
    ];





    const [customOptions, setCustomOptions] = useState([
    ]);



    return (
        <>
            <br />
            <>



                <div className="product-pricing-background">
                    
                    {productBundleData && productBundleData?.length > 0 && (
                        <Suspense fallback={<div>Loading... </div>}>
                            <RemoteWrapper>
                                <RemoteDynamicTable
                                    table_data={productBundleData}
                                    headCells={headCells}
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

export default ProductBundleDataTable;
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