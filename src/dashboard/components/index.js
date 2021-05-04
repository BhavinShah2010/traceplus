import React, { useState } from 'react'
import { CommonHeading } from '../../common/commonHeading';
import { Container, Row, Col } from 'react-bootstrap';

import '../styles/dashboard.scss'
import ThreatWatch from './threatWatch';
import { peopleOnPremisesIcon, pinkArrowIcon } from '../../common/images';


function Dashboard(props) {


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

    function handleIndexTabClick(index) {
        let arr = [...indexTitleArray]

        arr[index].isSelected = true

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
                                <img src={pinkArrowIcon} />
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
                                    <div className="dashboardPeopleAndDateMainDiv">
                                        <div className="dashboardPeopleAndEmployeeMainDiv">
                                            <Row>
                                                <Col lg={6}>
                                                    <div className="peopleOnPremisesInnerDiv">
                                                        <img src={peopleOnPremisesIcon} />
                                                        <span>People on Premises</span>
                                                    </div>

                                                </Col>

                                                <Col lg={3}>
                                                    <div className="employeeCountInnerDiv">
                                                        <div className="empCount">98</div>
                                                        <div>Employees</div>
                                                    </div>

                                                </Col>

                                                <Col lg={3}>
                                                    <div className="employeeCountInnerDiv">
                                                        <div className="empCount">52</div>
                                                        <div>Visitors</div>
                                                    </div>

                                                </Col>
                                            </Row>

                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <ThreatWatch />
                                </Col>
                            </Row>

                            <div className="dashboardGraphAndIndexMainDiv">
                                <Row>
                                    <Col lg={5}>
                                        {showIndexTab(indexTitleArray)}
                                    </Col>
                                    <Col lg={8}>
                                    </Col>
                                </Row>

                            </div>
                        </Container >
                    </div>
                    )
                }
                
                export default Dashboard
