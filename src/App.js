// @flow

'use strict';

import React, {Component} from 'react';
import { Button, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CalendarScreen from './Screens/CalendarScreen';
import AlphabeticScreen from './Screens/AlphabeticScreen';
import { InfoScreen } from './Screens/InfoScreen';
import TraditionScreen from './Screens/TraditionScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Calendar extends React.Component {
  render() {
    return (
      <View style={baseStyles}>
        <CalendarScreen navigation={this.props.navigation} />
      </View>
    );
  }
}

class Alphabetic extends React.Component {
  render() {
    return (
      <View style={baseStyles}>
        <AlphabeticScreen navigation={this.props.navigation} />
      </View>
    );
  }
}

class Info extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <InfoScreen />
      </View>
    );
  }
}

class Reminders extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <InfoScreen />
      </View>
    );
  }
}

class Tradition extends React.Component {
  render() {
    return (
      <TraditionScreen navigation={this.props.navigation} />
    );
  }
}

const CalendarStack = createStackNavigator({
  Calendar: {
    screen: Calendar,
    navigationOptions: () => ({
      title: 'Calendar',
      headerBackTitle: 'Tillbaka',
      headerStyle: {
        backgroundColor: '#111111',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerTitle: (
        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Image
            source={require('AretsDagar/assets/logo.png')}
            style={{ width:100, height: 35, paddingBottom: 3 }}
          />
        </View>
      ),
    }),
  },
  Tradition: {
    screen: Tradition,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: '#111111',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
}, {initialRouteName: 'Calendar'});

const AlphabeticStack = createStackNavigator({
  Alphabetic: {
    screen: Alphabetic,
    navigationOptions: () => ({
      title: 'Alphabetic',
      headerBackTitle: 'Tillbaka',
      headerStyle: {
        backgroundColor: '#111111',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerTitle: (
        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Image
            source={require('AretsDagar/assets/logo.png')}
            style={{ width:100, height: 35, paddingBottom: 3 }}
          />
        </View>
      ),
    }),
  },
  Tradition: {
    screen: Tradition,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: '#111111',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
}, {initialRouteName: 'Alphabetic'});

const RouteConfigs = {
  Calendar: {
    screen: CalendarStack,
    navigationOptions: () => ({
      tabBarLabel: 'Dagar',
      tabBarIcon: ({tintColor}) => (
        <Icon name="date-range" color={tintColor} size={24} />
      )
    }),
  },
  Alphabetic: {
    screen: AlphabeticStack,
    navigationOptions: () => ({
      tabBarLabel: 'Lista A - Ö',
      tabBarIcon: ({tintColor}) => (
        <Icon name="view-list" color={tintColor} size={24} />
      )
    }),
  },
  Reminders: {
    screen: Reminders,
    navigationOptions: () => ({
      tabBarLabel: 'Påminnelser',
      tabBarIcon: ({tintColor}) => (
        <Icon name="alarm" color={tintColor} size={24} />
      )
    }),
  },
  Info: {
    screen: Info,
    navigationOptions: () => ({
      tabBarLabel: 'Info',
      tabBarIcon: ({tintColor}) => (
        <Icon name="info" color={tintColor} size={24} />
      )
    }),
  },
};

const TabNavigatorConfig = {
  initialRouteName: 'Calendar',
  swipeEnabled: false,
  lazy: true,
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: '#f2d49c',
    labelStyle: {
      fontSize: 12,
    },
    allowFontScaling: false,
    style: {
      backgroundColor: '#111111',
    }
  },
};

const baseStyles = {
  backgroundColor: '#1d1d1d',
  flex: 1
}

const TabsView = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default createAppContainer(TabsView);
