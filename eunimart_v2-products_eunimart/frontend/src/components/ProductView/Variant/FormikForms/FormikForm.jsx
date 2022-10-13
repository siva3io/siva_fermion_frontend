import React, { Component } from "react";
import "./FormikForm.css";
import ShippingPartnersTable from "../../../common/Table/ShippingPartnersTable";
import CommonTable from "./CommonTable/CommonTable";
import ProductTable from "../ProductTable/ProductTable";

import { withFormik, Form, Field } from "formik";

//charts import
import InventoryCharts from "./InventoryCharts/InventoryChartsMain";

const form_id = "form_id";

class MaintenanceForm extends Component {
  editOnClick = (event) => {
    event.preventDefault();
    const data = !this?.props?.status?.edit;
    this.props.setStatus({
      edit: data,
    });
  };

  cancelOnClick = (event) => {
    event.preventDefault();
    this.props.resetForm();
    this.props.setStatus({
      edit: false,
    });
  };

  _renderAction = () => {
    return (
      <React.Fragment>
        <div className="form-statusbar">
          {this?.props?.status?.edit ? (
            <React.Fragment>
              <button className="actionButton" type="submit" form={form_id}>
                Save
              </button>
              <button
                className="cancelButton"
                onClick={this.cancelOnClick}
                style={{ marginLeft: "8px" }}
              >
                Cancel
              </button>
            </React.Fragment>
          ) : (
            // <button className="actionButton" onClick={this.editOnClick}>
            //   Edit Details
            // </button>
            <></>
          )}
        </div>
      </React.Fragment>
    );
  };
  _renderFormView = () => {
    return (
      <React.Fragment>
        {this.props.fields &&
          Object.entries(this.props.fields).map((item) => {
            return (
              <div className="productDetailAttribute">
                <div className="productDetailAttribute_Key">
                  <label>{item[0]}</label>
                </div>
                <div className="productDetailAttribute_value">
                  {this?.props?.status?.edit ? (
                    <Field type="text" name={item[0]} placeholder={item[0]} />
                  ) : (
                    <label>{item[1]}</label>
                  )}
                </div>
              </div>
            );
          })}
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="cardBlock">
          <div className="cardTitle">{this.props.cardTitle}</div>
          {this._renderAction()}
        </div>
        <div>
          {this.props.MAP && (
            <div>
              <img
                src="https://media.istockphoto.com/vectors/city-map-navigation-gps-navigator-distance-point-marker-icon-top-view-vector-id1151971345"
                alt="mapimage"
                width="400px"
              ></img>
            </div>
          )}

          {this.props.TABLE_DUMMY_DATA_SHIPPING && (
            <ShippingPartnersTable
              dataHeader={this.props.TABLE_DUMMY_DATA_SHIPPING.header}
              data={this.props.TABLE_DUMMY_DATA_SHIPPING.data}
            />
          )}
          {this.props.TABLE_DUMMY_DATA_VENDOR && (
            <CommonTable
              heading={this.props.TABLE_DUMMY_DATA_VENDOR.header}
              detail={this.props.TABLE_DUMMY_DATA_VENDOR.data}
            />
          )}
          {this.props.PRODUCT_INVENTORY_DATA && (
            <ProductTable inventory_data={this.props.PRODUCT_INVENTORY_DATA} />
          )}

          {this.props.fields && (
            <Form id={form_id} className="productVarientForm">
              {this._renderFormView()}
            </Form>
          )}
          {this.props.cardTitle === "Forecast" ? <InventoryCharts /> : <></>}
        </div>

        {/* <h4>Current value</h4>
        <div>
          <pre>
            <code>{JSON.stringify(this.props.fields, null, 2)}</code>
          </pre>
        </div> */}
      </React.Fragment>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToStatus: (props) => {
    return {
      edit: props?.edit || false,
    };
  },
  mapPropsToValues: (props) => {
    return props.fields;
  },
  enableReinitialize: true,
  handleSubmit: (values, { props, ...actions }) => {
    props.updateFields(values);
    actions.setStatus({
      edit: false,
    });
  },
})(MaintenanceForm);

export default FormikForm;


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