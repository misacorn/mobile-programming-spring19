import React from "react";
import { Button, TextInput, StyleSheet, Text } from "react-native";
import { MapView } from "expo";

export default class App extends React.Component {
  state = { location: "", inputTxt: "", region: [] };

  render() {
    return (
      // <View style={styles.container}>
      //   <MapView style={{ flex: 5 }} region={this.state.region}>
      //     <MapView.Marker
      //       coordinate={{
      //         latitute: this.state.latitude,
      //         longitude: this.state.longitude
      //       }}
      //       title="Haaga-Helia"
      //     />
      //   </MapView>
      // </View>
      <MapView
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
      </MapView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  }
});
