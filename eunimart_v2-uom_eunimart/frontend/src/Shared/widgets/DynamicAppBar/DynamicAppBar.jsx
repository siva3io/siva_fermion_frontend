import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchProduct } from "../../../redux/Action/SearchOutput";
import {
  getUOMData,
  getUOMClassData,
} from "../../../redux/Action/FetchUOMAction";
// getUOMData, getUOMClassData
//mui
import {
  styled,
  alpha,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  InputBase,
  MenuItem,
  Menu,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import ArchiveIcon from "@mui/icons-material/Archive";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import ListIcon from "@mui/icons-material/List";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ReplayIcon from "@mui/icons-material/Replay";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dropdown from "react-multilevel-dropdown";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function DynamicAppBar({
  handleModalOpen,
  dynamicAppBar,
  branch,
  handleDeleteModalOpen,
}) {
  const history = useNavigate();
  //search
  const [showSearchBox, setshowSearchBox] = useState(false);
  const [searchType, setSearchType] = useState("uom_name");

  //sort
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  //view
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //filter
  const [filterMenu, setFilterMenu] = React.useState(null);
  const isFilterMenuOpen = Boolean(filterMenu);

  //local functions
  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      setSearchInput("");
      dispatch(fetchSearchProduct({ "": "" }, branch, "search"));
    } else {
      setSearchInput(searchValue);
      dispatch(
        fetchSearchProduct({ [searchType]: searchValue }, branch, "search")
      );
    }
  }; //this function is use to search products

  const handleEdit = (id) => {
    if (branch === "uomClass") {
      dispatch(getUOMClassData(id));
      setTimeout(() => {
        history(`/uomClass/editUOMClass/${id}`);
      }, 500);
    }

    if (branch === "uom") {
      dispatch(getUOMData(id));
      setTimeout(() => {
        history(`/uom/editUOM/${id}`);
      }, 500);
    }
  };

  const filterSearchItems = (searchValue, searchTyp) => {
    if (searchValue.length === 0) {
      setSearchInput("");
      dispatch(fetchSearchProduct({ "": "" }, branch, "filters"));
    } else {
      setSearchInput(searchValue);
      dispatch(
        fetchSearchProduct({ [searchTyp]: searchValue }, branch, "filters")
      );
    }
  };

  const filterStatus = (status_value) => {
    // dispatch(
    //   fetchSearchProduct({ filter_params: "status", param_value: status_value })
    // );
  }; //status filter

  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  }; //sort

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  }; //filter

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  }; //view

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleFilterMenuOpen = (event) => {
    setFilterMenu(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenu(null);
    handleMenuClose();
    handleMobileMenuClose();
  };
  const menuId = "primary-search-account-menu";

  const sortOptions =
    branch === "uom"
      ? [
          {
            label: "UOM Name",
            endIcon: <KeyboardArrowRightIcon />,
            disabled: false,
            subItems: [
              {
                label: "A to Z",
                key: "asc",
              },
              {
                label: "Z to A",
                key: "desc",
              },
            ],
            func: (value) => {
              dispatch(fetchSearchProduct({ name: value }, branch, "sort"));
              handleSortMenuClose();
            },
          },
          {
            label: "UOM Class",
            endIcon: <KeyboardArrowRightIcon />,
            disabled: false,
            subItems: [
              {
                label: "A to Z",
                key: "asc",
              },
              {
                label: "Z to A",
                key: "desc",
              },
            ],
            func: (value) => {
              dispatch(
                fetchSearchProduct({ uom_class_name: value }, branch, "sort")
              );
              handleSortMenuClose();
            },
          },
          {
            label: "Base UOM",
            endIcon: <KeyboardArrowRightIcon />,
            disabled: true,
            subItems: [
              {
                label: "A to Z",
                key: "asc",
              },
              {
                label: "Z to A",
                key: "desc",
              },
            ],
            func: (value) => {
              dispatch(fetchSearchProduct({ base_uom: value }, branch, "sort"));
              handleSortMenuClose();
            },
          },
          {
            label: "UOM Code",
            endIcon: <KeyboardArrowRightIcon />,
            disabled: true,
            subItems: [
              {
                label: "Ascending",
                key: "asc",
              },
              {
                label: "Descending",
                key: "desc",
              },
            ],
            func: (value) => {
              dispatch(fetchSearchProduct({ code: value }, branch, "sort"));
              handleSortMenuClose();
            },
          },
          // {
          //   label: "Advance Sort",
          //   endIcon: null,
          //   func: handleModalOpen,
          //   disabled: false,
          // },
          {
            label: "Clear All",
            endIcon: null,
            func: (value) => {
              dispatch(fetchSearchProduct({ "": "" }, branch, "sort"));
              handleSortMenuClose();
            },
            disabled: false,
          },
        ]
      : [
          {
            label: "UOM Class Name",
            endIcon: <KeyboardArrowRightIcon />,
            disabled: false,
            subItems: [
              {
                label: "A to Z",
                key: "asc",
              },
              {
                label: "Z to A",
                key: "desc",
              },
            ],
            func: (value) => {
              dispatch(fetchSearchProduct({ name: value }, branch, "sort"));
              handleSortMenuClose();
            },
          },

          {
            label: "Base UOM",
            endIcon: <KeyboardArrowRightIcon />,
            disabled: true,
            subItems: [
              {
                label: "A to Z",
                key: "asc",
              },
              {
                label: "Z to A",
                key: "desc",
              },
            ],
            func: (value) => {
              dispatch(fetchSearchProduct({ base_uom: value }, branch, "sort"));
              handleSortMenuClose();
            },
          },
          {
            label: "UOM Class Code",
            endIcon: <KeyboardArrowRightIcon />,
            disabled: true,
            subItems: [
              {
                label: "Ascending",
                key: "asc",
              },
              {
                label: "Descending",
                key: "desc",
              },
            ],
            func: (value) => {
              dispatch(fetchSearchProduct({ code: value }, branch, "sort"));
              handleSortMenuClose();
            },
          },
          {
            label: "Advance Sort",
            endIcon: null,
            func: handleModalOpen,
            disabled: false,
          },
          {
            label: "Clear All",
            endIcon: null,
            func: (value) => {
              dispatch(fetchSearchProduct({ "": "" }, branch, "sort"));
              handleSortMenuClose();
            },
            disabled: false,
          },
        ];

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {sortOptions.map((option) => {
        if (option.subItems) {
          return (
            <Dropdown.Item>
              {option.label}
              <Box sx={{ flexGrow: 1 }} />
              <IconButton size="small" color="inherit">
                {option.endIcon}
              </IconButton>
              <Dropdown.Submenu position="left">
                {option.subItems.map((subOption) => (
                  <Dropdown.Item
                    onClick={() => {
                      option.func(subOption.key);
                    }}
                  >
                    {subOption.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Submenu>
            </Dropdown.Item>
            // <MenuItem>{option.label}</MenuItem>

            // <Box></Box>
          );
        } else {
          return (
            <Dropdown.Item onClick={option.func}>
              {option.label}
              <Box sx={{ flexGrow: 1 }} />
              <IconButton size="small" color="inherit">
                {option.endIcon}
              </IconButton>
            </Dropdown.Item>
            // <MenuItem onClick={option.func}>{option.label}</MenuItem>
            // <Box></Box>
          );
        }
      })}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderViewMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          dispatch({ type: "LIST_VIEW", payload: "listView" });
          handleMobileMenuClose();
        }}
      >
        <IconButton size="large" color="inherit">
          <ListIcon />
        </IconButton>
        <p>List View</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch({ type: "GRID_VIEW", payload: "gridView" });
          handleMobileMenuClose();
        }}
      >
        <IconButton size="large" color="inherit">
          <ViewComfyIcon />
        </IconButton>
        <p>Grid View</p>
      </MenuItem>
    </Menu>
  );

  const [filterOptions, setFilterOptions] = useState(
    branch === "uom"
      ? [
          {
            label: "UOM Name",
            icon: <FilterAltIcon />,
            endIcon: <KeyboardArrowRightIcon fontSize="small" />,
            collapseState: false,
            value: "name",
            // func: filterStatus,
          },
          {
            label: "UOM Class",
            icon: <FilterAltIcon />,
            endIcon: <KeyboardArrowRightIcon fontSize="small" />,
            collapseState: false,
            value: "uom_class_name",
          },
          {
            label: "Base UOM",
            icon: <FilterAltIcon />,
            endIcon: <KeyboardArrowRightIcon fontSize="small" />,
            collapseState: false,
            value: "base_uom",
          },
          {
            label: "UOM Code",
            icon: <FilterAltIcon />,
            endIcon: <KeyboardArrowRightIcon fontSize="small" />,
            collapseState: false,
            value: "code",
          },
          // {
          //   label: "Custom Filter",
          //   icon: <FilterAltIcon />,
          //   endIcon: <KeyboardArrowDownIcon fontSize="medium" />,
          //   collapseState: false,
          // },
        ]
      : [
          {
            label: "UOM Class Name",
            icon: <FilterAltIcon />,
            endIcon: <KeyboardArrowRightIcon fontSize="small" />,
            collapseState: false,
            value: "name",
            // func: filterStatus,
          },

          {
            label: "Base UOM",
            icon: <FilterAltIcon />,
            endIcon: <KeyboardArrowRightIcon fontSize="small" />,
            collapseState: false,
            value: "base_uom",
          },
          {
            label: "UOM Class Code",
            icon: <FilterAltIcon />,
            endIcon: <KeyboardArrowRightIcon fontSize="small" />,
            collapseState: false,
            value: "code",
          },
          // {
          //   label: "Custom Filter",
          //   icon: <FilterAltIcon />,
          //   endIcon: <KeyboardArrowDownIcon fontSize="medium" />,
          //   collapseState: false,
          // },
        ]
  );
  const handleAccordianExpand = (index) => {
    const tempFilterOpts = [...filterOptions];
    tempFilterOpts.map((item, i) => {
      if (index !== i) {
        item.collapseState = false;
      }
    });
    tempFilterOpts[index].collapseState = !tempFilterOpts[index].collapseState;
    setFilterOptions(tempFilterOpts);
  };
  const filterMenuId = "primary-search-account-menu-mobile";
  const renderFilterMenu = (filterOptions) => (
    <Menu
      anchorEl={filterMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={filterMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isFilterMenuOpen}
      onClose={handleFilterMenuClose}
    >
      {filterOptions.map((option, index) => {
        if (option.label !== "Custom Filter") {
          return (
            <Box>
              <Accordion
                expanded={option.collapseState}
                onChange={() => handleAccordianExpand(index)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <IconButton size="large" color="inherit">
                    {option.icon}
                  </IconButton>
                  <Typography>{option.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    label="Search"
                    size="small"
                    onChange={(event) => {
                      const string = event.target.value;
                      filterSearchItems(string, option.value);
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        } else {
          return (
            <Box>
              <Accordion
                expanded={option.collapseState}
                onChange={() => handleAccordianExpand(index)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <IconButton size="large" color="inherit">
                    {option.icon}
                  </IconButton>
                  <Typography>{option.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* <Autocomplete
                    size="small"
                    disablePortal={false}
                    id="combo-box-demo"
                    options={option.subMenu}
                    onChange={(event, value) => {
                      option.func(value && value.value);
                    }}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label={`Search ${option.label}`} />
                    )}
                  /> */}

                  <TextField
                    label="Search"
                    size="small"
                    onChange={(event) => {
                      const string = event.target.value;
                      filterSearchItems(string, option.value);
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        }
      })}
      {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="text" style={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button variant="contained" style={{ textTransform: "none" }}>
          Apply
        </Button>
      </Box> */}
    </Menu>
  );

  //local variables
  const dispatch = useDispatch();
  const view = useSelector((state) => state.productView.productView); //used to access variables and states
  const [searchInput, setSearchInput] = useState("");

  //styling
  const theme = createTheme({
    components: {
      // Name of the component
      MuiPopover: {
        styleOverrides: {
          // Name of the slot
          paper: {
            // Some CSS
            overflow: "unset",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            paddingTop: "0px!important",
            paddingBottom: "0px!important",
            boxShadow: "0px 4px 8px rgb(0 0 0 / 10%)!important",
            backgroundColor: "#fff!important",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            padding: "8px",
            color: "#001661",
            ":hover": {
              backgroundColor: "rgba(239, 242, 254, 0.75)",
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          // Name of the slot
          content: {
            // Some CSS
            alignItems: "center",
            height: "20px",
            minHeight: "10px",
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            padding: "8px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          // Name of the slot
          input: {
            // Some CSS
            marginTop: "4px",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          // Name of the slot
          list: {
            // Some CSS
            paddingTop: "0px",
            paddingBottom: "0px",
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            // borderBottomLeftRadius: "0px!important",
          },
        },
      },
    },
  });

  //render function
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        {/* <AppBar position="static" color="inherit" enableColorOnDark> */}
        <Toolbar
          style={{
            minHeight: "60px",
            // marginBottom: "15px",
            // padding: "10px 8px",
            background: "#fff",
            borderBottom: "1px solid #B9B9B9",
            alignItems: "center",
          }}
        >
          {dynamicAppBar.length === 0 ? (
            <>
              <Link
                to={
                  branch === "uom"
                    ? "/uom/createUOM"
                    : "/uomClass/createUOMClass"
                }
              >
                <Button
                  className="btn_primary"
                  // style={{ textTransform: "none" }}
                >
                  {branch == "uom" ? "Create UOM" : "Create UOM Class"}
                </Button>
              </Link>

              <Link
                to={
                  
                     "/uomClass/createUOMClass"
                }
              >
                <Button
                  className="btn_primary"
                  // style={{ textTransform: "none" }}
                >
                  {"Create UOM Class"}
                </Button>
              </Link>

              {/* <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <UploadOutlinedIcon />
                </IconButton> */}
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <ReplayIcon onClick={(e) => searchItems("")} />
              </IconButton>

              {/* <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <SyncOutlinedIcon />
                </IconButton> */}
            </>
          ) : dynamicAppBar.length === 1 ? (
            <>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  handleDeleteModalOpen(dynamicAppBar[0]);
                }}
              >
                <DeleteOutlineIcon
                  sx={{ width: "32px", height: "32px", padding: "4px" }}
                />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => handleEdit(dynamicAppBar[0])}
              >
                <EditOutlinedIcon
                  sx={{ width: "32px", height: "32px", padding: "4px" }}
                />
              </IconButton>
            </>
          ) : dynamicAppBar.length > 1 ? (
            <>
              {/* <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <DeleteOutlineIcon />
                </IconButton> */}
              <Typography variant="h7" color={"orange"}>
                Bulk options currently not available!
              </Typography>
            </>
          ) : null}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => searchItems(e.target.value)}
                />
              </Search> */}

            <Box
              style={{
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Collapse
                orientation="horizontal"
                in={showSearchBox}
                // collapsedSize={40}
              >
                <Autocomplete
                  style={{ overflow: "hidden" }}
                  noOptionsText={""}
                  disableClearable={true}
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={
                    branch === "uom"
                      ? [
                          { label: "UOM Name : ", value: "name" },
                          { label: "UOM Class : ", value: "class_name" },
                          { label: "Base UOM : ", value: "base_uom" },
                          { label: "UOM Code : ", value: "code" },
                        ]
                      : [
                          { label: "UOM Class Name : ", value: "name" },
                          { label: "Base UOM : ", value: "base_uom" },
                          { label: "UOM Class Code : ", value: "code" },
                        ]
                  }
                  // value={inventoryAdjustmentList[tempCount].item_number}
                  onChange={(e, value) => {
                    setSearchType(value ? value.value : "");
                  }}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      onChange={(event) => {
                        const string = event.target.value.split(":")[1].trim();
                        searchItems(string);
                      }}
                      // onKeyDown={(event) => {
                      //   const string = event.target.value.split(": ")[1];
                      // }}
                    />
                  )}
                />
              </Collapse>

              {!showSearchBox ? (
                <SearchIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setshowSearchBox(true);
                  }}
                  sx={{ width: "32px", height: "32px", padding: "4px" }}
                />
              ) : (
                <CloseIcon
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  sx={{ width: "32px", height: "32px", padding: "4px" }}
                  onClick={() => {
                    setshowSearchBox(false);

                    searchItems("");
                  }}
                />
              )}
            </Box>

            {/* <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <ArchiveIcon />
              </IconButton> */}
            <IconButton
              size="large"
              color="inherit"
              onClick={handleFilterMenuOpen}
            >
              <FilterAltOutlinedIcon
                sx={{ width: "32px", height: "32px", padding: "4px" }}
              />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleSortMenuOpen}
              color="inherit"
            >
              <ImportExportIcon
                sx={{ width: "32px", height: "32px", padding: "4px" }}
              />
            </IconButton>
            {/* <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                // onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <StarBorderIcon />
              </IconButton> */}
            {/* <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                {view === "listView" ? <ListIcon /> : <ViewComfyIcon />}
              </IconButton> */}
          </Box>
        </Toolbar>
        {/* </AppBar> */}
        <Box>{renderFilterMenu(filterOptions)}</Box>

        {renderViewMenu}
        {renderMenu}
      </Box>
    </ThemeProvider>
  );
}


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