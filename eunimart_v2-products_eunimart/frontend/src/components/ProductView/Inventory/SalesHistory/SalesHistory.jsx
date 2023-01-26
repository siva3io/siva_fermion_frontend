import React from "react";
import SalesHistoryTable from "./SalesHistoryTable";
//mui
import { Box } from "@mui/material";

function SalesHistory() {
  return (
    <Box className="companyDetailsOrder">
      <Box className="companyDetailsOrderHeader">
        <p className="companyDetailsOrder_header">Sales History</p>
      </Box>
      <Box className="companyDetailsOrder_card">
        <Box className="variantDetailsCard_card_left" sx={{ py: 2 }}>
          <SalesHistoryTable />
        </Box>
      </Box>
    </Box>
  );
}

export default SalesHistory;

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