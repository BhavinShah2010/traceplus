import axios from "axios";


let prefixURL = process.env.REACT_APP_URL

let userDetails = JSON.parse(localStorage.getItem('userLoginDetails'))

let userSession = userDetails ? userDetails.session : '123456789'

let org_id = userDetails ? userDetails.org_id : 6


export function getSiteLocations(requestBody) {
    
    return axios.get(prefixURL + `/get_site_locations?session=${userSession}&date=${requestBody.date}&org_id=${org_id}`)
        .then(res => res.data).catch(err => err)
}

export function getSiteOverview(requestBody) {
    return axios.get(prefixURL + `/get_site_overview?session=${userSession}&org_id=${org_id}&date=${requestBody.date}&location_id=${requestBody.locationID}`)
        .then(res => res.data).catch(err => err)
}

export function getSiteFootFall(requestBody) {
    return axios.get(prefixURL + `/get_site_footfall?session=${userSession}&org_id=${org_id}&date=${requestBody.date}&location_id=${requestBody.locationID}`)
        .then(res => res.data).catch(err => err)
}

export function getSiteAreaIndex(requestBody) {
    

    return axios.get(prefixURL + `/get_site_area_index?session=${userSession}&org_id=${org_id}&date=${requestBody.date}&location_id=${requestBody.locationID}`)
        .then(res => res.data).catch(err => err)
}

export const footfallChart = async (requestBody) => {
    try {
        const res = await axios.get(`${prefixURL}/get_site_footfall?session=${userSession}&org_id=${org_id}&date=${requestBody.date}&location_id=${requestBody.locationID}`);
        return res.data;
    } catch (err) {
        return err;
    } 
}
