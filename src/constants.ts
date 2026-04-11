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
  TIER1: 600000,
  PROVINCIAL: 400000,
  REMOTE: 200000,
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
    req: { reputation: 50, coachLevel: 2 },
    abilityRange: { min: 25, max: 50 },
    talentRange: { min: 60, max: 90 },
  },
  ADVANCED: {
    label: '省队选手',
    cost: 100000,
    req: { reputation: 120, coachLevel: 4 },
    abilityRange: { min: 60, max: 100 },
    talentRange: { min: 80, max: 100 },
  },
};

// prettier-ignore
export const NAMES = {
  surnames: [
    '王', '李', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴', '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗',
    '梁', '宋', '郑', '谢', '韩', '唐', '冯', '于', '董', '萧', '程', '曹', '袁', '邓', '许', '傅', '沈', '曾', '彭', '吕',
    '苏', '卢', '蒋', '蔡', '贾', '丁', '魏', '薛', '叶', '阎', '余', '潘', '杜', '戴', '夏', '钟', '汪', '田', '任', '姜',
    '范', '方', '石', '姚', '谭', '廖', '邹', '熊', '金', '陆', '郝', '孔', '白', '崔', '康', '毛', '邱', '秦', '江', '史',
    '顾', '侯', '邵', '孟', '龙', '万', '段', '雷', '钱', '汤', '尹', '黎', '易', '常', '武', '乔', '贺', '赖', '龚', '文',
    '欧阳', '上官', '皇甫', '司马', '诸葛', '夏侯'
  ],
  names: [
    '伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀', '刚', '平',
    '燕', '辉', '玲', '霞', '健', '波', '宁', '新', '凯', '峰', '雷', '亮', '红', '飞', '梅', '兰', '英', '华', '慧', '巧',
    '美', '淑', '惠', '珠', '翠', '雅', '芝', '玉', '萍', '娥', '芬', '彩', '春', '菊', '凤', '洁', '琳', '素', '云', '莲',
    '真', '环', '雪', '荣', '爱', '妹', '香', '月', '莺', '媛', '瑞', '凡', '佳', '嘉', '琼', '勤', '珍', '贞', '莉', '桂',
    '娣', '叶', '璧', '璐', '娅', '琦', '晶', '妍', '茜', '秋', '珊', '莎', '锦', '黛', '青', '倩', '婷', '姣', '婉', '娴',
    '瑾', '颖', '露', '瑶', '怡', '婵', '雁', '蓓', '纨', '仪', '荷', '丹', '蓉', '眉', '君', '琴', '蕊', '薇', '菁', '梦',
    '岚', '苑', '婕', '馨', '瑗', '琰', '韵', '融', '园', '艺', '咏', '卿', '聪', '澜', '纯', '毓', '悦', '昭', '冰', '爽',
    '琬', '茗', '羽', '希', '欣', '飘', '育', '滢', '馥', '筠', '柔', '竹', '霭', '凝', '晓', '欢', '霄', '枫', '芸', '菲',
    '寒', '伊', '亚', '宜', '可', '姬', '舒', '影', '荔', '枝', '思',
    '浩宇', '一诺', '梓涵', '宇轩', '子涵', '欣怡', '梓萱', '诗涵', '雨桐', '可馨', '雨泽', '子轩', '宇航', '浩然', '致远',
    '俊驰', '鹏涛', '炎彬', '鹤轩', '越彬', '风华', '靖琪', '明辉', '伟诚', '明轩', '健柏', '修杰', '志泽', '弘文', '峻熙',
    '嘉懿', '煜城', '懿轩', '烨伟', '苑博', '伟泽', '熠彤', '鸿煊', '博涛', '烨霖', '烨华', '煜祺', '智宸', '正豪', '昊然',
    '明杰', '立诚', '立轩', '立辉', '弘博', '弘毅', '弘图', '弘大', '弘方', '弘业', '博雅', '博文', '博艺', '博学', '博视',
    '博容', '博万', '博实', '博超', '才哲', '才俊', '成和', '成弘', '成化', '成济', '成礼', '成龙', '成仁', '成双', '成天',
    '成文', '成业', '成益', '成荫', '成周', '承安', '承弼', '承德', '承恩', '承福', '承基', '承教', '承平', '承嗣', '承天',
    '承望', '承宣', '承颜', '承业', '承悦', '承允', '承运', '承载', '承泽', '承志', '德本', '德海', '德厚', '德华', '德辉',
    '德惠', '德容', '德润', '德寿', '德水', '德馨', '德曜', '德业', '德义', '德庸', '德佑', '德宇', '德元', '德运', '德泽',
    '德明', '飞昂', '飞白', '飞飙', '飞掣', '飞尘', '飞沉', '飞驰', '飞光', '飞翰', '飞航', '飞翮', '飞鸿', '飞虎', '飞捷',
    '飞龙', '飞鸾', '飞鸣', '飞蓬', '飞鹏', '飞扬', '飞文', '飞翔', '飞星', '飞翼', '飞英', '飞宇', '飞羽', '飞雨', '飞语',
    '飞跃', '飞章', '飞舟', '风华', '丰茂', '丰羽', '刚豪', '刚洁', '刚捷', '刚毅', '高昂', '高岑', '高畅', '高超', '高驰',
    '高达', '高澹', '高飞', '高芬', '高佛', '高复', '高盖', '高歌', '高格', '高寒', '高翰', '高杰', '高洁', '高峻', '高朗',
    '高丽', '高邈', '高旻', '高明', '高爽', '高兴', '高轩', '高雅', '高扬', '高阳', '高义', '高谊', '高逸', '高懿', '高原',
    '高远', '高韵', '高卓', '光赫', '光华', '光辉', '光济', '光亮', '光临', '光明', '光启', '光熙', '光耀', '光誉', '光远',
    '国安', '国兴', '国源', '冠宇', '冠玉', '晗昱', '晗日', '涵畅', '涵涤', '涵亮', '涵忍', '涵容', '涵润', '涵涵', '涵煦',
    '涵蓄', '涵衍', '涵意', '涵映', '涵育', '翰采', '翰池', '翰飞', '翰海', '翰翮', '翰林', '翰音', '翰藻', '瀚玥', '瀚昂',
    '瀚漠', '瀚海', '瀚和', '瀚彭', '瀚文', '瀚学', '海荣', '海若', '海宇', '和蔼', '和安', '和璧', '和博', '和畅', '和风',
    '和歌', '和光', '和平', '和洽', '和惬', '和顺', '和硕', '和颂', '和泰', '和悌', '和通', '和同', '和煦', '和雅', '和宜',
    '和怡', '和玉', '和裕', '和豫', '和悦', '和韵', '和泽', '和正', '和志', '鹤鸿', '宏伯', '宏博', '宏才', '宏畅', '宏大',
    '宏道', '宏富', '宏公', '宏功', '宏胜', '宏盛', '宏爽', '宏硕', '宏斯', '宏伟', '宏文', '宏扬', '宏义', '宏逸', '宏毅',
    '宏远', '宏云', '宏峻', '宏浚', '宏恺', '宏旷', '宏阔', '宏朗', '宏茂', '宏渺', '宏儒', '宏深'
  ],
};

export const REGIONAL_NAMES: Record<string, { surnames?: string[]; names?: string[] }> = {
  ZJ: {
    surnames: ['钱', '沈', '虞', '戚', '茅', '成'],
    names: ['杭', '浙', '越', '甬', '泽', '润'],
  },
  JS: {
    surnames: ['顾', '陆', '沈', '钱', '缪', '费'],
    names: ['苏', '宁', '扬', '锦', '文', '博'],
  },
  GD: {
    surnames: ['陈', '李', '黄', '梁', '麦', '区', '冼', '霍'],
    names: ['伟', '强', '杰', '辉', '俊', '豪', '志', '明'],
  },
  SC: {
    surnames: ['李', '王', '张', '刘', '杨', '何', '罗'],
    names: ['蜀', '川', '蓉', '锦', '瑜', '亮'],
  },
  BJ: { surnames: ['王', '张', '李', '刘', '赵'], names: ['京', '燕', '华', '国', '立', '宏'] },
  SH: { surnames: ['张', '王', '陈', '李', '朱'], names: ['沪', '申', '洋', '海', '波'] },
  SD: {
    surnames: ['王', '张', '李', '刘', '孔', '孟', '姜'],
    names: ['鲁', '齐', '泰', '诚', '义', '德'],
  },
  HN: { surnames: ['李', '刘', '陈', '王', '谭', '周'], names: ['湘', '楚', '伟', '泽', '东'] },
  FJ: { surnames: ['林', '陈', '黄', '郑', '吴', '蔡'], names: ['闽', '福', '海', '兴', '旺'] },
  GX: {
    surnames: ['韦', '覃', '莫', '陆', '蓝', '蒙'],
    names: ['壮', '歌', '仙', '美', '山', '水'],
  },
  NX: {
    surnames: ['马', '纳', '哈', '海', '白', '撒'],
    names: ['智', '勇', '德', '福', '祥'],
  },
  XJ: {
    surnames: ['阿', '艾', '买', '库', '热', '吐', '迪'],
    names: ['凡', '提', '木', '娜', '古丽', '江', '尔', '拜尔'],
  },
  XZ: {
    surnames: ['索朗', '扎西', '次仁', '达瓦', '普布', '格桑', '洛桑'],
    names: ['旺姆', '顿珠', '卓玛', '拉姆', '尼玛', '德吉', '平措'],
  },
  NM: {
    surnames: ['包', '奇', '乌', '巴', '苏', '呼'],
    names: ['娜仁', '其木格', '朝鲁', '宝音', '乌日娜', '巴特尔'],
  },
  YN: {
    surnames: ['段', '杨', '刀', '岩', '召'],
    names: ['凤', '依', '罕', '金', '玉', '金花', '阿妹', '小波', '阿芝', '小翠'],
  },
  GZ: {
    surnames: ['龙', '吴', '石', '杨', '雷'],
    names: ['阿', '妹', '哥', '秀', '英', '阿花', '小妹', '阿贵', '秀英', '小兰'],
  },
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
  {
    name: '天赋怪',
    desc: '天赋异禀，极罕见的竞赛天才，有机会冲击国家队',
    effect: { ability: 2.0, train: 1.5, contest: 1.3 },
  },
];

export const CALENDAR_EVENTS: Record<number, CalendarEvent> = {
  4: {
    week: 4,
    name: 'CSP-J/S 第一轮',
    type: 'CONTEST',
    description: '全国青少年信息学奥林匹克联赛初赛，主要考察计算机基础知识和程序阅读能力。',
    stages: [
      {
        name: '笔试',
        description: '单选题、阅读程序、完善程序',
        problems: [{ difficulty: 5, quality: 8 }],
      },
    ],
  },
  8: {
    week: 8,
    name: 'CSP-J/S 第二轮',
    type: 'CONTEST',
    description: '联赛复赛，真正的上机编程考验，分为普及组和提高组。',
    stages: [
      {
        name: '上机测试',
        problems: [
          { difficulty: 4, quality: 7 },
          { difficulty: 6, quality: 8 },
          { difficulty: 7, quality: 8 },
          { difficulty: 8, quality: 9 },
        ],
      },
    ],
  },
  14: {
    week: 14,
    name: 'NOIP',
    type: 'CONTEST',
    description: '全国青少年信息学奥林匹克联赛，通往省队的必经之路，题目难度极高。',
    stages: [
      {
        name: '上机测试',
        problems: [
          { difficulty: 6, quality: 8 },
          { difficulty: 7, quality: 9 },
          { difficulty: 8, quality: 9 },
          { difficulty: 9, quality: 9 },
        ],
      },
    ],
  },
  22: {
    week: 22,
    name: 'NOIWC',
    type: 'CONTEST',
    description:
      '全国青少年信息学奥林匹克竞赛冬令营，高手云集的竞技盛会，CSP成绩优异者可获邀请，也是通往省选的关键跳板。',
    stages: [
      {
        name: '测试',
        problems: [
          { difficulty: 8, quality: 9 },
          { difficulty: 9, quality: 9 },
          { difficulty: 10, quality: 9 },
        ],
      },
    ],
  },
  28: {
    week: 28,
    name: '省队选拔',
    type: 'CONTEST',
    description: '各省选拔参加全国赛代表队的残酷淘汰赛，只有最顶尖的选手才能突围。',
    stages: [
      {
        name: 'Day 1',
        description: '第一场',
        problems: [
          { difficulty: 7, quality: 8 },
          { difficulty: 8, quality: 9 },
          { difficulty: 9, quality: 9 },
        ],
      },
      {
        name: 'Day 2',
        description: '第二场',
        problems: [
          { difficulty: 8, quality: 8 },
          { difficulty: 9, quality: 9 },
          { difficulty: 10, quality: 8 },
        ],
      },
    ],
  },
  34: {
    week: 34,
    name: 'APIO',
    type: 'CONTEST',
    description: '亚太地区信息学奥林匹克竞赛，与亚洲顶尖选手同台竞技。',
    stages: [
      {
        name: '测试',
        problems: [
          { difficulty: 8, quality: 9 },
          { difficulty: 9, quality: 10 },
          { difficulty: 10, quality: 9 },
        ],
      },
    ],
  },
  40: {
    week: 40,
    name: 'NOI',
    type: 'CONTEST',
    description: '全国信息学奥林匹克竞赛，决定保送清北资格的终极对决。',
    stages: [
      {
        name: 'Day 1',
        description: '第一场上机',
        problems: [
          { difficulty: 8, quality: 9 },
          { difficulty: 9, quality: 10 },
          { difficulty: 10, quality: 9 },
        ],
      },
      {
        name: 'Day 2',
        description: '第二场上机',
        problems: [
          { difficulty: 9, quality: 9 },
          { difficulty: 10, quality: 10 },
          { difficulty: 11, quality: 9 },
        ],
      },
    ],
  },
  42: {
    week: 42,
    name: 'CTT-day1-2',
    type: 'CONTEST',
    description: '国家集训队训练第1-2天，高强度的国家队选拔前哨战。',
    stages: [
      {
        name: 'Day 1',
        problems: [
          { difficulty: 9, quality: 9 },
          { difficulty: 10, quality: 9 },
          { difficulty: 10, quality: 10 },
        ],
      },
      {
        name: 'Day 2',
        problems: [
          { difficulty: 9, quality: 9 },
          { difficulty: 10, quality: 10 },
          { difficulty: 11, quality: 9 },
        ],
      },
    ],
  },
  43: {
    week: 43,
    name: 'CTT-day3-4',
    type: 'CONTEST',
    description: '国家集训队训练第3-4天，持续高压考察选手的稳定性。',
    stages: [
      {
        name: 'Day 3',
        problems: [
          { difficulty: 10, quality: 9 },
          { difficulty: 10, quality: 10 },
          { difficulty: 11, quality: 9 },
        ],
      },
      {
        name: 'Day 4',
        problems: [
          { difficulty: 10, quality: 9 },
          { difficulty: 11, quality: 10 },
          { difficulty: 11, quality: 9 },
        ],
      },
    ],
  },
  44: {
    week: 44,
    name: 'CTS (国家队选拔)',
    type: 'CONTEST',
    description: '选拔代表中国参加世界赛的四人国家队成员，题目堪称魔鬼难度。',
    stages: [
      {
        name: 'Day 1',
        description: '第一场测试',
        problems: [
          { difficulty: 10, quality: 9 },
          { difficulty: 10, quality: 10 },
          { difficulty: 11, quality: 9 },
        ],
      },
      {
        name: 'Day 2',
        description: '第二场测试',
        problems: [
          { difficulty: 10, quality: 9 },
          { difficulty: 11, quality: 10 },
          { difficulty: 12, quality: 9 },
        ],
      },
    ],
  },
  48: {
    week: 48,
    name: 'IOI',
    type: 'CONTEST',
    description: '国际信息学奥林匹克竞赛，全世界OIer的最高殿堂。',
    stages: [
      {
        name: 'Day 1',
        description: '第一场竞赛',
        problems: [
          { difficulty: 10, quality: 10 },
          { difficulty: 11, quality: 10 },
          { difficulty: 12, quality: 9 },
        ],
      },
      {
        name: 'Day 2',
        description: '第二场竞赛',
        problems: [
          { difficulty: 10, quality: 10 },
          { difficulty: 11, quality: 10 },
          { difficulty: 12, quality: 10 },
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
        effects: { reputation: +5, potentialStudents: +10, bossStress: +5 },
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
          reputation: +8,
          studentSatisfaction: +8,
          coachMorale: -3,
          bossStress: +8,
          studentAbility: +3,
        },
        type: 'success',
      },
      {
        weight: 40,
        description: '集训顺利结束，大家的实力稳步增长。',
        effects: {
          reputation: +3,
          studentSatisfaction: +4,
          coachMorale: -5,
          bossStress: +8,
          studentAbility: +3,
        },
        type: 'info',
      },
      {
        weight: 10,
        description: '有学生吐槽伙食太差，家长群里有怨言。',
        effects: {
          reputation: -3,
          studentSatisfaction: -8,
          coachMorale: -8,
          bossStress: +12,
          studentAbility: +1,
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
          coachMorale: -5,
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
          coachMorale: -8,
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
          coachMorale: -12,
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
        effects: { reputation: +8, coachMorale: +5, studentAbility: +2 },
        type: 'success',
      },
      {
        weight: 50,
        description: '题库得到了充实。',
        effects: { reputation: +3, coachMorale: +2, studentAbility: +1 },
        type: 'info',
      },
      {
        weight: 10,
        description: '题目出太难了，被学生在网上吐槽。',
        effects: { reputation: -1, coachMorale: -2, studentAbility: +0.5 },
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
        effects: { coachMorale: +10, reputation: +3, bossStress: -5 },
        type: 'success',
      },
      {
        weight: 30,
        description: '大家觉得这是理所应当的。',
        effects: { coachMorale: +6, reputation: +1, bossStress: -3 },
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
            effects: { money: +5000, reputation: +2, students: +6, coachMorale: -3 },
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
    id: 'prize',
    title: '某个学生得了大奖',
    text: '你的一个学生在全市级的算法比赛里拿了第一名，家长们奔走相告。',
    minWeek: 8,
    options: [
      {
        id: 'advertise',
        label: '大肆宣传，拉大横幅',
        outcomes: [
          {
            weight: 60,
            description: '你立刻挂起红色大横幅，门口围满了咨询的家长！',
            effects: { reputation: +6, potentialStudents: +10, money: -3000 },
            type: 'success',
          },
          {
            weight: 20,
            description: '虽然挂了横幅，但刚好下暴雨，没什么人看见。',
            effects: { reputation: +3, potentialStudents: +5 },
            type: 'warning',
          },
          {
            weight: 20,
            description: '宣传用力过猛，被同行举报虚假宣传。',
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
    id: 'fake_propaganda',
    title: '喜报虚假宣传被爆',
    text: '有家长在论坛曝光你的机构喜报造假，声称某金牌选手根本没在你这学过。',
    minWeek: 10,
    options: [
      {
        id: 'clarify',
        label: '发声明澄清，公开学员合同',
        outcomes: [
          {
            weight: 60,
            description: '你拿出了学员合同和缴费记录，成功证明清白。并且借此机会展示了机构专业度。',
            effects: { reputation: +5, bossStress: +3 },
            type: 'success',
          },
          {
            weight: 40,
            description: '虽然证据齐全，但舆论已经发酵，部分家长仍不信任。',
            effects: { reputation: -5, potentialStudents: -10, bossStress: +6 },
            type: 'warning',
          },
        ],
      },
      {
        id: 'ignore',
        label: '选择沉默，不予回应',
        outcomes: [
          {
            weight: 30,
            description: '风波很快平息，大家注意力转移了。',
            effects: { reputation: -2, bossStress: +3 },
            type: 'info',
          },
          {
            weight: 70,
            description: '沉默被解读为默认，口碑严重受损。',
            effects: { reputation: -10, potentialStudents: -15, bossStress: +15 },
            type: 'danger',
          },
        ],
      },
    ],
  },
  {
    id: 'tv_news',
    title: '本地电视台采访',
    text: '市教育频道想做一期关于信奥的节目，邀请你作为机构代表接受采访。',
    minWeek: 15,
    options: [
      {
        id: 'accept',
        label: '欣然接受，准备发言稿',
        outcomes: [
          {
            weight: 70,
            description: '采访播出后反响热烈，招生咨询量暴涨！',
            effects: { reputation: +12, potentialStudents: +25, bossStress: +5 },
            type: 'success',
          },
          {
            weight: 30,
            description: '你在镜头前过于紧张，说话磕磕巴巴，效果一般。',
            effects: { reputation: +3, potentialStudents: +5, bossStress: +8 },
            type: 'info',
          },
        ],
      },
      {
        id: 'decline',
        label: '婉拒采访，低调做事',
        outcomes: [
          {
            weight: 100,
            description: '你谢绝了采访机会，继续专注教学。',
            effects: { bossStress: -5 },
            type: 'info',
          },
        ],
      },
    ],
  },
  {
    id: 'competition_invite',
    title: '省会举办联合模拟赛',
    text: '省内几家知名机构联合举办大型模拟赛，邀请你参与协办。',
    minWeek: 18,
    options: [
      {
        id: 'join',
        label: '积极参与，出人出力',
        outcomes: [
          {
            weight: 50,
            description: '你的学生在模拟赛中表现优异，机构知名度大增！省会的家长纷纷打听你的机构。',
            effects: {
              reputation: +15,
              potentialStudents: +20,
              money: -15000,
              studentSatisfaction: +5,
              bossStress: +3,
            },
            type: 'success',
          },
          {
            weight: 30,
            description: '模拟赛办得很成功，虽然你的学生发挥平平，但机构曝光度提升了。',
            effects: {
              reputation: +8,
              potentialStudents: +12,
              money: -15000,
              bossStress: +5,
            },
            type: 'info',
          },
          {
            weight: 20,
            description: '模拟赛组织混乱，你的学生发挥失常，还被其他机构嘲讽"花钱买脸丢"。',
            effects: {
              reputation: -5,
              potentialStudents: -5,
              money: -15000,
              studentSatisfaction: -8,
              bossStress: +10,
            },
            type: 'danger',
          },
        ],
      },
      {
        id: 'observe',
        label: '只参赛不协办',
        outcomes: [
          {
            weight: 70,
            description: '你选择低成本参与，学生也得到了锻炼机会，还认识了不少其他机构的同学。',
            effects: {
              reputation: +2,
              potentialStudents: +3,
              money: -3000,
              studentSatisfaction: +2,
            },
            type: 'info',
          },
          {
            weight: 30,
            description: '其他机构都是协办方，你的学生感觉像是"外人"，有些失落。',
            effects: {
              reputation: -2,
              money: -3000,
              studentSatisfaction: -3,
            },
            type: 'warning',
          },
        ],
      },
    ],
  },
  {
    id: 'student_gaming',
    title: '学生沉迷游戏',
    text: '你发现几个学生最近上课总是打瞌睡，一问才知道熬夜玩原神、刷P站。',
    minWeek: 8,
    options: [
      {
        id: 'strict',
        label: '严厉批评，通知家长',
        outcomes: [
          {
            weight: 40,
            description: '家长配合管理，学生被没收了手机，重新投入学习。一周后能力明显回升。',
            effects: {
              studentSatisfaction: -8,
              bossStress: +3,
            },
            type: 'success',
          },
          {
            weight: 40,
            description: '学生觉得你多管闲事，和家长投诉说你侵犯隐私，家长群里议论纷纷。',
            effects: {
              reputation: -5,
              studentSatisfaction: -15,
              bossStress: +10,
            },
            type: 'warning',
          },
          {
            weight: 20,
            description:
              '其中一个学生家长是护犊子类型，直接在家长群里骂你"管太宽"，带着孩子退费走人。',
            effects: {
              reputation: -8,
              studentSatisfaction: -10,
              students: -1,
              money: -5000,
              bossStress: +15,
            },
            type: 'danger',
          },
        ],
      },
      {
        id: 'guide',
        label: '耐心引导，讲道理',
        outcomes: [
          {
            weight: 50,
            description:
              '你动之以情晓之以理，学生表示会自我约束。后续确实有所收敛。你感到十分欣慰。',
            effects: {
              studentSatisfaction: +5,
              bossStress: -3,
            },
            type: 'success',
          },
          {
            weight: 35,
            description: '学生嘴上答应，实际继续摆烂。最后家长发现孩子成绩下滑，直接退费走人。',
            effects: {
              studentSatisfaction: -5,
              students: -2,
              reputation: -3,
              bossStress: +8,
            },
            type: 'warning',
          },
          {
            weight: 15,
            description: '你的"温柔"被学生当成软弱，其他学生也开始效仿摸鱼，班级风气变差。',
            effects: {
              studentSatisfaction: -10,
              coachMorale: -8,
              students: -5,
              reputation: -5,
              bossStress: +12,
            },
            type: 'danger',
          },
        ],
      },
      {
        id: 'workshop',
        label: '组织时间管理讲座，引导健康娱乐',
        outcomes: [
          {
            weight: 60,
            description: '你请了心理老师来讲"学习与娱乐的平衡"，学生们很受启发，家长也很认可。',
            effects: {
              studentSatisfaction: +8,
              reputation: +5,
              coachMorale: +3,
              money: +5000,
              bossStress: +2,
            },
            type: 'success',
          },
          {
            weight: 40,
            description: '讲座效果一般，学生表面认真听，实际该玩还是玩。',
            effects: {
              studentSatisfaction: +2,
              money: -5000,
              bossStress: +5,
            },
            type: 'info',
          },
        ],
      },
    ],
  },
  {
    id: 'rival_report',
    title: '竞争对手恶意举报',
    text: '你收到教育局通知，有机构举报你无证办学。虽然你手续齐全，但仍需配合调查。',
    minWeek: 20,
    options: [
      {
        id: 'cooperate',
        label: '积极配合，提供所有材料',
        outcomes: [
          {
            weight: 80,
            description: '调查很快结束，证明你一切合规，反而让举报者丢了脸。',
            effects: { reputation: +5, bossStress: +5 },
            type: 'success',
          },
          {
            weight: 20,
            description: '调查期间被迫停课一周，造成损失。',
            effects: { money: -30000, reputation: -3, bossStress: +8 },
            type: 'warning',
          },
        ],
      },
      {
        id: 'lawyer',
        label: '聘请律师，反诉诽谤',
        outcomes: [
          {
            weight: 50,
            description: '律师函一发，对方机构怂了，公开道歉。',
            effects: { reputation: +8, money: -20000, bossStress: +5 },
            type: 'success',
          },
          {
            weight: 50,
            description: '打官司耗时耗力，虽然赢了但得不偿失。',
            effects: { reputation: +3, money: -20000, bossStress: +10 },
            type: 'warning',
          },
        ],
      },
    ],
  },
  {
    id: 'school_cooperation',
    title: '重点中学寻求合作',
    text: '市重点中学信奥教练找到你，希望建立合作关系，为校队提供培训。',
    minWeek: 12,
    options: [
      {
        id: 'accept_coop',
        label: '签订合作协议',
        outcomes: [
          {
            weight: 70,
            description: '合作顺利，你成为该校指定培训机构，生源稳定增长！',
            effects: {
              reputation: +10,
              potentialStudents: +20,
              money: +20000,
            },
            type: 'success',
          },
          {
            weight: 30,
            description: '合作中学校要求很多优惠，利润微薄但品牌提升了。',
            effects: { reputation: +6, potentialStudents: +10, money: +5000 },
            type: 'info',
          },
        ],
      },
      {
        id: 'decline_coop',
        label: '婉拒合作，保持独立',
        outcomes: [
          {
            weight: 100,
            description: '你选择不被学校绑定，继续面向全市招生。',
            effects: { bossStress: -2 },
            type: 'info',
          },
        ],
      },
    ],
  },
  {
    id: 'problem_student',
    title: '问题学生',
    text: '一个学生长期迟到早退、作业不交、上课捣乱，严重影响班级秩序。教练和其他家长都对此很有意见。',
    minWeek: 10,
    options: [
      {
        id: 'expel',
        label: '劝退该学生，维护班级秩序',
        outcomes: [
          {
            weight: 60,
            description:
              '你和家长沟通后，对方也承认孩子确实不适合OI，同意退费。其他家长和教练都松了一口气。',
            effects: {
              students: -1,
              money: -8000,
              studentSatisfaction: +12,
              coachMorale: +8,
              reputation: +5,
              bossStress: -3,
            },
            type: 'success',
          },
          {
            weight: 30,
            description:
              '家长不服气，在家长群和社交媒体上大肆抹黑你的机构，声誉受损。但班级秩序确实好转了。',
            effects: {
              students: -1,
              money: -8000,
              reputation: -12,
              studentSatisfaction: +8,
              coachMorale: +5,
              bossStress: +10,
            },
            type: 'warning',
          },
          {
            weight: 10,
            description:
              '家长是当地教育系统的关系户，直接找人给你施压，要求收回决定。你被迫妥协，威信大损。',
            effects: {
              reputation: -15,
              coachMorale: -10,
              studentSatisfaction: -10,
              bossStress: +15,
            },
            type: 'danger',
          },
        ],
      },
      {
        id: 'one_more_chance',
        label: '再给一次机会，加强管理',
        outcomes: [
          {
            weight: 30,
            description:
              '你的耐心感动了学生，他痛改前非，成为班上进步最大的学员。励志故事被家长传颂。',
            effects: {
              studentSatisfaction: +15,
              reputation: +12,
              coachMorale: +5,
              bossStress: -8,
            },
            type: 'success',
          },
          {
            weight: 50,
            description:
              '学生稍有收敛，但仍时不时犯毛病。其他家长虽有微词，但还能接受。你感到很疲惫。',
            effects: {
              studentSatisfaction: -3,
              coachMorale: -3,
              bossStress: +8,
            },
            type: 'warning',
          },
          {
            weight: 20,
            description:
              '学生变本加厉，甚至带坏了其他同学。班级风气严重恶化，多个家长愤然退费，教练也提出辞职。',
            effects: {
              students: -4,
              money: -25000,
              reputation: -15,
              studentSatisfaction: -20,
              coachMorale: -15,
              bossStress: +15,
            },
            type: 'danger',
          },
        ],
      },
      {
        id: 'special_plan',
        label: '为他制定专门辅导计划，单独沟通',
        outcomes: [
          {
            weight: 50,
            description:
              '你发现这个学生其实是因为家庭问题才行为异常。经过心理疏导和个性化教学，学生逐渐步入正轨。',
            effects: {
              studentSatisfaction: +10,
              reputation: +8,
              coachMorale: +5,
              money: -3000,
              bossStress: +5,
            },
            type: 'success',
          },
          {
            weight: 40,
            description: '你花了大量时间精力，但效果不明显。其他家长质疑你为何偏袒问题学生。',
            effects: {
              studentSatisfaction: -5,
              coachMorale: -3,
              money: -3000,
              bossStress: +10,
            },
            type: 'warning',
          },
          {
            weight: 10,
            description: '学生家长觉得你是在暗示他家孩子"有病"，暴怒之下投诉并退费，还散播谣言。',
            effects: {
              students: -1,
              money: -10000,
              reputation: -10,
              studentSatisfaction: -8,
              bossStress: +15,
            },
            type: 'danger',
          },
        ],
      },
    ],
  },
  {
    id: 'buy_talent',
    title: '挖角机会',
    text: '一位在竞争对手机构的省队选手家长主动联系你，表示愿意转过来，但要求高额奖学金。',
    minWeek: 16,
    options: [
      {
        id: 'buy_advanced',
        label: '支付高额奖学金，签约省队选手（确保资金充足）',
        outcomes: [
          {
            weight: 5,
            description:
              '🌟 奇迹发生！招来的不仅是省队选手，更是百年难遇的竞赛天才！他的天赋震惊了整个圈子，你的机构一夜成名！',
            effects: {
              reputation: +30,
              potentialStudents: +30,
              money: -20000,
              advancedStudents: +1,
              intermediateStudents: +5,
              bossStress: -3,
              geniusStudent: true,
            },
            type: 'success',
          },
          {
            weight: 60,
            description:
              '省队选手到来后为机构带来巨大关注，招生爆满！还顺带吸引了一些提高组学生慕名而来。',
            effects: {
              reputation: +15,
              potentialStudents: +20,
              money: -20000,
              advancedStudents: +1,
              intermediateStudents: +3,
              bossStress: +5,
            },
            type: 'success',
          },
          {
            weight: 35,
            description: '省队选手来了后水土不服，发挥不佳，家长要求退款。机构声誉受损。',
            effects: {
              reputation: -10,
              money: -80000,
              studentSatisfaction: -12,
              bossStress: +15,
            },
            type: 'danger',
          },
        ],
      },
      {
        id: 'refuse',
        label: '拒绝挖角，坚持自主培养',
        outcomes: [
          {
            weight: 100,
            description: '你拒绝恶性竞争，专注培养现有学员。教练们对你的决定很认可。',
            effects: { reputation: +3, coachMorale: +8 },
            type: 'info',
          },
        ],
      },
    ],
  },
  {
    id: 'top_student_visit',
    title: '集训队大佬空降',
    text: '一位往届进入国家集训队的学长回乡探亲，你是否有意向花钱请他来机构做几天特训指导？',
    minWeek: 15,
    options: [
      {
        id: 'invite',
        label: '花费 10000 元重金邀请指导',
        outcomes: [
          {
            weight: 70,
            description: '大佬的经验分享和代码技巧让学员们茅塞顿开，整体能力大幅提升！',
            effects: { money: -10000, studentAbility: +5, reputation: +3, studentSatisfaction: +5 },
            type: 'success',
          },
          {
            weight: 30,
            description: '大佬讲的东西太深奥，只有少数几个天才听懂了，大部分学员一头雾水。',
            effects: { money: -10000, studentAbility: +2, bossStress: +2 },
            type: 'warning',
          },
        ],
      },
      {
        id: 'ignore',
        label: '算了，机构不需要',
        outcomes: [
          {
            weight: 100,
            description: '你省下了一笔钱，但错失了一次让学生开阔眼界的机会。',
            effects: { bossStress: -1 },
            type: 'info',
          },
        ],
      },
    ],
  },
  {
    id: 'flu_outbreak',
    title: '流感爆发',
    text: '最近机房里流感肆虐，学生们接连咳嗽发烧，甚至有几个人请假了。',
    minWeek: 5,
    options: [
      {
        id: 'disinfect',
        label: '紧急停课消杀，买营养品（花费 3000 元）',
        outcomes: [
          {
            weight: 70,
            description: '及时的消杀控制了病情，营养品也让家长觉得你们很贴心。',
            effects: { money: -3000, reputation: +2, studentSatisfaction: +5 },
            type: 'success',
          },
          {
            weight: 30,
            description: '消杀之后依然有学生断断续续地生病，训练进度受了些影响。',
            effects: { money: -3000, studentAbility: -3, bossStress: +4 },
            type: 'warning',
          },
        ],
      },
      {
        id: 'ignore',
        label: '带病坚持，OIer 没有节假日！',
        outcomes: [
          {
            weight: 100,
            description: '机房成了毒圈，大家全病倒了。不仅训练效率暴跌，还被家长们联合投诉！',
            effects: {
              studentAbility: -5,
              studentSatisfaction: -15,
              reputation: -5,
              bossStress: +8,
            },
            type: 'danger',
          },
        ],
      },
    ],
  },
  {
    id: 'game_addiction',
    title: '沉迷游戏',
    text: '你偶然发现机房里有几个学生在偷偷联机玩游戏，而且最近这股风气正在蔓延。',
    minWeek: 8,
    options: [
      {
        id: 'strict',
        label: '严厉整顿，没收设备',
        outcomes: [
          {
            weight: 60,
            description: '高压管控下，学习氛围恢复了正常，但学生们在背地里骂你暴政。',
            effects: { studentAbility: +1, studentSatisfaction: -10, bossStress: +3 },
            type: 'warning',
          },
          {
            weight: 40,
            description: '这招激起了学生的逆反心理，有的学生甚至故意在做题时摸鱼抗议。',
            effects: { studentAbility: -2, studentSatisfaction: -15, bossStress: +5 },
            type: 'danger',
          },
        ],
      },
      {
        id: 'guide',
        label: '晓之以理，举办算法游戏化对抗赛',
        outcomes: [
          {
            weight: 80,
            description: '你把游戏的对抗性引入了模拟赛，学生们胜负欲爆棚，刷题刷疯了！',
            effects: { studentAbility: +3, studentSatisfaction: +8, coachMorale: +5 },
            type: 'success',
          },
          {
            weight: 20,
            description: '对抗赛变成了另一种形式的“游戏”，大家为了赢甚至互相干扰。',
            effects: { studentAbility: -1, studentSatisfaction: -5, bossStress: +3 },
            type: 'warning',
          },
        ],
      },
    ],
  },
  {
    id: 'parent_chat',
    title: '家长来访',
    text: '家长有些话想对你说...',
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
      {
        id: 'course_consultation',
        title: '咨询报课',
        openingMessage:
          '老师您好，我听说OI竞赛挺火的，想让孩子试试。你们这边课程大纲是什么样的？师资怎么样？',
        systemPrompt: `你是一位对OI竞赛不太了解的家长，听说OI能帮助升学，想给孩子报班。你会问课程大纲、师资背景、学费、上课时间、需要什么基础等问题。如果玩家能详细介绍课程体系、展示师资实力（如教练获奖经历、往届学员成绩），并且耐心解答，你会很满意并报名。如果玩家敷衍或只强调价格，你会觉得不靠谱。

请务必全程以 JSON 格式回复，每次对话你必须给出回答，不要输出任何普通文本。每次回复的格式必须为：
{
  "reply": "家长的回复（50字以内，必须包含）",
  "is_finished": boolean, // 是否结束对话
  "result": { // 仅在 is_finished 为 true 时包含此字段
    "success": boolean, // 是否报名成功
    "message": "结局描述",
    "reward": {
      "money": number, // 如果报名成功，+8000~+15000（学费）；失败则0
      "potentialStudents": number, // 如果口碑好，家长会推荐朋友 (+10~+15)；失败则 -5
      "reputation": number, // 成功 +5~+8, 失败 -3
      "bossStress": number // （可选）成功 -5, 失败 +5
    }
  }
}`,
      },
      {
        id: 'contest_failure_complaint',
        title: '比赛失利质问',
        openingMessage:
          '老师，我家孩子这次比赛只拿了三等奖，之前你不是说能拿一等奖吗？！这怎么回事？',
        systemPrompt: `你是一位对孩子期望很高的家长，孩子在NOIP中只拿了三等奖（你之前预期是一等奖）。你很生气，觉得机构没教好，要求解释或退部分学费。如果玩家能客观分析孩子的水平、竞赛难度、以及后续提升计划，你会慢慢冷静下来。如果玩家推卸责任或指责孩子，你会更加愤怒并威胁退费、差评。

请务必全程以 JSON 格式回复，每次对话你必须给出回答，不要输出任何普通文本。每次回复的格式必须为：
{
  "reply": "家长的回复（50字以内，必须包含）",
  "is_finished": boolean, // 是否结束对话
  "result": { // 仅在 is_finished 为 true 时包含此字段
    "success": boolean, // 是否成功安抚家长
    "message": "结局描述",
    "reward": {
      "reputation": number, // 成功 +3~+5（家长理解），失败 -15~-20（差评）
      "studentSatisfaction": number, // 成功 +5, 失败 -20
      "money": number, // 失败可能要退费 -5000~-10000，成功则0
      "bossStress": number // 成功 -8, 失败 +15
    }
  }
}`,
      },
      {
        id: 'tuition_payment_delay',
        title: '学费拖欠',
        openingMessage: '老师，不好意思啊，这个月家里资金周转有点紧，学费能不能晚几周再交？',
        systemPrompt: `你是一位经济条件一般的家长，这个月家里有急事（如生病、失业），暂时拿不出学费（1万元左右）。你希望机构能宽限几周，或者分期付款。如果玩家能体谅你的难处并提供灵活方案（如分期、先欠着），你会非常感激并承诺尽快补上。如果玩家态度冷硬或威胁停课，你会很失望甚至让孩子退学。

请务必全程以 JSON 格式回复，每次对话你必须给出回答，不要输出任何普通文本。每次回复的格式必须为：
{
  "reply": "家长的回复（50字以内，必须包含）",
  "is_finished": boolean, // 是否结束对话
  "result": { // 仅在 is_finished 为 true 时包含此字段
    "success": boolean, // 是否达成协议
    "message": "结局描述",
    "reward": {
      "reputation": number, // 成功（人性化处理）+8~+12, 失败 -5
      "studentSatisfaction": number, // 成功 +15, 失败 -10
      "money": number, // 成功可能先收部分学费 +3000~+5000，失败则学生退学 -8000（退费）
      "bossStress": number, // 成功 -5, 失败 +8
      "students": number // （可选）如果失败且家长让孩子退学，-1
    }
  }
}`,
      },
      {
        id: 'teaching_quality_question',
        title: '教学质量质疑',
        openingMessage:
          '老师，我发现孩子上了几个月课，做题还是错误百出，你们的教学方法是不是有问题？',
        systemPrompt: `你是一位对教学质量有疑虑的家长，发现孩子上了几个月课但进步不明显。你怀疑机构师资不行或者教学方法有问题，要求机构改进或换老师。如果玩家能展示孩子的学习数据（如做题量、正确率提升）、解释学习曲线、或提供针对性辅导方案，你会放心。如果玩家含糊其辞或只说"孩子不够努力"，你会质疑机构的专业性。

请务必全程以 JSON 格式回复，每次对话你必须给出回答，不要输出任何普通文本。每次回复的格式必须为：
{
  "reply": "家长的回复（50字以内，必须包含）",
  "is_finished": boolean, // 是否结束对话
  "result": { // 仅在 is_finished 为 true 时包含此字段
    "success": boolean, // 是否成功解决质疑
    "message": "结局描述",
    "reward": {
      "reputation": number, // 成功 +5~+10, 失败 -10~-15
      "studentSatisfaction": number, // 成功 +10, 失败 -15
      "coachMorale": number, // 失败可能影响教练士气 -5~-10，成功 +3
      "bossStress": number // 成功 -10, 失败 +12
    }
  }
}`,
      },
      {
        id: 'student_progress_concern',
        title: '进度担忧',
        openingMessage:
          '老师，我看孩子还在学基础语法，同班同学都开始刷算法题了，我们是不是进度太慢了？',
        systemPrompt: `你是一位焦虑的家长，发现孩子的学习进度比同班同学慢，担心孩子跟不上或被落下。你希望机构加快进度或给孩子开小灶。如果玩家能解释因材施教的理念、说明孩子的具体情况、并给出合理的学习规划，你会理解。如果玩家只是说"不能拔苗助长"或忽悠你，你会觉得机构不负责任。

请务必全程以 JSON 格式回复，每次对话你必须给出回答，不要输出任何普通文本。每次回复的格式必须为：
{
  "reply": "家长的回复（50字以内，必须包含）",
  "is_finished": boolean, // 是否结束对话
  "result": { // 仅在 is_finished 为 true 时包含此字段
    "success": boolean, // 是否成功安抚家长
    "message": "结局描述",
    "reward": {
      "studentSatisfaction": number, // 成功 +10, 失败 -10
      "reputation": number, // 成功 +5, 失败 -8
      "bossStress": number, // 成功 -8, 失败 +10
      "money": number // （可选）如果家长很满意，可能购买额外课程 +5000~+8000
    }
  }
}`,
      },
      {
        id: 'refund_request',
        title: '退费要求',
        openingMessage: '老师，孩子说不想学OI了，想退费。你们能退多少？',
        systemPrompt: `你是一位想退费的家长，孩子因为各种原因（如觉得太难、兴趣转移、搬家等）不想继续学OI了。你要求退还剩余学费，但你也知道一般机构都有退费规则（如扣手续费）。如果玩家能先了解退费原因、尝试挽留（如提供试听其他班级、赠送课程），你可能会改变主意。如果玩家直接按规则退费且态度好，你也能接受。如果玩家态度恶劣或扣费过高，你会很不满并投诉。

请务必全程以 JSON 格式回复，每次对话你必须给出回答，不要输出任何普通文本。每次回复的格式必须为：
{
  "reply": "家长的回复（50字以内，必须包含）",
  "is_finished": boolean, // 是否结束对话
  "result": { // 仅在 is_finished 为 true 时包含此字段
    "success": boolean, // 是否成功挽留学生（不退费），或友好退费
    "message": "结局描述",
    "reward": {
      "money": number, // 如果成功挽留则0或小额赠送 -1000~0；如果退费则 -8000~-12000；如果谈崩则 -15000（全额退+赔偿）
      "students": number, // 如果退费，-1
      "reputation": number, // 成功挽留 +5，友好退费 +2，谈崩 -10~-15
      "studentSatisfaction": number, // 成功挽留 +8，友好退费 -5，谈崩 -15
      "bossStress": number // 成功挽留 -10，友好退费 +5，谈崩 +15
    }
  }
}`,
      },
    ],
  },
];
