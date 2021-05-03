import React from 'react'
import { CommonHeading } from '../../common/commonHeading';
import { Container, Row, Col } from 'react-bootstrap';

import '../styles/dashboard.scss'


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
            </Container >
        </div>
    )
}

export default Dashboard
