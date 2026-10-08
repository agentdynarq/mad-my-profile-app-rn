# My Profile (React Native)

A single screen React Native app that shows a user profile: avatar with a
verified badge, name, email and a points counter. The floating action button
adds a point, the refresh action in the header clears the counter.

This is the React Native rebuild of the Flutter version at
[agentdynarq/mad-my-profile-app](https://github.com/agentdynarq/mad-my-profile-app).
Same screen, same rules, same tests, written in TypeScript on Expo.

Module: Mobile Application Development, NSBM.

## Screen

| Start | After 3 taps |
| --- | --- |
| ![Start](docs/screen-0.png) | ![After 3 taps](docs/screen-3.png) |

Black header with a centred title and a reset action, my profile photo with a
verified badge, a divider, then the Name, Email and Points rows. Points are capped at
999, and tapping past the cap shows a short message instead of silently doing
nothing.

## Layout of the code

| Path | Purpose |
| --- | --- |
| `App.tsx` | Entry component, safe area provider and the profile loaded at start |
| `assets/profile.jpg` | Profile photo shown in the avatar |
| `src/models/userProfile.ts` | Profile type and the initial letter helper |
| `src/state/profilePoints.ts` | Pure `award` and `reset` rules plus the `useProfilePoints` hook |
| `src/screens/ProfileScreen.tsx` | The screen: header, avatar, fields, toast, floating button |
| `src/components/ProfileAvatar.tsx` | Round photo avatar with ring and verified badge, falls back to the initial |
| `src/components/ProfileField.tsx` | One label plus value row, optional leading icon |
| `src/theme.ts` | Colours for the screen |
| `__tests__/profile.test.tsx` | Rule tests and screen tests |

The point rules are plain functions outside the hook, so they are tested
without rendering anything. This mirrors the `ValueNotifier` controller in the
Flutter version.

## Running it

Requires Node 20 or newer.

```bash
npm install
npm start
```

Then scan the QR code with Expo Go on Android or iOS, or press `a` for an
Android emulator, `w` for the browser.

## Checks

```bash
npm run typecheck
npm test
```

9 tests: 4 on the point rules (award, cap, reset, initial fallback) and 5 on
the screen (details render, the photo shows, the button raises the counter,
refresh clears it, the cap message shows and hides).

Verified on Expo SDK 57, React Native 0.86, React 19.2: `tsc` reports no
errors, all 9 tests pass, and `expo export` bundles for Android and web.
