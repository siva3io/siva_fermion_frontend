import React from "react";
import "./ProductDetailCard.css";
import FormikForm from "../FormikForms/FormikForm";

export const ProductDetailCard = ({
  MAP,
  TABLE_DUMMY_DATA_SHIPPING,
  TABLE_DUMMY_DATA_VENDOR,
  PRODUCT_INVENTORY_DATA,
  fields,
  updateFields,
  cardTitle,
}) => {
  return (
    <div className="detailCard">
      <FormikForm
        fields={fields}
        updateFields={updateFields}
        cardTitle={cardTitle}
        TABLE_DUMMY_DATA_SHIPPING={TABLE_DUMMY_DATA_SHIPPING}
        TABLE_DUMMY_DATA_VENDOR={TABLE_DUMMY_DATA_VENDOR}
        MAP={MAP}
        PRODUCT_INVENTORY_DATA={PRODUCT_INVENTORY_DATA}
      />
    </div>
  );
};


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