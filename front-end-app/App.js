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
  state = { recipes: [], ingredient: "" };

  inputChange = text => {
    this.setState({ ingredient: text });
  };

  findRecipe = () => {
    const url = `http://www.recipepuppy.com/api/?i=${this.state.ingredient}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ recipes: responseJson.results, ingredient: "" });
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.recipes}>
          <FlatList
            style={{ marginLeft: "1%" }}
            data={this.state.recipes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.title}</Text>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: item.thumbnail }}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={{
              width: 200,
              borderColor: "gray",
              borderWidth: 1,
              height: 40
            }}
            onChangeText={this.inputChange}
            value={this.state.ingredient}
          />
        </View>
        <View style={styles.buttons}>
          <Button onPress={this.findRecipe} title=" Find " />
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
  },
  recipes: {
    flex: 3,
    height: 200
  }
});
