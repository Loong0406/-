// ========== 综合看板 JavaScript ==========

// 科室楼层分布数据
var floorDepartments = [
    { floor: '1F', name: '门诊大厅', dept: '挂号/药房/急诊', director: '王建国', phone: '138****1001', reception: 856, usage: 78, total: 120, used: 94 },
    { floor: '2F', name: '内科诊疗区', dept: '内科/心内科/呼吸科', director: '张敏', phone: '138****1002', reception: 342, usage: 85, total: 150, used: 128 },
    { floor: '3F', name: '外科诊疗区', dept: '外科/骨科/神经外科', director: '李伟', phone: '138****1003', reception: 298, usage: 82, total: 140, used: 115 },
    { floor: '4F', name: '妇儿中心', dept: '妇产科/儿科', director: '陈芳', phone: '138****1004', reception: 267, usage: 88, total: 130, used: 114 },
    { floor: '5F', name: 'ICU/手术室', dept: '重症监护/手术中心', director: '刘强', phone: '138****1005', reception: 156, usage: 92, total: 60, used: 55 },
    { floor: '6F', name: '医技科室', dept: '检验科/影像科/超声科', director: '赵丽华', phone: '138****1006', reception: 890, usage: 75, total: 100, used: 75 },
    { floor: '7F', name: '康复中心', dept: '康复科/理疗科', director: '孙涛', phone: '138****1007', reception: 134, usage: 70, total: 80, used: 56 },
    { floor: '8F', name: '行政办公区', dept: '院办/医务科/护理部', director: '周明', phone: '138****1008', reception: 0, usage: 45, total: 40, used: 18 }
];

// 生成科室楼层分布HTML
function renderFloorDistribution() {
    var html = '<div class="floor-list">';
    for (var i = 0; i < floorDepartments.length; i++) {
        var d = floorDepartments[i];
        var rate = (d.used / d.total * 100).toFixed(1);
        var fillClass = rate > 85 ? 'fill-danger' : (rate > 70 ? 'fill-warning' : 'fill-normal');
        html += '<div class="floor-item" data-floor="' + d.floor + '" data-name="' + d.name + '" data-dept="' + d.dept + '" data-director="' + d.director + '" data-phone="' + d.phone + '" data-reception="' + d.reception + '" data-usage="' + rate + '" data-used="' + d.used + '" data-total="' + d.total + '">';
        html += '<div class="floor-icon">' + d.floor + '</div>';
        html += '<div class="floor-info">';
        html += '<div class="floor-name">' + d.name + '</div>';
        html += '<div class="floor-dept">' + d.dept + '</div>';
        html += '</div>';
        html += '<div class="floor-right">';
        html += '<div class="floor-usage">' + rate + '%</div>';
        html += '<div class="floor-beds">床位: ' + d.used + '/' + d.total + '</div>';
        html += '<div class="progress-small"><div class="progress-small-fill ' + fillClass + '" style="width: ' + rate + '%;"></div></div>';
        html += '</div>';
        html += '</div>';
    }
    html += '</div>';
    $('#hospitalMap').html(html);
}

// 创建并显示弹窗
var tooltip = null;

function showDeptTooltip(event, data) {
    if (tooltip) {
        $(tooltip).remove();
        tooltip = null;
    }
    var usageRate = (data.used / data.total * 100).toFixed(1);
    var statusText = usageRate > 85 ? '🔴 繁忙' : (usageRate > 70 ? '🟡 正常' : '🟢 宽松');
    var tooltipHtml = '<div class="dept-tooltip">';
    tooltipHtml += '<div class="title">📌 ' + data.name + ' (' + data.floor + ')</div>';
    tooltipHtml += '<div class="row"><span class="label">📍 科室</span><span class="value">' + data.dept + '</span></div>';
    tooltipHtml += '<div class="row"><span class="label">👨‍⚕️ 科主任</span><span class="value">' + data.director + '</span></div>';
    tooltipHtml += '<div class="row"><span class="label">📞 联系方式</span><span class="value">' + data.phone + '</span></div>';
    tooltipHtml += '<div class="row"><span class="label">📊 今日接诊</span><span class="value">' + data.reception + ' 人次</span></div>';
    tooltipHtml += '<div class="row"><span class="label">🛏️ 床位使用</span><span class="value">' + data.used + '/' + data.total + ' (' + usageRate + '%)</span></div>';
    tooltipHtml += '<div class="row"><span class="label">⚡ 状态</span><span class="value">' + statusText + '</span></div>';
    tooltipHtml += '</div>';
    $('body').append(tooltipHtml);
    tooltip = $('.dept-tooltip');
    var left = event.pageX + 15;
    var top = event.pageY - 50;
    if (left + 280 > $(window).width()) {
        left = event.pageX - 290;
    }
    if (top < 0) {
        top = event.pageY + 20;
    }
    tooltip.css({ left: left, top: top, opacity: 1 });
}

function hideDeptTooltip() {
    if (tooltip) {
        tooltip.remove();
        tooltip = null;
    }
}

// 绑定鼠标悬停事件
function bindFloorEvents() {
    $('.floor-item').off('mouseenter mouseleave').on('mouseenter', function(e) {
        var data = {
            floor: $(this).data('floor'),
            name: $(this).data('name'),
            dept: $(this).data('dept'),
            director: $(this).data('director'),
            phone: $(this).data('phone'),
            reception: $(this).data('reception'),
            used: $(this).data('used'),
            total: $(this).data('total')
        };
        showDeptTooltip(e, data);
    }).on('mouseleave', function() {
        hideDeptTooltip();
    }).on('mousemove', function(e) {
        if (tooltip) {
            var left = e.pageX + 15;
            var top = e.pageY - 50;
            if (left + 280 > $(window).width()) {
                left = e.pageX - 290;
            }
            tooltip.css({ left: left, top: top });
        }
    });
}

// 初始化科室楼层分布
renderFloorDistribution();
bindFloorEvents();

// 模拟实时数据刷新
setInterval(function() {
    var newBedUsage = Math.floor(80 + Math.random() * 15);
    $('#bedUsage').html(newBedUsage + '<span style="font-size:16px">%</span>');
    var newEmergency = Math.floor(120 + Math.random() * 60);
    $('#emergency').html(newEmergency);
    var newSurgery = Math.floor(15 + Math.random() * 20);
    $('#surgery').html(newSurgery);
    var newWait = Math.floor(15 + Math.random() * 25);
    $('#avgWait').html(newWait + '<span style="font-size:16px">min</span>');

    // 更新入院出院数据
    var newAdmit = Math.floor(30 + Math.random() * 40);
    var newDischarge = Math.floor(30 + Math.random() * 40);
    var newInpatient = Math.floor(500 + Math.random() * 150);
    $('#admitToday').html(newAdmit);
    $('#dischargeToday').html(newDischarge);
    $('#inpatientTotal').html(newInpatient);
}, 10000);