import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Alert } from 'react-native';
import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('coursedb.db');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: '', amount: '', shoppingList: [] };
  }

  componentDidMount() {
    // Create course table
    db.transaction(tx => {
      tx.executeSql('create table if not exists course (id integer primary key not null, amount text, product text);');
    });
    this.updateList();
  }

  // Save course
  saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into course (amount, product) values (?, ?)', [parseInt(this.state.amount), this.state.product]);
    }, null, this.updateList)
  }

  // Update courselist
  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppingList', [], (_, { rows }) =>
        this.setState({ courses: rows._array })
      );
    });
  }

  // Delete course
  deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shoppingList where id = ?;`, [id]);
      }, null, this.updateList
    )
  }

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
        <TextInput placeholder='Product' style={{ marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={product => this.setState({ product })}
          value={this.state.product} />
        <TextInput placeholder='Amount' keyboardType="numeric" style={{ marginTop: 5, marginBottom: 5, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={amount => this.setState({ amount })}
          value={this.state.amount} />
        <Button onPress={this.saveItem} title="Save" />
        <Text style={{ marginTop: 30, fontSize: 20 }}>Courses</Text>
        <FlatList
          style={{ marginLeft: "5%" }}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.product}, {item.amount}   </Text>
            <Text style={{ fontSize: 18, color: '#0000ff' }} onPress={() => this.deleteItem(item.id)}>done</Text></View>} data={this.state.shoppingList} ItemSeparatorComponent={this.listSeparator}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});