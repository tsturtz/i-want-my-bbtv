import React from 'react';
import { StyleSheet, Text, View, Button, Alert, SectionList } from 'react-native';

const sections = [
  {
    title: 'Comedies',
    data: [
      'The Office',
      '30 Rock',
      'Parks and Recreation',
      'The Grinder',
      'Great News',
      'Unbreakable Kimmy Schmidt',
      'The Last Man on Earth',
      'Brooklyn 99',
      'The Simpsons',
      'Friends',
      'Seinfeld',
    ]
  },
  {
    title: 'Drama',
    data: [
      'Game of Thrones',
      'Lost',
      'West World',
      'The Blacklist',
    ]
  },
  {
    title: 'Movies',
    data: [
      'The Hobbit: The Trilogy',
      'Lord of the Rings: The Trilogy',
      'Star Wars: The Prequels',
      'Star Wars: The Original Trilogy',
      'Star Wars: The Sequels',
    ]
  },
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => {
            Alert.alert('You tapped the button!');
          }}
          color="#ff6347"
          title="Press Me"
        />
        <SectionList
          sections={sections}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: '#fff'
  },
});