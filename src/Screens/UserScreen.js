// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Gs from '../Utils/styles';
import Loader from '../Components/Loader';

export default class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      reminders: [],
      celebrations: [],
      reload: null
    }
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.fetchData();
      },
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
    this.props.navigation.setParams({update: false});
  }

  _emptyText = (text) => {
    return(
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Inga {text}</Text>
      </View>
    );
  }

  fetchData = async () => {
    let reminders = [];
    let celebrations = [];
    try {
      await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            // Seperate celebrations from reminders and exclude cache.
            let item = store[i][0].split(':');
            if (item[1].length) {
              let type = item[0];
              if (type === 'reminder') {
                let reminder = JSON.parse(store[i][1]);
                reminders.push(reminder);
              }
              else if (type === 'celebration') {
                let celebration = JSON.parse(store[i][1]);
                celebrations.push(celebration);
              }
            }
          });
          // Add row because Flatlist renders empty text if only one item.
          if (reminders.length === 1) {
            reminders.push({nid: '0'});
          }
          if (celebrations.length === 1) {
            celebrations.push({nid: '0'});
          }
        });
      });
    } catch (error) {
      alert(error.message);
    }
    this.setState({ celebrations: celebrations, reminders: reminders, isLoading: false });
  };

  deleteReminder = async (nid) => {
    try {
      await AsyncStorage.removeItem('reminder:' + nid).then(() => {
        const filteredData = this.state.reminders.filter(item => item.nid !== nid);
        this.setState({ reminders: filteredData });
        this.props.navigation.setParams({update: false});
      });
    } catch (error) {
      alert(error.message);
    }
  }

  loadTradition(item) {
    this.props.navigation.navigate(
      'Tradition',
      {
        id: item.nid,
        title: item.title
      }
    );
  }

  render () {
    if (this.state.isLoading) {
      return (
        <Loader/>
      );
    }
    else {
      const { navigation } = this.props;
      const update = navigation.getParam('update', false);
      const reminders = this.state.reminders;
      return (
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionText}>Påminnelser</Text>
          </View>
          <FlatList
            data={reminders}
            renderItem={({item, index}) => (
              <View style={styles.row}>
                {(update === true && item.nid !== '0') ?
                <TouchableOpacity style={styles.tabItem} onPress={() => this.deleteReminder(item.nid)}>
                  <Text style={styles.rowText}>{item.title}</Text>
                  <Icon name="delete" size={25} style={styles.remove}/>
                </TouchableOpacity>
                : (item.nid !== '0') ?
                <TouchableOpacity style={styles.tabItem} onPress={() => this.loadTradition(item)}>
                  <Text style={styles.rowText}>{item.title}</Text>
                  <Icon name="navigate-next" size={30} style={Gs.next}/>
                </TouchableOpacity>
                : null}
              </View>
            )}
            keyExtractor={(item)=>item.nid}
            ItemSeparatorComponent={()=><View style={{height:0.5,backgroundColor:'#333333'}}/>}
            extraData={this.state}
            ListEmptyComponent={this._emptyText('påminnelser')}
          />
          <View style={styles.section}>
            <Text style={styles.sectionText}>Firanden</Text>
          </View>
          <FlatList
            data={this.state.celebrations}
            renderItem={({item, index}) => (
              <View style={styles.row}>
                <TouchableOpacity style={styles.tabItem} onPress={() => this.loadTradition(item)}>
                  <Text style={styles.rowText}>{item.title}</Text>
                  <Icon name="navigate-next" size={30} style={Gs.next}/>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item)=>item.nid}
            ItemSeparatorComponent={()=><View style={{height:0.5,backgroundColor:'#333333'}}/>}
            extraData={this.state}
            ListEmptyComponent={this._emptyText('firanden')}
          />
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
  row: {
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  rowText: {
    color: '#fff'
  },
  section: {
    backgroundColor: '#222',
    borderBottomColor: '#5f5f5f',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  sectionText: {
    color: '#fff',
    fontSize: 18
  },
  remove: {
    color: '#7f7f7f'
  },
  empty: {
    alignItems: 'center',
    paddingTop: 10
  },
  emptyText: {
    color: '#7f7f7f'
  }
});
