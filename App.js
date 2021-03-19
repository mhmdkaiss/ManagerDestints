import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './pages/Signin';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Entypo from 'react-native-vector-icons/Entypo';
import ForgotPassword from './pages/ForgotPassword';
import RegistrationForm from './pages/SignUp';
import searchPage from './pages/SearchPage';
import HeartPage from './pages/HeartPage';
import { Text} from 'react-native';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen name="HeartPage" component={HeartPage} options={{headerShown: false}} />
        <HomeStack.Screen name="searchPage" component={searchPage} options={{headerShown: false}} />
    </HomeStack.Navigator>
  );
}


class App extends React.Component{

  state={loggedIn:true};

  renderContent(){
    switch(this.state.loggedIn){
      case true:
        return (
          <Tab.Navigator
          // screenOptions={({ route }) => ({
          //     tabBarIcon: ({ focused, color, size }) => {
          //       let iconName;

          //       if (route.name === 'Home') {
          //         iconName = focused ? 'search' : 'search';
          //         return <Feather name={iconName} size={size} color={color} />;
          //       } else if (route.name === 'Settings') {
          //         iconName = focused ? 'heartbeat' : 'heartbeat';
          //         return <FontAwesome name={iconName} size={size} color={color} />;
          //       }else if (route.name === 'Locations') {
          //         iconName = focused ? 'location-pin' : 'location-pin';
          //         return <Entypo name={iconName} size={32} color={color} />;
          //       }

          //       // You can return any component that you like here!
            
          //     },
          //   })}
            // tabBarOptions={{
            //   activeTintColor: 'black',
            //   inactiveTintColor: 'gray',
            //   showLabel:false,
            // }} 
           >
            <Tab.Screen name="Home" component={searchPage} />
            <Tab.Screen name="Settings" component={HeartPage} />
            <Tab.Screen name="Locations" component={searchPage} />
        </Tab.Navigator>
        );
      case false:
        return (
            <HomeStack.Navigator>
                <HomeStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
                <HomeStack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
                <HomeStack.Screen name="SignUp" component={RegistrationForm} options={{headerShown: false}} />
            </HomeStack.Navigator>
          );
      default:
        return <Text>default page</Text>;
    }
  
  }

  render(){
    return (
      <NavigationContainer>
        {this.renderContent()}
      </NavigationContainer>
    );
  }

}



export default App;