/**
 * String constants for the app
 * Centralized strings for easier localization and updates
 */

export const Strings = {
  // Splash Screen
  splash: {
    tagline: 'Made with ❤️ by Expectant Parents Globally!',
    subTitle: 'Life Within , Care Around',
  },

  // Login Screen
  login: {
    welcome: 'Welcome to a\nBeautiful Journey',
    subtitle: 'Join our community of expectant mothers for expert-led prenatal care & support',
     socialProof: {
    prefix: 'Joined by ',
    highlight: '10k+',
    suffix: ' happy mothers',
  },
    googleButton: 'Continue with Google',
    termsPrefix: 'By continuing, you agree to our ',
    termsLink: 'Terms of Service.',
  },
  profile: {
    back: 'Back',
    titlePrefix: 'Personalize your ',
    titleHighlight: 'profile',

    nameLabel: 'Name',
    namePlaceholder: 'Enter your name',

    emailLabel: 'Email',
    emailPlaceholder: 'Enter your email',

    phoneLabel: 'WhatsApp Number *',
    phonePlaceholder: 'Enter your whatsapp number',

    verifyButton: 'Verify Detail',

    helperText:
      'Your details are secured and will not be shared by anyone',
  },

  // Common
  appName: 'Divine Motherhood',

  // Pregnancy Detail Screen
  pregnancyDetail: {
    back: 'Back',
    titlePrefix: 'Pregnancy ',
    titleHighlight: 'Details',
    subtitleLine1: 'Tell us a bit more about your journey to',
    subtitleLine2: 'personalize your experience',
    qFirstBaby: 'Is this your first baby?',
    yes: 'Yes',
    no: 'No',
    qLmpDate: 'What is your last period (LMP) date? ',
    datePlaceholder: 'mm/dd/yyyy',
    qComplications: 'Are you experiencing any complications? (Optional)',
    continueButton: 'Continue',
    helperText: 'Your details are secured and will not be shared by anyone',
    options: {
      gestationalDiabetes: 'Gestational Diabetes',
      highBloodPressure: 'High Blood Pressure',
      morningSickness: 'Morning Sickness',
      fatigue: 'Fatigue',
      anxiety: 'Anxiety',
    },
  },

  // Interest Screen
  interestScreen: {
    back: 'Back',
    titlePrefix: 'What are you ',
    titleHighlight: 'looking for?',
    subtitle: 'Select your interests to personalize your wellness journey. You can choose as many as you like.',
    continueButton: 'Go To Dashboard',
    helperText: 'Your details are secured and will not be shared by anyone',
    options: {
      nutrition: { title: 'Nutrition', subtitle: 'Healthy eating for two' },
      yoga: { title: 'Yoga', subtitle: 'Gentle prenatal flows' },
      mentalHealth: { title: 'Mental Health', subtitle: 'Mindfulness & support' },
      garbhaSanskar: { title: 'Garbha Sanskar', subtitle: 'A Holistic Approach to Postpartum' },
      birthPrep: { title: 'Birth Prep', subtitle: 'Ready for the big day' },
      postpartum: { title: 'Postpartum', subtitle: 'Healing after birth' },
    },
  },
};
