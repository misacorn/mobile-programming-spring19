import React from "react";
import { Button, TextInput, StyleSheet, Text, View } from "react-native";

export default class Calculator extends React.Component {
  static navigationOptions = { title: "Calculator" };
  state = { result: 0, num1: 0, num2: 0, text: "", history: [] };

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
    const { navigate } = this.props.navigation;
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
            onChangeText={text => {
              this.setState({ num1: parseInt(text) });
            }}
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
            onChangeText={text => {
              this.setState({ num2: parseInt(text) });
            }}
            value={this.state.num2}
          />
        </View>
        <View style={styles.buttons}>
          <Button onPress={this.sum} title=" + " />
          <Button onPress={this.subtract} title=" - " />
          <Button
            onPress={() => navigate("History", { history: this.state.history })}
            title="History"
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
