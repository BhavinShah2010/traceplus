import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { Container, Row, Col } from 'react-bootstrap';
import { CommonHeading } from '../../common/commonHeading';
import '../styles/siteManagement.scss'
import DashboardLanguage from '../../components/dashboardLanguage';
import { selectedPinkArrowIcon, tagIcon } from '../../common/images';
import { getSiteLocations } from '../actionMethods/actionMethods';

import spinnerLoader from '../../assets/images/Spinner Loader.gif'
import CommonDatePicker from '../../common/commonDatePicker';

import '../../dashboard/styles/dashboard.scss'
import { getTranslatedText } from '../../common/utilities';
import { getLanguageTranslation, setSelectedLanguage } from '../../dashboard/actionMethods/actionMethods';

function SiteMangementList(props) {


    const [siteLocationsList, updateSiteLocationsList] = useState([])

    const [preDefinedSiteLocationsList, updatePreDefinedSiteLocationList] = useState([])
    const [selectedLangValue, updateSelectedLangValue] = useState('en')

    const [searchValue, updateSearchValue] = useState('')
    const [selectedDate, updateSelectedDate] = useState(new Date())
    const [isLoading, updateIsLoading] = useState(true)


    useEffect(() => {

        let requestBody = {}
        requestBody.date = getDateFormat(selectedDate)
        getSiteLocationsValues(requestBody)

    }, []);

    function getSiteLocationsValues(requestBody) {
        updateIsLoading(true)
        getSiteLocations(requestBody).then(res => {
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
            return (siteList.name.toLowerCase().search(value.toLowerCase()) !== -1) || (siteList.status.toLowerCase().search(value.toLowerCase()) !== -1) || (siteList.category_name.toLowerCase().search(value.toLowerCase()) !== -1)

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
                        <Row>
                            <Col lg={12}>
                                <span className="eachTag">
                                    <img src={tagIcon} /> {getTranslatedText(element.category_name)}
                                </span>

                                <span className={'eachTag ' + setTagStatus(element.status)}>
                                    {getTranslatedText(element.status)}
                                </span>

                            </Col>
                        </Row>

                        <Row className="m-t-lg">
                            <Col lg={4}>
                                <div className="locationNameDiv">{getTranslatedText(element.name)}</div>
                                <div className="nearByLocationDiv">{getTranslatedText(element.description)}</div>
                            </Col>

                            <Col lg={4}>
                                <div className="nearByLocationDiv">{getTranslatedText('Area Index')}</div>
                                <span className="locationNameDiv">{element.area_index}</span>
                                <span className="indexCircleStatus lowStatus">{element.area_index_status}</span>
                            </Col>

                            <Col lg={3} className="b-l">
                                <div className="nearByLocationDiv">{getTranslatedText('Daily Avg Footfall ')}</div>
                                <div className="locationNameDiv">{element.avg_footfall}</div>
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

    function changeLanguage(lang) {
        getLanguageTranslation(lang).then(res => {
            if (res && res.status >= 200 && res.status <= 200) {
                localStorage.setItem('languageData', JSON.stringify(res.data))
                localStorage.setItem('selectedLanguage', lang)
                props.setSelectedLanguage(lang)

            }
        })
    }

    useEffect (() =>{
        if(props.language){
            updateSelectedLangValue(props.language)
        }
    }, [props.language])



    return (
        <div className="dashboardComponentMainDiv siteManagementMainDiv">
            <Container >
                <Row>
                    <Col lg={6} >
                        <div className="siteViewHeaderDiv">
                            <span className="smallHeader">{getTranslatedText('Site Management')}</span>
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

                {

                    <Row className="m-t">
                        <Col lg={12}>
                            <div className="siteListMainDiv">
                                <Row>
                                    <Col lg={8} >
                                        <h3 className="locationsListing">{getTranslatedText('Locations')} ({siteLocationsList.length})</h3>
                                    </Col>
                                    <Col lg={4}>
                                        <div className="listingSearchMainDiv">
                                            <input type="text" value={searchValue} name="siteSearch" placeholder="Search..." onChange={(event) => handleSiteLocationSearch(event.target.value)} />
                                        </div>
                                    </Col>
                                </Row>

                                {
                                    isLoading ? <div className="text-center m-t-lg">
                                        <img src={spinnerLoader} className="m-t-lg" />
                                    </div> :
                                        <Row>
                                            <Col lg={12}>
                                                <div className="listingRecordMainDiv">

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
