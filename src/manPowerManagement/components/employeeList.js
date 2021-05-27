import React, { useState, useEffect } from 'react'

import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";


import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment'
import DashboardLanguage from '../../components/dashboardLanguage';

import '../../siteManagement/styles/siteManagement.scss'
import { selectedPinkArrowIcon, dayShiftImage } from '../../common/images';
import { getEmployeeList } from '../actionMethods/actionMethods';

import spinnerLoader from '../../assets/images/Spinner Loader.gif'
import CommonDatePicker from '../../common/commonDatePicker';
import { getTranslatedText } from '../../common/utilities';
import { getLanguageTranslation, setSelectedLanguage } from '../../dashboard/actionMethods/actionMethods';

function EmployeeList(props) {

    const [searchValue, updateSearchValue] = useState('')
    const [selectedLangValue, updateSelectedLangValue] = useState('en')
    const [employeeList, updateEmployeeList] = useState([])
    const [preDefinedEmployeeList, updatePredefinedEmployeeList] = useState([])
    const [employeeCount, updateEmployeeCount] = useState(0)
    const [isLoading, updateIsLoading] = useState(true)

    const [selectedDate, updateSelectedDate] = useState(new Date())

    let history = useHistory();

    function handleDateSelect(date) {
        updateSelectedDate(date)

        let requestBody = {}
        requestBody.date = getDateFormat(date)
        updateIsLoading(true)
        getEmployeeList(requestBody).then(res => {
            updateIsLoading(false)

            if (res) {
                updateEmployeeCount(res.count)
                updateEmployeeList(res.data)
                updatePredefinedEmployeeList(res.data)
            }
        })

    }

    useEffect(() => {

        let requestBody = {}
        requestBody.date = getDateFormat(selectedDate)
        getEmployeeList(requestBody).then(res => {
            updateIsLoading(false)

            if (res) {
                updateEmployeeCount(res.count)
                updateEmployeeList(res.data)
                updatePredefinedEmployeeList(res.data)
            }
        })

    }, []);

    function getDateFormat(date) {
        return moment(date).format('YYYY-MM-DD')
    }


    function handleManpowerManagementList() {
        history.push('/manpower-management')
    }

    function handleSiteLocationSearch(searchText) {

        let invalid = /[°"§%()[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        let value = searchText.replace(invalid, "")
        let employeeList = preDefinedEmployeeList.filter(function (employeeList) {
            return (employeeList.emp_name.toLowerCase().search(value.toLowerCase()) !== -1)

        })

        updateEmployeeList(employeeList)


        updateSearchValue(searchText)
    }

    function handleClickCard(id) {
        history.push(`/manpower-management/employee-list/view/:${id}`)
    }

    function showShiftType(type) {
        let shiftType = dayShiftImage

        switch (type) {
            case 'day':
                shiftType = dayShiftImage
                break;

            default:
                break;
        }

        return shiftType


    }

    function showCardList(employeeList) {
        let arr = []

        for (let index = 0; index < employeeList.length; index++) {
            const element = employeeList[index]
            arr.push(
                <div className="eachCard" key={index}
                    onClick={() => handleClickCard(element.emp_id)}
                >
                    <div className="card-body" >
                        <Row>
                            <Col lg={3} className="b-r">
                                <h5 className="font-bold">{element.emp_name}</h5>
                                <img src={showShiftType(element.shift)} />
                            </Col>
                            <Col lg={2} className="b-r">
                                <div className="priSriMriText">PRI</div>
                                <h6 className="font-bold">{element.pri_index}</h6>
                            </Col>

                            <Col lg={2} className="b-r">
                                <div className="priSriMriText">SRI</div>
                                <h6 className="font-bold">{element.sri_index}</h6>
                            </Col>

                            <Col lg={2} className="b-r">
                                <div className="priSriMriText">MRI</div>
                                <h6 className="font-bold">{element.mri_index}</h6>
                            </Col>

                            <Col lg={2} className="b-r">
                                <div className="priSriMriText">{getTranslatedText('Status')}</div>
                                <div className="emplStatusDiv">{element.status}</div>
                            </Col>
                            <Col lg={1}>
                                <div className="arrowDiv m-t-md" style={props.hideHeading ? { width: '50%' } : {}}>
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

    useEffect(() => {
        if (props.language) {
            updateSelectedLangValue(props.language)
        }
    }, [props.language])


    return (
        <div className="siteViewMainDiv siteManagementMainDiv" style={props.hideHeading ? { paddingTop: 0, paddingBottom: 0 } : {}}>
            <Container>

                {props.hideHeading ? '' :
                    <Row>
                        <Col lg={6}>
                            <div className="siteViewHeaderDiv">
                                <span className="smallHeader" onClick={handleManpowerManagementList}>{getTranslatedText('Manpower Management')}</span>
                                <span className="breadCrumbArrow"> > </span>
                                <span className="mediumHeader">{getTranslatedText('Employee Listing')}</span>
                            </div>
                        </Col>

                        <Col lg={6} className="text-right">
                            <div className="commonLangaugeStyleDiv">
                                <DashboardLanguage
                                    selectedLangValue={selectedLangValue}
                                    changeLanguage={changeLanguage}
                                />
                            </div>

                            <div className="siteHeadingDatePickerDiv" style={{ width: '20%' }}>
                                <CommonDatePicker
                                    selectedDate={selectedDate}
                                    handleSelectDate={handleDateSelect}
                                />
                            </div>
                        </Col>

                    </Row>}




                <Row className={props.hideHeading ? '' : 'm-t'}>
                    <Col lg={12}>
                        <div className={'siteListMainDiv ' + (props.hideHeading ? 'p-l-0 p-r-0' : '')} style={props.hideHeading ? { paddingTop: 0, paddingBottom: 0 } : {}}>

                            {
                                props.hideHeading ? '' :

                                    <Row>
                                        <Col lg={8} >
                                            <h3 className="locationsListing">{getTranslatedText('Employees')} ({employeeList.length})</h3>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="listingSearchMainDiv">
                                                <input type="text" value={searchValue} name="siteSearch" placeholder="Search..." onChange={(event) => handleSiteLocationSearch(event.target.value)} />
                                            </div>
                                        </Col>
                                    </Row>


                            }


                            < Row >
                                <Col lg={12} className={props.hideHeading ? 'p-l-0 p-r-0' : ''}>
                                    <div className="listingRecordMainDiv">

                                        {
                                            isLoading ?

                                                <div className="text-center m-t-lg">
                                                    <img src={spinnerLoader} className="m-t-lg" />
                                                </div> :
                                                employeeList && employeeList.length > 0 ?

                                                    showCardList(employeeList) : ''
                                        }



                                        {
                                            searchValue && employeeList.length == 0 ?

                                                <h3 className="text-center m-t-lg">No Records Found !</h3> : ''
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div >
    )
}

const mapStateToProps = (state) => ({
    language: state.dashboard.selectedLangaugeValue
})

export default connect(mapStateToProps, { setSelectedLanguage })(withRouter(EmployeeList))
