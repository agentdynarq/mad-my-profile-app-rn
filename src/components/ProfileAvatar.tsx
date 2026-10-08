import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

type Props = {
  initial: string;
  verified?: boolean;
  size?: number;
};

/** Round avatar on a white disc with a thin ring and a verified badge on the corner. */
export function ProfileAvatar({ initial, verified = true, size = 124 }: Props) {
  const inner = size - 28;

  return (
    <View style={[styles.disc, { width: size, height: size, borderRadius: size / 2 }]}>
      <View
        style={[styles.face, { width: inner, height: inner, borderRadius: inner / 2 }]}
        accessibilityRole="image"
        accessibilityLabel={`Avatar ${initial}`}
      >
        <Text style={[styles.initial, { fontSize: inner * 0.42 }]}>{initial}</Text>
      </View>
      {verified ? (
        <View style={styles.badge} testID="verified-badge">
          <MaterialIcons name="check" size={34} color={colors.verified} accessibilityLabel="Verified account" />
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
  },
  initial: {
    color: colors.ink,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    right: 10,
    bottom: 14,
  },
});
