import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./screens/Home";
import Room from "./screens/Room";
import Game from "./screens/Game";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        header: null
      })
    },
    Room: {
      screen: Room,
      navigationOptions: () => ({
        header: null
      })
    },

    Game: {
      screen: Game,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
