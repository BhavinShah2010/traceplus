import React from 'react'
import { Select } from 'antd';


const { Option } = Select;

class DashboardChart extends React.Component {

    render() {
        return (
            <Select defaultValue="Day" >
                <Option value="Day">Day View</Option>
                <Option value="Week">Week View</Option>
                <Option value="Hour">Hour View</Option>
            </Select>

        )
    }

}

export default DashboardChart