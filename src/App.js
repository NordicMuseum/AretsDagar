// @flow

'use strict';

import React, {Component} from 'react';
import { Button, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CalendarScreen from './Screens/CalendarScreen';
import AlphabeticScreen from './Screens/AlphabeticScreen';
import InfoScreen from './Screens/InfoScreen';
import UserScreen from './Screens/UserScreen';
import TraditionScreen from './Screens/TraditionScreen';
import MapScreen from './Screens/MapScreen';
import ImagesScreen from './Screens/ImagesScreen';
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
      <View style={baseStyles}>
        <InfoScreen />
      </View>
    );
  }
}

class User extends React.Component {
  render() {
    return (
      <View style={baseStyles}>
        <UserScreen navigation={this.props.navigation}/>
      </View>
    );
  }
}

const UserStack = createStackNavigator({
  User: {
    screen: User,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: '#111',
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
});

const InfoStack = createStackNavigator({
  Info: {
    screen: Info,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: '#111',
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
});

class Tradition extends React.Component {
  render() {
    return (
      <TraditionScreen navigation={this.props.navigation} />
    );
  }
}

class Map extends React.Component {
  render() {
    return (
      <MapScreen navigation={this.props.navigation} />
    );
  }
}

class Images extends React.Component {
  render() {
    return (
      <ImagesScreen navigation={this.props.navigation} />
    );
  }
}


const TraditionStack = createStackNavigator({
  Tradition: {
    screen: Tradition,
  },
  Map: {
    screen: Map,
  },
  Images: {
    screen: Images,
  }
}, {mode: 'modal', initialRouteName: 'Tradition', headerMode: 'none'});

const CalendarStack = createStackNavigator({
  Calendar: {
    screen: Calendar,
    navigationOptions: () => ({
      title: 'Calendar',
      headerBackTitle: 'Tillbaka',
      headerStyle: {
        backgroundColor: '#111',
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
    screen: TraditionStack,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: '#111',
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
  }
}, {initialRouteName: 'Calendar', headerMode: 'screen'});

const AlphabeticStack = createStackNavigator({
  Alphabetic: {
    screen: Alphabetic,
    navigationOptions: () => ({
      title: 'Alphabetic',
      headerBackTitle: 'Tillbaka',
      headerStyle: {
        backgroundColor: '#111',
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
      headerStyle: {
        backgroundColor: '#111',
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
  User: {
    screen: UserStack,
    navigationOptions: () => ({
      tabBarLabel: 'Mina dagar',
      tabBarIcon: ({tintColor}) => (
        <Icon name="person" color={tintColor} size={24} />
      )
    }),
  },
  Info: {
    screen: InfoStack,
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
      backgroundColor: '#111',
    }
  },
};

const baseStyles = {
  backgroundColor: '#1d1d1d',
  flex: 1
}

const TabsView = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default createAppContainer(TabsView);
