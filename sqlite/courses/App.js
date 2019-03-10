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

const db = SQLite.openDatabase("coursedb.db");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { credit: "", title: "", courses: [] };
  }

  componentDidMount() {
    // Create course table
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists course (id integer primary key not null, credits int, title text);"
      );
    });
    this.updateList();
  }

  // Save course
  saveItem = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          "insert into course (credits, title) values (?, ?)",
          [parseInt(this.state.credit), this.state.title]
        );
      },
      null,
      this.updateList
    );
  };

  // Update courselist
  updateList = () => {
    db.transaction(tx => {
      tx.executeSql(
        "select * from course",
        [],
        (_, { rows }) =>
          this.setState({ courses: rows._array })
      );
    });
  };

  // Delete course
  deleteItem = id => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from course where id = ?;`, [
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
          placeholder="Title"
          style={{
            marginTop: 30,
            fontSize: 18,
            width: 200,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <TextInput
          placeholder="Credits"
          keyboardType="numeric"
          style={{
            marginTop: 5,
            marginBottom: 5,
            fontSize: 18,
            width: 200,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={credit => this.setState({ credit })}
          value={this.state.credit}
        />
        <Button onPress={this.saveItem} title="Save" />
        <Text style={{ marginTop: 30, fontSize: 20 }}>
          Courses
        </Text>
        <FlatList
          style={{ marginLeft: "5%" }}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.listcontainer}>
              <Text style={{ fontSize: 18 }}>
                {item.title}, {item.credits}{" "}
              </Text>
              <Text
                style={{ fontSize: 18, color: "#0000ff" }}
                onPress={() => this.deleteItem(item.id)}
              >
                done
              </Text>
            </View>
          )}
          data={this.state.courses}
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
