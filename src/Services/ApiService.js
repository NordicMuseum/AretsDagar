// @flow


import React from 'react';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';

export function RegisterDevice(params) {
  request('push/register', params, 'POST');
}

export function SetPush(nid) {
  const params = {
    nid: nid,
    device_id: DeviceInfo.getUniqueID()
  }
  request('push', params, 'POST');
}

export function DeletePush(nid) {
  const params = {
    nid: nid,
    device_id: DeviceInfo.getUniqueID()
  }
  request('push/delete', params, 'POST');
}

function request(endpoint, params, method = 'GET') {
  // Register device to be able to receive notifications.
  try {
    const url = Config.NM_API_URL + endpoint;

    fetch(url, {
      method: method,
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
