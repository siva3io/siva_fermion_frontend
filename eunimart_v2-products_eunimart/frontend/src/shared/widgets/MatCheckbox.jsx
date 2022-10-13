import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function MatCheckbox({
  label,
  fields,
  setCheckboxType,
  onChange,
}) {
  return (
    <FormGroup row>
      {fields.map((field, index) => {
        return (
          <FormControlLabel
            onChange={onChange}
            control={<Checkbox checked={field[2]} />}
            label={field[1]}
            value={field[0]}
            sx={{ mr: 2, color: "black", fontFamily: "Inter!important" }}
          />
        );
      })}
    </FormGroup>
  );
}


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