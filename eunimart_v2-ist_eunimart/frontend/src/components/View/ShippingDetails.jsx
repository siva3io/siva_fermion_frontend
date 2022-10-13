import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));
import RemoteViewBox_Table from "Remote/ViewBox_Table";

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const ShippingDetails = ({ istData }) => {
  const [params, setParams] = useState({ limit: 10, offset: 1 });
  const [selectedId, setId] = useState(0);
  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const shippingDetails = [istData.shipping_details];
  console.log(shippingDetails, "shippingDetails");

  const [staticFieldsTwo, setStaticFieldsTwo] = useState([
    {
      label: "Shipping Preferance",
      type: "input",
      text: istData?.shipping_details?.shipping_preference
        ? istData?.shipping_details?.shipping_preference
        : "--",
    },
  ]);

  const [staticFieldsThree, setStaticFieldsThree] = useState([
    {
      label: "Package Length",
      type: "input",
      text: istData?.shipping_details?.package_details?.length
        ? istData?.shipping_details?.package_details?.length
        : "--",
    },
    {
      label: "Package Breath",
      type: "input",
      text: istData?.shipping_details?.package_details?.breadth
        ? istData?.shipping_details?.package_details?.breadth
        : "--",
    },
    {
      label: "Package Height",
      type: "input",
      text: istData?.shipping_details?.package_details?.height
        ? istData?.shipping_details?.package_details?.height
        : "--",
    },
    {
      label: "Volumetric Dimentions",
      type: "input",
      text: istData?.shipping_details?.package_details?.dimensions
        ? istData?.shipping_details?.package_details?.dimensions
        : "--",
    },
    {
      label: "Package Weight",
      type: "input",
      text: istData?.shipping_details?.package_details?.weight
        ? istData?.shipping_details?.package_details?.weight
        : "--",
    },
  ]);

  const [staticFieldsFour, setStaticFieldsFour] = useState([
    {
      label: "Set pickup date",
      type: "input",
      text: istData?.pickup_date_and_time?.pickup_date
        ? datePipe(istData?.pickup_date_and_time?.pickup_date)
        : "--",
    },
    {
      label: "Set pickup time ",
      type: "input",
      text:
        (istData?.pickup_date_and_time?.pickup_from_time
          ? istData?.pickup_date_and_time?.pickup_from_time
          : "--") +
        " - " +
        (istData?.pickup_date_and_time?.pickup_to_time
          ? istData?.pickup_date_and_time?.pickup_to_time
          : "--"),
    },
  ]);

  const [staticFieldsFive, setStaticFieldsFive] = useState([
    {
      label: "Carrier Name",
      type: "input",
      text: istData?.shipping_details?.package_details?.carrier_name
        ? istData?.shipping_details?.package_details?.carrier_name
        : "--",
    },
    {
      label: "AWB Number",
      type: "input",
      text: istData?.shipping_details?.package_details?.awb_number
        ? istData?.shipping_details?.package_details?.awb_number
        : "--",
    },
  ]);

  const headCellsTwo = [
    {
      key: "shipping_partner",
      // count:2,
      // numeric: false,
      label: "Shipping Partners",
      type: "text",
    },
    {
      key: "charges",
      // count:2,
      // numeric: false,
      label: "Charges",
      type: "text",
    },

    {
      key: "order_delivery_time",
      // count:2,
      // numeric: false,
      label: "Order Deliver time",
      type: "text",
    },
  ];

  return (
    <>
      {/* Shipping Details */}
      <div className="locationDetailsMainSectin">
        {istData && (
          <div className="locationDetailsMain">
            <div className="locationDetailForm">
              <div className="staticFormCard">
                <div className="staticFormCardTitle">Shipping Details</div>
                <div>
                  {/* <div className="product-staticFormCardForm"> */}
                  {staticFieldsTwo.map((field) => {
                    const val = field.label;
                    const typ = field.type;
                    return typ === "input" ? (
                      <Suspense fallback={<div>Loading... </div>}>
                        <RemoteWrapper>
                          <RemoteViewTextField
                            card
                            label={field.label}
                            text={field.text}
                            disabled_y={true}
                          />
                        </RemoteWrapper>
                      </Suspense>
                    ) : (
                      <></>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="locationDetailForm">
              <div className="staticFormCard">
                <div className="staticFormCardTitle">Package Details</div>
                <div>
                  <div className="product-staticFormCardForm">
                    {staticFieldsThree.map((field) => {
                      const val = field.label;
                      const typ = field.type;
                      return typ === "input" ? (
                        <Suspense fallback={<div>Loading... </div>}>
                          <RemoteWrapper>
                            <RemoteViewTextField
                              card
                              label={field.label}
                              text={field.text}
                              disabled_y={true}
                            />
                          </RemoteWrapper>
                        </Suspense>
                      ) : (
                        <></>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="locationDetailForm">
              <div className="staticFormCard">
                <div className="staticFormCardTitle">Self Details</div>
                <div>
                  <div className="product-staticFormCardForm">
                    {staticFieldsFive.map((field) => {
                      const val = field.label;
                      const typ = field.type;
                      return typ === "input" ? (
                        <Suspense fallback={<div>Loading... </div>}>
                          <RemoteWrapper>
                            <RemoteViewTextField
                              card
                              label={field.label}
                              text={field.text}
                              disabled_y={true}
                            />
                          </RemoteWrapper>
                        </Suspense>
                      ) : (
                        <></>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {/* <Suspense fallback={<div>Loading... </div>}>
              <RemoteWrapper>
                <div className="staticFormCardTitle details">
                  Estimated Cost
                </div>
                <RemoteDynamicTable
                  table_data={istData?.shipping_details?.estimated_cost}
                  headCells={headCellsTwo}
                  info={params}
                  setParams={setParams}
                  setId={setId}
                  enablepagination={false}
                />
              </RemoteWrapper>
            </Suspense> */}

            {istData && (
              <RemoteViewBox_Table
                headCells={headCellsTwo}
                table_data={shippingDetails.map((item) => {
                  return {
                    shipping_partner:
                      item &&
                      item.estimated_cost &&
                      item.estimated_cost.shipping_partner
                        ? item.estimated_cost.shipping_partner
                        : "--",
                    charges:
                      item && item.estimated_cost && item.estimated_cost.charges
                        ? item.estimated_cost.charges
                        : "--",
                    order_delivery_time:
                      item &&
                      item.estimated_cost &&
                      item.estimated_cost.order_delivery_time
                        ? item.estimated_cost.order_delivery_time
                        : "--",
                  };
                })}
                header={"Estimated Cost"}
              />
            )}
          </div>
        )}
      </div>

      {/* Schedule Pickup date and time */}
      <div className="locationDetailsMainSectin">
        {istData && (
          <div className="locationDetailsMain">
            <div className="locationDetailForm">
              <div className="staticFormCard">
                <div className="staticFormCardTitle">
                  Schedule Pickup date and time
                </div>
                <div style={{ display: "flex" }}>
                  {/* <div className="product-staticFormCardForm"> */}
                  {staticFieldsFour.map((field) => {
                    const val = field.label;
                    const typ = field.type;
                    return typ === "input" ? (
                      <div style={{ width: "50%" }}>
                        <Suspense
                          className="view_wrap"
                          fallback={<div>Loading... </div>}
                        >
                          <RemoteWrapper>
                            <RemoteViewTextField
                              card
                              label={field.label}
                              text={field.text}
                              disabled_y={true}
                            />
                          </RemoteWrapper>
                        </Suspense>
                      </div>
                    ) : (
                      <></>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShippingDetails;

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
