import React, { useState, useEffect } from 'react'

import { useHistory, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment'
import DashboardLanguage from '../../components/dashboardLanguage';

import '../../siteManagement/styles/siteManagement.scss'

import { getEmployeeList } from '../actionMethods/actionMethods';

import selectedPinkArrowIcon from '../../assets/traceplusImages/pink_right_arrow_icon.svg'
import helpIcon from '../../assets/traceplusImages/help-icon.png'
import sortIcon from '../../assets/traceplusImages/sort.png'
import upIcon from '../../assets/traceplusImages/up-arrow.png'
import downIcon from '../../assets/traceplusImages/down-arrow.png'
import dayShiftImage from '../../assets/traceplusImages/sun.svg'


import spinnerLoader from '../../assets/images/Spinner Loader.gif'
import CommonDatePicker from '../../common/commonDatePicker';
import { getTranslatedText } from '../../common/utilities';
import { getLanguageTranslation, setSelectedLanguage } from '../../dashboard/actionMethods/actionMethods';

function EmployeeList(props) {
    let date = localStorage.getItem('selectedDate') ? new Date(localStorage.getItem('selectedDate')) : new Date()

    const [searchValue, updateSearchValue] = useState('')
    const [selectedLangValue, updateSelectedLangValue] = useState('en')
    const [employeeList, updateEmployeeList] = useState([])
    const [preDefinedEmployeeList, updatePredefinedEmployeeList] = useState([])
    const [employeeCount, updateEmployeeCount] = useState(0)
    const [isLoading, updateIsLoading] = useState(true)
    const [sortKey, setSortKey] = useState('')
    const [sortType, setSortType] = useState('')

    const [selectedDate, updateSelectedDate] = useState(date)
    let userDetails = JSON.parse(localStorage.getItem('userLoginDetails'))
    let userSession = userDetails ? userDetails.session : '123456789'
    let org_id = userDetails ? userDetails.org_id : 6

    let history = useHistory();

    function handleDateSelect(date) {
        updateSelectedDate(date)

        let requestBody = {}
        requestBody.date = getDateFormat(date)
        updateIsLoading(true)
        getEmployeeList(requestBody, userSession, org_id).then(res => {
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
        getEmployeeList(requestBody, userSession, org_id).then(res => {
            updateIsLoading(false)

            if (res) {
                updateEmployeeCount(res.count)
                updateEmployeeList(res.data)
                updatePredefinedEmployeeList(res.data)
            }
        })

    }, []);

    useEffect(() => {
        if (props.date) {
            let requestBody = {}
            requestBody.date = getDateFormat(props.date)
            updateIsLoading(true)
            getEmployeeList(requestBody, userSession, org_id).then(res => {
                updateIsLoading(false)

                if (res) {
                    updateEmployeeCount(res.count)
                    updateEmployeeList(res.data)
                    updatePredefinedEmployeeList(res.data)
                }
            })
        }
    }, [props.date]);

    function getDateFormat(date) {
        return moment(date).format('YYYY-MM-DD')
    }

    function handleManpowerManagementList() {
        history.push('/manpower-management')
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

    function getBackgroundCOlor(index, activated) {
        let color = ''

        if (!activated) {
            color = '#EBECED'
        } else if (index === 0) {
            color = '#f9e1e8'
        }

        return color
    }


    function showCardList(employeeList) {
        let arr = []

        for (let index = 0; index < employeeList.length; index++) {
            const element = employeeList[index]
            arr.push(
                <div className="eachCard" key={index}
                    onClick={() => handleClickCard(element.emp_id)}
                >
                    <div className="card-body" style={{ backgroundColor: getBackgroundCOlor(element.sri_index, '22/08/2021') }}>
                        <Row style={{ alignItems: 'center' }}>
                            <Col lg={3} className="b-r">
                                <h5 className="font-bold">{element.emp_name}</h5>
                                <div><b>Team:</b> {element.department}</div>
                                <div><b>Tag:</b> {element.tag_id}</div>
                                {/* <img src={showShiftType(element.shift)} /> */}
                            </Col>
                            <Col lg={2} className="b-r">
                                <div className="priSriMriText">Interactions</div>
                                <h6 className="font-bold">{element.sri_index}</h6>
                            </Col>

                            <Col lg={2} className="b-r">
                                <div className="priSriMriText">Battery</div>
                                <h6 className="font-bold">{element.battery || '100%'}</h6>
                            </Col>

                            <Col lg={2} className="b-r">
                                <div className="priSriMriText">Activated</div>
                                <h6 className="font-bold">{element.activatedOn || '22/08/2021'}</h6>
                            </Col>

                            {/* <Col lg={2} className="b-r">
                                <div className="priSriMriText">{getTranslatedText('Status')}</div>
                                <div className="emplStatusDiv">{element.status}</div>
                            </Col> */}
                            <Col lg={1} style={{ marginLeft: 'auto' }}>
                                <div className="arrowDiv" style={props.hideHeading ? { width: '50%' } : {}}>
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

    useEffect(() => {
        if (preDefinedEmployeeList.length) {
            updateIsLoading(true)

            let arr = [...preDefinedEmployeeList]

            if (searchValue) {
                let invalid = /[°"§%()[\]{}=\\?´`'#<>|,;.:+_-]+/g;
                let value = searchValue.replace(invalid, "")
                arr = arr.filter(function (employeeList) {
                    return (employeeList.emp_name.toLowerCase().search(value.toLowerCase()) !== -1)
                })
            }

            if (sortKey === 'employee') {
                arr = arr.sort((a, b) => {
                    a = a.emp_name.toUpperCase()
                    b = b.emp_name.toUpperCase()

                    return sortType === 'desc' ? (a == b ? 0 : b > a ? 1 : -1) : (a == b ? 0 : a > b ? 1 : -1)
                })
            } else if (sortKey === 'interaction') {
                arr = arr.sort((a, b) => {
                    return sortType === 'desc' ? b.sri_index - a.sri_index : a.sri_index - b.sri_index
                })
            }

            updateEmployeeList(arr)
            updateIsLoading(false)
        }
    }, [sortKey, sortType, searchValue])

    const handleSort = (key) => {
        setSortKey(key)
        setSortType(sortType === 'desc' ? 'asc' : 'desc')
    }

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

                    </Row>
                }

                <Row className={props.hideHeading ? '' : 'm-t'}>
                    <Col lg={12}>
                        <div className={'siteListMainDiv ' + (props.hideHeading ? 'p-l-0 p-r-0' : '')} style={props.hideHeading ? { paddingTop: 0, paddingBottom: 0 } : {}}>
                            <Row style={{ alignItems: 'center' }}>
                                <Col lg={props.selectedTab ? 4 : 8} className={props.hideHeading ? 'p-l-0' : ''}>
                                    <h3 className="locationsListing">
                                        {props.title ? props.title : getTranslatedText('Employees')}
                                        &nbsp;({employeeList && employeeList.length})
                                    </h3>
                                </Col>

                                {props.selectedTab &&
                                    <Col lg={4}>
                                        <div className="empTeamTabMainDiv" style={{ float: 'right' }}>
                                            <div className={'eachTab ' + (props.selectedTab == 'employees' ? 'activeTabBG' : '')} onClick={() => props.handleTabViewChange('employees')}>{getTranslatedText('Employees')}</div>
                                            <div className={'eachTab ' + (props.selectedTab == 'teams' ? 'activeTabBG' : '')} onClick={() => props.handleTabViewChange('teams')}>{getTranslatedText('Teams')}</div>
                                        </div>
                                    </Col>
                                }

                                {props.hideSearch ? '' :
                                    <Col lg={4} className={props.hideHeading ? 'p-r-0' : ''}>
                                        <div className="listingSearchMainDiv">
                                            <input type="text" value={searchValue} name="siteSearch" placeholder="Search" onChange={(event) => updateSearchValue(event.target.value)} />
                                        </div>
                                    </Col>
                                }
                            </Row>

                            < Row >
                                <Col lg={12} className={props.hideHeading ? 'p-l-0 p-r-0' : ''}>
                                    <div className="listingRecordMainDiv">
                                        {isLoading ?
                                            <div className="text-center m-t-lg">
                                                <img src={spinnerLoader} className="m-t-lg" />
                                            </div> :
                                            employeeList && employeeList.length > 0 ?
                                                <React.Fragment>
                                                    <div className="eachCard" >
                                                        <div className="card-body">
                                                            <Row>
                                                                <Col lg={3} className='flexDiv'>
                                                                    <strong>Assigned Employee</strong>
                                                                    <img alt='' className='helpicon' src={helpIcon} onMouseEnter={() => handleMouseEnter(`employeeHelp`)} onMouseLeave={() => handleMouseLeave(`employeeHelp`)} />
                                                                    <img
                                                                        alt=''
                                                                        className='sorticon'
                                                                        src={sortKey === 'employee' ? sortType === 'asc' ? upIcon : downIcon : sortIcon}
                                                                        onClick={() => handleSort('employee')}
                                                                    />
                                                                    <div className='descHelp' id='employeeHelp'>Assigned employee to this Personal Tags. If there are no assigned employees for this tag, the name is “----”</div>
                                                                </Col>
                                                                <Col lg={2} className="flexDiv b-l">
                                                                    <strong>Interactions</strong>
                                                                    <img alt='' src={helpIcon} className='helpicon' onMouseEnter={() => handleMouseEnter(`interactionHelp`)} onMouseLeave={() => handleMouseLeave(`interactionHelp`)} />
                                                                    <img
                                                                        alt=''
                                                                        className='sorticon'
                                                                        src={sortKey === 'interaction' ? sortType === 'asc' ? upIcon : downIcon : sortIcon}
                                                                        onClick={() => handleSort('interaction')}
                                                                    />
                                                                    <div className='descHelp' id='interactionHelp'>Number of recorded Interactions at the selected date</div>
                                                                </Col>
                                                                <Col lg={2} className="flexDiv b-l">
                                                                    <strong>Battery</strong>
                                                                    <img alt='' src={helpIcon} className='helpicon' onMouseEnter={() => handleMouseEnter(`batteryHelp`)} onMouseLeave={() => handleMouseLeave(`batteryHelp`)} />
                                                                    <img
                                                                        alt=''
                                                                        className='sorticon'
                                                                        src={sortKey === 'battery' ? sortType === 'asc' ? upIcon : downIcon : sortIcon}
                                                                        onClick={() => handleSort('battery')}
                                                                    />
                                                                    <div className='descHelp' id='batteryHelp'>Battery Status of the Tag</div>
                                                                </Col>
                                                                <Col lg={2} className='flexDiv b-l'>
                                                                    <strong>Activated</strong>
                                                                    <img alt='' src={helpIcon} className='helpicon' onMouseEnter={() => handleMouseEnter(`activatedHelp`)} onMouseLeave={() => handleMouseLeave(`activatedHelp`)} />
                                                                    <img
                                                                        alt=''
                                                                        className='sorticon'
                                                                        src={sortKey === 'activated' ? sortType === 'asc' ? upIcon : downIcon : sortIcon}
                                                                        onClick={() => handleSort('activated')}
                                                                    />
                                                                    <div className='descHelp' id='activatedHelp'>Date of activation for this Personal Tags</div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>

                                                    <Scrollbars autoHide style={{ width: '100%', height: window.innerHeight - 280 }}>
                                                        {showCardList(employeeList)}
                                                    </Scrollbars>
                                                </React.Fragment>
                                                : ''
                                        }

                                        {searchValue && employeeList.length == 0 ?
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
