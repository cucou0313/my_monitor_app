import React from 'react';
import * as echarts from 'echarts';
import Divider from "@material-ui/core/Divider";


class Linechart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: {},
            data2: {},
            data3: {},
            data4: {}
        }
        this.myChart1 = null;
        this.myChart2 = null;
        this.myChart3 = null;
        this.myChart4 = null;
    }

    componentDidMount() {
        this.chart()
    }

    getData() { //请求数据函数
        this.myChart1.showLoading()
        this.myChart2.showLoading()
        this.myChart3.showLoading()
        this.myChart4.showLoading()

        fetch("http://localhost:10000/res/get", {
            method: 'GET'
        }).then(res => {
            if (res.ok)
                res.json().then(
                    data => {
                        if (data.Code === 0) {
                            this.setState({
                                data1: data.Data.data1,
                                data2: data.Data.data2,
                                data3: data.Data.data3,
                                data4: data.Data.data4,
                            })
                            this.myChart1.setOption(this.getOption(this.state.data1), true)
                            this.myChart2.setOption(this.getOption(this.state.data2), true)
                            this.myChart3.setOption(this.getOption(this.state.data3), true)
                            this.myChart4.setOption(this.getOption(this.state.data4), true)

                            this.myChart1.hideLoading();
                            this.myChart2.hideLoading();
                            this.myChart3.hideLoading();
                            this.myChart4.hideLoading();
                        }
                    }
                )
        })
    }


    getOption(data) {
        return {
            title: {
                text: data.ChartName
            },
            legend: {
                top: 30,
                left: 'center',
                data: ['SystemCpu', 'SystemMem', 'ProcessCpu', 'ProcessMem']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                right: '5%',
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
                        res += '<p>' + param.marker + param.seriesName + ' : ' + param.data.value + '%' + param.data.more + '</p>'
                    }
                    return res;
                },
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.DateTime
            },
            yAxis: {
                type: 'value',
                min: 0,
                interval: 10
            },
            series: [
                {
                    name: 'SystemCpu',
                    type: 'line',
                    data: data.SystemCpu
                },
                {
                    name: 'SystemMem',
                    type: 'line',
                    data: data.SystemMem
                },
                {
                    name: 'ProcessCpu',
                    type: 'line',
                    data: data.ProcessCpu
                },
                {
                    name: 'ProcessMem',
                    type: 'line',
                    data: data.ProcessMem
                },
            ]
        }
    }

    chart() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart1 = echarts.init(document.getElementById('form1'));
        this.myChart2 = echarts.init(document.getElementById('form2'));
        this.myChart3 = echarts.init(document.getElementById('form3'));
        this.myChart4 = echarts.init(document.getElementById('form4'));
        // 绘制图表1
        this.myChart1.setOption(this.getOption(this.state.data1), true
        )
        // 绘制图表2
        this.myChart2.setOption(this.getOption(this.state.data2), true
        )
        // 绘制图表3
        this.myChart3.setOption(this.getOption(this.state.data3), true
        )
        // 绘制图表4
        this.myChart4.setOption(this.getOption(this.state.data4), true
        )
    }

    render() {
        return (
            <div>
                <div id="form1" style={{height: '350px'}}/>
                <Divider/>
                <div id="form2" style={{height: '350px'}}/>
                <Divider/>
                <div id="form3" style={{height: '350px'}}/>
                <Divider/>
                <div id="form4" style={{height: '350px'}}/>
            </div>
        )
    }
}

export default Linechart;