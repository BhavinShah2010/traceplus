

import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Select } from 'antd';
import { CommonHeading } from '../../common/commonHeading';
import DashboardLanguage from '../../components/dashboardLanguage';
import '../style/manpowerManagement.scss'
import { mediumRiskIcon } from '../../common/images';
import CommonDatePicker from '../../common/commonDatePicker';

const { Option } = Select;


function ManPowerMangementList(props) {

    const [selectedDate, updateSelectedDate] = useState(new Date())

    function goToEmployeeList() {
        props.history.push('/manpower-management/employee-list')
    }

    function handleDateSelect(date) {
        updateSelectedDate(date)
    }

    return (
        <div className="manpowerManagementMainDiv">
            <Container>
                <Row>
                    <Col lg={6} >
                        <CommonHeading title="Dashboard" />
                    </Col>
                    <Col lg={6} className="text-right">
                        {/* <div className="dashboardLanguageMainDiv">
                            <DashboardLanguage />
                        </div> */}

                        <div className="siteHeadingDatePickerDiv" style={{ width: '20%' }}>
                            <CommonDatePicker
                                selectedDate={selectedDate}
                                handleSelectDate={handleDateSelect}
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="text-right m-t">
                    <Col lg={12}>
                        <div className="viewAllEmployeesButton" onClick={goToEmployeeList}>View All Employees</div>
                    </Col>
                </Row>

                <Row className="m-t-lg">
                    <Col lg={4}>
                        <div className="populationRiskMainDiv">
                            <div className="font-bold text-white titleText">Overall <br /> Population Risk Index</div>

                            <Row className="m-t-lg">
                                <Col lg={6} className="b-r">
                                    <span className="font-bold text-white numberText">59</span>
                                    <div className="percentageDiv m-l"> &#8593; 10</div>
                                </Col>
                                <Col lg={6}>
                                    <span className="font-bold text-white lowText">Low</span>

                                    <span className="text-white m-l-sm">Risk Level</span>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    <Col lg={4}>
                        <div className="attendanceTrendMainDiv">
                            <h5 className="font-bold ">Attendance Trend</h5>
                            <div className="dateText">As of 15th May 2021</div>
                            <div className="yesterdayPresentMainDiv text-center text-white">
                                <div>Yesterday</div>
                                <div className="valueDiv font-bold">5</div>
                                <div>Present</div>
                            </div>

                            <div className="m-t-md">
                                <Select defaultValue="dayView" >
                                    <Option value="dayView">Day View</Option>
                                </Select>
                            </div>

                            <div className="m-t-lg m-b-lg">
                                <h3>Chart</h3>
                            </div>
                        </div>
                    </Col>

                    <Col lg={4}>
                        <div className="teamsMainDiv">
                            <h4 className="font-bold">Teams</h4>
                            <div className="allOrPinnedMainDiv">
                                <div className="eachDiv active"> All
                                <div className="m-l-sm badgeBox activeBadge">
                                        <span>04</span>
                                    </div>
                                </div>
                            </div>

                            <Row className="m-t-lg teamListDiv">
                                <Col lg={6} className="m-b">
                                    <img src={mediumRiskIcon} />
                                    <span className="font-bold">HR Team</span>
                                </Col>

                                <Col lg={6} className="m-b">
                                    <img src={mediumRiskIcon} />
                                    <span className="font-bold">Sales Team</span>
                                </Col>

                                <Col lg={6} className="m-b">
                                    <img src={mediumRiskIcon} />
                                    <span className="font-bold">Eng. Team</span>
                                </Col>

                                <Col lg={6} className="m-b">
                                    <img src={mediumRiskIcon} />
                                    <span className="font-bold">HR Team</span>
                                </Col>


                            </Row>
                        </div>
                    </Col>
                </Row>


            </Container>

        </div>
    )
}

export default ManPowerMangementList