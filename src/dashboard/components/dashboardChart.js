import React from 'react'
import { Select } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';


const { Option } = Select;

class DashboardChart extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Select defaultValue="Day" >
                    <Option value="Day">Day View</Option>
                    <Option value="Week">Week View</Option>
                    <Option value="Hour">Hour View</Option>
                </Select>
                <Row>
                    <Col lg={12}>
                        <h3 className="text-center m-l-md m-t-md">Dashboart Chart</h3>
                    </Col>
                </Row>
            </React.Fragment>

                )
            }
        
        }
        
export default DashboardChart