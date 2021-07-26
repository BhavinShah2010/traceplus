import React from 'react'
import ReactHighcharts from 'react-highcharts'
import HighchartsExporting from 'highcharts-exporting'

import rightIcon from '../../dashboard/styles/images/right-arrow.png'
import LeftIcon from '../../dashboard/styles/images/left-arrow.png'

HighchartsExporting(ReactHighcharts.Highcharts)

const riskLevelColor = {
    "low": '#04e06e',
    "medium": "#ffd700",
    "high": "#ffa500"
}


const Chart = (props) => {

    let config = {
        chart: {
            type: 'column',
            height: 250,
            zoomType: 'x',
            // events: {
            //     load: function () {
            //         const chart = this

            //         const moveLeft = () => {
            //             let { min, max, dataMin } = chart.xAxis[0].getExtremes()
            //             let move = 8
            //             if (min - move >= dataMin) {
            //                 min -= move
            //                 max -= move
            //             }
            //             chart.xAxis[0].setExtremes(min, max)
            //         }
            //         const moveRight = () => {                        
            //             let { min, max, dataMax } = chart.xAxis[0].getExtremes()
            //             let move = 8

            //             if (max + move <= dataMax) {
            //                 min += move
            //                 max += (move)
            //             }
            //             chart.xAxis[0].setExtremes(min, max)
            //         }

            //         const leftArrowUrl = LeftIcon
            //         const rightArrowUrl = rightIcon
            //         const leftArrow = chart.renderer.image(leftArrowUrl, 50, 100, 30, 30).attr({ zIndex: 10 })
            //         const rightArrow = chart.renderer.image(rightArrowUrl, chart.chartWidth - 50, 100, 30, 30).attr({ zIndex: 10 })
            //         leftArrow.on('click', moveLeft).add()
            //         rightArrow.on('click', moveRight).add()
            //     }
            // }
        },
        exporting: {
            enabled: false
        },
        title: {
            text: null
        },
        xAxis: {
            categories: props.chartData.categories,
            // allowDecimals: false,
            // max: 7
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
            name: 'Attendance',
            showInLegend: false,
            data: props.chartData.series,
            colorByPoint: true
        }]
    }

    return (
        <ReactHighcharts config={config} />
    )
}

export default Chart