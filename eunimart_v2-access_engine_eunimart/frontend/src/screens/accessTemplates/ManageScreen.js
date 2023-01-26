import React, { useEffect, useState, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  loadModuleData,
  loadTemplateDetailsData,
  loadTemplateCreate,
  loadTemplateUpdate,
} from "../../redux/action";
import MatInput from "Remote/MatInput";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import RemoteDynamicTable from "Remote/DynamicTable";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import {
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  Switch,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";

const ManageScreen = props => {
  const navigate = useHistory();
  let dispatch = useDispatch();
  const { moduleData, moduleMeta, templateData, templateMeta } = useSelector(
    state => state.data
  );
  const [state, setState] = useState({});

  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [searchType, setSearchType] = useState("Name");
  const [selectedId, setId] = useState(0);

  useEffect(() => {
    dispatch(loadModuleData({ limit: 100, offset: 1 }));
  }, []);

  useEffect(() => {
    console.log("loadModuleData", moduleData);
    if (moduleData) {
      var newData = moduleData.map((o, i) => {
        view_actions_json.map(
          p =>
            (o[p.lookup_code] = {
              value: {
                ctrl_flag: 0,
                lookup_code: p.lookup_code,
                display_name: p.display_name,
              },
              checked: false,
              data_actions_json_ctrl_flag: 0,
            })
        );
        return o;
      });

      setState({ ...state, moduleData: newData });

      if (props.id) {
        dispatch(loadTemplateDetailsData(props.id));
      }
    }
  }, [moduleData]);

  useEffect(() => {
    if (props.id && moduleData && moduleData.length > 0) {
      console.log("templateData", templateData);

      var newData = moduleData.map((o, i) => {
        var row = templateData.find(
          p => p.access_template_id == props.id && p.core_app_module_id == o.id
        );
        if (row) {
          o.template_module_id = row.id;
          o.access_template_id = props.id;
          o.core_app_module_id = row.core_app_module_id;
          o.module_ctrl_flag = row.module_ctrl_flag;
          view_actions_json.map(p => {
            var view_actions_json1 = row.view_actions_json.find(
              x => x.lookup_code == p.lookup_code
            );
            var data_actions_json1 = row.data_actions_json.find(
              x => x.lookup_code == p.lookup_code
            );
            if (view_actions_json1) {
              o[p.lookup_code] = {
                value: view_actions_json1,
                checked: view_actions_json1.ctrl_flag == 1,
                data_actions_json_ctrl_flag: data_actions_json1.ctrl_flag,
              };
            }
          });
        }
        return o;
      });

      var templateName = templateData[0]?.AccessTemplate?.name;
      setState({ ...state, moduleData: newData, templateName });
    }
  }, [templateData]);

  const view_actions_json = [
    {
      ctrl_flag: 1,
      lookup_code: "ADMIN",
      display_name: "Admin",
    },
    {
      ctrl_flag: 1,
      lookup_code: "CREATE",
      display_name: "Create",
    },
    {
      ctrl_flag: 1,
      lookup_code: "UPDATE",
      display_name: "Update",
    },
    {
      ctrl_flag: 1,
      lookup_code: "READ",
      display_name: "Read",
    },
    {
      ctrl_flag: 1,
      lookup_code: "DELETE",
      display_name: "Delete",
    },
    {
      ctrl_flag: 1,
      lookup_code: "LIST",
      display_name: "List",
    },
    {
      ctrl_flag: 1,
      lookup_code: "UPLOAD",
      display_name: "Upload",
    },
    {
      ctrl_flag: 1,
      lookup_code: "DOWNLOAD",
      display_name: "Download",
    },
    {
      ctrl_flag: 1,
      lookup_code: "PARTIAL",
      display_name: "Partial",
    },
  ];

  const handleButtonClick = key => {
    console.log("key", key);
    if (key == "Cancel") {
      navigate.push("/access-templates");
    }
    if (key == "Save_Send") {
      if (!state.templateName) {
        alert("Template name is required.");
        return;
      }
      var req = {
        name: state.templateName,
        module_data: moduleData.map((o, i) => {
          return {
            id: o.template_module_id,
            core_app_module_id: o.id,
            display_name: o.module_name,
            module_ctrl_flag: o.module_ctrl_flag ?? false,
            data_actions_json: view_actions_json.map(p => {
              return {
                ctrl_flag: o[p.lookup_code].data_actions_json_ctrl_flag,
                display_name: o[p.lookup_code].value.display_name,
                lookup_code: o[p.lookup_code].value.lookup_code,
              };
            }),
            view_actions_json: view_actions_json.map(p => {
              return {
                ctrl_flag: o[p.lookup_code].checked ? 1 : 0,
                display_name: o[p.lookup_code].value.display_name,
                lookup_code: o[p.lookup_code].value.lookup_code,
              };
            }),
          };
        }),
      };
      console.log("req", req);
      if (props.id) {
        loadTemplateUpdate(props.id, req, resp => {
          console.log("resp", resp);
          toast(resp.meta.message);
          alert(resp.meta.message);
        });
      } else {
        loadTemplateCreate(req, resp => {
          console.log("resp", resp);
          toast(resp.meta.message);
          alert(resp.meta.message);
        });
      }
    }
  };

  const handelSelectonChange = (key, item) => {
    //setModalOpen(true);
    console.log(item);

    var newData = state.moduleData.map((o, i) => {
      if (o.id == item.id) {
        if (key == "module_ctrl_flag") o.module_ctrl_flag = !o.module_ctrl_flag;
        else {
          if (o.parent_module_id == null) {
            state.moduleData
              .filter(x => x.parent_module_id == o.id)
              .map(x => {
                x[key].checked = !o[key].checked;
              });
          } else
            state.moduleData
              .filter(x => x.id == o.parent_module_id)
              .map(x => {
                x[key].checked = false;
              });

          o[key].checked = !o[key].checked;
        }
      }
      return o;
    });
    setState({ ...state, moduleData: newData });
  };

  const handleChange = (key, item, value) => {
    var newData = state.moduleData.map((o, i) => {
      if (o.id == item.id) {
        if (o.parent_module_id == null) {
          state.moduleData
            .filter(x => x.parent_module_id == o.id)
            .map(x => {
              x[key].data_actions_json_ctrl_flag = value;
            });
        } else {
          state.moduleData
            .filter(x => x.id == o.parent_module_id)
            .map(x => {
              x[key].data_actions_json_ctrl_flag = null;
            });
        }
        o[key].data_actions_json_ctrl_flag = value;
      }
      return o;
    });
    setState({ ...state, moduleData: newData });
  };

  const Tr = props => {
    return (
      <TableRow sx={props.style}>
        <TableCell>
          <Checkbox
            onClick={event =>
              handelSelectonChange("module_ctrl_flag", props.item)
            }
            color="primary"
            checked={props.item.module_ctrl_flag}
            sx={{ color: "#001661", padding: "5px!important" }}
          />
        </TableCell>
        <TableCell>{props.item.module_name}</TableCell>
        {view_actions_json.map((o, i) => (
          <TableCell key={i}>
            <Checkbox
              onClick={event => handelSelectonChange(o.lookup_code, props.item)}
              color="primary"
              checked={props.item[o.lookup_code].checked}
              sx={{ color: "#001661", padding: "5px!important" }}
            />{" "}
            <br />
            <Select
              value={props.item[o.lookup_code].data_actions_json_ctrl_flag}
              onChange={e =>
                handleChange(o.lookup_code, props.item, e.target.value)
              }
            >
              <MenuItem value={0} title="No data access">
                0
              </MenuItem>
              <MenuItem value={1} title="Full data access">
                1
              </MenuItem>
              <MenuItem value={2} title="Self data access">
                2
              </MenuItem>
              <MenuItem value={3} title="Team data access">
                3
              </MenuItem>
              <MenuItem value={4} title="Custom data access">
                4
              </MenuItem>
            </Select>
          </TableCell>
        ))}
      </TableRow>
    );
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <MatInput
          label="Access Template Name"
          value={state.templateName}
          onChange={e => setState({ ...state, templateName: e.target.value })}
          placeholder="Access Template Name"
        />
      </Box>
      <Box sx={{ background: "#F9F9F9" }}>
        <Table>
          <TableHead style={{ backgroundColor: "#e7f0fd" }}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Module Name</TableCell>
              {view_actions_json.map((o, i) => (
                <TableCell key={i}>{o.display_name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.moduleData &&
              state.moduleData
                .filter(o => o.parent_module_id == null)
                .map((item, index) => (
                  <>
                    <Tr
                      style={{ backgroundColor: "#d5d5d5" }}
                      key={index}
                      item={item}
                    />
                    {state.moduleData
                      .filter(o => o.parent_module_id == item.id)
                      .map((item, index) => (
                        <Tr key={index} item={item} />
                      ))}
                  </>
                ))}
          </TableBody>
        </Table>
      </Box>
      <AddFormFooter_Button handleButtonClick={handleButtonClick} />
      <ToastContainer />
    </>
  );
};

export default ManageScreen;

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
