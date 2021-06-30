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