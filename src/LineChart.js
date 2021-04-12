import React from 'react';
import * as echarts from 'echarts';

class Linechart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: {
                SystemCPU: [8, 9, 7, 10, 8, 20],
                SystemMem: [33, 36, 40, 44, 55, 66],
                ProcessCPU: [1, 2, 1, 0, 0, 1],
                ProcessMem: [
                    {"value": 1.9, "More": ""},
                    {"value": 1.2, "More": "40MB"},
                    {"value": 7.9, "More": "40MB"},
                    {"value": 11.2, "More": "40MB"},
                    {"value": 0.6, "More": "40MB"},
                    {"value": 0.9, "More": "40MB"}
                ],
                DateTime: [1, 2, 3, 4, 5, 6],
            },
            data2: {
                SystemCPU: [8, 9, 7, 10, 8, 20],
                SystemMem: [33, 36, 40, 44, 55, 66],
                ProcessCPU: [1, 2, 1, 0, 0, 1],
                ProcessMem: [
                    {"value": 1.9, "More": ""},
                    {"value": 1.2, "More": "40MB"},
                    {"value": 7.9, "More": "40MB"},
                    {"value": 11.2, "More": "40MB"},
                    {"value": 0.6, "More": "40MB"},
                    {"value": 0.9, "More": "40MB"}
                ],
                DateTime: [1, 2, 3, 4, 5, 6],
            },
            data3: {
                SystemCPU: [8, 9, 7, 10, 8, 20],
                SystemMem: [33, 36, 40, 44, 55, 66],
                ProcessCPU: [1, 2, 1, 0, 0, 1],
                ProcessMem: [
                    {"value": 1.9, "More": ""},
                    {"value": 1.2, "More": "40MB"},
                    {"value": 7.9, "More": "40MB"},
                    {"value": 11.2, "More": "40MB"},
                    {"value": 0.6, "More": "40MB"},
                    {"value": 0.9, "More": "40MB"}
                ],
                DateTime: [1, 2, 3, 4, 5, 6],
            },
            data4: {
                SystemCPU: [8, 9, 7, 10, 8, 20],
                SystemMem: [33, 36, 40, 44, 55, 66],
                ProcessCPU: [1, 2, 1, 0, 0, 1],
                ProcessMem: [
                    {"value": 1.9, "More": ""},
                    {"value": 1.2, "More": "40MB"},
                    {"value": 7.9, "More": "40MB"},
                    {"value": 11.2, "More": "40MB"},
                    {"value": 0.6, "More": "40MB"},
                    {"value": 0.9, "More": "40MB"}
                ],
                DateTime: [1, 2, 3, 4, 5, 6],
            }
        }
    }

    componentDidMount() {
        /*
        * 页面加载时从后台获取数据
        */
        // this.getData();
        this.chart()
    }


    getData() { //请求数据函数
        alert("ok")
        // fetch(this.props.url, {
        //     method: 'GET'
        // }).then(res => res.json()).then(
        //     data => {
        //         this.setState({
        //             SystemCPU: data.SystemCPU,
        //             SystemMem: data.SystemMem,
        //             ProcessCPU: data.ProcessCPU,
        //             ProcessMem: data.ProcessMem,
        //             ProcessRss: data.ProcessRss,
        //             DateTime: data.DateTime,
        //         })
        //
        //         this.chart()
        //     }
        // )
    }

    chart() {
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('form1'));
        var myChart2 = echarts.init(document.getElementById('form2'));
        var myChart3 = echarts.init(document.getElementById('form3'));
        var myChart4 = echarts.init(document.getElementById('form4'));
        // 绘制图表1
        myChart1.setOption({
                title: {
                    text: this.props.name
                },
                legend: {
                    top: 30,
                    left: 'center',
                    data: ['SystemCPU', 'SystemMem', 'ProcessCPU', 'ProcessMem']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {
                            show: true,
                            title: '保存为图片'
                        }
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    formatter: function (params) {
                        let res = '<div><p>时间：' + params[0].name + '</p></div>';
                        for (let param of params) {
                            res += '<p>' + param.marker + param.seriesName + ' : ' + param.data.value + '%' + param.data.More + '</p>'
                        }
                        return res;
                    },
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.state.data1.DateTime
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 100,
                    interval: 10
                },
                series: [
                    {
                        name: 'SystemCPU',
                        type: 'line',
                        data: this.state.data1.SystemCPU
                    },
                    {
                        name: 'SystemMem',
                        type: 'line',
                        data: this.state.data1.SystemMem
                    },
                    {
                        name: 'ProcessCPU',
                        type: 'line',
                        data: this.state.data1.ProcessCPU
                    },
                    {
                        name: 'ProcessMem',
                        type: 'line',
                        data: this.state.data1.ProcessMem
                    },
                ]
            }
        )
        // 绘制图表2
        myChart2.setOption({
                title: {
                    text: this.props.name
                },
                legend: {
                    top: 30,
                    left: 'center',
                    data: ['SystemCPU', 'SystemMem', 'ProcessCPU', 'ProcessMem']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {
                            show: true,
                            title: '保存为图片'
                        }
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    formatter: function (params) {
                        let res = '<div><p>时间：' + params[0].name + '</p></div>';
                        for (let param of params) {
                            res += '<p>' + param.marker + param.seriesName + ' : ' + param.data.value + '%' + param.data.More + '</p>'
                        }
                        return res;
                    },
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.state.data2.DateTime
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 100,
                    interval: 10
                },
                series: [
                    {
                        name: 'SystemCPU',
                        type: 'line',
                        data: this.state.data2.SystemCPU
                    },
                    {
                        name: 'SystemMem',
                        type: 'line',
                        data: this.state.data2.SystemMem
                    },
                    {
                        name: 'ProcessCPU',
                        type: 'line',
                        data: this.state.data2.ProcessCPU
                    },
                    {
                        name: 'ProcessMem',
                        type: 'line',
                        data: this.state.data2.ProcessMem
                    },
                ]
            }
        )
        // 绘制图表3
        myChart3.setOption({
                title: {
                    text: this.props.name
                },
                legend: {
                    top: 30,
                    left: 'center',
                    data: ['SystemCPU', 'SystemMem', 'ProcessCPU', 'ProcessMem']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {
                            show: true,
                            title: '保存为图片'
                        }
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    formatter: function (params) {
                        let res = '<div><p>时间：' + params[0].name + '</p></div>';
                        for (let param of params) {
                            res += '<p>' + param.marker + param.seriesName + ' : ' + param.data.value + '%' + param.data.More + '</p>'
                        }
                        return res;
                    },
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.state.data3.DateTime
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 100,
                    interval: 10
                },
                series: [
                    {
                        name: 'SystemCPU',
                        type: 'line',
                        data: this.state.data3.SystemCPU
                    },
                    {
                        name: 'SystemMem',
                        type: 'line',
                        data: this.state.data3.SystemMem
                    },
                    {
                        name: 'ProcessCPU',
                        type: 'line',
                        data: this.state.data3.ProcessCPU
                    },
                    {
                        name: 'ProcessMem',
                        type: 'line',
                        data: this.state.data3.ProcessMem
                    },
                ]
            }
        )
        // 绘制图表4
        myChart4.setOption({
                title: {
                    text: this.props.name
                },
                legend: {
                    top: 30,
                    left: 'center',
                    data: ['SystemCPU', 'SystemMem', 'ProcessCPU', 'ProcessMem']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {
                            show: true,
                            title: '保存为图片'
                        }
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    formatter: function (params) {
                        let res = '<div><p>时间：' + params[0].name + '</p></div>';
                        for (let param of params) {
                            res += '<p>' + param.marker + param.seriesName + ' : ' + param.data.value + '%' + param.data.More + '</p>'
                        }
                        return res;
                    },
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.state.data4.DateTime
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 100,
                    interval: 10
                },
                series: [
                    {
                        name: 'SystemCPU',
                        type: 'line',
                        data: this.state.data4.SystemCPU
                    },
                    {
                        name: 'SystemMem',
                        type: 'line',
                        data: this.state.data4.SystemMem
                    },
                    {
                        name: 'ProcessCPU',
                        type: 'line',
                        data: this.state.data4.ProcessCPU
                    },
                    {
                        name: 'ProcessMem',
                        type: 'line',
                        data: this.state.data4.ProcessMem
                    },
                ]
            }
        )
    }

    render() {
        return (
            <div>
                <div id="form1" style={{width: '50%', height: '350px'}}/>
                <div id="form2" style={{width: '50%', height: '350px'}}/>
                <div id="form3" style={{width: '50%', height: '350px'}}/>
                <div id="form4" style={{width: '50%', height: '350px'}}/>
            </div>
        )
    }
}

export default Linechart;