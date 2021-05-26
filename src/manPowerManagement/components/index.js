

import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';

import { CommonHeading } from '../../common/commonHeading';
import DashboardLanguage from '../../components/dashboardLanguage';
import '../style/manpowerManagement.scss'
import { mediumRiskIcon } from '../../common/images';
import CommonDatePicker from '../../common/commonDatePicker';
import { attendanceChart, getOrgPri, getDepartmentList } from '../actionMethods/actionMethods'

import moment from 'moment'
import Chart from './areaChart'
import { getTranslatedText } from '../../common/utilities';
import EmployeeList from './employeeList';
import { getLanguageTranslation, setSelectedLanguage } from '../../dashboard/actionMethods/actionMethods';

const { Option } = Select;


function ManPowerMangementList(props) {

    const [selectedDate, updateSelectedDate] = useState(new Date())
    const [chartData, setChartData] = useState({ categories: [], series: [] })
    const [selectedLangValue, updateSelectedLangValue] = useState('en')
    const [numAttended, updateNumberAttended] = useState(0)

    const [teamList, updateTeamList] = useState([])

    const [PriData, updatePRIData] = useState('')

    function goToEmployeeList() {
        props.history.push('/manpower-management/employee-list')
    }

    function handleDateSelect(date) {
        updateSelectedDate(date)
    }

    function getDateFormat(date) {
        return moment(date).format('YYYY-MM-DD')
    }

    const getChartData = () => {
        setChartData({ categories: [], series: [] })

        let date = getDateFormat(selectedDate)
        attendanceChart(date).then((res) => {


            let data = res ?.attendance

            let categories = []
            let series = []

            updateNumberAttended(res.num_attended || 0)

            if (data && Array.isArray(data)) {
                data.forEach((i) => {
                    let d = moment(i.date).format('DD MMM')
                    categories.push(d)
                    series.push(i.num_attended)
                })
            }

            setChartData({ categories, series })
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getChartData()

        let requestBody = {}
        requestBody.date = getDateFormat(selectedDate)

        getOrgPriData(requestBody)
        getDepartmentListData(requestBody)
    }, [selectedDate])

    function getOrgPriData(requestBody) {
        getOrgPri(requestBody).then(res => {
            updatePRIData(res)
        })
    }

    function getDepartmentListData(requestBody) {


        getDepartmentList(requestBody).then(res => {
            if (res && res.status >= 200 && res.status <= 299) {
                updateTeamList(res.data)
            }
            console.log("Response : ", res)
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

    useEffect (() =>{
        if(props.language){
            updateSelectedLangValue(props.language)
        }
    }, [props.language])

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
                        <div className="viewAllEmployeesButton" onClick={goToEmployeeList}>{getTranslatedText('View All Employees ')}</div>
                    </Col>
                </Row>

                <Row className="m-t-lg">
                    <Col lg={4}>
                        <div className="populationRiskMainDiv" style={{ height: '420px' }}>
                            <div className="font-bold text-white titleText">{getTranslatedText('Overall')} <br /> {getTranslatedText('Population risk index')}</div>

                            <Row className="m-t-lg">
                                <Col lg={6} className="b-r">
                                    <span className="font-bold text-white numberText">{PriData.pri_index || 0}</span>
                                    <div className="percentageDiv m-l">
                                        {PriData.pri_risk == 'Low' ? <span> &#8593; </span> : <span>&#8595;</span>}
                                        {PriData.pri_index_percentage || 0}</div>
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

                    <Col lg={8}>
                        <Row>
                            <Col lg={6}>
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
                                        <Chart chartData={chartData} yAxisTitle={'Attendance'} />
                                    </div>
                                </div>
                            </Col>

                            <Col lg={6}>
                                <div className="teamsMainDiv" style={{ height: '420px' }}>
                                    <h4 className="font-bold">{getTranslatedText('Teams ')}</h4>
                                    <div className="allOrPinnedMainDiv">
                                        <div className="eachDiv active"> {getTranslatedText('All ')}
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

                                    </Row>
                                </div>
                            </Col>
                        </Row>


                    </Col>
                </Row>

                <Row className="m-t">
                    <Col lg={12}>
                        <div className="manpowerManagementEmployeeListMainDiv">
                            <h5 className="font-bold">Employees</h5>
                            <EmployeeList hideHeading={true} />
                        </div>
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

