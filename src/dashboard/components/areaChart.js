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
                    '<div style="width: 200px; height: 150px; padding: 5px;" >' +
                        '<div style="margin-bottom: 10px">' +
                            '<span style="font-size: 18px; font-weight: bold">' + detail.risk + '</span>'+
                            '<span style="float: right; padding: 2px 16px; border-radius: 16px; font-size: 12px; background-color: #04e06e"> Low Risk </span> ' +
                        '</div>' +
                        '<div style="padding-top: 2px">' +
                            '<span style="font-size: 14px">Spread</span>' +
                            '<span style="float: right; font-size: 14px;  font-weight: bold">' + detail.spread + '</span>' +
                        '</div>' +
                        '<div style="padding-top: 2px">' +
                            '<span style="font-size: 14px">Mobility</span>' +
                            '<span style="float: right; font-size: 14px;  font-weight: bold">' + detail.mobility + '</span>' +
                        '</div>' +
                        '<div style="padding-top: 2px">' +
                            '<span style="font-size: 14px">Area</span>' +
                            '<span style="float: right; font-size: 14px;  font-weight: bold">' + detail.area + '</span>' +
                        '</div>' +
                        '<div style="padding-top: 2px">' +
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