import React from 'react'
import { NoDataToDisplay } from 'react-highcharts-no-data-to-display'

import rightIcon from '../../../dashboard/styles/images/right-arrow.png'
import LeftIcon from '../../../dashboard/styles/images/left-arrow.png'

const ReactHighcharts = require('react-highcharts');
NoDataToDisplay(ReactHighcharts.Highcharts);

const riskLevelColor = {
    "low": '#04e06e',
    "medium": "#ffa500",
    "high": "#ff0000"
}

const BarChart = (props) => {
    let config = {
        chart: {
            type: 'column',
            height: 370,
            zoomType: 'xy',
            events: {
                load: function () {
                    const chart = this

                    const moveLeft = () => {
                        let { min, max, dataMin } = chart.xAxis[0].getExtremes()
                        let move = 7
                        if (min - move >= dataMin) {
                            min -= move
                            max -= move
                        }
                        chart.xAxis[0].setExtremes(min, max)
                    }
                    const moveRight = () => {
                        let { min, max, dataMax } = chart.xAxis[0].getExtremes()
                        let move = 8
                        if (max + move - 1 <= dataMax) {
                            min += move
                            max += (move)
                        }
                        chart.xAxis[0].setExtremes(min, max)
                    }

                    const leftArrowUrl = LeftIcon
                    const rightArrowUrl = rightIcon
                    const leftArrow = chart.renderer.image(leftArrowUrl, 30, 150, 30, 30).attr({ zIndex: 10 })
                    const rightArrow = chart.renderer.image(rightArrowUrl, chart.chartWidth - 50, 150, 30, 30).attr({ zIndex: 10 })
                    leftArrow.on('click', moveLeft).add()
                    rightArrow.on('click', moveRight).add()
                }
            }
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
            // tickInterval: 2,
            max: 7
        },
        yAxis: {
            title: {
                text: 'Footfall'
            },
            gridLineDashStyle: 'ShortDash',
            gridLineWidth: 1,
            min: 0,
            max: 100,
            labels: {
                enabled: false
            },
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