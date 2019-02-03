import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './components/HomeScreen';
import CategoryScreen from './components/CategoryScreen';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Category: { screen: CategoryScreen },
});

const App = createAppContainer(MainNavigator);

export default App;