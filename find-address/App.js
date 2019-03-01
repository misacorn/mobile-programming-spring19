import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView
} from "react-native";
import { Location, Permissions, MapView } from "expo";

export default class App extends React.Component {
  state = {
    address: "",
    latitude: 60.200692,
    longitude: 24.934302,
    behavior: "position"
  };

  getAddress = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    } else {
      const address = JSON.stringify(this.state.address);
      let result = await Location.geocodeAsync(address);
      let latitude = result[0].latitude;
      let longitude = result[0].longitude;
      this.setState({
        latitude,
        longitude
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={this.state.behavior}>
          <MapView
            style={{ width: 500, height: 800 }}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.05
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude
              }}
              title={this.state.address}
            />
          </MapView>

          <View style={styles.box}>
            <TextInput
              style={{ height: 40, width: 200 }}
              placeholder="Type your address"
              onChangeText={address => this.setState({ address })}
            />
            <Button title=" Find " onPress={this.getAddress} />
          </View>
        </KeyboardAvoidingView>
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
  map: {
    flex: 5
  },
  box: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    textAlign: "center"
  }
});
