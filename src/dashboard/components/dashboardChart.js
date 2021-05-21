import React from 'react'
import { Select } from 'antd';
import Chart from './areaChart'

const { Option } = Select;

class DashboardChart extends React.Component {

    render() {
        return (
            <div>
                <Select defaultValue="Day" >
                    <Option value="Day">Day View</Option>
                    <Option value="Week">Week View</Option>
                    <Option value="Hour">Hour View</Option>
                </Select>

                <Chart {...this.props} />
            </div>
        )
    }

}

export default DashboardChart