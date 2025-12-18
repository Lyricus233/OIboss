import { CalendarEvent } from './types';

export const PROVINCES = [
  {
    name: '浙江',
    id: 'ZJ',
    type: 'strong',
    desc: 'OI 传统强省，神犇遍地走。',
    buff: { talent: 10, stress: 10, reputation: 20 },
  },
  {
    name: '江苏',
    id: 'JS',
    type: 'strong',
    desc: '教育高地，内卷严重。',
    buff: { talent: 8, stress: 8, reputation: 15 },
  },
  {
    name: '广东',
    id: 'GD',
    type: 'strong',
    desc: '经济发达，竞赛氛围浓厚。',
    buff: { talent: 8, money: 50000, stress: 5 },
  },
  {
    name: '四川',
    id: 'SC',
    type: 'strong',
    desc: '天府之国，集训队常客。',
    buff: { talent: 7, stress: 5, reputation: 10 },
  },
  {
    name: '北京',
    id: 'BJ',
    type: 'strong',
    desc: '帝都，资源集中，高手如云。',
    buff: { talent: 9, money: -50000, reputation: 25 },
  },
  {
    name: '上海',
    id: 'SH',
    type: 'strong',
    desc: '魔都，国际化视野，竞争激烈。',
    buff: { talent: 9, money: -50000, reputation: 25 },
  },
  {
    name: '山东',
    id: 'SD',
    type: 'strong',
    desc: '孔孟之乡，重视教育，基础扎实。',
    buff: { talent: 6, stress: 12, reputation: 5 },
  },
  {
    name: '湖南',
    id: 'HN',
    type: 'strong',
    desc: '惟楚有材，于斯为盛。',
    buff: { talent: 9, stress: 8, reputation: 15 },
  },
  {
    name: '重庆',
    id: 'CQ',
    type: 'strong',
    desc: '山城，火锅与代码更配哦。',
    buff: { talent: 6, stress: 8, reputation: 10 },
  },

  {
    name: '福建',
    id: 'FJ',
    type: 'medium',
    desc: '沿海省份，有一定竞赛传统。',
    buff: { talent: 5, stress: 2 },
  },
  {
    name: '安徽',
    id: 'AH',
    type: 'medium',
    desc: '紧邻江浙，正在崛起。',
    buff: { talent: 4, stress: 2 },
  },
  {
    name: '湖北',
    id: 'HB',
    type: 'medium',
    desc: '九省通衢，教育大省。',
    buff: { talent: 5, stress: 3 },
  },
  {
    name: '天津',
    id: 'TJ',
    type: 'medium',
    desc: '紧邻北京，有一定优势。',
    buff: { talent: 3, stress: 1 },
  },
  {
    name: '河南',
    id: 'HA',
    type: 'medium',
    desc: '人口大省，高考大省。',
    buff: { talent: 3, stress: 15, money: -20000 },
  },
  {
    name: '河北',
    id: 'HE',
    type: 'medium',
    desc: '衡水模式，卷到极致。',
    buff: { talent: 3, stress: 20 },
  },
  {
    name: '陕西',
    id: 'SN',
    type: 'medium',
    desc: '西北教育中心。',
    buff: { talent: 3, stress: 1 },
  },
  {
    name: '吉林',
    id: 'JL',
    type: 'medium',
    desc: '东北老工业基地，基础尚可。',
    buff: { talent: 2, stress: 0 },
  },
  {
    name: '辽宁',
    id: 'LN',
    type: 'medium',
    desc: '东北大省，有一定底蕴。',
    buff: { talent: 2, stress: 0 },
  },

  {
    name: '黑龙江',
    id: 'HL',
    type: 'weak',
    desc: '冰雪之乡，竞赛氛围稍弱。',
    buff: { talent: 0, money: 20000 },
  },
  {
    name: '山西',
    id: 'SX',
    type: 'weak',
    desc: '煤炭大省，转型中。',
    buff: { talent: 0, money: 10000 },
  },
  {
    name: '江西',
    id: 'JX',
    type: 'weak',
    desc: '环强省带，存在感较低。',
    buff: { talent: 1, money: 10000 },
  },
  {
    name: '广西',
    id: 'GX',
    type: 'weak',
    desc: '山水甲天下，竞赛待发展。',
    buff: { talent: -2, money: 30000 },
  },
  {
    name: '海南',
    id: 'HI',
    type: 'weak',
    desc: '椰风海韵，适合养老。',
    buff: { talent: -3, money: 30000, stress: -10 },
  },
  {
    name: '云南',
    id: 'YN',
    type: 'weak',
    desc: '彩云之南，生活惬意。',
    buff: { talent: -2, money: 20000, stress: -5 },
  },
  {
    name: '贵州',
    id: 'GZ',
    type: 'weak',
    desc: '大数据中心，未来可期。',
    buff: { talent: -1, money: 20000 },
  },
  {
    name: '甘肃',
    id: 'GS',
    type: 'weak',
    desc: '西北腹地，资源较少。',
    buff: { talent: -2, money: 40000 },
  },
  {
    name: '青海',
    id: 'QH',
    type: 'weak',
    desc: '高原明珠，地广人稀。',
    buff: { talent: -3, money: 50000 },
  },
  {
    name: '宁夏',
    id: 'NX',
    type: 'weak',
    desc: '塞上江南，小而美。',
    buff: { talent: -2, money: 40000 },
  },
  {
    name: '新疆',
    id: 'XJ',
    type: 'weak',
    desc: '广阔天地，大有可为。',
    buff: { talent: -2, money: 50000 },
  },
  {
    name: '西藏',
    id: 'XZ',
    type: 'weak',
    desc: '世界屋脊，缺氧不缺精神。',
    buff: { talent: -5, money: 80000, stress: -20 },
  },
  {
    name: '内蒙古',
    id: 'NM',
    type: 'weak',
    desc: '草原牧歌，心旷神怡。',
    buff: { talent: -2, money: 40000 },
  },

  { name: '香港', id: 'HK', type: 'special', desc: '暂未开放', disabled: true },
  { name: '澳门', id: 'MO', type: 'special', desc: '暂未开放', disabled: true },
  { name: '台湾', id: 'TW', type: 'special', desc: '暂未开放', disabled: true },
];

export const INITIAL_CASH = {
  TIER1: 500000,
  PROVINCIAL: 300000,
  REMOTE: 150000,
};

export const WEEKLY_RENT = {
  TIER1: 15000,
  PROVINCIAL: 8000,
  REMOTE: 3000,
};

export const GAME_OVER_THRESHOLDS = {
  MIN_MORALE: 0,
  MAX_STRESS: 100,
  MIN_REPUTATION: 0,
  MIN_SATISFACTION: 0,
  MIN_CASH: 0,
};

export const SCORING_WEIGHTS = {
  CASH: 0.01,
  REPUTATION: 10,
  STUDENT_COUNT: 100,
  MEDALS: 500,
  COACH_LEVEL: 200,
};

export const COACH_UPGRADE_COSTS: Record<number, number> = {
  1: 10000,
  2: 30000,
  3: 60000,
  4: 100000,
  5: 200000,
  6: 500000,
};

export const FACILITY_CONFIG: Record<
  number,
  { label: string; maxStudents: number; rent: number; cost: number }
> = {
  1: { label: '小型工作室', maxStudents: 20, rent: 0, cost: 0 },
  2: { label: '标准培训教室', maxStudents: 50, rent: 5000, cost: 50000 },
  3: { label: '专业写字楼', maxStudents: 100, rent: 15000, cost: 200000 },
  4: { label: '独栋教学楼', maxStudents: 150, rent: 40000, cost: 1000000 },
};

export const RECRUITMENT_CONFIG = {
  BEGINNER: {
    label: '普及组学生',
    cost: 5000,
    req: { reputation: 0, coachLevel: 1 },
    abilityRange: { min: 5, max: 20 },
    talentRange: { min: 40, max: 70 },
  },
  INTERMEDIATE: {
    label: '提高组学生',
    cost: 20000,
    req: { reputation: 100, coachLevel: 2 },
    abilityRange: { min: 25, max: 50 },
    talentRange: { min: 60, max: 90 },
  },
  ADVANCED: {
    label: '省队选手',
    cost: 100000,
    req: { reputation: 500, coachLevel: 4 },
    abilityRange: { min: 60, max: 100 },
    talentRange: { min: 80, max: 100 },
  },
};

export const NAMES = {
  surnames: [
    '王',
    '李',
    '张',
    '刘',
    '陈',
    '杨',
    '赵',
    '黄',
    '周',
    '吴',
    '徐',
    '孙',
    '胡',
    '朱',
    '高',
    '林',
    '何',
    '郭',
    '马',
    '罗',
    '梁',
    '宋',
    '郑',
    '谢',
    '韩',
    '唐',
    '冯',
    '于',
    '董',
    '萧',
    '程',
    '曹',
    '袁',
    '邓',
    '许',
    '傅',
    '沈',
    '曾',
    '彭',
    '吕',
    '苏',
    '卢',
    '蒋',
    '蔡',
    '贾',
    '丁',
    '魏',
    '薛',
    '叶',
    '阎',
    '余',
    '潘',
    '杜',
    '戴',
    '夏',
    '钟',
    '汪',
    '田',
    '任',
    '姜',
  ],
  names: [
    '伟',
    '芳',
    '娜',
    '敏',
    '静',
    '丽',
    '强',
    '磊',
    '军',
    '洋',
    '勇',
    '艳',
    '杰',
    '娟',
    '涛',
    '明',
    '超',
    '秀英',
    '浩',
    '梓涵',
    '一诺',
    '宇轩',
    '子涵',
    '欣怡',
    '梓萱',
    '诗涵',
    '雨桐',
    '可馨',
    '雨泽',
    '子轩',
    '浩宇',
    '宇航',
    '浩然',
    '致远',
    '俊驰',
    '鹏涛',
    '炎彬',
    '鹤轩',
    '越彬',
    '风华',
    '靖琪',
    '明辉',
    '伟诚',
    '明轩',
    '健柏',
    '修杰',
    '志泽',
    '弘文',
    '峻熙',
    '嘉懿',
    '煜城',
    '懿轩',
    '烨伟',
    '苑博',
    '伟泽',
    '熠彤',
    '鸿煊',
    '博涛',
    '烨霖',
    '烨华',
    '煜祺',
    '智宸',
    '正豪',
    '昊然',
    '明杰',
    '立诚',
    '立轩',
    '立辉',
    '峻熙',
    '弘文',
    '弘博',
    '弘毅',
    '弘图',
    '弘大',
    '弘方',
    '弘业',
    '博雅',
    '知行',
  ],
};

export const TAGS = [
  { name: '卷王', desc: '训练效果+20%，压力增加快', effect: { train: 1.2, stress: 1.5 } },
  { name: '天才', desc: '能力成长+50%', effect: { ability: 1.5 } },
  { name: '摸鱼', desc: '压力增加慢，训练效果-10%', effect: { stress: 0.7, train: 0.9 } },
  { name: '大心脏', desc: '比赛发挥稳定，不易失误', effect: { stability: 1.2 } },
  { name: '玻璃心', desc: '压力过高容易生病', effect: { sickChance: 1.5 } },
  { name: '富二代', desc: '学费+50%，但比较难管', effect: { tuition: 1.5, discipline: 0.8 } },
  {
    name: '偏科',
    desc: '数学极好但语文极差，偶尔会有奇思妙想',
    effect: { creativity: 1.3, stability: 0.8 },
  },
  { name: '勤奋', desc: '每天多练一小时，能力成长+10%', effect: { ability: 1.1, stress: 1.1 } },
  { name: '社牛', desc: '能带动周围同学气氛，满意度+10%', effect: { satisfaction: 1.1 } },
  { name: '锦鲤', desc: '运气极好，比赛时容易超常发挥', effect: { luck: 1.5 } },
  { name: '手速怪', desc: '打字速度极快，模拟赛优势明显', effect: { contest: 1.1 } },
  { name: '领袖', desc: '比赛时能稳定军心，全队发挥更稳定', effect: { teamStability: 1.2 } },
  { name: '考霸', desc: '平时不显山露水，一到考试就爆种', effect: { contest: 1.2 } },
  {
    name: '迟钝',
    desc: '反应慢半拍，压力增长极慢，但训练效果略低',
    effect: { stress: 0.5, train: 0.8 },
  },
  { name: '活泼', desc: '性格开朗，极少出现心理问题', effect: { satisfaction: 1.2 } },
];

export const CALENDAR_EVENTS: Record<number, CalendarEvent> = {
  4: {
    week: 4,
    name: 'CSP-J/S 第一轮',
    type: 'CONTEST',
    description: '计算机学会组织的初赛，考察基础知识。',
  },
  8: {
    week: 8,
    name: 'CSP-J/S 第二轮',
    type: 'CONTEST',
    description: '复赛，真正的上机编程考验。',
  },
  12: {
    week: 12,
    name: 'NOIP',
    type: 'CONTEST',
    description: '全国青少年信息学奥林匹克联赛，通往省队的必经之路。',
  },
  16: {
    week: 16,
    name: 'NOIWC',
    type: 'CONTEST',
    description: '全国青少年信息学奥林匹克竞赛冬令营',
  },
  20: {
    week: 20,
    name: '省队选拔',
    type: 'CONTEST',
    description: '选拔各省参加全国赛的代表队',
    stages: [
      {
        name: 'Day 1',
        description: '第一场',
        problems: [
          { difficulty: 6, quality: 7 },
          { difficulty: 7, quality: 7 },
          { difficulty: 8, quality: 8 },
        ],
      },
      {
        name: 'Day 2',
        description: '第二场',
        problems: [
          { difficulty: 7, quality: 7 },
          { difficulty: 8, quality: 8 },
          { difficulty: 9, quality: 6 },
        ],
      },
    ],
  },
  25: {
    week: 25,
    name: 'APIO',
    type: 'CONTEST',
    description: '亚太地区信息学奥林匹克竞赛',
  },
  30: {
    week: 30,
    name: 'NOI',
    type: 'CONTEST',
    description: '全国信息学奥林匹克竞赛',
    stages: [
      {
        name: 'Day 1',
        description: '笔试 + 第一场上机',
        problems: [
          { difficulty: 7, quality: 9 },
          { difficulty: 8, quality: 9 },
          { difficulty: 9, quality: 9 },
        ],
      },
      {
        name: 'Day 2',
        description: '第二场上机',
        problems: [
          { difficulty: 8, quality: 9 },
          { difficulty: 9, quality: 9 },
          { difficulty: 10, quality: 8 },
        ],
      },
    ],
  },
  35: {
    week: 35,
    name: 'CTS (国家队选拔)',
    type: 'CONTEST',
    description: '选拔国家队成员，题目难度极高。',
    stages: [
      {
        name: 'Day 1',
        description: '第一场测试',
        problems: [
          { difficulty: 9, quality: 8 },
          { difficulty: 10, quality: 8 },
          { difficulty: 10, quality: 7 },
        ],
      },
      {
        name: 'Day 2',
        description: '第二场测试',
        problems: [
          { difficulty: 9, quality: 8 },
          { difficulty: 10, quality: 8 },
          { difficulty: 10, quality: 6 },
        ],
      },
    ],
  },
};

export const AGENCY_ACTIONS = [
  {
    id: 'promo',
    name: '举办线下宣讲会',
    desc: '租酒店、印易拉宝、发传单，冲一波曝光。',
    cost: -15000,
    outcomes: [
      {
        weight: 60,
        description: '现场火爆，家长们排队咨询！',
        effects: { reputation: +5, potentialStudents: +12, bossStress: +5 },
        type: 'success',
      },
      {
        weight: 30,
        description: '来的人不算多，但也发了不少传单。',
        effects: { reputation: +2, potentialStudents: +5, bossStress: +5 },
        type: 'info',
      },
      {
        weight: 10,
        description: '隔壁机构也在搞活动，被抢了风头。',
        effects: { reputation: -1, potentialStudents: +1, bossStress: +10 },
        type: 'warning',
      },
    ],
  },
  {
    id: 'camp',
    name: '开设集训营',
    desc: '请金牌教练举办集训营，集中提升学生水平。',
    cost: -25000,
    outcomes: [
      {
        weight: 50,
        description: '集训效果显著，学生能力大幅提升！',
        effects: {
          reputation: +5,
          studentSatisfaction: +5,
          coachMorale: -5,
          bossStress: +8,
        },
        type: 'success',
      },
      {
        weight: 40,
        description: '集训顺利结束，无功无过。',
        effects: {
          reputation: +2,
          studentSatisfaction: +2,
          coachMorale: -5,
          bossStress: +8,
        },
        type: 'info',
      },
      {
        weight: 10,
        description: '有学生吐槽伙食太差，家长群里有怨言。',
        effects: {
          reputation: -2,
          studentSatisfaction: -5,
          coachMorale: -8,
          bossStress: +15,
        },
        type: 'danger',
      },
    ],
  },
  {
    id: 'squeeze',
    name: '压榨教练课时',
    desc: '同一节课塞两倍学生，教练上满课。',
    cost: 0,
    outcomes: [
      {
        weight: 20,
        description: '教练们居然抗住了压力，收入暴涨。',
        effects: {
          money: +20000,
          reputation: -2,
          coachMorale: -8,
          studentSatisfaction: -3,
        },
        type: 'success',
      },
      {
        weight: 50,
        description: '虽然赚了钱，但大家都很疲惫。',
        effects: {
          money: +15000,
          reputation: -4,
          coachMorale: -10,
          studentSatisfaction: -5,
        },
        type: 'warning',
      },
      {
        weight: 30,
        description: '教练集体抗议，家长也纷纷投诉。',
        effects: {
          money: +5000,
          reputation: -8,
          coachMorale: -20,
          studentSatisfaction: -10,
        },
        type: 'danger',
      },
    ],
  },
  {
    id: 'invest',
    name: '投入教研与命题',
    desc: '搭建题库、出模拟赛、复盘数据。',
    cost: -12000,
    outcomes: [
      {
        weight: 40,
        description: '神预测！模拟赛押中了原题！',
        effects: { reputation: +8, coachMorale: +5 },
        type: 'success',
      },
      {
        weight: 50,
        description: '题库得到了充实。',
        effects: { reputation: +3, coachMorale: +2 },
        type: 'info',
      },
      {
        weight: 10,
        description: '题目出太难了，被学生在网上吐槽。',
        effects: { reputation: -1, coachMorale: -2 },
        type: 'warning',
      },
    ],
  },
  {
    id: 'salary',
    name: '上调教练待遇',
    desc: '给教练加薪、报销晚饭和打车。',
    cost: -15000,
    outcomes: [
      {
        weight: 70,
        description: '教练们士气大振，发誓要带出金牌！',
        effects: { coachMorale: +15, reputation: +3, bossStress: -5 },
        type: 'success',
      },
      {
        weight: 30,
        description: '大家觉得这是理所应当的。',
        effects: { coachMorale: +8, reputation: +1, bossStress: -3 },
        type: 'info',
      },
    ],
  },
  {
    id: 'rest',
    name: '给自己放一周假',
    desc: '不看家长群，不回消息，休息一周。',
    cost: 0,
    outcomes: [
      {
        weight: 50,
        description: '久违的宁静，身心舒畅。',
        effects: { bossStress: -15, reputation: -1 },
        type: 'success',
      },
      {
        weight: 50,
        description: '虽然人在休息，但电话还是响个不停。',
        effects: { bossStress: -5, reputation: -2 },
        type: 'warning',
      },
    ],
  },
  {
    id: 'train',
    name: '安排专项训练',
    desc: '制定本周的训练计划，在提升能力和控制压力之间寻找平衡。',
    cost: 0,
    outcomes: [],
    theme: 'primary',
  },
  {
    id: 'relax',
    name: '组织团建活动',
    desc: '带学生和教练出去放松一下，劳逸结合才能更好出成绩。',
    cost: 0,
    outcomes: [],
    theme: 'success',
  },
  {
    id: 'bankruptcy',
    name: '申请破产清算',
    desc: '实在撑不下去了，遣散员工，关门大吉。',
    cost: 0,
    outcomes: [],
    theme: 'danger',
  },
];

export const RANDOM_EVENTS = [
  {
    id: 'price_war',
    title: '隔壁机构打价格战',
    text: '同城另一家 OI 机构突然推出 9.9 元 10 节体验课，全城家长群都在转。',
    minWeek: 4,
    options: [
      {
        id: 'join',
        label: '硬刚，跟进价格战',
        outcomes: [
          {
            weight: 50,
            description: '你也上了 9.9 体验课，短期内涌入不少学生，但教练有点炸裂。',
            effects: { money: -8000, reputation: +2, students: +6, coachMorale: -3 },
            type: 'success',
          },
          {
            weight: 30,
            description: '虽然跟进了价格战，但家长觉得便宜没好货，效果一般。',
            effects: { money: -8000, reputation: -1, students: +2, coachMorale: -2 },
            type: 'warning',
          },
          {
            weight: 20,
            description: '价格战导致资金链紧张，而且招来的学生质量参差不齐。',
            effects: {
              money: -10000,
              reputation: -2,
              students: +8,
              coachMorale: -5,
              bossStress: +5,
            },
            type: 'danger',
          },
        ],
      },
      {
        id: 'ignore',
        label: '不跟价，强调教学质量',
        outcomes: [
          {
            weight: 60,
            description: '你发长文科普“便宜 ≠ 高质量”，一部分家长被说服，留下了核心生源。',
            effects: { reputation: +4, students: -1, studentSatisfaction: +2 },
            type: 'success',
          },
          {
            weight: 40,
            description: '家长们还是被低价吸引走了，生源流失严重。',
            effects: { reputation: +1, students: -5, bossStress: +5 },
            type: 'warning',
          },
        ],
      },
    ],
  },
  {
    id: 'medal',
    title: '学生喜提省选金牌',
    text: '你的老学员在省选中拿了金牌，家长朋友圈开始自发宣传。',
    minWeek: 8,
    options: [
      {
        id: 'market',
        label: '立刻做宣传海报和推文',
        outcomes: [
          {
            weight: 70,
            description: '你连夜做了喜报，招生咨询电话被打爆。',
            effects: { reputation: +6, potentialStudents: +10, money: -3000 },
            type: 'success',
          },
          {
            weight: 30,
            description: '宣传用力过猛，被同行举报夸大宣传。',
            effects: { reputation: -2, money: -5000, bossStress: +5 },
            type: 'warning',
          },
        ],
      },
      {
        id: 'lowkey',
        label: '保持低调，只在学员群内祝贺',
        outcomes: [
          {
            weight: 80,
            description: '你选择把喜悦藏在小圈子里，现有学员的归属感提升了。',
            effects: { reputation: +2, studentSatisfaction: +3 },
            type: 'success',
          },
          {
            weight: 20,
            description: '家长觉得机构不重视荣誉，有点失望。',
            effects: { reputation: +1, studentSatisfaction: -2 },
            type: 'info',
          },
        ],
      },
    ],
  },
  {
    id: 'rent',
    title: '房东要涨房租',
    text: '房东表示行情很好，准备从下个月开始调高房租。',
    minWeek: 12,
    options: [
      {
        id: 'accept',
        label: '无奈接受，专心搞教学',
        outcomes: [
          {
            weight: 70,
            description: '你选择不折腾搬家，一边心疼每月成本，一边继续卷教学。',
            effects: { fixedCost: +4000, bossStress: +3 },
            type: 'info',
          },
          {
            weight: 30,
            description: '房东得寸进尺，进一步提高房租，你只能接受。',
            effects: { fixedCost: +7000, bossStress: +5 },
            type: 'warning',
          },
        ],
      },
      {
        id: 'move',
        label: '搬去地铁口远一点的位置',
        outcomes: [
          {
            weight: 50,
            description: '你搬到了稍远的位置，虽然租金省了，但部分家长吐槽通勤麻烦。',
            effects: { fixedCost: -3000, reputation: -2, bossStress: +5 },
            type: 'warning',
          },
          {
            weight: 30,
            description: '新地方环境意外地不错，大家很快适应了。',
            effects: { fixedCost: -3000, studentSatisfaction: +2, bossStress: +2 },
            type: 'success',
          },
          {
            weight: 20,
            description: '搬家过程中损坏了一些设备，得不偿失。',
            effects: {
              fixedCost: -3000,
              money: -5000,
              reputation: -3,
              bossStress: +10,
            },
            type: 'danger',
          },
        ],
      },
    ],
  },
  {
    id: 'parent_chat',
    title: '家长来访',
    text: '一位家长走进了你的办公室，看起来有些话想说...',
    minWeek: 3,
    type: 'CHAT',
    unique: false,
    chats: [
      {
        id: 'tuition_bargain',
        title: '学费谈判',
        openingMessage: '老师，咱们这个学费是不是有点太贵了？隔壁那家才收一半...',
        systemPrompt: `你是一位精打细算的家长，觉得孩子的OI培训班学费太贵（目前是市场价的1.5倍）。你试图通过对比其他机构、哭穷、或者质疑教学质量来要求打折。你的目标是拿到8折优惠。如果玩家坚持价值（师资、成绩、服务）并且态度诚恳，你可以接受原价或者送一些赠品（如教材、加课）。如果玩家态度强硬或傲慢，你会生气并威胁退费。

请务必全程以 JSON 格式回复，每次对话你必须给出回答，不要输出任何普通文本。每次回复的格式必须为：
{
  "reply": "家长的回复（50字以内，必须包含）",
  "is_finished": boolean, // 是否结束对话（达成一致或彻底谈崩）
  "result": { // 仅在 is_finished 为 true 时包含此字段
    "success": boolean, // 谈判是否成功
    "message": "结局描述",
    "reward": {
      "money": number, // 资金变化 (如退费则为负，获得赞助则为正，原价则为0。如果家长非常满意，可以额外赞助 +5000)
      "reputation": number, // 声望变化 (如果成功，+5~+10；失败则 -10)
      "bossStress": number // (可选) 压力变化，成功则 -10，失败则 +10
    }
  }
}`,
      },
      {
        id: 'student_stress',
        title: '压力投诉',
        openingMessage: '老师，我家孩子最近回家老是哭，说压力太大了，是不是你们逼得太紧了？',
        systemPrompt: `你是一位溺爱孩子的家长，发现孩子最近压力很大（OI训练太苦）。你觉得是机构安排不合理，要求减少作业或者退费。如果玩家能解释清楚竞赛的残酷性并提供心理辅导方案，你会理解。如果玩家只是说“吃得苦中苦”，你会觉得机构冷血。

请务必全程以 JSON 格式回复，每次对话你必须给出回答，不要输出任何普通文本。每次回复的格式必须为：
{
  "reply": "家长的回复（50字以内，必须包含）",
  "is_finished": boolean, // 是否结束对话
  "result": { // 仅在 is_finished 为 true 时包含此字段
    "success": boolean,
    "message": "结局描述",
    "reward": {
      "reputation": number, // 声望变化 (成功 +5~+10, 失败 -10)
      "studentSatisfaction": number, // 满意度变化 (成功 +10, 失败 -10)
      "bossStress": number, // (可选) 压力变化，成功则 -10，失败则 +10
      "money": number // (可选) 如果家长非常满意，可能会预交学费或赞助 (+2000 ~ +5000)
    }
  }
}`,
      },
    ],
  },
];
