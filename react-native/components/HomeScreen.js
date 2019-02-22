import React, { Component, Fragment } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { Button, Overlay, Text, Image } from 'react-native-elements';

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
  constructor(props) {
    super(props)
    this.state = {
      isOverlayVisible: true,
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch(`${process.env.TMDB_BASE_AND_VERSION}/configuration${process.env.TMDB_API_KEY_PARAM}`)
      const json = await response.json()
      // console.log('TMDB LOG:', json)
      // set state with this config ^
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
                titleStyle={{ fontFamily: theme.bodyFont, lineHeight: 20 }}
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
  }
}

const styles = StyleSheet.create({

});