import React from 'react';
import { StyleSheet, Text, ScrollView, SectionList } from 'react-native';
import { ListItem, Button } from 'react-native-elements';

import { theme } from '../theme';
import { categoriesList } from '../common/constants';

export default class Categories extends React.Component {
  render() {
    const { navigate } = this.props;
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
  }
}

const styles = StyleSheet.create({
});
