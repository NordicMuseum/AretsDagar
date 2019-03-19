// @flow

import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';
import PushNotification from 'react-native-push-notification';
import { Alert, PushNotificationIOS } from 'react-native';
import { registerDevice } from './ApiService';

const configure = () => {
  PushNotification.configure({
    onError: function(e) {
      Alert.alert(e)
    },

    onRegister: function(token) {
      Alert.alert("Registered !", JSON.stringify(token));
      // this.setState({ registerToken: token.token, gcmRegistered: true });

      if (Platform.OS === 'ios') {
        const platform = 'ios';
      }
      else {
        const platform = 'android';
      }
      const params = {
        token : token,
        type : platform,
        device_id : DeviceInfo.getDeviceId()
      };
      registerDevice(params);
    },

    onNotification: function(notification) {
      // process the notification
      // required on iOS only
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    popInitialNotification: true,
    requestPermissions: true,
  });
};



export {
 configure,
};
