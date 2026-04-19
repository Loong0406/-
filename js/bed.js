// ========== 床位管理页面 JavaScript ==========

var myChart = echarts.init(document.getElementById("main"));
var myChart1 = echarts.init(document.getElementById("main1"));
var myChart2 = echarts.init(document.getElementById("main2"));
var currentOption = null;

// 科室数据
var wards = [
    { name: '内科', total: 120, used: 108, wait: 12 },
    { name: '外科', total: 110, used: 95, wait: 8 },
    { name: '妇产科', total: 85, used: 82, wait: 15 },
    { name: '儿科', total: 70, used: 58, wait: 6 },
    { name: '骨科', total: 90, used: 72, wait: 10 },
    { name: 'ICU', total: 30, used: 28, wait: 3 },
    { name: '急诊科', total: 45, used: 38, wait: 20 },
    { name: '康复科', total: 60, used: 42, wait: 5 }
];

// 楼层数据
var floors = [
    { name: '1F', total: 120, used: 98, dept: '内科/急诊' },
    { name: '2F', total: 150, used: 128, dept: '外科/骨科' },
    { name: '3F', total: 180, used: 156, dept: '妇产科/儿科' },
    { name: '4F', total: 160, used: 138, dept: 'ICU/手术室' },
    { name: '5F', total: 140, used: 112, dept: '康复科' },
    { name: '6F', total: 130, used: 98, dept: '特需病房' }
];

// 等待入院患者
var waitPatients = [
    { name: '张明', dept: '内科', urgency: '高', waitDays: 3, bedType: '普通' },
    { name: '李芳', dept: '外科', urgency: '中', waitDays: 2, bedType: '普通' },
    { name: '王强', dept: '妇产科', urgency: '高', waitDays: 1, bedType: '单人间' },
    { name: '刘敏', dept: '儿科', urgency: '低', waitDays: 5, bedType: '普通' },
    { name: '陈华', dept: '骨科', urgency: '中', waitDays: 4, bedType: '双人间' },
    { name: '赵丽', dept: 'ICU', urgency: '高', waitDays: 2, bedType: 'ICU' }
];

// 出院计划
var dischargePlans = [
    { name: '李建国', dept: '内科', bedNo: '1203', date: '2024-04-20', status: '待出院' },
    { name: '王秀英', dept: '外科', bedNo: '2105', date: '2024-04-21', status: '待出院' },
    { name: '张伟', dept: '骨科', bedNo: '3102', date: '2024-04-19', status: '今日出院' },
    { name: '刘芳', dept: '妇产科', bedNo: '4008', date: '2024-04-22', status: '待出院' }
];

function updateCharts(option) {
    if (currentOption) myChart.clear();
    myChart.setOption(option);
    currentOption = option;
}

// 清空右侧两个容器的内容（防止残留）
function clearRightContainers() {
    document.getElementById('main1').innerHTML = '';
    document.getElementById('main2').innerHTML = '';
    myChart2.dispose();
    myChart2 = echarts.init(document.getElementById('main2'));
}

// ========== 模式1：总览概览 ==========
function showOverview() {
    $('#statCards').show();
    clearRightContainers();

    var deptNames = wards.map(function(w) { return w.name; });
    var usageRates = wards.map(function(w) { return (w.used / w.total * 100).toFixed(1); });

    var option = {
        title: { text: '各科室床位使用率', textStyle: { color: '#fff' }, left: 'center', top: 10 },
        tooltip: { trigger: 'axis', formatter: '{b}<br/>使用率: {c}%' },
        grid: { left: '8%', right: '5%', top: '15%', bottom: '10%', containLabel: true },
        xAxis: { type: 'category', data: deptNames, axisLabel: { color: '#fff', rotate: 30 }, axisLine: { lineStyle: { color: 'rgba(255,255,255,.2)' } } },
        yAxis: { type: 'value', name: '使用率(%)', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#012f4a' } } },
        series: [{ type: 'bar', data: usageRates, itemStyle: { color: '#7bc5ae', borderRadius: [5,5,0,0] }, label: { show: true, position: 'top', color: '#ffeb7b', formatter: '{c}%' } }]
    };
    updateCharts(option);

    // 右侧上方：近期出院计划
    var dischargeHtml = '<div style="padding: 15px;"><div class="section-title">📅 近期出院计划</div>';
    for (var i = 0; i < dischargePlans.length; i++) {
        var p = dischargePlans[i];
        var statusColor = p.status === '今日出院' ? '#ff6b6b' : '#7bc5ae';
        dischargeHtml += '<div class="alert-item" style="border-left-color: ' + statusColor + ';">';
        dischargeHtml += '<div class="flex-between"><span class="text-white">' + p.name + ' (' + p.dept + ')</span><span style="color: ' + statusColor + ';">' + p.date + '</span></div>';
        dischargeHtml += '<div class="text-muted mt-5">床位号: ' + p.bedNo + ' | ' + p.status + '</div>';
        dischargeHtml += '</div>';
    }
    dischargeHtml += '</div>';
    document.getElementById('main1').innerHTML = dischargeHtml;

    // 右侧下方：全院关键指标
    var totalBeds = wards.reduce(function(sum, w) { return sum + w.total; }, 0);
    var totalUsed = wards.reduce(function(sum, w) { return sum + w.used; }, 0);
    var totalFree = totalBeds - totalUsed;
    var avgUsage = (totalUsed / totalBeds * 100).toFixed(1);

    var statsHtml = '<div style="padding: 15px;"><div class="section-title">📊 全院关键指标</div>';
    statsHtml += '<div class="metric-grid">';
    statsHtml += '<div class="metric-box"><div class="metric-value">' + totalBeds + '</div><div class="metric-label">总床位</div></div>';
    statsHtml += '<div class="metric-box"><div class="metric-value">' + totalUsed + '</div><div class="metric-label">已占用</div></div>';
    statsHtml += '<div class="metric-box"><div class="metric-value">' + totalFree + '</div><div class="metric-label">空余床位</div></div>';
    statsHtml += '<div class="metric-box"><div class="metric-value">' + avgUsage + '<span style="font-size:14px;">%</span></div><div class="metric-label">全院使用率</div></div>';
    statsHtml += '</div></div>';
    document.getElementById('main2').innerHTML = statsHtml;

    var option2 = {
        title: { text: '近7天床位使用趋势', textStyle: { color: '#fff' }, left: 'center', top: 5 },
        tooltip: { trigger: 'axis' },
        grid: { left: '12%', right: '8%', top: '20%', bottom: '10%' },
        xAxis: { type: 'category', data: ['04-11', '04-12', '04-13', '04-14', '04-15', '04-16', '今日'], axisLabel: { color: '#fff' } },
        yAxis: { type: 'value', name: '使用率(%)', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#012f4a' } } },
        series: [{ type: 'line', data: [82, 84, 79, 81, 85, 78, 79], smooth: true, lineStyle: { color: '#ffeb7b', width: 2 }, areaStyle: { opacity: 0.3, color: '#ffeb7b' } }]
    };
    myChart2.setOption(option2);
}

// ========== 模式2：各科室床位 ==========
function showWardDetail() {
    $('#statCards').show();
    clearRightContainers();

    var deptNames = wards.map(function(w) { return w.name; });
    var totalBeds = wards.map(function(w) { return w.total; });
    var usedBeds = wards.map(function(w) { return w.used; });

    var option = {
        title: { text: '各科室床位对比', textStyle: { color: '#fff' }, left: 'center', top: 10 },
        tooltip: { trigger: 'axis' },
        legend: { textStyle: { color: '#fff' }, data: ['总床位', '已占用'], top: 35 },
        grid: { left: '8%', right: '5%', top: '18%', bottom: '10%' },
        xAxis: { type: 'category', data: deptNames, axisLabel: { color: '#fff', rotate: 30 } },
        yAxis: { type: 'value', name: '床位数量', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#012f4a' } } },
        series: [
            { name: '总床位', type: 'bar', data: totalBeds, itemStyle: { color: '#7bc5ae' } },
            { name: '已占用', type: 'bar', data: usedBeds, itemStyle: { color: '#ff9f7f' } }
        ]
    };
    updateCharts(option);

    // 右侧上方：使用率预警
    var warningHtml = '<div style="padding: 15px;margin-bottom: 20px;max-height: 300px;overflow-y: auto;"><div class="section-title">⚠️ 使用率预警</div>';
    for (var i = 0; i < wards.length; i++) {
        var w = wards[i];
        var rate = (w.used / w.total * 100).toFixed(1);
        if (rate > 85) {
            warningHtml += '<div class="warning-item" style="border-left-color: #ff6b6b;"><div class="flex-between"><span class="text-white">🔴 ' + w.name + '</span><span style="color: #ff6b6b;">' + rate + '%</span></div><div class="text-muted">剩余床位: ' + (w.total - w.used) + '</div></div>';
        } else if (rate > 70) {
            warningHtml += '<div class="warning-item" style="border-left-color: #ffd43b;"><div class="flex-between"><span class="text-white">🟡 ' + w.name + '</span><span style="color: #ffd43b;">' + rate + '%</span></div><div class="text-muted">剩余床位: ' + (w.total - w.used) + '</div></div>';
        }
    }
    warningHtml += '</div>';
    document.getElementById('main1').innerHTML = warningHtml;

    // 右侧下方：全院使用趋势图
    var option2 = {
        title: { text: '近7天全院床位使用趋势', textStyle: { color: '#fff' }, left: 'center', top: 5 },
        tooltip: { trigger: 'axis' },
        grid: { left: '12%', right: '8%', top: '20%', bottom: '10%' },
        xAxis: { type: 'category', data: ['04-11', '04-12', '04-13', '04-14', '04-15', '04-16', '今日'], axisLabel: { color: '#fff' } },
        yAxis: { type: 'value', name: '使用率(%)', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#012f4a' } } },
        series: [{ type: 'line', data: [82, 84, 79, 81, 85, 78, 79], smooth: true, lineStyle: { color: '#ffeb7b', width: 2 }, areaStyle: { opacity: 0.3 }, label: { show: true, color: '#ffeb7b' } }]
    };
    myChart2.setOption(option2);
}

// ========== 模式3：楼层分布 ==========
function showFloorDist() {
    $('#statCards').show();
    clearRightContainers();

    var floorNames = floors.map(function(f) { return f.name; });
    var totalBeds = floors.map(function(f) { return f.total; });
    var usedBeds = floors.map(function(f) { return f.used; });

    var option = {
        title: { text: '各楼层床位分布', textStyle: { color: '#fff' }, left: 'center', top: 10 },
        tooltip: { trigger: 'axis' },
        legend: { textStyle: { color: '#fff' }, data: ['总床位', '已占用'], top: 35 },
        grid: { left: '8%', right: '5%', top: '18%', bottom: '10%' },
        xAxis: { type: 'category', data: floorNames, axisLabel: { color: '#fff' } },
        yAxis: { type: 'value', name: '床位数量', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#012f4a' } } },
        series: [
            { name: '总床位', type: 'bar', data: totalBeds, itemStyle: { color: '#7bc5ae' } },
            { name: '已占用', type: 'bar', data: usedBeds, itemStyle: { color: '#ff9f7f' } }
        ]
    };
    updateCharts(option);

    // 右侧上方：楼层详细信息
    var floorHtml = '<div style="padding: 15px;margin-bottom: 20px;max-height: 300px;overflow-y: auto;"><div class="section-title">🏢 楼层详细信息</div>';
    for (var i = 0; i < floors.length; i++) {
        var f = floors[i];
        var rate = (f.used / f.total * 100).toFixed(1);
        var fillClass = rate > 85 ? 'fill-danger' : (rate > 70 ? 'fill-warning' : 'fill-normal');
        floorHtml += '<div class="floor-item">';
        floorHtml += '<div class="floor-header"><span class="floor-name">' + f.name + '</span><span class="floor-stats">' + f.used + '/' + f.total + ' (' + rate + '%)</span></div>';
        floorHtml += '<div class="floor-dept">' + f.dept + '</div>';
        floorHtml += '<div class="progress-bar"><div class="progress-fill ' + fillClass + '" style="width: ' + rate + '%;"></div></div>';
        floorHtml += '</div>';
    }
    floorHtml += '</div>';
    document.getElementById('main1').innerHTML = floorHtml;

    // 右侧下方：科室使用率排行榜
    var rankList = wards.map(function(w) { return { name: w.name, rate: (w.used / w.total * 100).toFixed(1) }; });
    rankList.sort(function(a, b) { return b.rate - a.rate; });
    var rankHtml = '<div style="padding: 15px;margin-bottom: 20px;max-height: 300px;overflow-y: auto;"><div class="section-title">🏆 科室使用率排行榜</div><div class="rank-list">';
    for (var i = 0; i < rankList.length; i++) {
        var r = rankList[i];
        var medal = i === 0 ? '🥇' : (i === 1 ? '🥈' : (i === 2 ? '🥉' : '📊'));
        rankHtml += '<div class="rank-row">';
        rankHtml += '<div class="rank-name"><span class="rank-medal">' + medal + '</span>' + r.name + '</div>';
        rankHtml += '<div class="rank-rate">' + r.rate + '%</div>';
        rankHtml += '</div>';
    }
    rankHtml += '</div></div>';
    document.getElementById('main2').innerHTML = rankHtml;
}

// ========== 模式4：等待入院 ==========
function showWaitList() {
    $('#statCards').show();
    clearRightContainers();

    // 计算各科室等待人数
    var deptWait = {};
    for (var i = 0; i < wards.length; i++) {
        deptWait[wards[i].name] = 0;
    }
    for (var i = 0; i < waitPatients.length; i++) {
        deptWait[waitPatients[i].dept]++;
    }
    var deptNames = Object.keys(deptWait);
    var waitCounts = deptNames.map(function(d) { return deptWait[d]; });

    var option = {
        title: { text: '各科室等待入院人数', textStyle: { color: '#fff' }, left: 'center', top: 10 },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: deptNames, axisLabel: { color: '#fff', rotate: 30 } },
        yAxis: { type: 'value', name: '等待人数', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#012f4a' } } },
        series: [{ type: 'bar', data: waitCounts, itemStyle: { color: '#ff9f7f', borderRadius: [5,5,0,0] }, label: { show: true, position: 'top', color: '#fff' } }]
    };
    updateCharts(option);

    // 右侧上方：等待患者列表
    var waitHtml = '<div style="padding: 15px;margin-bottom: 20px;max-height: 300px;overflow-y: auto;"><div class="section-title">⏳ 等待入院患者列表</div>';
    for (var i = 0; i < waitPatients.length; i++) {
        var p = waitPatients[i];
        var urgencyColor = p.urgency === '高' ? '#ff6b6b' : (p.urgency === '中' ? '#ffd43b' : '#7bc5ae');
        waitHtml += '<div class="wait-card" style="border-left-color: ' + urgencyColor + ';">';
        waitHtml += '<div class="flex-between"><span class="text-white">' + p.name + ' (' + p.dept + ')</span><span style="color: ' + urgencyColor + ';">紧急程度: ' + p.urgency + '</span></div>';
        waitHtml += '<div class="text-muted mt-5">等待: ' + p.waitDays + '天 | 床位类型: ' + p.bedType + '</div>';
        waitHtml += '</div>';
    }
    waitHtml += '</div>';
    document.getElementById('main1').innerHTML = waitHtml;

    // 右侧下方：各科室等待人数分布饼图
    var pieData = [];
    for (var i = 0; i < wards.length; i++) {
        var w = wards[i];
        var waitCount = deptWait[w.name] || 0;
        if (waitCount > 0) {
            pieData.push({ name: w.name, value: waitCount });
        }
    }
    var option2 = {
        title: { text: '各科室等待人数分布', textStyle: { color: '#fff' }, left: 'center', top: 5 },
        tooltip: { trigger: 'item', formatter: '{b}: {c}人 ({d}%)' },
        series: [{
            type: 'pie', radius: '55%', center: ['50%', '50%'],
            data: pieData,
            label: { color: '#fff', formatter: '{b}: {d}%' },
            itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 1 }
        }]
    };
    myChart2.setOption(option2);
}

// ========== 模式5：出院计划 ==========
function showDischarge() {
    $('#statCards').show();
    clearRightContainers();

    var deptDischarge = {};
    for (var i = 0; i < dischargePlans.length; i++) {
        var p = dischargePlans[i];
        if (!deptDischarge[p.dept]) deptDischarge[p.dept] = 0;
        deptDischarge[p.dept]++;
    }
    var deptNames = Object.keys(deptDischarge);
    var dischargeCounts = deptNames.map(function(d) { return deptDischarge[d]; });

    var option = {
        title: { text: '各科室待出院人数', textStyle: { color: '#fff' }, left: 'center', top: 10 },
        xAxis: { type: 'category', data: deptNames, axisLabel: { color: '#fff', rotate: 30 } },
        yAxis: { type: 'value', name: '待出院人数', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#012f4a' } } },
        series: [{ type: 'bar', data: dischargeCounts, itemStyle: { color: '#7bc5ae', borderRadius: [5,5,0,0] }, label: { show: true, position: 'top', color: '#fff' } }]
    };
    updateCharts(option);

    // 右侧上方：出院计划列表
    var dischargeHtml = '<div style="padding: 15px;"><div class="section-title">📅 出院计划列表</div>';
    for (var i = 0; i < dischargePlans.length; i++) {
        var p = dischargePlans[i];
        var statusColor = p.status === '今日出院' ? '#ff6b6b' : '#7bc5ae';
        dischargeHtml += '<div class="alert-item" style="border-left-color: ' + statusColor + ';">';
        dischargeHtml += '<div class="flex-between"><span class="text-white">' + p.name + ' (' + p.dept + ')</span><span style="color: ' + statusColor + ';">' + p.date + '</span></div>';
        dischargeHtml += '<div class="text-muted mt-5">床位号: ' + p.bedNo + ' | ' + p.status + '</div>';
        dischargeHtml += '</div>';
    }
    dischargeHtml += '</div>';
    document.getElementById('main1').innerHTML = dischargeHtml;

    // 右侧下方：床位释放预测
    var option2 = {
        title: { text: '床位释放预测', textStyle: { color: '#fff' }, left: 'center', top: 5 },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['今日', '明天', '后天', '3天后', '4天后'], axisLabel: { color: '#fff' } },
        yAxis: { type: 'value', name: '释放床位', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#012f4a' } } },
        series: [{ type: 'bar', data: [8, 12, 6, 4, 2], itemStyle: { color: '#ffeb7b', borderRadius: [5,5,0,0] }, label: { show: true, position: 'top', color: '#fff' } }]
    };
    myChart2.setOption(option2);
}

// ========== 模式6：统计分析 ==========
function showStatistics() {
    $('#statCards').show();
    clearRightContainers();

    var option = {
        title: { text: '床位周转率分析', textStyle: { color: '#fff' }, left: 'center', top: 10 },
        tooltip: { trigger: 'axis' },
        legend: { textStyle: { color: '#fff' }, data: ['周转率', '平均住院天数'], top: 35 },
        xAxis: { type: 'category', data: wards.map(function(w) { return w.name; }), axisLabel: { color: '#fff', rotate: 30 } },
        yAxis: [{ type: 'value', name: '周转率(%)', axisLabel: { color: '#fff' } }, { type: 'value', name: '住院天数', axisLabel: { color: '#fff' } }],
        series: [
            { name: '周转率', type: 'bar', data: [85, 82, 88, 75, 80, 90, 78, 70], itemStyle: { color: '#7bc5ae' }, label: { show: true, position: 'top', color: '#ffeb7b' } },
            { name: '平均住院天数', type: 'line', yAxisIndex: 1, data: [7.5, 8.2, 6.8, 5.5, 9.0, 12.5, 4.5, 15.0], lineStyle: { color: '#ffeb7b', width: 2 }, symbol: 'circle', symbolSize: 8, label: { show: true, color: '#ffeb7b' } }
        ]
    };
    updateCharts(option);

    // 右侧上方：关键指标统计
    var totalUsed = wards.reduce(function(sum, w) { return sum + w.used; }, 0);
    var totalWait = waitPatients.length;
    var avgStay = 8.5;
    var statsHtml = '<div style="padding: 15px;"><div class="section-title">📊 关键指标统计</div>';
    statsHtml += '<div class="metric-grid">';
    statsHtml += '<div class="metric-box"><div class="metric-value">' + totalUsed + '</div><div class="metric-label">当前住院人数</div></div>';
    statsHtml += '<div class="metric-box"><div class="metric-value">' + totalWait + '</div><div class="metric-label">等待入院</div></div>';
    statsHtml += '<div class="metric-box"><div class="metric-value">' + avgStay + '<span style="font-size:14px;">天</span></div><div class="metric-label">平均住院日</div></div>';
    statsHtml += '<div class="metric-box"><div class="metric-value">92<span style="font-size:14px;">%</span></div><div class="metric-label">床位周转率</div></div>';
    statsHtml += '</div></div>';
    document.getElementById('main1').innerHTML = statsHtml;

    // 右侧下方：使用率分布饼图
    var option2 = {
        title: { text: '床位使用率分布', textStyle: { color: '#fff' }, left: 'center', top: 5 },
        tooltip: { trigger: 'item', formatter: '{b}: {d}%' },
        series: [{
            type: 'pie', radius: '55%',
            data: [
                { value: wards.filter(function(w) { return (w.used / w.total * 100) > 85; }).length, name: '高使用率(>85%)', itemStyle: { color: '#ff6b6b' } },
                { value: wards.filter(function(w) { return (w.used / w.total * 100) > 70 && (w.used / w.total * 100) <= 85; }).length, name: '中等使用率(70-85%)', itemStyle: { color: '#ffd43b' } },
                { value: wards.filter(function(w) { return (w.used / w.total * 100) <= 70; }).length, name: '低使用率(<70%)', itemStyle: { color: '#7bc5ae' } }
            ],
            label: { color: '#fff', formatter: '{b}: {d}%' },
            itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 1 }
        }]
    };
    myChart2.setOption(option2);
}

// 按钮绑定
$('#btnOverview').click(function() { $('.button-group button').removeClass('active'); $(this).addClass('active'); showOverview(); });
$('#btnWard').click(function() { $('.button-group button').removeClass('active'); $(this).addClass('active'); showWardDetail(); });
$('#btnFloor').click(function() { $('.button-group button').removeClass('active'); $(this).addClass('active'); showFloorDist(); });
$('#btnWait').click(function() { $('.button-group button').removeClass('active'); $(this).addClass('active'); showWaitList(); });
$('#btnSchedule').click(function() { $('.button-group button').removeClass('active'); $(this).addClass('active'); showDischarge(); });
$('#btnStats').click(function() { $('.button-group button').removeClass('active'); $(this).addClass('active'); showStatistics(); });

// 默认显示总览
showOverview();

// 窗口大小适配
window.addEventListener('resize', function() {
    if (currentOption) myChart.resize();
    myChart1.resize();
    myChart2.resize();
});