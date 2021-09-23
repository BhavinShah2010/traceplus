import React, { useState, useEffect } from 'react'
import { CommonHeading } from '../../common/commonHeading';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ReactModal from 'react-modal';
import { Scrollbars } from 'react-custom-scrollbars';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


import '../../assets/styles/common.scss'
import '../styles/dashboard.scss'
import ThreatWatch from './threatWatch';


import helpIcon from '../../assets/traceplusImages/help-icon.png'
import pinkArrowIcon from '../../assets/traceplusImages/pink_outline_right_arrow_icon.svg'
import selectedPinkArrowIcon from '../../assets/traceplusImages/pink_right_arrow_icon.svg'

import { getDashboardData, getThreatWatchData, getLanguageTranslation, setSelectedLanguage, getChartData } from '../actionMethods/actionMethods';

import EmployeeList from '../../manPowerManagement/components/employeeList'

import SiteMangementList from '../../siteManagement/components/index'

import DashboardChart from './dashboardChart';
import moment from 'moment'
import 'antd/dist/antd.css';
import DashboardLanguage from '../../components/dashboardLanguage';

import spinnerLoader from '../../assets/images/Spinner Loader.gif'

import ContentLoader from 'react-content-loader'
import CommonDatePicker from '../../common/commonDatePicker';
import { prepareDateObj } from './helper'
import { titles } from './constant'
import { getTranslatedText } from '../../common/utilities';


function Dashboard(props) {
    let date = localStorage.getItem('selectedDate') ? new Date(localStorage.getItem('selectedDate')) : new Date()
    let interval = 5
    const [employeeCount, updateEmployeeCount] = useState(0)
    const [orgId, updateOrgId] = useState(1)
    const [orgCount, updateOrgCount] = useState(0)
    const [contaminatedEmployeeCount, updateContaminatedEmployeeCount] = useState(0);
    const [atRiskCount, updateAtRiskCount] = useState(0);
    const [threatWatchColor, updateThreatWatchColor] = useState('')
    const [selectedDate, updateSelectedDate] = useState(date)
    const [startDateValue, updateStartDateValue] = useState(moment(date).subtract(29, 'days').toDate())
    const [endDateValue, updateEndDateValue] = useState(moment(date).add(1, 'days').toDate())
    const [toastClass, updateToastClass] = useState('successToast')
    const [employeePopupFlag, updateEmployeePopupFlag] = useState(false)
    const [locationPopupFlag, updateLocationPopupFlag] = useState(false)
    const [chartLoader, setChartLoader] = useState(true)

    let userDetails = JSON.parse(localStorage.getItem('userLoginDetails'))

    let userSession = userDetails ? userDetails.session : '123456789'

    let org_id = userDetails ? userDetails.org_id : 6


    const [contactRankValue, updateContactRankValue] = useState(1)

    const [selectedLangValue, updateSelectedLangValue] = useState('en')
    const [chartData, setChartData] = useState({ categories: [], series: [], chartData: [] })

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '90%'
        },
    };

    const [indexTitleArray, updateIndexTitleArray] =

        useState([
            {
                title: 'Population Risk Index',
                isSelected: true,
                desc: ''
            },
            {
                title: 'Spread Index',
                isSelected: false,
                desc: 'Spread index is based on the number of interactions between people. If the number is above XX Bla Bla'
            },
            {
                title: 'Movement Index',
                isSelected: false,
                desc: 'Movement index is based on the number of interactions between people and locations. If the number is above XX Bla Bla'
            },

            {
                title: ' Area Index ',
                isSelected: false,
                desc: 'Area index is based on the frequentation of all locations tags by employees.'
            }


        ])
    const [indexTitle, updateIndexTitle] = useState(0)


    useEffect(() => {

        if (props.match.path == '/') {
            props.history.push('/dashboard')
        }

        let requestBody = {}
        requestBody.date = getDateFormat(selectedDate)
        requestBody.contactRank = contactRankValue
        requestBody.startDate = getDateFormat(startDateValue)
        requestBody.endDate = getDateFormat(endDateValue)
        getDashboardDataValues(requestBody)
        getThreatWatchDataValues(requestBody)

        getLanguageTranslation(selectedLangValue, userSession).then(res => {
            // console.log("Res : ", res)
        })

        setChartDetail(getDateFormat(startDateValue), getDateFormat(endDateValue))
    }, []);

    useEffect(() => {
        if (props.language) {
            updateSelectedLangValue(props.language)
        }
    }, [props.language])

    useEffect(() => {
        setChartDetail(getDateFormat(startDateValue), getDateFormat(endDateValue))
    }, [indexTitle])

    const setChartDetail = (startDateValue = null, endDateValue = null) => {
        setChartLoader(true)
        setChartData({ categories: [], series: [], chartData: [] })

        let obj = {
            index: titles[indexTitle].toLowerCase(),
            start: startDateValue,
            end: endDateValue
        }

        getChartData(obj, userSession, org_id).then((res) => {
            let data = res.index_data
            // let categories = []
            // let series = []
            let chartData = {}


            if (data && Array.isArray(data)) {

                let params = {
                    startDate: startDateValue,
                    endDate: endDateValue,
                    type: obj.index,
                    interval,
                    data
                }
                let series = prepareDateObj(params)

                data.forEach((d) => {
                    let time = moment(d.timestamp).valueOf()
                    chartData[time] = d
                })

                setChartLoader(false)
                setChartData({ series: series.sort((a, b) => a[0] - b[0]), chartData })
            }

        }).catch((err) => {
            console.log(err)
            setChartLoader(false)
        })
    }


    function getThreatWatchDataValues(requestBody) {
        getThreatWatchData(requestBody, userSession, org_id).then(res => {
            if (res && res.status >= 200 && res.status <= 299) {
                updateThreatWatchColor(res.color)
                updateContaminatedEmployeeCount(res.contaminated.num_employees)
                updateOrgCount(res.contaminated.org_locations)
                updateAtRiskCount(res.contaminated.at_risk)
            }
        })
    }

    function getDashboardDataValues(requestBody) {


        getDashboardData(requestBody, userSession, org_id).then(res => {

            if (res && res.status >= 200 && res.status <= 299) {
                if (res.data) {
                    updateEmployeeCount(res.data.num_employees)
                }
            }
        }).catch(err => err)
    }

    function handleIndexTabClick(index) {
        let arr = [...indexTitleArray]

        for (let indexVal = 0; indexVal < arr.length; indexVal++) {
            const element = arr[indexVal];

            if (indexVal == index) {
                arr[indexVal].isSelected = true
            }
            else {
                arr[indexVal].isSelected = false
            }

        }
        updateIndexTitle(index)
    }

    const handleMouseEnter = (id) => {
        let doc = document.getElementById(id)

        if (doc) {
            doc.style.display = 'block'
        }
    }

    const handleMouseLeave = (id) => {
        let doc = document.getElementById(id)

        if (doc) {
            doc.style.display = 'none'
        }
    }

    function showIndexTab(titleArray) {

        let arr = []

        for (let index = 0; index < titleArray.length; index++) {
            const element = titleArray[index];
            arr.push(
                <div className={'populationRiskMainDiv ' +
                    (index == 0 ? ' populationRiskPadding ' : 'utilityPadding mb-3 spreadMobilityAreaIndexMainDiv') +
                    (index == 1 ? ' negativeMarginTop' : '') +
                    (index === indexTitle ? ' activeTab' : '')
                }
                    onClick={() => handleIndexTabClick(index)}
                >
                    <Row>
                        <Col lg={5} className="p-r-0">
                            <div className='indexBox'>
                                <div className="indexText">
                                    {getTranslatedText(element.title)}
                                </div>
                                {element.desc ?
                                    <React.Fragment>
                                        <img
                                            alt=''
                                            src={helpIcon}
                                            onMouseEnter={() => handleMouseEnter(`desc_${index}`)}
                                            onMouseLeave={() => handleMouseLeave(`desc_${index}`)}
                                        />
                                        <div className='indexDesc' id={`desc_${index}`} >{element.desc}</div>
                                    </React.Fragment>
                                    : null
                                }
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="riskLevelMainDiv ">
                                <div className="riskLevelTitleDiv">
                                    Low
                                </div>
                                <div className="riskLevelSubtitleDiv">
                                    Risk Level
                                </div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="pinkArrowIconDiv mt-3">
                                <img src={element.isSelected ? selectedPinkArrowIcon : pinkArrowIcon} />
                            </div>
                        </Col>
                    </Row>
                </ div>
            )

        }

        return arr
    }

    function handleChangeValue(value) {
        let requestBody = {}
        requestBody.date = getDateFormat(selectedDate)
        requestBody.contactRank = value
        requestBody.startDate = getDateFormat(startDateValue)
        requestBody.endDate = getDateFormat(endDateValue)
        updateContactRankValue(value)
        getThreatWatchDataValues(requestBody)
    }

    function getDateFormat(date) {
        return moment(date).format('YYYY-MM-DD')
    }


    function handleDateSelect(date) {
        updateSelectedDate(date)
        //updateThreatWatchColor('')

        let requestBody = {}
        requestBody.date = getDateFormat(date)
        requestBody.contactRank = contactRankValue

        //getDashboardDataValues(requestBody)        
        let startDate =  new Date().setDate(new Date().getDate() - 29)
        let endDate = new Date(date).setDate(date.getDate() + 1)

        requestBody.startDate = getDateFormat(startDate)
        requestBody.endDate = getDateFormat(endDate)
        
        updateStartDateValue(startDate)
        updateEndDateValue(endDate)
        getThreatWatchDataValues(requestBody)
        setChartDetail(getDateFormat(startDate), getDateFormat(endDate))
    }

    function handleSelectStartDate(date) {
        updateStartDateValue(date)

        let requestBody = {}
        requestBody.date = getDateFormat(date)
        requestBody.contactRank = contactRankValue
        requestBody.startDate = getDateFormat(date)
        requestBody.endDate = getDateFormat(endDateValue)

        getThreatWatchDataValues(requestBody)
        setChartDetail(requestBody.date, getDateFormat(endDateValue))
    }

    function handleSelectEndDate(date) {
        date = new Date(date).setDate(date.getDate() + 1)
        updateEndDateValue(date)

        let startDate = moment(startDateValue)
        let endDate = moment(date)
        let isBefore = startDate.isBefore(endDate)

        if (isBefore) {
            let requestBody = {}
            requestBody.date = getDateFormat(date)
            requestBody.contactRank = contactRankValue
            requestBody.startDate = getDateFormat(startDateValue)
            requestBody.endDate = getDateFormat(date)

            getThreatWatchDataValues(requestBody)
            setChartDetail(getDateFormat(startDateValue), requestBody.date)
        } else {
            updateToastClass('errorToast')
            toast('End Date Should be Greater Than Start Date.', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                hideProgressBar: true
            })
        }
    }

    function handleEmployeeClick() {
        props.history.push('/manpower-management/employee-list')
    }

    function changeLanguage(lang) {
        getLanguageTranslation(lang, userSession).then(res => {
            if (res && res.status >= 200 && res.status <= 200) {
                localStorage.setItem('languageData', JSON.stringify(res.data))
                localStorage.setItem('selectedLanguage', lang)
                props.setSelectedLanguage(lang)

            }
        })
    }

    function handleUpdateEmployeePopup() {
        updateEmployeePopupFlag(true)
    }

    function handleUpdateLocationPopup() {
        updateLocationPopupFlag(true)
    }

    function handleCloseModal() {

        updateEmployeePopupFlag(false)
        updateLocationPopupFlag(false)
    }

    return (
        <div className="dashboardComponentMainDiv">
            <Container >
                <Row>
                    <Col lg={3} className="m-t-sm">
                        <CommonHeading title={getTranslatedText('Dashboard')} />
                    </Col>
                    <Col lg={9} className="text-right">
                        <div className="dashboardLanguageMainDiv m-r-md">
                            <DashboardLanguage
                                selectedLangValue={selectedLangValue}
                                changeLanguage={changeLanguage}
                            />
                        </div>
                        <div className="commonHeadingDateMainDiv">
                            <CommonDatePicker
                                selectedDate={selectedDate}
                                handleSelectDate={handleDateSelect}
                            />
                        </div>
                        <div className="dashboardPeopleAndDateMainDiv">
                            <div className="dashboardPeopleAndEmployeeMainDiv">
                                <div className="deviceStatus">Device Status</div>
                                <Row>
                                    <Col onClick={handleUpdateLocationPopup} lg={6} style={{ borderRight: '0.063rem solid #FFFFFF', cursor: 'pointer' }}>
                                        {/* <div className="peopleOnPremisesInnerDiv">
                                            <img src={peopleOnPremisesIcon} />
                                            <span>{getTranslatedText('People on premises')}</span>
                                        </div> */}
                                        <div>Location Tags</div>
                                        <div>27</div>
                                    </Col>

                                    <Col onClick={handleUpdateEmployeePopup} lg={6} style={{ cursor: 'pointer' }}>
                                        {/* <div className="employeeCountInnerDiv cursor-pointer" onClick={handleEmployeeClick}>
                                            <div className="empCount">{employeeCount}</div>
                                            <div>{getTranslatedText('Employees')}</div>
                                        </div> */}
                                        <div>Personal Tags</div>
                                        <div>127</div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>

                {
                    threatWatchColor ?
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <ThreatWatch
                                    handleSelectStartDate={handleSelectStartDate}
                                    handleSelectEndDate={handleSelectEndDate}
                                    orgCount={orgCount}
                                    startDate={startDateValue}
                                    endDate={endDateValue}
                                    selectedDate={selectedDate}
                                    handleChangeValue={handleChangeValue}
                                    contaminatedEmployeeCount={contaminatedEmployeeCount}
                                    atRiskCount={atRiskCount}
                                    threatWatchColor={threatWatchColor}
                                    openEmployeePopup={handleUpdateEmployeePopup}
                                    openLocationPopup={handleUpdateLocationPopup}
                                />
                            </Col>
                        </Row> : <Row className="text-center">
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <img src={spinnerLoader} />
                            </Col>
                        </Row>
                }

                <div className="dashboardGraphAndIndexMainDiv">
                    <Row>
                        <Col lg={4} className="p-r-0">
                            {showIndexTab(indexTitleArray)}
                        </Col>
                        {chartLoader ?
                            <Col className="text-center" lg={8}>
                                <img src={spinnerLoader} />
                            </Col>
                            :
                            <Col lg={8}>
                                <DashboardChart
                                    yAxisTitle={`${titles[indexTitle]} Risk Index`}
                                    risk={'low'}
                                    chartData={chartData}
                                    chartType={titles[indexTitle]}
                                    startDate={moment(startDateValue).format('YYYY-MM-DD')}
                                    endDate={moment(endDateValue).format('YYYY-MM-DD')}
                                    interval={interval}
                                />
                            </Col>
                        }
                    </Row>
                </div>
            </Container >

            <ReactModal
                isOpen={employeePopupFlag}
                style={customStyles}
                onRequestClose={handleCloseModal}
                shouldCloseOnOverlayClick={true}
            >

                <Scrollbars style={{ width: '100%', height: '100%' }} autoHide>
                    <EmployeeList
                        hideHeading={true}
                        title={'Personal Tags'}
                    />
                </Scrollbars>
            </ReactModal>


            <ReactModal
                isOpen={locationPopupFlag}
                style={customStyles}
                onRequestClose={handleCloseModal}
                shouldCloseOnOverlayClick={true}
            >
                <Scrollbars style={{ width: '100%', height: '100%' }} autoHide>
                    <SiteMangementList
                        hideHeading={true}
                        title={'Location Tags'}
                    />
                </Scrollbars>
            </ReactModal>


            <ToastContainer
                toastClassName={toastClass}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    language: state.dashboard.selectedLangaugeValue
})

export default connect(mapStateToProps, { setSelectedLanguage })(withRouter(Dashboard))
