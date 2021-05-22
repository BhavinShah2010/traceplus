import React, { useState, useEffect } from 'react'

import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment'

import Barchart from './barChart'
import '../../styles/siteManagement.scss'
import DashboardLanguage from '../../../components/dashboardLanguage';
import { getSiteOverview, getSiteFootFall, getSiteAreaIndex, areaIndexChart } from '../../actionMethods/actionMethods';

import spinnerLoader from '../../../assets/images/Spinner Loader.gif'
import CommonDatePicker from '../../../common/commonDatePicker';
import { getTranslatedText } from '../../../common/utilities';

function SiteViewDetails(props) {


    const [siteViewData, updateSiteViewData] = useState('')

    const [footFallValue, updateFootFallValue] = useState(0)

    const [footFallData, updateFootFallData] = useState('')

    const [selectedFootfallType, updateFootfallType] = useState('day')

    const [locationID, updateLocationID] = useState('')

    const [selectedDate, updateSelectedDate] = useState(new Date())
    const [chartData, setChartData] = useState({ categories: [], series: [] })

    function handleSiteListClick() {
        props.history.push('/site-list')
    }

    useEffect(() => {

        let idVal = props.match.params.id.replace(":", "")


        if (idVal) {
            let date = getDateFormat(selectedDate)

            updateLocationID(idVal)

            let requestBody = {}
            requestBody.date = date
            requestBody.locationID = idVal

            getSiteOverview(requestBody).then(res => {

                if (res && res.data && res.data.length > 0) {
                    updateSiteViewData(res.data[0])
                }

                getSiteFootFall(requestBody).then(res => {
                    if (res) {
                        updateFootFallData(res)
                        updateFootFallValue(res.day_footfall)
                    }
                })
            })

            // getSiteAreaIndex(requestBody).then(res => {
            //     console.log("Response : ", res)
            // })
        }

    }, []);

    useEffect(() => {
        let idVal = props.match.params.id.replace(":", "")
        getChartData(idVal)
    }, [selectedDate])

    const getChartData = (idVal) => {
        setChartData({ categories: [], series: [] })

        let date = getDateFormat(selectedDate)
        areaIndexChart({ date, locationID: idVal }).then((res) => {
            let data = res.data
            let categories = []
            let series = []

            if (data && Array.isArray(data)) {
                data.forEach((i) => {
                    let d = moment(i.location_ai_date).format('LT')
                    categories.push(d)
                    series.push(i.location_area_index)
                })

                setChartData({ categories, series })
            }
        }).catch((err) => {
            console.log(err)
        } )
    }

    function getDateFormat(date) {
        return moment(date).format('YYYY-MM-DD')
    }

    function handleDateSelect(date) {
        updateSelectedDate(date)


        let requestBody = {}
        requestBody.date = getDateFormat(date)
        requestBody.locationID = locationID

        

        getSiteOverview(requestBody).then(res => {

            if (res && res.data && res.data.length > 0) {
                updateSiteViewData(res.data[0])
            }

            getSiteFootFall(requestBody).then(res => {
                if (res) {
                    updateFootFallData(res)
                    updateFootFallValue(res.day_footfall)
                }
            })
        })

        getSiteAreaIndex(requestBody).then(res => {

        })
    }

    function handleChangeFootFallType(type) {
        updateFootfallType(type)

        let requestBody = {}
        requestBody.date = moment(selectedDate).format('YYYY-MM-DD')
        requestBody.locationID = locationID

        getSiteFootFall(requestBody).then(res => {
            if (res) {
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
                                <span className="smallHeader" onClick={handleSiteListClick}>{getTranslatedText('Site Management')}</span>
                                <span className="breadCrumbArrow"> > </span>
                                <span className="mediumHeader">{getTranslatedText('Site View')}</span>
                            </div>
                        </Col>
                        <Col lg={6} className="text-right">
                            {/* <div className="dashboardLanguageMainDiv">
                                <DashboardLanguage />
                            </div> */}
                            <div className="siteHeadingDatePickerDiv">
                                <CommonDatePicker
                                    selectedDate={selectedDate}
                                    handleSelectDate={handleDateSelect}

                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className="m-t-lg">
                        <Col lg={4}>
                            <div className="siteViewDetailsLeftSideDiv">
                                <div className="headerNameDiv">{getTranslatedText(siteViewData.location_name)}</div>
                                <div className="subHeaderDiv">{getTranslatedText(siteViewData.description)}</div>
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
                                    <h5 className="font-bold text-white">{getTranslatedText('Recommend')}</h5>

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
                                            <h4 className="font-bold">{getTranslatedText('Area Index')}</h4>
                                            <div className="m-t-lg">
                                                <h4 className="areaIndexValue font-bold">1.9</h4>
                                                <div className="areaIndexRiskPercentageDiv font-normal">
                                                    10%
                                                    </div>
                                            </div>

                                            <div className="m-t-7rem">
                                                <h3 className="areaIndexValue font-bold">
                                                    {getTranslatedText('Low')}
                                                    </h3><br />
                                                <div className="riskLevelText">{getTranslatedText('Risk Level')}</div>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col lg={8}>
                                        <div className="footfallMainDiv">
                                            <h4 className="font-bold">{getTranslatedText('Footfall')}</h4>
                                            <div className="dayWeekButtonMainDiv">
                                                <button type="button" onClick={() => handleChangeFootFallType('day')} className={'buttonDiv ' + (selectedFootfallType == 'day' ? 'activeFootfall' : '')}
                                                >Day</button>
                                                <button type="button" onClick={() => handleChangeFootFallType('week')} className={'buttonDiv ' + (selectedFootfallType == 'week' ? 'activeFootfall' : '')}>Week</button>
                                            </div>
                                            <div className="m-t-7rem">
                                                <h2 className="areaIndexValue font-bold commonBlackColor">
                                                    {footFallValue}
                                                </h2>
                                                <div className="riskLevelText commonBlackColor">No. of Employees</div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="white-bg m-t wrapper areaIndexChartMainDiv">
                                <Barchart chartData={chartData} />   
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    else {
        return (
            <div className="text-center m-t-lg">
                <img src={spinnerLoader} className="m-t-lg" />
            </div>
        )
    }

}

export default SiteViewDetails