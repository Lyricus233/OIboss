import React, { useMemo } from 'react';
import {
  RefreshCw,
  Trophy,
  AlertTriangle,
  Crown,
  Medal,
  Sparkles,
  Coins,
  Users,
  Calendar,
  Star,
  Gem,
  Heart,
  Flame,
  Skull,
  Rocket,
  Cloud,
  Clock,
  MessageCircleHeart,
  ScrollText,
  Wallet,
  TrendingDown,
  Wrench,
  Gamepad2,
  ScanFace,
} from 'lucide-react';
import { GameState } from '../types';
import { ACHIEVEMENTS } from '../constants';
import { formatMoney } from '../utils/format';

interface GameOverScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

type EndingStyle = {
  badge: string;
  badgeIcon: React.ReactNode;
  heroFrom: string;
  heroVia: string;
  heroTo: string;
  ringColor: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  pageBg: string;
};

const resolveEnding = (reason: string | undefined): EndingStyle => {
  const r = reason || '';
  if (r.includes('世界之巅')) {
    return {
      badge: '荣耀通关',
      badgeIcon: <Crown size={14} />,
      heroFrom: 'from-amber-400',
      heroVia: 'via-orange-500',
      heroTo: 'to-rose-500',
      ringColor: 'ring-amber-200',
      iconBg: 'bg-gradient-to-br from-yellow-300 to-amber-500',
      iconColor: 'text-white',
      icon: <Crown size={36} />,
      title: '世界之巅',
      subtitle: '你的队伍杀入 IOI 国际赛场，斩获无上荣誉。',
      pageBg:
        'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.15),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.12),transparent_60%)]',
    };
  }
  if (r.includes('名镇一方')) {
    return {
      badge: '金牌结局',
      badgeIcon: <Medal size={14} />,
      heroFrom: 'from-amber-300',
      heroVia: 'via-yellow-400',
      heroTo: 'to-orange-500',
      ringColor: 'ring-yellow-200',
      iconBg: 'bg-gradient-to-br from-yellow-400 to-amber-600',
      iconColor: 'text-white',
      icon: <Medal size={36} />,
      title: '名镇一方',
      subtitle: '你的队伍斩获 NOI 金牌，进入国家集训队。',
      pageBg: 'bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_60%)]',
    };
  }
  if (r.includes('游戏通关') || r.includes('平淡小满')) {
    return {
      badge: '稳扎稳打',
      badgeIcon: <Sparkles size={14} />,
      heroFrom: 'from-sky-400',
      heroVia: 'via-indigo-500',
      heroTo: 'to-violet-500',
      ringColor: 'ring-indigo-200',
      iconBg: 'bg-gradient-to-br from-indigo-400 to-violet-500',
      iconColor: 'text-white',
      icon: <Trophy size={36} />,
      title: '平淡小满',
      subtitle: '三年经营落幕，未名震天下，但稳扎稳打。',
      pageBg: 'bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_55%)]',
    };
  }
  if (r.includes('资金链断裂')) {
    return {
      badge: '坏结局',
      badgeIcon: <AlertTriangle size={14} />,
      heroFrom: 'from-rose-500',
      heroVia: 'via-red-500',
      heroTo: 'to-orange-500',
      ringColor: 'ring-red-200',
      iconBg: 'bg-gradient-to-br from-red-500 to-rose-600',
      iconColor: 'text-white',
      icon: <Wallet size={36} />,
      title: '资金链断裂',
      subtitle: '现金流耗尽，机构在债务中倒下。',
      pageBg: 'bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.18),transparent_55%)]',
    };
  }
  if (r.includes('AFO')) {
    return {
      badge: '坏结局',
      badgeIcon: <AlertTriangle size={14} />,
      heroFrom: 'from-slate-600',
      heroVia: 'via-zinc-700',
      heroTo: 'to-slate-800',
      ringColor: 'ring-slate-300',
      iconBg: 'bg-gradient-to-br from-slate-600 to-zinc-800',
      iconColor: 'text-white',
      icon: <Skull size={36} />,
      title: '老板 AFO',
      subtitle: '长期高压让你彻底崩溃，决定转行做大厂打工人。',
      pageBg: 'bg-[radial-gradient(circle_at_center,rgba(71,85,105,0.18),transparent_60%)]',
    };
  }
  if (r.includes('团队解散')) {
    return {
      badge: '坏结局',
      badgeIcon: <AlertTriangle size={14} />,
      heroFrom: 'from-stone-500',
      heroVia: 'via-amber-700',
      heroTo: 'to-orange-700',
      ringColor: 'ring-stone-300',
      iconBg: 'bg-gradient-to-br from-stone-500 to-amber-700',
      iconColor: 'text-white',
      icon: <Users size={36} />,
      title: '团队解散',
      subtitle: '教练士气崩盘，集体辞职。',
      pageBg: 'bg-[radial-gradient(circle_at_top_left,rgba(120,113,108,0.18),transparent_55%)]',
    };
  }
  if (r.includes('口碑崩盘')) {
    return {
      badge: '坏结局',
      badgeIcon: <AlertTriangle size={14} />,
      heroFrom: 'from-pink-500',
      heroVia: 'via-rose-600',
      heroTo: 'to-red-600',
      ringColor: 'ring-rose-200',
      iconBg: 'bg-gradient-to-br from-rose-500 to-red-600',
      iconColor: 'text-white',
      icon: <TrendingDown size={36} />,
      title: '口碑崩盘',
      subtitle: '学生家长彻底失望，机构在骂声中倒下。',
      pageBg: 'bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.18),transparent_55%)]',
    };
  }
  return {
    badge: '游戏结束',
    badgeIcon: <AlertTriangle size={14} />,
    heroFrom: 'from-slate-500',
    heroVia: 'via-slate-600',
    heroTo: 'to-slate-700',
    ringColor: 'ring-slate-200',
    iconBg: 'bg-slate-200',
    iconColor: 'text-slate-700',
    icon: <AlertTriangle size={36} />,
    title: r || '游戏结束',
    subtitle: '一段经历落幕。',
    pageBg: '',
  };
};

const ACHIEVEMENT_VISUALS: Record<
  string,
  {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    render: (unlocked: boolean) => React.ReactNode;
  }
> = {
  money_maker: {
    icon: <Coins size={22} />,
    title: '圈钱小天才',
    subtitle: '资金破 500w',
    render: (unlocked) => (
      <div
        className={`group relative overflow-hidden rounded-2xl border p-4 shadow-sm transition-all ${
          unlocked
            ? 'border-amber-200 bg-linear-to-br from-amber-50 via-yellow-50 to-orange-50 hover:shadow-lg'
            : 'border-slate-200 bg-slate-50 opacity-50 grayscale'
        }`}
      >
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-yellow-300/40 blur-2xl" />
        <div className="absolute top-3 right-3 text-amber-400">
          <Sparkles size={16} className="animate-pulse" />
        </div>
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-yellow-400 to-amber-600 text-white shadow-md shadow-amber-300/50">
            <Coins size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 font-bold text-amber-700">【圈钱小天才】</div>
            <div className="mt-0.5 text-xs text-amber-600/80">资金破 500w，闷声发大财</div>
          </div>
        </div>
      </div>
    ),
  },
  ioi_student: {
    icon: <Rocket size={22} />,
    title: '因特奶神脑',
    subtitle: '有学生参加 IOI',
    render: (unlocked) => (
      <div
        className={`group relative overflow-hidden rounded-2xl border p-4 shadow-sm transition-all ${
          unlocked
            ? 'border-violet-300 bg-linear-to-br from-indigo-900 via-violet-900 to-fuchsia-900 text-white hover:shadow-xl hover:shadow-violet-400/30'
            : 'border-slate-200 bg-slate-50 opacity-50 grayscale'
        }`}
      >
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-3 left-3 h-1 w-1 rounded-full bg-white" />
          <div className="absolute top-8 left-12 h-0.5 w-0.5 rounded-full bg-white" />
          <div className="absolute top-2 left-20 h-1 w-1 rounded-full bg-white" />
          <div className="absolute top-6 right-8 h-0.5 w-0.5 rounded-full bg-white" />
          <div className="absolute right-16 bottom-6 h-1 w-1 rounded-full bg-white" />
          <div className="absolute right-4 bottom-3 h-0.5 w-0.5 rounded-full bg-white" />
          <div className="absolute bottom-4 left-8 h-0.5 w-0.5 rounded-full bg-white" />
        </div>
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-fuchsia-400/40 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-fuchsia-500 via-violet-500 to-indigo-500 text-white shadow-lg shadow-fuchsia-500/50">
            <Rocket size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold tracking-wide">【因特奶神脑】</div>
            <div className="mt-0.5 text-xs text-violet-200">冲出宇宙，IOI 见</div>
          </div>
        </div>
      </div>
    ),
  },
  buddhist: {
    icon: <Cloud size={22} />,
    title: '佛系',
    subtitle: '突发事件全部不操作',
    render: (unlocked) => (
      <div
        className={`group relative overflow-hidden rounded-2xl border p-4 shadow-sm transition-all ${
          unlocked
            ? 'border-emerald-200 bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 hover:shadow-md'
            : 'border-slate-200 bg-slate-50 opacity-50 grayscale'
        }`}
      >
        <div className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-emerald-200/40 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-emerald-300 bg-white text-emerald-600">
            <Cloud size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-emerald-700">【佛系】</div>
            <div className="mt-0.5 text-xs text-emerald-600/80 italic">一切随缘，皆有定数</div>
          </div>
        </div>
      </div>
    ),
  },
  reminisce: {
    icon: <Clock size={22} />,
    title: '我常常追忆过去',
    subtitle: '错失抛售点超过 3 次',
    render: (unlocked) => (
      <div
        className={`group relative overflow-hidden rounded-2xl border p-4 shadow-sm transition-all ${
          unlocked
            ? 'border-stone-300 bg-linear-to-br from-stone-100 via-amber-50 to-orange-50 hover:shadow-md'
            : 'border-slate-200 bg-slate-50 opacity-50 grayscale'
        }`}
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(120,113,108,0.04)_8px,rgba(120,113,108,0.04)_16px)]" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-stone-400 to-stone-600 text-white shadow-inner">
            <Clock size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-stone-700">【我常常追忆过去】</div>
            <div className="mt-0.5 text-xs text-stone-500">回不去的高点，叹不完的息</div>
          </div>
        </div>
      </div>
    ),
  },
  sweet_talker: {
    icon: <MessageCircleHeart size={22} />,
    title: '小嘴抹了蜜',
    subtitle: '与家长沟通极成功',
    render: (unlocked) => (
      <div
        className={`group relative overflow-hidden rounded-2xl border p-4 shadow-sm transition-all ${
          unlocked
            ? 'border-pink-200 bg-linear-to-br from-pink-50 via-rose-50 to-fuchsia-50 hover:shadow-lg hover:shadow-pink-200/50'
            : 'border-slate-200 bg-slate-50 opacity-50 grayscale'
        }`}
      >
        <div className="absolute top-2 right-2 text-pink-300">
          <Heart size={12} className="animate-pulse" />
        </div>
        <div className="absolute top-6 right-8 text-rose-300">
          <Heart size={10} />
        </div>
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-pink-400 to-rose-500 text-white shadow-md shadow-pink-300/50">
            <MessageCircleHeart size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-rose-600">【小嘴抹了蜜】</div>
            <div className="mt-0.5 text-xs text-rose-500/80">三言两语，宾主尽欢</div>
          </div>
        </div>
      </div>
    ),
  },
  bankrupt: {
    icon: <Skull size={22} />,
    title: '哦哦哦倒闭了',
    subtitle: '资金归零',
    render: (unlocked) => (
      <div
        className={`group relative overflow-hidden rounded-2xl border p-4 shadow-sm transition-all ${
          unlocked
            ? 'border-red-300 bg-linear-to-br from-red-50 via-orange-50 to-yellow-50 hover:shadow-md'
            : 'border-slate-200 bg-slate-50 opacity-50 grayscale'
        }`}
      >
        <div className="absolute -top-1 right-0 left-0 flex justify-around opacity-60">
          <div className="h-2 w-2 rotate-45 bg-red-400" />
          <div className="h-2 w-2 rotate-45 bg-red-400" />
          <div className="h-2 w-2 rotate-45 bg-red-400" />
          <div className="h-2 w-2 rotate-45 bg-red-400" />
          <div className="h-2 w-2 rotate-45 bg-red-400" />
          <div className="h-2 w-2 rotate-45 bg-red-400" />
        </div>
        <div className="relative flex items-center gap-3 pt-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-red-500 to-rose-700 text-white shadow-md">
            <Skull size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-red-700">【哦哦哦倒闭了】</div>
            <div className="mt-0.5 text-xs text-red-500/80">现金流：- ∞</div>
          </div>
        </div>
      </div>
    ),
  },
  bro_iron: {
    icon: <Wrench size={22} />,
    title: '兄弟，铁了',
    subtitle: 'NOI 无奖牌',
    render: (unlocked) => (
      <div
        className={`group relative overflow-hidden rounded-2xl border p-4 shadow-sm transition-all ${
          unlocked
            ? 'border-zinc-300 bg-linear-to-br from-zinc-100 via-slate-200 to-zinc-300 hover:shadow-md'
            : 'border-slate-200 bg-slate-50 opacity-50 grayscale'
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.5)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0.5)_75%,transparent_75%)] bg-size-[8px_8px] opacity-30" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-zinc-400 to-slate-600 text-white shadow-inner ring-2 ring-zinc-300">
            <Wrench size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-zinc-700">【兄弟，铁了】</div>
            <div className="mt-0.5 text-xs text-zinc-500">铁中之铁，铁上加铁</div>
          </div>
        </div>
      </div>
    ),
  },
  almost_bankrupt: {
    icon: <Flame size={22} />,
    title: '一步之遥',
    subtitle: '资金 < 10,000 但仍存活',
    render: (unlocked) => (
      <div
        className={`group relative overflow-hidden rounded-2xl border p-4 shadow-sm transition-all ${
          unlocked
            ? 'border-orange-300 bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 hover:shadow-md'
            : 'border-slate-200 bg-slate-50 opacity-50 grayscale'
        }`}
      >
        <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-yellow-400 via-orange-500 to-red-500" />
        <div className="absolute top-3 right-3 text-orange-400">
          <Flame size={14} className="animate-pulse" />
        </div>
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-orange-400 to-red-500 text-white shadow-md shadow-orange-300/60">
            <Flame size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-orange-700">【一步之遥】</div>
            <div className="mt-0.5 text-xs text-orange-600/80">悬崖边的舞者</div>
          </div>
        </div>
      </div>
    ),
  },
  op: {
    icon: <Gamepad2 size={22} />,
    title: 'op',
    subtitle: '学生学会原神 + p 站',
    render: (unlocked) => (
      <div
        className={`group relative overflow-hidden rounded-2xl border p-4 shadow-sm transition-all ${
          unlocked
            ? 'border-fuchsia-300 bg-linear-to-r from-pink-100 via-purple-100 to-cyan-100 hover:shadow-lg'
            : 'border-slate-200 bg-slate-50 opacity-50 grayscale'
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(236,72,153,0.15),rgba(168,85,247,0.15),rgba(34,211,238,0.15))]" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 text-white shadow-md">
            <Gamepad2 size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="bg-linear-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text font-extrabold tracking-widest text-transparent">
              【O P】
            </div>
            <div className="mt-0.5 text-xs text-purple-600/80">少年，你的原石可还够？</div>
          </div>
        </div>
      </div>
    ),
  },
};

const renderDefaultAchievement = (id: string, name: string, desc: string, unlocked: boolean) => (
  <div
    key={id}
    className={`rounded-2xl border p-4 shadow-sm transition-all ${
      unlocked ? 'border-indigo-200 bg-indigo-50' : 'border-slate-200 bg-slate-50 opacity-50'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
        <Star size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-bold text-indigo-700">{name}</div>
        <div className="mt-0.5 text-xs text-indigo-500/80">{desc}</div>
      </div>
    </div>
  </div>
);

const aggregateContestRecords = (gameState: GameState) => {
  const all = gameState.students.flatMap((s) => s.passedContests || []);
  const unique = Array.from(new Set(all));

  const has = (kw: string) => unique.some((c) => c.includes(kw));

  return {
    csp1: has('CSP1'),
    csp2: has('CSP2'),
    noip: has('NOIP'),
    provincial: has('PROVINCIAL') || has('省选'),
    noi: has('NOI'),
    apio: has('APIO'),
    ctt: has('CTT'),
    cts: has('CTS'),
    ioi: has('IOI'),
  };
};

const GameOverScreen: React.FC<GameOverScreenProps> = ({ gameState, onRestart }) => {
  const ending = useMemo(() => resolveEnding(gameState.gameOverReason), [gameState.gameOverReason]);
  const records = useMemo(() => aggregateContestRecords(gameState), [gameState]);

  const milestones: { key: string; label: string; reached: boolean }[] = [
    { key: 'csp', label: 'CSP', reached: records.csp1 || records.csp2 },
    { key: 'noip', label: 'NOIP', reached: records.noip },
    { key: 'provincial', label: '省选', reached: records.provincial },
    { key: 'noi', label: 'NOI', reached: records.noi },
    { key: 'apio', label: 'APIO', reached: records.apio },
    { key: 'cts', label: 'CTS', reached: records.cts },
    { key: 'ctt', label: 'CTT', reached: records.ctt },
    { key: 'ioi', label: 'IOI', reached: records.ioi },
  ];

  const reachedCount = milestones.filter((m) => m.reached).length;
  const unlockedAchievements = ACHIEVEMENTS.filter((a) => gameState.achievements.includes(a.id));
  const lockedAchievements = ACHIEVEMENTS.filter((a) => !gameState.achievements.includes(a.id));

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden bg-slate-50 ${ending.pageBg}`}
    >
      {/* 顶部 Hero */}
      <div
        className={`relative shrink-0 overflow-hidden bg-linear-to-r ${ending.heroFrom} ${ending.heroVia} ${ending.heroTo} text-white`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.25),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.18),transparent_40%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-6">
          <div className="flex items-center gap-5">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-2xl ${ending.iconBg} ${ending.iconColor} shadow-xl ring-4 ${ending.ringColor}`}
            >
              {ending.icon}
            </div>
            <div>
              <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium tracking-wider uppercase backdrop-blur">
                {ending.badgeIcon}
                {ending.badge}
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-sm">
                {ending.title}
              </h1>
              <p className="mt-1 max-w-xl text-sm text-white/85">
                {gameState.gameOverReason ? `${ending.subtitle}` : ending.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onRestart}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
          >
            <RefreshCw size={16} />
            重新开始
          </button>
        </div>
      </div>

      {/* 主体三列 */}
      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden p-4">
        {/* 左：核心数据 + 比赛里程碑 */}
        <div className="col-span-4 flex flex-col gap-4 overflow-y-auto pr-1">
          {/* 数据卡片 */}
          <div className="grid grid-cols-2 gap-3">
            <StatTile
              label="存活周数"
              value={`${gameState.totalWeeks}`}
              unit="周"
              icon={<Calendar size={20} />}
              color="from-sky-400 to-indigo-500"
            />
            <StatTile
              label="最终资金"
              value={formatMoney(gameState.cash)}
              icon={<Wallet size={20} />}
              color="from-emerald-400 to-teal-500"
            />
            <StatTile
              label="机构声望"
              value={`${Math.floor(gameState.reputation)}`}
              icon={<Trophy size={20} />}
              color="from-amber-400 to-orange-500"
            />
            <StatTile
              label="学生规模"
              value={`${gameState.students.length}`}
              unit="人"
              icon={<Users size={20} />}
              color="from-fuchsia-400 to-pink-500"
            />
            <StatTile
              label="获得奖牌"
              value={`${gameState.totalMedals || 0}`}
              unit="枚"
              icon={<Medal size={20} />}
              color="from-yellow-400 to-amber-500"
            />
            <StatTile
              label="最终得分"
              value={`${gameState.finalScore || 0}`}
              icon={<Star size={20} />}
              color="from-violet-400 to-purple-500"
            />
          </div>

          {/* 比赛里程碑时间线 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <ScanFace size={16} className="text-indigo-500" />
                征战足迹
              </h3>
              <span className="text-xs text-slate-400">
                {reachedCount} / {milestones.length}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {milestones.map((m) => (
                <div
                  key={m.key}
                  className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2 text-center text-xs transition-all ${
                    m.reached
                      ? 'border-indigo-200 bg-linear-to-br from-indigo-50 to-violet-50 text-indigo-700 shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-400'
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      m.reached
                        ? 'bg-linear-to-br from-indigo-500 to-violet-500 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {m.reached ? <Sparkles size={12} /> : <Gem size={12} />}
                  </div>
                  <div className="font-bold">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 学生荣誉墙 */}
          {gameState.students.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
                <Users size={16} className="text-rose-500" />
                学生名册
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {gameState.students.map((s) => (
                  <span
                    key={s.id}
                    className={`rounded-full border px-2 py-0.5 text-xs ${
                      s.tier === 'ADVANCED'
                        ? 'border-amber-200 bg-amber-50 text-amber-700'
                        : s.tier === 'INTERMEDIATE'
                          ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 中：成就墙（独立风格）*/}
        <div className="col-span-5 flex flex-col overflow-hidden">
          <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-slate-50 to-white p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Trophy size={16} className="text-amber-500" />
                成就陈列馆
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                已解锁
                <span className="inline-flex h-5 min-w-6 items-center justify-center rounded-full bg-linear-to-r from-amber-400 to-orange-500 px-1.5 font-bold text-white shadow-sm">
                  {unlockedAchievements.length}
                </span>
                <span className="text-slate-400">/ {ACHIEVEMENTS.length}</span>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-4">
              {/* 解锁的优先展示 */}
              {unlockedAchievements.map((a) => {
                const visual = ACHIEVEMENT_VISUALS[a.id];
                if (visual) return <div key={a.id}>{visual.render(true)}</div>;
                return renderDefaultAchievement(a.id, a.name, a.description, true);
              })}
              {/* 未解锁灰显 */}
              {lockedAchievements.map((a) => {
                const visual = ACHIEVEMENT_VISUALS[a.id];
                if (visual) return <div key={a.id}>{visual.render(false)}</div>;
                return renderDefaultAchievement(a.id, a.name, a.description, false);
              })}
            </div>
          </div>
        </div>

        {/* 右：日志面板 */}
        <div className="col-span-3 flex flex-col overflow-hidden">
          <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-3">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <ScrollText size={16} className="text-slate-500" />
                经营日志
              </h3>
              <span className="text-xs text-slate-400">{gameState.history.length} 条</span>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto p-2">
              {[...gameState.history].reverse().map((log) => (
                <div
                  key={log.id}
                  className={`rounded-lg border p-2 text-xs leading-snug ${
                    log.type === 'success'
                      ? 'border-green-100 bg-green-50 text-green-800'
                      : log.type === 'danger'
                        ? 'border-red-100 bg-red-50 text-red-800'
                        : log.type === 'warning'
                          ? 'border-orange-100 bg-orange-50 text-orange-800'
                          : 'border-slate-100 bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className="mr-1 font-mono opacity-50">W{log.week}</span>
                  <span className="whitespace-pre-wrap">{log.message}</span>
                </div>
              ))}
              {gameState.history.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400">暂无日志</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatTile: React.FC<{
  label: string;
  value: string;
  unit?: string;
  icon: React.ReactNode;
  color: string;
}> = ({ label, value, unit, icon, color }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
    <div
      className={`absolute -top-4 -right-4 h-16 w-16 rounded-full bg-linear-to-br ${color} opacity-15 blur-xl transition-opacity group-hover:opacity-30`}
    />
    <div className="relative flex items-start justify-between">
      <div className="min-w-0">
        <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          {label}
        </div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-xl font-extrabold text-slate-800">{value}</span>
          {unit && <span className="text-xs font-medium text-slate-400">{unit}</span>}
        </div>
      </div>
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${color} text-white shadow-sm`}
      >
        {icon}
      </div>
    </div>
  </div>
);

export default GameOverScreen;
