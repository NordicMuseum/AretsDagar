// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Accordion from '../Components/Accordion';
import ExternalLinks from '../Components/ExternalLinks';
import Instagram from '../Components/Instagram';
import Celebration from '../Components/Celebration';
import Reminder from '../Components/Reminder';
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
    const response = await fetch('http://aretsdagar.nordiskamuseet.se/api/v1/views/tradition?nid='+id);
    const json = await response.json();
    this.setState({ data: json, isLoading: false });
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
          // var shareTitle = 'Vad vet du om ' + tradition[0].title + '?';
          // var baseURL = 'http://aretsdagar.nordiskamuseet.se/';
          // var shareImage = baseURL + 'sites/default/files/styles/list_image/public/' + tradition[0].bild;
          // var share = require('lib/share');
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
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
      const tradition = this.state.data[0];
      const formattedDate = FormatDate(tradition.dates, null);
      const imageDir = 'http://aretsdagar.nordiskamuseet.se/sites/default/files/styles/top_image/public/';

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
                source={{ uri: imageDir + tradition.bild }}
                defaultSource={require('AretsDagar/assets/default_top.jpg')}
              />
            </View>
            <View style={styles.contentWrapper}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{tradition.title}</Text>
                <View style={styles.details}>
                  <Text style={styles.dateText}>Firas {formattedDate}</Text>
                  <View style={styles.celebRow}>
                    <Icon name="favorite" style={styles.celebIcon} size={16}/><Text style={styles.celebText}><Text style={{color: '#f2d49c'}}>{tradition.celebrations}</Text> FIRANDEN</Text>
                  </View>
                </View>
              </View>
              <View style={[{ flex: 2 }, styles.actionBar]}>
                <Celebration tradition={tradition.nid}/>
                <TouchableOpacity
                  style={styles.tabItem}
                  onPress={() => this.props.navigation.navigate('Map', {
                    id: tradition.nid
                  })}
                  >
                  <Icon name="place" size={25} style={styles.tabIcon}/>
                  <Text style={styles.tabTitle}>Visa var</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={this.onShare}>
                  <Icon name="share" size={25} style={styles.tabIcon}/>
                  <Text style={styles.tabTitle}>Dela</Text>
                </TouchableOpacity>
                <Reminder nid={tradition.nid} title={tradition.title}/>
              </View>
              <View style={styles.intro}>
                <Text style={styles.text}>{tradition.intro}</Text>
              </View>
            </View>
            <Accordion tradition={tradition}/>
            <ExternalLinks tradition={tradition}/>
            <Instagram insta_tag={tradition.insta_tag}/>
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
    paddingTop: 30,
    backgroundColor: '#1d1d1d'
  },
  contentWrapper: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  actionBar: {
    height: 60,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    marginTop: 10,
    paddingBottom: 5,
    paddingTop: 5
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
  tabIcon: {
    color: '#5f5f5f'
  },
  intro: {
    paddingTop: 20,
    paddingBottom: 20
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
  },
  dateText: {
    color: '#7f7f7f',
    fontSize: 13,
    fontWeight: 'bold'
  },
  celebRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  celebIcon: {
    color: '#5f5f5f',
    paddingRight: 5
  },
  celebText: {
    color: '#7f7f7f'
  }
})
