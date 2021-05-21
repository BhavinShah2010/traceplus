import React from 'react'
import { NoDataToDisplay } from 'react-highcharts-no-data-to-display'

const ReactHighcharts = require('react-highcharts');
NoDataToDisplay(ReactHighcharts.Highcharts);

const BarChart = (props) => {
    let config = {
        chart: {
            type: 'column',
            height: 370,
            zoomType: 'xy'
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        xAxis: {
            categories: props.chartData.categories
        },
        yAxis: {
            title: {
                text: 'Area'
            },
            gridLineDashStyle: 'ShortDash',
            gridLineWidth: 1
        },
        series: [{
            name: 'Area Index',
            showInLegend: false,
            data: props.chartData.series,
            colorByPoint: true
        }],
        colors: ['#ef5e8c', '#f7c6d4']
    }

    return (
        <ReactHighcharts config={config} />
    )
}

export default BarChart