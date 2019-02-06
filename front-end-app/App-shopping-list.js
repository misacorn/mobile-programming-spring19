import React from "react";
import {
  Button,
  TextInput,
  StyleSheet,
  Text,
  View,
  FlatList
} from "react-native";

export default class App extends React.Component {
  state = { item: "", list: [] };

  add = () => {
    this.setState({
      list: [...this.state.list, { key: this.state.item }],
      item: ""
    });
  };

  clear = () => {
    this.setState({
      list: []
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            style={{
              width: 200,
              borderColor: "gray",
              borderWidth: 1,
              height: 40
            }}
            onChangeText={item => this.setState({ item })}
            value={this.state.text}
          />
        </View>
        <View style={styles.buttons}>
          <Button onPress={this.add} title=" Add " />
          <Button onPress={this.clear} title=" Clear " />
        </View>
        <View style={styles.list}>
          <Text style={{ textTransform: "capitalize" }}>Shopping List</Text>
          <FlatList
            data={this.state.list}
            renderItem={({ item }) => <Text id={item.key}>{item.key}</Text>}
          />
        </View>
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
  },
  input: {
    flexDirection: "column",
    alignItems: "center",
    margin: 15
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  list: {
    flex: 4,
    height: 200
  }
});
