import React from 'react'
import { Select } from 'antd';


const { Option } = Select;



function DashboardLanguage(props) {

    function handleChangeLanguage(lang) {
        props.changeLanguage(lang)
    }

    return (
        <div className="commonLanguageDropDownDiv">
            <Select value={
                localStorage.getItem('selectedLanguage') || 'en'
            } 
            onChange={handleChangeLanguage}
            >
                <Option value="en">English</Option>
                <Option value="th">Thai</Option>
                {/* <Option value="Vietenamese">Vietenamese</Option> */}
            </Select>
        </div>
    )
}

export default DashboardLanguage