import { useState, useEffect } from 'react';
import { GameState, CityTier, LogEntry, Student, LogType } from '../types';
import {
  COACH_UPGRADE_COSTS,
  AGENCY_ACTIONS,
  RANDOM_EVENTS,
  NAMES,
  RECRUITMENT_CONFIG,
  TAGS,
  FACILITY_CONFIG,
  WEEKLY_RENT,
  PROVINCES,
  INITIAL_CASH,
  CALENDAR_EVENTS,
} from '../constants';

export const generateStudent = (
  id: string,
  tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' = 'BEGINNER',
  customName?: string,
  existingNames: Set<string> = new Set(),
  provinceId?: string
): Student => {
  let fullName = customName || '';

  if (!fullName) {
    let attempts = 0;
    do {
      const surname = NAMES.surnames[Math.floor(Math.random() * NAMES.surnames.length)];
      const name = NAMES.names[Math.floor(Math.random() * NAMES.names.length)];
      fullName = surname + name;
      attempts++;
    } while (existingNames.has(fullName) && attempts < 50);
  }

  const gender = Math.random() > 0.5 ? 'M' : 'F';

  const cfg = RECRUITMENT_CONFIG[tier];
  let talent =
    cfg.talentRange.min + Math.floor(Math.random() * (cfg.talentRange.max - cfg.talentRange.min));

  if (provinceId) {
    const province = PROVINCES.find((p) => p.id === provinceId);
    if (province && province.buff && province.buff.talent) {
      talent += province.buff.talent;
    }
  }

  const tags = Math.random() < 0.3 ? [TAGS[Math.floor(Math.random() * TAGS.length)].name] : [];

  const ability =
    cfg.abilityRange.min +
    Math.floor(Math.random() * (cfg.abilityRange.max - cfg.abilityRange.min));

  const score = ability + talent * 0.5;
  const minScore = cfg.abilityRange.min + cfg.talentRange.min * 0.5;
  const maxScore = cfg.abilityRange.max + cfg.talentRange.max * 0.5;
  const ratio = Math.max(0, Math.min(1, (score - minScore) / (maxScore - minScore)));
  const multiplier = 0.5 + ratio * 1.5;
  let finalCost = Math.round((cfg.cost * multiplier) / 100) * 100;
  finalCost = Math.max(100, finalCost);

  return {
    id,
    name: fullName,
    gender,
    tier,
    talent,
    ability,
    mood: 80,
    stress: 0,
    tags: tags,
    cost: finalCost,
  };
};

export const calculateTuition = (student: Student) => {
  let extraTuition = 300;
  if (student.tier === 'ADVANCED') extraTuition = 3000;
  else if (student.tier === 'INTERMEDIATE') extraTuition = 2000;

  let base = Math.floor(student.ability * 60) + extraTuition;

  if (student.tags && student.tags.includes('富二代')) {
    const tag = TAGS.find((t) => t.name === '富二代');
    const multiplier = (tag?.effect as any)?.tuition || 1.5;
    base = Math.floor(base * multiplier);
  }

  return base;
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'SETUP',
    bossName: '',
    agencyName: '',
    province: '',
    city: 'PROVINCIAL',
    year: 1,
    week: 1,
    totalWeeks: 1,
    cash: 0,
    reputation: 20,
    totalMedals: 0,
    coachLevel: 1,

    coachMorale: 80,
    bossStress: 0,
    studentSatisfaction: 80,

    potentialStudents: 0,
    fixedCost: 0,
    maxStudents: 20,
    facilityLevel: 1,
    actedThisWeek: false,
    currentEvent: null,

    students: [],

    history: [],
    statsHistory: [],
    modalContent: null,
    notifications: [],
    doneEvents: [],
  });

  const [setupForm, setSetupForm] = useState({
    bossName: '飓风王金',
    agencyName: '萌猫信奥',
    city: 'PROVINCIAL' as CityTier,
    province: '',
    difficulty: 'normal' as 'easy' | 'normal' | 'hard',
  });

  useEffect(() => {
    (window as any).game = {
      state: gameState,
      setState: setGameState,
      addCash: (amount: number) => {
        const capped = clamp(amount, -1000000, 1000000);
        setGameState((prev) => ({ ...prev, cash: prev.cash + capped }));
        console.log(`[Cheat] Added ${capped} cash.`);
      },
      setReputation: (amount: number) => {
        const safe = clamp(amount, 0, 100);
        setGameState((prev) => ({ ...prev, reputation: safe }));
        console.log(`[Cheat] Set reputation to ${safe}.`);
      },
      setCoachLevel: (level: number) => {
        const safe = clamp(Math.floor(level), 1, 7);
        setGameState((prev) => ({ ...prev, coachLevel: safe }));
        console.log(`[Cheat] Set coach level to ${safe}.`);
      },
    };
  }, [gameState]);

  const addLog = (state: GameState, message: string, type: LogEntry['type'] = 'info') => {
    state.history.push({
      id: Math.random().toString(),
      week: state.totalWeeks,
      message,
      type,
    });
  };

  const addNotification = (
    state: GameState,
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) => {
    state.notifications = [
      ...state.notifications,
      {
        id: Math.random().toString(),
        message,
        type,
      },
    ];
  };

  const removeNotification = (id: string) => {
    setGameState((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((t) => t.id !== id),
    }));
  };

  const startGame = () => {
    let cash = 0;
    let fixedCost = 0;
    let reputation = 0;
    let studentsCount = 5;
    let stress = 20;

    if (setupForm.city === 'TIER1') {
      cash = INITIAL_CASH.TIER1;
      fixedCost = WEEKLY_RENT.TIER1;
      reputation = 20;
    } else if (setupForm.city === 'PROVINCIAL') {
      cash = INITIAL_CASH.PROVINCIAL;
      fixedCost = WEEKLY_RENT.PROVINCIAL;
      reputation = 15;
    } else {
      cash = INITIAL_CASH.REMOTE;
      fixedCost = WEEKLY_RENT.REMOTE;
      reputation = 10;
    }

    fixedCost += FACILITY_CONFIG[1].rent;

    const provinceData = PROVINCES.find((p) => p.id === setupForm.province);
    if (provinceData && provinceData.buff) {
      if (provinceData.buff.money) cash += provinceData.buff.money;
      if (provinceData.buff.reputation) reputation += provinceData.buff.reputation;
      if (provinceData.buff.stress) stress += provinceData.buff.stress;
    }

    if (setupForm.difficulty === 'easy') {
      cash *= 1.6;
      fixedCost *= 0.8;
      stress = Math.max(0, stress - 10);
    } else if (setupForm.difficulty === 'hard') {
      cash *= 0.7;
      fixedCost *= 1.1;
      stress += 10;
    }

    const initialStudents: Student[] = [];
    for (let i = 0; i < studentsCount; i++) {
      initialStudents.push(
        generateStudent(`init-${i}`, 'BEGINNER', undefined, undefined, setupForm.province)
      );
    }

    setGameState({
      ...gameState,
      status: 'PLAYING',
      bossName: setupForm.bossName,
      agencyName: setupForm.agencyName,
      city: setupForm.city,
      province: setupForm.province,
      cash: Math.round(cash),
      fixedCost: Math.round(fixedCost),
      reputation: Math.max(0, reputation),
      bossStress: Math.max(0, stress),
      totalMedals: 0,
      students: initialStudents,
      coachMorale: 80,
      studentSatisfaction: 80,
      potentialStudents: 0,
      maxStudents: FACILITY_CONFIG[1].maxStudents,
      facilityLevel: 1,
      actedThisWeek: false,
      currentEvent: null,
      doneEvents: [],
      statsHistory: [{ week: 1, cash: Math.round(cash), reputation: Math.max(0, reputation) }],
      history: [
        {
          id: 'init',
          week: 1,
          type: 'success',
          message: `您好 ${setupForm.bossName}，位于${provinceData?.name || ''}的${setupForm.agencyName} 正式开业！有五名学生慕名而来！`,
        },
      ],
    });
  };

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const applyEffects = (s: GameState, effects: any) => {
    if (!effects) return;
    if (effects.money) s.cash += effects.money;
    if (effects.reputation) s.reputation += effects.reputation;
    if (effects.coachMorale) s.coachMorale += effects.coachMorale;
    if (effects.studentSatisfaction) s.studentSatisfaction += effects.studentSatisfaction;
    if (effects.bossStress) s.bossStress += effects.bossStress;
    if (effects.students) {
      if (effects.students > 0) {
        for (let i = 0; i < effects.students; i++) {
          s.students.push(
            generateStudent(
              `evt-${s.totalWeeks}-${i}`,
              'BEGINNER',
              undefined,
              undefined,
              s.province
            )
          );
        }
      } else if (effects.students < 0) {
        s.students.splice(0, Math.abs(effects.students));
      }
    }
    if (effects.potentialStudents) s.potentialStudents += effects.potentialStudents;
    if (effects.fixedCost) s.fixedCost += effects.fixedCost;

    s.reputation = clamp(s.reputation, 0, 100);
    s.coachMorale = clamp(s.coachMorale, 0, 100);
    s.studentSatisfaction = clamp(s.studentSatisfaction, 0, 100);
    s.bossStress = clamp(s.bossStress, 0, 100);
    s.fixedCost = Math.max(0, s.fixedCost);
    s.potentialStudents = Math.max(0, s.potentialStudents);
  };

  const executeTraining = (intensity: 'LIGHT' | 'STANDARD' | 'INTENSE' | 'MOCK') => {
    let s = { ...gameState };
    s.status = 'PLAYING';
    s.modalContent = null;

    let cost = 0;
    let logMsg = '';
    let logType: LogType = 'info';

    if (intensity === 'LIGHT') {
      cost = 0;
      logMsg = '本周学生自行补题，效果一般但压力稍降。';
      logType = 'success';
    } else if (intensity === 'STANDARD') {
      cost = 2000;
      logMsg = '本周进行了常规训练，稳扎稳打，循序渐进。';
    } else if (intensity === 'INTENSE') {
      cost = 5000;
      logMsg = '本周进行了魔鬼集训，效果显著但压力山大！';
      logType = 'warning';
    } else if (intensity === 'MOCK') {
      cost = 3000;
      logMsg = '本周组织了全真模拟赛，检验了实战能力。';
    }

    if (s.cash < cost) {
      addNotification(s, '资金不足，无法进行该强度的训练！', 'error');
      setGameState(s);
      return;
    }
    s.cash -= cost;

    let totalAbilityGain = 0;

    s.students.forEach((st) => {
      let abilityGain = 0;
      let stressChange = 0;
      let moodChange = 0;
      const tags = st.tags || [];

      if (intensity === 'LIGHT') {
        abilityGain = 0.2;
        stressChange = -8;
        moodChange = 5;
        if (tags.includes('摸鱼')) {
          stressChange -= 5;
          moodChange += 5;
        }
        if (tags.includes('卷王')) {
          stressChange += 5;
          moodChange -= 5;
        }
      } else if (intensity === 'STANDARD') {
        abilityGain = 0.8;
        stressChange = 3;
      } else if (intensity === 'INTENSE') {
        abilityGain = 1.5;
        stressChange = 12;
        if (tags.includes('卷王')) abilityGain += 0.5;
        if (tags.includes('摸鱼')) {
          stressChange += 10;
          moodChange -= 10;
        }
        if (tags.includes('玻璃心')) {
          stressChange += 5;
        }
      } else if (intensity === 'MOCK') {
        abilityGain = 0.6;
        stressChange = 6;
        if (tags.includes('考霸')) abilityGain += 0.8;
        if (tags.includes('手速怪')) abilityGain += 0.5;
        if (tags.includes('大心脏')) stressChange -= 2;
      }

      // Apply changes
      st.ability = Math.min(100, st.ability + abilityGain);
      st.stress = Math.max(0, st.stress + stressChange);
      st.mood = Math.max(0, Math.min(100, st.mood + moodChange));

      totalAbilityGain += abilityGain;
    });

    addLog(s, logMsg, logType);

    if (s.students.length > 0) {
      const avgGain = (totalAbilityGain / s.students.length).toFixed(1);
      addLog(s, `全员平均能力提升了 ${avgGain} 点。`, 'info');
    }

    s.actedThisWeek = true;
    processEndWeekLogic(s);
  };

  const executeRelaxation = (type: 'MOVIE' | 'DINNER' | 'TRAVEl' | 'FREE') => {
    let s = { ...gameState };
    s.status = 'PLAYING';
    s.modalContent = null;

    let cost = 0;
    let logMsg = '';
    let logType: LogType = 'success';

    if (type === 'MOVIE') {
      cost = 500;
      logMsg = '大家一起去看了场电影，心情放松了不少。';
    } else if (type === 'DINNER') {
      cost = 2000;
      logMsg = '组织了一次丰盛的聚餐，大家边吃边聊，气氛融洽。';
    } else if (type === 'TRAVEl') {
      cost = 5000;
      logMsg = '集体外出旅游，所有压力都释放了！';
    } else if (type === 'FREE') {
      cost = 0;
      logMsg = '本周没有安排训练，让大家自由支配时间休息。';
      logType = 'info';
    }

    if (s.cash < cost) {
      addNotification(s, '资金不足，无法进行该活动！', 'error');
      setGameState(s);
      return;
    }
    s.cash -= cost;

    let coachMoraleGain = 0;
    if (type === 'MOVIE') coachMoraleGain = 2;
    if (type === 'DINNER') coachMoraleGain = 5;
    if (type === 'TRAVEl') coachMoraleGain = 10;
    if (type === 'FREE') coachMoraleGain = 2;

    s.coachMorale = Math.min(100, s.coachMorale + coachMoraleGain);
    s.bossStress = Math.max(0, s.bossStress - coachMoraleGain);

    let totalMoodGain = 0;

    s.students.forEach((st) => {
      let moodGain = 0;
      let stressLoss = 0;
      const tags = st.tags || [];

      if (type === 'MOVIE') {
        moodGain = 5 + Math.random() * 5;
        stressLoss = 5 + Math.random() * 5;
        if (tags.includes('社恐')) {
          moodGain += 2;
        }
        if (tags.includes('迟钝')) {
          moodGain += 2;
        }
      } else if (type === 'DINNER') {
        moodGain = 10 + Math.random() * 10;
        stressLoss = 8 + Math.random() * 8;
        if (tags.includes('社牛')) {
          moodGain += 10;
          stressLoss += 5;
        }
        if (tags.includes('活泼')) {
          moodGain += 5;
        }
      } else if (type === 'TRAVEl') {
        moodGain = 20 + Math.random() * 15;
        stressLoss = 20 + Math.random() * 10;
        if (tags.includes('活泼')) {
          moodGain += 10;
        }
        if (tags.includes('社牛')) {
          moodGain += 5;
        }
        if (tags.includes('玻璃心')) {
          stressLoss += 10;
        }
      } else if (type === 'FREE') {
        moodGain = 3 + Math.random() * 5;
        stressLoss = 3 + Math.random() * 5;
        if (tags.includes('摸鱼')) {
          moodGain += 15;
          stressLoss += 10;
        }
        if (tags.includes('卷王')) {
          moodGain -= 5;
          stressLoss -= 5;
        }
      }

      st.mood = Math.min(100, st.mood + moodGain);
      st.stress = Math.max(0, st.stress - stressLoss);

      totalMoodGain += moodGain;
    });

    addLog(s, logMsg, logType);

    if (s.students.length > 0) {
      const avgGain = (totalMoodGain / s.students.length).toFixed(1);
      addLog(s, `全员平均心情提升了 ${avgGain} 点，教练士气 +${coachMoraleGain}。`, 'success');
    }

    s.actedThisWeek = true;
    processEndWeekLogic(s);
  };

  const handleActionClick = (actionId: string) => {
    if (gameState.status !== 'PLAYING') return;

    if (actionId === 'train') {
      setGameState((prev) => ({
        ...prev,
        status: 'MODAL',
        modalContent: {
          type: 'CONFIRM',
          title: '制定训练计划',
          description:
            '请选择本周的训练强度与侧重点。不同的训练方式会对学生的能力增长、压力和心情产生不同影响。',
          options: [
            {
              label: '自行补题 (免费)',
              action: () => executeTraining('LIGHT'),
            },
            {
              label: '常规训练 (-2000)',
              action: () => executeTraining('STANDARD'),
            },
            {
              label: '魔鬼集训 (-5000)',
              action: () => executeTraining('INTENSE'),
              isDanger: true,
            },
            {
              label: '全真模拟 (-3000)',
              action: () => executeTraining('MOCK'),
            },
            {
              label: '取消',
              action: () =>
                setGameState((p) => ({
                  ...p,
                  status: 'PLAYING',
                  modalContent: null,
                })),
            },
          ],
        },
      }));
      return;
    }

    if (actionId === 'relax') {
      setGameState((prev) => ({
        ...prev,
        status: 'MODAL',
        modalContent: {
          type: 'CONFIRM',
          title: '组织团建活动',
          description: '选择一种方式让大家放松身心，恢复状态。',
          options: [
            {
              label: '自由活动 (免费)',
              action: () => executeRelaxation('FREE'),
            },
            {
              label: '集体观影 (-500)',
              action: () => executeRelaxation('MOVIE'),
            },
            {
              label: '聚餐团建 (-2000)',
              action: () => executeRelaxation('DINNER'),
            },
            {
              label: '外出旅游 (-5000)',
              action: () => executeRelaxation('TRAVEl'),
            },
            {
              label: '取消',
              action: () =>
                setGameState((p) => ({
                  ...p,
                  status: 'PLAYING',
                  modalContent: null,
                })),
            },
          ],
        },
      }));
      return;
    }

    let s = { ...gameState };
    const act = AGENCY_ACTIONS.find((a) => a.id === actionId);
    if (!act) return;

    if (act.id === 'bankruptcy') {
      setGameState((prev) => ({
        ...prev,
        status: 'MODAL',
        modalContent: {
          type: 'CONFIRM',
          title: '申请破产清算',
          description: '确定要申请破产清算吗？这将直接结束游戏！',
          options: [
            {
              label: '确认破产',
              isDanger: true,
              action: () => {
                setGameState((p) => ({
                  ...p,
                  status: 'GAME_OVER',
                  gameOverReason: '主动破产',
                  modalContent: {
                    type: 'ALERT',
                    title: '结局：及时止损',
                    description:
                      '你意识到继续经营下去只会越陷越深，于是果断选择了破产清算。虽然亏了一些钱，但至少没有背上巨额债务。',
                  },
                }));
              },
            },
            {
              label: '取消',
              action: () => {
                setGameState((p) => ({
                  ...p,
                  status: 'PLAYING',
                  modalContent: null,
                }));
              },
            },
          ],
        },
      }));
      return;
    }

    if (act.cost < 0 && s.cash + act.cost < 0) {
      addNotification(s, '资金不足！', 'error');
      setGameState(s);
      return;
    }

    s.cash += act.cost;

    if (checkGameOver(s)) {
      setGameState(s);
      return;
    }

    if (act.outcomes && act.outcomes.length > 0) {
      const rand = Math.random() * 100;
      let sum = 0;
      let selectedOutcome = act.outcomes[0];

      for (const o of act.outcomes) {
        sum += o.weight;
        if (rand < sum) {
          selectedOutcome = o;
          break;
        }
      }

      applyEffects(s, selectedOutcome.effects);

      if (act.id === 'squeeze') {
        let totalAbilityGain = 0;
        s.students.forEach((st) => {
          const tags = st.tags || [];

          // Random base values
          let abilityGain = 0.5 + Math.random() * 0.8; // 0.5 - 1.3
          let stressGain = 4 + Math.random() * 6; // 4 - 10
          let moodLoss = 4 + Math.random() * 6; // 4 - 10

          // Tag modifiers
          if (tags.includes('卷王')) {
            stressGain *= 1.4;
            abilityGain *= 1.2;
          }
          if (tags.includes('摸鱼')) {
            stressGain *= 0.6;
            abilityGain *= 0.8;
            moodLoss *= 0.8;
          }
          if (tags.includes('玻璃心')) {
            stressGain *= 1.4;
            moodLoss *= 1.2;
          }
          if (tags.includes('迟钝')) {
            stressGain *= 0.5;
          }
          if (tags.includes('大心脏')) {
            stressGain *= 0.8;
          }
          if (tags.includes('活泼')) {
            moodLoss *= 0.7;
          }

          st.ability = Math.min(100, st.ability + abilityGain);
          st.stress = Math.max(0, st.stress + stressGain);
          st.mood = Math.max(0, st.mood - moodLoss);

          totalAbilityGain += abilityGain;
        });

        if (s.students.length > 0) {
          const avgGain = (totalAbilityGain / s.students.length).toFixed(1);
          addLog(
            s,
            `高强度排课让学生们也被迫加练，平均能力提升 ${avgGain}，但压力和心情受到了影响。`,
            'warning'
          );
        }
      }

      const parts = [];
      const e = selectedOutcome.effects as any;
      if (e.money) parts.push(`资金${e.money > 0 ? '+' : ''}${e.money}`);
      if (e.reputation) parts.push(`声望${e.reputation > 0 ? '+' : ''}${e.reputation}`);
      if (e.studentSatisfaction)
        parts.push(`满意度${e.studentSatisfaction > 0 ? '+' : ''}${e.studentSatisfaction}`);
      if (e.coachMorale) parts.push(`士气${e.coachMorale > 0 ? '+' : ''}${e.coachMorale}`);
      if (e.bossStress) parts.push(`压力${e.bossStress > 0 ? '+' : ''}${e.bossStress}`);
      if (e.potentialStudents)
        parts.push(`潜在生源${e.potentialStudents > 0 ? '+' : ''}${e.potentialStudents}`);

      const effectStr = parts.length > 0 ? `「${parts.join(' ')}」` : '';
      addLog(
        s,
        `${act.name}：${selectedOutcome.description}${effectStr}`,
        (selectedOutcome.type as LogType) || 'info'
      );
    }

    s.actedThisWeek = true;

    // 自动结束本周，直接传入当前状态，避免闭包导致的旧状态覆盖问题
    processEndWeekLogic(s);
  };

  const handleRandomEvent = (s: GameState) => {
    if (Math.random() > 0.35) return;

    const available = (RANDOM_EVENTS as any[]).filter((ev) => {
      if (s.totalWeeks < ev.minWeek) return false;
      if (ev.unique && s.doneEvents?.includes(ev.id)) return false;

      // 最多触发 3 次
      if (ev.id === 'parent_chat') {
        const count = s.doneEvents?.filter((id) => id === 'parent_chat').length || 0;
        if (count >= 3) return false;
        if (Math.random() > 0.5) return false;
      }

      return true;
    });

    if (!available.length) return;

    const event = available[Math.floor(Math.random() * available.length)];
    const eventInstance = { ...event };

    if (event.type === 'CHAT' && event.chats && event.chats.length > 0) {
      const scenario = event.chats[Math.floor(Math.random() * event.chats.length)];
      eventInstance.activeChat = scenario;
    }

    if (event.unique || event.id === 'parent_chat') {
      s.doneEvents = [...(s.doneEvents || []), event.id];
    }

    s.currentEvent = eventInstance;
  };

  const handleChatEventComplete = (result: any) => {
    const s = { ...gameState };
    s.currentEvent = null;

    let effectText = '';
    if (result.reward) {
      const parts = [];
      if (result.reward.money)
        parts.push(`资金${result.reward.money > 0 ? '+' : ''}${result.reward.money}`);
      if (result.reward.reputation)
        parts.push(`声望${result.reward.reputation > 0 ? '+' : ''}${result.reward.reputation}`);
      if (result.reward.studentSatisfaction)
        parts.push(
          `满意度${result.reward.studentSatisfaction > 0 ? '+' : ''}${result.reward.studentSatisfaction}`
        );
      if (result.reward.bossStress)
        parts.push(`压力${result.reward.bossStress > 0 ? '+' : ''}${result.reward.bossStress}`);
      if (result.reward.coachMorale)
        parts.push(`士气${result.reward.coachMorale > 0 ? '+' : ''}${result.reward.coachMorale}`);

      if (parts.length > 0) {
        effectText = `「${parts.join('，')}」`;
      }
    }

    if (result.success) {
      addLog(s, `谈判成功：${result.message}${effectText}`, 'success');
    } else {
      addLog(s, `谈判失败：${result.message}${effectText}`, 'danger');
    }

    if (result.reward) {
      applyEffects(s, result.reward);
    }

    checkGameOver(s);
    setGameState(s);
  };

  const onEventOptionClick = (eventId: string, optionId: string) => {
    const s = { ...gameState };
    const event = (RANDOM_EVENTS as any[]).find((ev) => ev.id === eventId);
    if (!event || !event.options) return;
    const opt = event.options.find((o: any) => o.id === optionId);
    if (!opt) return;

    if (opt.outcomes && opt.outcomes.length > 0) {
      const rand = Math.random() * 100;
      let sum = 0;
      let selectedOutcome = opt.outcomes[0];

      for (const o of opt.outcomes) {
        sum += o.weight;
        if (rand < sum) {
          selectedOutcome = o;
          break;
        }
      }

      applyEffects(s, selectedOutcome.effects);

      const parts = [];
      const e = selectedOutcome.effects as any;
      if (e.money) parts.push(`资金${e.money > 0 ? '+' : ''}${e.money}`);
      if (e.reputation) parts.push(`声望${e.reputation > 0 ? '+' : ''}${e.reputation}`);
      if (e.studentSatisfaction)
        parts.push(`满意度${e.studentSatisfaction > 0 ? '+' : ''}${e.studentSatisfaction}`);
      if (e.coachMorale) parts.push(`士气${e.coachMorale > 0 ? '+' : ''}${e.coachMorale}`);
      if (e.bossStress) parts.push(`压力${e.bossStress > 0 ? '+' : ''}${e.bossStress}`);
      if (e.potentialStudents)
        parts.push(`潜在生源${e.potentialStudents > 0 ? '+' : ''}${e.potentialStudents}`);

      const effectStr = parts.length > 0 ? `「${parts.join(' ')}」` : '';
      addLog(
        s,
        selectedOutcome.description + effectStr,
        (selectedOutcome.type as LogType) || 'info'
      );
    } else {
      applyEffects(s, opt.effects);
      addLog(s, opt.log, 'success');
    }

    s.currentEvent = null;
    checkGameOver(s);
    setGameState(s);
  };

  const simulateStudentGrowth = (s: GameState) => {
    let totalSatisfactionBonus = 0;

    s.students.forEach((student) => {
      let growth = student.talent * 0.001 + s.coachLevel * 0.05;

      const tags = student.tags || [];

      const getEffectValue = (tagName: string, key: string, defaultValue: number = 0) => {
        if (!tags.includes(tagName)) return defaultValue;
        const tag = TAGS.find((t) => t.name === tagName);
        return (tag?.effect as any)?.[key] || defaultValue;
      };

      let growthMultiplier = 1;
      if (tags.includes('卷王')) growthMultiplier *= getEffectValue('卷王', 'train', 1.2);
      if (tags.includes('天才')) growthMultiplier *= getEffectValue('天才', 'ability', 1.5);
      if (tags.includes('摸鱼')) growthMultiplier *= getEffectValue('摸鱼', 'train', 0.9);
      if (tags.includes('勤奋')) growthMultiplier *= getEffectValue('勤奋', 'ability', 1.1);
      if (tags.includes('迟钝')) growthMultiplier *= getEffectValue('迟钝', 'train', 0.8);

      growth *= growthMultiplier;

      if (tags.includes('卷王')) student.stress += 2;
      if (tags.includes('勤奋')) student.stress += 1;

      if (tags.includes('摸鱼')) student.stress = Math.max(0, student.stress - 1);
      if (tags.includes('迟钝')) student.stress = Math.max(0, student.stress - 2);
      if (tags.includes('活泼')) student.stress = Math.max(0, student.stress - 1);

      if (tags.includes('社牛')) totalSatisfactionBonus += 0.5;
      if (tags.includes('活泼')) totalSatisfactionBonus += 0.8;

      if (tags.includes('玻璃心')) {
        if (student.stress > 60) {
          growth *= 0.5;
          const sickChanceMult = getEffectValue('玻璃心', 'sickChance', 1.5);
          if (Math.random() < 0.05 * sickChanceMult) {
            addLog(
              s,
              `学生 ${student.name} (玻璃心) 因为压力过大生病了，能力略微下降。`,
              'warning'
            );
            student.ability = Math.max(0, student.ability - 1);
          }
        }
      }

      student.ability += growth;

      if (student.ability > 100) student.ability = 100;

      student.stress = Math.max(0, student.stress - s.facilityLevel * 0.5);
    });

    if (totalSatisfactionBonus > 0) {
      s.studentSatisfaction = Math.min(100, s.studentSatisfaction + totalSatisfactionBonus);
    }
  };

  const simulateWeekEconomy = (s: GameState) => {
    const tuition = s.students.reduce((sum, st) => sum + calculateTuition(st), 0);
    let cost = s.fixedCost;

    if (s.coachMorale < 50) {
      cost += 2000;
    }
    if (s.bossStress > 80) {
      s.reputation -= 1;
    }

    const netIncome = tuition - cost;
    s.cash += netIncome;

    addLog(
      s,
      `本周财务：学费 +¥${tuition.toLocaleString()}，房租 -¥${cost.toLocaleString()}。净收支：${netIncome >= 0 ? '+' : ''}¥${netIncome.toLocaleString()}`,
      netIncome >= 0 ? 'success' : 'warning'
    );

    const triggerChance = s.potentialStudents > 10 ? 0.5 : 0.25;
    if (s.potentialStudents > 0 && Math.random() < triggerChance) {
      const gained = Math.round(
        Math.random() * (s.potentialStudents / 2) + s.potentialStudents / 3
      );

      const availableSpace = Math.max(0, s.maxStudents - s.students.length);
      const realGained = Math.min(gained, availableSpace);

      if (realGained > 0) {
        for (let i = 0; i < realGained; i++) {
          s.students.push(
            generateStudent(
              `auto-${s.totalWeeks}-${i}`,
              'BEGINNER',
              undefined,
              undefined,
              s.province
            )
          );
        }
        addLog(s, `由于前期运营，本周新增 ${realGained} 名在读学生。`, 'success');
      }

      if (gained > realGained) {
        addLog(s, `场地已满，${gained - realGained} 名慕名而来的学生因无法报名而离开。`, 'warning');
      }

      s.potentialStudents = Math.max(0, s.potentialStudents - gained);
    }

    let churnBase = 0;
    if (s.studentSatisfaction < 50) churnBase += 0.03;
    if (s.reputation < 40) churnBase += 0.02;
    if (s.bossStress > 90) churnBase += 0.01;
    if (churnBase > 0 && s.students.length > 0) {
      const lost = Math.round(s.students.length * churnBase * Math.random());
      if (lost > 0) {
        s.students.splice(0, lost);
        addLog(s, `因为满意度不高，本周大约有 ${lost} 名学生悄悄退费或跑路。`, 'danger');
      }
    }

    if (s.cash < 0) {
      addLog(s, '你的账户进入赤字，银行开始提醒你注意现金流。', 'danger');
    }
  };

  const simulateContestIfAny = (s: GameState) => {
    const event = CALENDAR_EVENTS[s.week];
    if (!event || event.type !== 'CONTEST') return;

    const name = event.name;

    const topStudents = [...s.students].sort((a, b) => b.ability - a.ability).slice(0, 5);

    let score = 0;

    if (topStudents.length === 0) {
      score = 0;
    } else {
      let teamAbilitySum = 0;
      let stabilityBonus = 0;
      let luckBonus = 0;
      let contestBonus = 0;

      const getEffectValue = (
        tags: string[],
        tagName: string,
        key: string,
        defaultValue: number = 0
      ) => {
        if (!tags.includes(tagName)) return defaultValue;
        const tag = TAGS.find((t) => t.name === tagName);
        return (tag?.effect as any)?.[key] || defaultValue;
      };

      topStudents.forEach((st) => {
        teamAbilitySum += st.ability;
        const tags = st.tags || [];

        if (tags.includes('大心脏'))
          stabilityBonus += (getEffectValue(tags, '大心脏', 'stability', 1.2) - 1) * 25; // 1.2 -> +5
        if (tags.includes('领袖'))
          stabilityBonus += (getEffectValue(tags, '领袖', 'teamStability', 1.2) - 1) * 40; // 1.2 -> +8
        if (tags.includes('锦鲤'))
          luckBonus += (getEffectValue(tags, '锦鲤', 'luck', 1.5) - 1) * 20; // 1.5 -> +10
        if (tags.includes('手速怪'))
          contestBonus += (getEffectValue(tags, '手速怪', 'contest', 1.1) - 1) * 30; // 1.1 -> +3
        if (tags.includes('考霸'))
          contestBonus += (getEffectValue(tags, '考霸', 'contest', 1.2) - 1) * 25; // 1.2 -> +5

        if (tags.includes('偏科')) {
          const creativity = getEffectValue(tags, '偏科', 'creativity', 1.3);
          teamAbilitySum += (Math.random() - 0.5) * 15 * (creativity - 0.3); // High variance
        }
      });

      const avgAbility = teamAbilitySum / Math.max(1, topStudents.length);

      const coachScore = s.coachLevel * 10;
      const repScore = Math.min(100, s.reputation);

      let base = avgAbility * 0.6 + coachScore * 0.3 + repScore * 0.1;

      base += contestBonus;

      let noiseRange = 15;
      if (stabilityBonus > 0) noiseRange = Math.max(5, 15 - stabilityBonus);

      let noise = (Math.random() - 0.5) * noiseRange * 2; // -15 to +15

      if (Math.random() * 100 < luckBonus) {
        noise += 15;
        addLog(s, '锦鲤附体！比赛中运气爆棚！', 'success');
      }

      score = base + noise;
    }

    let medalType = '';
    if (score > 90) medalType = '整体发挥惊艳，冲上朋友圈热搜。';
    else if (score > 75) medalType = '成绩不错，家长圈口碑稳步提升。';
    else if (score > 60) medalType = '发挥中规中矩，尚有提升空间。';
    else medalType = '成绩略显拉胯，一些家长开始摇摆。';

    addLog(
      s,
      `本周是 ${name}，${medalType} (综合评分: ${score.toFixed(1)})`,
      score > 75 ? 'success' : 'danger'
    );

    if (score > 90) {
      applyEffects(s, { reputation: +6, potentialStudents: +15 });
    } else if (score > 75) {
      applyEffects(s, { reputation: +4, potentialStudents: +8 });
    } else if (score > 60) {
      applyEffects(s, { reputation: -1 });
    } else {
      applyEffects(s, { reputation: -4, studentSatisfaction: -5 });
    }
  };

  const checkGameOver = (s: GameState) => {
    if (s.status === 'GAME_OVER') return true;

    if (s.cash < 0) {
      s.status = 'GAME_OVER';
      s.gameOverReason = '资金链断裂';
      s.modalContent = {
        type: 'ALERT',
        title: '结局：资金链断裂',
        description: `在第 ${s.year} 年第 ${s.week} 周，你的机构因为现金流问题倒下。也许下次应该更保守一点，或者先当几年教练再开机构。`,
      };
      return true;
    }

    if (s.bossStress >= 100) {
      s.status = 'GAME_OVER';
      s.gameOverReason = '老板 AFO';
      s.modalContent = {
        type: 'ALERT',
        title: '结局：老板 AFO',
        description:
          '长期高压让你彻底崩溃，你选择转行做互联网大厂打工人。你发现，相比和家长沟通，写代码好像没那么难受。',
      };
      return true;
    }

    if (s.coachMorale <= 0) {
      s.status = 'GAME_OVER';
      s.gameOverReason = '团队解散';
      s.modalContent = {
        type: 'ALERT',
        title: '结局：团队解散',
        description: '教练团队士气低落，集体辞职。没有了老师，机构自然无法维持。',
      };
      return true;
    }

    if (s.studentSatisfaction <= 0) {
      s.status = 'GAME_OVER';
      s.gameOverReason = '口碑崩盘';
      s.modalContent = {
        type: 'ALERT',
        title: '结局：口碑崩盘',
        description: '学生和家长对机构彻底失望，纷纷退费离场。你的机构在骂声中倒闭。',
      };
      return true;
    }

    if (s.year > 3) {
      s.status = 'GAME_OVER';
      s.gameOverReason = '游戏通关';
      s.modalContent = {
        type: 'RESULT',
        title: '结局：平稳小而美',
        description: `经过 3 年经营，你的机构仍然在这个城市中存活。最终现金：¥ ${Math.round(s.cash).toLocaleString()} · 学生人数：${s.students.length} · 口碑：${Math.round(s.reputation)}/100`,
      };
      return true;
    }

    return false;
  };

  const processEndWeekLogic = (s: GameState) => {
    simulateStudentGrowth(s);
    simulateWeekEconomy(s);
    simulateContestIfAny(s);
    handleRandomEvent(s);

    if (!s.actedThisWeek) {
      s.bossStress += 2;
    } else {
      s.bossStress += 1;
    }

    s.week += 1;
    s.totalWeeks += 1;
    if (s.week > 48) {
      s.week = 1;
      s.year += 1;
      addLog(s, `新的赛季开始了，机构进入第 ${s.year} 赛季。`, 'success');
    }
    s.actedThisWeek = false;

    checkGameOver(s);

    s.statsHistory = [
      ...s.statsHistory,
      {
        week: s.totalWeeks,
        cash: s.cash,
        reputation: s.reputation,
      },
    ];

    const projectedTuition = s.students.reduce((sum, st) => sum + calculateTuition(st), 0);
    const projectedCost = s.fixedCost + (s.coachMorale < 50 ? 2000 : 0);

    if (s.cash + projectedTuition < projectedCost) {
      addNotification(s, '警告：预计下周资金将不足以支付房租！请尽快筹集资金！', 'error');
    } else if (s.cash < projectedCost) {
      addNotification(
        s,
        '提醒：当前现金不足以支付下周房租，请确保本周有足够的学费收入。',
        'warning'
      );
    }

    setGameState(s);
  };

  const endWeek = () => {
    if (gameState.status !== 'PLAYING') return;
    const s = { ...gameState };
    processEndWeekLogic(s);
  };

  const upgradeCoach = () => {
    let s = { ...gameState };
    const cost = COACH_UPGRADE_COSTS[s.coachLevel];

    if (!cost) {
      addNotification(s, '已达到最高等级！', 'warning');
      setGameState(s);
      return;
    }

    if (s.cash < cost) {
      addNotification(s, '资金不足！', 'error');
      setGameState(s);
      return;
    }

    s.cash -= cost;

    if (checkGameOver(s)) {
      setGameState(s);
      return;
    }

    s.coachLevel += 1;
    addLog(s, `教练等级提升至 Lv.${s.coachLevel}，花费 ¥${cost.toLocaleString()}`, 'success');
    addLog(s, `教练外出培训，本周跳过。`, 'warning');

    s.actedThisWeek = true;
    processEndWeekLogic(s);
  };

  const upgradeFacility = () => {
    let s = { ...gameState };
    const nextLevel = s.facilityLevel + 1;
    const config = FACILITY_CONFIG[nextLevel];

    if (!config) {
      addNotification(s, '已达到最高场地等级！', 'warning');
      setGameState(s);
      return;
    }

    if (s.cash < config.cost) {
      addNotification(s, '资金不足！', 'error');
      setGameState(s);
      return;
    }

    s.cash -= config.cost;

    if (checkGameOver(s)) {
      setGameState(s);
      return;
    }

    s.facilityLevel = nextLevel;
    s.maxStudents = config.maxStudents;
    const oldRent = FACILITY_CONFIG[s.facilityLevel - 1]?.rent || 0;
    s.fixedCost = s.fixedCost - oldRent + config.rent;

    addLog(
      s,
      `场地升级为 ${config.label}，容量提升至 ${config.maxStudents}人，房租增加。`,
      'success'
    );
    setGameState(s);
  };

  const recruitStudent = (students: Student[], cost: number) => {
    let s = { ...gameState };

    if (s.students.length + students.length > s.maxStudents) {
      addNotification(s, '场地容量不足，请先升级场地！', 'error');
      setGameState(s);
      return;
    }

    if (s.cash < cost) {
      addNotification(s, '资金不足！', 'error');
      setGameState(s);
      return;
    }

    s.cash -= cost;

    if (checkGameOver(s)) {
      setGameState(s);
      return;
    }

    s.students.push(...students);

    const names = students.map((st) => st.name).join('、');
    addLog(s, `成功招募了：${names}`, 'success');

    setGameState(s);
  };

  const dismissStudent = (studentId: string) => {
    const student = gameState.students.find((st) => st.id === studentId);
    if (!student) return;

    setGameState((prev) => ({
      ...prev,
      status: 'MODAL',
      modalContent: {
        type: 'CONFIRM',
        title: '劝退确认',
        description: `确定要劝退 ${student.name} 吗？\n这将降低学生满意度 (-10)，但能减轻你的压力 (-5)。`,
        options: [
          {
            label: '确定劝退',
            isDanger: true,
            action: () => {
              setGameState((current) => {
                let s = { ...current };
                if (!s.students.find((st) => st.id === studentId)) {
                  return { ...s, status: 'PLAYING', modalContent: null };
                }

                s.students = s.students.filter((st) => st.id !== studentId);
                s.studentSatisfaction = Math.max(0, s.studentSatisfaction - 10);
                s.bossStress = Math.max(0, s.bossStress - 10);

                addLog(s, `你劝退了 ${student.name}。满意度 -10，压力 -5。`, 'warning');
                s.status = 'PLAYING';
                s.modalContent = null;
                checkGameOver(s);
                return s;
              });
            },
          },
          {
            label: '再想想',
            action: () => {
              setGameState((prev) => ({
                ...prev,
                status: 'PLAYING',
                modalContent: null,
              }));
            },
          },
        ],
      },
    }));
  };

  const renameStudent = (studentId: string, newName: string) => {
    const s = { ...gameState };
    const student = s.students.find((st) => st.id === studentId);
    if (student) {
      student.name = newName;
      setGameState(s);
    }
  };

  return {
    gameState,
    setGameState,
    setupForm,
    setSetupForm,
    startGame,
    handleActionClick,
    endWeek,
    onEventOptionClick,
    recruitStudent,
    upgradeCoach,
    upgradeFacility,
    dismissStudent,
    renameStudent,
    removeNotification,
    handleChatEventComplete,
  };
};
