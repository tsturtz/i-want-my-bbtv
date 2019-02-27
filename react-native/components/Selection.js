import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing, Dimensions } from 'react-native';
import { Text, Button, Card, Icon, Rating } from 'react-native-elements';

import { theme } from '../theme';
import { suggestSelectionText } from '../common/constants';

export default class Selection extends Component {
  render() {
    const {
      imagesBaseUrl,
      randomItem,
      selectionType,
      selectedItemName,
      selectedItemImage,
      selectedItemVoteAverage,
      selectedItemFirstAirDate,
      selectedItemOverview,
      navigate,
      spinAgain,
    } = this.props;
    return (
      <Animated.ScrollView style={{ opacity: this.showItem }}>
        <Text style={{ fontFamily: theme.fancyFont, fontSize: 40, lineHeight: 40, padding: 10, marginTop: 30 }}>
          {suggestSelectionText[Math.floor(Math.random() * suggestSelectionText.length)]}
        </Text>
        <Card
          featuredTitle={selectedItemName}
          featuredTitleStyle={{ fontSize: 25 }}
          image={{ uri: `${imagesBaseUrl}w400${selectedItemImage}` }}
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
            buttonStyle={{ backgroundColor: theme.primaryColor, borderRadius: 0, height: 50, width: ((Dimensions.get('window').width / 2) - 30), marginHorizontal: 15, marginVertical: 30 }}
            icon={<Icon name='loop' color='#ffffff' />}
            title=' Nah'
            onPress={() => { spinAgain(randomItem) }}
          />
        </View>
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
