import React, { useState, useEffect } from 'react'
import { CommonHeading } from '../../common/commonHeading';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import '../../assets/styles/common.scss'
import '../styles/dashboard.scss'
import ThreatWatch from './threatWatch';
import { peopleOnPremisesIcon, pinkArrowIcon, selectedPinkArrowIcon } from '../../common/images';
import { getDashboardData, getThreatWatchData, getLanguageTranslation, setSelectedLanguage } from '../actionMethods/actionMethods';


import DashboardChart from './dashboardChart';
import moment from 'moment'
import 'antd/dist/antd.css';
import DashboardLanguage from '../../components/dashboardLanguage';

import spinnerLoader from '../../assets/images/Spinner Loader.gif'

import ContentLoader from 'react-content-loader'
import CommonDatePicker from '../../common/commonDatePicker';
import { titles } from './constant'
import { getTranslatedText } from '../../common/utilities';

function Dashboard(props) {

    const [employeeCount, updateEmployeeCount] = useState(0)
    const [orgId, updateOrgId] = useState(1)
    const [contaminatedEmployeeCount, updateContaminatedEmployeeCount] = useState(0);
    const [atRiskCount, updateAtRiskCount] = useState(0);
    const [threatWatchColor, updateThreatWatchColor] = useState('')
    const [startDateValue, updateStartDateValue] = useState(new Date())
    const [endDateValue, updateEndDateValue] = useState(new Date())

    const [selectedDate, updateSelectedDate] = useState(new Date())

    const [contactRankValue, updateContactRankValue] = useState(1)

    const [selectedLangValue, updateSelectedLangValue] = useState('en')


    const [indexTitleArray, updateIndexTitleArray] =

        useState([
            {
                title: 'Population risk index',
                isSelected: false
            }, {
                title: 'Spread Index',
                isSelected: false
            },

            {
                title: 'Mobility Index',
                isSelected: false
            },

            {
                title: 'Area Index',
                isSelected: false
            }


        ])
    const [indexTitle, updateIndexTitle] = useState(0)


    useEffect(() => {

        let requestBody = {}
        requestBody.date = getDateFormat(selectedDate)
        requestBody.contactRank = contactRankValue
        getDashboardDataValues(requestBody)
        getThreatWatchDataValues(requestBody)



        getLanguageTranslation(selectedLangValue).then(res => {
            console.log("Res : ", res)
        })

    }, []);


    function getThreatWatchDataValues(requestBody) {
        requestBody.startDate = getDateFormat(startDateValue)
        requestBody.endDate = getDateFormat(endDateValue)

        getThreatWatchData(requestBody).then(res => {
            if (res && res.status >= 200 && res.status <= 299) {
                updateThreatWatchColor(res.color)
                updateContaminatedEmployeeCount(res.contaminated.num_employees)
                updateAtRiskCount(res.contaminated.at_risk)
            }
        })
    }

    function getDashboardDataValues(requestBody) {


        getDashboardData(requestBody).then(res => {

            if (res && res.status >= 200 && res.status <= 299) {
                if (res.data) {
                    updateEmployeeCount(res.data.num_employees)
                }
            }
        }).catch(err => err)
    }

    function handleIndexTabClick(index) {
        let arr = [...indexTitleArray]

        for (let indexVal = 0; indexVal < arr.length; indexVal++) {
            const element = arr[indexVal];

            if (indexVal == index) {
                arr[indexVal].isSelected = true
            }
            else {
                arr[indexVal].isSelected = false
            }

        }
        updateIndexTitle(index)
    }


    function showIndexTab(titleArray) {

        let arr = []

        for (let index = 0; index < titleArray.length; index++) {
            const element = titleArray[index];

            arr.push(
                <div className={'populationRiskMainDiv ' +
                    (index == 0 ? ' populationRiskPadding ' : 'utilityPadding mb-3 spreadMobilityAreaIndexMainDiv') +
                    (index == 1 ? ' negativeMarginTop' : '') +
                    (index === indexTitle ? ' activeTab' : '')
                }
                    onClick={() => handleIndexTabClick(index)}
                >
                    <Row>
                        <Col lg={4}>
                            <div className="indexText">
                                {getTranslatedText(element.title)}
                            </div>
                        </Col>
                        <Col lg={5}>
                            <div className="riskLevelMainDiv ">
                                <div className="riskLevelTitleDiv">
                                    Low
                                </div>
                                <div className="riskLevelSubtitleDiv">
                                    Risk Level
                                </div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="pinkArrowIconDiv mt-3">
                                <img src={element.isSelected ? selectedPinkArrowIcon : pinkArrowIcon} />
                            </div>
                        </Col>
                    </Row>
                </ div>
            )

        }

        return arr
    }

    function handleChangeValue(value) {

        let requestBody = {}
        requestBody.date = getDateFormat(selectedDate)
        requestBody.contactRank = value
        updateContactRankValue(value)
        getThreatWatchDataValues(requestBody)

    }

    function getDateFormat(date) {
        return moment(date).format('YYYY-MM-DD')
    }


    function handleDateSelect(date) {
        updateSelectedDate(date)
        //updateThreatWatchColor('')

        let requestBody = {}
        requestBody.date = getDateFormat(date)
        requestBody.contactRank = contactRankValue
        //getDashboardDataValues(requestBody)
        getThreatWatchDataValues(requestBody)
    }

    function handleSelectStartDate(date) {
        updateStartDateValue(date)


        let requestBody = {}
        requestBody.date = getDateFormat(selectedDate)
        requestBody.contactRank = contactRankValue

        setTimeout(() => {
            getThreatWatchDataValues(requestBody)
        }, 100);

    }

    function handleSelectEndDate(date) {
        updateEndDateValue(date)

        let startDate = moment(startDateValue)
        let endDate = moment(endDateValue)

        let days = startDate.diff(endDate, 'days')

        let requestBody = {}
        requestBody.date = getDateFormat(selectedDate)
        requestBody.contactRank = contactRankValue

        setTimeout(() => {
            getThreatWatchDataValues(requestBody)
        }, 100);

    }


    function handleEmployeeClick() {
        props.history.push('/manpower-management/employee-list')
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


    return (
        <div className="dashboardComponentMainDiv">
            <Container >
                <Row>
                    <Col lg={3} className="m-t-sm">
                        <CommonHeading title={getTranslatedText('Dashboard')} />
                    </Col>
                    <Col lg={9} className="text-right">
                        <div className="dashboardLanguageMainDiv m-r-md">
                            <DashboardLanguage
                                selectedLangValue={selectedLangValue}
                                changeLanguage={changeLanguage}
                            />
                        </div>
                        <div className="commonHeadingDateMainDiv">
                            <CommonDatePicker
                                selectedDate={selectedDate}
                                handleSelectDate={handleDateSelect}
                            />
                        </div>
                        <div className="dashboardPeopleAndDateMainDiv">
                            <div className="dashboardPeopleAndEmployeeMainDiv">
                                <Row>
                                    <Col lg={6}>
                                        <div className="peopleOnPremisesInnerDiv">
                                            <img src={peopleOnPremisesIcon} />
                                            <span>People on Premises</span>
                                        </div>

                                    </Col>

                                    <Col lg={5}>
                                        <div className="employeeCountInnerDiv cursor-pointer" onClick={handleEmployeeClick}>
                                            <div className="empCount">{employeeCount}</div>
                                            <div>{getTranslatedText('Employees')}</div>
                                        </div>

                                    </Col>
                                </Row>

                            </div>
                        </div>
                    </Col>
                </Row>

                {
                    threatWatchColor ?
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <ThreatWatch
                                    handleSelectStartDate={handleSelectStartDate}
                                    handleSelectEndDate={handleSelectEndDate}

                                    startDate={startDateValue}
                                    endDate={endDateValue}
                                    selectedDate={selectedDate}
                                    handleChangeValue={handleChangeValue}
                                    contaminatedEmployeeCount={contaminatedEmployeeCount}
                                    atRiskCount={atRiskCount}
                                    threatWatchColor={threatWatchColor}
                                />
                            </Col>
                        </Row> : <Row className="text-center">
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <img src={spinnerLoader} />
                            </Col>
                        </Row>
                }

                <div className="dashboardGraphAndIndexMainDiv">
                    <Row>
                        <Col lg={5}>
                            {showIndexTab(indexTitleArray)}
                        </Col>
                        <Col lg={7}>
                            <DashboardChart
                                yAxisTitle={`${titles[indexTitle]} Risk Index`}
                                risk={'high'}
                            />
                        </Col>
                    </Row>

                </div>
            </Container >
        </div>
    )
}

export default connect(null, { setSelectedLanguage })(withRouter(Dashboard))
