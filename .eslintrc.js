module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'global-require': 'off', // Due to image source requires.
    'import/no-unresolved': 'off', // Due to named root paths in import.
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/no-multi-comp': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'operator-linebreak': 'off' // Due to ternaries
  },
  'globals': {
    'fetch': false
  }
}
