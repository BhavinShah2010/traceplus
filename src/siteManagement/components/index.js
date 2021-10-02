import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';

import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { CommonHeading } from '../../common/commonHeading';
import '../styles/siteManagement.scss'
import DashboardLanguage from '../../components/dashboardLanguage';


import selectedPinkArrowIcon from '../../assets/traceplusImages/pink_right_arrow_icon.svg'
import filterIcon from '../../assets/traceplusImages/filter.png'
import { getSiteLocations } from '../actionMethods/actionMethods';

import spinnerLoader from '../../assets/images/Spinner Loader.gif'
import helpIcon from '../../assets/traceplusImages/help-icon.png'
import sortIcon from '../../assets/traceplusImages/sort.png'
import upIcon from '../../assets/traceplusImages/up-arrow.png'
import downIcon from '../../assets/traceplusImages/down-arrow.png'
import CommonDatePicker from '../../common/commonDatePicker';
import BarChart from './barChart'

import '../../dashboard/styles/dashboard.scss'
import { getTranslatedText } from '../../common/utilities';
import { getLanguageTranslation, setSelectedLanguage } from '../../dashboard/actionMethods/actionMethods';

function SiteMangementList(props) {
    let date = localStorage.getItem('selectedDate') ? new Date(localStorage.getItem('selectedDate')) : new Date()

    const [siteLocationsList, updateSiteLocationsList] = useState([])
    const [preDefinedSiteLocationsList, updatePreDefinedSiteLocationList] = useState([])
    const [selectedLangValue, updateSelectedLangValue] = useState('en')
    const [searchValue, updateSearchValue] = useState('')
    const [globalSearch, setGlobalSearch] = useState('')
    const [globalCategory, setGlobalCategory] = useState('Location')
    const [suggestions, setSuggestions] = useState([])
    const [selectedDate, updateSelectedDate] = useState(date)
    const [isLoading, updateIsLoading] = useState(true)
    const [sortKey, setSortKey] = useState('')
    const [sortType, setSortType] = useState('')
    const [activetab, setActiveTab] = useState('All')

    let userDetails = JSON.parse(localStorage.getItem('userLoginDetails'))
    let userSession = userDetails ? userDetails.session : '123456789'
    let org_id = userDetails ? userDetails.org_id : 6
    let reqId = null

    useEffect(() => {
        let requestBody = {}
        requestBody.date = getDateFormat(selectedDate)
        getSiteLocationsValues(requestBody)
    }, []);

    useEffect(() => {
        if (siteLocationsList.length) {
            reqId = setTimeout(() => {
                let arr = siteLocationsList.filter((e) => e.name.toLowerCase().search(globalSearch.toLowerCase()) !== -1)
                setSuggestions(arr)
            }, 300);

            return () => {
                clearTimeout(reqId)
            }
        }
    }, [globalSearch])

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

    function getColor(element) {
        if (!element.area_index || !element.avg_footfall) {
            return '#f9e1e8'
        }

        return ''
    }

    function showCardList() {
        let arr = []

        for (let index = 0; index < siteLocationsList.length; index++) {
            const element = siteLocationsList[index]
    
            arr.push(
                <div className="eachCard" key={index} style={{ backgroundColor: getColor(element) }} onClick={() => handleClickCard(element.id)}>
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
                        {props.hideGlobalSearch ? 
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

                                <Col lg={2} className="b-l b-r">
                                    <div className="nearByLocationDiv">Activated</div>
                                    <span className="locationNameDiv">{element.activatedOn || '22/08/2021'}</span>
                                </Col>

                                <Col lg={1} style={{ marginLeft: 'auto' }}>
                                    <div className="arrowDiv">
                                        <img src={selectedPinkArrowIcon} />
                                    </div>
                                </Col>
                            </Row>
                            :
                            <Row style={{ alignItems: 'center' }}>
                                <Col lg={2}>
                                    <div className="locationNameDiv">{getTranslatedText(element.name)}</div>
                                    <div className="nearByLocationDiv"><b>Tag: </b>{element.tag_serial}</div>
                                    <div className="nearByLocationDiv">{getTranslatedText(element.category_name)}</div>
                                </Col>

                                <Col lg={2} className="b-l">
                                    <div className="nearByLocationDiv">{getTranslatedText('Area Index')}</div>
                                    <span className="locationNameDiv">{element.area_index}</span>
                                    {/* <span className="indexCircleStatus lowStatus">{element.area_index_status}</span> */}
                                </Col>

                                <Col lg={2} className="b-l">
                                    <div className="nearByLocationDiv">Visit over 15 min</div>
                                    <div className='locationNameDiv'>{element.visit_over_15 || '10'}</div>
                                </Col>

                                <Col lg={2} className="b-l b-r">
                                    <div className="nearByLocationDiv">Avg Footfall</div>
                                    <span className="locationNameDiv">{element.avg_footfall}</span>
                                </Col>

                                <Col lg={2} className="b-l b-r">
                                    <div className="nearByLocationDiv">Interactions</div>
                                    <span className="locationNameDiv">{element.interactions || 100}</span>
                                </Col>

                                <Col lg={2} className="b-l b-r">
                                    <div className="nearByLocationDiv">Last Interaction</div>
                                    <span className="locationNameDiv">{element.last_interaction || '12/09/2021'}</span>
                                </Col>
                            </Row>
                        }
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

    useEffect(() => {
        if (preDefinedSiteLocationsList.length) {
            updateIsLoading(true)

            let arr = [...preDefinedSiteLocationsList]
    
            if (searchValue) {
                let invalid = /[°"§%()[\]{}=\\?´`'#<>|,;.:+_-]+/g;
                let value = searchValue.replace(invalid, "")
                arr = arr.filter(function (siteList) {
                    return (siteList.name.toLowerCase().search(value.toLowerCase()) !== -1)
                })
            }
    
            if (sortKey === 'location') {
                arr = arr.sort((a, b) => {
                    a = a.name.toUpperCase()
                    b = b.name.toUpperCase()
    
                    return sortType === 'desc' ? (a == b ? 0 : b > a ? 1 : -1) : (a == b ? 0 : a > b ? 1 : -1)
                })
            } else if (sortKey === 'area') {
                arr = arr.sort((a, b) => {
                    return sortType === 'desc' ? b.area_index - a.area_index : a.area_index - b.area_index
                })
            }
    
            updateSiteLocationsList(arr)
            updateIsLoading(false)
        }
    }, [sortKey, sortType, searchValue])

    function handleSiteManagement() {
        props.history.push('/site-list')
    }

    const handleSort = (key) => {
        setSortKey(key)
        setSortType(sortType === 'desc' ? 'asc' : 'desc')
    }

    console.log(suggestions)
    return (
        <div className="dashboardComponentMainDiv siteManagementMainDiv" style={props.hideHeading ? { padding: '0' } : {}}>
            <Container >
                {
                    props.hideHeading ? '' :
                        <Row>
                            <Col lg={6} >
                                <div className="siteViewHeaderDiv">
                                    <span className="smallHeader" onClick={handleSiteManagement}>{getTranslatedText('Site Management')}</span>
                                    <span className="breadCrumbArrow"> &gt; </span>
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

                {!props.hideGlobalSearch &&
                    <Row>
                        <Col className='m-t'>
                            <div className='globalSearch'>
                                <input
                                    type='text'
                                    value={globalSearch}
                                    onChange={(e) => setGlobalSearch(e.target.value)}
                                    placeholder={'Search'}
                                />

                                {globalSearch.trim().length ?
                                    <div className="suggestionBox">
                                        {suggestions.length ?
                                            suggestions.map((s, index) => (
                                                <div className='suggestion' key={index} onClick={() => handleClickCard(s.id)} >{s.name}</div>
                                            ))
                                            :
                                            <div className='suggestion'>No {globalCategory} Found</div>
                                        }
                                    </div>
                                    : null
                                }

                                <div className='optionBox'>
                                    <DropdownButton title={globalCategory}>
                                        <Dropdown.Item onClick={(e) => setGlobalCategory(e.target.text)}>Location</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </div>
                        </Col>
                    </Row>
                }

                {!props.hideGlobalSearch &&
                    <Row>
                        <Col>
                            <div className='siteListMainDiv m-t' style={{ backgroundColor: '#202236', padding: '2rem 1.5rem' }} >
                                <div className='chartMainDiv'>
                                    <div className='chart'>
                                        <div className='title'>Location At Risk</div>
                                        <BarChart />
                                    </div>
                                    <div className='chart'>
                                        <div className='title'>Footfall</div>
                                        <BarChart />
                                    </div>
                                    <div className='chart'>
                                        <div className='title'>TBD</div>
                                        <BarChart />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                }

                {
                    <Row className={props.hideHeading ? '' : 'm-t'}>
                        <Col lg={12}>
                            <div className={'siteListMainDiv ' + (props.hideHeading ? 'p-l-0 p-r-0' : '')} style={props.hideHeading ? { paddingTop: 0, paddingBottom: 0 } : {}}>
                                <Row style={{ alignItems: 'center' }}>
                                    {
                                        props.isBubbleView ? '' :
                                            <Col lg={props.hideGlobalSearch ? 8 : 2} >
                                                <h3 className="locationsListing">
                                                    {props.title ? props.title : getTranslatedText('Locations')}
                                                    {props.hideGlobalSearch && (`(${siteLocationsList.length})`)}
                                                </h3>
                                            </Col>
                                    }
                                    {!props.hideGlobalSearch ?
                                        <Col lg={6}>
                                            <div className="locationTabMainDiv" >
                                                <div className={'eachTab ' + (activetab == 'All' ? 'activeTabBG' : '')} onClick={() => setActiveTab('All')}>
                                                    {getTranslatedText('All')}
                                                    <span>{siteLocationsList.length}</span>
                                                </div>
                                                <div className={'eachTab ' + (activetab == 'Visit over 15\'' ? 'activeTabBG' : '')} onClick={() => setActiveTab('Visit over 15\'')}>
                                                    {getTranslatedText('Visit over 15\'')}
                                                    <span>20</span>
                                                </div>
                                                <div className={'eachTab ' + (activetab == 'Overcrowded' ? 'activeTabBG' : '')} onClick={() => setActiveTab('Overcrowded')}>
                                                    {getTranslatedText('Overcrowded')}
                                                    <span>20</span>
                                                </div>
                                                <div className={'eachTab ' + (activetab == 'Crowded' ? 'activeTabBG' : '')} onClick={() => setActiveTab('Crowded')}>
                                                    {getTranslatedText('Crowded')}
                                                    <span>20</span>
                                                </div>
                                            </div>
                                        </Col>
                                        : null
                                    }
                                    {
                                        props.hideSearch ? '' :
                                            <Col lg={4}>
                                                <div className="listingSearchMainDiv">
                                                    <input type="text" value={searchValue} name="siteSearch" placeholder="Search" onChange={(event) => updateSearchValue(event.target.value)} />
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
                                                                {props.hideGlobalSearch ? 
                                                                    <Row>
                                                                        <Col lg={4} className='flexDiv'>
                                                                            <strong>Tags/Location</strong>
                                                                            <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`locationHelp`)} onMouseLeave={() => handleMouseLeave(`locationHelp`)} />
                                                                            <img 
                                                                                alt='' 
                                                                                className='sorticon' 
                                                                                src={sortKey === 'location' ? sortType === 'asc' ? upIcon : downIcon : sortIcon} 
                                                                                onClick={() => handleSort('location')} 
                                                                            />
                                                                            <div className='descHelp' id='locationHelp'>Tag assigned to this Location</div>                                                                        
                                                                        </Col>
                                                                        <Col lg={2} className="b-l flexDiv">
                                                                            <strong>Area Index</strong>
                                                                            <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`areaHelp`)} onMouseLeave={() => handleMouseLeave(`areaHelp`)} />
                                                                            <img
                                                                                alt=''
                                                                                className='sorticon'
                                                                                src={sortKey === 'area' ? sortType === 'asc' ? upIcon : downIcon : sortIcon}
                                                                                onClick={() => handleSort('area')}
                                                                            />
                                                                            <div className='descHelp' id='areaHelp'>Area Index of the location at the selected date</div>
                                                                        </Col>
                                                                        <Col lg={2} className="b-l flexDiv">
                                                                            <strong>At Risk</strong>
                                                                            <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`riskHelp`)} onMouseLeave={() => handleMouseLeave(`riskHelp`)} />
                                                                            {/* <img alt='' className='sorticon' src={sortIcon} /> */}
                                                                            <div className='descHelp' id='riskHelp'>If the status is “Visited” this location has been visited by a Positive Case at the selected date</div>
                                                                        </Col>
                                                                        <Col lg={2} className='b-l b-r flexDiv'>
                                                                            <strong>Activated</strong>
                                                                            <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`activatedHelp`)} onMouseLeave={() => handleMouseLeave(`activatedHelp`)} />
                                                                            <img
                                                                                alt=''
                                                                                className='sorticon'
                                                                                src={sortKey === 'activated' ? sortType === 'asc' ? upIcon : downIcon : sortIcon}
                                                                                onClick={() => handleSort('activated')}
                                                                            />
                                                                            <div className='descHelp' id='activatedHelp'>Date of activation for this Location Tags</div>
                                                                        </Col>
                                                                    </Row>
                                                                    :
                                                                    <Row>
                                                                        <Col lg={2} className='flexDiv'>
                                                                            <strong>Location</strong>
                                                                            <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`locationHelp`)} onMouseLeave={() => handleMouseLeave(`locationHelp`)} />
                                                                            <img 
                                                                                alt='' 
                                                                                className='sorticon' 
                                                                                src={sortKey === 'location' ? sortType === 'asc' ? upIcon : downIcon : sortIcon} 
                                                                                onClick={() => handleSort('location')} 
                                                                            />
                                                                            <div className='descHelp' id='locationHelp'>Tag assigned to this Location</div>                                                                        
                                                                        </Col>
                                                                        <Col lg={2} className="b-l flexDiv">
                                                                            <strong>Area Index</strong>
                                                                            <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`areaHelp`)} onMouseLeave={() => handleMouseLeave(`areaHelp`)} />
                                                                            <img
                                                                                alt=''
                                                                                className='sorticon'
                                                                                src={sortKey === 'area' ? sortType === 'asc' ? upIcon : downIcon : sortIcon}
                                                                                onClick={() => handleSort('area')}
                                                                            />
                                                                            <div className='descHelp' id='areaHelp'>Area Index of the location at the selected date</div>
                                                                        </Col>
                                                                        <Col lg={2} className="b-l flexDiv">
                                                                            <strong>Visit over 15 min</strong>
                                                                            <img
                                                                                alt=''
                                                                                className='helpicon'
                                                                                src={helpIcon}
                                                                                onMouseEnter={() => handleMouseEnter(`visitHelp`)}
                                                                                onMouseLeave={() => handleMouseLeave(`visitHelp`)}
                                                                            />
                                                                            <img
                                                                                alt=''
                                                                                className='sorticon'
                                                                                src={sortKey === 'visitOver15' ? sortType === 'asc' ? upIcon : downIcon : sortIcon}
                                                                                // onClick={() => handleSort('activated')}
                                                                            />
                                                                            <div className='descHelp' id='visitHelp'>Visit over 15 min</div>
                                                                        </Col>
                                                                        <Col lg={2} className='b-l b-r flexDiv'>
                                                                            <strong>Avg Footfall</strong>
                                                                            <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`avgFootfallHelp`)} onMouseLeave={() => handleMouseLeave(`avgFootfallHelp`)} />
                                                                            <img
                                                                                alt=''
                                                                                className='sorticon'
                                                                                src={sortKey === 'avgFootfall' ? sortType === 'asc' ? upIcon : downIcon : sortIcon}
                                                                                // onClick={() => handleSort('activated')}
                                                                            />
                                                                            <div className='descHelp' id='avgFootfallHelp'>Avg. Footfall</div>
                                                                        </Col>
                                                                        <Col lg={2} className='b-l b-r flexDiv'>
                                                                            <strong>Interactions</strong>
                                                                            <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`interactionhelp`)} onMouseLeave={() => handleMouseLeave(`interactionhelp`)} />
                                                                            <img
                                                                                alt=''
                                                                                className='sorticon'
                                                                                src={sortKey === 'interactions' ? sortType === 'asc' ? upIcon : downIcon : sortIcon}
                                                                                // onClick={() => handleSort('activated')}
                                                                            />
                                                                            <div className='descHelp' id='interactionhelp'>Interactions</div>
                                                                        </Col>
                                                                        <Col lg={2} className='b-l b-r flexDiv'>
                                                                            <strong>Last Interaction</strong>
                                                                            <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`lastInteractionHelp`)} onMouseLeave={() => handleMouseLeave(`lastInteractionHelp`)} />
                                                                            <img
                                                                                alt=''
                                                                                className='sorticon'
                                                                                src={sortKey === 'lastInteraction' ? sortType === 'asc' ? upIcon : downIcon : sortIcon}
                                                                                // onClick={() => handleSort('activated')}
                                                                            />
                                                                            <div className='descHelp' id='lastInteractionHelp'>Last Interaction</div>
                                                                        </Col>
                                                                    </Row>
                                                                }
                                                            </div>
                                                        </div>
                                                        {
                                                            siteLocationsList && siteLocationsList.length > 0 ?
                                                                <Scrollbars autoHide style={{ width: '100%', height: window.innerHeight - 280 }}>
                                                                    {showCardList()}
                                                                </Scrollbars>
                                                                : ''
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
