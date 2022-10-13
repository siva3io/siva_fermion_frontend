import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { fetchScrap } from "../../redux/Action/FetchScrap";
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

const ScrapTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchScrap());
  }, []);

  const scrapData = useSelector((state) => state.fetchScrap?.scrap);
  console.log(scrapData, "uu");

  const headCells = [
    {
      key: "schedule_scrap_date",
      numeric: true,
      type: "text",
      label: "Scrap Order Date",
    },

    {
      key: "scrap_order_no",
      numeric: false,
      type: "text",
      label: "Scrap ID Number",
    },
    {
      key: "reference_id",
      numeric: true,
      type: "text",
      label: "Reference Number",
    },

    {
      key: "scrap_location_details.city",
      numeric: true,
      count: 2,
      type: "text",
      label: "Source Location",
    },
    {
      key: "scrap_location_details.city",
      numeric: true,
      count: 2,
      type: "text",
      label: "Scrap Location",
    },
    {
      key: "no_of_items",
      numeric: true,
      type: "text",
      label: "No. of items",
    },

    {
      key: "status.display_name",
      numeric: true,
      count: 2,
      type: "text",
      label: "Scrapping Status",
    },
    {
      key: "grn_status",
      numeric: true,
      type: "text",
      label: "GRN Status",
    },
    {
      key: "shipping_details.shipping_preferance",
      numeric: true,
      count: 2,
      type: "text",
      label: "Shipping mode",
    },
    {
      key: "pickup_date_time.pickup_date",
      numeric: true,
      count: 2,
      type: "text",
      label: "Exp. shipping Date",
    },

    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ];
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      // func: (product_id) => handleView(product_id),
    },
  ]);

  return (
    <>
      <br />
      {/* <TabHeader hideIcons={true} title="Create Return" /> */}
      {scrapData?.data && scrapData?.data && scrapData?.data.length > 0 && (
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteWrapper>
            <RemoteDynamicTable
              table_data={scrapData?.data}
              headCells={headCells}
              customOptions={customOptions}
              setCustomOptions={setCustomOptions}
              info={scrapData?.meta?.info}
              //   setParams={setParams}
              //   handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
              //   setId={setId}
              enablepagination={false}
              checkDisable={false}
            />
          </RemoteWrapper>
        </Suspense>
      )}
    </>
  );
};

export default ScrapTab;
