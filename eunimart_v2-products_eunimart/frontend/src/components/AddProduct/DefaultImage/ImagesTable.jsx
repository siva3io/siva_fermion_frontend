import React, { useState } from "react";

import { useHistory } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
import "../../../App.css";
import Button from "@mui/material/Button";
import Icon from '@mui/material/Icon';
import axios from "axios";


//Dropdown chips
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const names = [
    'Remove Bg',
    'Image Enhancement',
    'Blur',
    'Resolution Enhancement',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const headCells = [
    {
        id: "image",
        numeric: false,
        disablePadding: true,
        label: "Images",
    },

    {
        id: "effect",
        numeric: true,
        disablePadding: false,
        label: "Select the effect",
    },
    {
        id: "color",
        numeric: true,
        disablePadding: false,
        label: "Select the background color",
    },
    {
        id: "optimize",
        numeric: true,
        disablePadding: false,
        label: "Optimize",
    },
    {
        id: "result",
        numeric: true,
        disablePadding: false,
        label: "Result",
    },
];

function EnhancedTableHead(props) {
    const {
    } = props;


    return (
        <TableHead>
            <TableRow>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={"center"}
                        padding={headCell.disablePadding ? "none" : "normal"}>
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {

};

export default function ProductsTable({
    images,
    
    
    info,
    setParams,
    handleChangeDyanmicAppBar,
    handleChannelStatusModalOpen,
    handlePrintQRBarCodeModalOpen,
    setProductTemplateId,
}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [enhancement, setenhancement] = React.useState([]);


    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [productId, setProductId] = useState(0);
    const [variantId, setVariantId] = useState(0);


    //Modal
    const [modalOpen, setModalOpen] = useState(false); //delete
    const [favouriteModalOpen, setFavouriteModalOpen] = useState(false); //favourite
    const [archiveModalOpen, setArchiveModalOpen] = useState(false); //archive
    const [downloadModalOpen, setDownloadModalOpen] = useState(false); //download











    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - images.length) : 0;







    const handleBulkDownloadProduct = () => {
        //redux call
    };

    const handleDownloadProductTemplate = () => {
        //redux call
    };

    const handleBulkUploadProduct = () => {
        //redux call
    };



    //styling
    const theme = createTheme({
        components: {
            // Name of the component
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        textAlign: "center",
                        padding: "8px",
                    },
                    // Name of the slot
                    head: {
                        // Some CSS
                        // overflow: "unset",
                        fontSize: " 14px",
                        fontFamily: "Poppins",
                        color: "#001661",
                        padding: "8px",
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    root: {
                        // fontFamily: "Poppins",
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        width: "100%!important",
                    },
                },
            },
            MuiAutocomplete: {
                styleOverrides: {
                    root: {
                        width: "100%!important",
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontFamily: "Poppins",
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: "#416BFF",
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: "8px",
                    },
                },
            },
            MuiTableRow: {
                // styleOverrides: {
                hover: {
                    backgroundColor: "green",
                },
                // },
            },
        },
    });

    const setColor = (value) => {
        console.log(value)
    }

    const [personName, setPersonName] = React.useState([]);
    const handleChange = (event, index) => {
        console.log("handleChange", event)
        const {
            target: { value },
        } = event;
        images[index]["selectedEffects"] = event.target.value
        console.log("images", images)

        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log("personName", personName)
    };

    const handleSelectedColor = (index, color) => {
        console.log("handleSelectedColor", index, color);
        images[index]["selectedColor"] = color;
        console.log("images", images)
    }

    const handlePickerEvent = () => {
        document.getElementById('color_picker').click();
    }

    const handleCallApi = (index) => {
        //const temp_products = images[index];
        if (images[index] && images[index]["selectedEffects"] && images[index]["selectedEffects"].length > 0) {
            images[index]["selected_params"] = [];
            for (let i = 0; i < images[index]["selectedEffects"].length; i++) {
                if (images[index]["selectedEffects"][i] == "Remove Bg") {
                    images[index]["selected_params"].push("background_removal")
                }
                if (images[index]["selectedEffects"][i] == "Image Enhancement") {
                    images[index]["selected_params"].push("quality_enhancement")
                }
                if (images[index]["selectedEffects"][i] == "Blur") {
                    images[index]["selected_params"].push("blur_removal")
                }
                if (images[index]["selectedEffects"][i] == "Resolution Enhancement") {
                    images[index]["selected_params"].push("resolution_enhancement")
                }
            }
        }
        console.log("imagesimages", images)
        const data = {
            account_id: "631a7be2-5160-47fd-8667-63e0467182ea",
            background_colour: images[index]['selectedColor'] ? images[index]['selectedColor'] : "255,255,255",
            channel_id: "12",
            image: images[index]['data_url'].split(',')[1],
            image_file_format: "",
            selected_parameters: images[index]["selected_params"],
            sku_id: 7777777777,
        }
        axios
            .post("https://ai-api.eunimart.com/api/v2/image_optimizer/optimize", {
                // credentials: "same-origin",
                data
            })
            .then((response) => {
                console.log(response, ">>>>>>>>>>> response");
                // if (response.data) {
                if (response && response.data && response.data.data && response.data.data.enhanced_image) {
                    console.log("1", response.data.data.enhanced_image)
                    images[index]["enhancedImage"] = response.data.data.enhanced_image;
                    console.log("images res1", images)
                    //setimagesWholeData(images)
                }
                console.log("images res3", images)
                // scrollBottom();
                // }
            });
        console.log("images res", images)
    };


    //render functions
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%" }}>
                    <TableContainer sx={{ minHeight: "80vh", width: "1100px" }}>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? "small" : "medium"}
                        >
                            <EnhancedTableHead
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                {
                                    //   stableSort(detail, getComparator(order, orderBy))

                                    //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    images && images.length > 0 ? (
                                        images.map((row, index) => {

                                            const isItemSelected = isSelected(row.id);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <TableRow hover>

                                                    <TableCell align="center">
                                                        <img class="image_enhance" src={row?.data_url}></img>
                                                    </TableCell>


                                                    <TableCell align="center">
                                                        <div>
                                                            <FormControl sx={{ m: 1, width: 300 }}>
                                                                <InputLabel id="demo-multiple-chip-label">Select the effect	</InputLabel>
                                                                <Select
                                                                    labelId="demo-multiple-chip-label"
                                                                    id="demo-multiple-chip"
                                                                    multiple
                                                                    value={images[index] && images[index]["selectedEffects"] ? images[index]["selectedEffects"] : []}
                                                                    onChange={(event) => handleChange(event, index)}

                                                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                                    renderValue={(selected) => (
                                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                            {selected.map((value) => (
                                                                                <Chip key={value} label={value} />
                                                                            ))}
                                                                        </Box>
                                                                    )}
                                                                    MenuProps={MenuProps}
                                                                >
                                                                    {names.map((name) => (
                                                                        <MenuItem
                                                                            key={name}
                                                                            value={name}
                                                                            style={getStyles(name, personName, theme)}
                                                                        >
                                                                            {name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <div class="color_top_sec">
                                                            <div class="default_colors">
                                                                <div class="color_wrapper">
                                                                    <div class="white" onClick={() => handleSelectedColor(index, '255,255,255')}>

                                                                    </div>
                                                                    <div class="pink" onClick={() => handleSelectedColor(index, '255,204,204')}>

                                                                    </div>
                                                                    <div class="blue" onClick={() => handleSelectedColor(index, '204,229,255')}>

                                                                    </div>
                                                                    <div class="grey" onClick={() => handleSelectedColor(index, '192,192,192')}>

                                                                    </div>
                                                                </div>
                                                                <div class="color_wrapper1">
                                                                    <div class="green" onClick={() => handleSelectedColor(index, '77,203,142')}>

                                                                    </div>
                                                                    <div class="gold" onClick={() => handleSelectedColor(index, '240,212,112')}>

                                                                    </div>
                                                                    <div class="transparent" onClick={() => handleSelectedColor(index, '0,0,0,0')}>

                                                                    </div>

                                                                    <div class="picker" onClick={() => handlePickerEvent()}>
                                                                        <Icon fontSize="large">add_circle</Icon>
                                                                        <input id="color_picker" class="gold" type="color" onChange={e => handleSelectedColor(index, e.target.value)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>


                                                    <TableCell align="center">
                                                        <Button variant="contained"
                                                            onClick={() => handleCallApi(index)}
                                                        >Optimize</Button>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <img class="image_enhance" src={row && row.enhancedImage}></img>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <Box className="nodata_text_list">No data found</Box>
                                    )
                                }
                                {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
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