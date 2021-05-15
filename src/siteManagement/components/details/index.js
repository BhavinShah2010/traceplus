import React, { useState, useEffect } from 'react'

import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment'

import '../../styles/siteManagement.scss'
import DashboardLanguage from '../../../components/dashboardLanguage';
import { getSiteOverview, getSiteFootFall } from '../../actionMethods/actionMethods';

function SiteViewDetails(props) {

    const [dashboardDate, updateDateboardDate] = useState(new Date())

    const [siteViewData, updateSiteViewData] = useState('')

    const [footFallValue, updateFootFallValue] = useState(0)

    const [footFallData, updateFootFallData] = useState('')

    const [selectedFootfallType , updateFootfallType] = useState('day')

    const [locationID, updateLocationID] = useState('')

    function handleSiteListClick() {
        props.history.push('/site-list')
    }

    useEffect(() => {

        let idVal = props.match.params.id.replace(":", "")


        if (idVal) {

            updateLocationID(idVal)

            let requestBody = {}
            requestBody.date = moment(dashboardDate).format('YYYY-MM-DD')
            requestBody.locationID = idVal

            getSiteOverview(requestBody).then(res => {
                
                if (res && res.data && res.data.length > 0) {
                    updateSiteViewData(res.data[0])
                }

                getSiteFootFall(requestBody).then(res => {
                if(res){
                    updateFootFallData(res)
                    updateFootFallValue(res.day_footfall)
                }
                })
            })
        }

    }, []);

    function handleChangeFootFallType (type) {
        updateFootfallType(type)

        let requestBody = {}
            requestBody.date = moment(dashboardDate).format('YYYY-MM-DD')
            requestBody.locationID = locationID

            getSiteFootFall(requestBody).then(res => {
                if(res){
                    type == 'week' ? updateFootFallValue(res.week_footfall) : updateFootFallValue(res.day_footfall)
                }
                })

        
        
    }


    if (siteViewData) {


        return (
            <div className="siteViewMainDiv">
                <Container>
                    <Row>
                        <Col lg={6}>
                            <div className="siteViewHeaderDiv">
                                <span className="smallHeader" onClick={handleSiteListClick}>Site Listing</span>
                                <span className="breadCrumbArrow"> > </span>
                                <span className="mediumHeader">Site View</span>
                            </div>
                        </Col>
                        <Col lg={6} className="text-right">
                            <div className="dashboardLanguageMainDiv">
                                <DashboardLanguage />
                            </div>
                        </Col>
                    </Row>
                    <Row className="m-t-lg">
                        <Col lg={4}>
                            <div className="siteViewDetailsLeftSideDiv">
                                <div className="headerNameDiv">{siteViewData.location_name}</div>
                                <div className="subHeaderDiv">{siteViewData.description}</div>
                                <div className="subHeaderDiv">9am - 6pm | 11pm - 6am</div>

                                <div className="separaterLine"></div>

                                <div className="areaCapacityMainDiv">
                                    <Row >
                                        <Col lg={6} className="text-center b-r">
                                            <h4 className="font-bold text-white">{siteViewData.location_size}</h4>
                                            <h6 className="text-white">Area Size Sq.m</h6>
                                        </Col>
                                        <Col lg={6} className="text-center">
                                            <h4 className="font-bold text-white">{siteViewData.capacity}</h4>
                                            <h6 className="text-white">Capacity</h6>
                                        </Col>
                                    </Row>

                                </div>

                                <div className="separaterLine"></div>

                                <div className="recommendMainDiv">
                                    <h5 className="font-bold text-white">Recommend</h5>

                                    <div className="recommendListMainDiv m-t-lg text-white">
                                        <div className="eachRecommendCardDiv">
                                            Limit Accessibility of Coffee Machine
                                            </div>

                                        <div className="eachRecommendCardDiv">
                                            Limit Accessibility of Coffee Machine
                                            </div>

                                        <div className="eachRecommendCardDiv">
                                            Limit Accessibility of Coffee Machine
                                            </div>

                                        <div className="eachRecommendCardDiv">
                                            Limit Accessibility of Coffee Machine
                                            </div>
                                    </div>
                                </div>

                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="siteViewRightSideDiv">
                                <Row>
                                    <Col lg={4}>
                                        <div className="areaIndexMainDiv">
                                            <h4 className="font-bold">Area Index</h4>
                                            <div className="m-t-lg">
                                                <h4 className="areaIndexValue font-bold">1.9</h4>
                                                <div className="areaIndexRiskPercentageDiv font-normal">
                                                    10%
                                                    </div>
                                            </div>

                                            <div className="m-t-7rem">
                                                <h3 className="areaIndexValue font-bold">
                                                    Low
                                                    </h3><br />
                                                <div className="riskLevelText">Risk Level</div>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col lg={8}>
                                        <div className="footfallMainDiv">
                                            <h4 className="font-bold">Footfall</h4>
                                            <div className="dayWeekButtonMainDiv">
                                                <button type="button" onClick={() => handleChangeFootFallType('day')} className={'buttonDiv ' + (selectedFootfallType == 'day' ? 'activeFootfall' : '')}
                                                >Day</button>
                                                <button type="button" onClick={() => handleChangeFootFallType('week')} className={'buttonDiv ' + (selectedFootfallType == 'week' ? 'activeFootfall' : '')}>Week</button>
                                            </div>
                                            <div className="m-t-7rem">
                                                <h2 className="areaIndexValue font-bold site-color">
                                                    {footFallValue}
                                                    </h2>
                                                <div className="riskLevelText site-color">No. of Employees</div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="white-bg m-t-lg wrapper">
                                <h4>Area Index Chart</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    else {
        return ('')
    }

}

export default SiteViewDetails