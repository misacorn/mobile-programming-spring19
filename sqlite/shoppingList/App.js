import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList
} from "react-native";
import firebase from "./config";

export default class App extends React.Component {
  state = { product: "", amount: "", items: [] };

  componentDidMount() {
    firebase
      .database()
      .ref("items/")
      .on("value", snapshot => {
        const data = snapshot.val();
        const items = Object.values(data);
        this.setState({ items });
      });
  }

  saveItem = () => {
    firebase
      .database()
      .ref("items/")
      .push({
        product: this.state.product,
        amount: this.state.amount
      });
  };

  listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Product"
          style={{
            marginTop: 30,
            fontSize: 14,
            width: 200,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={product =>
            this.setState({ product })
          }
          value={this.state.product}
        />
        <TextInput
          placeholder="Amount"
          style={{
            marginTop: 5,
            marginBottom: 5,
            fontSize: 14,
            width: 200,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={amount => this.setState({ amount })}
          value={this.state.amount}
        />
        <Button onPress={this.saveItem} title="Save" />
        <Text
          style={{
            marginTop: 30,
            fontSize: 20,
            marginBottom: 10
          }}
        >
          Shopping List
        </Text>
        <FlatList
          style={{ marginLeft: "5%" }}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.listcontainer}>
              <Text style={{ fontSize: 14 }}>
                {item.product}, {item.amount}{" "}
              </Text>
            </View>
          )}
          data={this.state.items}
          ItemSeparatorComponent={this.listSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
