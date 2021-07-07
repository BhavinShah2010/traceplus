import axios from "axios";


let prefixURL = process.env.REACT_APP_URL


export function getEmployeeList(requestBody, userSession, org_id) {
    return axios.get(prefixURL + `/get_employee_list?session=${userSession}&org_id=${org_id}&date=${requestBody.date}&flag=all`)
        .then(res => res.data).catch(err => err)
}

export function getEmployeeDetails(requestBody, userSession, org_id) {
    return axios.get(prefixURL + `/get_employee_details?session=${userSession}&emp_id=${requestBody.emp_id}&date=${requestBody.date}&org_id=${org_id}`)
        .then(res => res.data).catch(err => err)
}

export function getOrgPri(requestBody, userSession, org_id) {
    return axios.get(prefixURL + `/get_org_pri?session=${userSession}&org_id=${org_id}&date=${requestBody.date}`)
        .then(res => res.data).catch(err => err)
}

export function getDepartmentList(requestBody, userSession, org_id) {
    return axios.get(prefixURL + `/get_departments?session=${userSession}&org_id=${org_id}&date=${requestBody.date}`)
        .then(res => res.data).catch(err => err)
}

export function getEmployeeIndex(requestBody, userSession, org_id) {

    let indexName = 'population'
    return axios.get(prefixURL + `/get_employee_index?session=${userSession}&emp_id=${requestBody.emp_id}&date=${requestBody.date}&org_id=${org_id}&index_name=${indexName}`)
        .then(res => res.data).catch(err => err)
}

export const attendanceChart = async (date, userSession, org_id) => {
    try {
        const res = await axios.get(`${prefixURL}/get_attendance_trend?session=${userSession}&org_id=${org_id}&date=${date}`);
        return res.data;
    } catch (err) {
        return err;
    }
}

export const employeeChart = async (requestBody, userSession, org_id) => {
    try {
        const res = await axios.get(`${prefixURL}/get_employee_period_pri?session=${userSession}&start_date=${requestBody.start}&emp_id=${requestBody.emp_id}&index_name=population&org_id=${org_id}&end_date=${requestBody.end}`)
        return res.data
    } catch (err) {
        return err;
    }
}

