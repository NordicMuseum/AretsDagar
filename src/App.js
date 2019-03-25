// @flow

import React from 'react';
import {
  Alert,
  Image,
  Linking,
  PushNotificationIOS,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DeepLinking from 'react-native-deep-linking';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CalendarScreen from './Screens/CalendarScreen';
import AlphabeticScreen from './Screens/AlphabeticScreen';
import InfoScreen from './Screens/InfoScreen';
import UserScreen from './Screens/UserScreen';
import TraditionScreen from './Screens/TraditionScreen';
import MapScreen from './Screens/MapScreen';
import ImagesScreen from './Screens/ImagesScreen';

import HeaderTitle from './Components/HeaderTitle';
import BackButton from './Components/BackButton';

import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';
import PushNotification from 'react-native-push-notification';

import { RegisterDevice } from './Services/ApiService';

PushNotificationIOS.addEventListener('registrationError', (e) => { Alert.alert(JSON.stringify(e)) });

PushNotification.configure({
  onRegister: function(response) {
    let platform = 'ios';
    if (Platform.OS === 'android') {
      platform = 'android';
    }

    const params = {
      token: response.token,
      type: platform,
      device_id: DeviceInfo.getUniqueID()
    };
    RegisterDevice(params);
  },

  onNotification: function(notification) {
    // process the notification
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  senderID: Config.GCM_ID,

  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  popInitialNotification: true,
  requestPermissions: true,
});

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  // Handle deep linking.
  componentDidMount () {
    this.addRoutesToDeepLinking()
    Linking.addEventListener('url', this.handleUrl)
  }

  handleUrl ({ url }) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url)
      }
    })
  }

  addRoutesToDeepLinking () {
    DeepLinking.addScheme('aretsdagar://');

    DeepLinking.addRoute('/hogtid/:id', (response) => {
      this.props.navigation.navigate(
        'Tradition',
        {
          id: response.id,
          title: response.id
        }
      );
    });
  }

  componentWillUnmount () {
    Linking.removeEventListener('url', this.handleUrl)
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={baseStyles}>
        <StatusBar
          barStyle="light-content"
        />
        <CalendarScreen navigation={navigation} />
      </SafeAreaView>
    );
  }
}

class Alphabetic extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={baseStyles}>
        <AlphabeticScreen navigation={navigation} />
      </SafeAreaView>
    );
  }
}

class Info extends React.Component {
  render() {
    return (
      <SafeAreaView style={baseStyles}>
        <InfoScreen />
      </SafeAreaView>
    );
  }
}

class User extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={baseStyles}>
        <UserScreen navigation={navigation} />
      </SafeAreaView>
    );
  }
}

class Tradition extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={baseStyles}>
        <TraditionScreen navigation={navigation} />
      </SafeAreaView>
    );
  }
}

class Map extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={baseStyles}>
        <MapScreen navigation={navigation} />
      </SafeAreaView>
    );
  }
}

class Images extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={baseStyles}>
        <ImagesScreen navigation={navigation} />
      </SafeAreaView>
    );
  }
}

const TraditionStack = createStackNavigator({
  Tradition: {
    screen: Tradition,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerTitle: (
        <HeaderTitle />
      ),
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.goBack(null)}
          style={backButton}>
          <Icon name="chevron-left" color={'#fff'} size={30} />
          <Text style={backButtonText}>Tillbaka</Text>
        </TouchableOpacity>
      )
    }),
  },
  Map: {
    screen: Map,
    navigationOptions: ({ navigation }) => ({
      title: 'Map',
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerTitle: (
        <HeaderTitle />
      ),
      headerLeft: (
        <BackButton navigation={navigation} />
      )
    }),
  },
  Images: {
    screen: Images,
    navigationOptions: ({ navigation }) => ({
      title: 'Map',
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerTitle: (
        <HeaderTitle />
      ),
      headerLeft: (
        <BackButton navigation={navigation} />
      )
    }),
  }
}, { initialRouteName: 'Tradition' });

const UserStack = createStackNavigator({
  User: {
    screen: User,
    navigationOptions: ({ navigation }) => ({
      title: 'User',
      headerBackTitle: 'Tillbaka',
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerTitle: (
        <HeaderTitle />
      ),
      headerRight: (
        <View>
          {navigation.getParam('update') ?
            <TouchableOpacity onPress={() => navigation.setParams({ update: false })}>
              <Text style={changeButtonStyles}>Avbryt</Text>
            </TouchableOpacity> :
            <TouchableOpacity onPress={() => navigation.setParams({ update: true })}>
              <Text style={changeButtonStyles}>Ändra</Text>
            </TouchableOpacity>}
        </View>
      )
    }),
  },
  Tradition: {
    screen: TraditionStack,
    navigationOptions: () => ({
      header: null,
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
    }),
  }
}, { initialRouteName: 'User' });

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
        <HeaderTitle />
      ),
    }),
  },
});

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
        <HeaderTitle />
      ),
    }),
  },
  Tradition: {
    screen: TraditionStack,
    navigationOptions: () => ({
      header: null,
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
    }),
  }
}, { initialRouteName: 'Calendar' });

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
        <HeaderTitle />
      ),
    }),
  },
  Tradition: {
    screen: TraditionStack,
    navigationOptions: () => ({
      header: null,
      headerStyle: {
        backgroundColor: '#111',
        borderBottomWidth: 0
      },
    }),
  }
}, { initialRouteName: 'Alphabetic' });

const RouteConfigs = {
  Calendar: {
    screen: CalendarStack,
    navigationOptions: () => ({
      tabBarLabel: 'Dagar',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="date-range" color={tintColor} size={24} />
      )
    }),
  },
  Alphabetic: {
    screen: AlphabeticStack,
    navigationOptions: () => ({
      tabBarLabel: 'Lista A–Ö',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="view-list" color={tintColor} size={24} />
      )
    }),
  },
  User: {
    screen: UserStack,
    navigationOptions: () => ({
      tabBarLabel: 'Mina dagar',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="person" color={tintColor} size={24} />
      )
    }),
  },
  Info: {
    screen: InfoStack,
    navigationOptions: () => ({
      tabBarLabel: 'Info',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="info" color={tintColor} size={24} />
      )
    }),
  },
};

const TabNavigatorConfig = {
  initialRouteName: 'Calendar',
  swipeEnabled: false,
  lazy: true,
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
};

const backButton = {
  flex: 1,
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center'
};

const backButtonText = {
  color: '#fff'
};

const changeButtonStyles = {
  color: '#fff',
  marginRight: 20
};

const TabsView = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default createAppContainer(TabsView);
