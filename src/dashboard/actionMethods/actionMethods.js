import axios from "axios";


let prefixURL = process.env.REACT_APP_URL

export function getDashboardData(params) {
    return axios.post(prefixURL+'/get_dashboard_data').then( res =>{
        console.log("Response : " , res)
    })
}