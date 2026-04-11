export type Status = 'SETUP' | 'PLAYING' | 'MODAL' | 'GAME_OVER'; // 游戏状态
export type CityTier = 'TIER1' | 'PROVINCIAL' | 'REMOTE';
export type LogType = 'success' | 'warning' | 'danger' | 'info';

export interface Student {
  id: string;
  name: string;
  tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  talent: number;
  ability: number; // 综合能力 (0-100)
  mood: number;
  stress: number;
  tags: string[];
  cost: number;
  lastContestStatus?: 'PASSED' | 'FAILED';
  lastContestName?: string;
  lastAdvancementContest?: string;
  lastAdvancementStatus?: 'PASSED' | 'FAILED';
  passedContests?: string[];
  isRecommended?: boolean;
}

export interface ContestProblem {
  id: string;
  label: string;
  difficulty: number;
  quality: number;
  stageName?: string;
}

export interface ContestStudentResult {
  studentId: string;
  studentName: string;
  tier: Student['tier'];
  contestGroup: 'BEGINNER' | 'INTERMEDIATE' | 'OPEN';
  problemScores: number[];
  totalScore: number;
  rank: number;
  passed?: boolean;
  award?: '一等奖' | '二等奖' | '三等奖' | '未奖';
  isRecommended?: boolean;
}

export interface ContestResult {
  contestId: string;
  contestName: string;
  week: number;
  problems: ContestProblem[];
  participants: ContestStudentResult[];
  totalPossibleScore: number;
  averageScore: number;
  cutoffScore?: number;
  groupCutoffScores?: Partial<Record<'BEGINNER' | 'INTERMEDIATE' | 'OPEN', number>>;
  groupAwardLines?: Partial<
    Record<'BEGINNER' | 'INTERMEDIATE' | 'OPEN', { first: number; second: number; third: number }>
  >;
  summary: string;
  effects: {
    reputation?: number;
    potentialStudents?: number;
    studentSatisfaction?: number;
  };
  logMessage?: string;
  logType?: 'success' | 'danger' | 'warning' | 'info';
  medalsWon?: number;
}

export interface GameState {
  status: Status;
  agencyName: string;
  bossName: string;
  city: CityTier;
  province: string;

  cash: number;
  reputation: number;
  totalMedals: number;
  coachLevel: number;

  coachMorale: number;
  bossStress: number;
  studentSatisfaction: number;
  usedRecommendationQuota?: number;

  potentialStudents: number;
  fixedCost: number;
  maxStudents: number;
  facilityLevel: number;

  week: number;
  actedThisWeek: boolean;
  currentEvent: RandomEvent | null;
  currentContestResult?: ContestResult | null;
  year: number;
  totalWeeks: number;

  students: Student[];

  history: LogEntry[];
  statsHistory: { week: number; cash: number; reputation: number }[];
  modalContent: ModalConfig | null;

  gameOverReason?: string;
  finalScore?: number;

  notifications: Notification[];
  doneEvents: string[];

  recentEvents?: { id: string; week: number }[]; // 冷却事件
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface LogEntry {
  id: string;
  week: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
}

export interface ModalConfig {
  type: 'EVENT' | 'RESULT' | 'ALERT' | 'CONFIRM';
  title: string;
  description: string;
  options?: {
    label: string;
    action: () => void;
    isDanger?: boolean;
  }[];
}

export interface CalendarEvent {
  week: number;
  name: string;
  type: 'CONTEST' | 'EVENT' | 'HOLIDAY';
  description: string;
  handler?: (state: GameState) => Partial<GameState>;
  stages?: {
    name: string;
    description?: string;
    problems?: {
      difficulty: number; // 1-10
      quality: number; // 1-10
    }[];
  }[];
}

export interface EventOption {
  id: string;
  label: string;
  effects: any;
  log: string;
}

export interface ChatScenario {
  id: string;
  title: string;
  openingMessage: string;
  systemPrompt: string;
}

export interface RandomEvent {
  id: string;
  title: string;
  text: string;
  minWeek: number;
  type?: 'STANDARD' | 'CHAT';
  unique?: boolean;
  options?: EventOption[]; // for STANDARD type
  chats?: ChatScenario[]; // for CHAT type
  activeChat?: ChatScenario;
}

export interface ActionOutcome {
  weight: number;
  description: string;
  effects: any;
  type?: 'success' | 'warning' | 'danger' | 'info';
}

export interface AgencyAction {
  id: string;
  name: string;
  desc: string;
  cost: number;
  outcomes?: ActionOutcome[];
  theme?: 'default' | 'danger' | 'primary' | 'success';
}
