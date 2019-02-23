// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, Text, TextInput, View, SafeAreaView, StyleSheet, TouchableOpacity, TouchableHighlight, FlatList  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FormatDate } from '../Utils/helpers';

export default class Alphabetic extends Component {
  state = {
    data: [],
    searchInput: '',
    searchData: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
    this.arrayholder = [];
  }

  componentWillMount() {
    this.fetchData();
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

  fetchData = async () => {
    const response = await fetch('http://aretsdagar.nordiskamuseet.se/api/v1/views/traditions_alphabetic');
    const json = await response.json();
    this.setState({ data: json, searchData: json, isLoading: false });
    this.arrayholder = json;
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item){
      const itemData = item.title.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      searchData: newData,
      searchInput: text
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      );
    }
    else {
      let data = [];
      if (this.state.searchInput) {
        data = this.state.searchData.filter(item => item.title.includes(this.state.searchInput));
      }
      else {
        data = this.state.data;
      }
      return (
        <SafeAreaView style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Sök efter dag"
            onChangeText={(text) => this.SearchFilterFunction(text)}
            value={this.state.searchInput}
          />
          <View>
            <FlatList
              data={data}
              renderItem={({item, separators}) => (
                <TouchableHighlight
                  onPress={() => this.loadTradition(item)}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}>
                  <View style={styles.row}>
                    <View style={styles.rowStyle}>
                      <Text style={styles.rowTextStyle}>{item.title}</Text>
                      <View style={styles.celebRow}>
                        <Icon name="favorite" style={styles.icon} size={16}/><Text style={styles.rowText}>{FormatDate(item.dates, item.multiple_dates)}</Text>
                      </View>
                    </View>
                    <View style={styles.nextWrapper}>
                      <Icon name="navigate-next" size={30} style={styles.next}/>
                    </View>
                  </View>
                </TouchableHighlight>
              )}
              keyExtractor={(item)=>item.nid}
              ItemSeparatorComponent={()=><View style={{ height: 0.5, backgroundColor: '#333' }}/>}
            />
          </View>
        </SafeAreaView>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  loader: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#1d1d1d'
  },
  listWrapper: {
    alignItems: 'center',
    alignContent:'center',
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'center'
  },
  input: {
    textAlign: 'left',
    height: 35,
    borderWidth: 1,
    borderColor: '#5f5f5f',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowStyle: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  rowTextStyle: {
    color: '#fff',
    fontSize: 16,
  },
  rowText: {
    color: '#5f5f5f',
    fontSize: 12,
    fontWeight: 'bold'
  },
  celebRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  icon: {
    color: '#5f5f5f',
    paddingTop: 1,
    paddingRight: 5
  },
  nextWrapper: {
    position: 'absolute',
    right: 0
  },
  next: {
    color: '#5f5f5f'
  }
})
