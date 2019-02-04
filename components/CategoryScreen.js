import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements';

import { theme } from '../theme';

const selections = [
  {
    selection: 'tv_comedy',
    options: [
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
    ],
  },
  {
    selection: 'tv_drama',
    options: [
      'Game of Thrones',
      'Lost',
      'West World',
      'The Blacklist',
    ],
  },
  {
    selection: 'tv_cooking',
    options: [
      'Chopped',
      'Worst Cooks in America',
      'Final Table',
      'Cut Throat Kitchen',
    ],
  },
  {
    selection: 'movie_epic_saga',
    options: [
      'The Hobbit: The Trilogy',
      'Lord of the Rings: The Trilogy',
      'Star Wars: The Prequels',
      'Star Wars: The Original Trilogy',
      'Star Wars: The Sequels',
    ],
  },
  {
    selection: 'movie_comedy',
    options: [],
  },
  {
    selection: 'movie_rom_com',
    options: [],
  },
  {
    selection: 'movie_suspense_thriller',
    options: [],
  },
  {
    selection: 'movie_scary',
    options: [
      'Bird Box',
      'Silence of the Lambs',
      'Hocus Pocus',
      'The Shining',
    ],
  },
  {
    selection: 'movie_drama',
    options: [],
  },
]

export default class CategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('selectionType', 'Unknown')}: ${navigation.getParam('selectionTitle', 'Category')}`,
      headerStyle: { backgroundColor: theme.backgroundColor },
      headerTintColor: '#fff',
    };
  };
  render() {
    const { navigation, navigation: { navigate } } = this.props;

    const selectionValue = navigation.getParam('selectionValue', 'default_value');
    const selectionTitle = navigation.getParam('selectionTitle', 'Category');
    const selectionType = navigation.getParam('selectionType', 'Unknown');

    const selectedList = selections.find((sel) => sel.selection === selectionValue);

    return (
      <ScrollView style={styles.container}>
        {
          selectedList.options.map((option, idx) => {
            return (
              <ListItem
                key={idx}
                bottomDivider
                title={option}
                onPress={() => {}}
              />
            )
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});