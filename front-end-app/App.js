import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import Calculator from "./Calculator";
import History from "./History";

const AppNavigator = createStackNavigator({
  Calculator: { screen: Calculator },
  History: { screen: History }
});

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
