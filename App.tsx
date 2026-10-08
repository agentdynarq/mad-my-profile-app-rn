import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { UserProfile } from './src/models/userProfile';
import { ProfileScreen } from './src/screens/ProfileScreen';

/** Profile of the signed in student. Kept in one place so the screen stays free of hard coded strings. */
export const CURRENT_USER: UserProfile = {
  name: 'RMS Hasitha Bandara',
  email: 'hasitha@dynarq.com',
  points: 0,
  verified: true,
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <ProfileScreen profile={CURRENT_USER} />
    </SafeAreaProvider>
  );
}
