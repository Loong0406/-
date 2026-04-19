// ========== 后勤保障页面 JavaScript ==========

$(function() {
    // ========== 工单数据 ==========
    var workorders = [
        { id: 'WO-001', device: 'MRI核磁共振', location: '影像科3F-2室', desc: '扫描图像出现条纹干扰', time: '2024-04-18 09:23', status: 'pending', urgent: true, assignee: '张工' },
        { id: 'WO-002', device: 'CT计算机断层扫描', location: '影像科1F-1室', desc: '球管曝光异常，需紧急检修', time: '2024-04-18 08:15', status: 'processing', urgent: true, assignee: '李工' },
        { id: 'WO-003', device: '呼吸机', location: 'ICU 3床', desc: '氧浓度调节失灵，报警频繁', time: '2024-04-17 16:30', status: 'processing', urgent: false, assignee: '王工' },
        { id: 'WO-004', device: 'DSA血管造影机', location: '介入室', desc: '图像传输延迟，影响手术', time: '2024-04-17 14:20', status: 'completed', urgent: false, assignee: '赵工' },
        { id: 'WO-005', device: '超声诊断仪', location: '超声科2室', desc: '探头无法识别，需更换探头', time: '2024-04-17 11:45', status: 'pending', urgent: false, assignee: '孙工' },
        { id: 'WO-006', device: '除颤仪', location: '急诊科抢救室', desc: '电池无法充电，急需维修', time: '2024-04-18 07:50', status: 'audit', urgent: true, assignee: '待分配' },
        { id: 'WO-007', device: '监护仪', location: '心内科5F-12床', desc: '血氧探头故障，读数不准', time: '2024-04-16 10:00', status: 'completed', urgent: false, assignee: '钱工' },
        { id: 'WO-008', device: '血液透析机', location: '血透中心3号机', desc: '透析液比例异常报警', time: '2024-04-18 06:30', status: 'pending', urgent: true, assignee: '周工' }
    ];

    var statusMap = {
        'pending': { text: '待处理', class: 'status-pending' },
        'processing': { text: '处理中', class: 'status-processing' },
        'completed': { text: '已完成', class: 'status-completed' },
        'audit': { text: '待审核', class: 'status-audit' }
    };

    function renderOrderStats() {
        var pending = workorders.filter(function(w) { return w.status === 'pending'; }).length;
        var processing = workorders.filter(function(w) { return w.status === 'processing'; }).length;
        var completed = workorders.filter(function(w) { return w.status === 'completed'; }).length;
        var urgent = workorders.filter(function(w) { return w.urgent === true && w.status !== 'completed'; }).length;

        $('#urgentCount').html(urgent > 0 ? '🔥 ' + urgent + '个紧急' : '');

        var html = '<div class="order-stat-card"><div class="order-stat-number">' + pending + '</div><div class="order-stat-label">待处理</div></div>';
        html += '<div class="order-stat-card"><div class="order-stat-number">' + processing + '</div><div class="order-stat-label">处理中</div></div>';
        html += '<div class="order-stat-card"><div class="order-stat-number">' + completed + '</div><div class="order-stat-label">已完成</div></div>';
        html += '<div class="order-stat-card"><div class="order-stat-number" style="color:#ff6b6b;">' + urgent + '</div><div class="order-stat-label">紧急</div></div>';
        $('#orderStats').html(html);
    }

    function renderWorkorderList() {
        var html = '';
        for (var i = 0; i < workorders.length; i++) {
            var w = workorders[i];
            var status = statusMap[w.status];
            var urgentTag = w.urgent ? '<span class="urgent-badge">紧急</span>' : '';
            var borderColor = w.status === 'pending' ? '#ff6b6b' : (w.status === 'processing' ? '#ffd43b' : (w.status === 'completed' ? '#51cf66' : '#7bc5ae'));

            html += '<div class="workorder-item" style="border-left-color: ' + borderColor + ';">';
            html += '<div class="workorder-header">';
            html += '<span class="workorder-device">🔧 ' + w.device + urgentTag + '</span>';
            html += '<span class="workorder-time">' + w.time.substring(5) + '</span>';
            html += '</div>';
            html += '<div class="workorder-location">📍 ' + w.location + ' | 指派: ' + w.assignee + '</div>';
            html += '<div class="workorder-desc">' + w.desc + '</div>';
            html += '<div class="workorder-footer">';
            html += '<span class="status-badge ' + status.class + '">' + status.text + '</span>';
            if (w.status !== 'completed') {
                html += '<button class="btn-action" data-id="' + w.id + '" onclick="updateWorkorderStatus(\'' + w.id + '\')">更新状态</button>';
            } else {
                html += '<span style="font-size:9px; color:#51cf66;">✓ 已完成</span>';
            }
            html += '</div>';
            html += '</div>';
        }
        $('#workorderList').html(html);
    }

    window.updateWorkorderStatus = function(id) {
        for (var i = 0; i < workorders.length; i++) {
            if (workorders[i].id === id) {
                if (workorders[i].status === 'pending') {
                    workorders[i].status = 'processing';
                    alert('工单 ' + id + ' 状态已更新为：处理中');
                } else if (workorders[i].status === 'processing') {
                    workorders[i].status = 'completed';
                    alert('工单 ' + id + ' 状态已更新为：已完成');
                } else if (workorders[i].status === 'audit') {
                    workorders[i].status = 'pending';
                    alert('工单 ' + id + ' 已通过审核，待处理');
                }
                break;
            }
        }
        renderOrderStats();
        renderWorkorderList();
    };

    // ========== 物资库存数据 ==========
    var supplies = [
        { name: '医用口罩', stock: 12500, threshold: 5000, unit: '个' },
        { name: '防护服', stock: 320, threshold: 200, unit: '套' },
        { name: '手套', stock: 8500, threshold: 3000, unit: '双' },
        { name: '消毒液', stock: 180, threshold: 100, unit: '瓶' },
        { name: 'N95口罩', stock: 45, threshold: 100, unit: '个', warning: true }
    ];

    function renderSupplyWarning() {
        var html = '<div style="padding: 5px;">';
        for (var i = 0; i < supplies.length; i++) {
            var s = supplies[i];
            var stockClass = s.stock < s.threshold ? 'low-stock' : '';
            html += '<div class="supply-item">';
            html += '<span class="supply-name">' + s.name + '</span>';
            html += '<span class="supply-stock ' + stockClass + '">' + s.stock + ' ' + s.unit + '</span>';
            html += '</div>';
            if (s.stock < s.threshold) {
                html += '<div style="font-size: 10px; color: #ff6b6b; margin-top: -3px; margin-bottom: 5px; padding-left: 10px;">⚠️ 低于安全库存</div>';
            }
        }
        html += '</div>';
        $('#supplyWarning').html(html);
    }

    // ========== 图表初始化 ==========
    var consumeChart = null;
    var energyMonitorChart = null;
    var energyCompareChart = null;
    var canteenChart = null;
    var parkingChart = null;

    function initCharts() {
        // 物资消耗趋势
        if (consumeChart) consumeChart.dispose();
        consumeChart = echarts.init(document.getElementById('consumeChart'));
        consumeChart.setOption({
            tooltip: { trigger: 'axis' },
            grid: { left: '10%', right: '5%', top: '15%', bottom: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['口罩', '手套', '防护服', '消毒液', '药品'], axisLabel: { color: '#fff', rotate: 25, fontSize: 10 } },
            yAxis: { type: 'value', name: '消耗量', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#012f4a' } } },
            series: [{ type: 'bar', data: [3200, 2800, 450, 320, 180], itemStyle: { color: '#ff9f7f', borderRadius: [4,4,0,0] } }]
        });

        // 能耗实时监控
        if (energyMonitorChart) energyMonitorChart.dispose();
        energyMonitorChart = echarts.init(document.getElementById('energyMonitor'));
        energyMonitorChart.setOption({
            tooltip: { trigger: 'axis' },
            legend: { textStyle: { color: '#fff' }, data: ['电(kWh)', '水(吨)'], right: 10, itemWidth: 20, itemHeight: 10 },
            grid: { left: '12%', right: '8%', top: '20%', bottom: '10%' },
            xAxis: { type: 'category', data: ['0点', '4点', '8点', '12点', '16点', '20点'], axisLabel: { color: '#fff', fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { color: '#fff', fontSize: 10 }, splitLine: { lineStyle: { color: '#012f4a' } } },
            series: [
                { type: 'line', data: [245, 210, 380, 520, 490, 560], name: '电(kWh)', lineStyle: { color: '#ffeb7b', width: 2 }, smooth: true, symbol: 'circle', symbolSize: 5 },
                { type: 'line', data: [12, 10, 18, 25, 22, 28], name: '水(吨)', lineStyle: { color: '#7bc5ae', width: 2 }, smooth: true, symbol: 'circle', symbolSize: 5 }
            ]
        });

        // 能耗对比
        if (energyCompareChart) energyCompareChart.dispose();
        energyCompareChart = echarts.init(document.getElementById('energyCompare'));
        energyCompareChart.setOption({
            tooltip: { trigger: 'axis' },
            grid: { left: '12%', right: '5%', top: '15%', bottom: '10%' },
            xAxis: { type: 'category', data: ['本周', '上周', '去年同期'], axisLabel: { color: '#fff', fontSize: 10 } },
            yAxis: { type: 'value', name: '总能耗(kWh)', axisLabel: { color: '#fff', fontSize: 10 }, splitLine: { lineStyle: { color: '#012f4a' } } },
            series: [{ type: 'bar', data: [28500, 31200, 26800], itemStyle: { color: '#7bc5ae', borderRadius: [4,4,0,0] }, label: { show: true, position: 'top', color: '#ffeb7b', fontSize: 10 } }]
        });

        // 食堂就餐统计
        if (canteenChart) canteenChart.dispose();
        canteenChart = echarts.init(document.getElementById('canteenChart'));
        canteenChart.setOption({
            tooltip: { trigger: 'item' },
            series: [{
                type: 'pie', radius: ['40%', '65%'], center: ['50%', '50%'],
                data: [
                    { value: 320, name: '早餐', itemStyle: { color: '#ffeb7b' } },
                    { value: 580, name: '午餐', itemStyle: { color: '#7bc5ae' } },
                    { value: 450, name: '晚餐', itemStyle: { color: '#ff9f7f' } }
                ],
                label: { color: '#fff', fontSize: 9, formatter: '{b}: {d}%' }
            }]
        });

        // 车位使用情况
        if (parkingChart) parkingChart.dispose();
        parkingChart = echarts.init(document.getElementById('parkingChart'));
        parkingChart.setOption({
            tooltip: { trigger: 'item' },
            series: [{
                type: 'pie', radius: ['40%', '65%'], center: ['50%', '50%'],
                data: [
                    { value: 245, name: '已使用', itemStyle: { color: '#ff9f7f' } },
                    { value: 95, name: '空闲', itemStyle: { color: '#7bc5ae' } }
                ],
                label: { color: '#fff', fontSize: 9, formatter: '{b}: {d}%' }
            }]
        });
    }

    function handleResize() {
        if (consumeChart) consumeChart.resize();
        if (energyMonitorChart) energyMonitorChart.resize();
        if (energyCompareChart) energyCompareChart.resize();
        if (canteenChart) canteenChart.resize();
        if (parkingChart) parkingChart.resize();
    }

    // 初始化所有
    renderSupplyWarning();
    initCharts();
    renderOrderStats();
    renderWorkorderList();

    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 100);
});