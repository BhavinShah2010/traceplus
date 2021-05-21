import React from 'react'

const ReactHighcharts = require('react-highcharts');

const riskLevelColor = {
    "low": '#04e06e',
    "medium": "#ffa500",
    "high": "#ef5e8c"
}

const Chart = (props) => {
    let config = {
        chart: {
            type: 'area',
            height: 500
        },
        exporting: {
            enabled: false
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            allowDecimals: false,
            gridLineWidth: 1,
            gridLineDashStyle: 'ShortDash'
        },
        credits: {
            enabled: false
        },
        yAxis: {
            title: {
                text: props.yAxisTitle
            },
            gridLineDashStyle: 'ShortDash',
            gridLineWidth: 1,
            labels: {
                enabled: false
            },
            plotLines: [
                {
                    color: riskLevelColor.high,
                    width: 2,
                    value: 600,
                    dashStyle: 'LongDash'
                },
                {
                    color: riskLevelColor.medium,
                    width: 2,
                    value: 300,
                    dashStyle: 'LongDash'
                },
                {
                    color: riskLevelColor.low,
                    width: 2,
                    value: 100,
                    dashStyle: 'LongDash'
                }
            ]
        },
        tooltip: {
            // pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            style: {
                fontWeight: 'bold'
            },
            padding: 16,
            borderColor: '#FFFFFF',
            backgroundColor: '#FFFFFF'
        },
        plotOptions: {
            area: {
                fillOpacity: 0.1,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    fillColor: '#FFFFFF',
                    lineColor: null,
                    lineWidth: 1,
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Risk',
            showInLegend: false,
            data: [
                110, 320, 80, 369,
                235, 540, 400, 600
            ],
            color: riskLevelColor[props.risk],
        }]
    }

    return (
        <div className='chartView'>
            <ReactHighcharts config={config} />
        </div>
    )
}

export default Chart