/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const tsConfig = require('./tsconfig.json');

const setupTestFile = path.resolve('setup-tests.tsx');
const config = require('@gpn-prototypes/frontend-configs/jest/jest.config');

module.exports = {
  ...config({ setupFilesAfterEnv: setupTestFile }),
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/types/'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.stories.tsx', '!**/*.d.ts'],
  coverageReporters: ['lcov', 'json-summary', 'text', 'text-summary'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsConfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
