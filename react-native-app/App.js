import React from "react";
import { Button, TextInput, StyleSheet, View, Alert } from "react-native";
import { MapView } from "expo";

export default class App extends React.Component {
  state = {
    region: [
      { latitude: 60.166628 },
      { longitude: 24.943508 },
      { latitudeDelta: 0.0322 },
      { longitudeDelta: 0.0221 }
    ],
    latitude: 0,
    longitude: 0,
    address: ""
  };

  inputChange = text => {
    this.setState({ address: text });
  };

  findLocation = () => {
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=kORXMQVVcGdseGp0LM8X82wRUh24sMy0&location=${
      this.state.address
    }`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          latitude: responseJson.results.locations.latLng.lat,
          longitude: responseJson.results.locations.latLng.lng
        });
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView style={{ flex: 5 }} region={this.state.region}>
          <MapView.Marker
            coordinate={{
              latitute: this.state.region.latitude,
              longitude: this.state.region.longitude
            }}
            title={this.state.address}
          />
        </MapView>
        <TextInput
          style={{
            width: 250,
            borderColor: "gray",
            borderWidth: 1,
            height: 40,
            alignItems: "center",
            margin: 15,
            flex: 1
          }}
          onChangeText={this.inputChange}
          value={this.state.address}
        />
        <Button
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1
          }}
          onPress={this.findLocation}
          title=" Find "
        />
      </View>
    );
    {
      /* <MapView
        style={{ flex: 1 }}
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
      </MapView> */
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
