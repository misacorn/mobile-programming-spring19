import React from "react";
import { View, TextInput, Button, Stylesheet } from "react-native";
import { MapView } from "expo";

export default class App extends React.Component {
  findAddress = e => {
    e.preventDefault();
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 5 }}
          initialRegion={{
            latitude: 60.200692,
            longitude: 24.934302,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221
          }}
        >
          <MapView.Marker
            coordinate={{ latitude: 60.201373, longitude: 24.934041 }}
            title="Haaga-Helia"
          />
        </MapView>
        <TextInput style={styles.input} onChange={e => e.target.value} />
        <Button
          style={styles.button}
          onPress={this.findAddress}
          title=" Show "
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    margin: 15,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    height: 40
  },
  button: {
    alignItems: "center",
    justifyContent: "space-between"
  }
});
