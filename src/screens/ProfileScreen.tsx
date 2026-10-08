import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProfileAvatar } from '../components/ProfileAvatar';
import { ProfileField } from '../components/ProfileField';
import { initialOf, type UserProfile } from '../models/userProfile';
import { MAX_POINTS, useProfilePoints } from '../state/profilePoints';
import { colors } from '../theme';

const TOAST_MS = 2500;

type Props = {
  profile: UserProfile;
};

/** The single screen of the app: avatar, name, email and a points counter the button increases. */
export function ProfileScreen({ profile: initialProfile }: Props) {
  const insets = useSafeAreaInsets();
  const { profile, awardPoint, resetPoints } = useProfilePoints(initialProfile);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  function showToast(message: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), TOAST_MS);
  }

  function onAwardPressed() {
    if (!awardPoint()) showToast(`Points are capped at ${MAX_POINTS}`);
  }

  return (
    <View style={styles.root}>
      <View style={[styles.bar, { paddingTop: insets.top }]}>
        <View style={styles.barInner}>
          <View style={styles.barSide} />
          <Text style={styles.barTitle} accessibilityRole="header">
            My Profile
          </Text>
          <View style={[styles.barSide, styles.barSideRight]}>
            <Pressable
              onPress={resetPoints}
              accessibilityRole="button"
              accessibilityLabel="Reset points"
              testID="reset-button"
              hitSlop={8}
              style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
            >
              <MaterialIcons name="refresh" size={24} color={colors.onBar} />
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarWrap}>
          <ProfileAvatar initial={initialOf(profile)} photo={profile.photo} verified={profile.verified} />
        </View>
        <View style={styles.divider} />
        <ProfileField label="Name" value={profile.name} />
        <ProfileField label="Email" value={profile.email} icon="email" />
        <ProfileField label="Points" value={String(profile.points)} icon="star" />
      </ScrollView>

      {toast ? (
        <View style={[styles.toast, { bottom: insets.bottom + 96 }]} accessibilityLiveRegion="polite">
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      ) : null}

      <Pressable
        onPress={onAwardPressed}
        accessibilityRole="button"
        accessibilityLabel="Add a point"
        testID="award-button"
        style={({ pressed }) => [
          styles.fab,
          { bottom: insets.bottom + 24 },
          pressed && styles.fabPressed,
        ]}
      >
        <MaterialIcons name="add" size={26} color={colors.onFab} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  bar: {
    backgroundColor: colors.bar,
  },
  barInner: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  barSide: {
    width: 48,
  },
  barSideRight: {
    alignItems: 'flex-end',
  },
  barTitle: {
    flex: 1,
    textAlign: 'center',
    color: colors.onBar,
    fontSize: 18,
    fontWeight: '600',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.6,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 120,
  },
  avatarWrap: {
    alignItems: 'center',
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.divider,
    marginTop: 12,
    marginBottom: 8,
  },
  toast: {
    position: 'absolute',
    left: 24,
    right: 24,
    backgroundColor: colors.toast,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  toastText: {
    color: colors.onBar,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.fab,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  fabPressed: {
    transform: [{ scale: 0.94 }],
  },
});
