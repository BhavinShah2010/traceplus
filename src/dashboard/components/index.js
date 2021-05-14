import React, { useState, useEffect } from 'react'
import { CommonHeading } from '../../common/commonHeading';
import { Container, Row, Col } from 'react-bootstrap';
import '../../assets/styles/common.scss'
import '../styles/dashboard.scss'
import ThreatWatch from './threatWatch';
import { peopleOnPremisesIcon, pinkArrowIcon, selectedPinkArrowIcon } from '../../common/images';
import { getDashboardData, getThreatWatchData } from '../actionMethods/actionMethods';
import DashboardChart from './dashboardChart';
import moment from 'moment'
import 'antd/dist/antd.css';
import DashboardLanguage from '../../components/dashboardLanguage';

import spinnerLoader from '../../assets/images/Spinner Loader.gif'

import ContentLoader from 'react-content-loader'
function Dashboard(props) {


    const [employeeCount, updateEmployeeCount] = useState(0)
    const [orgId, updateOrgId] = useState(1)
    const [dashboardDate, updateDateboardDate] = useState(new Date())
    const [contaminatedEmployeeCount, updateContaminatedEmployeeCount] = useState(0);
    const [atRiskCount, updateAtRiskCount] = useState(0);
    const [threatWatchColor, updateThreatWatchColor] = useState('')



    const [indexTitleArray, updateIndexTitleArray] =

        useState([
            {
                title: 'Population',
                isSelected: false
            }, {
                title: 'Spread',
                isSelected: false
            },

            {
                title: 'Mobility',
                isSelected: false
            },

            {
                title: 'Area',
                isSelected: false
            }


        ])

    useEffect(() => {

        let requestBody = {}
        requestBody.date = moment(dashboardDate).format('YYYY-MM-DD')
        requestBody.org_id = orgId
        getDashboardDataValues(requestBody)
        getThreatWatchDataValues(requestBody)

    }, []);

    function getThreatWatchDataValues(requestBody) {
        requestBody.start_date = moment(dashboardDate).format('YYYY-MM-DD')
        requestBody.end_date = moment(dashboardDate).format('YYYY-MM-DD')
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

        updateIndexTitleArray(arr)
    }


    function showIndexTab(titleArray) {

        let arr = []

        for (let index = 0; index < titleArray.length; index++) {
            const element = titleArray[index];

            arr.push(
                <div className={'populationRiskMainDiv ' +
                    (index == 0 ? ' populationRiskPadding ' : 'utilityPadding mb-3 spreadMobilityAreaIndexMainDiv') +
                    (index == 1 ? ' negativeMarginTop' : '') +
                    (element.isSelected ? ' activeTab' : '')
                }
                    onClick={() => handleIndexTabClick(index)}
                >
                    <Row>
                        <Col lg={4}>
                            <div className="indexText">
                                {element.title} Risk Index

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


    return (
        <div className="dashboardComponentMainDiv">
            <Container >
                <Row>
                    <Col lg={6} >
                        <CommonHeading title="Dashboard" />
                    </Col>
                    <Col lg={6} className="text-right">
                        <div className="dashboardLanguageMainDiv m-r-md">
                            <DashboardLanguage />
                        </div>
                        {/* <div className="dashboardDateMainDiv">Date</div> */}
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
                                        <div className="employeeCountInnerDiv">
                                            <div className="empCount">{employeeCount}</div>
                                            <div>Employees</div>
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
                            <DashboardChart />
                        </Col>
                    </Row>

                </div>
            </Container >
        </div>
    )
}

export default Dashboard
