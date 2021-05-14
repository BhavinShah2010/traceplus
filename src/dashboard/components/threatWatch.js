import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { downThumbIcon, dashboardPeopleImage, green, greenThumbIcon } from '../../common/images';


function ThreatWatch(props) {

    return (
        <div className={'threatWatchMainDiv ' + (props.threatWatchColor && props.threatWatchColor == 'green' ? ' greenGradienColor' : ' redGradientColor') } >
            <Row>
                <Col lg={3}>
                    <div className="threatWatchTextDiv">
                        <div className="title">Threat Watch</div>
                        <div className="subTitle">As of 04th May 2021</div>

                        <div className="workSpaceStripeDiv">
                            Hey, your Workspace is 
                                { props.threatWatchColor && props.threatWatchColor == 'green' ? ' ' : ' not '} 
                            Safe !

                            <div className={'thumbIconDiv ' + (props.threatWatchColor && props.threatWatchColor == 'green' ? ' greenBorderColor' : ' redBorderColor') }>
                                <img src={props.threatWatchColor && props.threatWatchColor == 'green' ? greenThumbIcon: downThumbIcon} />
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
                                </Col>
                            </Row>

                            <Row className="m-t-lg">
                                <Col lg={6}>
                                    <div className="contactRankText">Start Date</div>
                                </Col>

                                <Col lg={6}>
                                    <div className="contactRankText">End Date</div>
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