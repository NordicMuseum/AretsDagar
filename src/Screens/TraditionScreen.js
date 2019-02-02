// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FormatDate } from '../Utils/helpers';

const { height } = Dimensions.get('window');

export default class Tradition extends Component {
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
    const id = this.props.navigation.getParam('id');

    this.fetchData(id);
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  fetchData = async (id) => {
    const response = await fetch('http://dev.aretsdagar.se/api/v1/views/tradition?nid='+id);
    const json = await response.json();
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
      const scrollEnabled = this.state.screenHeight > height;
      const tradition = this.state.data[0];
      const formattedDate = FormatDate(tradition.dates, null);
      const imageDir = 'http://aretsdagar.nordiskamuseet.se/sites/default/files/styles/top_image/public/';

      return (
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollview}
            scrollEnabled={scrollEnabled}
            onContentSizeChange={this.onContentSizeChange}
          >
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={{ uri: imageDir + tradition.bild }}
                defaultSource={require('AretsDagar/assets/default_top.jpg')}
              />
            </View>
            <View style={styles.contentWrapper}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{tradition.title}</Text>
                <View style={styles.details}>
                  <Text style={styles.text}>{formattedDate}</Text>
                  <Text style={{color: '#f2d49c'}}>{tradition.celebrations} FIRANDEN</Text>
                </View>
              </View>
              <View style={[{ flex: 2 }, styles.actionBar]}>
                <TouchableOpacity style={styles.tabItem}>
                  <Icon name="favorite" size={25}/>
                  <Text style={styles.tabTitle}>Fira</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                  <Icon name="place" size={25} />
                  <Text style={styles.tabTitle}>Visa var</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                  <Icon name="share" size={25} />
                  <Text style={styles.tabTitle}>Dela</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                  <Icon name="alarm" size={25} />
                  <Text style={styles.tabTitle}>Påminn</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>{tradition.intro}</Text>
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
    // alignContent:'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: 250,
    width: null
  },
  loader: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#1d1d1d'
  },
  contentWrapper: {
  },
  actionBar: {
    height: 60,
    borderTopWidth: 0.5,
    borderColor: '#333333',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabTitle: {
    fontSize: 11,
    color: '#fff',
    paddingTop: 4
  },
  title: {
    color: '#fff',
    fontSize: 22
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: '#fff'
  }
})
