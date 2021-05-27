import React from 'react'
import { Select } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';

import Chart from './areaChart'

const { Option } = Select;

class DashboardChart extends React.Component {

    render() {
        return (
            <React.Fragment>
            <div>
                <Select defaultValue="Day" >
                    <Option value="Day">Day View</Option>
                    {/* <Option value="Week">Week View</Option>
                    <Option value="Hour">Hour View</Option> */}
                </Select>
                <Row>
                    <Col lg={12}>
                    <Chart {...this.props} />
                    </Col>
                </Row>
            

                
            </div>
            </React.Fragment>
        )
    }

}

         
        
export default DashboardChart