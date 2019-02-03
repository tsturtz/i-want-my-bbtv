import React, { Fragment } from 'react';
import { StyleSheet, View, Alert, SectionList } from 'react-native';
import { Button, Overlay, Text, Header } from 'react-native-elements';

import Categories from './components/Categories';

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
    title: 'Dramas',
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
  constructor(props) {
    super(props)
    this.state = {
      isOverlayVisible: true,
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Overlay
          overlayStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          isVisible={this.state.isOverlayVisible}
          onBackdropPress={() => this.setState({ isOverlayVisible: false })}
        >
          <Fragment>
            <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}>Getting kinda tired of <Text style={{ fontStyle: 'italic' }}>Friends</Text>. How about something else? 😁</Text>
            <Button
              buttonStyle={{ width: 100, height: 50 }}
              title="Ok sure!"
              onPress={() => {
                this.setState({ isOverlayVisible: false })
              }}
            />
          </Fragment>
        </Overlay>
        <Header
          barStyle="light-content"
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'I want my BBTV', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Categories />
        {/* <SectionList
          sections={sections}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2b2b2b',
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