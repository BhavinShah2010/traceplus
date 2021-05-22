import React from 'react'

const ReactHighcharts = require('react-highcharts');


const Chart = (props) => {
    let config = {
        chart: {
            type: 'area',
            height: 250
        },
        exporting: {
            enabled: false
        },
        title: {
            text: null
        },
        xAxis: {
            categories: props.chartData.categories,
            allowDecimals: false,
        },
        credits: {
            enabled: false
        },
        yAxis: {
            title: {
                text: props.yAxisTitle
            },
            gridLineDashStyle: 'ShortDash',
            gridLineWidth: 1
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.y + '</b>'
            },
            style: {
                fontWeight: 'bold',
                fontSize: '20px'
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
            showInLegend: false,
            data: props.chartData.series,
            color: '#ef5e8c',
        }]
    }

    return (
        <ReactHighcharts config={config} />
    )
}

export default Chart