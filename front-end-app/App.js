import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import Calculator from "./Calculator";
import History from "./History";

const AppNavigator = createStackNavigator(
  {
    Calculator: Calculator,
    History: History
  },
  {
    initialRouteName: "Calculator"
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
