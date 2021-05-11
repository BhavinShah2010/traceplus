import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { downThumbIcon, dashboardPeopleImage } from '../../common/images';


function ThreatWatch(props) {

    return (
        <div className="threatWatchMainDiv">
            <Row>
                <Col lg={4}>
                    <div className="threatWatchTextDiv">
                        <div className="title">Threat Watch</div>
                        <div className="subTitle">As of 04th May 2021</div>

                        <div className="workSpaceStripeDiv">
                            Hey, your Workspace is Safe !

                            <div className="thumbIconDiv">
                                <img src={downThumbIcon} />
                            </div>
                        </div>
                    </div>
                </Col>

                <Col lg={5}>
                    <div className="threatWatchAnalyticsMainDiv">
                        <div className="eachColumnDiv">
                            Employee
                        </div>

                        <div className="eachColumnDiv">
                        Employee
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