import React, { useState, useEffect } from 'react'

import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment'
import DashboardLanguage from '../../components/dashboardLanguage';

import '../../siteManagement/styles/siteManagement.scss'
import { selectedPinkArrowIcon, dayShiftImage } from '../../common/images';
import { getEmployeeList } from '../actionMethods/actionMethods';

function EmployeeList(props) {

    const [searchValue, updateSearchValue] = useState('')
    const [employeeList, updateEmployeeList] = useState([])
    const [preDefinedEmployeeList, updatePredefinedEmployeeList] = useState([])
    const [employeeCount, updateEmployeeCount] = useState(0)

    const [dashboardDate, updateDateboardDate] = useState(new Date())

    useEffect(() => {

        let requestBody = {}
        requestBody.date = moment(dashboardDate).format('YYYY-MM-DD')
        getEmployeeList(requestBody).then(res => {
            

            if (res) {
                updateEmployeeCount(res.count)
                updateEmployeeList(res.data)
                updatePredefinedEmployeeList(res.data)
            }
        })

    }, []);

    function handleManpowerManagementList() {
        props.history.push('/manpower-management')
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
        console.log("Log : ", id)
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
                                <div className="priSriMriText">Status</div>
                                <div className="emplStatusDiv">{element.status}</div>
                            </Col>
                            <Col lg={1}>
                                <div className="arrowDiv m-t-l">
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

    

    return (
        <div className="siteViewMainDiv siteManagementMainDiv">
            <Container>
                <Row>
                    <Col lg={6}>
                        <div className="siteViewHeaderDiv">
                            <span className="smallHeader" onClick={handleManpowerManagementList}>Manpower Management</span>
                            <span className="breadCrumbArrow"> > </span>
                            <span className="mediumHeader">Employee Listing</span>
                        </div>
                    </Col>
                    <Col lg={6} className="text-right ">
                        <div className="dashboardLanguageMainDiv m-t-sm">
                            <DashboardLanguage />
                        </div>
                    </Col>
                </Row>

                <Row className="m-t">
                    <Col lg={12}>
                        <div className="siteListMainDiv">
                            <Row>
                                <Col lg={8} >
                                    <h3 className="locationsListing">Employees ({employeeList.length})</h3>
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
        </div>
    )
}

export default EmployeeList