import React, { Component, Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Overlay, Text } from 'react-native-elements';

import { theme } from '../theme';

import Categories from './Categories';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOverlayVisible: true,
    }
  }
  static navigationOptions = {
    title: 'I want my BBTV 👩🏽‍🎤',
    headerStyle: { backgroundColor: theme.backgroundColor },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' },
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Overlay
          overlayStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
          }}
          isVisible={this.state.isOverlayVisible}
          onBackdropPress={() => this.setState({ isOverlayVisible: false })}
        >
          <Fragment>
            <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}>What am I missing?</Text>
            <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 20 }}>Can you help me fill in missing stuff?</Text>
            <Button
              buttonStyle={{ width: 100, height: 50 }}
              title="Cool"
              onPress={() => {
                this.setState({ isOverlayVisible: false })
              }}
            />
          </Fragment>
        </Overlay>
        <Categories navigate={navigate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});