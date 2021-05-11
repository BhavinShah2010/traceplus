import React from 'react'
import { Select } from 'antd';


const { Option } = Select;



function DashboardLanguage(props) {
    return (
        <div className="commonLanguageDropDownDiv">
            <Select defaultValue="English" >
                <Option value="English">English</Option>
                <Option value="Thai">Thai</Option>
                <Option value="Vietenamese">Vietenamese</Option>
            </Select>
        </div>
    )
}

export default DashboardLanguage