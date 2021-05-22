import React from 'react'
import moment from 'moment';

const ReactHighcharts = require('react-highcharts');

const riskLevelColor = {
    "low": '#04e06e',
    "medium": "#ffa500",
    "high": "#ef5e8c"
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
                    '<div style="width: 250px; padding: 10px" >' +
                        '<div style="margin-bottom: 20px">' +
                            '<span style="font-size: 24px; font-weight: bold">' + detail.risk + '</span>'+
                            '<span style="float: right; font-weight: bold; padding: 8px 24px; border-radius: 28px; font-size: 14px; background-color: #04e06e"> Low Risk </span> ' +
                        '</div>' +
                        '<div>' +
                            '<span style="font-size: 16px">Spread</span>' +
                            '<span style="float: right; font-size: 16px;  font-weight: bold">' + detail.spread + '</span>' +
                        '</div>' +
                        '<div>' +
                            '<span style="font-size: 16px">Mobility</span>' +
                            '<span style="float: right; font-size: 16px;  font-weight: bold">' + detail.mobility + '</span>' +
                        '</div>' +
                        '<div>' +
                            '<span style="font-size: 16px">Area</span>' +
                            '<span style="float: right; font-size: 16px;  font-weight: bold">' + detail.area + '</span>' +
                        '</div>' +
                        '<div>' +
                            '<span style="font-size: 16px">Time</span>' +
                            '<span style="float: right; font-size: 16px;  font-weight: bold">' + date + '</span>' +
                        '</div>' +
                    '</div>'
                )
            case 'Spread':
                return (
                    '<div style="width: 250px; padding: 10px" >' +
                        '<div style="margin-bottom: 20px; text-align: center">' +
                            '<span style="font-weight: bold; padding: 8px 24px; border-radius: 28px; font-size: 14px; background-color: #04e06e"> Low Risk </span> ' +
                        '</div>' +
                        '<div>' +
                            '<span style="font-size: 16px">Spread</span>' +
                            '<span style="float: right; font-size: 16px;  font-weight: bold">' + detail.spread + '</span>' +
                        '</div>' +
                        '<div>' +
                            '<span style="font-size: 16px">Time</span>' +
                            '<span style="float: right; font-size: 16px;  font-weight: bold">' + date + '</span>' +
                        '</div>' +
                    '</div>'
                )
            case 'Mobility':
                return (
                    '<div style="width: 250px; padding: 10px" >' +
                        '<div style="margin-bottom: 20px; text-align: center">' +
                            '<span style="font-weight: bold; padding: 8px 24px; border-radius: 28px; font-size: 14px; background-color: #04e06e"> Low Risk </span> ' +
                        '</div>' +
                        '<div>' +
                            '<span style="font-size: 16px">Mobility</span>' +
                            '<span style="float: right; font-size: 16px;  font-weight: bold">' + detail.mobility + '</span>' +
                        '</div>' +
                        '<div>' +
                            '<span style="font-size: 16px">Time</span>' +
                            '<span style="float: right; font-size: 16px;  font-weight: bold">' + date + '</span>' +
                        '</div>' +
                    '</div>'
                )
            case "Area":
                return (
                    '<div style="width: 250px; padding: 10px" >' +
                        '<div style="margin-bottom: 20px; text-align: center">' +
                            '<span style="font-weight: bold; padding: 8px 24px; border-radius: 28px; font-size: 14px; background-color: #04e06e"> Low Risk </span> ' +
                        '</div>' +
                        '<div>' +
                            '<span style="font-size: 16px">Area</span>' +
                            '<span style="float: right; font-size: 16px;  font-weight: bold">' + detail.area + '</span>' +
                        '</div>' +
                        '<div>' +
                            '<span style="font-size: 16px">Time</span>' +
                            '<span style="float: right; font-size: 16px;  font-weight: bold">' + date + '</span>' +
                        '</div>' +
                    '</div>'
                )
            default: 
                break
        }
    }

    let config = {
        chart: {
            type: 'area',
            height: 500,
            zoomType: 'xy'
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
            plotLines: [
                {
                    color: riskLevelColor.high,
                    width: 2,
                    value: 5,
                    dashStyle: 'LongDash'
                },
                {
                    color: riskLevelColor.medium,
                    width: 2,
                    value: 3,
                    dashStyle: 'LongDash'
                },
                {
                    color: riskLevelColor.low,
                    width: 2,
                    value: 1,
                    dashStyle: 'LongDash'
                }
            ]
        },
        tooltip: {
            formatter: function () {
                return getHtml(this, props.chartType)
            },
            outside: true,
            useHTML: true,
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