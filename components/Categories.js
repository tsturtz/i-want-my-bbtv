import React from 'react';
import { StyleSheet, Text, ScrollView, SectionList } from 'react-native';
import { ListItem, Button } from 'react-native-elements';

import { theme } from '../theme';

const categoriesList = [
  // Television
  {
    title: 'TV',
    icon: 'tv',
  },
  {
    title: 'Comedy',
    type: 'TV',
    value: 'tv_comedy'
  },
  {
    title: 'Drama',
    type: 'TV',
    value: 'tv_drama'
  },
  // Movies
  {
    title: 'Movies',
    icon: 'film',
  },
  {
    title: 'Epic Saga',
    type: 'Movie',
    value: 'movie_epic_saga'
  },
  {
    title: 'Comedy',
    type: 'Movie',
    value: 'movie_comedy'
  },
  {
    title: 'Rom-Com',
    type: 'Movie',
    value: 'movie_rom_com'
  },
  {
    title: 'Suspense/Thriller',
    type: 'Movie',
    value: 'movie_suspense_thriller'
  },
  {
    title: 'Drama',
    type: 'Movie',
    value: 'movie_drama'
  },
]

export default class Categories extends React.Component {
  render() {
    const { navigate } = this.props;
    return (
      <ScrollView style={styles.container}>
        {
          categoriesList.map((item, idx) => (
            <ListItem
              key={idx}
              containerStyle={item.icon ? { backgroundColor: '#f9f9f9' } : {}}
              bottomDivider
              rightIcon={{ name: item.icon, type: 'feather' }}
              chevron={!item.icon}
              disabled={!!item.icon}
              title={item.title}
              onPress={() => {
                navigate('Category', {
                  selectionValue: item.value,
                  selectionTitle: item.title,
                  selectionType: item.type,
                })
              }}
            />
          ))
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});