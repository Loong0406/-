// ========== 人员调度页面 JavaScript ==========

$(function() {
    // ========== 人员详细数据 ==========
    var staffList = [
        { id: 'S001', name: '张明', dept: '急诊科', status: 'on', shift: '白班', phone: '138****1001', title: '主治医师', joinYear: 2018 },
        { id: 'S002', name: '李芳', dept: '内科', status: 'on', shift: '白班', phone: '138****1002', title: '副主任医师', joinYear: 2015 },
        { id: 'S003', name: '王强', dept: '外科', status: 'on', shift: '夜班', phone: '138****1003', title: '主治医师', joinYear: 2019 },
        { id: 'S004', name: '刘敏', dept: 'ICU', status: 'on', shift: '白班', phone: '138****1004', title: '护士长', joinYear: 2012 },
        { id: 'S005', name: '陈华', dept: '妇产科', status: 'leave', shift: '年假', phone: '138****1005', title: '主任医师', joinYear: 2010 },
        { id: 'S006', name: '赵敏', dept: '儿科', status: 'on', shift: '白班', phone: '138****1006', title: '主治医师', joinYear: 2020 },
        { id: 'S007', name: '孙丽', dept: '放射科', status: 'on', shift: '白班', phone: '138****1007', title: '技师', joinYear: 2021 },
        { id: 'S008', name: '周涛', dept: '检验科', status: 'on', shift: '夜班', phone: '138****1008', title: '主管技师', joinYear: 2017 },
        { id: 'S009', name: '吴静', dept: '急诊科', status: 'on', shift: '夜班', phone: '138****1009', title: '护士', joinYear: 2022 },
        { id: 'S010', name: '郑伟', dept: '外科', status: 'on', shift: '白班', phone: '138****1010', title: '住院医师', joinYear: 2021 },
        { id: 'S011', name: '王芳', dept: '妇产科', status: 'off', shift: '病假', phone: '138****1011', title: '护士', joinYear: 2019 },
        { id: 'S012', name: '李强', dept: 'ICU', status: 'on', shift: '夜班', phone: '138****1012', title: '主治医师', joinYear: 2016 },
        { id: 'S013', name: '张丽', dept: '内科', status: 'on', shift: '白班', phone: '138****1013', title: '护士', joinYear: 2020 },
        { id: 'S014', name: '刘洋', dept: '儿科', status: 'off', shift: '培训', phone: '138****1014', title: '住院医师', joinYear: 2022 },
        { id: 'S015', name: '陈晨', dept: '检验科', status: 'on', shift: '白班', phone: '138****1015', title: '检验师', joinYear: 2021 }
    ];

    function updateSummary() {
        var onDuty = staffList.filter(function(s) { return s.status === 'on'; }).length;
        var offDuty = staffList.filter(function(s) { return s.status === 'off'; }).length;
        var onLeave = staffList.filter(function(s) { return s.status === 'leave'; }).length;
        var nightShift = staffList.filter(function(s) { return s.shift === '夜班' && s.status === 'on'; }).length;
        var totalStaff = staffList.length;

        $('#onDutyTotal').html(onDuty);
        $('#onVacation').html(onLeave);
        $('#nightShift').html(nightShift);
        $('#leaveToday').html(offDuty);
        $('#newStaff').html('3');
        $('#retireStaff').html('1');
        $('#totalStaff').html(totalStaff);
        $('#onDutyHint').html('(共' + onDuty + '人)');
    }

    // 人员悬停弹窗
    var staffTooltip = null;

    function showStaffTooltip(event, staff) {
        if (staffTooltip) { staffTooltip.remove(); staffTooltip = null; }
        var statusText = staff.status === 'on' ? '在岗' : (staff.status === 'off' ? '请假' : '休假');
        var statusColor = staff.status === 'on' ? '#51cf66' : (staff.status === 'off' ? '#ff9f7f' : '#ffd43b');
        var tooltipHtml = '<div class="staff-tooltip">';
        tooltipHtml += '<div class="title">👤 ' + staff.name + '</div>';
        tooltipHtml += '<div class="row"><span class="label">科室</span><span class="value">' + staff.dept + '</span></div>';
        tooltipHtml += '<div class="row"><span class="label">职称</span><span class="value">' + staff.title + '</span></div>';
        tooltipHtml += '<div class="row"><span class="label">联系方式</span><span class="value">' + staff.phone + '</span></div>';
        tooltipHtml += '<div class="row"><span class="label">当前状态</span><span class="value" style="color:' + statusColor + ';">' + statusText + ' (' + staff.shift + ')</span></div>';
        tooltipHtml += '<div class="row"><span class="label">入职年份</span><span class="value">' + staff.joinYear + '年</span></div>';
        tooltipHtml += '</div>';
        $('body').append(tooltipHtml);
        staffTooltip = $('.staff-tooltip');
        var left = event.pageX + 15;
        var top = event.pageY - 60;
        if (left + 220 > $(window).width()) left = event.pageX - 230;
        if (top < 0) top = event.pageY + 20;
        staffTooltip.css({ left: left, top: top, opacity: 1 });
    }

    function hideStaffTooltip() {
        if (staffTooltip) { staffTooltip.remove(); staffTooltip = null; }
    }

    function renderOnDutyList() {
        var html = '<div style="padding: 3px;">';
        for (var i = 0; i < staffList.length; i++) {
            var s = staffList[i];
            if (s.status !== 'on') continue;
            var badgeClass = 'badge-on';
            var badgeText = s.shift;
            var statusDot = '<span class="status-indicator status-on"></span>';
            html += '<div class="staff-card" data-name="' + s.name + '" data-dept="' + s.dept + '" data-phone="' + s.phone + '" data-title="' + s.title + '" data-status="' + s.status + '" data-shift="' + s.shift + '" data-year="' + s.joinYear + '">';
            html += '<div><div class="staff-name">' + statusDot + s.name + '</div><div class="staff-dept">' + s.dept + ' · ' + s.title + '</div></div>';
            html += '<div><span class="' + badgeClass + '">' + badgeText + '</span></div>';
            html += '</div>';
        }
        html += '</div>';
        $('#onDutyList').html(html);

        $('.staff-card').off('mouseenter mouseleave mousemove').on('mouseenter', function(e) {
            var staff = {
                name: $(this).data('name'), dept: $(this).data('dept'), phone: $(this).data('phone'),
                title: $(this).data('title'), status: $(this).data('status'), shift: $(this).data('shift'),
                joinYear: $(this).data('year')
            };
            showStaffTooltip(e, staff);
        }).on('mouseleave', function() { hideStaffTooltip(); }).on('mousemove', function(e) {
            if (staffTooltip) {
                var left = e.pageX + 15, top = e.pageY - 60;
                if (left + 220 > $(window).width()) left = e.pageX - 230;
                staffTooltip.css({ left: left, top: top });
            }
        });
    }

    // 排班表数据
    var scheduleData = [
        { dept: '急诊科', mon: '张明', tue: '张明', wed: '李华', thu: '李华', fri: '王芳', sat: '王芳', sun: '赵强', staffCount: 12 },
        { dept: '内科', mon: '李芳', tue: '李芳', wed: '张明', thu: '张明', fri: '刘敏', sat: '刘敏', sun: '陈华', staffCount: 18 },
        { dept: '外科', mon: '王强', tue: '王强', wed: '王强', thu: '周涛', fri: '周涛', sat: '周涛', sun: '孙丽', staffCount: 15 },
        { dept: 'ICU', mon: '刘敏', tue: '刘敏', wed: '刘敏', thu: '赵敏', fri: '赵敏', sat: '赵敏', sun: '李芳', staffCount: 10 },
        { dept: '妇产科', mon: '王芳', tue: '王芳', wed: '陈丽', thu: '陈丽', fri: '张华', sat: '张华', sun: '李静', staffCount: 14 },
        { dept: '儿科', mon: '赵敏', tue: '赵敏', wed: '刘洋', thu: '刘洋', fri: '王磊', sat: '王磊', sun: '陈晨', staffCount: 11 }
    ];

    function getTodayWeekday() {
        var weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        return weekdays[new Date().getDay()];
    }

    function renderSchedule() {
        var today = getTodayWeekday();
        var html = '<table class="schedule-table"><thead><tr><th>科室</th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th><th>周日</th><th>人数</th></tr></thead><tbody>';
        for (var i = 0; i < scheduleData.length; i++) {
            var s = scheduleData[i];
            html += '<tr>';
            html += '<td style="font-weight:bold; color:#7bc5ae;">' + s.dept + '</td>';
            html += '<td class="' + (today === '周一' ? 'today-highlight' : '') + '">' + s.mon + '</td>';
            html += '<td class="' + (today === '周二' ? 'today-highlight' : '') + '">' + s.tue + '</td>';
            html += '<td class="' + (today === '周三' ? 'today-highlight' : '') + '">' + s.wed + '</td>';
            html += '<td class="' + (today === '周四' ? 'today-highlight' : '') + '">' + s.thu + '</td>';
            html += '<td class="' + (today === '周五' ? 'today-highlight' : '') + '">' + s.fri + '</td>';
            html += '<td class="' + (today === '周六' ? 'today-highlight' : '') + '">' + s.sat + '</td>';
            html += '<td class="' + (today === '周日' ? 'today-highlight' : '') + '">' + s.sun + '</td>';
            html += '<td>' + s.staffCount + '</td>';
            html += '</tr>';
        }
        html += '</tbody></table>';
        $('#scheduleTable').html(html);
    }

    // 排班统计图表
    var scheduleStatsChart = null;
    function renderScheduleStatsChart() {
        var container = document.getElementById('scheduleStatsChart');
        if (!container) return;
        if (scheduleStatsChart) scheduleStatsChart.dispose();
        scheduleStatsChart = echarts.init(container);
        scheduleStatsChart.setOption({
            tooltip: { trigger: 'axis' },
            grid: { left: '10%', right: '5%', top: '15%', bottom: '10%', containLabel: true },
            xAxis: { type: 'category', data: scheduleData.map(function(s) { return s.dept; }), axisLabel: { color: '#fff', rotate: 30, fontSize: 10 } },
            yAxis: { type: 'value', name: '值班人数', axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#012f4a' } } },
            series: [{ type: 'bar', data: scheduleData.map(function(s) { return s.staffCount; }), itemStyle: { color: '#ffeb7b', borderRadius: [4,4,0,0] }, label: { show: true, position: 'top', color: '#ffeb7b', fontSize: 10 } }]
        });
    }

    // 人员缺口
    var shortages = [
        { dept: 'ICU', shortage: 3, reason: '重症患者增加，急需增援', current: 8, need: 11, urgent: true },
        { dept: '急诊科', shortage: 2, reason: '夜班人手不足，急诊量上升', current: 6, need: 8, urgent: true },
        { dept: '手术室', shortage: 2, reason: '手术量增加，护士短缺', current: 5, need: 7, urgent: false },
        { dept: '儿科', shortage: 1, reason: '流感季节患儿增多', current: 4, need: 5, urgent: false }
    ];

    function shortageList() {
        var urgentCount = shortages.filter(function(s) { return s.urgent; }).length;
        $('#urgentHint').html(urgentCount > 0 ? '⚠️ ' + urgentCount + '个紧急' : '');
        var html = '<div style="padding: 5px;">';
        for (var i = 0; i < shortages.length; i++) {
            var s = shortages[i];
            var urgentTag = s.urgent ? '<span style="background:#ff6b6b; padding:2px 6px; border-radius:4px; font-size:10px; margin-left:8px;">紧急</span>' : '';
            html += '<div class="shortage-item">';
            html += '<div style="display: flex; justify-content: space-between;"><div><span style="color: #ffeb7b; font-weight: bold;">⚠️ ' + s.dept + urgentTag + '</span></div><div style="color: #ff6b6b; font-family: electronicFont;">缺 ' + s.shortage + ' 人</div></div>';
            html += '<div style="font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 5px;">' + s.reason + '</div>';
            html += '<div style="font-size: 10px; color: rgba(255,255,255,0.5); margin-top: 3px;">当前: ' + s.current + '人 | 需要: ' + s.need + '人</div>';
            html += '<div style="margin-top: 6px;"><button class="btn-action" onclick="alert(\'已向人事部门发送 ' + s.dept + ' 增援申请\')">📢 申请增援</button></div>';
            html += '</div>';
        }
        html += '</div>';
        $('#shortageList').html(html);
    }

    // 科室人员分布图表
    var staffChart = null;
    function deptStaffChart() {
        var container = document.getElementById('deptStaffChart');
        if (!container) return;
        if (staffChart) staffChart.dispose();
        staffChart = echarts.init(container);
        staffChart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '10%', right: '5%', top: '10%', bottom: '10%', containLabel: true },
            xAxis: { type: 'category', data: ['急诊科', '内科', '外科', 'ICU', '妇产科', '儿科', '放射科', '检验科'],
                axisLabel: { color: '#fff', rotate: 30, fontSize: 10 },
                axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } } },
            yAxis: { type: 'value', name: '人数', nameTextStyle: { color: '#fff' },
                axisLabel: { color: '#fff' }, splitLine: { lineStyle: { color: '#012f4a' } } },
            series: [{
                type: 'bar',
                data: [32, 45, 38, 24, 28, 22, 15, 18],
                itemStyle: { color: '#7bc5ae', borderRadius: [4,4,0,0] },
                label: { show: true, position: 'top', color: '#ffeb7b', fontSize: 10 }
            }]
        });
    }

    function handleResize() {
        if (staffChart) staffChart.resize();
        if (scheduleStatsChart) scheduleStatsChart.resize();
    }

    updateSummary();
    renderOnDutyList();
    renderSchedule();
    renderScheduleStatsChart();
    shortageList();
    deptStaffChart();

    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 100);
});