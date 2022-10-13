import React, { useEffect, useState, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
// import { loadSalesData, loadDeleteDataById } from "../redux/action";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteModalViewV2 from "Remote/ModalViewV2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadPurchaseReturnsData } from "../../redux/actions/action";

const GRNTab = () => {
  const navigate = useHistory();
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [params, setParams] = useState({ limit: 10, offset: 1, filters: null, sort: null });
  const [searchType, setSearchType] = useState("sales_order_number");
  const [selectedId, setId] = useState(0);
  const [deleteId, setdeleteId] = useState(0);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  let dispatch = useDispatch();
  const { purchaseReturnsdata, purchaseReturnsdata_meta } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(loadPurchaseReturnsData(params));
  }, [params]);


  const TableData = [
    {
      key: "created_date",
      numeric: false,
      label: "User Name",
      type: "date",
    },
    {
      key: "grn_number",
      numeric: false,
      label: "User ID",
      type: "text",
    },
    {
      key: "reference_number",
      numeric: false,
      label: "Email Address",
      type: "text",
    },
    {
      key: "grn_number",
      numeric: false,
      label: "User Designation",
      type: "text",
    },
    {
      key: "created_date",
      numeric: false,
      label: "Date of Creation",
      type: "text",
    },
    {
      key: "warehouse.name",
      count:2,
      numeric: false,
      label: "Location",
      type: "text",
      count: true,
    },
    {
      key: "status.display_name",
      count:2,
      numeric: false,
      label: "Team",
      type: "text",
      count: true,
    },
    {
      key: "grn_number",
      numeric: false,
      label: "Access class",
      type: "text",
      count: true,
    },
    {
      key: "grn_number",
      numeric: false,
      label: "Status",
      type: "text",
      count: true,
    },
    {
      key: "payment_amount",
      numeric: false,
      label: "Last login",
      type: "text",
      count: false,
    },

    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ];

  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };

  const sortOptions = [

  ];

  const searchOptions = [

  ]

  const [filterOptions, setFilterOptions] = useState(
    []

  );

  const [customOptions, setCustomOptions] = useState([
    {
    }
  ]);
  useEffect(() => {
    setCustomOptions(
      []
    )
  }, [])

  const handleView = (id) => {
    navigate.push("/sales/view/" + id);
  }
  // const handleDelete = (id) => {
  //   console.log("handleDelete", id)
  // }
  const handleEdit = (id) => {
    console.log("handleEdit", id)
    navigate.push("/sales/edit/" + id);
  }
  const handleButtonClick = (value) => {
    navigate.push("/sales/add");
  }

  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      // dispatch(loadSalesData({ "": "" }, "filters"));
    } else {
      dispatch(
        // dispatch(loadSalesData({ limit: params.limit, offset: params.offset, filters: JSON.stringify([[searchType, "ilike", searchValue]]) }))
      );
    }
  };

  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      // dispatch(loadSalesData({ "": "" }, "search"));
    } else {
      dispatch(
        // dispatch(loadSalesData({ limit: params.limit, offset: params.offset, filters: JSON.stringify([[searchType, "ilike", searchValue]]) }))
      );
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleDeleteModalClose = (value) => {
    console.log("enter close")
    setdeleteModalOpen(false)
  };

  return (
    <Box sx={{ background: "#F9F9F9" }}>

      {purchaseReturnsdata && purchaseReturnsdata_meta.info && (
        <Box sx={{ p: 2 }}>
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteDynamicAppBar
              handleModalOpen={handleModalOpen}
              dynamicAppBar={dynamicAppBar}
              sortOptions={sortOptions}
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
              filterSearchItems={filterSearchItems}
              searchItems={searchItems}
              searchOptions={searchOptions}
              searchType={searchType}
              setSearchType={setSearchType}
              handleButtonClick={handleButtonClick}
              buttons={[{ name: "Create user", handleButtonClick: handleButtonClick, flag: 1 }]}
            />
          </Suspense>



          <Suspense fallback={<div>Loading... </div>}>
            <RemoteDynamicTable
              table_data={purchaseReturnsdata}
              headCells={TableData}
              customOptions={customOptions}
              setCustomOptions={setCustomOptions}
              info={purchaseReturnsdata_meta.info}
              setParams={setParams}
              handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
              setId={setId}
              enablepagination={true}
            />
          </Suspense>

          <ToastContainer />
        </Box>
      )}
    </Box>
  );
};
export default GRNTab;



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