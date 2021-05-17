import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Container, Row, Col } from 'react-bootstrap';
import { CommonHeading } from '../../common/commonHeading';
import '../styles/siteManagement.scss'
import DashboardLanguage from '../../components/dashboardLanguage';
import { selectedPinkArrowIcon, tagIcon } from '../../common/images';
import { getSiteLocations } from '../actionMethods/actionMethods';

import spinnerLoader from '../../assets/images/Spinner Loader.gif'

function SiteMangementList(props) {

    const [dashboardDate, updateDateboardDate] = useState(new Date())
    const [siteLocationsList, updateSiteLocationsList] = useState([])

    const [preDefinedSiteLocationsList, updatePreDefinedSiteLocationList] = useState([])

    const [searchValue, updateSearchValue] = useState('')

    const [isLoading, updateIsLoading] = useState(true)


    useEffect(() => {

        let requestBody = {}
        requestBody.date = moment(dashboardDate).format('YYYY-MM-DD')
        getSiteLocationsValues(requestBody)

    }, []);

    function getSiteLocationsValues(requestBody) {
        getSiteLocations(requestBody).then(res => {
            if (res && res.data) {
               
                updatePreDefinedSiteLocationList(res.data)
                updateSiteLocationsList(res.data)
                updateIsLoading(false)
            }
        })
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
                                <img src={tagIcon} /> {element.category_name}
                                </span> 

                                <span className={ 'eachTag ' + setTagStatus(element.status)}>{element.status}</span>
                                
                            </Col>
                        </Row>

                        <Row className="m-t-lg">
                            <Col lg={4}>
                                <div className="locationNameDiv">{element.name}</div>
                                <div className="nearByLocationDiv">{element.description}</div>
                            </Col>

                            <Col lg={4}>
                                <div className="nearByLocationDiv">Area Index</div>
                                <span className="locationNameDiv">{element.area_index}</span>
                                <span className="indexCircleStatus lowStatus">{element.area_index_status}</span>
                            </Col>

                            <Col lg={3} className="b-l">
                                <div className="nearByLocationDiv">Daily Avg. Footfall</div>
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

    if(isLoading){
        return(
            <div className="text-center m-t-lg">
                <img  src={spinnerLoader} className="m-t-lg" />
            </div>
        )
    }
    else{

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
                                        <h3 className="locationsListing">Locations ({siteLocationsList.length})</h3>
                                    </Col>
                                    <Col lg={4}>
                                        <div className="listingSearchMainDiv">
                                            <input type="text" value={searchValue} name="siteSearch" placeholder="Search..." onChange={(event) => handleSiteLocationSearch(event.target.value)} />
                                        </div>
                                    </Col>
                                </Row>
    
                                <Row>
                                    <Col lg={12}>
                                        <div className="listingRecordMainDiv">
    
                                            {
                                                siteLocationsList && siteLocationsList.length > 0 ?
    
                                                    showCardList(siteLocationsList) : ''
                                            }
    
                                            {
                                                searchValue && siteLocationsList.length == 0 ? 
    
                                                <h3 className="text-center m-t-lg">No Records Found !</h3> : ''
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

}

export default SiteMangementList