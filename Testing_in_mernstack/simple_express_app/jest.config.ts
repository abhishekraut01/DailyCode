const config = {
  verbose: true,
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      { useESM: true }
    ]
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },

  testPathIgnorePatterns: ["/dist/"]
};

export default config;
