// ========== 设备管理页面 JavaScript ==========

(function() {
    // 1. 实例化树图
    var myChart = echarts.init(document.querySelector(".tree .chart"));

    var option = {
        tooltip: [{ trigger: "item" }],
        series: [{
            type: 'tree',
            id: 0,
            name: 'tree1',
            data: [deviceTreeData],
            top: '5%',
            left: '7%',
            bottom: '5%',
            right: '15%',
            symbolSize: 7,
            edgeShape: 'curve',
            edgeForkPosition: '63%',
            initialTreeDepth: 2,
            lineStyle: { width: 2 },
            label: {
                margin: 30,
                color: 'rgb(255,190,122)',
                fontSize: 13,
                position: 'top',
                verticalAlign: 'middle',
                align: 'right'
            },
            leaves: {
                label: {
                    fontSize: 13,
                    color: 'rgb(190,184,220)',
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                }
            },
            symbol: 'circle',
            symbolSize: 8,
            emphasis: { focus: 'descendant' },
            itemStyle: {
                color: "#7bc5ae",
                borderColor: "rgba(123, 197, 174, .3)",
                borderWidth: 8
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
        }]
    };
    myChart.setOption(option, true);

    window.addEventListener('resize', function() {
        myChart.resize();
    });

    // 2. 树图点击事件
    myChart.on("click", function(params) {
        var deviceName = params.name;
        // 查找设备索引
        var index = -1;
        for (var i = 0; i < deviceNames.length; i++) {
            if (deviceName == deviceNames[i]) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            // 更新设备名称
            document.getElementById("deviceName").innerHTML = deviceName;

            // 获取设备详情
            var detail = deviceDetails[index];
            var statusClass = "";
            if (detail.status == "正常") statusClass = "status-normal";
            else if (detail.status == "维护") statusClass = "status-maintain";
            else if (detail.status == "故障") statusClass = "status-danger";
            else statusClass = "status-warning";

            // 构建设备信息HTML
            var infoHtml = '<div class="info-row"><span class="info-label">🏭 厂商</span><span class="info-value">' + detail.manufacturer + '</span></div>';
            infoHtml += '<div class="info-row"><span class="info-label">📟 型号</span><span class="info-value">' + detail.model + '</span></div>';
            infoHtml += '<div class="info-row"><span class="info-label">📅 安装日期</span><span class="info-value">' + detail.installDate + '</span></div>';
            infoHtml += '<div class="info-row"><span class="info-label">📍 位置</span><span class="info-value">' + detail.location + '</span></div>';
            infoHtml += '<div class="info-row"><span class="info-label">⏱️ 使用时长</span><span class="info-value">' + detail.usage + ' 小时</span></div>';
            infoHtml += '<div class="info-row"><span class="info-label">🔧 状态</span><span class="info-value"><span class="status-badge ' + statusClass + '">' + detail.status + '</span></span></div>';
            document.getElementById("deviceInfo").innerHTML = infoHtml;

            // 更新图表
            var myChart1 = echarts.init(document.querySelector(".line .chart"));

            // 获取该设备的数据
            var usageDataArr = usageData[deviceName] || [0,0,0,0,0,0,0,0,0,0,0,0];
            var faultDataArr = faultData[deviceName] || [0,0,0,0,0,0,0,0,0,0,0,0];

            var option1 = {
                title: {
                    text: '📊 ' + deviceName + ' 运行数据（2024年度）',
                    left: 'center',
                    textStyle: { color: '#fff', fontSize: 14 }
                },
                tooltip: { trigger: 'axis' },
                legend: {
                    top: "10%",
                    textStyle: { color: "#fff", fontSize: 12 },
                    data: ['月使用时长(小时)', '月故障次数']
                },
                grid: {
                    top: '18%',
                    left: '10%',
                    right: '8%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        textStyle: { color: "rgba(255,255,255,.6)", fontSize: 11 }
                    },
                    axisLine: {
                        lineStyle: { color: "rgba(255,255,255,.2)" }
                    },
                    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                }],
                yAxis: [
                    {
                        type: 'value',
                        name: '使用时长(小时)',
                        axisTick: { show: false },
                        axisLine: { lineStyle: { color: "rgba(255,255,255,.1)" } },
                        axisLabel: { textStyle: { color: "rgba(255,255,255,.6)", fontSize: 11 } },
                        splitLine: { lineStyle: { color: "rgba(255,255,255,.1)" } }
                    },
                    {
                        type: 'value',
                        name: '故障次数',
                        axisTick: { show: false },
                        axisLine: { lineStyle: { color: "rgba(255,255,255,.1)" } },
                        axisLabel: { textStyle: { color: "rgba(255,255,255,.6)", fontSize: 11 } },
                        splitLine: { show: false }
                    }
                ],
                series: [
                    {
                        name: '月使用时长(小时)',
                        type: 'line',
                        smooth: true,
                        lineStyle: { color: "#7bc5ae", width: 2 },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: "rgba(123, 197, 174, 0.4)" },
                                { offset: 0.8, color: "rgba(123, 197, 174, 0.05)" }
                            ], false)
                        },
                        symbol: 'circle',
                        symbolSize: 6,
                        showSymbol: false,
                        itemStyle: { color: "#7bc5ae", borderWidth: 0 },
                        data: usageDataArr
                    },
                    {
                        name: '月故障次数',
                        type: 'bar',
                        yAxisIndex: 1,
                        barWidth: '30%',
                        itemStyle: {
                            color: "#ff9f7f",
                            borderRadius: [4, 4, 0, 0]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            color: '#ffeb7b',
                            fontSize: 10
                        },
                        data: faultDataArr
                    }
                ]
            };
            myChart1.setOption(option1, true);

            window.addEventListener('resize', function() {
                myChart1.resize();
            });
        }
    });
})();