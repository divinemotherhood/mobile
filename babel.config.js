module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        allowUndefined: false,
      },
    ],
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@design": "./src/design",
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@shared": "./src/shared",
        }
      }
    ]
  ]
};
