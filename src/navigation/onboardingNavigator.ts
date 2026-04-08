export const handleOnboardingNavigation = (
  onboardingStep: number | boolean,
  navigation: any,
  method: 'replace' | 'navigate' = 'navigate',
) => {
  if (onboardingStep === 4) {
    navigation.replace('Main');
    return;
  }

  const stepToScreen: Record<number, string> = {
    1: 'Profile',
    2: 'PregnancyDetail',
    3: 'InterestScreen',
    4: 'Main',
  };

  const screen = stepToScreen[onboardingStep as number];
  if (screen) {
    if (screen === 'Main') {
      navigation.replace(screen);
    } else {
      navigation[method](screen);
    }
  }
};
