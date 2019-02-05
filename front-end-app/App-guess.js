import React from "react";
import { Alert, Button, TextInput, StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
  state = {
    num: Math.floor(Math.random() * 100) + 1,
    heading: "Guess a number between 1-100",
    guessNum: 0,
    guessCount: 0
  };
  inputChange = text => {
    this.setState({ guessNum: parseInt(text) });
  };

  makeGuess = () => {
    this.setState({ guessCount: this.state.guessCount + 1 });
    const { num, guessNum } = this.state;
    if (num < guessNum) {
      this.setState({
        heading: `Your guess ${guessNum} is too high`
      });
    } else if (num > guessNum) {
      this.setState({
        heading: `Your guess ${guessNum} is too low`
      });
    } else {
      Alert.alert(`You guessed the number in ${this.state.guessCount} guesses`);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.heading}</Text>
        <TextInput
          style={{
            width: 200,
            borderColor: "gray",
            borderWidth: 1,
            height: 30,
            margin: 20
          }}
          keyboardType="numeric"
          onChangeText={this.inputChange}
          value={this.state.guessNum}
        />
        <View style={styles.buttons}>
          <Button onPress={this.makeGuess} title="Make A Guess" />
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
  buttons: {
    color: "white",
    backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
