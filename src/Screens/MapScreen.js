// @flow


import React, { Component } from 'react';
import {
  Image, StyleSheet, View
} from 'react-native';
import MapView from 'react-native-maps';
import Config from 'react-native-config';
import Loader from '../Components/Loader';

export default class MapScreen extends Component {
  state = {
    data: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    const id = this.props.navigation.getParam('id');
    this.fetchData(id);
  }

  fetchData = async (id) => {
    const response = await fetch(`${Config.NM_API_URL}celebration/${id}`);
    const json = await response.json();
    this.setState({ data: json, isLoading: false });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Loader />
      );
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 62.00,
            longitude: 15.00,
            latitudeDelta: 13.00,
            longitudeDelta: 13.00
          }}
          style={{ flex: 1 }}
        >
          {this.state.data.map(marker => (
            <MapView.Marker key={marker.id} coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}>
              <Image
                source={require('AretsDagar/assets/marker.png')}
                style={{ width: 18, height: 18 }}
              />
            </MapView.Marker>
          ))}

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d1d1d',
    flex: 1
  },
  close: {
    alignSelf: 'flex-end',
    color: '#fff'
  }
});
