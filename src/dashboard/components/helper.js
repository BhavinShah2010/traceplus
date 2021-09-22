import moment from 'moment'

const prepareTimeObj = (interval) => {
    let x = interval //minutes interval
    let times = {}
    let tt = 0

    for (let i = 0; tt < 24 * 60; i++) {
        let hh = Math.floor(tt / 60)
        let mm = (tt % 60)

        let key = ("0" + (hh % 24)).slice(-2) + ("0" + mm).slice(-2)
        times[key] = { value: 0, count: 0 }
        tt = tt + x;
    }

    return times
}

export const prepareDateObj = (params) => {

    let start = new Date(params.startDate)
    let end = new Date(params.endDate)
    let dates = {}
    let times = prepareTimeObj(params.interval)

    for (let i = start; i <= end; i.setDate(i.getDate() + 1)) {
        let d = moment(start).format('YYYY-MM-DD')
        
        dates[d] = JSON.parse(JSON.stringify(times))
    }

    params.data.forEach((i) => {
        let date = i.timestamp || i.date
        let day = moment(date).format('YYYY-MM-DD')
        let time = moment(date).format('HHmm')
        let val = i[params.type]

        let dateObj = dates[day]

        for (let t in dateObj) {
            if (time <= t) {
                /**Average */
                // dateObj[t] = { value: dateObj[t].value + val, count: dateObj[t].count + 1  }

                /**Maximum */
                let maxVal = val > dateObj[t].value ? val : dateObj[t].value
                dateObj[t] = { value: maxVal, count: dateObj[t].count + 1  }

                return
            }
        }
    })

    let returnData = []
    let timest = []
    for (let d in dates) {
        let date = dates[d]
        for (let t in date) {
            /**Consider only value timestamp */
            // if (date[t].value) {
                let timestamp = moment(`${d} ${t}`, 'YYYY-MM-DD HHmm').valueOf()
                timest.push(timestamp)
    
                /**Average */
                // returnData.push([timestamp, date[t].value ? Number.parseFloat((date[t].value / date[t].count).toFixed(2)) : 0])
    
                /**Maximum */
                returnData.push([timestamp, date[t].value ? date[t].value : 0])
            // }
        }
    }

    return returnData
}