import axios from "axios";


let prefixURL = process.env.REACT_APP_URL

export function getDashboardData(requestBody) {
    return axios.get(prefixURL+`/get_dashboard_data?session=${'123456789'}&date=${requestBody.date}&org_id=${requestBody.org_id}`)
    .then( res =>res.data).catch( err => err)
}