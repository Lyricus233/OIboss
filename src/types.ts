export type Status = 'SETUP' | 'PLAYING' | 'MODAL' | 'GAME_OVER'; // 游戏状态
export type CityTier = 'TIER1' | 'PROVINCIAL' | 'REMOTE';
export type LogType = 'success' | 'warning' | 'danger' | 'info';

export interface Student {
  id: string;
  name: string;
  gender: 'M' | 'F';
  tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  talent: number;
  ability: number; // 综合能力 (0-100)
  mood: number;
  stress: number;
  tags: string[];
  cost: number;
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

  notifications: Notification[];
  doneEvents: string[];
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
