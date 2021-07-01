import React from 'react'
import ReactHighcharts from 'react-highcharts'

const riskLevelColor = {
    "low": '#04e06e',
    "medium": "#ffd700",
    "high": "#ffa500"
}

const Chart = (props) => {

    let config = {
        chart: {
            type: 'area',
            height: 400,
            zoomType: 'x'
        },
        exporting: {
            enabled: false
        },
        title: {
            text: null
        },
        xAxis: {
            categories: props.chartData?.categories || [],
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
            min: 0,
            max: 100,
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
                        y: 15,
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
                        y: 15,
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
                        y: 15,
                    }
                }
            ]
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
            name: 'Risk',
            showInLegend: false,
            data: props.chartData?.series || [],
            zones: [
                {
                    value: 33,
                    color: riskLevelColor.low
                },
                {
                    value: 66,
                    color: riskLevelColor.medium
                },
                {
                    value: 100,
                    color: riskLevelColor.high
                }
            ]
        }]
    }

    return (
        <div className='chartView'>
            <ReactHighcharts config={config} />
        </div>
    )
}

export default Chart