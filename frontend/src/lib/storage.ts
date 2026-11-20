import type { HistoryItem, Profile } from '../types';

const ONBOARDING_KEY = 'edudialect_onboarding_done';
const PROFILE_KEY = 'edudialect_profile_v1';
const HISTORY_KEY = 'edudialect_history_v1';

export const defaultProfile: Profile = { language: 'tem', grade: 'seconde', subject: 'physique' };

export function isOnboardingDone(): boolean {
  return localStorage.getItem(ONBOARDING_KEY) === 'true';
}

export function markOnboardingDone(): void {
  localStorage.setItem(ONBOARDING_KEY, 'true');
}

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? { ...defaultProfile, ...(JSON.parse(raw) as Partial<Profile>) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(profile: Profile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
  } catch {
    return [];
  }
}

export function addHistory(item: HistoryItem): HistoryItem[] {
  const next = [item, ...loadHistory()].slice(0, 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
