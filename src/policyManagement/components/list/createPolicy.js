import React, { useState, useEffect } from 'react'

import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Checkbox, AutoComplete } from 'antd';


import { Container, Row, Col } from 'react-bootstrap';

import '../../../siteManagement/styles/siteManagement.scss'

import '../../styles/createPolicy.scss'

import { getTranslatedText } from '../../../common/utilities';

function CreatePolicy(params) {

    const [options, setOptions] = useState([]);
    const [value, setValue] = useState('');
    const [selectedPolicy, updateSelectedPolicy] = useState('')

    const [policyName, updatePolicyName] = useState('Eating Area Policy')

    const mockVal = (str, repeat = 1) => ({
        value: str.repeat(repeat),
    });


    const onSearch = (searchText) => {
        setOptions(
            !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
        );
    };

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    function handleSelectedPolicy(key) {
        updateSelectedPolicy(key)
    }


    return (
        <div className="siteViewMainDiv siteManagementMainDiv" >
            <Container>
                <Row>
                    <Col lg={6}>
                        <div className="siteViewHeaderDiv">
                            <span className="smallHeader" >{getTranslatedText('Policy Management')}</span>
                            <span className="breadCrumbArrow"> > </span>
                            <span className="mediumHeader">{getTranslatedText('Create New Policy')}</span>
                        </div>
                    </Col>
                </Row>
                <Row className="m-t">
                    <Col lg={12}>
                        <div className="createPolicyMainDiv">
                            <Row>
                                <Col lg={6}>
                                    <h6 className="font-bold">Policy List</h6>
                                    <Row className="m-t">
                                        <Col lg={6}>
                                            <label>Name your policy</label>
                                            <input type="text" value={policyName} />
                                        </Col>

                                        <Col lg={6}>
                                            <label>When will it be active? </label>
                                            <div className="activeSelect">
                                                <select className="m-t-sm" name="cars" id="cars">
                                                    <option value="min">Select Time</option>
                                                    <option value="15min">Option 1</option>
                                                    <option value="20min">Option 2</option>

                                                </select>

                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="m-t">
                                        <Col lg={6}>
                                            <label>Select Area or Category</label>
                                            <AutoComplete
                                                options={options}
                                                style={{ width: '100%' }}
                                                //onSelect={onSelect}
                                                onSearch={onSearch}
                                                placeholder="Select Here..."
                                            />

                                        </Col>

                                        <Col lg={6}>
                                            <label>Selected Areas </label>
                                            <div className="selectedPersonDiv m-t">
                                                <div className="eachSelectedDiv">
                                                    <span>Break Room</span>
                                                    <span className="closeDiv">X</span>
                                                </div>

                                                <div className="eachSelectedDiv">
                                                    <span>Staff Canteen</span>
                                                    <span className="closeDiv">X</span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>


                                    <Row className="m-t">
                                        <Col lg={12}>
                                            <div className="policySpecificationsMainDiv">
                                                <h6 className="font-bold m-b">Policy Specifications</h6>

                                                <div onClick={() => handleSelectedPolicy('Timing')} className={'eachPolicySpecificationMainDiv ' + (selectedPolicy === 'Timing' ? 'activePolicy' : '')}>
                                                    <Row>
                                                        <Col lg={12}>
                                                            <div className="labelDiv">Timing</div>
                                                            <div className="roundDiv"></div>
                                                        </Col>
                                                    </Row>

                                                    {
                                                        selectedPolicy === 'Timing' ?
                                                            <Row className="m-t-sm">
                                                                <Col lg={4}>

                                                                    <div>
                                                                        <input type="text" placeholder="Enter Linger Time" />
                                                                    </div>
                                                                </Col>
                                                                <Col lg={2}>
                                                                    <select className="m-t-sm" name="cars" id="cars">
                                                                        <option value="min">Min</option>
                                                                        <option value="15min">15 Min</option>
                                                                        <option value="20min">20 Min</option>

                                                                    </select>
                                                                </Col>
                                                            </Row> : ''
                                                    }




                                                </div>
                                                <div onClick={() => handleSelectedPolicy('Capacity')} className={'eachPolicySpecificationMainDiv ' + (selectedPolicy === 'Capacity' ? 'activePolicy' : '')}>
                                                    <Row>
                                                        <Col lg={12}>
                                                            <div className="labelDiv">Capacity</div>
                                                            <div className="roundDiv"></div>
                                                        </Col>
                                                    </Row>

                                                    {
                                                        selectedPolicy === 'Capacity' ?
                                                            <Row>
                                                                <Col lg={7}>
                                                                    <div className="capacityViewDiv">
                                                                        <input type="text" placeholder="Enter Capacity" />
                                                                        <div className="plusMinusDiv">
                                                                            <div>+</div>
                                                                            <div>-</div>
                                                                        </div>
                                                                    </div>
                                                                </Col>

                                                            </Row> : ''
                                                    }
                                                </div>

                                                <div onClick={() => handleSelectedPolicy('Accessibility')} className={'eachPolicySpecificationMainDiv ' + (selectedPolicy === 'Accessibility' ? 'activePolicy' : '')}>
                                                    <Row>
                                                        <Col lg={12}>
                                                            <div className="labelDiv">Accessibility</div>
                                                            <div className="roundDiv"></div>
                                                        </Col>
                                                    </Row>

                                                    {
                                                        selectedPolicy === 'Accessibility' ?
                                                            <Row>
                                                                <Col lg={7}>
                                                                    <div>
                                                                        <input type="text" placeholder="Enter Team & Individual to restrict" />
                                                                    </div>
                                                                    <div className="m-t">
                                                                        <Checkbox onChange={onChange}>
                                                                            <span className="text-white">Allow access to only selected</span></Checkbox>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={5}>
                                                                    <div className="selectedPersonDiv m-t">
                                                                        <div className="eachSelectedDiv">
                                                                            <span>John Doe</span>
                                                                            <span className="closeDiv">X</span>
                                                                        </div>

                                                                        <div className="eachSelectedDiv">
                                                                            <span>Spencer</span>
                                                                            <span className="closeDiv">X</span>
                                                                        </div>

                                                                        <div className="eachSelectedDiv">
                                                                            <span>Russel Brunson</span>
                                                                            <span className="closeDiv">X</span>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row> : ''
                                                    }

                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6}>
                                    {
                                        selectedPolicy !== 'Capacity' ?
                                            <div className="addAreaPolicyMainDiv">
                                                <h6 className="text-white">Add area for you policy</h6>
                                                <div className="m-t">
                                                    <div className="eachPolicyAreaMainDiv">
                                                        <div className="addIconDiv">
                                                            <span>+</span>
                                                        </div>
                                                        <div className="">Italian Cafe</div>
                                                        <div className="propsMainDiv m-t-sm">
                                                            <div className="eachPropDiv">Tower 1</div>
                                                            <div className="eachPropDiv">Floor 1</div>
                                                        </div>
                                                    </div>

                                                    <div className="eachPolicyAreaMainDiv">
                                                        <div className="addIconDiv">
                                                            <span>+</span>
                                                        </div>
                                                        <div className="">Italian Cafe</div>
                                                        <div className="propsMainDiv m-t-sm">
                                                            <div className="eachPropDiv">Tower 1</div>
                                                            <div className="eachPropDiv">Floor 1</div>
                                                        </div>
                                                    </div>

                                                    <div className="eachPolicyAreaMainDiv">
                                                        <div className="addIconDiv">
                                                            <span>+</span>
                                                        </div>
                                                        <div className="">Italian Cafe</div>
                                                        <div className="propsMainDiv m-t-sm">
                                                            <div className="eachPropDiv">Tower 1</div>
                                                            <div className="eachPropDiv">Floor 1</div>
                                                        </div>
                                                    </div>

                                                    <div className="eachPolicyAreaMainDiv">
                                                        <div className="addIconDiv">
                                                            <span>+</span>
                                                        </div>
                                                        <div className="">Italian Cafe</div>
                                                        <div className="propsMainDiv m-t-sm">
                                                            <div className="eachPropDiv">Tower 1</div>
                                                            <div className="eachPropDiv">Floor 1</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> : ''
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

export default CreatePolicy