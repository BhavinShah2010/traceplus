import axios from "axios";


let prefixURL = process.env.REACT_APP_URL

let userDetails = JSON.parse(localStorage.getItem('userLoginDetails'))

let userSession = userDetails ? userDetails.session : '123456789'

let org_id = userDetails ? userDetails.org_id : 6

export function getDashboardData(requestBody) {
    return axios.get(prefixURL + `/get_dashboard_data?session=${userSession}&date=${requestBody.date}&org_id=${org_id}`)
        .then(res => res.data).catch(err => err)
}

export function getThreatWatchData(requestBody) {
    return axios.get(prefixURL + `/get_threat_watch?session=${userSession}&date=${requestBody.date}&org_id=${org_id}`)
        .then(res => res.data).catch(err => err)
}

