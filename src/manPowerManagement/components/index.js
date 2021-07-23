

import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';

import { CommonHeading } from '../../common/commonHeading';
import DashboardLanguage from '../../components/dashboardLanguage';
import '../style/manpowerManagement.scss'

import CommonDatePicker from '../../common/commonDatePicker';
import { attendanceChart, getOrgPri, getDepartmentList } from '../actionMethods/actionMethods'

import mediumRiskIcon from '../../assets/traceplusImages/medium_risk_icon.svg'
import spinnerLoader from '../../assets/images/Spinner Loader.gif'

import moment from 'moment'
import Chart from './barChart'
import { getTranslatedText } from '../../common/utilities';
import EmployeeList from './employeeList';
import { getLanguageTranslation, setSelectedLanguage } from '../../dashboard/actionMethods/actionMethods';

const { Option } = Select;

const riskLevelColor = {
    "low": '#04e06e',
    "medium": "#ffd700",
    "high": "#ffa500"
}

let timeArr = [
    '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'
]

function ManPowerMangementList(props) {
    let date = localStorage.getItem('selectedDate') ? new Date(localStorage.getItem('selectedDate')) : new Date()

    const [selectedDate, updateSelectedDate] = useState(date)
    const [chartData, setChartData] = useState({ categories: [], series: [] })
    const [selectedLangValue, updateSelectedLangValue] = useState('en')
    const [numAttended, updateNumberAttended] = useState(0)
    const [chartLoader, setChartLoader] = useState(true)

    const [searchValue, updateSearchValue] = useState('')
    const [teamList, updateTeamList] = useState([])
    const [preDefinedTeamList, updatedPredefinedTeamList] = useState([])

    const [PriData, updatePRIData] = useState('')
    const [prevPriData, updatePrevPriData] = useState('')

    const [selectedTab, updatedSelectedTab] = useState('employees')

    let userDetails = JSON.parse(localStorage.getItem('userLoginDetails'))

    let userSession = userDetails ? userDetails.session : '123456789'

    let org_id = userDetails ? userDetails.org_id : 6

    function goToEmployeeList() {
        props.history.push('/manpower-management/employee-list')
    }

    function handleDateSelect(date) {
        updateSelectedDate(date)
    }

    function getDateFormat(date) {
        return moment(date).format('YYYY-MM-DD')
    }

    const getBarColor = (val) => {
        if (val < 33) {
            return riskLevelColor.low
        } else if (val < 66) {
            return riskLevelColor.medium
        } else {
            return riskLevelColor.high
        }
    }

    const getChartData = () => {
        setChartLoader(true)
        setChartData({ categories: [], series: [] })

        let d = moment(selectedDate)
        let date = getDateFormat(d)
        attendanceChart(date, userSession, org_id).then((res) => {
            let data = res?.attendance

            let categories = timeArr
            let series = []

            updateNumberAttended(res.num_attended || 0)

            if (data && Array.isArray(data)) {
                data.forEach((i, index) => {                    
                    series.push({
                        y: i['num_attended'],
                        color: getBarColor(i['num_attended']),
                        name: timeArr[index]
                    })
                })
            }

            setChartData({ categories, series })
            setChartLoader(false)
        }).catch((err) => {
            console.log(err)
            setChartLoader(false)
        })
    }

    const setPrevPriData = (date) => {
        let prevReqBody = {}
        prevReqBody.date = moment(date).subtract(1, 'days').format('YYYY-MM-DD')

        getOrgPri(prevReqBody, userSession, org_id).then((res) => {
            if (res) {
                updatePrevPriData(res)
            }
        })
    }

    const getChangePer = (key) => {
        let returnData = 0
        let x = prevPriData[key] || 0
        let y = PriData[key] || 0

        if (x) {
            returnData = ((y - x) / x) * 100
        }

        return returnData
    }

    useEffect(() => {
        getChartData()

        let requestBody = {}
        requestBody.date = getDateFormat(selectedDate)
        
        setPrevPriData(selectedDate)
        getOrgPriData(requestBody)
        getDepartmentListData(requestBody)
    }, [selectedDate])

    function getOrgPriData(requestBody) {
        getOrgPri(requestBody, userSession, org_id).then(res => {
            updatePRIData(res)
        })
    }

    function getDepartmentListData(requestBody) {


        getDepartmentList(requestBody, userSession, org_id).then(res => {
            if (res && res.status >= 200 && res.status <= 299) {
                updateTeamList(res.data)
                updatedPredefinedTeamList(res.data)
            }

        })
    }

    function getDateFormat(date) {
        return moment(date).format('YYYY-MM-DD')
    }

    function showRiskTypeIcon(element) {

        let icon = mediumRiskIcon

        switch (element.dep_risk) {
            case "Medium Risk":

                icon = mediumRiskIcon
                break;

            default:
                break;
        }

        return icon
    }

    function showTeamList(teamList) {
        let arr = []

        for (let index = 0; index < teamList.length; index++) {
            const element = teamList[index];

            arr.push(
                <Col lg={12} className="m-b">
                    <img src={showRiskTypeIcon(element)} />
                    <span className="font-bold" title={element.dep_name + ' Team'}>{element.dep_name} Team</span>
                </Col>


            )

        }

        return arr
    }

    function showEmpListData(empList) {
        let arr = []

        for (let index = 0; index < empList.length; index++) {
            const element = empList[index];

            arr.push(
                <div className="eachCardDiv">
                    <div className="headingNameMainDiv">
                        <Row>
                            <Col lg={7}>
                                <div className="empName text-white font-bold">{element.emp_name}</div>
                                <div className="empTitle text-white font-bold">{element.emp_department}</div>
                            </Col>
                            <Col lg={5}>
                                <div className="priDiv">
                                    <div className="text-white">PRI</div>
                                    <div className="priValue text-white font-bold">{element.emp_pri}</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            )

        }
        return arr
    }

    function changeLanguage(lang) {
        getLanguageTranslation(lang).then(res => {
            if (res && res.status >= 200 && res.status <= 200) {
                localStorage.setItem('languageData', JSON.stringify(res.data))
                localStorage.setItem('selectedLanguage', lang)
                props.setSelectedLanguage(lang)

            }
        })
    }

    useEffect(() => {
        if (props.language) {
            updateSelectedLangValue(props.language)
        }
    }, [props.language])





    function handleTabViewChange(key) {
        updatedSelectedTab(key)
        updateSearchValue('')
    }

    function handleTeamSearch(searchText) {

        let invalid = /[°"§%()[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        let value = searchText.replace(invalid, "")
        let teamList = preDefinedTeamList.filter(function (teamList) {
            return (teamList.dep_name.toLowerCase().search(value.toLowerCase()) !== -1)

        })

        updateTeamList(teamList)


        updateSearchValue(searchText)
    }

    return (
        <div className="manpowerManagementMainDiv">
            <Container>
                <Row>
                    <Col lg={6} >
                        <CommonHeading title="Manpower Management" />
                    </Col>
                    <Col lg={6} className="text-right">
                        <div className="commonLangaugeStyleDiv">
                            <DashboardLanguage
                                selectedLangValue={selectedLangValue}
                                changeLanguage={changeLanguage}
                            />
                        </div>

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
                        <div className="viewAllEmployeesButton" onClick={goToEmployeeList}>{getTranslatedText('View All Employees')}</div>
                    </Col>
                </Row>

                <Row className="m-t-lg">
                    <Col lg={5}>
                        <div className="populationRiskMainDiv" style={{ height: '420px' }}>
                            <div className="font-bold text-white titleText">{getTranslatedText('Overall')} <br /> {getTranslatedText('Population risk index')}</div>

                            <Row className="m-t-lg">
                                <Col lg={6} className="b-r">
                                    <span className="font-bold text-white numberText">{PriData.pri_index || 0}</span>
                                    <div className="percentageDiv m-l">
                                        {getChangePer('pri_index') > 0 ? <span> &#8593; </span> : <span> &#8595; </span>}
                                        {getChangePer('pri_index') + '%'}
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <span className="font-bold text-white lowText">
                                        {
                                            PriData.pri_risk == 'Low' ? 'Low' : 'High'
                                        }
                                    </span>

                                    <span className="text-white m-l-sm">Risk Level</span>
                                </Col>
                            </Row>

                            {
                                PriData.emp_list && PriData.emp_list.length > 0 && false ?
                                    <Scrollbars style={{ width: '100%', height: 310 }} autoHide>

                                        <div className="manPowerEmpListMainDiv m-t-lg">{showEmpListData(PriData.emp_list)}</div>

                                    </Scrollbars>
                                    : ''
                            }


                        </div>
                    </Col>

                    <Col lg={7}>
                        <Row>
                            <Col lg={12}>
                                <div className="attendanceTrendMainDiv" style={{ height: '420px' }}>
                                    <h5 className="font-bold ">{getTranslatedText('Attendance Trends')}</h5>
                                    <div className="dateText">As of {moment(selectedDate).format('Do MMM YYYY')}</div>
                                    <div className="yesterdayPresentMainDiv text-center text-white">
                                        <div>{getTranslatedText('Yesterday')}</div>
                                        <div className="valueDiv font-bold">{numAttended}</div>
                                        <div>{getTranslatedText('Present')}</div>
                                    </div>

                                    <div className="m-t-md">
                                        <Select defaultValue="dayView" >
                                            <Option value="dayView">{getTranslatedText('Day View')}</Option>
                                        </Select>
                                    </div>

                                    <div className="m-t-lg m-b-lg">
                                        {chartLoader ?
                                            <div className="text-center">
                                                <img src={spinnerLoader} />
                                            </div>
                                            :
                                            <Chart chartData={chartData} yAxisTitle={'Attendance'} />
                                        }
                                    </div>
                                </div>
                            </Col>

                        </Row>


                    </Col>
                </Row>

                <Row className="m-t-md">
                    <Col lg={12}>
                        <div className="empTeamTabMainDiv">
                            <div className={'eachTab ' + (selectedTab == 'employees' ? 'activeTabBG' : '')} onClick={() => handleTabViewChange('employees')}>{getTranslatedText('Employees')}</div>
                            <div className={'eachTab ' + (selectedTab == 'teams' ? 'activeTabBG' : '')} onClick={() => handleTabViewChange('teams')}>{getTranslatedText('Teams')}</div>
                        </div>
                    </Col>
                </Row>


                <Row className="m-t">
                    <Col lg={12}>
                        {
                            selectedTab == 'employees' ?
                                <div className="manpowerManagementEmployeeListMainDiv">
                                    <EmployeeList
                                        hideHeading={true}
                                        date={selectedDate}
                                    />
                                </div>

                                :

                                <div className="teamsMainDiv" style={{ height: '420px' }}>

                                    <Row>
                                        <Col lg={8} >
                                            <h3 className="locationsListing">{getTranslatedText('Teams')} ({teamList.length})</h3>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="listingSearchMainDiv">
                                                <input type="text" value={searchValue} name="siteSearch" placeholder="Search..." onChange={(event) => handleTeamSearch(event.target.value)} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="allOrPinnedMainDiv m-t displayNone">
                                        <div className="eachDiv active"> {getTranslatedText('All')}
                                            <div className="m-l-sm badgeBox activeBadge">
                                                <span>{teamList.length || 0}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Row className="m-t-lg teamListDiv">
                                        {
                                            teamList && teamList.length > 0 ?

                                                showTeamList(teamList) : ''
                                        }

                                        {
                                            searchValue && teamList.length == 0 ?

                                                <Col lg={12}>
                                                    <h3 className="text-center m-t-lg">No Teams Found !</h3>
                                                </Col> : ''


                                        }

                                    </Row>
                                </div>
                        }
                    </Col>
                </Row>

            </Container>

        </div>
    )
}

const mapStateToProps = (state) => ({
    language: state.dashboard.selectedLangaugeValue
})

export default connect(mapStateToProps, { setSelectedLanguage })(withRouter(ManPowerMangementList))

