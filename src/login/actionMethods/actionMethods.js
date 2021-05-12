import axios from "axios";


let prefixURL = process.env.REACT_APP_URL

let token = 'tituw3958589'

export function userLogin(requestBody) {
    requestBody.token = token
    return axios.post(prefixURL + `/user/login` , requestBody).then(res=>res).catch(err=>err)
}

export function forgotPassword(requestBody) {
    requestBody.token = token
    return axios.post(prefixURL + `/user/forgot_password` , requestBody).then(res=>res).catch(err=>err)
}

export function logoutUser() {
    let requestBody = {}
    requestBody.token = token
    requestBody.session = '123456789'
    return axios.post(prefixURL + `/user/logout` , requestBody).then(res=>res).catch(err=>err)
}

