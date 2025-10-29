// export default {
//   preset: "ts-jest/presets/default-esm",
//   testEnvironment: "node",
//   extensionsToTreatAsEsm: [".ts"],
//   moduleNameMapper: {
//     "^(\\.{1,2}/.*)\\.js$": "$1"
//   },
//   transform: {
//     "^.+\\.ts$": [
//       "ts-jest",
//       {
//         useESM: true
//       }
//     ]
//   }
// };


export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { 
      useESM: true 
    }]
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
};
