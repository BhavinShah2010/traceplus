import React from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { moment } from 'moment';

import calenderIcon from '../assets/traceplusImages/calendar_icon.svg'


function CommonDatePicker(props) {

    function handleDateSelect(date) {
        props.handleSelectDate(date)
    }

    return (
        <React.Fragment>
            {
                props.hideIcon ? '' : <img src={calenderIcon} />
            }
            
            <DatePicker
                selected={props.selectedDate}
                onChange={date => handleDateSelect(date)}
                dateFormat={'MMM dd'}
                isClearable={false}
                maxDate={new Date()}
                placeholderText={'Select Date'}
                

            />
        </React.Fragment>
    )
}

export default CommonDatePicker