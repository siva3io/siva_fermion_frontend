import React from "react";
//mui
import { Box, List, ListItemButton, ListItemText } from "@mui/material";

const Nestedmenu = () => {
  return (
    <Box>
      <Box className="nestedsidemenu">
        <List>
          <ListItemButton>
            <ListItemText>Item 1</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Folder 1</ListItemText>
            <List>
              <ListItemButton>
                <ListItemText>Sub Item 1.1</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>Sub Item 1.2</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>Sub Item 1.3</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>Sub Item 1.4</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>Sub Item 1.2</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>Sub Item 1.3</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>Sub Item 1.4</ListItemText>
              </ListItemButton>
            </List>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Folder 2</ListItemText>
            <List>
              <ListItemButton>
                <ListItemText>Sub Item 2.1</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>Sub Item 2.2</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>Folder 2.3</ListItemText>
                <List>
                  <ListItemButton>
                    <ListItemText>Sub Item 2.3.1</ListItemText>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText>Sub Item 2.3.2</ListItemText>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText>Sub Item 2.3.3</ListItemText>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText>Sub Item 2.3.4</ListItemText>
                  </ListItemButton>
                </List>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>Sub Item 2.4</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>Sub Item 2.5</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>Sub Item 2.6</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>Sub Item 2.7</ListItemText>
              </ListItemButton>
            </List>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Item 3</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Folder 3</ListItemText>
            <List>
              <ListItemButton>
                <ListItemText>Sub Item 3.1</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>Folder 3.2</ListItemText>
                <List>
                  <ListItemButton>
                    <ListItemText>Sub Item 3.2.1</ListItemText>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText>Sub Item 3.2.2</ListItemText>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText>Folder 3.2.3</ListItemText>
                    <List>
                      <ListItemButton>
                        <ListItemText>Sub Item 3.2.3.1</ListItemText>
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemText>Sub Item 3.2.3.2</ListItemText>
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemText>Sub Item 3.2.3.3</ListItemText>
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemText>Sub Item 3.2.3.4</ListItemText>
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemText>Sub Item 3.2.3.5</ListItemText>
                      </ListItemButton>
                    </List>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText>Sub Item 3.2.4</ListItemText>
                  </ListItemButton>
                </List>
              </ListItemButton>
            </List>
          </ListItemButton>
        </List>
        <br style="clear: left" />
      </Box>
    </Box>
  );
};

export default Nestedmenu;


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