import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddForm from "Remote/AddForm";
import AddForm_Table from 'Remote/AddForm_Table';
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, FormControlLabel, FormGroup, Link } from "@mui/material";
import { fetchProductsData } from "../../redux/Action/SalesReturns/FetchProductListAction";
import { fetchUOMDropdown } from "../../redux/Action/SalesReturns/UOMDropdownAction";
import { States2 } from "../../redux/Action/SalesReturns/StatesAction";
import { Countries } from "../../redux/Action/SalesReturns/CountriesAction";
import { getContactList } from "../../redux/Action/SalesReturns/GetContactList";
import { getRetunReason } from "../../redux/Action/SalesReturns/GetRetunReason";
import { getSalesReturnsCurrency } from "../../redux/Action/SalesReturns/GetCurrency";
import { fetchSalesOrder } from "../../redux/Action/SalesReturns/FetchSalesOrder";
import CreateShippingDetails from "../../components/UI/CreateShippingDetails";
import AddFormFooter from "Remote/AddFormFooter";
import { createSalesReturnsList } from "../../redux/Action/SalesReturns/CreateSRlist";
import CreditNote from "../../components/UI/CreditNote";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import { estimatedcost } from "../../redux/Action/SalesReturns/EstimatedCostAction";
import { Returntype } from "../../redux/Action/SalesReturns/ReturnTypeAction";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { getViewSalesReturns } from "../../redux/Action/SalesReturns/ViewSalesReturns";
import { getDocumentType } from "../../redux/Action/SalesReturns/GetDocumentType";
import { SearchSourceDocumentData } from "../../redux/Action/SalesReturns/SearchSourceDocumentAction";
import { fetchLocation } from "../../redux/Action/SalesReturns/FetchLocation";
import { updateSalesReturns } from "../../redux/Action/SalesReturns/EditSalesReturns";

const EditSR = () => {


    const dispatch = useDispatch();
    const [inputValue, setInputvalue] = useState({});
    const [mainData, setMainData] = useState({});
    const { id } = useParams();
    useEffect(() => dispatch(getViewSalesReturns(id)), []);
    const SRData = useSelector((state) => state.ViewSR.ViewSalesRetuns);
    console.log(SRData, "SRData")
    const [selectedProductData, setSelectedProductData] = useState([{ Quantity: 0, selling_price: 0, discount: 0, product_pricing_details: { tax_options: 0 } }]);
    const [paymentDetailsFields, setPaymentDetailsFields] = useState({ subTotal: 0, tax: 0, shippingCharge: 0, adjustment_text: "", adjustment_amount: 0, total: 0 });

    const [CheckboxShowForCopyField_value, setCheckboxShowForCopyField_value] = useState(false);


    useEffect(() => dispatch(fetchProductsData()), []);
    useEffect(() => dispatch(getDocumentType()), []);

    const productVariantData = useSelector(
        (state) => state.fetchProductsData?.products
    );
    console.log(productVariantData, "productVariantData");

    // useEffect(() => dispatch(States2()), []);

    const states1 = useSelector((state) => state.States2?.states1);
    const documentType = useSelector((state) => state.documentType?.documentType);

    const onAddNewRaw = () => {
        setSelectedProductData([...selectedProductData, { Quantity: 0, selling_price: 0, discount: 0, product_pricing_details: { tax_options: 0 } }]);
    }

    useEffect(() => dispatch(Countries()), []);
    const Countriesdata = useSelector((state) => state.Countries?.countries);

    var countryoptions = [];
    for (let i in Countriesdata) {
        countryoptions = countryoptions.concat(Countriesdata[i].name);
    }

    useEffect(() => dispatch(fetchUOMDropdown()), []);

    const UOM = useSelector(
        (state) => state.fetchUOMDropdown?.Uom
    );

    useEffect(() => dispatch(Returntype()), []);

    const Returntype1 = useSelector(
        (state) => state.Returntype?.returntype
    );
    console.log(Returntype1, "Returntype1");

    useEffect(() => dispatch(fetchLocation()), []);
    const Returnlocation = useSelector(
        (state) => state.fetchLocation?.location
    );

    const SearchSourceDocument = useSelector(
        (state) => state.SearchSourceDocumentData?.SearchSourceDocument
    );

    console.log("SearchSourceDocument", SearchSourceDocument)

    const finalData = useSelector(
        (state) => state.documentData?.documentData
    )
    console.log(finalData, "finalData");

    //------------------------------------------------------------
    //------------------------------------------------------------------------

    useEffect(() => {
        if (finalData) {
            if (mainData && mainData?.Link_Document_Type && mainData?.Link_Document_Type?.label == 'Shipping Orders') {
                console.log("finalData", finalData);
                var newMainData = [];
                var newSRDetailsFields = SRDetailsFields.map(o => {
                    if (o.key == "Reference_Number") o.value = finalData?.order?.reference_number
                    if (o.key == "Expected_Delivery_Date") o.value = moment(finalData?.expected_delivery_date).format("YYYY-MM-DD")
                    return o;
                })
                setSRDetailsFields(newSRDetailsFields);

                var newDispatchLocationFields = DispatchLocationFields
                    .map(o => {
                        if (o.key == "ShippingAddress_Receiver_Name") o.value = finalData?.order?.customer_shipping_address?.contact_person_name;
                        if (o.key == "ShippingAddress_Mobile_Number") o.value = finalData?.order?.customer_shipping_address?.contact_person_number;;
                        //if (o.key == "ShippingAddress_Email") o.value = finalData?.order?.customer_billing_address?.email;
                        if (o.key == "ShippingAddress_address_line_1") o.value = finalData?.order?.customer_shipping_address?.address_line_1;
                        if (o.key == "ShippingAddress_address_line_2") o.value = finalData?.order?.customer_shipping_address?.address_line_2;
                        if (o.key == "ShippingAddress_address_line_3") o.value = finalData?.order?.customer_shipping_address?.address_line_3;
                        if (o.key == "ShippingAddress_Country") o.value = finalData?.order?.customer_shipping_address?.country;
                        if (o.key == "ShippingAddress_State") o.value = finalData?.order?.customer_shipping_address?.state;
                        // if (o.key == "ShippingAddress_Country") o.value = { id: finalData?.order?.customer_billing_address?.country, label: finalData?.sender_address?.country }
                        // if (o.key == "ShippingAddress_State") o.value = { id: finalData?.order?.customer_billing_address?.state, label: finalData?.sender_address?.state };
                        if (o.key == "ShippingAddress_District") o.value = finalData?.order?.customer_shipping_address?.address_line_3;
                        if (o.key == "ShippingAddress_Zipcode") o.value = finalData?.order?.customer_shipping_address?.pin_code;
                        return o;  //data.order.customer_billing_address.address_line_1
                    })


                var newCustomerBillingAddressFields = CustomerBillingAddressFields
                    .map(o => {
                        if (o.key == "BillingAddress_Receiver_Name") o.value = finalData?.order?.customer_billing_address?.contact_person_name;
                        if (o.key == "BillingAddress_Mobile_Number") o.value = finalData?.order?.customer_billing_address?.contact_person_number;;
                        if (o.key == "BillingAddress_Email") o.value = finalData?.order?.customer_billing_address?.email;
                        if (o.key == "BillingAddress_address_line_1") o.value = finalData?.order?.customer_billing_address?.address_line_1;
                        if (o.key == "BillingAddress_address_line_2") o.value = finalData?.order?.customer_billing_address?.address_line_2;
                        if (o.key == "BillingAddress_address_line_3") o.value = finalData?.order?.customer_billing_address?.address_line_3;
                        if (o.key == "BillingAddress_Country") o.value = finalData?.order?.customer_billing_address?.country;
                        if (o.key == "BillingAddress_State") o.value = finalData?.order?.customer_billing_address?.state;
                        // if (o.key == "BillingAddress_Country") o.value = { id: finalData?.order?.customer_billing_address?.country, label: finalData?.billing_address?.country }
                        // if (o.key == "BillingAddress_State") o.value = { id: finalData?.order?.customer_billing_address?.state, label: finalData?.billing_address?.state };
                        if (o.key == "BillingAddress_District") o.value = finalData?.order?.customer_billing_address?.address_line_3;
                        if (o.key == "BillingAddress_Zipcode") o.value = finalData?.order?.customer_billing_address?.pin_code;
                        return o;
                    })
                setCustomerBillingAddressFields(newCustomerBillingAddressFields);

                var newAdditionalInformationFields = AdditionalInformationFields
                    .map(o => {
                        if (o.key == "Additional_Information_Note") o.value = finalData?.order?.additional_information?.notes;
                        if (o.key == "Additional_Information_Terms_Conditions") o.value = finalData?.order?.additional_information?.terms_and_conditions;
                        return o;
                    })
                setAdditionalInformationFields(newAdditionalInformationFields);

                var newPackageDetailsFields = PackageDetailsFields.map(o => {
                    if (o.key == "Package_Length") o.value = finalData?.package_details?.package_length;
                    if (o.key == "Package_Width") o.value = finalData?.package_details?.package_width;
                    if (o.key == "Package_Height") o.value = finalData?.package_details?.package_height;
                    if (o.key == "Package_Weight") o.value = finalData?.package_details?.package_weight;
                    return o;
                })
                setPackageDetailsFields(newPackageDetailsFields);

                var newDateandTime = DateandTime
                    .map(o => {
                        if (o.key == "Schedule_Scrap_Date") o.value = moment(finalData?.set_pickup_date).format("YYYY-MM-DD");
                        if (o.key == "Schedule_Pickup_time") o.value = o.value.map(p => {
                            if (p.key == "Schedule_Pickup_time_from") p.value = moment(finalData?.set_pickup_time);
                            if (p.key == "Schedule_Pickup_time_to") p.value = moment(finalData?.set_pickup_time);
                            return p;
                        })
                        return o;
                    })
                setDateandTime(newDateandTime);


                if (finalData) {

                    newMainData = [
                        ...newSRDetailsFields,
                        ...newDispatchLocationFields,
                        ...newCustomerBillingAddressFields,
                        ...newAdditionalInformationFields,
                        ...newPackageDetailsFields,
                        ...newDateandTime
                    ];
                    var keyValuePairMainData = {};

                    newMainData.map(o => {
                        if (o.key == "Schedule_Pickup_time") {
                            o.value.map(p => { keyValuePairMainData[p.key] = p.value; })
                        }
                        else if (o.key != null) {
                            keyValuePairMainData[o.key] = o.value;
                        }
                    });
                    setMainData(keyValuePairMainData);
                    console.log(mainData, "mainDataeeee")
                }



            }


        }

        //------------------------------------------------------------------------------------------------
        //--------------------------------------------------------------------------------------------------

        if (finalData) {
            if (mainData && mainData?.Link_Document_Type && mainData?.Link_Document_Type?.label == 'Scrap Orders') {
                console.log("finalData", finalData);
                var newMainData = [];
                var newSRDetailsFields = SRDetailsFields.map(o => {
                    if (o.key == "Reference_Number") o.value = finalData?.reference_id
                    return o;
                })
                setSRDetailsFields(newSRDetailsFields);

                var newselectedProductData = [];
                if (finalData?.scrap_order_lines) {
                    newselectedProductData = finalData?.scrap_order_lines.map(o => {
                        return {
                            sku_id: { id: o.product_details?.id, label: o.product_details?.sku_id },
                            id: o.product_details?.id,
                            product_name: o?.product_details?.product_name,
                            Quantity_Sold: o?.quantity_sold,
                            uom: o.uom.name,
                            Return_Type: { id: o?.return_type?.id, label: o?.return_type?.display_name },
                            lot_Number: o?.product_details?.serial_number,
                           // Return_Location: { id: o?.return_location?.id, label: o?.return_location?.name },
                            Quantity: o?.quantity_returned,
                            selling_price: o?.rate,
                            discount: o?.discount,
                            tax: o?.tax,
                            Amount: o?.amount

                        }
                    });
                }
                console.log(newselectedProductData, "newselectedProductData11")
                setSelectedProductData(newselectedProductData);

                var newPackageDetailsFields = PackageDetailsFields.map(o => {
                    if (o.key == "Package_Length") o.value = finalData?.shipping_details?.package_details?.package_length;
                    if (o.key == "Package_Width") o.value = finalData?.shipping_details?.package_details?.package_width;
                    if (o.key == "Package_Height") o.value = finalData?.shipping_details?.package_details?.package_height;
                    if (o.key == "Vol_Weight") o.value = finalData?.shipping_details?.package_details?.vol_weight;
                    if (o.key == "Package_Weight") o.value = finalData?.shipping_details?.package_details?.package_weight;

                    return o;
                })
                setPackageDetailsFields(newPackageDetailsFields);


                var newDateandTime = DateandTime
                    .map(o => {
                        if (o.key == "Schedule_Scrap_Date") o.value = moment(finalData?.set_pickup_date).format("YYYY-MM-DD");
                        if (o.key == "Schedule_Pickup_time") o.value = o.value.map(p => {
                            if (p.key == "Schedule_Pickup_time_from") p.value = moment(finalData?.set_pickup_time);
                            if (p.key == "Schedule_Pickup_time_to") p.value = moment(finalData?.set_pickup_time);
                            return p;
                        })
                        return o;
                    })
                setDateandTime(newDateandTime);

                if (finalData) {

                    newMainData = [
                        ...newSRDetailsFields,
                        ...newselectedProductData,
                        ...newPackageDetailsFields,
                        ...newDateandTime
                    ];
                    var keyValuePairMainData = {};

                    newMainData.map(o => {
                        if (o.key == "Schedule_Pickup_time") {
                            o.value.map(p => { keyValuePairMainData[p.key] = p.value; })
                        }
                        else if (o.key != null) {
                            keyValuePairMainData[o.key] = o.value;
                        }
                    });
                    setMainData(keyValuePairMainData);
                    console.log(mainData, "mainDataeeee")
                }



            }


        }

        //------------------------------------------------------------------------------------------------
        //-----------------------------------------------------------------------------------------------

        if (finalData) {
            if (mainData && mainData?.Link_Document_Type && mainData?.Link_Document_Type?.label == 'Purchase Returns') {
                console.log("finalData", finalData);
                var newMainData = [];
                var newSRDetailsFields = SRDetailsFields.map(o => {
                    if (o.key == "Reference_Number") o.value = finalData?.reference_number
                    if (o.key == "Expected_Delivery_Date") o.value = moment(finalData?.expected_delivery_date).format("YYYY-MM-DD")
                    return o;
                })
                setSRDetailsFields(newSRDetailsFields);

                var newselectedProductData = [];
                if (finalData?.purchase_return_lines) {
                    newselectedProductData = finalData.purchase_return_lines.map(o => {
                        return {
                            sku_id: { id: o.product_details?.id, label: o.product_details?.sku_id },
                            id: o.product_details?.id,
                            product_name: o.product_details?.product_name,

                            uom: o.uom.name,
                            // lot_Number: o.product_details?.serial_number,
                           // Return_Location: { id: o.return_location?.id, label: o.return_location?.name },
                            Quantity: o.quantity_returned,
                            selling_price: o.rate,
                            discount: o.discount,
                            tax: o.tax,
                            Amount: o.amount

                        }
                    });
                }
                console.log(newselectedProductData, "newselectedProductData11")
                setSelectedProductData(newselectedProductData);



                var newDispatchLocationFields = DispatchLocationFields
                    .map(o => {
                        if (o.key == "ShippingAddress_Receiver_Name") o.value = finalData?.purchase_order?.delivery_address?.contact_person_name
                        if (o.key == "ShippingAddress_Mobile_Number") o.value = finalData?.purchase_order?.delivery_address?.contact_person_number;
                        if (o.key == "ShippingAddress_address_line_1") o.value = finalData?.purchase_order?.delivery_address?.address_line_1;
                        if (o.key == "ShippingAddress_address_line_2") o.value = finalData?.purchase_order?.delivery_address?.address_line_2;
                        if (o.key == "ShippingAddress_address_line_3") o.value = finalData?.purchase_order?.delivery_address?.address_line_3;
                        // if (o.key == "ShippingAddress_Country") o.value = { id: finalData?.purchase_order?.delivery_address?.country?.id, label: finalData?.delivery_address?.country?.label }
                        // if (o.key == "ShippingAddress_State") o.value = { id: finalData?.purchase_order?.delivery_address?.state?.id, label: finalData?.delivery_address?.state?.label};
                        if (o.key == "ShippingAddress_District") o.value = finalData?.purchase_order?.delivery_address?.address_line_3;
                        if (o.key == "ShippingAddress_Zipcode") o.value = finalData?.purchase_order?.delivery_address?.pin_code;
                        return o;
                        //data.purchase_order.delivery_address.address_line_1
                    })

                setDispatchLocationFields(newDispatchLocationFields);
                var newCustomerBillingAddressFields = CustomerBillingAddressFields
                    .map(o => {
                        if (o.key == "BillingAddress_Receiver_Name") o.value = finalData?.purchase_order?.billing_address?.contact_person_name;
                        if (o.key == "BillingAddress_Mobile_Number") o.value = finalData?.purchase_order?.billing_address?.contact_person_number;
                        if (o.key == "BillingAddress_address_line_1") o.value = finalData?.purchase_order?.billing_address?.address_line_1;
                        if (o.key == "BillingAddress_address_line_2") o.value = finalData?.purchase_order?.billing_address?.address_line_2;
                        if (o.key == "BillingAddress_address_line_3") o.value = finalData?.purchase_order?.billing_address?.address_line_3;
                        // if (o.key == "BillingAddress_Country") o.value = { id: finalData?.purchase_order?.billing_address?.country, label: finalData?.purchase_order?.billing_address?.country }
                        // if (o.key == "BillingAddress_State") o.value = { id: finalData?.purchase_order?.billing_address?.state, label: finalData?.purchase_order?.billing_address?.state };
                        if (o.key == "BillingAddress_District") o.value = finalData?.purchase_order?.billing_address?.address_line_3;
                        if (o.key == "BillingAddress_Zipcode") o.value = finalData?.purchase_order?.billing_address?.pin_code;
                        return o;
                    })
                setCustomerBillingAddressFields(newCustomerBillingAddressFields);

                var newAdditionalInformationFields = AdditionalInformationFields
                    .map(o => {
                        if (o.key == "Additional_Information_Note") o.value = finalData?.additional_information?.notes;
                        if (o.key == "Additional_Information_Terms_Conditions") o.value = finalData?.additional_information?.terms_and_conditions;
                        return o;
                    })
                setAdditionalInformationFields(newAdditionalInformationFields);

                var newPackageDetailsFields = PackageDetailsFields.map(o => {
                    finalData?.purchase_return_lines?.map(x => {

                        if (o.key == "Package_Length") o.value = x.product_template?.package_dimensions?.package_length;
                        if (o.key == "Package_Width") o.value = x.product_template?.package_dimensions?.package_width;
                        if (o.key == "Package_Height") o.value = x.product_template?.package_dimensions?.package_height;
                        if (o.key == "Vol_Weight") o.value = x.product_template?.package_dimensions?.volumetric_weight;
                        if (o.key == "Package_Weight") o.value = x.product_template?.package_dimensions?.package_weight;
                    }
                    )
                    return o;
                })
                setPackageDetailsFields(newPackageDetailsFields);


                var newDateandTime = DateandTime
                    .map(o => {
                        if (o.key == "Schedule_Scrap_Date") o.value = moment(finalData?.set_pickup_date).format("YYYY-MM-DD");
                        if (o.key == "Schedule_Pickup_time") o.value = o.value.map(p => {
                            if (p.key == "Schedule_Pickup_time_from") p.value = moment(finalData?.set_pickup_time);
                            if (p.key == "Schedule_Pickup_time_to") p.value = moment(finalData?.set_pickup_time);
                            return p;
                        })
                        return o;
                    })
                setDateandTime(newDateandTime);


                if (finalData) {

                    newMainData = [
                        ...newSRDetailsFields,
                        ...newDispatchLocationFields,
                        ...newCustomerBillingAddressFields,
                        ...newAdditionalInformationFields,
                        ...newPackageDetailsFields,
                        ...newDateandTime
                    ];
                    var keyValuePairMainData = {};

                    newMainData.map(o => {
                        if (o.key == "Schedule_Pickup_time") {
                            o.value.map(p => { keyValuePairMainData[p.key] = p.value; })
                        }
                        else if (o.key != null) {
                            keyValuePairMainData[o.key] = o.value;
                        }
                    });
                    setMainData(keyValuePairMainData);
                    console.log(mainData, "mainDataeeee")
                }



            }


        }

        //--------------------------------------------------------------------------
        //-----------------------------------------------------------------------------------

        if (finalData) {
            if (mainData && mainData?.Link_Document_Type && mainData?.Link_Document_Type?.label == 'Purchase Orders') {
                console.log("finalData", finalData);
                var newMainData = [];
                var newSRDetailsFields = SRDetailsFields.map(o => {
                    if (o.key == "Reference_Number") o.value = finalData?.reference_number
                    if (o.key == "Expected_Delivery_Date") o.value = moment(finalData?.expected_delivery_date).format("YYYY-MM-DD")
                    return o;
                })
                setSRDetailsFields(newSRDetailsFields);

                var newselectedProductData = [];
                if (finalData?.purchase_order_lines) {
                    newselectedProductData = finalData?.purchase_order_lines.map(o => {
                        return {
                            sku_id: { id: o?.product_details?.id, label: o?.product_details?.sku_id },
                            id: o?.product_details?.id,
                            product_name: o?.product_details?.product_name,
                            Quantity_Sold: o?.quantity_sold,
                            uom: o?.uom?.name,
                            Return_Type: { id: o?.return_type?.id, label: o?.return_type?.display_name },
                            // lot_Number: o?.product_details?.serial_number,
                           // Return_Location: { id: o?.return_location?.id, label: o?.return_location?.name },
                            Quantity: o?.quantity_returned,
                            selling_price: o?.rate,
                            discount: o?.discount,
                            tax: o?.tax,
                            Amount: o?.amount

                        }
                    });
                }
                console.log(newselectedProductData, "newselectedProductData11")
                setSelectedProductData(newselectedProductData);

                var newDispatchLocationFields = DispatchLocationFields
                    .map(o => {
                        if (o.key == "ShippingAddress_Receiver_Name") o.value = finalData?.delivery_address?.contact_person_name
                        if (o.key == "ShippingAddress_Mobile_Number") o.value = finalData?.delivery_address?.contact_person_number;
                        if (o.key == "ShippingAddress_address_line_1") o.value = finalData?.delivery_address?.address_line_1;
                        if (o.key == "ShippingAddress_address_line_2") o.value = finalData?.delivery_address?.address_line_2;
                        if (o.key == "ShippingAddress_address_line_3") o.value = finalData?.delivery_address?.address_line_3;
                        if (o.key == "ShippingAddress_Country") o.value = finalData?.delivery_address?.country;
                        if (o.key == "ShippingAddress_State") o.value = finalData?.delivery_address?.state;
                        if (o.key == "ShippingAddress_District") o.value = finalData?.delivery_address?.address_line_3;
                        if (o.key == "ShippingAddress_Zipcode") o.value = finalData?.delivery_address?.pin_code;
                        return o;
                        //data.delivery_address.address_line_1
                    })


                var newCustomerBillingAddressFields = CustomerBillingAddressFields
                    .map(o => {
                        if (o.key == "BillingAddress_Receiver_Name") o.value = finalData?.billing_address?.contact_person_name;
                        if (o.key == "BillingAddress_Mobile_Number") o.value = finalData?.billing_address?.contact_person_number;
                        if (o.key == "BillingAddress_address_line_1") o.value = finalData?.billing_address?.address_line_1;
                        if (o.key == "BillingAddress_address_line_2") o.value = finalData?.billing_address?.address_line_2;
                        if (o.key == "BillingAddress_address_line_3") o.value = finalData?.billing_address?.address_line_3;
                        if (o.key == "BillingAddress_Country") o.value = finalData?.billing_address?.country;
                        if (o.key == "BillingAddress_State") o.value = finalData?.billing_address?.state;
                        if (o.key == "BillingAddress_District") o.value = finalData?.billing_address?.address_line_3;
                        if (o.key == "BillingAddress_Zipcode") o.value = finalData?.billing_address?.pin_code;
                        return o;
                    })
                setCustomerBillingAddressFields(newCustomerBillingAddressFields);

                var newAdditionalInformationFields = AdditionalInformationFields
                    .map(o => {
                        if (o.key == "Additional_Information_Note") o.value = finalData?.additional_information?.notes;
                        if (o.key == "Additional_Information_Terms_Conditions") o.value = finalData?.additional_information?.terms_and_conditions;
                        return o;
                    })
                setAdditionalInformationFields(newAdditionalInformationFields);

                var newPackageDetailsFields = PackageDetailsFields.map(o => {
                    finalData?.purchase_order_lines?.map(x => {

                        if (o.key == "Package_Length") o.value = x?.product_template?.package_dimensions?.package_length;
                        if (o.key == "Package_Width") o.value = x?.product_template?.package_dimensions?.package_width;
                        if (o.key == "Package_Height") o.value = x?.product_template?.package_dimensions?.package_height;
                        if (o.key == "Vol_Weight") o.value = x?.product_template?.package_dimensions?.volumetric_weight;
                        if (o.key == "Package_Weight") o.value = x?.product_template?.package_dimensions?.package_weight;
                    }
                    )
                    return o;
                })
                setPackageDetailsFields(newPackageDetailsFields);


                var newDateandTime = DateandTime
                    .map(o => {
                        if (o.key == "Schedule_Scrap_Date") o.value = moment(finalData?.set_pickup_date).format("YYYY-MM-DD");
                        if (o.key == "Schedule_Pickup_time") o.value = o.value.map(p => {
                            if (p.key == "Schedule_Pickup_time_from") p.value = moment(finalData?.set_pickup_time);
                            if (p.key == "Schedule_Pickup_time_to") p.value = moment(finalData?.set_pickup_time);
                            return p;
                        })

                        return o;
                    })
                setDateandTime(newDateandTime);


                if (finalData) {

                    newMainData = [
                        ...newSRDetailsFields,
                        ...newDispatchLocationFields,
                        ...newCustomerBillingAddressFields,
                        ...newAdditionalInformationFields,
                        ...newPackageDetailsFields,
                        ...newDateandTime
                    ];
                    var keyValuePairMainData = {};

                    newMainData.map(o => {
                        if (o.key == "Schedule_Pickup_time") {
                            o.value.map(p => { keyValuePairMainData[p.key] = p.value; })
                        }
                        else if (o.key != null) {
                            keyValuePairMainData[o.key] = o.value;
                        }
                    });
                    setMainData(keyValuePairMainData);
                    console.log(mainData, "mainDataeeee")
                }
            }


        }

        //-----------------------------------------------------------------------------
        //------------------------------------------------------------------------------------

        if (finalData) {
            if (mainData && mainData?.Link_Document_Type && mainData?.Link_Document_Type?.label == 'Delivery Orders') {
                console.log("finalData", finalData);
                var newMainData = [];
                var newSRDetailsFields = SRDetailsFields.map(o => {
                    if (o.key == "Reference_Number") o.value = finalData?.delivery_order_details?.reference_id;
                    if (o.key == "Expected_Delivery_Date") o.value = moment(finalData?.delivery_order_details?.expected_shipping_date).format("YYYY-MM-DD")
                    return o;
                })
                setSRDetailsFields(newSRDetailsFields);

                var newselectedProductData = [];
                if (finalData?.delivery_order_lines) {
                    newselectedProductData = finalData?.delivery_order_lines.map(o => {
                        return {
                            sku_id: { id: o?.product_details?.id, label: o?.product_details?.sku_id },
                            id: o?.product_details?.id,
                            product_name: o?.product_details?.product_name,
                            Quantity_Sold: o?.quantity_sold,
                            uom: o?.uom?.name,
                            Return_Type: { id: o?.return_type?.id, label: o?.return_type?.display_name },
                            // lot_Number: o?.product_details?.serial_number,
                           // Return_Location: { id: o?.return_location?.id, label: o?.return_location?.name },
                            Quantity: o?.quantity_returned,
                            selling_price: o?.rate,
                            discount: o?.discount,
                            tax: o?.tax,
                            Amount: o?.amount

                        }
                    });
                }
                console.log(newselectedProductData, "newselectedProductData11")
                setSelectedProductData(newselectedProductData);



                var newDispatchLocationFields = DispatchLocationFields
                    .map(o => {
                        if (o.key == "ShippingAddress_Receiver_Name") o.value = finalData?.delivery_address_details?.contact_person_name
                        if (o.key == "ShippingAddress_Mobile_Number") o.value = finalData?.delivery_address_details?.contact_person_number;
                        if (o.key == "ShippingAddress_Email") o.value = finalData?.delivery_address_details?.email;
                        if (o.key == "ShippingAddress_address_line_1") o.value = finalData?.delivery_address_details?.address_line_1;
                        if (o.key == "ShippingAddress_address_line_2") o.value = finalData?.delivery_address_details?.address_line_2;
                        if (o.key == "ShippingAddress_address_line_3") o.value = finalData?.delivery_address_details?.address_line_3;
                        if (o.key == "ShippingAddress_Country") o.value = finalData?.delivery_address_details?.country;
                        if (o.key == "ShippingAddress_State") o.value = finalData?.delivery_address_details?.state;
                        if (o.key == "ShippingAddress_District") o.value = finalData?.delivery_address_details?.address_line_3;
                        if (o.key == "ShippingAddress_Zipcode") o.value = finalData?.delivery_address_details?.pin_code;
                        return o;
                    })


                var newCustomerBillingAddressFields = CustomerBillingAddressFields
                    .map(o => {
                        if (o.key == "BillingAddress_Receiver_Name") o.value = finalData?.billing_address_details?.contact_person_name;
                        if (o.key == "BillingAddress_Mobile_Number") o.value = finalData?.billing_address_details?.contact_person_number;
                        if (o.key == "BillingAddress_Email") o.value = finalData?.billing_address_details?.email;
                        if (o.key == "BillingAddress_address_line_1") o.value = finalData?.billing_address_details?.address_line_1;
                        if (o.key == "BillingAddress_address_line_2") o.value = finalData?.billing_address_details?.address_line_2;
                        if (o.key == "BillingAddress_address_line_3") o.value = finalData?.billing_address_details?.address_line_3;
                        if (o.key == "BillingAddress_Country") o.value = finalData?.billing_address_details?.country;
                        if (o.key == "BillingAddress_State") o.value = finalData?.billing_address_details?.state;
                        if (o.key == "BillingAddress_District") o.value = finalData?.billing_address_details?.address_line_3;
                        if (o.key == "BillingAddress_Zipcode") o.value = finalData?.billing_address_details?.pin_code;
                        return o;
                    })
                setCustomerBillingAddressFields(newCustomerBillingAddressFields);

                var newAdditionalInformationFields = AdditionalInformationFields
                    .map(o => {
                        if (o.key == "Additional_Information_Note") o.value = finalData?.additional_information?.notes;
                        if (o.key == "Additional_Information_Terms_Conditions") o.value = finalData?.additional_information?.terms_and_condition;
                        return o;
                    })
                setAdditionalInformationFields(newAdditionalInformationFields);

                var newPackageDetailsFields = PackageDetailsFields.map(o => {
                    if (o.key == "Package_Length") o.value = finalData?.shipping_details?.package_details?.package_length;
                    if (o.key == "Package_Width") o.value = finalData?.shipping_details?.package_details?.package_width;
                    if (o.key == "Package_Height") o.value = finalData?.shipping_details?.package_details?.package_height;
                    if (o.key == "Vol_Weight") o.value = finalData?.shipping_details?.package_details?.vol_weight;
                    if (o.key == "Package_Weight") o.value = finalData?.shipping_details?.package_details?.package_weight;

                    return o;
                })
                setPackageDetailsFields(newPackageDetailsFields);




                var newDateandTime = DateandTime
                    .map(o => {
                        if (o.key == "Schedule_Scrap_Date") o.value = moment(finalData?.set_pickup_date).format("YYYY-MM-DD");
                        if (o.key == "Schedule_Pickup_time") o.value = o.value.map(p => {
                            if (p.key == "Schedule_Pickup_time_from") p.value = moment(finalData?.set_pickup_time);
                            if (p.key == "Schedule_Pickup_time_to") p.value = moment(finalData?.set_pickup_time);
                            return p;
                        })



                        return o;
                    })
                setDateandTime(newDateandTime);


                if (finalData) {

                    newMainData = [
                        ...newSRDetailsFields,
                        ...newselectedProductData,
                        ...newDispatchLocationFields,
                        ...newCustomerBillingAddressFields,
                        ...newAdditionalInformationFields,
                        ...newPackageDetailsFields,
                        ...newDateandTime
                    ];
                    var keyValuePairMainData = {};

                    newMainData.map(o => {
                        if (o.key == "Schedule_Pickup_time") {
                            o.value.map(p => { keyValuePairMainData[p.key] = p.value; })
                        }
                        else if (o.key != null) {
                            keyValuePairMainData[o.key] = o.value;
                        }
                    });
                    setMainData(keyValuePairMainData);
                    console.log(mainData, "mainDataeeee")
                }



            }


        }

        //-------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------

        if (finalData) {
            if (mainData && mainData?.Link_Document_Type && mainData?.Link_Document_Type?.label == 'Sales Orders') {
                console.log("finalData", finalData);
                var newMainData = [];
                var newSRDetailsFields = SRDetailsFields.map(o => {
                    if (o.key == "Reference_Number") o.value = finalData?.reference_number;
                    if (o.key == "Expected_Delivery_Date") o.value = moment(finalData?.expected_shipping_date).format("YYYY-MM-DD")
                    return o;
                })
                setSRDetailsFields(newSRDetailsFields);

                var newselectedProductData = [];
                if (finalData?.sales_order_lines) {
                    newselectedProductData = finalData?.sales_order_lines.map(o => {
                        return {
                            sku_id: { id: o?.product_details?.id, label: o?.product_details?.sku_id },
                            id: o?.product_details?.id,
                            product_name: o?.product_details?.product_name,
                            Quantity_Sold: o?.quantity_sold,
                            uom: o?.uom?.name,
                            Return_Type: { id: o?.return_type?.id, label: o?.return_type?.display_name },
                            // lot_Number: o?.product_details?.serial_number,
                         //   Return_Location: { id: o?.return_location?.id, label: o?.return_location?.name },
                            Quantity: o?.quantity_returned,
                            selling_price: o?.rate,
                            discount: o?.discount,
                            tax: o?.tax,
                            Amount: o?.amount

                        }
                    });
                }
                console.log(newselectedProductData, "newselectedProductData11")
                setSelectedProductData(newselectedProductData);



                var newDispatchLocationFields = DispatchLocationFields
                    .map(o => {
                        if (o.key == "ShippingAddress_Receiver_Name") o.value = finalData?.customer_shipping_address?.contact_person_name
                        if (o.key == "ShippingAddress_Mobile_Number") o.value = finalData?.customer_shipping_address?.contact_person_number;
                        if (o.key == "ShippingAddress_Email") o.value = finalData?.customer_shipping_address?.email;
                        if (o.key == "ShippingAddress_address_line_1") o.value = finalData?.customer_shipping_address?.address_line_1;
                        if (o.key == "ShippingAddress_address_line_2") o.value = finalData?.customer_shipping_address?.address_line_2;
                        if (o.key == "ShippingAddress_address_line_3") o.value = finalData?.customer_shipping_address?.address_line_3;
                        //if (o.key == "ShippingAddress_Country") o.value = { id: finalData?.customer_shipping_address?.country?.id, label: finalData?.customer_shipping_address?.country?.label }
                        //if (o.key == "ShippingAddress_State") o.value = { id: finalData?.customer_shipping_address?.state?.id, label: finalData?.customer_shipping_address?.state?.label };
                        if (o.key == "ShippingAddress_District") o.value = finalData?.customer_shipping_address?.address_line_3;
                        if (o.key == "ShippingAddress_Zipcode") o.value = finalData?.customer_shipping_address?.pin_code;
                        return o;
                    })


                var newCustomerBillingAddressFields = CustomerBillingAddressFields
                    .map(o => {
                        if (o.key == "BillingAddress_Receiver_Name") o.value = finalData?.customer_billing_address?.contact_person_name;
                        if (o.key == "BillingAddress_Mobile_Number") o.value = finalData?.customer_billing_address?.contact_person_number;
                        if (o.key == "BillingAddress_Email") o.value = finalData?.customer_billing_address?.email;
                        if (o.key == "BillingAddresBillingAddress_Zipcodes_address_line_1") o.value = finalData?.customer_billing_address?.address_line_1;
                        if (o.key == "BillingAddress_address_line_2") o.value = finalData?.customer_billing_address?.address_line_2;
                        if (o.key == "BillingAddress_address_line_3") o.value = finalData?.customer_billing_address?.address_line_3;
                        //if (o.key == "BillingAddress_Country") o.value = { id: finalData?.customer_billing_address?.country?.id, label: finalData?.billing_address_details?.country?.label }
                        // if (o.key == "BillingAddress_State") o.value = { id: finalData?.customer_billing_address?.state?.id, label: finalData?.billing_address_details?.state?.label };
                        if (o.key == "BillingAddress_District") o.value = finalData?.customer_billing_address?.address_line_3;
                        if (o.key == "") o.value = finalData?.customer_billing_address?.pin_code;
                        return o;
                    })
                setCustomerBillingAddressFields(newCustomerBillingAddressFields);

                var newAdditionalInformationFields = AdditionalInformationFields
                    .map(o => {
                        if (o.key == "Additional_Information_Note") o.value = finalData?.additional_information?.notes;
                        if (o.key == "Additional_Information_Terms_Conditions") o.value = finalData?.additional_information?.terms_and_conditions;
                        return o;
                    })
                setAdditionalInformationFields(newAdditionalInformationFields);


                var newPackageDetailsFields = PackageDetailsFields.map(o => {
                    finalData?.sales_order_lines?.map(x => {

                        if (o.key == "Package_Length") o.value = x?.product_template?.package_dimensions?.package_length;
                        if (o.key == "Package_Width") o.value = x?.product_template?.package_dimensions?.package_width;
                        if (o.key == "Package_Height") o.value = x?.product_template?.package_dimensions?.package_height;
                        if (o.key == "Vol_Weight") o.value = x?.product_template?.package_dimensions?.volumetric_weight;
                        if (o.key == "Package_Weight") o.value = x?.product_template?.package_dimensions?.package_weight;
                    }
                    )
                    return o;
                })
                setPackageDetailsFields(newPackageDetailsFields);

                var newDateandTime = DateandTime
                    .map(o => {
                        if (o.key == "Schedule_Scrap_Date") o.value = moment(finalData?.set_pickup_date).format("YYYY-MM-DD");
                        if (o.key == "Schedule_Pickup_time") o.value = o.value.map(p => {
                            if (p.key == "Schedule_Pickup_time_from") p.value = moment(finalData?.set_pickup_time);
                            if (p.key == "Schedule_Pickup_time_to") p.value = moment(finalData?.set_pickup_time);
                            return p;
                        })



                        return o;
                    })
                setDateandTime(newDateandTime);


                if (finalData) {

                    newMainData = [
                        ...newSRDetailsFields,
                        ...newDispatchLocationFields,
                        ...newPackageDetailsFields,
                        ...newCustomerBillingAddressFields,
                        ...newAdditionalInformationFields,
                        ...newDateandTime
                    ];
                    var keyValuePairMainData = {};

                    newMainData.map(o => {
                        if (o.key == "Schedule_Pickup_time") {
                            o.value.map(p => { keyValuePairMainData[p.key] = p.value; })
                        }
                        else if (o.key != null) {
                            keyValuePairMainData[o.key] = o.value;
                        }
                    });
                    setMainData(keyValuePairMainData);
                    console.log(mainData, "mainDataeeee")
                }



            }


        }



    }, [finalData])



    //------------------------------------------------------------------------
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------------------



    useEffect(() => {
        if (SRData) {
            console.log("SRData", SRData);
            var newMainData = [];
            var newSRDetailsFields = SRDetailsFields.map(o => {
                if (o.key == "Customer_Name") o.value = { id: SRData?.customer_name, label: SRData?.customer_name }
                if (o.key == "Link_Document_Type") o.value = { id :SRData?.source_document_type?.id , label: SRData?.source_document_type?.display_name}
                if (o.key == "Link_Documents") o.value = { id: SRData?.sales_order && SRData.sales_order?.id, label: SRData.sales_order?.sales_order_number }
                if (o.key == "SR_Number") o.value = SRData?.sales_return_number;
                if (o.key == "SR_Currency") o.value = { id: SRData?.currency?.id, label: SRData?.currency?.currency_code }
                if (o.key == "Reference_Number") o.value = SRData?.reference_number
                if (o.key == "Expected_Delivery_Date") o.value = moment(SRData?.expected_delivery_date).format("YYYY-MM-DD")
                if (o.key == "Return_Reason") o.value = { id: SRData?.reason?.id, label: SRData?.reason?.display_name }
                return o;
            })
            setSRDetailsFields(newSRDetailsFields);

            var newselectedProductData = [];
            if (SRData?.sales_return_lines) {
                newselectedProductData = SRData.sales_return_lines.map(o => {
                    return {
                        sku_id: { id: o.product_details?.id, label: o.product_details?.sku_id },
                        id:o.product_details?.id,
                        product_name: o.product_details?.product_name,
                        // price:
                        Quantity_Sold: o.quantity_sold,
                        uom: o.uom.name,
                        Return_Type: { id: o.return_type?.id, label: o.return_type?.display_name },
                        lot_Number: o.product_details?.serial_number,
                        Return_Location: { id: o.return_location?.id, label: o.return_location?.name },
                        Quantity: o.quantity_returned,
                        selling_price: o.rate,
                        discount: o.discount,
                        tax:o.tax,
                        // product_pricing_details.tax_options:o.tax,
                        Amount: o.amount

                    }
                });
            }
            console.log(newselectedProductData, "newselectedProductData11")
            setSelectedProductData(newselectedProductData);



            var newDispatchLocationFields = DispatchLocationFields
                .map(o => {
                    if (o.key == "ShippingAddress_Receiver_Name") o.value = SRData?.customer_pickup_address?.contact_person_name
                    if (o.key == "ShippingAddress_Mobile_Number") o.value = SRData?.customer_pickup_address?.contact_person_number;
                    if (o.key == "ShippingAddress_Email") o.value = SRData?.customer_pickup_address?.email;
                    if (o.key == "ShippingAddress_address_line_1") o.value = SRData?.customer_pickup_address?.address_line_1;
                    if (o.key == "ShippingAddress_address_line_2") o.value = SRData?.customer_pickup_address?.address_line_2;
                    if (o.key == "ShippingAddress_address_line_3") o.value = SRData?.customer_pickup_address?.address_line_3;
                    // if (o.key == "ShippingAddress_Country") o.value = { id: SRData?.customer_pickup_address?.country?.id, label: SRData?.customer_pickup_address?.country?.label }
                    if (o.key == "ShippingAddress_Country") o.value =    SRData?.customer_pickup_address?.country;
                    if (o.key == "ShippingAddress_State") o.value = { id: SRData?.customer_pickup_address?.state?.id, label: SRData?.customer_pickup_address?.state?.label };
                    if (o.key == "ShippingAddress_District") o.value = SRData?.customer_pickup_address?.address_line_3;
                    if (o.key == "ShippingAddress_Zipcode") o.value = SRData?.customer_pickup_address?.pin_code;
                    return o;
                })


            var newCustomerBillingAddressFields = CustomerBillingAddressFields
                .map(o => {
                    if (o.key == "BillingAddress_Receiver_Name") o.value = SRData?.customer_billing_address?.contact_person_name;
                    if (o.key == "BillingAddress_Mobile_Number") o.value = SRData?.customer_billing_address?.contact_person_number;
                    if (o.key == "BillingAddress_Email") o.value = SRData?.customer_billing_address?.email;
                    if (o.key == "BillingAddress_address_line_1") o.value = SRData?.customer_billing_address?.address_line_1;
                    if (o.key == "BillingAddress_address_line_2") o.value = SRData?.customer_billing_address?.address_line_2;
                    if (o.key == "BillingAddress_address_line_3") o.value = SRData?.customer_billing_address?.address_line_3;
                    if (o.key == "BillingAddress_Country") o.value = { id: SRData?.customer_billing_address?.country?.id, label: SRData?.customer_billing_address?.country?.label }
                    if (o.key == "BillingAddress_State") o.value = { id: SRData?.customer_billing_address?.state?.id, label: SRData?.customer_billing_address?.state?.label };
                    if (o.key == "BillingAddress_District") o.value = SRData?.customer_billing_address?.address_line_3;
                    if (o.key == "BillingAddress_Zipcode") o.value = SRData?.customer_billing_address?.pin_code;
                    return o;
                })
            setCustomerBillingAddressFields(newCustomerBillingAddressFields);

            var newAdditionalInformationFields = AdditionalInformationFields
                .map(o => {
                    if (o.key == "Additional_Information_Note") o.value = SRData?.additional_information?.notes;
                    if (o.key == "Additional_Information_Terms_Conditions") o.value = SRData?.additional_information?.terms_and_conditions;

                    return o;
                })
            setAdditionalInformationFields(newAdditionalInformationFields);

            var newPackageDetailsFields = PackageDetailsFields.map(o => {
                if (o.key == "Package_Length") o.value = SRData?.shipping_details?.package_details?.package_length;
                if (o.key == "Package_Width") o.value = SRData?.shipping_details?.package_details?.package_width;
                if (o.key == "Package_Height") o.value = SRData?.shipping_details?.package_details?.package_height;
                if (o.key == "Vol_Weight") o.value = SRData?.shipping_details?.package_details?.vol_weight;
                if (o.key == "Package_Weight") o.value = SRData?.shipping_details?.package_details?.package_weight;


                return o;
            })
            setPackageDetailsFields(newPackageDetailsFields);




            var newDateandTime = DateandTime
                .map(o => {
                    if (o.key == "Schedule_Scrap_Date") o.value = moment(SRData.pickup_date_and_time?.pickup_date).format("YYYY-MM-DD");
                    if (o.key == "Schedule_Pickup_time") o.value = o.value.map(p => {
                        if (p.key == "Schedule_Pickup_time_from") p.value = moment(SRData.pickup_date_and_time?.pickup_from_time);
                        if (p.key == "Schedule_Pickup_time_to") p.value = moment(SRData.pickup_date_and_time?.pickup_to_time);
                        return p;
                    })



                    return o;
                })
            setDateandTime(newDateandTime);


            if (SRData) {

                newMainData = [
                    ...newSRDetailsFields,
                    ...newDispatchLocationFields,
                    ...newCustomerBillingAddressFields,
                    ...newAdditionalInformationFields,
                    ...newPackageDetailsFields,
                    ...newDateandTime
                ];
                var keyValuePairMainData = {};

                newMainData.map(o => {
                    if (o.key == "Schedule_Pickup_time") {
                        o.value.map(p => { keyValuePairMainData[p.key] = p.value; })
                    }
                    else if (o.key != null) {
                        keyValuePairMainData[o.key] = o.value;
                    }
                });
                setMainData(keyValuePairMainData);
                console.log(mainData, "mainDataeeee")
            }



        }
        


    }, [SRData])





    const [DateandTime, setDateandTime] = useState([
        {
            label: "Schedule Scrap Date",
            type: "date",
            key: "Schedule_Scrap_Date",
        },
        {
            label: "Set pickup time",
            type: "time_card",
            key: "Schedule_Pickup_time",
            value: [
                {
                    label: "",
                    type: "time",
                    key: "Schedule_Pickup_time_from",
                    value: ""
                },
                {
                    label: "to",
                    type: "time",
                    key: "Schedule_Pickup_time_to",
                    value: ""
                },
            ],
        },

    ])



    const [SRDetailsFields, setSRDetailsFields] = useState([
        {
            label: "Customer Name",
            type: "select",
            key: "Customer_Name",
            defaultVal: {},
        },
        {
            label: "Link Document Type",
            type: "select",
            key: "Link_Document_Type",
            defaultVal: {},
        },
        {
            label: "Link Documents",
            type: "select",
            key: "Link_Documents",
            defaultVal: {},
        },
        {
            label: "Sales Return Nmber(Draft)",
            type: "input",
            key: "SR_Number",
        },
        {
            label: "SR Currency",
            type: "select",
            key: "SR_Currency",
            defaultVal: {},

        },
        {
            label: "Reference Number",
            type: "input",
            key: "Reference_Number",
        },
        {
            label: "Expected Delivery Date",
            type: "date",
            key: "Expected_Delivery_Date",
        },
        {
            label: "Return Reason",
            type: "select",
            key: "Return_Reason",
            defaultVal: {},
        },


    ]);

    const handelInputChange = (key, value, index = null) => {
        console.log("key", key, "value", value, "index", index)
        if(key == "Schedule_Scrap_Date"){
            var newSchedule_Pickup_date_and_time=DateandTime.map(o=> {if(o.key=="Schedule_Scrap_Date") o.value=value; return o;});        
            setDateandTime(newSchedule_Pickup_date_and_time) 
          }
        if (key == "Schedule_Pickup_time_from" || key == "Schedule_Pickup_time_to") {
            var newSchedule_Pickup_date_and_time = DateandTime.map(o => { if (o.key == "Schedule_Pickup_time") o.value.map(p => { if (p.key == key) p.value = new Date(value); return p; }); return o; });
            console.log(newSchedule_Pickup_date_and_time, "newSchedule_Pickup_date_and_time")
            setDateandTime(newSchedule_Pickup_date_and_time)

            var newMainData = mainData;
            if (key == "Schedule_Pickup_time_from")
                newMainData["Schedule_Pickup_time_from"] = moment(new Date(value)).format("hh:mm A");
            if (key == "Schedule_Pickup_time_to")
                newMainData["Schedule_Pickup_time_to"] = moment(new Date(value)).format("hh:mm A");
            setMainData(newMainData);
        }


        if (index != null) {
            var newSelectedProductData = JSON.parse(JSON.stringify(selectedProductData));



            if (key === 'sku_id') {
                console.log("sku_id")
                var selectVarient = productVariantData?.find(o => o?.id == value?.id);
                newSelectedProductData[index] = selectVarient;
                newSelectedProductData[index][key] = value?.label;
            }
            else if (key === 'uom.name') {
                console.log("uom.name")
                var selectVarient = UOM?.find(o => o?.id == value?.id);
                newSelectedProductData[index].uom = { name: value?.label, id: value?.id };
            }
            else {
                console.log(key)
                if (key.toString().includes('.')) newSelectedProductData[index][key.split(".")[0]][key.split(".")[1]] = value;
                else newSelectedProductData[index][key] = value;
            }

            // calculation
            var grossTotal = ((newSelectedProductData[index].Quantity ?? 0) * (newSelectedProductData[index].selling_price ?? 0)) - (newSelectedProductData[index].discount ?? 0);
            var tax = 0;
            if (newSelectedProductData[index].product_pricing_details && newSelectedProductData[index].product_pricing_details.tax_options && newSelectedProductData[index].product_pricing_details.tax_options > 0) {
                tax = (grossTotal * newSelectedProductData[index]?.product_pricing_details?.tax_options ?? 0) / 100
            }
            else tax = 0;
            var amount = grossTotal + tax;
            newSelectedProductData[index].Amount = amount;
            console.log("Total", newSelectedProductData.map(o => o.Amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
            setSelectedProductData(newSelectedProductData);
            setPaymentDetailsFields({ ...paymentDetailsFields, subTotal: grossTotal, tax: newSelectedProductData[0]?.product_pricing_details?.tax_options ?? 0, total: newSelectedProductData?.map(o => o.Amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0) })
        }
        else {
            if (key == "ShippingAddress_address_line_1" || key == "ShippingAddress_address_line_2" || key == "ShippingAddress_address_line_3" || key == "ShippingAddress_Country" || key == "ShippingAddress_State" || key == "ShippingAddress_District" || key == "ShippingAddress_Zipcode" || key == "ShippingAddress_Receiver_Name" || key == "ShippingAddress_Mobile_Number" || key == "ShippingAddress_Email") {
                let tempStaticField = [...DispatchLocationFields];
                let index = tempStaticField.findIndex(function (field) {
                  return field.key == key;
                });
                tempStaticField[index]["value"] = value;
                setDispatchLocationFields(tempStaticField)
              }
              else if (key == "BillingAddress_address_line_1" || key == "BillingAddress_address_line_2" || key == "BillingAddress_address_line_3" || key == "BillingAddress_Country" || key == "BillingAddress_State" || key == "BillingAddress_District" || key == "BillingAddress_Zipcode" || key == "BillingAddress_Receiver_Name" || key == "BillingAddress_Mobile_Number" || key == "BillingAddress_Email") {
                let tempStaticField = [...CustomerBillingAddressFields];
                let index = tempStaticField.findIndex(function (field) {
                  return field.key == key;
                });
                tempStaticField[index]["value"] = value;
                setCustomerBillingAddressFields(tempStaticField)
              }
              else if (key == "SR_Number" || key == "Reference_Number" ) {
                let tempStaticField = [...SRDetailsFields];
                let index = tempStaticField.findIndex(function (field) {
                  return field.key == key;
                });
                tempStaticField[index]["value"] = value;
                setSRDetailsFields(tempStaticField)
              }
              else if (key == "Additional_Information_Note" || key == "Additional_Information_Terms_Conditions" ) {
                let tempStaticField = [...AdditionalInformationFields];
                let index = tempStaticField.findIndex(function (field) {
                  return field.key == key;
                });
                tempStaticField[index]["value"] = value;
                setAdditionalInformationFields(tempStaticField)
              }
              else if (key == "Package_Length" || key == "Package_Width" ||key == "Package_Height" ||key == "Vol_Weight" ||key == "Package_Weight"  ) {
                let tempStaticField = [...PackageDetailsFields];
                let index = tempStaticField.findIndex(function (field) {
                  return field.key == key;
                });
                tempStaticField[index]["value"] = value;
                setPackageDetailsFields(tempStaticField)
              }

            var newMainData = mainData;

            newMainData[key] = value;

            setMainData(newMainData);
            console.log(mainData, "mainData")
        }

    }



    const handelSelectonChange = (key, value) => {
        console.log("handelSelectonChange", key, value)
        console.log("handelSelectonChange", key, value)
        const tempValue = { ...inputValue, [key]: value };
        setInputvalue(tempValue);
        console.log(value, inputValue, "iiii");
        if (key == "ShippingAddress_Country" || key == "BillingAddress_Country") {
            dispatch(States2(value.id));
          }

          if (key === "Link_Document_Type") {
            dispatch(SearchSourceDocumentData(value?.label));
        }

        if (key === "Link_Documents") {
            console.log("DocumentData", key, value, mainData)
            dispatch(DocumentData(value?.id, mainData?.Link_Document_Type?.label));
        }
        switch (key) {
            case "ShippingAddress_Country":
            case "ShippingAddress_State": {
                setDispatchLocationFields(DispatchLocationFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
                break;
            }
            case "BillingAddress_Country":
            case "BillingAddress_State": {
                setCustomerBillingAddressFields(CustomerBillingAddressFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
                break;
            }
            case "Customer_Name": setSRDetailsFields(SRDetailsFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
                break;

            case "Link_Documents": setSRDetailsFields(SRDetailsFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
                break;

            case "SR_Currency": setSRDetailsFields(SRDetailsFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
                break;

            case "Return_Reason": setSRDetailsFields(SRDetailsFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
                break;
        }


        var newMainData = mainData;
        newMainData[key] = value;
        setMainData(newMainData);


    }


    const handelCheckBoxonChange = (field) => {
        console.log("onCheckboxChanges", field);





    };
    const handelEstimated_Cost_RadionButtononChange = (value) => {
        console.log("value", value)
        // var Estimated_Cost_details = Estimated_Cost.find(o=> o.Estimated_Cost_Select == value); 
        // setPaymentDetailsFields({...paymentDetailsFields, shippingCharge:Estimated_Cost_details.Estimated_Cost_Charges});    
        var newMainData = mainData;
        newMainData["Estimated_Cost_Select"] = value;
        setMainData(newMainData);
        calulate_total();
    };
    function calulate_total() {
        if (selectedProductData && mainData && Estimated_Cost) {
            var val1 = selectedProductData?.map(o => o.Amount).reduce((previousValue, currentValue) => { return previousValue + currentValue });
            var id_Estimated_Cost_Select = mainData.Estimated_Cost_Select;
            var val2 = Estimated_Cost?.find(o => o.Estimated_Cost_Select == id_Estimated_Cost_Select).Estimated_Cost_Charges;
            var subTotal = val1 + val2;
            //console.log("subTotal",subTotal)
            var newtotal = 0;

            if (paymentDetailsFields.Final_Adjustment == "+") {
                newtotal = paymentDetailsFields.adjustment_amount + subTotal;
            }
            else {
                newtotal = paymentDetailsFields.adjustment_amount - subTotal;
            }

            //console.log("newtotal",newtotal)
            setPaymentDetailsFields({ ...paymentDetailsFields, shippingCharge: val2, total: newtotal });
        }
    }


    const setRadioType = (prop, value) => {
        console.log("setRadioType", prop, value)
    };

    useEffect(() => dispatch(getContactList()), []);

    const contactrows = useSelector((state) => state.contactList.ContactList);
    console.log(contactrows, "contactrows")

    useEffect(() => dispatch(getRetunReason()), []);
    const reason = useSelector((state) => state.RetunReasonList.RetunReason);
    console.log(reason, "reason")

    useEffect(() => dispatch(getSalesReturnsCurrency()), []);
    const currenc = useSelector((state) => state.SRCurrency.currency);
    console.log(currenc, "currenc")

    useEffect(() => dispatch(fetchSalesOrder()), []);
    const linkdoc = useSelector((state) => state.SalesOrdersList.salesOrder);
    console.log(linkdoc, "linkdoc")

    const headCells = [
        {
            key: "sku_id",
            label: "Product SKU",
            type: "select",
            data: productVariantData?.map(o => { return { id: o?.id, label: o?.sku_id } })
        },
        {
            key: "product_name",
            label: "Product Name",
            type: "text"
        },
        {
            key: "Quantity_Sold",
            label: "Quantity Sold",
            type: "text"
        },
        {
            key: "uom",
            label: "Unit of Measure",
            type: "select",
            data: UOM?.map(o => { return { id: o?.id, label: o?.name } })
        },
        // {
        //     key: "Quantity_Returned",
        //     label: "Quantity Returned",
        //     type: "text"
        // },
        {
            key: "Return_Type",
            label: "Return Type",
            type: "select",
            // lookup_code
            data: Returntype1.map(o => { return { id: o?.id, label: o?.display_name } })

        },
        {
            key: "lot_Number",
            label: "Lot/Serial Number Returned ",
            type: "text"
        },
        {
            key: "Return_Location",
            label: "Return Location",
            type: "select",
            // lookup_code
            data: Returnlocation.map(o => { return { id: o?.id, label: o?.name } })
        },
        {
            key: "Quantity",
            label: "Quantity Returned",
            type: "number"
        },
        {
            key: "selling_price",
            label: "Rate",
            type: "Number"
        },
        {
            key: "discount",
            label: "Discount",
            type: "Number"
        },
        {
            key: "product_pricing_details.tax_options",
            label: "Tax",
            type: "Number"
        },
        {
            key: "Amount",
            label: "Amount",
            type: "label"
        },

        {
            key: "Action",
            label: "Action",
            type: "view",
            renderView: (item) => (
                <div>
                    <DeleteIcon onClick={() => setSelectedProductData(selectedProductData.filter(o => o?.id != item?.id))} />
                </div>
            )
        }
    ];

    const [step1Data, setStep1Data] = useState({

    });


    const [DispatchLocationFields, setDispatchLocationFields] = useState([
        {
            label: "Receiver Name",
            type: "input",
            key: "ShippingAddress_Receiver_Name",
        },
        {
            label: "Mobile Number",
            type: "input",
            key: "ShippingAddress_Mobile_Number",
        },
        {
            label: "Email",
            type: "input",
            key: "ShippingAddress_Email",
        },
        {
            label: "Address Line 1",
            type: "input",
            key: "ShippingAddress_address_line_1",
        },
        {
            label: "Address Line 2",
            type: "input",
            key: "ShippingAddress_address_line_2",
        },
        {
            label: "Address Line 3",
            type: "input",
            key: "ShippingAddress_address_line_3",
        },
        {
            label: "Country",
            type: "select",
            key: "ShippingAddress_Country",
        },
        {
            label: "State",
            type: "select",
            key: "ShippingAddress_State",
        },
        {
            label: "City/District",
            type: "input",
            key: "ShippingAddress_District",
        },
        {
            label: "Zipcode",
            type: "input",
            key: "ShippingAddress_Zipcode",
        },
    ]);

    useEffect(() => dispatch(estimatedcost()), []);
    const EstimatedCostdata = useSelector((state) => state.estimatedcost?.cost);
    console.log(EstimatedCostdata, "EstimatedCostdata");

    const [CustomerBillingAddressFields, setCustomerBillingAddressFields] = useState([
        {
            label: "Receiver Name",
            type: "input",
            key: "BillingAddress_Receiver_Name"
        },
        {
            label: "Mobile Number",
            type: "input",
            key: "BillingAddress_Mobile_Number",
        },
        {
            label: "Email",
            type: "input",
            key: "BillingAddress_Email",
        },
        {
            label: "Address Line 1",
            type: "input",
            key: "BillingAddress_address_line_1",
        },
        {
            label: "Address Line 2",
            type: "input",
            key: "BillingAddress_address_line_2",
        },
        {
            label: "Address Line 3",
            type: "input",
            key: "BillingAddress_address_line_3",
        },
        {
            label: "Country",
            type: "select",
            key: "BillingAddress_Country",
            defaultVal: {},
        },
        {
            label: "State",
            type: "select",
            key: "BillingAddress_State",
            defaultVal: {},
        },
        {
            label: "City/District",
            type: "input",
            key: "BillingAddress_District",
        },
        {
            label: "Zipcode",
            type: "input",
            key: "BillingAddress_Zipcode",
        },
    ]);

    const history = useNavigate();

    const handleButtonClick = (key) => {
        if (key == "Get Quote") {
            var data = {
                "origin_pincode": mainData.ShippingAddress_Zipcode,
                "destination_pincode": mainData.BillingAddress_Zipcode,
                "package_details": {
                    "package_height": mainData.Package_Height,
                    "package_length": mainData.Package_Length,
                    "package_weight": mainData.Package_Weight,
                    "package_breadth": mainData.Package_Width,
                    "volumetric_weight": mainData.Vol_Weight,
                    "product_value": paymentDetailsFields.total
                },
                "is_cod": true
            }
            dispatch(estimatedcost(data));
            return true;
        }

        if (key == "Cancel") {
            navigate.push("/salesReturns");
            return;
        }

        var Estimated_Cost_details = Estimated_Cost?.find(o => o.Estimated_Cost_Select == mainData.Estimated_Cost_Select);
        console.log(mainData, "mainDatarr");
        console.log(selectedProductData, "selectedProductData")
        const payload = {
            "reference_number": mainData.Reference_Number,
            "sr_date": mainData.Expected_Delivery_Date + "T22:19:32.8080397+05:30",
            "customer_name": mainData.Customer_Name?.label,
            "channel_name": "Eunimart",
            "amount": 123.56,
            "status_id": 132,
            "currency_id": mainData.SR_Currency?.id,
            "expected_delivery_date": mainData.Expected_Delivery_Date + "T22:19:32.8080397+05:30",
            "so_id": Number(mainData.Link_Documents?.id),
            "do_id": 1,

            "customer_pickup_address": {
                pin_code: mainData.ShippingAddress_Zipcode,
                land_mark: mainData.ShippingAddress_address_line_3,
                gst_in_number: "22ASDAS00A1Z5",
                location_name: mainData.ShippingAddress_Receiver_Name,
                address_line_1: mainData.ShippingAddress_address_line_1,
                address_line_2: mainData.ShippingAddress_address_line_2,
                address_line_3: mainData.ShippingAddress_address_line_3,
                contact_person_name: mainData.ShippingAddress_Receiver_Name,
                contact_person_number: mainData.ShippingAddress_Mobile_Number,
                email: mainData.ShippingAddress_Email,
                state: mainData.ShippingAddress_State,
                country: mainData.ShippingAddress_Country
            },
            "customer_billing_address": {
                pin_code: mainData.BillingAddress_Zipcode,
                land_mark: mainData.BillingAddress_address_line_3,
                gst_in_number: "22ASDAS00A1Z5",
                location_name: mainData.BillingAddress_Receiver_Name,
                address_line_1: mainData.BillingAddress_address_line_1,
                address_line_2: mainData.BillingAddress_address_line_2,
                address_line_3: mainData.BillingAddress_address_line_3,
                contact_person_name: mainData.BillingAddress_Receiver_Name,
                contact_person_number: mainData.BillingAddress_Mobile_Number,
                email: mainData.BillingAddress_Email,
                state: mainData.BillingAddress_State?.label ? mainData.BillingAddress_State?.label : mainData.BillingAddress_State,
                country: mainData.BillingAddress_Country?.label ? mainData.BillingAddress_Country?.label :mainData.BillingAddress_Country
            },
            shipping_details: {
                shipping_preference: mainData.shipping_preference,
                package_details: {
                    package_length: Number(mainData.Package_Length),
                    package_height: Number(mainData.Package_Height),
                    package_weight: Number(mainData.Package_Weight),
                    package_width: Number(mainData.Package_Width),
                    vol_weight: Number(mainData.Vol_Weight)
                },

                "estimated_cost": {
                    "shipping_partner": Estimated_Cost_details?.Estimated_Cost_Shipping_Partners,
                    "charges": Estimated_Cost_details?.Estimated_Cost_Charges,
                    "order_delivery_time": Estimated_Cost_details?.Estimated_Cost_Order_Deliver_Time
                },
                "current_balance": 10000
            },

            "sales_return_number": "SR-001",
            "source_document_type_id": 1,
            "source_documents": {
            },
            "status_history": {
            },

           // "reason_id": Number(mainData?.Return_Reason?.id),
           "reason_id": 1,
            "shipping_mode_id": 129,
            "shipping_carrier_id": 2,
            "credit_issued_id": 258,
            "sr_payment_details": {
                "customer_credits": 10.5,
                "use_credits_for_payment": true,
                "sub_total": Number(paymentDetailsFields?.subTotal),
                "tax": Number(paymentDetailsFields?.tax),
                "shipping_charges": Number(paymentDetailsFields?.shippingCharge),
                "total_amount": Number(paymentDetailsFields?.total),
                "adjustments": 100,
            },
            "pickup_date_and_time": {
                "pickup_date": mainData.Schedule_Scrap_Date + "T22:19:32.8080397+05:30",
                "pickup_from_time": mainData.Schedule_Pickup_time_from,
                "pickup_to_time": mainData.Schedule_Pickup_time_to
            },
            "additional_information": {
                "notes": mainData.Additional_Information_Note,
                "terms_and_conditions": mainData.Additional_Information_Terms_Conditions,
                "attachments": {
                    "id": 1,
                    "name": "path"
                }
            },


            sales_return_lines: selectedProductData?.map(o => {
                console.log(o,"123456qwerty")
                return {
                    "product_id": o?.id,
                    "product_template_id": o?.id,
                    "uom_id": o.uom?.id,
                    "inventory_id": 1,
                    "quantity_sold": Number(o.Quantity_Sold),
                    "quantity_returned": Number(o.Quantity_Returned),
                    // "return_type": o.Return_Type?.id,
                    "return_type_id": Number(o.Return_Type?.id),
                    "return_location_id": Number(o.Return_Location?.id),
                    "rate": Number(o.selling_price),
                    "serial_number": String(o.lot_Number),
                    "discount": parseFloat(o.discount),
                    //"tax": parseFloat(o.product_pricing_details?.tax_options),
                    "tax":o.tax ? o.tax : parseFloat(o?.product_pricing_details?.tax_options) ,
                    "amount": Number(o.Amount)
                }
            }),



        }
        dispatch(updateSalesReturns(id,payload));
        history(`/salesReturns`)



    };
    const [AdditionalInformationFields, setAdditionalInformationFields] = useState([
        {
            label: "Note",
            type: "textarea",
            key: "Additional_Information_Note",
            row: 2
        },
        {
            label: "Terms and Conditions",
            type: "textarea",
            key: "Additional_Information_Terms_Conditions",
            row: 2
        },
    ]);
    const [ShippingDetailsFields, setShippingDetailsFields] = useState([
        {
            label: "Shipment Type",
            type: "radio",
            key: "Shipment_Type",
            sub: [{ "label": "Eunimart", "value": 0, "checked": true }, { "label": "Self", "value": 1 }],
        },
    ]);
    const [CreditNote1, setCreditNote1] = useState([
        {
            label: "Credit Method",
            type: "radio",
            key: "Credit_Method",
            sub: [{ "label": "Create credit on reciept", "value": 2, "checked": false }, { "label": "Issue CN directly", "value": 3, "checked": false }],
        },

    ]);

    const handelRadionButtononChange = (prop, value) => {
        console.log("prop, value", prop, value)
        if (prop == "Shipment_Type") {
            var OldState = ShippingDetailsFields?.map(o => { if (o.key == prop) o.sub?.map(p => { p.checked = false; return p; }); return o })
            setShippingDetailsFields(OldState);

            var newState = ShippingDetailsFields?.map(o => { if (o.key == prop) o.sub?.map(p => { if (p.value == value) p.checked = true; return p; }); return o })
            setShippingDetailsFields(newState);

            var newMainData = mainData;
            newMainData["Shipment_Type"] = (value == 0 ? "Eunimart" : "Self");
            setMainData(newMainData);
        }
        // if (prop == "Credit_Method") {
        //     var OldState = CreditNote1?.map(o => { if (o.key == prop) o.sub?.map(p => { p.checked = false; return p; }); return o })
        //     setCreditNote1(OldState);

        //     var newState = ShippingDetailsFields?.map(o => { if (o.key == prop) o.sub?.map(p => { if (p.value == value) p.checked = true; return p; }); return o })
        //     setCreditNote1(newState);

        //     var newMainData = mainData;
        //     newMainData["Credit_Method"] = (value == 0 ? "Credit on reciept" : "CN directly");
        //     setMainData(newMainData);
        // }
    };



    const handelCheckboxShowForCopyField_valueChange = (field) => {
        //console.log("onCheckboxChanges", field);
        setCheckboxShowForCopyField_value(!CheckboxShowForCopyField_value);

        var newCustomerBillingAddressFields = CustomerBillingAddressFields?.map(o => {
            return {
                ...o,
                value: mainData[o.key.replace("Billing", "Shipping")]
            }
        });

        var newMainData = mainData;
        newCustomerBillingAddressFields?.map(o => newMainData[o.key] = o.value);
        setMainData(newMainData);

        setCustomerBillingAddressFields(newCustomerBillingAddressFields);
        //CustomerShippingAddressFields
    }

    const [PackageDetailsFields, setPackageDetailsFields] = useState([
        {
            label: "Package Length",
            type: "input",
            key: "Package_Length",
        },
        {
            label: "Package Width",
            type: "input",
            key: "Package_Width",
        },
        {
            label: "Package Height",
            type: "input",
            key: "Package_Height",
        },
        {
            label: "Vol Weight",
            type: "input",
            key: "Vol_Weight",
        },
        {
            label: "Package Weight",
            type: "input",
            key: "Package_Weight",
        },
    ]);
    const [PackageDetailsFields1, setPackageDetailsFields1] = useState([
        {
            label: "Carrier Name",
            type: "input",
            key: "Carrier_Name",
        },
        {
            label: "AWB Number",
            type: "input",
            key: "AWB_Number",
        }

    ]);

    const [Estimated_Cost, setEstimated_Cost] = useState({});

    const Estimated_Cost_headCells = [
        {
            key: "Estimated_Cost_Shipping_Partners",
            label: "Shipping Partners",
            type: "text",
        },
        {
            key: "Estimated_Cost_Charges",
            label: "Charges",
            type: "text",
        },
        {
            key: "Estimated_Cost_Order_Deliver_Time",
            label: "Order Deliver Time",
            type: "text",
        },
        {
            key: "Estimated_Cost_Select",
            label: "Select",
            type: "radio",
        },
    ];
    useEffect(() => {
        if (EstimatedCostdata?.data) {
            var Shipment_Type = ShippingDetailsFields?.find(o => o.key == "Shipment_Type").sub?.find(o => o.checked)?.label;
            console.log(Shipment_Type, "Shipment_Typeq")

            if (Shipment_Type == "Eunimart" && EstimatedCostdata?.data?.express) {
                console.log(EstimatedCostdata, "EstimatedCostdataqqqqqqqq")
                var newEstimated_Cost = EstimatedCostdata?.data?.express?.map(data => {
                    var dataRaw = {};
                    Estimated_Cost_headCells?.map(tableRaw => {
                        if (tableRaw.key == "Estimated_Cost_Shipping_Partners") {
                            dataRaw["Estimated_Cost_Shipping_Partners"] = data.name;
                        }
                        if (tableRaw.key == "Estimated_Cost_Charges") {
                            dataRaw["Estimated_Cost_Charges"] = data.charges;
                        }
                        if (tableRaw.key == "Estimated_Cost_Order_Deliver_Time") {
                            dataRaw["Estimated_Cost_Order_Deliver_Time"] = data.Order_delivery_time;
                        }
                        if (tableRaw.key == "Estimated_Cost_Select") {
                            dataRaw["Estimated_Cost_Select"] = data.supplier_id;
                        }
                    });
                    return dataRaw;
                });
                setEstimated_Cost(newEstimated_Cost);
            }
            else if (Shipment_Type == "Eunimart") {
                var newEstimated_Cost = EstimatedCostdata.express?.map(data => {
                    var dataRaw = {};
                    Estimated_Cost_headCells?.map(tableRaw => {
                        if (tableRaw.key == "Estimated_Cost_Shipping_Partners") {
                            dataRaw["Estimated_Cost_Shipping_Partners"] = data.name;
                        }
                        if (tableRaw.key == "Estimated_Cost_Charges") {
                            dataRaw["Estimated_Cost_Charges"] = data.charges;
                        }
                        if (tableRaw.key == "Estimated_Cost_Order_Deliver_Time") {
                            dataRaw["Estimated_Cost_Order_Deliver_Time"] = data.Order_delivery_time;
                        }
                        if (tableRaw.key == "Estimated_Cost_Select") {
                            dataRaw["Estimated_Cost_Select"] = data.supplier_id;
                        }
                    });
                    return dataRaw;
                });
                setEstimated_Cost(newEstimated_Cost);
            }
            else {
                setEstimated_Cost(null);
            }

        }
    }, [EstimatedCostdata])








    return (
        <>
            {/* //Enter SR Details */}
            <AddForm header={"Customer Details"} data={SRDetailsFields?.map(field => {
                switch (field.key) {
                    case 'Customer_Name': {
                        field.data = contactrows?.map(curElem => { return { id: curElem?.id, label: curElem.first_name } }); break;
                    }
                    case 'Link_Document_Type': {
                        console.log("Link_Document_Type")
                        field.data = documentType?.map(curElem => {
                            return {
                                id: curElem?.id
                                , label: curElem?.display_name
                            }
                        }); break;
                    }
                    case 'Link_Documents': {

                        if (mainData?.Link_Document_Type?.label == "Purchase Returns") {
                            field.data = SearchSourceDocument?.map(curElem => {
                                return {
                                    id: curElem?.id
                                    , label: curElem.purchase_return_number
                                }
                            });
                        }

                        if (mainData?.Link_Document_Type?.label == "Sales Orders") {
                            console.log(SearchSourceDocument, "SearchSourceDocument")
                            field.data = SearchSourceDocument?.map(curElem => {
                                return {
                                    id: curElem?.id
                                    , label: curElem.sales_order_number
                                }
                            });
                        }

                        if (mainData?.Link_Document_Type?.label == "Purchase Orders") {
                            field.data = SearchSourceDocument?.map(curElem => {
                                return {
                                    id: curElem?.id
                                    , label: curElem.purchase_order_number
                                }
                            });
                        }

                        if (mainData?.Link_Document_Type?.label == "Shipping Orders") {
                            field.data = SearchSourceDocument?.map(curElem => {
                                return {
                                    id: curElem?.id
                                    , label: curElem.shipping_number
                                }
                            });
                        }

                        if (mainData?.Link_Document_Type?.label == "Scrap Orders") {
                            field.data = SearchSourceDocument?.map(curElem => {
                                return {
                                    id: curElem?.id
                                    , label: curElem.scrap_order_no
                                }
                            });
                        }

                        if (mainData?.Link_Document_Type?.label == "Delivery Orders") {
                            field.data = SearchSourceDocument?.map(curElem => {
                                return {
                                    id: curElem?.id
                                    , label: curElem.delivery_order_details?.delivery_order_number
                                }
                            });
                        }

                        break;
                    }
                    case 'SR_Currency': {
                        field.data = currenc?.map(curElem => {
                            return {
                                id: curElem?.id
                                , label: curElem.name
                            }
                        }); break;
                    }
                    case 'Return_Reason': {
                        field.data = reason?.map(curElem => {
                            return {
                                id: curElem?.id
                                , label: curElem.display_name
                            }
                        }); break;
                    }
                }
                return field;
            })}
                handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} />




            {/* //Dispatch Location Details */}
            <AddForm header={"Customer Pickup Address "} data={DispatchLocationFields
                ?.map(field => {
                    switch (field.key) {
                        case 'ShippingAddress_Country': {
                            field.data = Countriesdata?.map(o => { return { id: o?.id, label: o.name } }); break;
                        }
                        case 'ShippingAddress_State': {
                            field.data = states1?.map(o => { return { id: o?.id, label: o.name } }); break;
                        }
                    }
                    return field;
                })
            } handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} />

            {/* //Delivery Location details */}
            <AddForm header={"Customer Billing Address"} data={CustomerBillingAddressFields?.map(field => {
                switch (field.key) {
                    case 'BillingAddress_Country': {
                        field.data = Countriesdata?.map(o => { return { id: o?.id, label: o.name } }); break;
                    }
                    case 'BillingAddress_State': {
                        field.data = states1?.map(o => { return { id: o?.id, label: o.name } }); break;
                    }
                }
                return field;
            })
            } handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} IsCheckboxShowForCopyField={true} CheckboxShowForCopyField_text={"same as shipping address"} CheckboxShowForCopyField_value={CheckboxShowForCopyField_value} handelCheckboxShowForCopyField_valueChange={handelCheckboxShowForCopyField_valueChange} />
            {/* //Product Details */}

            <AddForm_Table headCells={headCells} table_data={selectedProductData} handelInputChange={handelInputChange} header={"Add Products"} renderFooter={() => (<center style={{ marginTop: 10 }}><Link onClick={onAddNewRaw} underline="none">+ Add Product Line</Link></center>)} />



            {/* <CreditNote /> */}
            {/* <CreateShippingDetails step1Data={mainData} setStep1Data={setMainData} /> */}
            <AddForm header={"Credit Details"} data={CreditNote1} handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} handelRadionButtononChange={handelRadionButtononChange} IsCheckboxShowForCopyField={true} CheckboxShowForCopyField_text={"Create Credit Note"} CheckboxShowForCopyField_value={false} handelCheckboxShowForCopyField_valueChange={handelCheckboxShowForCopyField_valueChange} Islabel_priceSpace={true} />

            {/* //Shipping Details */}

            <AddForm header={"Shipping Details"} data={ShippingDetailsFields} handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} handelRadionButtononChange={handelRadionButtononChange} IsCheckboxShowForCopyField={true} CheckboxShowForCopyField_text={"Create Shipping"} CheckboxShowForCopyField_value={false} handelCheckboxShowForCopyField_valueChange={handelCheckboxShowForCopyField_valueChange} Islabel_priceSpace={true} />

            {/* //Package Details */}
            {mainData?.Shipment_Type == "Eunimart" && (
                <>
                    <AddForm header={"Package Details"} data={PackageDetailsFields} handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} handelRadionButtononChange={handelRadionButtononChange} IsCheckboxShowForCopyField={false} CheckboxShowForCopyField_text={"Create Shipping"} CheckboxShowForCopyField_value={false} handelCheckboxShowForCopyField_valueChange={handelCheckboxShowForCopyField_valueChange} Islabel_priceSpace={true} />
                    <RemoteViewBox_Table headCells={Estimated_Cost_headCells} table_data={Estimated_Cost} header={"Estimated Cost"} IsBouttonShow={true} ButtonName={"Get Quote"} handleButtonClick={handleButtonClick} handelEstimated_Cost_RadionButtononChange={handelEstimated_Cost_RadionButtononChange} />
                </>
            )}
            {mainData?.Shipment_Type == "Self" &&
                <AddForm header={"self Details"} data={PackageDetailsFields1} handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} handelRadionButtononChange={handelRadionButtononChange} IsCheckboxShowForCopyField={false} CheckboxShowForCopyField_text={"Create Shipping"} CheckboxShowForCopyField_value={false} handelCheckboxShowForCopyField_valueChange={handelCheckboxShowForCopyField_valueChange} Islabel_priceSpace={true} />
            }
            {mainData?.Shipment_Type == null && (
                <>
                    <AddForm header={"Package Details"} data={PackageDetailsFields} handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} handelRadionButtononChange={handelRadionButtononChange} IsCheckboxShowForCopyField={false} CheckboxShowForCopyField_text={"Create Shipping"} CheckboxShowForCopyField_value={false} handelCheckboxShowForCopyField_valueChange={handelCheckboxShowForCopyField_valueChange} Islabel_priceSpace={true} />
                    <RemoteViewBox_Table headCells={Estimated_Cost_headCells} table_data={Estimated_Cost} header={"Estimated Cost"} IsBouttonShow={true} ButtonName={"Get Quote"} handleButtonClick={handleButtonClick} handelEstimated_Cost_RadionButtononChange={handelEstimated_Cost_RadionButtononChange} />
                </>

            )}

            {/* //Estimated Cost */}
            <AddForm header={"Schedule Pickup Date and Time"} data={DateandTime?.map(field => {

                return field;
            })}
                handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} />
            <AddForm header={"Additional Information"} data={AdditionalInformationFields
            } handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} IsCheckboxShowForCopyField={false} handelCheckboxShowForCopyField_valueChange={handelCheckboxShowForCopyField_valueChange} />

            <AddFormFooter header={"Payment Details"} subtotal={paymentDetailsFields.subTotal} tax={paymentDetailsFields.tax} shippingcharges={paymentDetailsFields.shippingCharge} handelSelectonChange={handelSelectonChange} handelInputChange={handelInputChange} total={paymentDetailsFields.total} />

            <AddFormFooter_Button handleButtonClick={handleButtonClick} />



        </>
    )



}

export default EditSR;

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