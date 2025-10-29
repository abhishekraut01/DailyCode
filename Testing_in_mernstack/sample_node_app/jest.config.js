import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  preset:"ts-jest",
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};