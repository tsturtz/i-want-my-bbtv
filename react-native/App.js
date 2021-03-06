import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Font, AppLoading } from 'expo';

import { AppProvider } from './AppState';
import HomeScreen from './components/HomeScreen';
import SelectionScreen from './components/SelectionScreen';
import CategoryScreen from './components/CategoryScreen';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Selection: { screen: SelectionScreen },
  Category: { screen: CategoryScreen },
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  state = {
    fontLoaded: false,
  }
  async componentWillMount() {
    try {
      await Font.loadAsync({
        AbrilFatface: require('./assets/fonts/AbrilFatface-Regular.ttf'),
        JosefinSans: require('./assets/fonts/JosefinSans-Regular.ttf'),
      });
      this.setState({ fontLoaded: true });
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <AppProvider>
          <AppContainer />
        </AppProvider>
      );
    } else {
      return <AppLoading />
    }
  }
}
