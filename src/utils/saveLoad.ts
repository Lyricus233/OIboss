import { GameState } from '../types';

export const exportGameState = (state: GameState): string => {
  try {
    const jsonString = JSON.stringify(state);
    return btoa(encodeURIComponent(jsonString));
  } catch (err) {
    console.error('Export failed:', err);
    return '';
  }
};

export const importGameState = (data: string): GameState | null => {
  try {
    const jsonString = decodeURIComponent(atob(data));
    const parsed = JSON.parse(jsonString);

    if (
      !parsed ||
      typeof parsed !== 'object' ||
      !parsed.students ||
      !Array.isArray(parsed.students)
    ) {
      throw new Error('Invalid save data format');
    }

    return parsed as GameState;
  } catch (err) {
    console.error('Import failed:', err);
    return null;
  }
};
