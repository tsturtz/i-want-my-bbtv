import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { theme } from '../theme';

export default class Titles extends Component {
  render() {
    const { navigate, titles } = this.props;
    return (
      <ScrollView style={styles.container}>
        {
          titles.map((title, idx) => (
            <ListItem
              key={idx}
              titleStyle={{ fontFamily: theme.bodyFont }}
              bottomDivider
              title={title}
            />
          ))
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
});
