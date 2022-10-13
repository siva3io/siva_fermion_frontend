import React from "react";
import DateRangePicker from "react-daterange-picker";
import Moment from "moment";
import { extendMoment } from "moment-range";
import "react-daterange-picker/dist/css/react-calendar.css";
import "./DatePicker.css";
const moment = extendMoment(Moment);
const stateDefinitions = {
  available: {
    color: null,
    label: "Available",
  },
  enquire: {
    color: "#ffd200",
    label: "Enquire",
  },
  booking: {
    color: "#3BEFDF",
    label: "Booking",
  },
  waiting: {
    color: "#FF4D4D",
    label: "Waiting",
  },
  registration: {
    color: "#B0B0F7",
    label: "Registration",
  },
  delivery: {
    color: "#EFAD9F",
    label: "Delivery",
  },
  testing: {
    color: "#66ff66",
    label: "Testing",
  },
  upgrade: {
    color: "#BB6FCD",
    label: "Upgrade",
  },
  trip: {
    color: "#5066F2",
    label: "Trip",
  },
  renovation: {
    color: "#F3B230",
    label: "Renovation",
  },
  cleaning: {
    color: "#ff4d4d",
    label: "Cleaning",
  },
  carSale: {
    color: "#8bd2da",
    label: "Car Sale",
  },
  newCar: {
    color: "#40bf80",
    label: "New Car",
  },
  unavailable: {
    // selectable: false,
    color: "#ff80ff",
    label: "Unavailable",
  },
};
const dateRanges = [
  {
    state: "enquire",
    range: moment.range(moment("2019-10-01"), moment("2019-10-31")),
  },
  {
    state: "unavailable",
    range: moment.range(moment("2019-11-01"), moment("2019-11-30")),
  },
  {
    state: "booking",
    range: moment.range(moment("2019-12-01"), moment("2019-12-31")),
  },
  {
    state: "waiting",
    range: moment.range(moment("2020-01-01"), moment("2020-01-31")),
  },
  {
    state: "registration",
    range: moment.range(moment("2020-02-01"), moment("2020-02-29")),
  },
  {
    state: "delivery",
    range: moment.range(moment("2020-03-01"), moment("2020-03-31")),
  },
  {
    state: "testing",
    range: moment.range(moment("2020-04-01"), moment("2020-04-30")),
  },
  {
    state: "upgrade",
    range: moment.range(moment("2020-05-01"), moment("2020-05-31")),
  },
  {
    state: "trip",
    range: moment.range(moment("2020-06-01"), moment("2020-06-30")),
  },
  {
    state: "renovation",
    range: moment.range(moment("2020-07-01"), moment("2020-07-31")),
  },
  {
    state: "cleaning",
    range: moment.range(moment("2020-08-01"), moment("2020-08-31")),
  },
  {
    state: "carSale",
    range: moment.range(moment("2020-09-01"), moment("2020-09-30")),
  },
  {
    state: "newCar",
    range: moment.range(moment("2020-10-01"), moment("2020-10-30")),
  },
];
export default class DatePicker extends React.Component {
  state = {
    dates: null,
    value: "",
    states: "",
    setYear: new Date().getFullYear(),
    setMonth: new Date().getMonth(),
    date: new Date(),
    start: "",
    end: "",
    showNewMonth: true,
  };
  dateRangePickerSelect = (range, states, dates, start, end, value) => {
    this.setState({ dates });
    this.setState({
      value: range,
      states: states,
    });
    let selectedStartDate = this.state.value.start.format("YYYY-MM-DD");
    let selectedEndDate = this.state.value.end.format("YYYY-MM-DD");

    this.setState({
      start: selectedStartDate,
      end: selectedEndDate,
    });
    if (selectedStartDate && selectedEndDate) {
      this.props.setDate({ selectedStartDate, selectedEndDate });
    }
  };
  displaySelectedDates = () => {
    return (
      <div className="text-center">
        <div className="d-inline-block text-bold color-blue">
          <p>
            Selected Start Date: <input value={this.state.start} readOnly />{" "}
          </p>
        </div>
        <div className="d-inline-block text-bold color-blue">
          <p>
            Selected End Date: <input value={this.state.end} readOnly />{" "}
          </p>
        </div>
      </div>
    );
  };
  componentDidUpdate(_props, _state) {
    if (this.state.setMonth !== _state.setMonth) {
      this.setState({ showNewMonth: false }, () =>
        this.setState({ showNewMonth: true })
      );
    }
  }
  smallCalenderChange = (date) => {
    this.setState({ date });
    let newD = new Date(date);
    this.setState({
      setMonth: newD.getMonth(),
      setYear: newD.getFullYear(),
    });
  };
  render() {
    let initialYear = this.state.setYear;
    let initialMonths = this.state.setMonth;
    // let noOfMonths = 12;
    // let smallCalenderMinDate = new Date();
    // let smallCalenderMaxDate = new Date(
    //   new Date().setFullYear(new Date().getFullYear() + 1)
    // );
    new Date().setDate(new Date().getDate() - 1);
    let minimumDate = this.state.date;
    let maximumDate = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    );
    new Date().setDate(new Date().getDate() - 1);

    return (
      <>
        {/* <Calendar
          onChange={this.smallCalenderChange}
          value={this.state.date}
          minDate={smallCalenderMinDate}
          maxDate={smallCalenderMaxDate}
        /> */}
        {/* <div>{this.displaySelectedDates()}</div> */}
        {this.state.showNewMonth && (
          <DateRangePicker
            selectionType="range"
            stateDefinitions={stateDefinitions}
            dateStates={dateRanges}
            defaultState="available"
            value={this.state.value}
            onSelect={this.dateRangePickerSelect}
            // numberOfCalendars={noOfMonths}
            initialMonth={initialMonths}
            initialYear={initialYear}
            // minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        )}
      </>
    );
  }
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