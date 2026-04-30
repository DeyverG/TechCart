import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Manejar importaciones de CSS si las hay
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    // Alias si son necesarios (ej. '^@/(.*)$': '<rootDir>/src/$1')
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      diagnostics: {
        ignoreCodes: [5107, 151001]
      }
    }],
  },
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
};

export default config;
