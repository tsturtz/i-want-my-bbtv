import React from 'react';
import { StyleSheet, Text, ScrollView, SectionList } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { Font, AppLoading } from 'expo';

import { theme } from '../theme';

const categoriesList = [
  // Television
  {
    title: 'TV',
    top_level_category: true,
    icon: 'television-classic',
    iconType: 'material-community',
  },
  {
    title: 'Cooking',
    top_level_category: false,
    type: 'TV',
    value: 'tv_cooking',
    icon: 'pot',
    iconType: 'material-community',
  },
  {
    title: 'Comedy',
    top_level_category: false,
    type: 'TV',
    value: 'tv_comedy',
    icon: 'emoticon-excited',
    iconType: 'material-community',
  },
  {
    title: 'Drama',
    top_level_category: false,
    type: 'TV',
    value: 'tv_drama',
    icon: 'fire', // chili-mild
    iconType: 'material-community',
  },
  // Movies
  {
    title: 'Movies',
    top_level_category: true,
    icon: 'filmstrip',
    iconType: 'material-community',
  },
  {
    title: 'Animated',
    top_level_category: false,
    type: 'Movie',
    value: 'movie_animated',
    icon: 'clippy',
    iconType: 'material-community',
  },
  {
    title: 'Comedy',
    top_level_category: false,
    type: 'Movie',
    value: 'movie_comedy',
    icon: 'emoticon-excited',
    iconType: 'material-community',
  },
  {
    title: 'Drama',
    top_level_category: false,
    type: 'Movie',
    value: 'movie_drama',
    icon: 'fire', // chili-mild
    iconType: 'material-community',
  },
  {
    title: 'Epic Saga',
    top_level_category: false,
    type: 'Movie',
    value: 'movie_epic_saga',
    icon: 'death-star-variant',
    iconType: 'material-community',
  },
  {
    title: 'Scary',
    top_level_category: false,
    type: 'Movie',
    value: 'movie_scary',
    icon: 'balloon',
    iconType: 'material-community',
  },
  {
    title: 'Rom-Com',
    top_level_category: false,
    type: 'Movie',
    value: 'movie_rom_com',
    icon: 'heart',
    iconType: 'material-community',
  },
  {
    title: 'Suspense/Thriller',
    top_level_category: false,
    type: 'Movie',
    value: 'movie_suspense_thriller',
    icon: 'fingerprint',
    iconType: 'material-community',
  },
]

export default class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
    }
  }
  async componentWillMount() {
    await Font.loadAsync({
      AbrilFatface: require('../assets/fonts/AbrilFatface-Regular.ttf'),
      JosefinSans: require('../assets/fonts/JosefinSans-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    const { navigate } = this.props;
    if (this.state.fontLoaded) {
      return (
        <ScrollView style={styles.container}>
          {
            categoriesList.map((item, idx) => (
              <ListItem
                key={idx}
                containerStyle={item.top_level_category ? { backgroundColor: '#f9f9f9' } : {}}
                titleStyle={{ fontFamily: theme.bodyFont }}
                bottomDivider
                rightIcon={item.top_level_category ? { name: item.icon, type: item.iconType } : null}
                leftIcon={!item.top_level_category ? { name: item.icon, type: item.iconType } : null}
                chevron={!item.top_level_category}
                disabled={item.top_level_category}
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
    } else {
      return <AppLoading />
    }
  }
}

const styles = StyleSheet.create({
});
