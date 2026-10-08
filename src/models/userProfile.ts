import type { ImageSourcePropType } from 'react-native';

/** Immutable snapshot of the person shown on the profile screen. */
export type UserProfile = {
  readonly name: string;
  readonly email: string;
  readonly points: number;
  readonly verified: boolean;
  /** Profile picture. When missing the avatar shows the first letter of the name. */
  readonly photo?: ImageSourcePropType;
};

/** First letter of the name, used when no avatar picture is available. */
export function initialOf(profile: UserProfile): string {
  const trimmed = profile.name.trim();
  return trimmed.length === 0 ? '?' : trimmed[0].toUpperCase();
}
