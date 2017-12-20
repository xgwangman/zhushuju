import React, { Component } from 'react';
import echarts from 'echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
export default class Echarts_bar extends Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(){
        let entityChange = (this.props.getEntityDataChange && this.props.getEntityDataChange.items) ?
                            this.props.getEntityDataChange.items : [];
        let statDates = [], dataErrorNums = [], dataNums=[];
        // 基于准备好的dom，初始化echarts实例
        var myChartData = echarts.init(document.getElementById('echart'));
        if (entityChange){
            for (let i=0;i<entityChange.length;i++) {
                statDates.unshift(entityChange[i].statDate);
                dataErrorNums.unshift(entityChange[i].dataErrorNum);
                dataNums.unshift(entityChange[i].dataNum)
            }
            // 绘制图表
            myChartData.setOption({
                title: {
                    text: this.props.entityName ? (this.props.entityName ? this.props.entityName : [])+'最近数据质量的变化' :
                        (this.props.getEntityDataChange ? this.props.getEntityDataChange.name : [])+'最近数据质量的变化',
                    textStyle: {
                        color: '#37c3b0',
                    },
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['数据总量','质量数据']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
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
                        name:'数据总量',
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
                    },
                    {
                        name:'质量数据',
                        type:'line',
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
                                    x: '92%',
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
                    }
                ]
            });
            window.onresize=myChartData.resize;
        }else{
            myChartData.hideLoading();
        }
    }
    render(){
        return(
            <div id="echart" style={{ width: "95%", height: 500 }}></div>
        )

    }
}
