import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { Button } from 'react-native-elements';


export default class Categories extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.categoryHeader}>TV</Text>
        <Button
          style={styles.categoryButton}
          title="Comedies"
          onPress={() => {

          }}
        />
        <Button
          style={styles.categoryButton}
          title="Dramas"
          onPress={() => {

          }}
        />

        <Text style={styles.categoryHeader}>Movies</Text>
        <Button
          style={styles.categoryButton}
          title="Epic Sagas"
          onPress={() => {

          }}
        />
        <Button
          style={styles.categoryButton}
          title="Suspense/Thrillers"
          onPress={() => {

          }}
        />
        <Button
          style={styles.categoryButton}
          title="Dramas"
          onPress={() => {

          }}
        />
        <Button
          style={styles.categoryButton}
          title="Comedies"
          onPress={() => {

          }}
        />
        <Button
          style={styles.categoryButton}
          title="Rom-Coms"
          onPress={() => {

          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 100,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  categoryHeader: {
    color: '#fff',
  },
  categoryButton: {
    marginBottom: '10px',
  },
});