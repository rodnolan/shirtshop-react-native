import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import HomeScreen from './components/HomeScreen';
import ConfigScreen from './components/ConfigScreen';
import ListScreen from './components/ListScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import CheckoutScreen from './components/CheckoutScreen';

export default class ShirtShop extends Component {

  renderScene(route, navigator) {
    if (route.name === 'Home') {
      return <HomeScreen navigator={navigator} />
    }
    if (route.name === 'List') {
      return <ListScreen navigator={navigator} />
    }
    if (route.name === 'Config') {
      return <ConfigScreen navigator={navigator} {...route.passProps} />
    }
    if (route.name === 'Confirmation') {
      return <ConfirmationScreen navigator={navigator} {...route.passProps} />
    }
    if (route.name === 'Checkout') {
      return <CheckoutScreen navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ name: 'Home' }}
        renderScene={this.renderScene}
      />
    )
  }
}

AppRegistry.registerComponent('shirtshop', () => ShirtShop);
