import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { Container, Row, Col } from 'react-bootstrap';
import '../styles/siteManagement.scss'
import { getTranslatedText } from '../../common/utilities';



function SiteMangementView(params) {

    return (
        <div className="dashboardComponentMainDiv siteManagementMainDiv">
            <Container >
                <Row className="text-right m-t">
                    <Col lg={12}>
                        <div className="viewAllEmployeesButton" >{getTranslatedText('View All Locations')}</div>
                    </Col>
                </Row>
                <Row className="m-t">
                    <Col lg={6}>
                        <div className="locationsOverviewMainDiv">
                            <h6 className="text-white">Locations Overview</h6>
                            <div className="randomBubbleMainDiv">

                                <div className="eachBubbleMainDiv yellowGradientBGColor yellowBubbleSize" style={{ left: '5%', top: '15%' }}>
                                    <div className="font-bold">Tower 1</div>
                                    <div>PRI 31</div>
                                </div>

                                <div className="eachBubbleMainDiv yellowGradientBGColor yellowBubbleSize" style={{ left: '55%', top: '5%' }}>
                                    <div className="font-bold">Tower 2</div>
                                    <div>PRI 71</div>
                                </div>

                                <div className="eachBubbleMainDiv greenGradientBGColor greenBubbleSize" style={{ left: '70%', top: '50%' }}>
                                    <div className="font-bold">Tower 3</div>
                                    <div>PRI 17</div>
                                </div>

                                <div className="eachBubbleMainDiv orangeGradientColor orangeBubbleSize" style={{ left: '20%', top: '55%' }}>
                                    <div className="font-bold">Facility</div>
                                    <div>PRI 92</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default SiteMangementView