export type Phase = 'SETUP' | 'PLAYING' | 'MODAL' | 'GAME_OVER';
export type CityTier = 'TIER1' | 'PROVINCIAL' | 'REMOTE';

export interface StudentStats {
  algorithms: number; // 算法知识
  thinking: number;   // 思维能力
  coding: number;     // 代码实现
  math: number;       // 数学基础
}

export interface Student {
  id: string;
  name: string;
  gender: 'M' | 'F';
  tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  talent: number;
  stats: StudentStats;
  mood: number;
  stress: number; 
  traits: string[];
  cost: number; 
}

export interface GameState {
  phase: Phase;
  agencyName: string;
  bossName: string;
  city: CityTier;
  
  cash: number;
  reputation: number;
  totalMedals: number;
  coachLevel: number;

  coachMorale: number;
  bossStress: number;
  studentSatisfaction: number;
  
  potentialStudents: number;
  fixedCost: number;
  maxStudents: number;
  facilityLevel: number; 
  
  week: number; 
  actedThisWeek: boolean;
  currentEvent: RandomEvent | null;
  year: number;
  totalWeeks: number;

  students: Student[];
  
  history: LogEntry[];
  statsHistory: { week: number; cash: number; reputation: number }[];
  modalContent: ModalConfig | null;
  
  gameOverReason?: string;
  finalScore?: number;
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
}

export interface EventOption {
  id: string;
  label: string;
  effects: any;
  log: string;
}

export interface RandomEvent {
  id: string;
  title: string;
  text: string;
  minWeek: number;
  options: EventOption[];
}

export interface AgencyAction {
  id: string;
  name: string;
  desc: string;
  cost: number;
  effects: any;
}
