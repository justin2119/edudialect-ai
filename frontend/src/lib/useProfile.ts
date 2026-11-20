import { useCallback, useState } from 'react';
import type { Profile } from '../types';
import { loadProfile, saveProfile } from './storage';

export function useProfile() {
  const [profile, setProfileState] = useState<Profile>(loadProfile);
  const setProfile = useCallback((next: Partial<Profile>) => {
    setProfileState((prev) => {
      const merged = { ...prev, ...next };
      saveProfile(merged);
      return merged;
    });
  }, []);
  return { profile, setProfile };
}
