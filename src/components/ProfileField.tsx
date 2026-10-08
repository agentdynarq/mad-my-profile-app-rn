import { MaterialIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

type Props = {
  label: string;
  value: string;
  icon?: IconName;
};

/** One labelled row of the profile: a bold caption above the value, with an optional leading icon. */
export function ProfileField({ label, value, icon }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}>
        {icon ? <MaterialIcons name={icon} size={18} color={colors.ink} style={styles.icon} /> : null}
        <Text style={styles.value} accessibilityLabel={`${label} ${value}`}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 6,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  value: {
    flex: 1,
    fontSize: 15,
    color: colors.inkSoft,
  },
});
