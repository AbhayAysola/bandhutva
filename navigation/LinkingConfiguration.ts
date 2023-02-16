/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

// TODO: Setup proper linking configuration
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          DisplayQR: {
            screens: {
              DisplayQRScreen: 'display',
            },
          },
          ScanQR: {
            screens: {
              ScanQRScreen: 'scan',
            },
          },
        },
      },
      "Sign In": 'signin',
      NotFound: '*',
    },
  },
};

export default linking;
