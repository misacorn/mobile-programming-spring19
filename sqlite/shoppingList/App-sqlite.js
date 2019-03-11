import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  Alert
} from "react-native";
import Expo, { SQLite } from "expo";

const db = SQLite.openDatabase("shoppingList.db");

export default class App extends React.Component {
  state = { product: "", amount: "", list: [] };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists list (id integer primary key not null, product text, amount text);"
      );
    });
    this.updateList();
  }

  saveItem = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          "insert into list (product, amount) values (?, ?)",
          [this.state.product, this.state.amount]
        );
      },
      null,
      this.updateList
    );
  };

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql(
        "select * from list",
        [],
        (_, { rows }) =>
          this.setState({ list: rows._array })
      );
    });
  };

  deleteItem = id => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from list where id = ?;`, [
          id
        ]);
      },
      null,
      this.updateList
    );
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
              <Text
                style={{ fontSize: 14, color: "#0000ff" }}
                onPress={() => this.deleteItem(item.id)}
              >
                done
              </Text>
            </View>
          )}
          data={this.state.list}
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
