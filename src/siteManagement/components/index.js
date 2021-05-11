import React, { useState, useEffect } from 'react'

import { Container, Row, Col } from 'react-bootstrap';
import { CommonHeading } from '../../common/commonHeading';
import '../styles/siteManagement.scss'
import DashboardLanguage from '../../components/dashboardLanguage';
import { selectedPinkArrowIcon } from '../../common/images';

function SiteMangementList(props) {


    function handleClickCard(id) {
        props.history.push(`/site-list/view/:${id}`)
    }

    function showCardList(params) {
        let arr = []

        for (let index = 0; index < 5; index++) {
            arr.push(
                <div className="eachCard" key={index} onClick={() => handleClickCard(index)}>
                    <div className="card-body">
                        <Row>
                            <Col lg={12}>
                                <span className="eachTag">Reception</span>
                                <span className="eachTag">Overcrowded</span>
                            </Col>
                        </Row>

                        <Row className="m-t-lg">
                            <Col lg={4}>
                                <div className="locationNameDiv">Reception</div>
                                <div className="nearByLocationDiv">Main Security</div>
                            </Col>

                            <Col lg={4}>
                                <div className="nearByLocationDiv">Area Index</div>
                                <span className="locationNameDiv">1.9</span>
                                <span className="indexCircleStatus lowStatus">Low</span>
                            </Col>

                            <Col lg={3} className="b-l">
                                <div className="nearByLocationDiv">Daily Avg. Footfall</div>
                                <div className="locationNameDiv">200</div>
                            </Col>

                            <Col lg={1}>
                                <div className="arrowDiv">
                                    <img src={selectedPinkArrowIcon} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        }

        return arr
    }

    return (
        <div className="siteManagementMainDiv">
            <Container >
                <Row>
                    <Col lg={6} >
                        <CommonHeading title="Site Listing" />
                    </Col>
                    <Col lg={6} className="text-right">
                        <div className="dashboardLanguageMainDiv">
                            <DashboardLanguage />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="siteListMainDiv">
                            <Row>
                                <Col lg={8} >
                                    <h3 className="locationsListing">Locations (5)</h3>
                                </Col>
                                <Col lg={4}>
                                    <div className="listingSearchMainDiv">
                                        <input type="text" name="siteSearch" placeholder="Search..." />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={12}>
                                    <div className="listingRecordMainDiv">
                                        {
                                            showCardList()
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SiteMangementList