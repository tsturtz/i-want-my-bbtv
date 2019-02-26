import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { theme } from '../theme';

export default class Titles extends Component {
  render() {
    const { navigate, titles, handleTitleSelect, adding } = this.props;
    return (
      <ScrollView style={styles.container}>
        {
          titles.sort().map((title, idx) => (
            <ListItem
              key={idx}
              titleStyle={{ fontFamily: theme.bodyFont }}
              containerStyle={adding ? { backgroundColor: '#b285cc1a' } : {}}
              underlayColor='#b285cc80'
              bottomDivider
              title={title}
              onPress={() => { handleTitleSelect(title) }}
              onLongPress={() => { handleTitleSelect(title) }}
            />
          ))
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
});
