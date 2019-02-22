import React, { Component, Fragment } from 'react';
import { StyleSheet, ScrollView, View, Animated, Easing, Dimensions, ActivityIndicator } from 'react-native';
import { Text, Button, ListItem, Card, Icon, Rating, Image, Overlay } from 'react-native-elements';

import { theme } from '../theme';
import { suggestSelectionText } from '../common/constants';

class Title extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Text
        style={{
          fontFamily: theme.bodyFont,
          color: '#fff',
          fontSize: 20,
        }}
      >
        {`${navigation.getParam('selectionType', 'Unknown')}: ${navigation.getParam('selectionTitle', 'Category')}`}
      </Text>
    );
  }
}

export default class SelectionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionsList: null,
      errorState: '',
      selectionValue: this.props.navigation.getParam('selectionValue', 'default_value'),
      selectionTitle: this.props.navigation.getParam('selectionTitle', 'Category'),
      selectionType: this.props.navigation.getParam('selectionType', 'Unknown'),
      selectedList: null,
      randomItem: null,
      selectedItemName: 'Not found',
      selectedItemImage: 'Not found',
      selectedItemOverview: 'Not found',
      selectedItemFirstAirDate: 'Not found',
      selectedItemVoteAverage: 0,
      showSpinner: true,
    };

    this.showSpinner = new Animated.Value(1)
    this.showItem = new Animated.Value(0)
    this.spinValue = new Animated.Value(0)
    this.selectorValue = new Animated.Value(0)
  }
  async componentWillMount() {
    try {
      const response = await fetch(`${process.env.BBTV_API_BASE_URL}/selections`)
      const json = await response.json()
      // console.log('BBTV LOG:', json)
      console.log('success: got selections')
      const selected = json.find((sel) => sel.selection === this.props.navigation.getParam('selectionValue', 'default_value')).options;
      const random = selected[Math.floor(Math.random() * selected.length)];
      this.setState({
        selectionsList: json,
        selectedList: selected,
        randomItem: random,
      }, () => {
        this.animate(random)
      })
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
    }
  }

  animate = (item) => {
    this.showSpinner.setValue(1)
    this.showItem.setValue(0)
    this.spinValue.setValue(0)
    this.selectorValue.setValue(0)

    // Start spinner and hide it on callback
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.bezier(0, .99, .44, .99),
        useNativeDriver: true,
      }
    ).start(() => {
      Animated.timing(
        this.showSpinner,
        {
          toValue: 0,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }
      ).start(() => {
        this.setState({ showSpinner: false })
        this.initSelected(item)
      })
    })

    this.animateSelector(1, 1)
  }

  animateSelector = (val, dur) => {
    if (dur > 500) {
      return;
    }
    Animated.timing(
      this.selectorValue,
      {
        toValue: val,
        duration: dur,
        easing: Easing.ease,
        useNativeDriver: true,
      }
    ).start(() => {
      if (dur < 300) {
        this.animateSelector(val === 0 ? 1 : 0, dur + (dur / 3))
      } else {
        setTimeout(() => {
          this.animateSelector(val === 0 ? 1 : 0, dur + (dur / 3))
        }, 200);
      }
    })
  }

  initSelected = async (item) => {
    try {
      if (this.state.selectionType === 'TV') {
        const response = await fetch(`${process.env.TMDB_BASE_AND_VERSION}/search/tv${process.env.TMDB_API_KEY_PARAM}&query=${item}&page=1&language=en-US`)
        const json = await response.json()
        this.setSelectedState(json)
      } else if (this.state.selectionType === 'Movie') {
        const response = await fetch(`${process.env.TMDB_BASE_AND_VERSION}/search/movie${process.env.TMDB_API_KEY_PARAM}&query=${item}&page=1&language=en-US&include_adult=false`)
        const json = await response.json()
        this.setSelectedState(json)
      }
    } catch (err) {
      console.warn(err)
    }
  }

  setSelectedState = (payload) => {
    if (payload && payload.results && payload.results[0]) {
      this.setState({
        selectedItemName: this.state.selectionType === 'TV' ? payload.results[0].name : payload.results[0].title,
        selectedItemImage: payload.results[0].backdrop_path,
        selectedItemOverview: payload.results[0].overview,
        selectedItemFirstAirDate: this.state.selectionType === 'TV' ? payload.results[0].first_air_date : payload.results[0].release_date,
        selectedItemVoteAverage: payload.results[0].vote_average,
      }, () => {
        Animated.timing(
          this.showItem,
          {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
          }
        ).start()
      })
    } else {
      this.setState({ errorState: 'There was a problem fetching the selected title.' })
    }
  }

  spinAgain = (previousRandomItem) => {
    let randomItem = previousRandomItem;
    if (this.state.selectedList.length > 1) {
      randomItem = this.state.selectedList.filter((item) => item !== previousRandomItem)[Math.floor(Math.random() * this.state.selectedList.length - 1)];
      this.setState({
        showSpinner: true,
        randomItem
      }, () => {
        this.animate(randomItem)
      })
    } else {
      this.setState({ errorState: 'There is only one option in this category.' })
    }
  }

  render() {
    const {
      errorState,
      selectionType,
      randomItem,
      selectedItemName,
      selectedItemImage,
      selectedItemOverview,
      selectedItemFirstAirDate,
      selectedItemVoteAverage,
      showSpinner,
      selectionsList,
    } = this.state;
    const {
      navigation,
      navigation: { navigate }
    } = this.props;

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', ['2520deg', '2580deg', '2640deg', '2700deg', '2760deg', '2820deg'][Math.floor(Math.random() * 6)]]
    })
    const flick = this.selectorValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '5deg']
    })

    return (
      <ScrollView
        ref={r => (this.scrollRef = r)}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        {/* image layers are 573 x 573 pixels */}
        {showSpinner && (
          <Animated.View style={{ opacity: this.showSpinner, width: 300, height: 300 }}>
            <Animated.Image
              source={require('../assets/images/spin-wheel-spinner.png')}
              style={{
                width: 300,
                height: 300,
                position: 'absolute',
                transform: [{ rotate: spin }]
              }}
            />
            <Image
              source={require('../assets/images/spin-wheel-outer.png')}
              style={{
                width: 300,
                height: 300,
                position: 'absolute',
              }}
            />
            <Animated.Image
              source={require('../assets/images/spin-wheel-selector.png')}
              style={{
                width: 300,
                height: 300,
                position: 'absolute',
                transform: [{ rotate: flick }]
              }}
            />
          </Animated.View>
        )}

        {!showSpinner && (
          <Animated.ScrollView style={{ opacity: this.showItem }}>
            <Text style={{ fontFamily: theme.fancyFont, fontSize: 40, lineHeight: 40, padding: 10, marginTop: 30 }}>
              {suggestSelectionText[Math.floor(Math.random() * suggestSelectionText.length)]}
            </Text>
            <Card
              featuredTitle={selectedItemName}
              featuredTitleStyle={{ fontSize: 25 }}
              image={{ uri: `https://image.tmdb.org/t/p/w400${selectedItemImage}` }}
            >
              <Rating
                imageSize={20}
                readonly
                startingValue={selectedItemVoteAverage / 2}
                ratingCount={5}
              />
              <Text style={{ fontFamily: theme.bodyFont, fontSize: 20 }}>{selectedItemName}</Text>
              <Text style={{ fontFamily: theme.bodyFont, fontSize: 10, fontStyle: 'italic' }}>
                {selectionType === 'TV' ? 'First aired:' : 'Release date:'} {selectedItemFirstAirDate}
              </Text>
              <Text style={{ fontFamily: theme.bodyFont, fontSize: 14 }}>{selectedItemOverview}</Text>
            </Card>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <Button
                titleStyle={{ fontFamily: theme.bodyFont, lineHeight: 20 }}
                buttonStyle={{ backgroundColor: '#2b2b2b', borderRadius: 0, height: 50, width: ((Dimensions.get('window').width / 2) - 30), marginHorizontal: 15, marginVertical: 30 }}
                icon={<Icon name='chevron-left' color='#ffffff' />}
                title=' Back'
                onPress={() => { navigate('Home') }}
              />
              <Button
                titleStyle={{ fontFamily: theme.bodyFont, lineHeight: 20 }}
                buttonStyle={{ backgroundColor: '#2b2b2b', borderRadius: 0, height: 50, width: ((Dimensions.get('window').width / 2) - 30), marginHorizontal: 15, marginVertical: 30 }}
                icon={<Icon name='loop' color='#ffffff' />}
                title=' Nah'
                onPress={() => { this.spinAgain(randomItem) }}
              />
            </View>
          </Animated.ScrollView>
        )}

        {/* LIST VIEW */}
        {false && (
          <Animated.View style={{ opacity: this.showList }}>
            {
              this.state.selectedList.map((option, idx) => {
                return (
                  <ListItem
                    key={idx}
                    title={option}
                    titleStyle={{ fontFamily: theme.bodyFont }}
                    bottomDivider
                    containerStyle={randomItem === option ? { backgroundColor: 'grey' } : {}}
                  />
                )
              })
            }
          </Animated.View>
        )}

        {!!errorState && (
          <Overlay
            isVisible={!!errorState}
            onBackdropPress={() => {
              this.setState({ errorState: '' }, () => {
                navigate('Home');
              });
            }}
            overlayStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 200,
            }}
          >
            <Fragment>
              <Text style={{ fontFamily: theme.bodyFont, textAlign: 'center' }}>Error: {errorState}</Text>
              <Button
                titleStyle={{ fontFamily: theme.bodyFont, lineHeight: 20 }}
                buttonStyle={{ backgroundColor: '#2b2b2b', borderRadius: 0, height: 50, width: 150, marginHorizontal: 15, marginVertical: 30 }}
                title='Okay'
                onPress={() => {
                  this.setState({ errorState: '' }, () => {
                    navigate('Home');
                  });
                }}
              />
            </Fragment>
          </Overlay>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});