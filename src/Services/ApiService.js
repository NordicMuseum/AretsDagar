// @flow


import React from 'react';
import { Alert } from 'react-native';
import Config from 'react-native-config';

export function RegisterDevice(params) {
  // Register device to be able to receive notifications.
  try {
    const url = `${Config.NM_API_URL}push/register`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    });
  } catch (error) {
    Alert.alert(error.message);
  }
}
