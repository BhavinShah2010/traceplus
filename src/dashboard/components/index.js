import React from 'react'
import { CommonHeading } from '../../common/commonHeading';
import { Container, Row, Col } from 'react-bootstrap';

import '../styles/dashboard.scss'
import ThreatWatch from './threatWatch';
import { peopleOnPremisesIcon, pinkArrowIcon } from '../../common/images';


function Dashboard(props) {

    return (
        <div className="dashboardComponentMainDiv">
            <Container >
                <Row>
                    <Col lg={6} >
                        <CommonHeading  title="Dashboard" />
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
                        <ThreatWatch/>
                    </Col>
                </Row>
                
                <div className="dashboardGraphAndIndexMainDiv">
                    <Row>
                        <Col lg={5}>
                            <div className="populationRiskMainDiv populationRiskPadding">
                                <Row>
                                    <Col lg={4}>
                                        <div className="indexText">
                                            Population Risk Index
                                            
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
                            </div>

                            <div className="spreadMobilityAreaIndexMainDiv">
                                <div className="populationRiskMainDiv utilityPadding mb-3">
                                    <Row>
                                        <Col lg={4}>
                                            <div className="indexText">
                                                Spread Index
                                                
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
                                </div>

                                <div className="populationRiskMainDiv utilityPadding mb-3">
                                    <Row>
                                        <Col lg={4}>
                                            <div className="indexText">
                                                Mobility Index
                                                
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
                                </div>

                                <div className="populationRiskMainDiv utilityPadding">
                                    <Row>
                                        <Col lg={4}>
                                            <div className="indexText">
                                                Area Index
                                                
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
                                </div>
                            </div>
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
