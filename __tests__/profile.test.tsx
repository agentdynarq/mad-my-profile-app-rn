import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initialOf, type UserProfile } from '../src/models/userProfile';
import { ProfileScreen } from '../src/screens/ProfileScreen';
import { MAX_POINTS, award, reset } from '../src/state/profilePoints';

const testProfile: UserProfile = {
  name: 'RMS Hasitha Bandara',
  email: 'hasitha@dynarq.com',
  points: 0,
  verified: true,
};

const metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

async function renderScreen(profile: UserProfile = testProfile) {
  return await render(
    <SafeAreaProvider initialMetrics={metrics}>
      <ProfileScreen profile={profile} />
    </SafeAreaProvider>,
  );
}

describe('point rules', () => {
  it('award adds one point', () => {
    expect(award(testProfile)?.points).toBe(1);
  });

  it('award stops at the cap', () => {
    expect(award({ ...testProfile, points: MAX_POINTS })).toBeNull();
  });

  it('reset sends the counter back to zero', () => {
    expect(reset({ ...testProfile, points: 7 }).points).toBe(0);
  });

  it('initial falls back when the name is blank', () => {
    expect(initialOf(testProfile)).toBe('R');
    expect(initialOf({ ...testProfile, name: '  ' })).toBe('?');
  });
});

describe('ProfileScreen', () => {
  it('shows the profile details', async () => {
    await renderScreen();
    expect(screen.getByText('My Profile')).toBeTruthy();
    expect(screen.getByText('RMS Hasitha Bandara')).toBeTruthy();
    expect(screen.getByText('hasitha@dynarq.com')).toBeTruthy();
    expect(screen.getByLabelText('Points 0')).toBeTruthy();
    expect(screen.getByTestId('verified-badge')).toBeTruthy();
    expect(screen.queryByTestId('profile-photo')).toBeNull();
  });

  it('shows the profile photo when one is given', async () => {
    await renderScreen({ ...testProfile, photo: require('../assets/profile.jpg') });
    expect(screen.getByTestId('profile-photo')).toBeTruthy();
    expect(screen.queryByText('R')).toBeNull();
  });

  it('tapping the button raises the points', async () => {
    await renderScreen();
    await fireEvent.press(screen.getByTestId('award-button'));
    expect(screen.getByLabelText('Points 1')).toBeTruthy();
    await fireEvent.press(screen.getByTestId('award-button'));
    expect(screen.getByLabelText('Points 2')).toBeTruthy();
  });

  it('refresh action clears the points', async () => {
    await renderScreen();
    await fireEvent.press(screen.getByTestId('award-button'));
    await fireEvent.press(screen.getByTestId('reset-button'));
    expect(screen.getByLabelText('Points 0')).toBeTruthy();
  });

  it('shows a message at the cap and then hides it', async () => {
    jest.useFakeTimers();
    await renderScreen({ ...testProfile, points: MAX_POINTS });
    await fireEvent.press(screen.getByTestId('award-button'));
    expect(screen.getByText(`Points are capped at ${MAX_POINTS}`)).toBeTruthy();
    expect(screen.getByLabelText(`Points ${MAX_POINTS}`)).toBeTruthy();
    await act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText(`Points are capped at ${MAX_POINTS}`)).toBeNull();
    jest.useRealTimers();
  });
});
