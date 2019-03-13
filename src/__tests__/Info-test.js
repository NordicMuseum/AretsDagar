// __tests__/User-test.js

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import InfoScreen from '../Screens/InfoScreen';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<InfoScreen />);
});
