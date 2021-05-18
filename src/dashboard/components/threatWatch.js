import React from 'react'
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { downThumbIcon, dashboardPeopleImage, green, greenThumbIcon } from '../../common/images';

import dropdownIcon from '../../assets/images/down-arrow.png'
import DatePicker from "react-datepicker";

function ThreatWatch(props) {

    function handleOnChangeContactRankValue(event) {
        props.handleChangeValue(event.target.value)
    }

    return (
        <div className={'threatWatchMainDiv ' + (props.threatWatchColor && props.threatWatchColor == 'green' ? ' greenGradienColor' : ' redGradientColor')} >
            <Row>
                <Col lg={3}>
                    <div className="threatWatchTextDiv">
                        <div className="title">Threat Watch</div>
                        <div className="subTitle">As of {moment(props.selectedDate).format('Do MMM YYYY')}</div>

                        <div className="workSpaceStripeDiv">
                            Hey, your Workspace is
                                {props.threatWatchColor && props.threatWatchColor == 'green' ? ' ' : ' not '}
                            Safe !

                            <div className={'thumbIconDiv ' + (props.threatWatchColor && props.threatWatchColor == 'green' ? ' greenBorderColor' : ' redBorderColor')}>
                                <img src={props.threatWatchColor && props.threatWatchColor == 'green' ? greenThumbIcon : downThumbIcon} />
                            </div>
                        </div>
                    </div>
                </Col>

                <Col lg={6}>
                    <div className="threatWatchAnalyticsMainDiv">
                        <div className="eachColumnDiv contaminatedMainDiv">

                            <div className="contaminatedDetails">
                                <div className="titleText font-bold">Contaminated</div>

                                <div className="eachRecordDiv">
                                    <div className="font-bold countDiv">{props.contaminatedEmployeeCount}</div>
                                    <div className="labelDiv">Employees</div>
                                </div>
                            </div>

                            <div className="contaminatedDetails">
                                <div className="titleText font-bold">At Risk</div>
                                <div className="eachRecordDiv">
                                    <div className="font-bold countDiv">{props.atRiskCount}</div>
                                    <div className="labelDiv">Employees</div>
                                </div>

                            </div>
                        </div>
                        <div className="eachColumnDiv contactRankStartDateEndDateMainDiv">
                            <Row>
                                <Col lg={12}>
                                    <div className="contactRankText m-t">Contact Rank</div>
                                    <div className="contactRankSelectDropdownDiv">
                                        <div className="dropdownIconDiv">
                                            <img src={dropdownIcon} />
                                        </div>
                                        <select onChange={handleOnChangeContactRankValue}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                        </select>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="m-t-xs">
                                <Col lg={6} className="p-r-0">
                                    <div className="contactRankText">Start Date</div>
                                    <div className="startDateEndDateMainDiv">
                                        <DatePicker
                                            selected={props.startDate}
                                            onChange={date => props.handleSelectStartDate(date)}
                                            dateFormat={'MMM dd'}
                                            isClearable={false} />
                                        <div className="dropdownIconDiv">
                                            <img src={dropdownIcon} />
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={6} className="p-l-0">
                                    <div className="contactRankText">End Date</div>
                                    <div className="startDateEndDateMainDiv">
                                        <DatePicker
                                            selected={props.endDate}
                                            onChange={date => props.handleSelectEndDate(date)}
                                            dateFormat={'MMM dd'}
                                            isClearable={false} />
                                        <div className="dropdownIconDiv">
                                            <img src={dropdownIcon} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                    </div>
                </Col>

                <Col lg={3}>
                    <div className="dashboardPeopleImageMaiDiv">
                        <img src={dashboardPeopleImage} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ThreatWatch