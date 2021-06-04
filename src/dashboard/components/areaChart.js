import React from 'react'
import moment from 'moment';
import ReactHighcharts from 'react-highcharts'
import HighchartsExporting from 'highcharts-exporting'

import rightIcon from '../styles/images/right-arrow.png'
import LeftIcon from '../styles/images/left-arrow.png'

HighchartsExporting(ReactHighcharts.Highcharts)


const riskLevelColor = {
    "low": '#04e06e',
    "medium": "#ffd700",
    "high": "#ffa500"
}

const Chart = (props) => {


    const getDateFormat = (date) => {
        return moment(date).format('MMM DD HH:MM')
    }

    const getHtml = (data, title) => {
        let detail = props.chartData?.chartData[data.point.index]
        let date = getDateFormat(detail.timestamp)

        switch (title) {
            case 'Population':
                return (
                    '<div style="width: 200px; height: 175px; padding: 10px;" >' +
                    '<div style="margin-bottom: 10px">' +
                    '<span style="font-size: 18px; font-weight: bold">' + detail.risk + '</span>' +
                    '<span style="float: right; padding: 4px 16px; border-radius: 16px; font-size: 12px; background-color: #04e06e"> Low Risk </span> ' +
                    '</div>' +
                    '<div style="padding-top: 8px">' +
                    '<span style="font-size: 14px">Spread</span>' +
                    '<span style="float: right; font-size: 14px;  font-weight: bold">' + detail.spread + '</span>' +
                    '</div>' +
                    '<div style="padding-top: 8px">' +
                    '<span style="font-size: 14px">Mobility</span>' +
                    '<span style="float: right; font-size: 14px;  font-weight: bold">' + detail.mobility + '</span>' +
                    '</div>' +
                    '<div style="padding-top: 8px">' +
                    '<span style="font-size: 14px">Area</span>' +
                    '<span style="float: right; font-size: 14px;  font-weight: bold">' + detail.area + '</span>' +
                    '</div>' +
                    '<div style="padding-top: 8px">' +
                    '<span style="font-size: 14px">Time</span>' +
                    '<span style="float: right; font-size: 14px;  font-weight: bold">' + date + '</span>' +
                    '</div>' +
                    '</div>'
                )
            case 'Spread':
                return (
                    '<div style="width: 200px; height: 110px; padding: 10px; margin-top: 10px" >' +
                    '<div style="margin-bottom: 15px; text-align: center">' +
                    '<span style="padding: 4px 16px; border-radius: 16px; font-size: 12px; background-color: #04e06e"> Low Risk </span> ' +
                    '</div>' +
                    '<div style="padding-top: 8px">' +
                    '<span style="font-size: 14px">Spread</span>' +
                    '<span style="float: right; font-size: 14px;  font-weight: bold">' + detail.spread + '</span>' +
                    '</div>' +
                    '<div style="padding-top: 8px">' +
                    '<span style="font-size: 14px">Time</span>' +
                    '<span style="float: right; font-size: 14px;  font-weight: bold">' + date + '</span>' +
                    '</div>' +
                    '</div>'
                )
            case 'Mobility':
                return (
                    '<div style="width: 200px; height: 110px; padding: 10px; margin-top: 10px" >' +
                    '<div style="margin-bottom: 15px; text-align: center">' +
                    '<span style="padding: 4px 16px; border-radius: 16px; font-size: 12px; background-color: #04e06e"> Low Risk </span> ' +
                    '</div>' +
                    '<div style="padding-top: 8px">' +
                    '<span style="font-size: 14px">Mobility</span>' +
                    '<span style="float: right; font-size: 14px;  font-weight: bold">' + detail.mobility + '</span>' +
                    '</div>' +
                    '<div style="padding-top: 8px">' +
                    '<span style="font-size: 14px">Time</span>' +
                    '<span style="float: right; font-size: 14px;  font-weight: bold">' + date + '</span>' +
                    '</div>' +
                    '</div>'
                )
            case "Area":
                return (
                    '<div style="width: 200px; height: 110px; padding: 10px; margin-top: 10px" >' +
                    '<div style="margin-bottom: 15px; text-align: center">' +
                    '<span style="padding: 4px 16px; border-radius: 16px; font-size: 12px; background-color: #04e06e"> Low Risk </span> ' +
                    '</div>' +
                    '<div style="padding-top: 8px">' +
                    '<span style="font-size: 14px">Area</span>' +
                    '<span style="float: right; font-size: 14px;  font-weight: bold">' + detail.area + '</span>' +
                    '</div>' +
                    '<div style="padding-top: 8px">' +
                    '<span style="font-size: 14px">Time</span>' +
                    '<span style="float: right; font-size: 14px;  font-weight: bold">' + date + '</span>' +
                    '</div>' +
                    '</div>'
                )
            default:
                break
        }
    }

    let dataLength = props.chartData?.series?.length || 0
    let maxLimit = dataLength > 75 ? Number.parseInt(dataLength / 75) : 1

    let config = {
        chart: {
            type: 'area',
            height: 500,
            zoomType: 'x',
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

                        const leftArrowUrl = LeftIcon
                        const rightArrowUrl = rightIcon
                        const leftArrow = chart.renderer.image(leftArrowUrl, 50, 200, 30, 30).attr({ zIndex: 10 })
                        const rightArrow = chart.renderer.image(rightArrowUrl, chart.chartWidth - 50, 200, 30, 30).attr({ zIndex: 10 })
                        leftArrow.on('click', moveLeft).add()
                        rightArrow.on('click', moveRight).add()
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
            categories: props.chartData?.categories || [],
            gridLineWidth: 1,
            gridLineDashStyle: 'ShortDash',
            tickInterval: Number.parseInt(dataLength / (maxLimit * 9)),
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
                        x: -30
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
                        x: -30
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
                        x: -30
                    }
                }
            ]
        },
        tooltip: {
            formatter: function () {
                return getHtml(this, props.chartType)
            },
            useHTML: true,
            borderColor: '#FFFFFF',
            backgroundColor: '#FFFFFF',
            borderRadius: 15
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