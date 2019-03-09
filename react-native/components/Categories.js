import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, SectionList, ActivityIndicator } from 'react-native';
import { ListItem, Button } from 'react-native-elements';

import { theme } from '../theme';

export default class Categories extends Component {
  state = {
    categoriesList: null
  }
  async componentWillMount() {
    try {
      const response = await fetch(`${process.env.BBTV_BASE_URL}/categories`)
      const json = await response.json()
      this.setState({ categoriesList: json })
    } catch (err) {
      console.warn(err)
    }
  }
  render() {
    const { navigate } = this.props;
    const { categoriesList } = this.state;
    let tvList = [];
    let movieList = [];

    if (categoriesList) {
      tvList = categoriesList.filter((item) => item.type === 'TV').sort((next, prev) => next.title.localeCompare(prev.title));
      movieList = categoriesList.filter((item) => item.type === 'Movie').sort((next, prev) => next.title.localeCompare(prev.title));
      return (
        <ScrollView style={styles.container}>
          {/* TV */}
          <ListItem
            disabled
            bottomDivider
            underlayColor='#b285cc80'
            containerStyle={{ backgroundColor: '#f9f9f9' }}
            titleStyle={{ fontFamily: theme.bodyFont }}
            rightIcon={{ name: 'television-classic', type: 'material-community' }}
            title="TV"
          />
          {
            tvList.map((item, idx) => (
              <ListItem
                key={idx}
                chevron
                bottomDivider
                underlayColor='#b285cc80'
                titleStyle={{ fontFamily: theme.bodyFont }}
                leftIcon={{ name: item.icon, type: item.iconType }}
                title={item.title}
                onPress={() => {
                  navigate('Selection', {
                    selectionValue: item.value,
                    selectionTitle: item.title,
                    selectionType: item.type,
                  })
                }}
                onLongPress={() => {
                  navigate('Category', {
                    selectionValue: item.value,
                    selectionTitle: item.title,
                    selectionType: item.type,
                  })
                }}
              />
            ))
          }
          {/* Movies */}
          <ListItem
            disabled
            bottomDivider
            underlayColor='#b285cc80'
            containerStyle={{ backgroundColor: '#f9f9f9' }}
            titleStyle={{ fontFamily: theme.bodyFont }}
            rightIcon={{ name: 'filmstrip', type: 'material-community' }}
            title="Movies"
          />
          {
            movieList.map((item, idx) => (
              <ListItem
                key={idx}
                chevron
                bottomDivider
                underlayColor='#b285cc80'
                titleStyle={{ fontFamily: theme.bodyFont }}
                leftIcon={{ name: item.icon, type: item.iconType }}
                title={item.title}
                onPress={() => {
                  navigate('Selection', {
                    selectionValue: item.value,
                    selectionTitle: item.title,
                    selectionType: item.type,
                  })
                }}
                onLongPress={() => {
                  navigate('Category', {
                    selectionValue: item.value,
                    selectionTitle: item.title,
                    selectionType: item.type,
                  })
                }}
              />
            ))
          }
          <Text style={{ fontFamily: theme.bodyFont, fontSize: 15, lineHeight: 30, paddingHorizontal: 15, paddingBottom: 20, color: theme.primaryColor, marginTop: 20 }}>
            (Long-press to manage categories)
          </Text>
        </ScrollView>
      );
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
