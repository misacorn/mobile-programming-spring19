import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default class History extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text style={{ textTransform: "uppercase", padding: 20 }}>History</Text>
        <FlatList
          data={params.history}
          keyExtractor={item =>item.id}
          renderItem={({ item }) => <Text id={item.key}>{item.key}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
