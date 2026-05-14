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
  // Configuración de salida de cobertura requerida para la integración con SonarCloud
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;
