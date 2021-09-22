import React from 'react'
import moment from 'moment';
import ReactHighcharts from 'react-highcharts'

import rightIcon from '../../../dashboard/styles/images/right-arrow.png'
import LeftIcon from '../../../dashboard/styles/images/left-arrow.png'


const riskLevelColor = {
    "low": '#04e06e',
    "medium": "#ffd700",
    "high": "#ffa500"
}

const Chart = (props) => {

    let start = moment(props.startDate).valueOf()
    let end = moment(props.endDate).valueOf()
    let move = (end - start) / 3

    let config = {
        chart: {
            type: 'area',
            height: 400,
            zoomType: 'x',
            events: {
                load: function () {
                    const chart = this

                    const moveLeft = () => {
                        let { min, max } = chart.xAxis[0].getExtremes()
                        if (min - move >= start) {
                            min -= move
                            max -= move
                        }
                        chart.xAxis[0].setExtremes(min, max)
                    }
                    const moveRight = () => {
                        let { min, max } = chart.xAxis[0].getExtremes()
                        if (max + move <= end) {
                            min += move + (props.interval * 60 * 1000)
                            max += move
                        }
                        chart.xAxis[0].setExtremes(min, max)
                    }

                    const leftArrowUrl = LeftIcon
                    const rightArrowUrl = rightIcon
                    const leftArrow = chart.renderer.image(leftArrowUrl, 25, 150, 30, 30).attr({ zIndex: 10 })
                    const rightArrow = chart.renderer.image(rightArrowUrl, chart.chartWidth - 50, 150, 30, 30).attr({ zIndex: 10 })
                    leftArrow.on('click', moveLeft).add()
                    rightArrow.on('click', moveRight).add()
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
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e %b',
                hour: '%H:%M',
            },
            gridLineWidth: 1,
            gridLineDashStyle: 'ShortDash',
            max: (start + 3 * move),
            min: (start + 2 * move)
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
            // max: 100,
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
        // tooltip: {
        //     useHTML: true,
        //     borderColor: '#FFFFFF',
        //     backgroundColor: '#FFFFFF',
        //     borderRadius: 15
        // },
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
                    // value: 100,
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