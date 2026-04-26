module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
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
