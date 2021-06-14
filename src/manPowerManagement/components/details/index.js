import React, { useState, useEffect } from 'react'

import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { Switch } from 'antd';

import moment from 'moment'

import { Scrollbars } from 'react-custom-scrollbars';


import '../../../siteManagement/styles/siteManagement.scss'
import '../../style/manpowerManagement.scss'

import { employeeChart, getEmployeeDetails, getEmployeeIndex } from '../../actionMethods/actionMethods';
import { emailIcon, empIDIcon, batteryIcon, selectedPinkArrowIcon } from '../../../common/images';

import spinnerLoader from '../../../assets/images/Spinner Loader.gif'
import CommonDatePicker from '../../../common/commonDatePicker';
import { getTranslatedText } from '../../../common/utilities';
import AreaChart from '../areaChart'
import { getLanguageTranslation, setSelectedLanguage } from '../../../dashboard/actionMethods/actionMethods';

import downArrowFill from '../../../assets/images/down-arrowFill.png'
import DashboardLanguage from '../../../components/dashboardLanguage';


function EmployeeDetails(props) {

    const [employeeDetails, updateEmployeeDetails] = useState('')
    const [employeeID, updateEmployeeID] = useState('')

    const [selectedLangValue, updateSelectedLangValue] = useState('en')
    const [infectedFlag, updateInfectedFlag] = useState(false)

    const [employeeIndexData, updateEmployeeIndexData] = useState('')

    const [isLoading, updateIsLoading] = useState(true)

    const [selectedDate, updateSelectedDate] = useState(new Date())
    const [chartData, setChartData] = useState({ series: [], categories: [] })
    const [testedPositiveDate, updateTestedPositiveDate] = useState(null)


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

    useEffect(() => {
        if (props.language) {
            updateSelectedLangValue(props.language)
        }
    }, [props.language])

    function changeLanguage(lang) {
        getLanguageTranslation(lang).then(res => {
            if (res && res.status >= 200 && res.status <= 200) {
                localStorage.setItem('languageData', JSON.stringify(res.data))
                localStorage.setItem('selectedLanguage', lang)
                props.setSelectedLanguage(lang)

            }
        })
    }


    function handleTestedPositiveDateSelect(date) {
        updateTestedPositiveDate(date)
    }

    useEffect(() => {
        getChartData()
    }, [selectedDate])

    const getChartData = () => {
        setChartData({ categories: [], series: [] })

        let idVal = props.match.params.id.replace(":", "")
        let date = getDateFormat(selectedDate)
        let obj = {
            start: '2021-03-05',
            end: date,
            emp_id: idVal
        }

        employeeChart(obj).then((res) => {
            let data = res ?.emp_pri
            let categories = []
            let series = []

            if (data && Array.isArray(data)) {
                data.forEach((i) => {
                    let d = moment(i.date).format('DD MMM')
                    categories.push(d)
                    series.push(i.pri)
                })

                setChartData({ categories, series })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

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

    function showEmployeeMonthView(monthView) {

        let arr = []

        for (let index = 0; index < monthView.length; index++) {
            const element = monthView[index];

            for (var month in element) {

                let daysPecent = ((element[month]) / 30) + '%'

                arr.push(
                    <div className="eachAttendanceDiv">
                        <div className="monthDiv">
                            {month}
                        </div>
                        <div className="progressBarDiv">
                            <div className="daysProgressBG" style={{ width: daysPecent }}></div>
                        </div>
                        <div className="daysDiv">{element[month]} days</div>
                    </div>
                )
            }
        }





        return arr
    }

    function showEmployeeList(employeeList) {
        let arr = []

        for (let index = 0; index < employeeList.length; index++) {
            const element = employeeList[index];

            arr.push(
                <React.Fragment>
                    <div className="mostInereractedEmpDiv">{element.person_name}</div>
                </React.Fragment>
            )

        }

        return arr
    }

    function showMostVisitedAreas(mostVisitedAreas) {

        let arr = []

        for (let index = 0; index < mostVisitedAreas.length; index++) {
            const element = mostVisitedAreas[index];

            arr.push(
                <Col lg={4}>
                    <div className="eachMostVisitedAreaDiv">
                        <div className="iconDiv greenGradientBGColor">
                            <img src={empIDIcon} />
                        </div>
                        <div className="areaNameDiv">
                            <h6 className="font-bold">{element.area}</h6>
                            <div>
                                <div className="categoryName">{element.area_category}</div>


                            </div>
                        </div>
                    </div>
                </Col>
            )

        }

        return arr
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
                            <div className="commonLangaugeStyleDiv m-r">
                                <DashboardLanguage
                                    selectedLangValue={selectedLangValue}
                                    changeLanguage={changeLanguage}
                                />
                            </div>
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
                                                            <Col lg={7}>
                                                                <span>Tested Positive On</span>
                                                            </Col>
                                                            <Col lg={5} className="text-right">
                                                                <div className="testedPositiveDatePickerMainDiv">
                                                                    <CommonDatePicker
                                                                        selectedDate={testedPositiveDate}
                                                                        handleSelectDate={handleTestedPositiveDateSelect}
                                                                        hideIcon={true} />
                                                                    <div className="downArrowDiv">
                                                                        <img src={downArrowFill} />
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row> : ''
                                                }
                                            </div>

                                            <div className="historyOfInfectionDiv m-t p-l-0 p-r-0">
                                                <div className="p_0_5rem p-t-0 p-b-0">

                                                    <h6 className=" text-white"> Employee Attendance </h6>


                                                    <div className="text-white">As of {moment(new Date()).format('Do MMM YYYY')}</div>

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

                                                </div>

                                                {
                                                    employeeDetails.emp_attendance.month_view && employeeDetails.emp_attendance.month_view.length ?

                                                        <React.Fragment>

                                                            <div className=" b-b m-t-sm"></div>
                                                            <div className="p_0_5rem p-t-0 p-b-0">
                                                                <div className="empAttendanceMainDiv">
                                                                    <h6 className="font-bold text-white">Month View</h6>

                                                                    {
                                                                        employeeDetails.emp_attendance.month_view && employeeDetails.emp_attendance.month_view.length > 0 ?

                                                                            showEmployeeMonthView(employeeDetails.emp_attendance.month_view) : ''
                                                                    }
                                                                    <div></div>
                                                                </div>
                                                            </div>
                                                        </React.Fragment> : ''
                                                }


                                                {/* <div className="percentageBorderDiv"></div> */}
                                            </div>
                                        </div>
                                    </Col>

                                    <Col lg={8}>
                                        <div className="indexMainDiv">
                                            <Row>
                                                <Col lg={4}>
                                                    <div style={{ height: '165px' }} className={'eachIndexDiv ' + (getBackgroundColorBasedOnRisk(employeeIndexData.pri_level))}>
                                                        <h6 className="font-bold ">{getTranslatedText('Personal risk index')}</h6>
                                                        <br />
                                                        <div className="m-t-lg font-normal">{getTranslatedText('Risk Level')}</div>

                                                        <Row>
                                                            <Col lg={4}>
                                                                <h5 className="font-bold">{employeeIndexData.pri_level}</h5>
                                                            </Col>
                                                            <Col lg={8}>
                                                                <div className="riskPercentageMainDiv">
                                                                    <div className="riskPercentagenNumber font-bold">{employeeIndexData.population_index}</div>
                                                                    <div className="increaseDecreasePercentageDiv font-bold">10%</div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                                <Col lg={4} >
                                                    <div style={{ height: '165px' }} className={'eachIndexDiv ' + (getBackgroundColorBasedOnRisk(employeeIndexData.sri_level))}>
                                                        <h6 className="font-bold ">Spread  Index</h6>
                                                        <br />
                                                        <div className="m-t-lg font-normal">{getTranslatedText('Risk Level')}</div>

                                                        <Row>
                                                            <Col lg={4} >
                                                                <h5 className="font-bold">{employeeIndexData.sri_level}</h5>
                                                            </Col>
                                                            <Col lg={8} className="p-l-0">
                                                                <div className="riskPercentageMainDiv">
                                                                    <div className="riskPercentagenNumber font-bold">{employeeIndexData.spread_index}</div>
                                                                    <div className="increaseDecreasePercentageDiv font-bold">10%</div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div style={{ height: '165px' }} className={'eachIndexDiv ' + (getBackgroundColorBasedOnRisk(employeeIndexData.mri_level))}>
                                                        <h6 className="font-bold ">Mobility Index</h6>
                                                        <br />
                                                        <div className="m-t-lg font-normal">{getTranslatedText('Risk Level')}</div>

                                                        <Row>
                                                            <Col lg={4}>
                                                                <h5 className="font-bold">{employeeIndexData.mri_level}</h5>
                                                            </Col>
                                                            <Col lg={8} className="p-l-0">
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
                                            <div className="m-t-lg m-b">
                                                <Row>
                                                    <Col lg={4} className="p-r-0">
                                                        <div className="mostInteractedListMainDiv">
                                                            <div className="dateInnerMainDiv">
                                                                <span className="font-bold">As of {moment(new Date()).format('Do MMM YYYY')}</span>
                                                                <span className="float-right">
                                                                    <img src={selectedPinkArrowIcon} />
                                                                </span>
                                                            </div>

                                                            {
                                                                employeeDetails.most_interacted && employeeDetails.most_interacted.length > 0 ?

                                                                    <Scrollbars style={{ width: '100%', height: 220 }} autoHide>

                                                                        {showEmployeeList(employeeDetails.most_interacted)}
                                                                    </Scrollbars>

                                                                    :

                                                                    <div style={{ height: '200px' }}></div>
                                                            }
                                                        </div>
                                                    </Col>
                                                    <Col lg={8}>
                                                        <AreaChart chartData={chartData} yAxisTitle={'Personal Risk Index'} />
                                                    </Col>
                                                </Row>

                                            </div>
                                        </div>

                                        {
                                            employeeDetails.most_visited && employeeDetails.most_visited.length > 0 ?

                                                <div className="mostInteractedMainDiv m-t-md">
                                                    <Row >
                                                        <Col lg={4}>
                                                            <h5 className="font-bold">Most Visited Areas :</h5>
                                                        </Col>
                                                    </Row>

                                                    <Row className="m-t">
                                                        {showMostVisitedAreas(employeeDetails.most_visited)}
                                                    </Row>


                                                </div> : ''
                                        }



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


const mapStateToProps = (state) => ({
    language: state.dashboard.selectedLangaugeValue
})

export default connect(mapStateToProps, { setSelectedLanguage })(withRouter(EmployeeDetails))


