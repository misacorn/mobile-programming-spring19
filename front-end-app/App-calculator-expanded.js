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

  sum = () => {
    const sum = this.state.num1 + this.state.num2;
    const textSum = `${this.state.num1} + ${this.state.num2} = ${sum}`;
    this.setState({
      result: sum,
      history: [...this.state.history, { key: textSum }],
      num1: "",
      num2: ""
    });
  };

  subtract = () => {
    const sub = this.state.num1 - this.state.num2;
    const textSub = `${this.state.num1} - ${this.state.num2} = ${sub}`;
    this.setState({
      result: sub,
      history: [...this.state.history, { key: textSub }],
      num1: "",
      num2: ""
    });
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
          <Button onPress={this.sum} title=" + " />
          <Button onPress={this.subtract} title=" - " />
        </View>
        <View style={styles.history}>
          <Text>History</Text>
          <FlatList data={this.state.history} renderItem={this._renderItem} />
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
  history: {
    flex: 4,
    height: 200
  }
});
