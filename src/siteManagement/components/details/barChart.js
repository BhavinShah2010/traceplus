import React from 'react'
import { NoDataToDisplay } from 'react-highcharts-no-data-to-display'

const ReactHighcharts = require('react-highcharts');
NoDataToDisplay(ReactHighcharts.Highcharts);

const riskLevelColor = {
    "low": '#04e06e',
    "medium": "#ffa500",
    "high": "#ef5e8c"
}

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
            categories: props.chartData.categories,
            tickInterval: 2
        },
        yAxis: {
            title: {
                text: 'Footfall'
            },
            gridLineDashStyle: 'ShortDash',
            gridLineWidth: 1,
            min: 0,
            max: 100,
            plotLines: [
                {
                    color: riskLevelColor.high,
                    width: 2,
                    value: 100,
                    dashStyle: 'LongDash'
                },
                {
                    color: riskLevelColor.medium,
                    width: 2,
                    value: 66,
                    dashStyle: 'LongDash'
                },
                {
                    color: riskLevelColor.low,
                    width: 2,
                    value: 33,
                    dashStyle: 'LongDash'
                }
            ]
        },
        series: [{
            name: 'Footfall',
            showInLegend: false,
            data: props.chartData.series,
            colorByPoint: true
        }],
        // colors: ['#ef5e8c', '#f7c6d4']
    }

    return (
        <ReactHighcharts config={config} />
    )
}

export default BarChart