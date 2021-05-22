import React, { useState, useEffect } from 'react'

import { Container, Row, Col } from 'react-bootstrap';

import { Switch } from 'antd';

import moment from 'moment'

import '../../../siteManagement/styles/siteManagement.scss'
import '../../style/manpowerManagement.scss'

import { getEmployeeDetails, getEmployeeIndex } from '../../actionMethods/actionMethods';
import { emailIcon, empIDIcon, batteryIcon } from '../../../common/images';

import spinnerLoader from '../../../assets/images/Spinner Loader.gif'
import CommonDatePicker from '../../../common/commonDatePicker';
import { getTranslatedText } from '../../../common/utilities';

function EmployeeDetails(props) {

    const [employeeDetails, updateEmployeeDetails] = useState('')
    const [employeeID, updateEmployeeID] = useState('')


    const [infectedFlag, updateInfectedFlag] = useState(false)

    const [employeeIndexData, updateEmployeeIndexData] = useState('')

    const [isLoading, updateIsLoading] = useState(true)

    const [selectedDate, updateSelectedDate] = useState(new Date())


    useEffect(() => {

        let idVal = props.match.params.id.replace(":", "")


        if (idVal) {

            updateEmployeeID(idVal)

            let requestBody = {}
            requestBody.date = getDateFormat(selectedDate)
            requestBody.emp_id = idVal

            getEmployeeDetails(requestBody).then(res => {

                if (res && res.data) {
                    updateEmployeeDetails(res.data)
                }
            })

            getEmployeeIndex(requestBody).then(res => {
                if (res && res.data) {
                    updateEmployeeIndexData(res.data)
                }
            })

        }

    }, []);


    function getDateFormat(date) {
        return moment(date).format('YYYY-MM-DD')
    }


    function handleManpowerManagementList() {
        props.history.push('/manpower-management')
    }

    function handleEmployeeList(params) {
        props.history.push('/manpower-management/employee-list')
    }

    function handleChangeInfected(flag) {
        updateInfectedFlag(flag)
    }

    function getBackgroundColorBasedOnRisk(riskType) {
        let risk = ''

        switch (riskType) {
            case 'Low':
                risk = 'lowIndexGradientColor'
                break;

            case 'High':
                risk = 'highIndexGradientColor'
                break;

            case 'Medium':
                risk = 'mediumIndexGradientColor'
                break;



            default:
                break;
        }

        return risk
    }

    function handleDateSelect(date) {
        updateSelectedDate(date)

        let requestBody = {}
        requestBody.date = getDateFormat(date)
        requestBody.emp_id = employeeID

        getEmployeeDetails(requestBody).then(res => {

            if (res && res.data) {
                updateEmployeeDetails(res.data)
            }
        })

        getEmployeeIndex(requestBody).then(res => {
            if (res && res.data) {
                updateEmployeeIndexData(res.data)
            }
        })

    }


    if (employeeDetails && employeeIndexData) {

        return (
            <div className="manpowerManagementMainDiv siteViewMainDiv ">
                <div className="employeeDetailsMainDiv">
                    <Container>
                        <Row>
                            <Col lg={8}>
                                <div className="siteViewHeaderDiv">
                                    <span className="smallHeader" onClick={handleManpowerManagementList}>{getTranslatedText('Manpower Management')}</span>
                                    <span className="breadCrumbArrow"> > </span>
                                    <span className="smallHeader" onClick={handleEmployeeList}>{getTranslatedText('Employee Listing')}</span>
                                    <span className="breadCrumbArrow"> > </span>
                                    <span className="mediumHeader">{getTranslatedText('Employee View')}</span>
                                </div>
                            </Col>

                            <Col lg={4} className="text-right">
                                <div className="siteHeadingDatePickerDiv" style={{ width: '30%' }}>
                                    <CommonDatePicker
                                        selectedDate={selectedDate}
                                        handleSelectDate={handleDateSelect}
                                    />
                                </div>
                            </Col>
                        </Row>

                        {
                            employeeDetails ?
                                <Row className="m-t">
                                    <Col lg={4}>
                                        <div className="siteViewDetailsLeftSideDiv">
                                            <div className="headerNameDiv">{employeeDetails.emp_name}</div>
                                            <div className="subHeaderDiv">{employeeDetails.department}</div>
                                            <div className="subHeaderDiv m-t">
                                                <img src={emailIcon} /> &nbsp;
                                                 {employeeDetails.email}
                                            </div>
                                            <div className="subHeaderDiv">
                                                <img src={empIDIcon} /> &nbsp;
                                                 {employeeDetails.emp_serial}
                                            </div>

                                            <div className="batteryMainDiv m-t-lg">
                                                <img src={batteryIcon} /> &nbsp;
                                                {employeeDetails.tag_battery}&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span>Registered Device : </span>
                                                {employeeDetails.tag_id}
                                            </div>

                                            <h6 className="text-white font-bold m-t-md"> History of Infection</h6>
                                            <div className="historyOfInfectionDiv m-t">
                                                <div className="infectedText"> This Employee was {employeeDetails.infected == 'No' ? ' Not' : ''} infected previously </div>
                                                <Row className="m-t">
                                                    <Col lg={7}>
                                                        <span>Mark as Infected</span>
                                                    </Col>
                                                    <Col lg={2} className="text-right p-r-0">
                                                        <span className="text-white">{infectedFlag ? 'Yes' : 'No'}</span>

                                                    </Col>
                                                    <Col lg={3} className="text-right ">
                                                        <Switch checked={infectedFlag} onChange={handleChangeInfected} />
                                                    </Col>
                                                </Row>

                                                {
                                                    infectedFlag ?

                                                        <Row className="m-t">
                                                            <Col lg={8}>
                                                                <span>Tested Positive On</span>
                                                            </Col>
                                                            <Col lg={4} className="text-right">

                                                            </Col>
                                                        </Row> : ''
                                                }
                                            </div>

                                            <div className="historyOfInfectionDiv m-t">
                                                <h6 className=" text-white"> Employee Attendance </h6>
                                                <div className="text-white">As of 18th May 2021</div>

                                                <div className="attendanceDaysMainDiv">
                                                    <span className="noOfDays font-bold">{employeeDetails.emp_attendance.days_present}</span> &nbsp;
                                                    <span className="daysText">Days Present this month</span>
                                                </div>
                                                <div className="attendancePercentageRoundDiv">
                                                    <div className="percentageText ">
                                                        <span className="font-bold">{employeeDetails.emp_attendance.attendance_percentage} %</span>
                                                        <div className="thisMonthText">This Month</div>
                                                    </div>
                                                </div>
                                                {/* <div className="percentageBorderDiv"></div> */}
                                            </div>
                                        </div>
                                    </Col>

                                    <Col lg={8}>
                                        <div className="indexMainDiv">
                                            <Row>
                                                <Col lg={4}>
                                                    <div className={'eachIndexDiv ' + (getBackgroundColorBasedOnRisk(employeeIndexData.pri_level))}>
                                                        <h6 className="font-bold ">{getTranslatedText('Population risk index')}</h6>
                                                        <br />
                                                        <div className="m-t-lg font-normal">Risk Level</div>

                                                        <Row>
                                                            <Col lg={5}>
                                                                <h5 className="font-bold">{employeeIndexData.pri_level}</h5>
                                                            </Col>
                                                            <Col lg={7}>
                                                                <div className="riskPercentageMainDiv">
                                                                    <div className="riskPercentagenNumber font-bold">{employeeIndexData.population_index}</div>
                                                                    <div className="increaseDecreasePercentageDiv font-bold">10%</div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className={'eachIndexDiv ' + (getBackgroundColorBasedOnRisk(employeeIndexData.sri_level))}>
                                                        <h6 className="font-bold ">Spread  Index</h6>
                                                        <br />
                                                        <div className="m-t-lg font-normal">Risk Level</div>

                                                        <Row>
                                                            <Col lg={5}>
                                                                <h5 className="font-bold">{employeeIndexData.sri_level}</h5>
                                                            </Col>
                                                            <Col lg={7}>
                                                                <div className="riskPercentageMainDiv">
                                                                    <div className="riskPercentagenNumber font-bold">{employeeIndexData.spread_index}</div>
                                                                    <div className="increaseDecreasePercentageDiv font-bold">10%</div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className={'eachIndexDiv ' + (getBackgroundColorBasedOnRisk(employeeIndexData.mri_level))}>
                                                        <h6 className="font-bold ">Mobility Index</h6>
                                                        <br />
                                                        <div className="m-t-lg font-normal">Risk Level</div>

                                                        <Row>
                                                            <Col lg={5}>
                                                                <h5 className="font-bold">{employeeIndexData.mri_level}</h5>
                                                            </Col>
                                                            <Col lg={7}>
                                                                <div className="riskPercentageMainDiv">
                                                                    <div className="riskPercentagenNumber font-bold">{employeeIndexData.mobility_index}</div>
                                                                    <div className="increaseDecreasePercentageDiv font-bold">10%</div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="mostInteractedMainDiv m-t-lg">
                                            <Row >
                                                <Col lg={4}>
                                                    <h5 className="font-bold">Most Interacted with</h5>
                                                </Col>
                                                <Col lg={8}></Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row> : ''

                        }

                    </Container>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="text-center m-t-lg">
                <img src={spinnerLoader} className="m-t-lg" />
            </div>
        )
    }

}

export default EmployeeDetails