import React, { Component, Fragment } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { Button, Overlay, Text, Image } from 'react-native-elements';
import { Font, AppLoading } from 'expo';

import { theme } from '../theme';

import Categories from './Categories';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      isOverlayVisible: true,
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      AbrilFatface: require('../assets/fonts/AbrilFatface-Regular.ttf'),
      JosefinSans: require('../assets/fonts/JosefinSans-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  async componentDidMount() {
    try {
      const response = await fetch(`${process.env.TMDB_BASE_AND_VERSION}/configuration${process.env.TMDB_API_KEY_PARAM}`)
      const json = await response.json()
      console.log(json)
      // set state with this config ^
    } catch (err) {
      console.warn(err)
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'I want my BBTV 👩🏽‍🎤',
      headerStyle: { backgroundColor: theme.backgroundColor },
      headerTintColor: '#fff',
    };
  };

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.fontLoaded) {
      return (
        <ScrollView style={styles.container}>
          <Fragment>
            {/* <Overlay
              overlayStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 300,
              }}
              isVisible={this.state.isOverlayVisible}
              onBackdropPress={() => this.setState({ isOverlayVisible: false })}
            >
              <Fragment>
                <Text style={{ fontFamily: theme.fancyFont, fontSize: 30, textAlign: 'center', marginBottom: 20 }}>What am I missing?</Text>
                <Text style={{ fontFamily: theme.bodyFont, fontSize: 14, textAlign: 'center', marginBottom: 20 }}>Can you help me fill in missing stuff?</Text>
                <Button
                  buttonStyle={{ width: 100, height: 50 }}
                  title="Cool"
                  onPress={() => {
                    this.setState({ isOverlayVisible: false })
                  }}
                />
              </Fragment>
            </Overlay> */}
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
    } else {
      return <AppLoading />
    }
  }
}

const styles = StyleSheet.create({

});