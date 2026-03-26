export const handleOnboardingNavigation = (
  onboardingStep: number | boolean,
  navigation: any,
) => {
  if (onboardingStep === true) {
    navigation.replace('Main');
    return;
  }

  const stepToScreen: Record<number, string> = {
    1: 'Profile',
    2: 'PregnancyDetail',
    3: 'InterestScreen',
    4: 'ProgramPricing',
  };

  const screen = stepToScreen[onboardingStep as number];
  if (screen) {
    navigation.replace(screen);
  }
};
