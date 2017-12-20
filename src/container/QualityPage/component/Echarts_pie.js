/**
 * Created by Administrator on 2017/6/26.
 */
import React, { Component } from 'react';
import echarts from 'echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class Echarts_pie extends Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(){
        let masterChange = (this.props.getMasterChangeData && this.props.getMasterChangeData.items) ?
            this.props.getMasterChangeData.items : [];
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        let statDates = [], dataErrorNums = [], dataNums=[];
        if (masterChange){
            for (let i=0;i<masterChange.length;i++){
                statDates.unshift(masterChange[i].statDate);
                dataErrorNums.unshift(masterChange[i].dataErrorNum);
                dataNums.unshift(masterChange[i].dataNum)
            }
            // 绘制图表{this.props.entityName}
            myChart.setOption({
                title: {
                    text: (this.props.getMasterChangeData ? this.props.getMasterChangeData.name : [])+'最近数据质量的变化',
                    textStyle: {
                        color: '#37c3b0',
                    },
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['质量数据总量','错误数据总量']
                },
                toolbox: {
                    show: true,
                    color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
                    feature: {
                        dataZoom : {
                            show : true,
                            title : {
                                dataZoom : '区域缩放',
                                dataZoomReset : '区域缩放后退'
                            }
                        },
                        dataView : {
                            show : true,
                            title : '数据视图',
                            readOnly: true,
                            lang : ['数据视图', '关闭', '刷新'],
                            optionToContent: function(opt) {
                                var axisData = opt.xAxis[0].data;
                                var series = opt.series;
                                var table = '<table style="width:95%;text-align:center"><tbody><tr>'
                                    + '<td>时间</td>'
                                    + '<td>' + series[0].name + '</td>'
                                    + '<td>' + series[1].name + '</td>'
                                    + '</tr>';
                                for (var i = 0, l = axisData.length; i < l; i++) {
                                    table += '<tr>'
                                        + '<td>' + axisData[i] + '</td>'
                                        + '<td>' + series[0].data[i] + '</td>'
                                        + '<td>' + series[1].data[i] + '</td>'
                                        + '</tr>';
                                }
                                table += '</tbody></table>';
                                return table;
                            }
                        },
                        magicType: {type: ['line', 'bar']},
                        restore : {
                            show : true,
                            title : '还原',
                            color : 'red'
                        },
                        saveAsImage : {
                            show : true,
                            title : '保存为图片',
                            type : 'png',
                            lang : ['点击保存']
                        }
                    }
                },
                calculable : true,
                /*dataZoom : {
                    show : true,
                    realtime : true,
                    start : 10,
                },*/
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: statDates
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                        name:'质量数据总量',
                        type:'line',
                        itemStyle:{
                            normal:{
                                color:'#37c3b0',
                                lineStyle:{
                                    color:'#37c3b0'
                                }
                            }
                        },
                        data: dataNums,
                        markPoint: {
                            data: [
                                {name: '月最低', value: -2, xAxis: 1, yAxis: -1.5}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'},
                                [{
                                    symbol: 'none',
                                    x: '90%',
                                    yAxis: 'max'
                                }, {
                                    symbol: 'circle',
                                    label: {
                                        normal: {
                                            position: 'start',
                                            formatter: '最大值'
                                        }
                                    },
                                    type: 'max',
                                    name: '最高点'
                                }]
                            ]
                        }
                    },
                    {
                        name:'错误数据总量',
                        type:'line',
                        data: dataErrorNums,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            });
            window.onresize=myChart.resize;
        }else{
            myChart.hideLoading();
        }
    }
    render(){
        return(
            <div id="main" style={{width:'95%', height: 500 }}></div>
        )

    }
}
