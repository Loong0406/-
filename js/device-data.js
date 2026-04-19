// ========== 设备分类数据 ==========
var deviceNames = [
    "CT计算机断层扫描",
    "MRI磁共振成像",
    "DR数字化X光机",
    "DSA血管造影机",
    "超声诊断仪",
    "呼吸机",
    "麻醉机",
    "监护仪",
    "血液透析机",
    "除颤仪",
    "内窥镜系统",
    "手术机器人",
    "心电图机",
    "脑电图机",
    "生化分析仪",
    "直线加速器",
    "PET-CT",
    "移动DR",
    "便携超声",
    "体外碎石机"
];

// ========== 设备详情数据 ==========
var deviceDetails = [
    // CT
    { name: "CT计算机断层扫描", manufacturer: "GE医疗", model: "Revolution CT", installDate: "2022-03", status: "正常", usage: 12450, location: "影像科1室" },
    // MRI
    { name: "MRI磁共振成像", manufacturer: "西门子", model: "Skyra 3.0T", installDate: "2021-11", status: "维护", usage: 8950, location: "影像科2室" },
    // DR
    { name: "DR数字化X光机", manufacturer: "飞利浦", model: "DigitalDiagnost", installDate: "2023-01", status: "正常", usage: 3250, location: "放射科" },
    // DSA
    { name: "DSA血管造影机", manufacturer: "佳能", model: "INFX-9000V", installDate: "2020-08", status: "故障", usage: 2100, location: "介入室" },
    // 超声
    { name: "超声诊断仪", manufacturer: "迈瑞", model: "Resona 8", installDate: "2023-06", status: "正常", usage: 1850, location: "超声科" },
    // 呼吸机
    { name: "呼吸机", manufacturer: "德尔格", model: "Savina 300", installDate: "2022-09", status: "正常", usage: 5600, location: "ICU" },
    // 麻醉机
    { name: "麻醉机", manufacturer: "迈瑞", model: "WATO EX-65", installDate: "2022-05", status: "正常", usage: 1280, location: "手术室" },
    // 监护仪
    { name: "监护仪", manufacturer: "飞利浦", model: "MX500", installDate: "2022-12", status: "正常", usage: 8900, location: "各科室" },
    // 血透机
    { name: "血液透析机", manufacturer: "费森尤斯", model: "4008S", installDate: "2021-07", status: "正常", usage: 3450, location: "血透中心" },
    // 除颤仪
    { name: "除颤仪", manufacturer: "卓尔", model: "R Series", installDate: "2023-02", status: "正常", usage: 520, location: "急诊科" },
    // 内窥镜
    { name: "内窥镜系统", manufacturer: "奥林巴斯", model: "CV-190", installDate: "2021-04", status: "维护", usage: 1860, location: "内镜室" },
    // 手术机器人
    { name: "手术机器人", manufacturer: "达芬奇", model: "Xi", installDate: "2023-08", status: "正常", usage: 420, location: "手术室" },
    // 心电图
    { name: "心电图机", manufacturer: "福田", model: "FX-8322", installDate: "2022-10", status: "正常", usage: 3450, location: "心内科" },
    // 脑电图
    { name: "脑电图机", manufacturer: "尼高力", model: "Nicolet EEG", installDate: "2021-12", status: "正常", usage: 890, location: "神经内科" },
    // 生化分析仪
    { name: "生化分析仪", manufacturer: "贝克曼", model: "AU680", installDate: "2022-04", status: "正常", usage: 12500, location: "检验科" },
    // 直线加速器
    { name: "直线加速器", manufacturer: "瓦里安", model: "TrueBeam", installDate: "2020-10", status: "维护", usage: 3450, location: "放疗科" },
    // PET-CT
    { name: "PET-CT", manufacturer: "西门子", model: "Biograph Vision", installDate: "2022-07", status: "正常", usage: 2100, location: "核医学科" },
    // 移动DR
    { name: "移动DR", manufacturer: "迈瑞", model: "MobiEye 700", installDate: "2023-03", status: "正常", usage: 980, location: "病房" },
    // 便携超声
    { name: "便携超声", manufacturer: "富士", model: "Venue Go", installDate: "2023-05", status: "正常", usage: 650, location: "急诊科" },
    // 体外碎石机
    { name: "体外碎石机", manufacturer: "海德", model: "HD.ESWL-109", installDate: "2021-09", status: "故障", usage: 430, location: "泌尿外科" }
];

// ========== 设备运行数据（按月份） ==========
// 每月使用时长数据（小时）
var usageData = {
    "CT计算机断层扫描": [980, 1020, 1050, 1100, 1150, 1180, 1200, 1250, 1280, 1300, 1320, 1350],
    "MRI磁共振成像": [720, 750, 780, 800, 820, 850, 880, 900, 920, 940, 960, 980],
    "DR数字化X光机": [850, 880, 900, 920, 950, 980, 1000, 1020, 1050, 1080, 1100, 1120],
    "超声诊断仪": [1100, 1150, 1180, 1200, 1220, 1250, 1280, 1300, 1320, 1350, 1380, 1400],
    "呼吸机": [1250, 1280, 1300, 1320, 1350, 1380, 1400, 1420, 1450, 1480, 1500, 1520],
    "监护仪": [1600, 1650, 1680, 1700, 1720, 1750, 1780, 1800, 1820, 1850, 1880, 1900],
    "血液透析机": [280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390],
    "内窥镜系统": [450, 460, 470, 480, 490, 500, 510, 520, 530, 540, 550, 560],
    "手术机器人": [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
    "生化分析仪": [3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100]
};

// 每月故障次数数据
var faultData = {
    "CT计算机断层扫描": [2, 1, 0, 1, 2, 1, 0, 0, 1, 2, 1, 0],
    "MRI磁共振成像": [3, 2, 1, 1, 2, 3, 2, 1, 1, 2, 1, 1],
    "DR数字化X光机": [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    "超声诊断仪": [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    "呼吸机": [1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0],
    "监护仪": [5, 4, 3, 2, 3, 4, 5, 3, 2, 3, 4, 2],
    "血液透析机": [1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2],
    "内窥镜系统": [2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1],
    "手术机器人": [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    "生化分析仪": [3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2]
};

// ========== 设备分类树数据 ==========
var deviceTreeData = {
    "name": "医疗设备",
    "children": [
        {
            "name": "影像设备",
            "children": [
                { "name": deviceNames[0] },  // CT
                { "name": deviceNames[1] },  // MRI
                { "name": deviceNames[2] },  // DR
                { "name": deviceNames[3] },  // DSA
                { "name": deviceNames[4] },  // 超声
                { "name": deviceNames[15] }, // 直线加速器
                { "name": deviceNames[16] }, // PET-CT
                { "name": deviceNames[17] }  // 移动DR
            ]
        },
        {
            "name": "生命支持设备",
            "children": [
                { "name": deviceNames[5] },  // 呼吸机
                { "name": deviceNames[6] },  // 麻醉机
                { "name": deviceNames[7] },  // 监护仪
                { "name": deviceNames[9] },  // 除颤仪
                { "name": deviceNames[12] }  // 心电图机
            ]
        },
        {
            "name": "治疗设备",
            "children": [
                { "name": deviceNames[8] },  // 血透机
                { "name": deviceNames[11] }, // 手术机器人
                { "name": deviceNames[19] }  // 体外碎石机
            ]
        },
        {
            "name": "诊断设备",
            "children": [
                { "name": deviceNames[10] }, // 内窥镜
                { "name": deviceNames[13] }, // 脑电图机
                { "name": deviceNames[14] }, // 生化分析仪
                { "name": deviceNames[18] }  // 便携超声
            ]
        }
    ]
};