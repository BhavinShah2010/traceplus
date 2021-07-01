import React from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { moment } from 'moment';
import { connect } from 'react-redux'
import { setSelectedDate } from '../dashboard/actionMethods/actionMethods'
import calenderIcon from '../assets/traceplusImages/calendar_icon.svg'


function CommonDatePicker(props) {

    function handleDateSelect(date) {
        props.setSelectedDate(date)
        props.handleSelectDate(date)
    }

    return (
        <React.Fragment>
            {
                props.hideIcon ? '' : <img src={calenderIcon} />
            }
            
            <DatePicker
                selected={props.date}
                onChange={date => handleDateSelect(date)}
                dateFormat={'MMM dd'}
                isClearable={false}
                maxDate={new Date()}
                placeholderText={'Select Date'}
                

            />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    date: state.dashboard.selectedDate
})

export default connect(mapStateToProps, { setSelectedDate })(CommonDatePicker)