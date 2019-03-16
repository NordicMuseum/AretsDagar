// @flow


import React, { Component } from 'react';
import {
  AsyncStorage, Platform, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import Config from 'react-native-config';
import { FormatCoords } from '../Utils/helpers';

export default class Celebration extends Component {
  state = {
    nid: null,
    title: null,
    status: 'inactive',
    textColor: '#fff',
    iconColor: '#5f5f5f',
    latitude: null,
    longitude: null
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { nid } = this.props.tradition;
    this.setState({
      nid,
      title: this.props.tradition.title,
    });
    this.setStatus(nid);
  }

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios' ||
        (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    }

    return false;
  }

  setStatus = async (nid) => {
    try {
      await AsyncStorage.getItem(`celebration:${nid}`).then((status) => {
        if (status !== null) {
          if (Object.keys(status).length !== 0) {
            this.setState({
              status: 'active',
              textColor: '#f2d49c',
              iconColor: '#f2d49c'
            });
          }
        }
      });
    } catch (error) {
      alert(error.message);
    }
  };

  // Get users (device) current coordinates.
  getPosition = async () => {
    const hasLocationPermission = await this.hasLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          const coords = FormatCoords(position.coords);
          this.setState({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }

  setCelebration = async () => {
    // Users position.
    this.getPosition();

    const { status } = this.state;
    const { nid } = this.state;
    const { title } = this.state;

    if (status === 'inactive') {
      const celebration = {
        nid,
        title,
        time: Math.floor(Date.now() / 1000),
      };

      // Store celebration in backend to be displayed on map.
      try {
        const url = `${Config.NM_API_URL}celebration`;
        const params = {
          nid,
          latitude: this.state.latitude,
          longitude: this.state.longitude
        };
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
        alert(error.message);
      }
      // Store celebration locally to be displayed on UserScreen.
      try {
        await AsyncStorage.setItem(`celebration:${nid}`, JSON.stringify(celebration)).then(() => {
          this.setState({
            status: 'active',
            textColor: '#f2d49c',
            iconColor: '#f2d49c'
          });
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  render() {
    const { status } = this.state;
    return (
      <TouchableOpacity style={styles.tabItem} onPress={this.setCelebration}>
        <Icon name="favorite" size={25} style={{ color: this.state.iconColor }} />
        <Text style={{
          color: this.state.textColor,
          fontSize: 11,
          marginTop: 4
        }}
        >
Fira
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
