import React, { Component } from "react";
import { DatePicker } from 'reactstrap-date-picker';
import moment from 'moment';

export default class MyDatePicker extends Component {
  render() {
    const { value } = this.props;
     
      if (value == null) this.sdate = moment().format('DD-MM-YYYY') 
      else this.sdate = value
    
    return (
      <div>
        <DatePicker 
        dateFormat = "DD-MM-YYYY"
        value = { this.sdate }
        />
      </div>
    );
  }
}
