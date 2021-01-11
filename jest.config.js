module.exports = {
  rootDir: __dirname,
  collectCoverageFrom: ['packages/web/src/**/*.{js,ts,tsx}', '!**/*-test.{js,ts,tsx}'],
  projects: ['<rootDir>/packages/*/jest*config.js'],
  setupFilesAfterEnv: ['@wordpress/jest-console'],
};
