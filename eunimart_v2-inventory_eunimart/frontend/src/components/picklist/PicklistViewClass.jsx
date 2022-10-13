import React, { useState, useEffect } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { Suspense } from "react";
const RemoteViewBox = React.lazy(() => import("Remote/ViewBox"));
import "../../App.css";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import ProductList from "./ProductList";
import { loadPicklistEditData } from "../../redux/actions/FetchPicklistEdit";
import { useDispatch, useSelector } from "react-redux";

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const headCells = [
  {
    key: "product.sku_code",
    numeric: false,
    label: "SKU ID",
    type: "text",
    count: 2,
  },
  {
    key: "product.product_name",
    numeric: false,
    label: "Product Name",
    type: "text",
    count: 2,
  },
  {
    key: "product.product_variant_name",
    numeric: false,
    label: "Product Variant Name",
    type: "text",
    count: 2,
  },
  {
    key: "sales_document_id[0].id",
    numeric: false,
    label: "Sales Document ID",
    type: "text",
    count: 2,
  },
  {
    key: "product.assignee_name",
    numeric: false,
    label: "Customer Name",
    type: "text",
    count: 2,
  },
  {
    key: "quantity_ordered",
    numeric: false,
    label: "Quantity Ordered",
    type: "text",
  },
  {
    key: "quantity_picked",
    numeric: false,
    label: "Quantity Picked",
    type: "text",
  },
  {
    key: "quantity_to_pick",
    numeric: false,
    label: "Quantity to Pick",
    type: "text",
  },
  {
    key: "remaining_quantity",
    numeric: false,
    label: "Quantity Remaining",
    type: "text",
  },
];

//picklistData
function PicklistViewClass({ picklistViewData, id }) {
  const dispatch = useDispatch();

  const [files, setFiles] = React.useState([
    { type: "application/pdf", name: "Attachment Name" },
    { type: "application/pdf", name: "Attachment Name" },
  ]);

  const [edit, setEdit] = useState(false);
  const [qty_enabled, setQtyenabled] = useState(true);
  const [variant, setVariant] = useState(
    picklistViewData ? picklistViewData.picklistdata : []
  );
  const [payload, setPayloadData] = useState([]);

  const [pages, setPages] = useState(
    params && Number(params.offset) ? Number(params.offset) : 0
  ); //pagination variables

  const [params, setParams] = useState({ limit: 10, offset: 0 });

  const [selectedId, setId] = useState(0);

  const [picklistdetails, setpicklistdetails] = useState([
    {
      label: "Pick list ID",
      text: variant && variant.pick_list_number,
      type: "input",
    },
    {
      label: "Pick list Date",
      text: variant && variant.updated_date,
      type: "input",
    },
    {
      label: "Source Documents Type",
      text:
        variant &&
        variant.source_doc_type &&
        variant.source_doc_type.display_name,
      type: "input",
    },
    {
      label: "Source document ID",
      text:
        variant &&
        variant.source_documents &&
        variant.source_documents.source_document_id &&
        variant.source_documents.source_document_id.label,
      type: "input",
    },
    {
      label: "Reference ID",
      text: variant && variant.reference_number,
      type: "input",
    },
    {
      label: "Assignee to",
      text: variant && variant.assignee_to && variant.assignee_to.first_name,
      type: "input",
    },
    {
      label: "Warehouse Name",
      text: variant && variant.warehouse && variant.warehouse.name,
      type: "input",
    },
    {
      label: "Select Customers",
      text:
        variant &&
        variant.select_customer &&
        variant.select_customer.first_name,
      type: "input",
    },
  ]);

  const [pickingstatus, setpickingstatus] = useState([
    {
      label: "Start Date & Time",
      text: variant && variant.start_date_time,
      type: "input",
    },
    {
      label: "End Date & Time",
      text: variant && variant.end_date_time,
      type: "input",
    },
    {
      label: "Total Items to Pick",
      text: variant && variant.items_to_pick,
      type: "input",
    },
    {
      label: "Total Items Picked",
      text: variant && variant.total_picked_items,
      type: "input",
    },
  ]);

  let picklistValue = [];
  picklistValue = useSelector((state) => state.picklistviewdata.picklistdata);

  const handleProcessPicklist = () => {
    setQtyenabled((prev) => !prev);
    let temp_payload = {
      picklist_lines: payload["picklist_lines"],
      status_id: 100,
    };
    dispatch(loadPicklistEditData(temp_payload, picklistValue["id"]));
    // dispatch(fetchPicklistDetail(picklistValue["id"]));
    // setTimeout(() => {
    //   history.push({
    //     pathname: `/pickList/view/${picklistValue["id"]}`,
    //     state: { id: picklistValue["id"] },
    //   });
    // }, 300);
  };

  return (
    <>
      <Box className="bundleViewTopContent">
        <div className="viewTopContent">
          <h1>{variant && variant.pick_list_number}</h1>
          <p className="statusTag">
            {variant && variant.status && variant.status.display_name}
          </p>
        </div>
      </Box>

      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <RemoteViewBox
            view_data={picklistdetails}
            header={"Pick list Details"}
          />
        </RemoteWrapper>
      </Suspense>

      <Box className="bundleViewTopContent">
        <div className="viewTopContent">
          <div className="product_details_button_wrapper">
            <Typography
              componet="h4"
              variant="h6"
              color={"#121417"}
              fontWeight={600}
            >
              Product Details
            </Typography>
            {qty_enabled && (
              <Button
                variant="contained"
                className="btn_primary"
                onClick={() => {
                  setQtyenabled((prev) => !prev);
                }}
              >
                Process Picklist
              </Button>
            )}
          </div>
          <ProductList
            payload={variant}
            setPayloadData={setPayloadData}
            qty_ordered_enabled={qty_enabled}
          />
          {!qty_enabled && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "end",
                padding: "16px 24px",
              }}
            >
              <Button
                variant="outlined"
                className="btn_no_border"
                onClick={() => {
                  setQtyenabled((prev) => !prev);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="btn_primary"
                onClick={() => {
                  handleProcessPicklist();
                }}
              >
                Process Complete
              </Button>
            </Box>
          )}
        </div>
      </Box>

      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <RemoteViewBox view_data={pickingstatus} header={"Picking Status"} />
        </RemoteWrapper>
      </Suspense>

      <Box className="bundleViewTopContent">
        <div className="viewTopContent">
          <Typography
            componet="h4"
            variant="h6"
            color={"#121417"}
            fontWeight={600}
          >
            Other Details
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "space-between",
              marginTop: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                paddingTop: "16px",
              }}
            >
              <Typography
                width={"20%"}
                variant="body3"
                component="p"
                color="#2E2E2E"
                padding="12px 0px"
                fontFamily={"Inter!important"}
              >
                Notes
              </Typography>
              <Typography
                width={"80%"}
                variant="body3"
                component="p"
                color="#5D5D5D"
                fontFamily={"Inter!important"}
              >
                {variant && variant.internal_notes
                  ? variant.internal_notes
                  : "---"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              <Typography
                width={"20%"}
                variant="body3"
                padding="12px 0px"
                component="p"
                color="#2E2E2E"
                fontFamily={"Inter!important"}
              >
                Attach file(s) to Picklist
              </Typography>
              <Typography
                borderRadius={"5px"}
                padding={"8px"}
                width={"80%"}
                variant="body3"
                component="p"
                color="#5D5D5D"
                fontFamily={"Inter!important"}
                display={"flex"}
              >
                {files && files.length > 0
                  ? files.map((file, index) => {
                      {
                      }
                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #f9f9f9",
                            boxShadow: " 0px 2px 4px rgb(0 0 0 / 10%)",
                            padding: "0 8px",
                            margin: "0 8px 0 0",
                            backgroundColor: "#F3F3F3",
                          }}
                        >
                          {file.type == "application/pdf" ? (
                            <PictureAsPdfIcon
                              style={{ color: "black" }}
                            ></PictureAsPdfIcon>
                          ) : (
                            <PhotoIcon
                              style={{ color: "rgb(65, 107, 255)" }}
                            ></PhotoIcon>
                          )}
                          <p>{file.name}</p>
                          <FileDownloadIcon />
                        </div>
                      );
                    })
                  : null}
              </Typography>
            </Box>
          </Box>
        </div>
      </Box>
    </>
  );
}

export default PicklistViewClass;

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
