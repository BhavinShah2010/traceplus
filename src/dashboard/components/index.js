import React from 'react'
import { CommonHeading } from '../../common/commonHeading';
import { Container, Row, Col } from 'react-bootstrap';

import '../styles/dashboard.scss'
import ThreatWatch from './threatWatch';


function Dashboard(props) {

    return (
        <div className="dashboardComponentMainDiv">
            <Container >
                <Row>
                    <Col lg={6} >
                        <CommonHeading  title="Dashboard" />
                    </Col>
                    <Col lg={6} className="text-right">
                        <CommonHeading  title="Dashboard" />
                    </Col>
                </Row>

                <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <ThreatWatch/>
                    </Col>
                </Row>
            </Container >
        </div>
    )
}

export default Dashboard
