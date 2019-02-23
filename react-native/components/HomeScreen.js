import React, { Component, Fragment } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { Button, Text, Image } from 'react-native-elements';

import { theme } from '../theme';

import Categories from './Categories';

class Title extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Text
        style={{
          fontFamily: theme.bodyFont,
          color: '#fff',
          fontSize: 20,
          padding: 20,
        }}
      >
        I want my BBTV 👩🏽‍🎤
      </Text>
    );
  }
}

export default class HomeScreen extends Component {
  async componentDidMount() {
    try {
      const response = await fetch(`${process.env.TMDB_BASE_AND_VERSION}/configuration${process.env.TMDB_API_KEY_PARAM}`)
      const json = await response.json()
      // console.log('TMDB LOG:', json)
      // TODO: set state with this config for images n stuff ^
    } catch (err) {
      console.warn(err)
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Title navigation={navigation} />,
      headerStyle: { backgroundColor: theme.backgroundColor },
      headerTintColor: '#fff',
      // title: `${navigation.getParam('selectionType', 'Unknown')}: ${navigation.getParam('selectionTitle', 'Category')}`,
      // headerTintColor: '#fff',
    };
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <Fragment>
          <View style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: 35,
          }}>
            <Image
              style={{ width: 125, height: 125 }}
              source={require('../assets/images/bread-glasses.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <Text style={{ fontFamily: theme.fancyFont, fontSize: 65, lineHeight: 65, padding: 30 }}>Let's find something to watch...</Text>
          <Categories navigate={navigate} />
        </Fragment>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

});