import axios from "axios";


let prefixURL = process.env.REACT_APP_URL



export function getDashboardData(requestBody , sessionID, id) {

    return axios.get(prefixURL + `/get_dashboard_data?session=${sessionID}&date=${requestBody.date}&org_id=${id}`)
        .then(res => res.data).catch(err => err)
}

export function getThreatWatchData(requestBody, sessionID, org_id) {
    return axios.get(prefixURL + `/get_threat_watch?session=${sessionID}&date=${requestBody.date}&org_id=${org_id}&contact_rank=${requestBody.contactRank}&start_date=${requestBody.startDate}&end_date=${requestBody.endDate}`)
        .then(res => res.data).catch(err => err)
}


export function getLanguageTranslation(langCode, userSession) {
    
    return axios.get(prefixURL + `/get_lang_pack?session=${userSession}&lang_code=${langCode}`)
        .then(res => res.data).catch(err => err)
}

export function setSelectedLanguage(langauge) {


    return dispatch => {
        dispatch({
            type: 'selectedLangauge',
            data:langauge
        })
    }
}

export const getChartData = async (obj , sessionID, org_id) => {
    try {
        let res = await axios.get(`${prefixURL}/get_index_data?session=${sessionID}&org_id=${org_id}&index_name=${obj.index}&start_date=${obj.start}&end_date=${obj.end}`)
        return res.data
    } catch (err) {
        return err
    }
}
