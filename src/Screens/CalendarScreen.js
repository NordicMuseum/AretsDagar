// @flow


import React, { Component } from 'react';
import {
  AsyncStorage, Image, Text, View, StyleSheet, TouchableOpacity, FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from 'react-native-config';
import Ribbon from '../Components/Ribbon';
import { FormatDate, FormatIntro } from '../Utils/helpers';
import Gs from '../Utils/styles';
import Loader from '../Components/Loader';

export default class Calendar extends Component {
  state = {
    data: []
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    // Fetcing days from API backend.
    try {
      const response = await fetch(`${Config.NM_API_URL}views/traditions`);
      const json = await response.json();
      this.setState({ data: json, isLoading: false });
      // Cache result.
      AsyncStorage.setItem('calendar', JSON.stringify(json));
    } catch (error) {
      await AsyncStorage.getItem('calendar').then((cached) => {
        if (cached) {
          this.setState({ data: JSON.parse(cached), isLoading: false });
        }
      });
    }
  };

  loadTradition(item) {
    this.props.navigation.navigate(
      'Tradition',
      {
        id: item.nid,
        title: item.title
      }
    );
  }

  render() {
    const imageDir = 'http://aretsdagar.nordiskamuseet.se/sites/default/files/styles/list_image/public/';

    if (this.state.isLoading) {
      return (
        <Loader />
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.loadTradition(item)}
              style={styles.rowWrapper}
            >
              <View style={Gs.row}>
                <View style={{ overflow: 'hidden' }}>
                  <Image
                    source={{ uri: imageDir + item.bild }}
                    style={styles.thumbnail}
                    defaultSource={require('AretsDagar/assets/default_thumb.jpg')}
                  />
                  <Ribbon date={item.dates} />
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.rowText}>{item.title}</Text>
                  <Text style={Gs.date}>{FormatDate(item.dates, item.multiple_days)}</Text>
                  <Text style={styles.intro}>{FormatIntro(item.intro)}</Text>
                </View>
                <View style={Gs.nextWrapper}>
                  <Icon name="navigate-next" size={30} style={Gs.next} />
                </View>
              </View>
              <View style={Gs.celebRow}>
                <Icon name="favorite" style={Gs.celebIcon} size={18} />
                <Text style={styles.celebrations}>
                  <Text style={{ color: '#fff' }}>{item.celebrations}</Text>
                  {' '}FIRANDEN
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.nid}
          ItemSeparatorComponent={() => <View style={Gs.listSeparator} />}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  rowWrapper: {
    paddingLeft: 15,
    paddingVertical: 10
  },
  rowContent: {
    paddingHorizontal: 10,
    marginRight: 20,
    flex: -1
  },
  rowText: {
    color: '#fff',
    fontSize: 15,
  },
  intro: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5
  },
  thumbnail: {
    height: 85,
    width: 105
  },
  celebrations: {
    color: '#7f7f7f',
    fontSize: 13
  }
});
