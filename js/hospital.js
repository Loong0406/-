$(function() {
    // ========== 1. 科室接诊量排行（横向条形图） ==========
    function deptChart() {
        var dom = document.getElementById('deptChart');
        if (!dom) { console.log('deptChart容器不存在'); return; }
        var myChart = echarts.init(dom);

        var data = [342, 298, 267, 235, 198, 156, 134, 98];
        var titlename = ['急诊科', '内科', '外科', '儿科', '妇产科', '骨科', '眼科', '皮肤科'];

        var option = {
            grid: { left: '18%', top: '5%', right: '10%', bottom: '5%', containLabel: true },
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            xAxis: {
                type: 'value',
                name: '接诊人数',
                nameTextStyle: { color: '#fff' },
                axisLabel: { color: '#fff' },
                splitLine: { lineStyle: { color: '#012f4a' } },
                max: 400
            },
            yAxis: {
                type: 'category',
                data: titlename,
                axisLabel: { color: '#fff', fontSize: 12 },
                axisLine: { show: false },
                axisTick: { show: false }
            },
            series: [{
                name: '接诊人数',
                type: 'bar',
                data: data,
                itemStyle: { color: '#7bc5ae', borderRadius: [0, 5, 5, 0] },
                label: { show: true, position: 'right', color: '#fff', formatter: '{c}' }
            }]
        };
        myChart.setOption(option);
        window.addEventListener('resize', function() { myChart.resize(); });
    }

    // ========== 2. 各楼层床位占用分布 ==========
    function bedChart() {
        var myChart = echarts.init(document.getElementById('bedChart'));
        var option = {
            tooltip: { trigger: 'axis' },
            legend: { textStyle: { color: '#fff' }, data: ['总床位', '已占用'] },
            grid: { left: '8%', right: '5%', top: '15%', bottom: '5%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['1F内科', '2F外科', '3F妇产科', '4F儿科', '5FICU', '6F康复科'],
                axisLabel: { color: '#fff', rotate: 30, fontSize: 11 },
                axisLine: { lineStyle: { color: 'rgba(255,255,255,.2)' } }
            },
            yAxis: {
                type: 'value',
                name: '床位数量',
                nameTextStyle: { color: '#fff' },
                axisLabel: { color: '#fff' },
                splitLine: { lineStyle: { color: '#012f4a' } }
            },
            series: [
                {
                    name: '总床位',
                    type: 'bar',
                    data: [45, 52, 48, 40, 30, 55],
                    itemStyle: { color: '#7bc5ae', borderRadius: [5,5,0,0] },
                    barWidth: 20
                },
                {
                    name: '已占用',
                    type: 'bar',
                    data: [38, 47, 42, 32, 28, 42],
                    itemStyle: { color: '#ff9f7f', borderRadius: [5,5,0,0] },
                    barWidth: 20
                }
            ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function() { myChart.resize(); });
    }

    // ========== 3. 大型设备运行状态（饼图） ==========
    function deviceChart() {
        var myChart = echarts.init(document.getElementById('deviceChart'));
        var option = {
            tooltip: { trigger: 'item', formatter: '{b}: {d}%' },
            legend: { textStyle: { color: '#fff' }, orient: 'vertical', left: 'left', itemWidth: 10, itemHeight: 10 },
            series: [{
                type: 'pie',
                radius: '55%',
                center: ['55%', '50%'],
                data: [
                    { value: 12, name: 'CT机', itemStyle: { color: '#51cf66' } },
                    { value: 8, name: 'MRI核磁', itemStyle: { color: '#7bc5ae' } },
                    { value: 15, name: 'DR X光', itemStyle: { color: '#ffd43b' } },
                    { value: 5, name: 'DSA血管机', itemStyle: { color: '#ff9f7f' } },
                    { value: 3, name: '直线加速器', itemStyle: { color: '#fb7293' } },
                    { value: 2, name: '维修中', itemStyle: { color: '#ff6b6b' } }
                ],
                label: { color: '#fff', formatter: '{b}' },
                labelLine: { length: 8, length2: 10 }
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function() { myChart.resize(); });
    }

    // ========== 4. 能耗监测（修复X轴显示） ==========
    function energyChart() {
        var dom = document.getElementById('energyChart');
        if (!dom) { console.log('energyChart容器不存在'); return; }
        var myChart = echarts.init(dom);
        var option = {
            tooltip: { trigger: 'axis' },
            grid: {
                left: '12%',   // 增加左侧空间
                right: '5%',
                top: '15%',
                bottom: '15%',  // 增加底部空间给X轴
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['0点', '4点', '8点', '12点', '16点', '20点'],
                axisLabel: {
                    color: '#fff',
                    fontSize: 10,
                    rotate: 0,      // 不旋转
                    interval: 0     // 显示所有标签
                },
                axisLine: { lineStyle: { color: 'rgba(255,255,255,.2)' } }
            },
            yAxis: {
                type: 'value',
                name: 'kWh',
                nameTextStyle: { color: '#fff', fontSize: 11 },
                axisLabel: { color: '#fff', fontSize: 10 },
                splitLine: { lineStyle: { color: '#012f4a' } }
            },
            series: [{
                type: 'line',
                data: [245, 210, 380, 520, 490, 560],
                smooth: true,
                lineStyle: { color: '#ffeb7b', width: 2 },
                areaStyle: { opacity: 0.3, color: '#ffeb7b' },
                symbol: 'circle',
                symbolSize: 6,
                label: { show: true, position: 'top', color: '#ffeb7b', fontSize: 10 }
            }]
        };
        myChart.setOption(option);
        window.addEventListener('resize', function() { myChart.resize(); });
    }

// ========== 5. 人员排班（修复X轴显示） ==========
    function staffChart() {
        var dom = document.getElementById('staffChart');
        if (!dom) { console.log('staffChart容器不存在'); return; }
        var myChart = echarts.init(dom);
        var option = {
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: {
                left: '15%',    // 增加左侧空间
                right: '5%',
                top: '10%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['医生', '护士', '技师', '药师', '行政', '后勤'],
                axisLabel: {
                    color: '#fff',
                    fontSize: 10,
                    rotate: 25,     // 倾斜25度
                    interval: 0,
                    margin: 8
                },
                axisLine: { lineStyle: { color: 'rgba(255,255,255,.2)' } }
            },
            yAxis: {
                type: 'value',
                name: '人数',
                nameTextStyle: { color: '#fff', fontSize: 11 },
                axisLabel: { color: '#fff', fontSize: 10 },
                splitLine: { lineStyle: { color: '#012f4a' } }
            },
            series: [{
                type: 'bar',
                data: [156, 342, 87, 45, 68, 52],
                itemStyle: { color: '#7bc5ae', borderRadius: [5,5,0,0] },
                barWidth: 25,
                label: {
                    show: true,
                    position: 'top',
                    color: '#ffeb7b',
                    fontSize: 11,
                    formatter: '{c}'
                }
            }]
        };
        myChart.setOption(option);
        window.addEventListener('resize', function() { myChart.resize(); });
    }

    // ========== 6. 实时告警列表（修复溢出问题） ==========
    function alertList() {
        var alerts = [
            { level: 'danger', text: 'MRI设备温度异常 - 影像科3F', time: '10:23' },
            { level: 'warning', text: '2号电梯运行故障 - 住院部', time: '09:45' },
            { level: 'warning', text: '水管压力偏低 - 5F手术室', time: '08:30' },
            { level: 'danger', text: '备用发电机维护到期', time: '昨日' },
            { level: 'normal', text: 'HIS系统响应延迟已恢复', time: '07:15' }
        ];

        var html = '<div style="padding: 5px; max-height: 180px; overflow-y: auto;">';
        for (var i = 0; i < alerts.length; i++) {
            var item = alerts[i];
            var bgColor = item.level === 'danger' ? 'rgba(255,107,107,0.2)' :
                (item.level === 'warning' ? 'rgba(255,212,59,0.2)' : 'rgba(81,207,102,0.2)');
            var borderColor = item.level === 'danger' ? '#ff6b6b' :
                (item.level === 'warning' ? '#ffd43b' : '#51cf66');
            html += '<div style="padding: 6px 8px; margin-bottom: 5px; background: ' + bgColor + '; border-left: 3px solid ' + borderColor + '; border-radius: 4px;">';
            html += '<div style="font-size: 12px; color: #fff;">⚠️ ' + item.text + '</div>';
            html += '<div style="font-size: 10px; color: rgba(255,255,255,0.5); margin-top: 3px;">' + item.time + '</div>';
            html += '</div>';
        }
        html += '</div>';
        $('#alertList').html(html);
    }


    // ========== 7. 医院楼宇布局图（均匀分布版） ==========
    function hospitalMap() {
        var dom = document.getElementById('hospitalMap');
        if (!dom) return;
        var myChart = echarts.init(dom);

        var option = {
            title: {
                text: '医院建筑布局',
                textStyle: { color: '#fff', fontSize: 14 },
                left: 'center',
                top: 5
            },
            backgroundColor: 'transparent',
            tooltip: { trigger: 'item' },
            xAxis: { show: false, min: 0, max: 100 },
            yAxis: { show: false, min: 0, max: 100 },
            series: [{
                type: 'scatter',
                symbolSize: 65,
                data: [
                    // 第一排（上部）
                    { name: '门诊楼', value: [15, 72], category: 'main', beds: '200床', floors: '6层', detail: '日均3000人次' },
                    { name: '住院部A', value: [42, 75], category: 'main', beds: '450床', floors: '12层', detail: '骨科/心内科' },
                    { name: '住院部B', value: [68, 72], category: 'warning', beds: '380床', floors: '10层', detail: '妇产科/儿科' },
                    { name: '急诊楼', value: [88, 75], category: 'main', beds: '80床', floors: '4层', detail: '24小时接诊' },
                    // 第二排（下部）
                    { name: '医技楼', value: [25, 38], category: 'main', beds: '-', floors: '5层', detail: 'CT/MRI/检验' },
                    { name: '行政楼', value: [50, 35], category: 'main', beds: '-', floors: '4层', detail: '办公/会议' },
                    { name: '后勤中心', value: [75, 38], category: 'danger', beds: '-', floors: '3层', detail: '维修/仓库' }
                ],
                symbol: 'roundRect',
                symbolSize: [80, 60],
                itemStyle: {
                    color: function(params) {
                        var colors = { main: '#51cf66', warning: '#ffd43b', danger: '#ff6b6b' };
                        return colors[params.data.category] || '#7bc5ae';
                    },
                    borderColor: '#fff',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0,0,0,0.3)'
                },
                label: {
                    show: true,
                    formatter: function(params) {
                        return params.name + '\n' + params.data.floors;
                    },
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 'bold',
                    offset: [0, -8]
                },
                tooltip: {
                    formatter: function(params) {
                        return params.name + '<br/>' + params.data.floors + ' | ' + params.data.beds + '<br/>' + params.data.detail;
                    }
                }
            }],
            graphic: [
                // 主干道（横向）
                { type: 'line', shape: { x1: 0, y1: 55, x2: 100, y2: 55 }, style: { stroke: 'rgba(255,255,255,0.25)', lineWidth: 2, lineDash: [8, 6] } },
                // 纵向连接线
                { type: 'line', shape: { x1: 15, y1: 55, x2: 15, y2: 68 }, style: { stroke: 'rgba(255,255,255,0.2)', lineWidth: 1.5 } },
                { type: 'line', shape: { x1: 42, y1: 55, x2: 42, y2: 68 }, style: { stroke: 'rgba(255,255,255,0.2)', lineWidth: 1.5 } },
                { type: 'line', shape: { x1: 68, y1: 55, x2: 68, y2: 68 }, style: { stroke: 'rgba(255,255,255,0.2)', lineWidth: 1.5 } },
                { type: 'line', shape: { x1: 88, y1: 55, x2: 88, y2: 68 }, style: { stroke: 'rgba(255,255,255,0.2)', lineWidth: 1.5 } },
                { type: 'line', shape: { x1: 25, y1: 45, x2: 25, y2: 38 }, style: { stroke: 'rgba(255,255,255,0.2)', lineWidth: 1.5 } },
                { type: 'line', shape: { x1: 50, y1: 45, x2: 50, y2: 38 }, style: { stroke: 'rgba(255,255,255,0.2)', lineWidth: 1.5 } },
                { type: 'line', shape: { x1: 75, y1: 45, x2: 75, y2: 38 }, style: { stroke: 'rgba(255,255,255,0.2)', lineWidth: 1.5 } },
                // 图例
                { type: 'rect', shape: { x: 10, y: 90, width: 10, height: 10, r: 2 }, style: { fill: '#51cf66' } },
                { type: 'text', style: { text: '正常运行', x: 25, y: 99, fill: 'rgba(255,255,255,0.7)', fontSize: 10 } },
                { type: 'rect', shape: { x: 85, y: 90, width: 10, height: 10, r: 2 }, style: { fill: '#ffd43b' } },
                { type: 'text', style: { text: '注意', x: 100, y: 99, fill: 'rgba(255,255,255,0.7)', fontSize: 10 } },
                { type: 'rect', shape: { x: 130, y: 90, width: 10, height: 10, r: 2 }, style: { fill: '#ff6b6b' } },
                { type: 'text', style: { text: '维护中', x: 145, y: 99, fill: 'rgba(255,255,255,0.7)', fontSize: 10 } }
            ]
        };

        myChart.setOption(option);
        window.addEventListener('resize', function() { myChart.resize(); });
    }
    // ========== 执行所有图表 ==========
    deptChart();
    bedChart();
    deviceChart();
    energyChart();
    staffChart();
    alertList();
    hospitalMap();

    // 模拟实时数据刷新（每10秒更新一次KPI）
    setInterval(function() {
        // 模拟床位使用率变化
        var newBedUsage = Math.floor(80 + Math.random() * 15);
        $('#bedUsage').html(newBedUsage + '<span style="font-size:16px">%</span>');

        // 模拟急诊接诊量
        var newEmergency = Math.floor(120 + Math.random() * 60);
        $('#emergency').html(newEmergency);

        // 模拟手术量
        var newSurgery = Math.floor(15 + Math.random() * 20);
        $('#surgery').html(newSurgery);

        // 模拟等候时间
        var newWait = Math.floor(15 + Math.random() * 25);
        $('#avgWait').html(newWait + '<span style="font-size:16px">min</span>');
    }, 10000);
});