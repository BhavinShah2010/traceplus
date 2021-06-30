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


import peopleOnPremisesIcon from '../../assets/traceplusImages/people_on_premises_icon.svg'
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
import { titles } from './constant'
import { getTranslatedText } from '../../common/utilities';
import { getEmployeeList } from '../../manPowerManagement/actionMethods/actionMethods';

function Dashboard(props) {

    const [employeeCount, updateEmployeeCount] = useState(0)
    const [orgId, updateOrgId] = useState(1)
    const [orgCount, updateOrgCount] = useState(0)
    const [contaminatedEmployeeCount, updateContaminatedEmployeeCount] = useState(0);
    const [atRiskCount, updateAtRiskCount] = useState(0);
    const [threatWatchColor, updateThreatWatchColor] = useState('')
    const [selectedDate, updateSelectedDate] = useState(new Date())
    const [startDateValue, updateStartDateValue] = useState(new Date().setDate(selectedDate.getDate() - 30))
    const [endDateValue, updateEndDateValue] = useState(selectedDate)
    const [toastClass, updateToastClass] = useState('successToast')
    const [employeePopupFlag, updateEmployeePopupFlag] = useState(false)
    const [locationPopupFlag, updateLocationPopupFlag] = useState(false)


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
            width:'80%',
            height:'90%'
        },
    };



    const [indexTitleArray, updateIndexTitleArray] =

        useState([
            {
                title: 'Population Risk Index',
                isSelected: true
            }, {
                title: 'Spread Index',
                isSelected: false
            },

            {
                title: 'Mobility Index',
                isSelected: false
            },

            {
                title: ' Area    Index ',
                isSelected: false
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
        getDashboardDataValues(requestBody)
        getThreatWatchDataValues(requestBody)



        getLanguageTranslation(selectedLangValue).then(res => {
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
        if (chartData.chartData && chartData.chartData.length) {
            let data = chartData.chartData
            let series = []
            let type = titles[indexTitle].toLowerCase()

            data.forEach((i) => {
                series.push(i[type])
            })

            setChartData(prevState => ({ ...prevState, series }))
        }
    }, [indexTitle])


    const setChartDetail = (startDateValue = null, endDateValue = null) => {
        setChartData({ categories: [], series: [], chartData: [] })



        let obj = {
            index: titles[indexTitle].toLowerCase(),
            start: startDateValue,
            end: endDateValue
        }

        getChartData(obj).then((res) => {
            let data = res.index_data
            let categories = []
            let series = []
            let chartData = []

            if (data && Array.isArray(data)) {
                chartData = data

                data.forEach((i) => {
                    let d = moment(i.timestamp).format('MMM DD')
                    categories.push(d)
                    series.push(i[obj.index])
                })

                setChartData({ series, categories, chartData })
            }

        }).catch((err) => {
            console.log(err)
        })
    }


    function getThreatWatchDataValues(requestBody) {
        requestBody.startDate = getDateFormat(startDateValue)
        requestBody.endDate = getDateFormat(endDateValue)

        getThreatWatchData(requestBody).then(res => {
            if (res && res.status >= 200 && res.status <= 299) {
                updateThreatWatchColor(res.color)
                updateContaminatedEmployeeCount(res.contaminated.num_employees)
                updateOrgCount(res.contaminated.org_locations)
                updateAtRiskCount(res.contaminated.at_risk)
            }
        })
    }

    function getDashboardDataValues(requestBody) {


        getDashboardData(requestBody).then(res => {

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
                        <Col lg={4} className="p-r-0">
                            <div className="indexText">
                                {getTranslatedText(element.title)}
                            </div>
                        </Col>
                        <Col lg={5}>
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
        getThreatWatchDataValues(requestBody)
    }

    function handleSelectStartDate(date) {
        updateStartDateValue(date)

        let requestBody = {}
        requestBody.date = getDateFormat(date)
        requestBody.contactRank = contactRankValue

        setTimeout(() => {
            getThreatWatchDataValues(requestBody)
            setChartDetail(requestBody.date, getDateFormat(endDateValue))
        }, 100);

    }

    function handleSelectEndDate(date) {
        updateEndDateValue(date)

        let startDate = moment(startDateValue)
        let endDate = moment(date)

        let isBefore = startDate.isBefore(endDate)


        if (isBefore) {
            let requestBody = {}
            requestBody.date = getDateFormat(date)
            requestBody.contactRank = contactRankValue

            setTimeout(() => {
                getThreatWatchDataValues(requestBody)
                setChartDetail(getDateFormat(startDateValue), requestBody.date)
            }, 100);

        }

        else {
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
        getLanguageTranslation(lang).then(res => {
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
        console.log("fgdfgdfg")
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
                                <Row>
                                    <Col lg={7}>
                                        <div className="peopleOnPremisesInnerDiv">
                                            <img src={peopleOnPremisesIcon} />
                                            <span>{getTranslatedText('People on premises')}</span>
                                        </div>

                                    </Col>

                                    <Col lg={5}>
                                        <div className="employeeCountInnerDiv cursor-pointer" onClick={handleEmployeeClick}>
                                            <div className="empCount">{employeeCount}</div>
                                            <div>{getTranslatedText('Employees')}</div>
                                        </div>

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
                        <Col lg={8}>
                            <DashboardChart
                                yAxisTitle={`${titles[indexTitle]} Risk Index`}
                                risk={'low'}
                                chartData={chartData}
                                chartType={titles[indexTitle]}
                            />
                        </Col>
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
                hideSearch={true}
                atRiskEmp={true}
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
                hideSearch={true}
                atRiskEmp={true}
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
