// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default class MapScreen extends Component {
  state = {
    data: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentWillMount() {
    const id = this.props.navigation.getParam('id');
    this.fetchData(id);
  }

  fetchData = async (id) => {
    const response = await fetch('http://aretsdagar.nordiskamuseet.se/api/v1/celebration/'+id);
    const json = await response.json();
    // type LatLng {
    //   latitude: Number,
    //   longitude: Number,
    // }
    this.setState({ data: json, isLoading: false });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <MapView
            initialRegion={{
              latitude : 62.00,
              longitude : 15.00,
              latitudeDelta : 13.00,
              longitudeDelta : 13.00
            }}
            style={ {flex:1 }}
          >
          {this.state.data.map(marker => (
            <MapView.Marker key={marker.id} coordinate={{latitude: parseInt(marker.latitude), longitude: parseInt(marker.longitude)}}>
            </MapView.Marker>
          ))}

          </MapView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d1d1d',
    flex: 1
  }
})
