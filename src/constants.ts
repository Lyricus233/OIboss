
import { CalendarEvent } from './types';

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
  MIN_CASH: 0
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

export const FACILITY_CONFIG: Record<number, { label: string; maxStudents: number; rent: number; cost: number }> = {
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
    statsRange: { min: 5, max: 15 },
    talentRange: { min: 40, max: 70 }
  },
  INTERMEDIATE: {
    label: '提高组学生',
    cost: 20000,
    req: { reputation: 100, coachLevel: 2 },
    statsRange: { min: 20, max: 40 },
    talentRange: { min: 60, max: 90 }
  },
  ADVANCED: {
    label: '省队选手',
    cost: 100000,
    req: { reputation: 500, coachLevel: 4 },
    statsRange: { min: 50, max: 80 },
    talentRange: { min: 80, max: 100 }
  }
};

export const NAMES = {
  surnames: [
    '王', '李', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴', '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗',
    '梁', '宋', '郑', '谢', '韩', '唐', '冯', '于', '董', '萧', '程', '曹', '袁', '邓', '许', '傅', '沈', '曾', '彭', '吕',
    '苏', '卢', '蒋', '蔡', '贾', '丁', '魏', '薛', '叶', '阎', '余', '潘', '杜', '戴', '夏', '钟', '汪', '田', '任', '姜'
  ],
  names: [
    '伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀英', '浩', '梓涵', '一诺', '宇轩',
    '子涵', '欣怡', '梓萱', '诗涵', '雨桐', '可馨', '雨泽', '子轩', '浩宇', '宇航', '浩然', '致远', '俊驰', '鹏涛', '炎彬', '鹤轩', '越彬', '风华',
    '靖琪', '明辉', '伟诚', '明轩', '健柏', '修杰', '志泽', '弘文', '峻熙', '嘉懿', '煜城', '懿轩', '烨伟', '苑博', '伟泽', '熠彤', '鸿煊', '博涛',
    '烨霖', '烨华', '煜祺', '智宸', '正豪', '昊然', '明杰', '立诚', '立轩', '立辉', '峻熙', '弘文', '弘博', '弘毅', '弘图', '弘大', '弘方', '弘业',
    '博雅', '知行'
  ]
};

export const TRAITS = [
  { name: '卷王', desc: '训练效果+20%，压力增加快', effect: { train: 1.2, stress: 1.5 } },
  { name: '天才', desc: '思维属性成长+50%', effect: { thinking: 1.5 } },
  { name: '摸鱼', desc: '压力增加慢，训练效果-10%', effect: { stress: 0.7, train: 0.9 } },
  { name: '大心脏', desc: '比赛发挥稳定，不易失误', effect: { stability: 1.2 } },
  { name: '玻璃心', desc: '压力过高容易生病', effect: { sickChance: 1.5 } },
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
    name: 'WC (冬令营)',
    type: 'EVENT',
    description: '寒假期间的集训与交流。',
  },
  20: {
    week: 20,
    name: '省队选拔',
    type: 'CONTEST',
    description: '决定谁能代表省份参加 NOI。',
  },
  25: {
    week: 25,
    name: 'NOI (国赛)',
    type: 'CONTEST',
    description: '全国决赛，金牌保送清北！',
  }
};

export const AGENCY_ACTIONS = [
  {
    id: "promo",
    name: "举办线下宣讲会",
    desc: "租酒店、印易拉宝、发传单，冲一波曝光。",
    cost: -15000,
    effects: { reputation: +3, potentialStudents: +8, bossStress: +5 },
  },
  {
    id: "camp",
    name: "开设集训营",
    desc: "请教练加班开营，把学生集中拉一波水平。",
    cost: -25000,
    effects: { reputation: +2, studentSatisfaction: +3, coachMorale: -5, bossStress: +8 },
  },
  {
    id: "squeeze",
    name: "压榨教练课时",
    desc: "同一节课塞两倍学生，教练上满课。",
    cost: 0,
    effects: { money: +15000, reputation: -4, coachMorale: -10, studentSatisfaction: -5 },
  },
  {
    id: "invest",
    name: "投入教研与命题",
    desc: "搭建题库、出模拟赛、复盘数据。",
    cost: -12000,
    effects: { reputation: +3, coachMorale: +2 },
  },
  {
    id: "salary",
    name: "上调教练待遇",
    desc: "给教练加薪、报销晚饭和打车。",
    cost: -15000,
    effects: { coachMorale: +10, reputation: +2, bossStress: -3 },
  },
  {
    id: "rest",
    name: "给自己放一天假",
    desc: "不看家长群，不回消息，摸鱼一天。",
    cost: 0,
    effects: { bossStress: -12, reputation: -1 },
  },
];

export const RANDOM_EVENTS = [
  {
    id: "price_war",
    title: "隔壁机构打价格战",
    text: "同城另一家 OI 机构突然推出 9.9 元 10 节体验课，全城家长群都在转。",
    minWeek: 4,
    options: [
      {
        id: "join",
        label: "硬刚，跟进价格战",
        effects: { money: -8000, reputation: +2, students: +6, coachMorale: -3 },
        log: "你也上了 9.9 体验课，短期内涌入不少学生，但教练有点炸裂。",
      },
      {
        id: "ignore",
        label: "不跟价，强调教学质量",
        effects: { reputation: +4, students: -3 },
        log: "你发长文科普“便宜 ≠ 高质量”，一部分家长被说服，部分学生被抢走。",
      },
    ],
  },
  {
    id: "medal",
    title: "学生喜提省选金牌",
    text: "你的老学员在省选中拿了金牌，家长朋友圈开始自发宣传。",
    minWeek: 8,
    options: [
      {
        id: "market",
        label: "立刻做宣传海报和推文",
        effects: { reputation: +6, potentialStudents: +10, money: -3000 },
        log: "你连夜做了喜报，招生咨询电话被打爆。",
      },
      {
        id: "lowkey",
        label: "保持低调，只在学员群内祝贺",
        effects: { reputation: +2, studentSatisfaction: +3 },
        log: "你选择把喜悦藏在小圈子里，现有学员的归属感提升了。",
      },
    ],
  },
  {
    id: "rent",
    title: "房东要涨房租",
    text: "房东表示行情很好，准备从下个月开始调高房租。",
    minWeek: 12,
    options: [
      {
        id: "accept",
        label: "无奈接受，专心搞教学",
        effects: { fixedCost: +4000, bossStress: +3 },
        log: "你选择不折腾搬家，一边心疼每月成本，一边继续卷教学。",
      },
      {
        id: "move",
        label: "搬去地铁口远一点的位置",
        effects: { fixedCost: -3000, reputation: -2, bossStress: +5 },
        log: "你搬到了稍远的位置，部分家长吐槽通勤麻烦。",
      },
    ],
  },
  {
    id: "parent_chat",
    title: "家长来访",
    text: "一位家长走进了你的办公室，看起来有些话想说...",
    minWeek: 3,
    type: 'CHAT',
    unique: false,
    chats: [
      {
        id: "tuition_bargain",
        title: "学费谈判",
        openingMessage: "老师，咱们这个学费是不是有点太贵了？隔壁那家才收一半...",
        systemPrompt: "你是一位精打细算的家长，觉得孩子的OI培训班学费太贵（目前是市场价的1.5倍）。你试图通过对比其他机构、哭穷、或者质疑教学质量来要求打折。你的目标是拿到8折优惠。如果玩家坚持价值（师资、成绩、服务）并且态度诚恳，你可以接受原价或者送一些赠品（如教材、加课）。如果玩家态度强硬或傲慢，你会生气并威胁退费。请扮演这个角色与玩家对话。每次回复简短一些（50字以内）。当对话结束时（达成一致或谈崩），请在最后一行输出JSON格式的结果：{\"success\": boolean, \"message\": \"结局描述\", \"reward\": {\"money\": number, \"reputation\": number}}。如果谈崩了，money为负数表示退费，reputation下降。如果成功，money为0（维持原价）或负数（打折损失），reputation上升。"
      },
      {
        id: "student_stress",
        title: "压力投诉",
        openingMessage: "老师，我家孩子最近回家老是哭，说压力太大了，是不是你们逼得太紧了？",
        systemPrompt: "你是一位溺爱孩子的家长，发现孩子最近压力很大（OI训练太苦）。你觉得是机构安排不合理，要求减少作业或者退费。如果玩家能解释清楚竞赛的残酷性并提供心理辅导方案，你会理解。如果玩家只是说“吃得苦中苦”，你会觉得机构冷血。请扮演这个角色。每次回复简短。对话结束时输出JSON结果：{\"success\": boolean, \"message\": \"结局描述\", \"reward\": {\"reputation\": number, \"studentSatisfaction\": number}}。"
      }
    ]
  }
];
