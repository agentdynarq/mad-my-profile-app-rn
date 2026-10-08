import { useCallback, useState } from 'react';

import type { UserProfile } from '../models/userProfile';

/** Points handed out per tap of the floating action button. */
export const POINTS_PER_AWARD = 1;

/** Upper bound so a long tapping session cannot run the counter away. */
export const MAX_POINTS = 999;

/**
 * Pure award rule. Returns the next profile, or null when the cap has
 * already been reached. Kept outside the hook so it can be tested on its own.
 */
export function award(profile: UserProfile): UserProfile | null {
  if (profile.points >= MAX_POINTS) return null;
  return { ...profile, points: Math.min(profile.points + POINTS_PER_AWARD, MAX_POINTS) };
}

/** Pure reset rule. Returns the same object when there is nothing to clear. */
export function reset(profile: UserProfile): UserProfile {
  return profile.points === 0 ? profile : { ...profile, points: 0 };
}

/**
 * Holds the profile in memory for the screen. `awardPoint` reports whether a
 * point was added so the screen can tell the user about the cap.
 */
export function useProfilePoints(initial: UserProfile) {
  const [profile, setProfile] = useState<UserProfile>(initial);

  const awardPoint = useCallback((): boolean => {
    const next = award(profile);
    if (next === null) return false;
    setProfile(next);
    return true;
  }, [profile]);

  const resetPoints = useCallback(() => {
    setProfile((current) => reset(current));
  }, []);

  return { profile, awardPoint, resetPoints, canAward: profile.points < MAX_POINTS };
}
