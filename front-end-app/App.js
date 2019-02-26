import React from "react";
import {
  Button,
  TextInput,
  StyleSheet,
  View,
  FlatList,
  Alert,
  Text,
  Image
} from "react-native";
export default class App extends React.Component {
  state = {
    input: 0,
    result: 0,
    currencies: ["AUD", "CAD", "GBP", "JPY", "USD"],
    currency: ""
  };

  inputChange = text => {
    this.setState({ input: parseInt(text) });
  };

  convert = () => {
    const url = ``;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ recipes: responseJson.results });
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>`${this.state.result}€`</Text>

        <View style={styles.inputs}>
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
          <Picker
            selectedValue={this.state.currency}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ currency: itemValue })
            }
          >
            <Picker.Item label="AUD" value="AUD" />
            <Picker.Item label="CAD" value="CAD" />
            <Picker.Item label="GBP" value="GBP" />
            <Picker.Item label="JPY" value="JPY" />
            <Picker.Item label="USD" value="USD" />
          </Picker>
        </View>

        <Button onPress={this.convert} title=" Convert " />
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
  inputs: {
    flexDirection: "row",
    alignItems: "center",
    margin: 15
  }
});
