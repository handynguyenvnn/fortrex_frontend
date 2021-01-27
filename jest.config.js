module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!**/node_modules/**',
    '!**/app/container/**',
    '!**/app/component/**',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
    '^@components(.*)$': ['app/components$1'],
    '^@containers(.*)$': ['app/containers$1'],
    '^@private-pages(.*)$': ['app/containers/PrivatePages$1'],
    '^@common-pages(.*)$': ['app/containers/CommonPages$1'],
    '^@public-pages(.*)$': ['app/containers/PublicPages$1'],
    '^@utils(.*)$': ['app/utils$1'],
    '@style-components(.*)$': ['app/elements/StyleComponents$1'],
    '@elements(.*)$': ['app/components/Elements$1'],
    '@complex-elements(.*)$': ['app/components/ComplexElements$1'],
    '@store(.*)$': ['app/store$1'],
    '@configs(.*)$': ['app/configs$1'],
    '@services(.*)$': ['app/services$1'],
  },
  setupFilesAfterEnv: [
    '<rootDir>/internals/testing/test-bundler.js',
    'react-testing-library/cleanup-after-each',
  ],
  setupFiles: ['raf/polyfill'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: [],
};
