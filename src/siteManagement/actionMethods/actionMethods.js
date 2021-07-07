import axios from "axios";


let prefixURL = process.env.REACT_APP_URL

export function getSiteLocations(requestBody , userSession, org_id) {
    
    return axios.get(prefixURL + `/get_site_locations?session=${userSession}&date=${requestBody.date}&org_id=${org_id}`)
        .then(res => res.data).catch(err => err)
}

export function getSiteOverview(requestBody , userSession, org_id) {
    return axios.get(prefixURL + `/get_site_overview?session=${userSession}&org_id=${org_id}&date=${requestBody.date}&location_id=${requestBody.locationID}`)
        .then(res => res.data).catch(err => err)
}

export function getSiteFootFall(requestBody, userSession, org_id) {
    return axios.get(prefixURL + `/get_site_footfall?session=${userSession}&org_id=${org_id}&date=${requestBody.date}&location_id=${requestBody.locationID}`)
        .then(res => res.data).catch(err => err)
}

export function getSiteAreaIndex(requestBody , userSession, org_id) {
    

    return axios.get(prefixURL + `/get_site_area_index?session=${userSession}&org_id=${org_id}&date=${requestBody.date}&location_id=${requestBody.locationID}`)
        .then(res => res.data).catch(err => err)
}

export const footfallChart = async (requestBody, userSession, org_id) => {
    try {
        const res = await axios.get(`${prefixURL}/get_site_footfall?session=${userSession}&org_id=${org_id}&date=${requestBody.date}&location_id=${requestBody.locationID}`);
        return res.data;
    } catch (err) {
        return err;
    } 
}
