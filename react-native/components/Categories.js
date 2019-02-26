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

    if (categoriesList) {
      return (
        <ScrollView style={styles.container}>
          {
            categoriesList.map((item, idx) => (
              <ListItem
                key={idx}
                containerStyle={item.top_level_category ? { backgroundColor: '#f9f9f9' } : {}}
                underlayColor='#b285cc80'
                titleStyle={{ fontFamily: theme.bodyFont }}
                bottomDivider
                rightIcon={item.top_level_category ? { name: item.icon, type: item.iconType } : null}
                leftIcon={!item.top_level_category ? { name: item.icon, type: item.iconType } : null}
                chevron={!item.top_level_category}
                disabled={item.top_level_category}
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
