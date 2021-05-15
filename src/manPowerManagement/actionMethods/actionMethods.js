import axios from "axios";


let prefixURL = process.env.REACT_APP_URL

let userDetails = JSON.parse(localStorage.getItem('userLoginDetails'))

let userSession = userDetails ? userDetails.session : '123456789'

let org_id = userDetails ? userDetails.org_id : 6

export function getEmployeeList(requestBody) {
    return axios.get(prefixURL + `/get_employee_list?session=${userSession}&org_id=${org_id}&date=${requestBody.date}&flag=all`)
        .then(res => res.data).catch(err => err)
}