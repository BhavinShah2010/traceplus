import React from 'react'
import ReactHighcharts from 'react-highcharts'
import HighchartsExporting from 'highcharts-exporting'

import rightIcon from '../../dashboard/styles/images/right-arrow.png'
import LeftIcon from '../../dashboard/styles/images/left-arrow.png'

HighchartsExporting(ReactHighcharts.Highcharts)

const riskLevelColor = {
    "low": '#04e06e',
    "medium": "#ffa500",
    "high": "#ff0000"
}


const Chart = (props) => {

    let dataLength = props.chartData?.series?.length || 0
    let maxLimit = dataLength > 50 ? Number.parseInt(dataLength / 50) : 1

    let config = {
        chart: {
            type: 'area',
            height: 250,
            zoomType: 'xy',
            events: {
                load: function () {

                    if (maxLimit > 1) {
                        const chart = this
    
                        const moveLeft = () => {
                            let { min, max, dataMin } = chart.xAxis[0].getExtremes()
                            let move = Number.parseInt(dataLength / maxLimit)
                            if (min - move >= dataMin) {
                                min -= move
                                max -= move
                            }
                            chart.xAxis[0].setExtremes(min, max)
                        }
                        const moveRight = () => {
                            let { min, max, dataMax } = chart.xAxis[0].getExtremes()
                            let move = Number.parseInt(dataLength / maxLimit)
                            if (max + move - 1 <= dataMax) {
                                min += move
                                max += (move - 1)
                            }
                            chart.xAxis[0].setExtremes(min, max)
                        }
    
                        // const leftArrowUrl = LeftIcon
                        // const rightArrowUrl = rightIcon
                        // const leftArrow = chart.renderer.image(leftArrowUrl, 50, 100, 30, 30).attr({ zIndex: 10 })
                        // const rightArrow = chart.renderer.image(rightArrowUrl, chart.chartWidth - 50, 100, 30, 30).attr({ zIndex: 10 })
                        // leftArrow.on('click', moveLeft).add()
                        // rightArrow.on('click', moveRight).add()
                    }
                }
            }
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
            tickInterval: Number.parseInt(dataLength / (maxLimit * 10)),
            max: maxLimit > 1 ? Number.parseInt(dataLength / maxLimit) : (dataLength - 1)
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
        <ReactHighcharts config={config} />
    )
}

export default Chart