import React, { Component, Fragment } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator, Dimensions } from 'react-native';
import { Button, Text, Icon, Overlay, Input, Divider } from 'react-native-elements';

import { theme } from '../theme';

import Titles from './Titles';

import debounce from 'lodash.debounce';

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
  constructor(props) {
    super(props);
    this.queryTMDb = debounce(this.queryTMDb, 1000);
  }

  state = {
    titles: null,
    isDeleteOverlayVisible: false,
    isAddOverlayVisible: false,
    removeOption: null,
    addOptions: [],
    deleteError: null,
  }

  async componentWillMount() {
    try {
      const response = await fetch(`${process.env.BBTV_API_BASE_URL}/selections/${this.props.navigation.getParam('selectionValue')}`)
      const json = await response.json()
      this.setState({ titles: json[0].options })
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

  handleDeletedSelected = (title) => {
    this.setState({ isDeleteOverlayVisible: true, removeOption: title })
  }
  handleAddSelected = async (title) => {
    const data = {
      selection: this.props.navigation.getParam('selectionValue'),
      option: title,
    }
    try {
      const response = await fetch(`${process.env.BBTV_API_BASE_URL}/selections/option`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      const json = await response.json()
      if (json.status) {
        this.setState({
          titles: json.payload.options,
          addOptions: [],
          isAddOverlayVisible: false,
        })
      } else {
        this.setState({
          addOptions: [],
          isAddOverlayVisible: true,
        })
      }
    } catch (err) {
      this.setState({
        addOptions: [],
        isAddOverlayVisible: true,
      })
      console.warn(err)
    }
  }

  queryTMDb = async (text) => {
    if (text.length === 0) this.setState({ addOptions: [] });

    if (this.props.navigation.getParam('selectionType') === 'TV') {
      const response = await fetch(`${process.env.TMDB_BASE_AND_VERSION}/search/tv${process.env.TMDB_API_KEY_PARAM}&query=${text}&page=1&language=en-US`)
      const json = await response.json()
      this.setState({ addOptions: json.results })
    } else if (this.props.navigation.getParam('selectionType') === 'Movie') {
      const response = await fetch(`${process.env.TMDB_BASE_AND_VERSION}/search/movie${process.env.TMDB_API_KEY_PARAM}&query=${text}&page=1&language=en-US&include_adult=false`)
      const json = await response.json()
      this.setState({ addOptions: json.results })
    }
  }

  render() {
    const { navigate, getParam } = this.props.navigation;
    const {
      titles,
      isDeleteOverlayVisible,
      isAddOverlayVisible,
      removeOption,
      addOptions,
      deleteError,
    } = this.state;

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
            <Input
              placeholder=' Add a title...'
              leftIcon={{ name: 'plus', type: 'material-community' }}
              onChangeText={(text) => {
                if (text.length > 0) {
                  this.queryTMDb(text)
                } else {
                  this.setState({ addOptions: [] })
                }
              }}
            />
            {addOptions.length > 0 &&
              <Fragment>
                <Titles navigate={navigate} titles={addOptions.map((opt) => opt.name)} handleTitleSelect={this.handleAddSelected} adding />
                <Text style={{ fontFamily: theme.bodyFont, fontSize: 15, lineHeight: 30, paddingHorizontal: 15, paddingBottom: 20, color: theme.primaryColor }}>
                  (Tap the titles above to add)
                </Text>
                <Divider />
              </Fragment>
            }
            <Titles navigate={navigate} titles={titles} handleTitleSelect={this.handleDeletedSelected} />
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <Button
                titleStyle={{ fontFamily: theme.bodyFont, lineHeight: 20 }}
                buttonStyle={{ backgroundColor: theme.primaryColor, borderRadius: 0, height: 50, width: ((Dimensions.get('window').width / 2) - 30), marginHorizontal: 15, marginVertical: 30 }}
                icon={<Icon name='loop' color='#ffffff' />}
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

          {/* ADD OVERLAY */}
          <Overlay
            overlayStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            height="auto"
            isVisible={isAddOverlayVisible}
            onBackdropPress={() => this.setState({ isAddOverlayVisible: false })}
          >
            <View style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{ fontFamily: theme.bodyFont, color: 'red', fontSize: 30, textAlign: 'center', marginVertical: 20 }}>
                There was an error adding
              </Text>
              <Button
                titleStyle={{ fontFamily: theme.bodyFont, lineHeight: 20 }}
                buttonStyle={{ backgroundColor: '#2b2b2b', borderRadius: 0, height: 50, width: ((Dimensions.get('window').width / 3)), marginVertical: 20 }}
                title="Okay"
                onPress={() => { this.setState({ isAddOverlayVisible: false }) }}
              />
            </View>
          </Overlay>

          {/* DELETE OVERLAY */}
          <Overlay
            overlayStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            height="auto"
            isVisible={isDeleteOverlayVisible}
            onBackdropPress={() => this.setState({ isDeleteOverlayVisible: false })}
          >
            <View style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {!deleteError &&
                <Fragment>
                  <Text style={{ fontFamily: theme.fancyFont, fontSize: 30, textAlign: 'center', marginVertical: 20 }}>
                    Delete {removeOption}?
                  </Text>
                  <Button
                    titleStyle={{ fontFamily: theme.bodyFont, lineHeight: 20 }}
                    buttonStyle={{ backgroundColor: '#2b2b2b', borderRadius: 0, height: 50, width: ((Dimensions.get('window').width / 3)), marginVertical: 20 }}
                    icon={<Icon name='close' type='material-community' color='#ffffff' />}
                    title=" Nah"
                    onPress={() => { this.setState({ isDeleteOverlayVisible: false, removeOption: null }) }}
                  />
                  <Button
                    titleStyle={{ fontFamily: theme.bodyFont, lineHeight: 20 }}
                    buttonStyle={{ backgroundColor: theme.primaryColor, borderRadius: 0, height: 50, width: ((Dimensions.get('window').width / 3)), marginVertical: 20 }}
                    icon={<Icon name='delete' type='material-community' color='#ffffff' />}
                    title=" Delete"
                    onPress={async () => {
                      const data = {
                        selection: getParam('selectionValue'),
                        option: removeOption,
                      }
                      console.log('delete request body ->', data)
                      try {
                        const response = await fetch(`${process.env.BBTV_API_BASE_URL}/selections/option`, {
                          method: 'DELETE',
                          headers: {'Content-Type': 'application/json'},
                          body: JSON.stringify(data)
                        })
                        const json = await response.json()
                        console.log('response from delete option ->', json)
                        if (json.status) {
                          this.setState({
                            isDeleteOverlayVisible: false,
                            titles: json.payload.options,
                          })
                        } else {
                          this.setState({ deleteError: true })
                        }
                      } catch (err) {
                        console.warn(err)
                        this.setState({ deleteError: true })
                      }
                    }}
                  />
                </Fragment>
              }
              {deleteError &&
                <Fragment>
                  <Text style={{ fontFamily: theme.bodyFont, color: 'red', fontSize: 30, textAlign: 'center', marginVertical: 20 }}>
                    There was an error deleting {removeOption}
                  </Text>
                  <Button
                    titleStyle={{ fontFamily: theme.bodyFont, lineHeight: 20 }}
                    buttonStyle={{ backgroundColor: '#2b2b2b', borderRadius: 0, height: 50, width: ((Dimensions.get('window').width / 3)), marginVertical: 20 }}
                    title="Okay"
                    onPress={() => { this.setState({ isDeleteOverlayVisible: false, removeOption: null, deleteError: null }) }}
                  />
                </Fragment>
              }
            </View>
          </Overlay>
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