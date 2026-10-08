import { MaterialIcons } from '@expo/vector-icons';
import { Image, type ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

type Props = {
  initial: string;
  photo?: ImageSourcePropType;
  verified?: boolean;
  size?: number;
};

/** Round avatar on a white disc with a thin ring and a verified badge on the corner. Falls back to the initial without a photo. */
export function ProfileAvatar({ initial, photo, verified = true, size = 124 }: Props) {
  const inner = size - 28;

  return (
    <View style={[styles.disc, { width: size, height: size, borderRadius: size / 2 }]}>
      <View
        style={[styles.face, { width: inner, height: inner, borderRadius: inner / 2 }]}
        accessibilityRole="image"
        accessibilityLabel="Profile photo"
        testID="profile-avatar"
      >
        {photo ? (
          <Image source={photo} style={{ width: inner, height: inner, borderRadius: inner / 2 }} testID="profile-photo" />
        ) : (
          <Text style={[styles.initial, { fontSize: inner * 0.42 }]}>{initial}</Text>
        )}
      </View>
      {verified ? (
        <View style={styles.badge} testID="verified-badge">
          <MaterialIcons name="check" size={26} color={colors.verified} accessibilityLabel="Verified account" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  disc: {
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  face: {
    backgroundColor: colors.avatarFill,
    borderWidth: 1.5,
    borderColor: colors.avatarRing,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initial: {
    color: colors.ink,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    right: 8,
    bottom: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
