import React, { useState, useEffect } from "react";
// import DynamicAppBar from "../../../shared/Bundle/DynamicAppBar/DynamicAppBar";
import ModalViewV2 from "../../../shared/widgets/Modal/ModalViewV2";
import BundleListTable from "../../../components/Bundle/BundleView/BundleListTable";
//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchBundle } from "../../../redux/Action/Bundle/FetchBundleListAction";
import { getStatusData } from "../../../redux/Action/Bundle/MisActions";

//mui
import { Box } from "@mui/material";

function BunddleView() {
  //temp
  const products = useSelector((state) => state.fetchBundles.bundles.Bundles);

  //temp
  const dispatch = useDispatch();
  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar
  const [modalOpen, setModalOpen] = useState(false); //modal
  const [params, setParams] = useState({ limit: 10, offset: 1 }); //view api call
  const [pages, setPages] = useState(
    params && Number(params.offset) ? Number(params.offset) : 0
  ); //pagination variables
  const [per_page, setPerPage] = useState(10); // offset variable

  /*Use Effect functions*/
  useEffect(() => {
    dispatch(fetchBundle(params));
    dispatch(getStatusData());
  }, [params]);

  useEffect(() => {
    if (params) {
      setParams({
        limit: Number(per_page),
        offset: Number(pages * per_page),
      });
    }
  }, [pages]);
  useEffect(() => {
    setPages(0);
    setPerPage(per_page);
    if (params) {
      setParams({
        limit: Number(per_page),
        offset: 0,
      });
    }
  }, [per_page]);

  //local functions
  const handleModalOpen = (bunddle_id) => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };

  //render function
  return (
    <Box>
      {/* <DynamicAppBar
        handleModalOpen={handleModalOpen}
        dynamicAppBar={dynamicAppBar}
      /> */}
      {products && products.data && products.meta.info && (
        <Box>
          <BundleListTable
            products_data={products.data}
            info={products.meta.info}
            totalRows={products.meta.info.total_rows}
            setParams={setParams}
            handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
          />
        </Box>
      )}

      {modalOpen && (
        <ModalViewV2
          modalTitle={"Advanced Sort"}
          handleModalClose={handleModalClose}
          modalOpen={modalOpen}
          actionBtns={["Cancel", "Sort"]}
          modalContentStyleHeight={"300px"}
          modalContentStyleWidth={"95%"}
          styleLeft={"calc(50% - 704px/2)"}
        ></ModalViewV2>
      )}
    </Box>
  );
}

export default BunddleView;






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