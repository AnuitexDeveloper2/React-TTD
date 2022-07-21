module.exports = {
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "<rootDir>/tests/styleMock.js",
  },
  testEnvironment: "jsdom",
};
