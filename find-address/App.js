import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { Location, MapView } from "expo";

export default class App extends React.Component {
  state = {
    location: null,
    latitude: 60.200692,
    longitude: 24.934302
  };

  inputChange = e => {
    this.setState({ location: e.target.value });
  };

  findAddress = async () => {
    const location = JSON.stringify(this.state.location);
    const locationResult = await Location.geocodeAsync(location);
    const latitude = locationResult[0].latitude;
    const longitude = locationResult[0].longitude;
    this.setState({ latitude, longitude });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 4 }}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            title={this.state.location}
          />
        </MapView>
        >
        <View style={styles.submitBox}>
          <TextInput
            style={{
              width: 200,
              borderColor: "gray",
              borderWidth: 1,
              height: 40
            }}
            onChange={this.inputChange}
            placeholder="Type your address"
          />
          <Button
            style={styles.button}
            onPress={this.findAddress}
            title=" Show "
          />
        </View>
        <KeyboardAvoidingView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    justifyContent: "space-between"
  }
});
