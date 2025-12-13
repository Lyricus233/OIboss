import { useState, useEffect } from 'react';
import { GameState, CityTier, LogEntry, Student } from '../types';
import { 
  COACH_UPGRADE_COSTS, 
  AGENCY_ACTIONS,
  RANDOM_EVENTS,
  NAMES,
  RECRUITMENT_CONFIG,
  TRAITS,
  FACILITY_CONFIG,
  WEEKLY_RENT
} from '../constants';

export const generateStudent = (id: string, tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' = 'BEGINNER', customName?: string, existingNames: Set<string> = new Set()): Student => {
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
  const talent = cfg.talentRange.min + Math.floor(Math.random() * (cfg.talentRange.max - cfg.talentRange.min));
  
  const trait = Math.random() < 0.3 ? [TRAITS[Math.floor(Math.random() * TRAITS.length)].name] : [];
  
  const ability = cfg.abilityRange.min + Math.floor(Math.random() * (cfg.abilityRange.max - cfg.abilityRange.min));

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
    traits: trait,
    cost: finalCost
  };
};

export const calculateTuition = (student: Student) => {
  let extraTuition = 300;
  if (student.tier === 'ADVANCED') extraTuition = 3000;
  else if (student.tier === 'INTERMEDIATE') extraTuition = 2000;
  return Math.floor(student.ability * 60) + extraTuition;
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'SETUP',
    bossName: '',
    agencyName: '',
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
    doneEvents: []
  });

  const [setupForm, setSetupForm] = useState({
    bossName: '飓风王金',
    agencyName: '萌猫信奥',
    city: 'PROVINCIAL' as CityTier,
    difficulty: 'normal' as 'easy' | 'normal' | 'hard',
  });

  useEffect(() => {
    (window as any).game = {
      state: gameState,
      setState: setGameState,
      addCash: (amount: number) => {
        setGameState(prev => ({ ...prev, cash: prev.cash + amount }));
        console.log(`[Cheat] Added ${amount} cash.`);
      },
      setReputation: (amount: number) => {
        setGameState(prev => ({ ...prev, reputation: amount }));
        console.log(`[Cheat] Set reputation to ${amount}.`);
      },
      setCoachLevel: (level: number) => {
        setGameState(prev => ({ ...prev, coachLevel: level }));
        console.log(`[Cheat] Set coach level to ${level}.`);
      }
    };
  }, [gameState]);

  const addLog = (state: GameState, message: string, type: LogEntry['type'] = 'info') => {
    state.history.push({
      id: Math.random().toString(),
      week: state.totalWeeks,
      message,
      type
    });
  };

  const addNotification = (state: GameState, message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    state.notifications = [...state.notifications, {
      id: Math.random().toString(),
      message,
      type
    }];
  };

  const removeNotification = (id: string) => {
    setGameState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(t => t.id !== id)
    }));
  };

  const startGame = () => {
    let cash = 0;
    let fixedCost = 0;
    let reputation = 0;
    let studentsCount = 5;

    if (setupForm.city === 'TIER1') {
      cash = 250000;
      fixedCost = WEEKLY_RENT.TIER1;
      reputation = 18;
    } else if (setupForm.city === 'PROVINCIAL') {
      cash = 180000;
      fixedCost = WEEKLY_RENT.PROVINCIAL;
      reputation = 15;
    } else {
      cash = 120000;
      fixedCost = WEEKLY_RENT.REMOTE;
      reputation = 12;
    }

    fixedCost += FACILITY_CONFIG[1].rent;

    let stress = 20;
    if (setupForm.difficulty === 'easy') {
      cash *= 1.6;
      fixedCost *= 0.8;
      stress = 10;
    } else if (setupForm.difficulty === 'hard') {
      cash *= 0.7;
      fixedCost *= 1.1;
      stress = 30;
    }

    const initialStudents: Student[] = [];
    for (let i = 0; i < studentsCount; i++) {
      initialStudents.push(generateStudent(`init-${i}`, 'BEGINNER'));
    }
    
    setGameState({
      ...gameState,
      status: 'PLAYING',
      bossName: setupForm.bossName,
      agencyName: setupForm.agencyName,
      city: setupForm.city,
      cash: cash,
      fixedCost: fixedCost,
      reputation: reputation,
      bossStress: stress,
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
      statsHistory: [{ week: 1, cash, reputation }],
      history: [{
        id: 'init', week: 1, type: 'success',
        message: `您好 ${setupForm.bossName}，${setupForm.agencyName} 正式开业！有五名学生慕名而来！`
      }]
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
         for(let i=0; i<effects.students; i++) {
           s.students.push(generateStudent(`evt-${s.totalWeeks}-${i}`, 'BEGINNER'));
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

  const handleActionClick = (actionId: string) => {
    if (gameState.status !== 'PLAYING' || gameState.actedThisWeek) return;

    const s = { ...gameState };
    const act = AGENCY_ACTIONS.find((a) => a.id === actionId);
    if (!act) return;

    if (act.cost < 0 && s.cash + act.cost < 0) {
      addNotification(s, "资金不足！", 'error');
      setGameState(s);
      return;
    }

    s.cash += act.cost;

    if (checkGameOver(s)) {
      setGameState(s);
      return;
    }

    applyEffects(s, act.effects);
    s.actedThisWeek = true;

    let prefix = "";
    if (act.id === "rest") prefix = "摸鱼了一天，";
    else if (act.id === "squeeze") prefix = "你选择了短期逐利，";
    else prefix = "你拍板决定，";

    addLog(s, prefix + act.name + "。", act.id === "squeeze" ? "warning" : "success");
    
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
        const count = s.doneEvents?.filter(id => id === 'parent_chat').length || 0;
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

    let effectText = "";
    if (result.reward) {
      const parts = [];
      if (result.reward.money) parts.push(`资金${result.reward.money > 0 ? '+' : ''}${result.reward.money}`);
      if (result.reward.reputation) parts.push(`声望${result.reward.reputation > 0 ? '+' : ''}${result.reward.reputation}`);
      if (result.reward.studentSatisfaction) parts.push(`满意度${result.reward.studentSatisfaction > 0 ? '+' : ''}${result.reward.studentSatisfaction}`);
      if (result.reward.bossStress) parts.push(`压力${result.reward.bossStress > 0 ? '+' : ''}${result.reward.bossStress}`);
      if (result.reward.coachMorale) parts.push(`士气${result.reward.coachMorale > 0 ? '+' : ''}${result.reward.coachMorale}`);
      
      if (parts.length > 0) {
        effectText = ` (${parts.join('，')})`;
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

    applyEffects(s, opt.effects);
    addLog(s, opt.log, "success");
    s.currentEvent = null;
    checkGameOver(s);
    setGameState(s);
  };

  const simulateWeekEconomy = (s: GameState) => {
    const tuition = s.students.reduce((sum, st) => sum + calculateTuition(st), 0);
    let cost = s.fixedCost;

    if (s.coachMorale < 50) {
      cost += 2000;
    }
    if (s.bossStress > 80) {
      s.reputation -= 0.5;
    }

    const netIncome = tuition - cost;
    s.cash += netIncome;

    addLog(s, `本周财务：学费 +¥${tuition.toLocaleString()}，房租 -¥${cost.toLocaleString()}。净收支：${netIncome >= 0 ? '+' : ''}¥${netIncome.toLocaleString()}`, netIncome >= 0 ? 'success' : 'warning');

    if (s.potentialStudents > 0) {
      const gained = Math.round(
        Math.random() * (s.potentialStudents / 2) + s.potentialStudents / 3
      );
      
      const availableSpace = Math.max(0, s.maxStudents - s.students.length);
      const realGained = Math.min(gained, availableSpace);

      if (realGained > 0) {
        for(let i=0; i<realGained; i++) {
           s.students.push(generateStudent(`auto-${s.totalWeeks}-${i}`, 'BEGINNER'));
        }
        addLog(s, `由于前期运营，本周新增 ${realGained} 名在读学生。`, "success");
      }

      if (gained > realGained) {
        addLog(s, `场地已满，${gained - realGained} 名慕名而来的学生因无法报名而离开。`, "warning");
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
        addLog(s, `因为满意度不高，本周大约有 ${lost} 名学生悄悄退费或跑路。`, "danger");
      }
    }

    if (s.cash < 0) {
      addLog(s, "你的账户进入赤字，银行开始提醒你注意现金流。", "danger");
    }
  };

  const simulateContestIfAny = (s: GameState) => {
    const phase = s.totalWeeks % 52;
    const interestingPhases = [10, 20, 30, 40];
    if (!interestingPhases.includes(phase)) return;

    let name = "";
    if (phase === 10) name = "CSP-S 系列测评";
    if (phase === 20) name = "NOIP 联赛";
    if (phase === 30) name = "省选";
    if (phase === 40) name = "NOI 决战";

    const strengthProxy = s.coachLevel * 20;
    const base = strengthProxy * 0.6 + s.reputation * 0.25 + s.studentSatisfaction * 0.15;
    const noise = (Math.random() - 0.5) * 20;
    const score = base + noise;

    let medalType = "";
    if (score > 90) medalType = "整体发挥惊艳，冲上朋友圈热搜。";
    else if (score > 75) medalType = "成绩不错，家长圈口碑稳步提升。";
    else if (score > 60) medalType = "发挥中规中矩，尚有提升空间。";
    else medalType = "成绩略显拉胯，一些家长开始摇摆。";

    addLog(s, `本周是 ${name}，${medalType}`, score > 75 ? "success" : "danger");

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
      s.gameOverReason = "资金链断裂";
      s.modalContent = {
        type: 'ALERT',
        title: '结局：资金链断裂',
        description: `在第 ${s.year} 年第 ${s.week} 周，你的机构因为现金流问题倒下。也许下次应该更保守一点，或者先当几年教练再开机构。`
      };
      return true;
    }

    if (s.bossStress >= 100) {
      s.status = 'GAME_OVER';
      s.gameOverReason = "老板 AFO";
      s.modalContent = {
        type: 'ALERT',
        title: '结局：老板 AFO',
        description: "长期高压让你彻底崩溃，你选择转行做互联网大厂打工人。你发现，相比和家长沟通，写代码好像没那么难受。"
      };
      return true;
    }

    if (s.coachMorale <= 0) {
      s.status = 'GAME_OVER';
      s.gameOverReason = "团队解散";
      s.modalContent = {
        type: 'ALERT',
        title: '结局：团队解散',
        description: "教练团队士气低落，集体辞职。没有了老师，机构自然无法维持。"
      };
      return true;
    }

    if (s.studentSatisfaction <= 0) {
      s.status = 'GAME_OVER';
      s.gameOverReason = "口碑崩盘";
      s.modalContent = {
        type: 'ALERT',
        title: '结局：口碑崩盘',
        description: "学生和家长对机构彻底失望，纷纷退费离场。你的机构在骂声中倒闭。"
      };
      return true;
    }
    
    if (s.year > 3) {
        s.status = 'GAME_OVER';
        s.gameOverReason = "游戏通关";
        s.modalContent = {
            type: 'RESULT',
            title: '结局：平稳小而美',
            description: `经过 3 年经营，你的机构仍然在这个城市中存活。最终现金：¥ ${Math.round(s.cash).toLocaleString()} · 学生人数：${s.students.length} · 口碑：${Math.round(s.reputation)}/100`
        };
        return true;
    }

    return false;
  };

  const processEndWeekLogic = (s: GameState) => {
    simulateWeekEconomy(s);
    simulateContestIfAny(s);
    handleRandomEvent(s);

    if (!s.actedThisWeek) {
      s.bossStress += 1;
    } else {
      s.bossStress += 0.5;
    }

    s.week += 1;
    s.totalWeeks += 1;
    if (s.week > 52) {
      s.week = 1;
      s.year += 1;
      addLog(s, `新的一年开始了，机构进入第 ${s.year} 年。`, "success");
    }
    s.actedThisWeek = false;

    checkGameOver(s);
    
    s.statsHistory = [...s.statsHistory, { 
      week: s.totalWeeks, 
      cash: s.cash, 
      reputation: s.reputation 
    }];

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
      addNotification(s, "已达到最高等级！", 'warning');
      setGameState(s);
      return;
    }

    if (s.cash < cost) {
      addNotification(s, "资金不足！", 'error');
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
    
    setGameState(s);
  };

  const upgradeFacility = () => {
    let s = { ...gameState };
    const nextLevel = s.facilityLevel + 1;
    const config = FACILITY_CONFIG[nextLevel];

    if (!config) {
      addNotification(s, "已达到最高场地等级！", 'warning');
      setGameState(s);
      return;
    }

    if (s.cash < config.cost) {
      addNotification(s, "资金不足！", 'error');
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

    addLog(s, `场地升级为 ${config.label}，容量提升至 ${config.maxStudents}人，房租增加。`, 'success');
    setGameState(s);
  };

  const recruitStudent = (students: Student[], cost: number) => {
    let s = { ...gameState };
    
    if (s.students.length + students.length > s.maxStudents) {
      addNotification(s, "场地容量不足，请先升级场地！", 'error');
      setGameState(s);
      return;
    }
    
    if (s.cash < cost) {
      addNotification(s, "资金不足！", 'error');
      setGameState(s);
      return;
    }
    
    s.cash -= cost;

    if (checkGameOver(s)) {
      setGameState(s);
      return;
    }

    s.students.push(...students);
    
    const names = students.map(st => st.name).join('、');
    addLog(s, `成功招募了：${names}`, 'success');
    
    setGameState(s);
  };

  const dismissStudent = (studentId: string) => {
    const student = gameState.students.find(st => st.id === studentId);
    if (!student) return;

    setGameState(prev => ({
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
              setGameState(current => {
                 let s = { ...current };
                 if (!s.students.find(st => st.id === studentId)) {
                     return { ...s, status: 'PLAYING', modalContent: null };
                 }
                 
                 s.students = s.students.filter(st => st.id !== studentId);
                 s.studentSatisfaction = Math.max(0, s.studentSatisfaction - 10);
                 s.bossStress = Math.max(0, s.bossStress - 10);
                 
                 addLog(s, `你劝退了 ${student.name}。满意度 -10，压力 -5。`, 'warning');
                 s.status = 'PLAYING';
                 s.modalContent = null;
                 checkGameOver(s);
                 return s;
              });
            }
          },
          {
            label: '再想想',
            action: () => {
              setGameState(prev => ({ ...prev, status: 'PLAYING', modalContent: null }));
            }
          }
        ]
      }
    }));
  };
  
  const renameStudent = (studentId: string, newName: string) => {
    const s = { ...gameState };
    const student = s.students.find(st => st.id === studentId);
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
    handleChatEventComplete
  };
};
