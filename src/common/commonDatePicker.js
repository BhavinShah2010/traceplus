import React from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { moment } from 'moment';
import { calenderIcon } from './images';


function CommonDatePicker(props) {

    function handleDateSelect(date) {
        props.handleSelectDate(date)
    }

    return (
        <React.Fragment>
            <img src={calenderIcon} />
            <DatePicker
                selected={props.selectedDate}
                onChange={date => handleDateSelect(date)}
                dateFormat={'MMM dd'}
                isClearable={false}
                

            />
        </React.Fragment>
    )
}

export default CommonDatePicker