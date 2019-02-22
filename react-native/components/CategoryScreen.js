import React, { Component, Fragment } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator, Dimensions } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';

import { theme } from '../theme';

import Titles from './Titles';

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
        {`${navigation.getParam('selectionType', 'Unknown')}: ${navigation.getParam('selectionTitle', 'Category')}`}
      </Text>
    );
  }
}

export default class HomeScreen extends Component {
  state = {
    titles: null,
  }

  async componentWillMount() {
    try {
      const response = await fetch(`${process.env.BBTV_API_BASE_URL}/selections`)
      const json = await response.json()
      // console.log('BBTV LOG:', json)
      console.log('success: got selections')
      const titles = json.find((sel) => sel.selection === this.props.navigation.getParam('selectionValue', 'default_value')).options;
      this.setState({ titles })
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
    const { navigate, getParam } = this.props.navigation;
    const { titles } = this.state;

    if (titles) {
      return (
        <ScrollView style={styles.container}>
          <Fragment>
            <Text style={{ fontFamily: theme.fancyFont, fontSize: 50, lineHeight: 65, padding: 15 }}>
              Category view
            </Text>
            <Text style={{ fontFamily: theme.fancyFont, fontSize: 25, lineHeight: 30, paddingHorizontal: 15, paddingBottom: 20, color: theme.primaryColor }}>
              {getParam('selectionType')}: {getParam('selectionTitle')}
            </Text>
            <Titles navigate={navigate} titles={titles} />
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <Button
                titleStyle={{ fontFamily: theme.bodyFont, lineHeight: 20 }}
                buttonStyle={{ backgroundColor: '#2b2b2b', borderRadius: 0, height: 50, width: ((Dimensions.get('window').width / 2) - 30), marginHorizontal: 15, marginVertical: 30 }}
                title='Spin!'
                onPress={() => {
                  navigate('Selection', {
                    selectionValue: getParam('selectionValue'),
                    selectionTitle: getParam('selectionTitle'),
                    selectionType: getParam('selectionType'),
                  })
                }}
              />
            </View>
          </Fragment>
        </ScrollView>
      )
    } else {
      return (
        <View>
          <ActivityIndicator size="large" color={theme.primaryColor} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({

});