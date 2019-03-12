// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from 'react-native-config';
import Loader from '../Components/Loader';
import Gs from '../Utils/styles';

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
    const response = await fetch(Config.NM_API_URL + 'celebration/'+id);
    const json = await response.json();
    this.setState({ data: json, isLoading: false });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Loader/>
      );
    }
    else {
      return (
        <View style={styles.container}>
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
            <MapView.Marker key={marker.id} coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}>
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d1d1d',
    flex: 1
  },
  loader: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#1d1d1d'
  },
  close: {
    alignSelf: 'flex-end',
    color: '#fff'
  }
})
