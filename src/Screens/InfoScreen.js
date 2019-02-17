// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

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
    const response = await fetch('http://aretsdagar.nordiskamuseet.se/api/v1/views/info');
    const json = await response.json();
    this.setState({ data: json, isLoading: false });
  };

  render () {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator />
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
              <Text style={styles.textBody}>
                {info.body}
              </Text>
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
    justifyContent: 'center'
  },
  image: {
    // flex: 1,
    // resizeMode: "cover",
    // height: 250,
    // width: null
  },
  loader: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#1d1d1d'
  },
  contentWrapper: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  headerTextStyle: {
    color: '#ffffff',
    fontSize: 22,
    marginBottom: 20
  },
  textBody: {
    color: '#ffffff'
  }
});
