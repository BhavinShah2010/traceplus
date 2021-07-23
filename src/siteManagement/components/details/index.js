import React, { useState, useEffect } from 'react'

import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";


import Barchart from './barChart'
import '../../styles/siteManagement.scss'
import DashboardLanguage from '../../../components/dashboardLanguage';
import { getSiteOverview, getSiteFootFall, getSiteAreaIndex, footfallChart } from '../../actionMethods/actionMethods';

import spinnerLoader from '../../../assets/images/Spinner Loader.gif'
import CommonDatePicker from '../../../common/commonDatePicker';
import { getTranslatedText } from '../../../common/utilities';
import ClockIcon from '../../../dashboard/styles/images/clock.png'

import { getLanguageTranslation, setSelectedLanguage } from '../../../dashboard/actionMethods/actionMethods';

const riskLevelColor = {
    "low": '#04e06e',
    "medium": "#ffd700",
    "high": "#ffa500"
}

let timeArr = [
    '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'
]

function SiteViewDetails(props) {
    let date = localStorage.getItem('selectedDate') ? new Date(localStorage.getItem('selectedDate')) : new Date()

    const [siteViewData, updateSiteViewData] = useState('')
    const [prevSiteData, updatePrevSiteData] = useState('')

    const [footFallValue, updateFootFallValue] = useState(0)

    const [footFallData, updateFootFallData] = useState('')

    const [selectedFootfallType, updateFootfallType] = useState('day')

    const [selectedLangValue, updateSelectedLangValue] = useState('en')

    const [locationID, updateLocationID] = useState('')

    const [selectedDate, updateSelectedDate] = useState(date)
    const [chartData, setChartData] = useState({ categories: [], series: [], top4: [] })
    const [chartLoader, setChartLoader] = useState(true)

    let userDetails = JSON.parse(localStorage.getItem('userLoginDetails'))

    let userSession = userDetails ? userDetails.session : '123456789'

    let org_id = userDetails ? userDetails.org_id : 6


    function handleSiteListClick() {
        props.history.push('/site-list')
    }

    const setPrevSiteData = (date) => {
        let idVal = props.match.params.id.replace(":", "")
        let prevReqBody = {}
        prevReqBody.date = moment(date).subtract(1, 'days').format('YYYY-MM-DD')
        prevReqBody.locationID = idVal

        getSiteOverview(prevReqBody, userSession, org_id).then((res) => {
            if (res && res.data && res.data.length > 0) {
                updatePrevSiteData(res.data[0])
            }
        })
    }

    useEffect(() => {

        let idVal = props.match.params.id.replace(":", "")

        if (idVal) {
            let date = getDateFormat(selectedDate)

            updateLocationID(idVal)

            setPrevSiteData(selectedDate)

            let requestBody = {}
            requestBody.date = date
            requestBody.locationID = idVal

            getSiteOverview(requestBody, userSession, org_id).then(res => {
                if (res && res.data && res.data.length > 0) {
                    updateSiteViewData(res.data[0])
                }
            })
        }

    }, []);

    useEffect(() => {
        let idVal = props.match.params.id.replace(":", "")
        getChartData(idVal)
    }, [selectedDate])

    const getBarColor = (val) => {
        if (val < 33) {
            return riskLevelColor.low
        } else if (val < 66) {
            return riskLevelColor.medium
        } else {
            return riskLevelColor.high
        }
    }

    const getChartData = (idVal) => {
        setChartLoader(true)
        setChartData({ categories: [], series: [], top4: [] })

        let d = moment(selectedDate)
        let date = getDateFormat(d)
        footfallChart({ date, locationID: idVal }, userSession, org_id).then((res) => {

            updateFootFallData(res)
            updateFootFallValue(res.day_footfall)

            let data = res.hourly_footfall
            let categories = timeArr
            let series = []
            let top4 = []

            if (data && Array.isArray(data)) {
                data.forEach((i, index) => {
                    series.push({
                        y: i,
                        color: getBarColor(i),
                        name: timeArr[index]
                    })
                })

                top4 = [...series].filter((s) => s.y > 0).sort((a, b) => (b.y - a.y)).slice(0, 4)

                // top4 = [...series].slice(0, 4)
                setChartData({ categories, series, top4 })
                setChartLoader(false)
            }
        }).catch((err) => {
            console.log(err)
            setChartLoader(false)
        })
    }

    function getDateFormat(date) {
        return moment(date).format('YYYY-MM-DD')
    }

    function handleDateSelect(date) {
        updateSelectedDate(date)


        let requestBody = {}
        requestBody.date = getDateFormat(date)
        requestBody.locationID = locationID

        getSiteOverview(requestBody, userSession, org_id).then(res => {
            if (res && res.data && res.data.length > 0) {
                updateSiteViewData(res.data[0])
            }
        })

        setPrevSiteData(date)

        getSiteAreaIndex(requestBody, userSession, org_id).then(res => {

        })
    }

    function handleChangeFootFallType(type) {
        updateFootfallType(type)

        let requestBody = {}
        requestBody.date = moment(selectedDate).format('YYYY-MM-DD')
        requestBody.locationID = locationID

        getSiteFootFall(requestBody, userSession, org_id).then(res => {
            if (res) {
                type == 'week' ? updateFootFallValue(res.week_footfall) : updateFootFallValue(res.day_footfall)
            }
        })
    }

    function changeLanguage(lang) {
        getLanguageTranslation(lang).then(res => {
            if (res && res.status >= 200 && res.status <= 200) {
                localStorage.setItem('languageData', JSON.stringify(res.data))
                localStorage.setItem('selectedLanguage', lang)
                props.setSelectedLanguage(lang)

            }
        })
    }

    const getChangePer = () => {
        let returnData = 0
        let x = prevSiteData.area_index || 0
        let y = siteViewData.area_index || 0

        if (x) {
            returnData = ((y - x) / x) * 100 + '%'
        }

        return returnData
    }

    useEffect(() => {
        if (props.language) {
            updateSelectedLangValue(props.language)
        }
    }, [props.language])

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
                            <div className="commonLangaugeStyleDiv">
                                <DashboardLanguage
                                    selectedLangValue={selectedLangValue}
                                    changeLanguage={changeLanguage}
                                />
                            </div>
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
                            <div className="siteViewDetailsLeftSideDiv" style={{ height: '750px' }}>
                                <div className="headerNameDiv">{getTranslatedText(siteViewData.location_name)}</div>
                                <div className="subHeaderDiv">{getTranslatedText(siteViewData.description)}</div>
                                <div className="subHeaderDiv">9am - 6pm | 11pm - 6am</div>
                                <div className="subHeaderDiv">Category Name : <b>{siteViewData.category_name}</b></div>

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

                                    <div className="recommendListMainDiv m-t-md text-white">
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
                                        <div className="areaIndexMainDiv" style={{ height: '250px' }}>
                                            <h4 className="font-bold">{getTranslatedText('Area Index')}</h4>
                                            <div className="m-t">
                                                <h4 className="areaIndexValue font-bold">{siteViewData.area_index}</h4>
                                                <div className="areaIndexRiskPercentageDiv font-normal">
                                                    {getChangePer()}
                                                </div>
                                            </div>

                                            <div className="m-t-lg">
                                                <h3 className="areaIndexValue font-bold m-t">
                                                    {getTranslatedText(siteViewData.area_index_status || '')}
                                                </h3><br />
                                                <div className="riskLevelText">{getTranslatedText('Risk Level')}</div>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col lg={8}>
                                        <div className="footfallMainDiv" style={{ height: '250px' }}>
                                            <h4 className="font-bold">{getTranslatedText('Footfall')}</h4>
                                            <div className="dayWeekButtonMainDiv">
                                                <button type="button" onClick={() => handleChangeFootFallType('day')} className={'buttonDiv ' + (selectedFootfallType == 'day' ? 'activeFootfall' : '')}
                                                >Day</button>
                                                <button type="button" onClick={() => handleChangeFootFallType('week')} className={'buttonDiv ' + (selectedFootfallType == 'week' ? 'activeFootfall' : '')}>Week</button>
                                            </div>
                                            <div style={{ marginTop: '3rem' }}>
                                                <h2 className="areaIndexValue font-bold commonBlackColor" style={{ marginBottom: '0.15rem' }}>
                                                    {footFallValue}
                                                </h2>
                                                <div className="riskLevelText commonBlackColor">{getTranslatedText('NO.')} of {getTranslatedText('Employees')}</div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>


                            <div className="white-bg m-t wrapper areaIndexChartMainDiv">
                                <Row>
                                    <Col lg={3}>
                                        <h6 className="font-bold">Peak Hours</h6>
                                        <div>
                                            {chartData.top4.map((d) => {
                                                return (
                                                    <div className="eachPeakHoursDiv">
                                                        <img src={ClockIcon} />
                                                        <span className="font-bold">{d.name}</span>

                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </Col>
                                    <Col lg={9}>
                                        {chartLoader ?
                                            <div className="text-center">
                                                <img src={spinnerLoader} />
                                            </div>
                                            :
                                            <Barchart chartData={chartData} />
                                        }
                                    </Col>
                                </Row>

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

const mapStateToProps = (state) => ({
    language: state.dashboard.selectedLangaugeValue
})

export default connect(mapStateToProps, { setSelectedLanguage })(withRouter(SiteViewDetails))


