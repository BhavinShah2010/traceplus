import React from 'react'
import ReactHighcharts from 'react-highcharts'

const riskLevelColor = {
    "low": '#04e06e',
    "medium": "#ffd700",
    "high": "#ffa500"
}

const BarChart = (props) => {
    let config = {
        chart: {
            type: 'column',
            height: 270,
            borderRadius: 8,
            zoomType: 'x',
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
            categories: [1,2,3,4,5,6,7],
            max: 6
        },
        yAxis: {
            title: {
                text: null
            },
            gridLineDashStyle: 'ShortDash',
            gridLineWidth: 1,
            min: 0,
            // max: 100,
            labels: {
                enabled: false
            },
            plotLines: [
                {
                    color: riskLevelColor.high,
                    width: 1,
                    value: 100,
                    dashStyle: 'LongDash',
                    zIndex: 100,
                    label: {
                        text: 'High',
                        style: {
                            color: riskLevelColor.high,
                            fontWeight: 'bold',
                        },
                        y: 15
                    }
                },
                {
                    color: riskLevelColor.medium,
                    width: 1,
                    value: 66,
                    dashStyle: 'LongDash',
                    zIndex: 100,
                    label: {
                        text: 'Medium',
                        style: {
                            color: riskLevelColor.medium,
                            fontWeight: 'bold'
                        },
                        y: 15
                    }
                },
                {
                    color: riskLevelColor.low,
                    width: 1,
                    value: 33,
                    dashStyle: 'LongDash',
                    zIndex: 100,
                    label: {
                        text: 'Low',
                        style: {
                            color: riskLevelColor.low,
                            fontWeight: 'bold'
                        },
                        y: 15
                    }
                }
            ]
        },
        series: [{
            name: 'Footfall',
            showInLegend: false,
            data: [{ y: 15, name: 1 }, { y: 42, name: 2 }, { y: 8, name: 3 }, { y: 72, name: 4 }, { y: 55, name: 5 }, { y: 88, name: 6 }, { y: 25, name: 7 }],
            colorByPoint: true
        }]
    }

    return (
        <div    >
            <ReactHighcharts config={config} />
        </div>
    )
}

export default BarChart