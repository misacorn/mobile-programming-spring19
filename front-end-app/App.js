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
  state = { result: 0, num1: 0, num2: 0, text: "", history: [] };
  onChangedNum1 = text => {
    this.setState({ num1: parseInt(text) });
  };
  onChangedNum2 = text => {
    this.setState({ num2: parseInt(text) });
  };

  sum = ({ num1, num2, history }) => {
    const calculation = num1 + num2;
    this.setState({
      result: calculation,
      text: `${num1} + ${num2} = ${calculation}`,
      history: [...history, { text: this.state.text }]
    });
  };

  subtract = ({ num1, num2 }) => {
    const subtraction = num1 - num2;
    this.setState({ result: subtraction });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text>Result: {this.state.result}</Text>
          <TextInput
            style={{
              width: 200,
              borderColor: "gray",
              borderWidth: 1,
              height: 40
            }}
            keyboardType="numeric"
            onChangeText={this.onChangedNum1}
            value={this.state.num1}
          />
          <TextInput
            style={{
              width: 200,
              borderColor: "gray",
              borderWidth: 1,
              height: 40
            }}
            keyboardType="numeric"
            onChangeText={this.onChangedNum2}
            value={this.state.num2}
          />
        </View>
        <View style={styles.buttons}>
          <Button onPress={this.sum} title="+" />
          <Button onPress={this.subtract} title="-" />
        </View>
        <View style={styles.history}>
          <Text>History</Text>
          <FlatList
            history={this.state.history}
            renderItem={({ item }) => <Text>{item.key}</Text>}
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
    justifyContent: "space-between"
  }
});
