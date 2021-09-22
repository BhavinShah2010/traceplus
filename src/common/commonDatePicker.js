import React from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import calenderIcon from '../assets/traceplusImages/calendar_icon.svg'


function CommonDatePicker(props) {

    let date = localStorage.getItem('selectedDate') ? new Date(localStorage.getItem('selectedDate')) : new Date()
    
    function handleDateSelect(date) {
        localStorage.setItem('selectedDate', date)
        props.handleSelectDate(date)
    }

    return (
        <React.Fragment>
            {
                props.hideIcon ? '' : <img src={calenderIcon} />
            }
            
            <DatePicker
                selected={date}
                onChange={d => handleDateSelect(d)}
                dateFormat={'MMM dd'}
                isClearable={false}
                maxDate={new Date()}
                minDate={moment().subtract(29, 'days').toDate()}
                placeholderText={'Select Date'}
            />
        </React.Fragment>
    )
}

export default (CommonDatePicker)