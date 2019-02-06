import React from "react";
import {
  Button,
  TextInput,
  StyleSheet,
  Text,
  View,
  FlatList
} from "react-native";

export default class History extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text>{params.history}</Text>
      </View>
    );
  }
}
