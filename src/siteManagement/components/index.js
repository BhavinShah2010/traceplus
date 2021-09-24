import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { Container, Row, Col } from 'react-bootstrap';
import { CommonHeading } from '../../common/commonHeading';
import '../styles/siteManagement.scss'
import DashboardLanguage from '../../components/dashboardLanguage';


import selectedPinkArrowIcon from '../../assets/traceplusImages/pink_right_arrow_icon.svg'
import filterIcon from '../../assets/traceplusImages/filter.png'
import tagIcon from '../../assets/traceplusImages/tag_icon.svg'
import { getSiteLocations } from '../actionMethods/actionMethods';

import spinnerLoader from '../../assets/images/Spinner Loader.gif'
import helpIcon from '../../assets/traceplusImages/help-icon.png'
import CommonDatePicker from '../../common/commonDatePicker';

import '../../dashboard/styles/dashboard.scss'
import { getTranslatedText } from '../../common/utilities';
import { getLanguageTranslation, setSelectedLanguage } from '../../dashboard/actionMethods/actionMethods';

function SiteMangementList(props) {
    let date = localStorage.getItem('selectedDate') ? new Date(localStorage.getItem('selectedDate')) : new Date()

    const [siteLocationsList, updateSiteLocationsList] = useState([])

    const [preDefinedSiteLocationsList, updatePreDefinedSiteLocationList] = useState([])
    const [selectedLangValue, updateSelectedLangValue] = useState('en')

    const [searchValue, updateSearchValue] = useState('')
    const [selectedDate, updateSelectedDate] = useState(date)
    const [isLoading, updateIsLoading] = useState(true)

    let userDetails = JSON.parse(localStorage.getItem('userLoginDetails'))

    let userSession = userDetails ? userDetails.session : '123456789'

    let org_id = userDetails ? userDetails.org_id : 6



    useEffect(() => {

        let requestBody = {}
        requestBody.date = getDateFormat(selectedDate)
        getSiteLocationsValues(requestBody)

    }, []);

    function getSiteLocationsValues(requestBody) {
        updateIsLoading(true)
        getSiteLocations(requestBody, userSession, org_id).then(res => {
            if (res && res.data) {

                updatePreDefinedSiteLocationList(res.data)
                updateSiteLocationsList(res.data)
                updateIsLoading(false)
            }
        })
    }

    function handleDateSelect(date) {
        updateSelectedDate(date)
        //updateThreatWatchColor('')

        let requestBody = {}
        requestBody.date = getDateFormat(date)
        getSiteLocationsValues(requestBody)
    }

    function getDateFormat(date) {
        return moment(date).format('YYYY-MM-DD')
    }


    function handleClickCard(id) {
        props.history.push(`/site-list/view/:${id}`)
    }

    function setTagStatus(status) {

        let statusValue = ''

        switch (status) {
            case "Overcrowded":
                statusValue = 'overCrowdedGradientColor'
                break;

            case "Normal":
                statusValue = 'normalGradientColor'
                break;

            case "Crowded":
                statusValue = 'crowdedGradientColor'
                break;

            default:
                break;
        }

        return statusValue
    }


    function handleSiteLocationSearch(searchText) {

        let invalid = /[°"§%()[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        let value = searchText.replace(invalid, "")
        let siteLocationsList = preDefinedSiteLocationsList.filter(function (siteList) {
            return (siteList.name.toLowerCase().search(value.toLowerCase()) !== -1
                // || (siteList.status.toLowerCase().search(value.toLowerCase()) !== -1) 
                // || (siteList.category_name.toLowerCase().search(value.toLowerCase()) !== -1
            )

        })

        updateSiteLocationsList(siteLocationsList)


        updateSearchValue(searchText)
    }

    function showCardList(siteLocationsList) {
        let arr = []

        for (let index = 0; index < siteLocationsList.length; index++) {
            const element = siteLocationsList[index]
            arr.push(
                <div className="eachCard" key={index} onClick={() => handleClickCard(element.id)}>
                    <div className="card-body">
                        {/* <Row>
                            <Col lg={12}>
                                <span className="eachTag text-left">
                                    <img src={tagIcon} /> {getTranslatedText(element.category_name)}
                                </span>

                                <span className={'eachTag ' + setTagStatus(element.status)}>
                                    {getTranslatedText(element.status)}
                                </span>

                            </Col>
                        </Row> */}

                        <Row style={{ alignItems: 'center' }}>
                            <Col lg={4}>
                                <div className="locationNameDiv">{getTranslatedText(element.name)}</div>
                                <div className="nearByLocationDiv"><b>Tag: </b>{element.tag_serial}</div>
                                {/* <div className="nearByLocationDiv">{getTranslatedText(element.description)}</div> */}
                            </Col>

                            <Col lg={2} className="b-l">
                                <div className="nearByLocationDiv">{getTranslatedText('Area Index')}</div>
                                <span className="locationNameDiv">{element.area_index}</span>
                                {/* <span className="indexCircleStatus lowStatus">{element.area_index_status}</span> */}
                            </Col>

                            <Col lg={2} className="b-l">
                                <div className="nearByLocationDiv">Risk</div>
                                <div className='riskDiv'>{'Visited'}</div>
                            </Col>

                            <Col lg={2} className="b-l">
                                <div className="nearByLocationDiv">Activated</div>
                                <span className="locationNameDiv">{element.activatedOn || '22/08/2021'}</span>
                            </Col>

                            <Col lg={1} style={{ marginLeft: 'auto' }}>
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

    function changeLanguage(lang) {
        getLanguageTranslation(lang).then(res => {
            if (res && res.status >= 200 && res.status <= 200) {
                localStorage.setItem('languageData', JSON.stringify(res.data))
                localStorage.setItem('selectedLanguage', lang)
                props.setSelectedLanguage(lang)

            }
        })
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

    useEffect(() => {
        if (props.language) {
            updateSelectedLangValue(props.language)
        }
    }, [props.language])

    function handleSiteManagement() {
        props.history.push('/site-management')
    }


    return (
        <div className="dashboardComponentMainDiv siteManagementMainDiv" style={props.hideHeading ? { padding: '0' } : {}}>
            <Container >

                {
                    props.hideHeading ? '' :
                        <Row>
                            <Col lg={6} >
                                <div className="siteViewHeaderDiv">
                                    <span className="smallHeader" onClick={handleSiteManagement}>{getTranslatedText('Site Management')}</span>
                                    <span className="breadCrumbArrow"> > </span>
                                    <span className="mediumHeader">{getTranslatedText('Site Listing')}</span>
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
                }


                {

                    <Row className={props.hideHeading ? '' : 'm-t'}>
                        <Col lg={12}>
                            <div className={'siteListMainDiv ' + (props.hideHeading ? 'p-l-0 p-r-0' : '')} style={props.hideHeading ? { paddingTop: 0, paddingBottom: 0 } : {}}>
                                <Row>
                                    {
                                        props.isBubbleView ? '' :
                                            <Col lg={8} >
                                                <h3 className="locationsListing">
                                                    {props.title ? props.title : getTranslatedText('Locations')}
                                                    &nbsp;({siteLocationsList.length})
                                                </h3>
                                            </Col>
                                    }
                                    {
                                        props.hideSearch ? '' :
                                            <Col lg={4}>
                                                <div className="listingSearchMainDiv">
                                                    <input type="text" value={searchValue} name="siteSearch" placeholder="Search..." onChange={(event) => handleSiteLocationSearch(event.target.value)} />
                                                </div>
                                            </Col>
                                    }
                                </Row>

                                {
                                    props.isBubbleView ?
                                        <Row>
                                            <Col lg={12}>
                                                <div className="bubbleViewLocationsMainDiv">
                                                    <Row>
                                                        <Col lg={4}>
                                                            <h5 className="font-bold m-b-xs">Locations</h5>
                                                            <div className="dateText ">As of {moment(props.selectedDate).format('Do MMM YYYY')}</div>
                                                        </Col>
                                                        <Col lg={8}>
                                                            <div className="pinnedHighRiskMainDiv">
                                                                <div className="eachTabDiv activeTab">
                                                                    <span> Pinned</span>
                                                                    <div className="numberDiv">12</div>
                                                                </div>
                                                                <div className="eachTabDiv">
                                                                    <span>High Risk</span>
                                                                    <div className="numberDiv">9</div>
                                                                </div>
                                                                <div className="filterDiv">
                                                                    Filter
                                                                    <img src={filterIcon} />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row> : ''
                                }


                                {
                                    isLoading ?
                                        <div className="text-center m-t-lg">
                                            <img src={spinnerLoader} className="m-t-lg" />
                                        </div>
                                        :
                                        <React.Fragment>
                                            <Row>
                                                <Col lg={12}>
                                                    <div className="listingRecordMainDiv" style={props.isBubbleView ? { padding: '0rem 1rem' } : {}}>
                                                        <div className="eachCard" >
                                                            <div className="card-body">
                                                                <Row>
                                                                    <Col lg={4}>
                                                                        <strong>Tags/Location</strong>
                                                                        <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`locationHelp`)} onMouseLeave={() => handleMouseLeave(`locationHelp`)} />
                                                                        <div className='descHelp' id='locationHelp'>Tag assigned to this Location</div>                                                                        
                                                                    </Col>
                                                                    <Col lg={2} className="b-l">
                                                                        <strong>Area Index</strong>
                                                                        <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`areaHelp`)} onMouseLeave={() => handleMouseLeave(`areaHelp`)} />
                                                                        <div className='descHelp' id='areaHelp'>Area Index of the location at the selected date</div>
                                                                    </Col>
                                                                    <Col lg={2} className="b-l">
                                                                        <strong>At Risk</strong>
                                                                        <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`riskHelp`)} onMouseLeave={() => handleMouseLeave(`riskHelp`)} />
                                                                        <div className='descHelp' id='riskHelp'>If the status is “Visited” this location has been visited by a Positive Case at the selected date</div>
                                                                    </Col>
                                                                    <Col lg={2}>
                                                                        <strong>Activated</strong>
                                                                        <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`activatedHelp`)} onMouseLeave={() => handleMouseLeave(`activatedHelp`)} />
                                                                        <div className='descHelp' id='activatedHelp'>Date of activation for this Location Tags</div>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </div>
                                                        {
                                                            siteLocationsList && siteLocationsList.length > 0 ?
                                                                showCardList(siteLocationsList) : ''
                                                        }
                                                        {
                                                            searchValue && siteLocationsList.length == 0 ?
                                                                <h3 className="text-center m-t-lg">No Site List Found !</h3> : ''
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                        </React.Fragment>
                                }

                            </div>
                        </Col>
                    </Row>
                }
            </Container>
        </div>
    )


}

const mapStateToProps = (state) => ({
    language: state.dashboard.selectedLangaugeValue
})

export default connect(mapStateToProps, { setSelectedLanguage })(withRouter(SiteMangementList))
