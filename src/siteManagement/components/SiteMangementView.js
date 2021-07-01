import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';

import { Container, Row, Col } from 'react-bootstrap';
import '../styles/siteManagement.scss'
import { getTranslatedText } from '../../common/utilities';

import SiteMangementList from './index'
import CommonDatePicker from '../../common/commonDatePicker';


function SiteMangementView(props) {

    const [selectedDate, updateSelectedDate] = useState(new Date())


    function handleViewLocations() {
        props.history.push('/site-list')
    }


    function handleDateSelect(date) {
        updateSelectedDate(date)
    }

    return (
        <div className="dashboardComponentMainDiv siteManagementMainDiv">
            <Container >
            <Row>
                            <Col lg={6} >
                                <div className="siteViewHeaderDiv">
                                    <span className="mediumHeader" >{getTranslatedText('Site Management')}</span>
                                </div>
                            </Col>
                            <Col lg={6} className="text-right">
                                
                                <div className="siteHeadingDatePickerDiv">
                                    <CommonDatePicker
                                        selectedDate={selectedDate}
                                        handleSelectDate={handleDateSelect}

                                    />
                                </div>
                            </Col>
                        </Row>
                <Row className="text-right m-t">
                    <Col lg={12}>
                        <div className="viewAllEmployeesButton" onClick={handleViewLocations}>{getTranslatedText('View All Locations')}</div>
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
                    <Col lg={6}>
                    <Scrollbars style={{ width: '100%', height: '470px' }} autoHide>
                        <SiteMangementList 
                        hideHeading={true}
                        isBubbleView={true}
                        />
                        </Scrollbars>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SiteMangementView