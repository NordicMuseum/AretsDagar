// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import Hyperlink from 'react-native-hyperlink';

export default class InfoScreen extends Component {
  state = {
    data: [],
    screenHeight: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  fetchData = async () => {
    const response = await fetch(Config.NM_API_URL + 'views/info');
    const json = await response.json();
    this.setState({ data: json, isLoading: false });
  };

  render () {
    // AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator color='#fff'/>
        </View>
      );
    }
    else {
      const info = this.state.data[0];
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEnabled={true}
            onContentSizeChange={this.onContentSizeChange}
          >
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={require('AretsDagar/assets/nmlogo.png')}
              />
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.headerTextStyle}>
                {info.title}
              </Text>
              <Hyperlink linkStyle={{ fontWeight: 'bold' }} linkDefault={true}>
                <Text style={styles.textBody}>
                  {info.body}
                </Text>
              </Hyperlink>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d1d1d',
    flex: 1
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15
  },
  image: {
  },
  loader: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#1d1d1d'
  },
  contentWrapper: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  headerTextStyle: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 20
  },
  textBody: {
    color: '#fff'
  }
});
