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

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'search' : 'search';
                  return <Feather name={iconName} size={size} color={color} />;
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'heartbeat' : 'heartbeat';
                  return <FontAwesome name={iconName} size={size} color={color} />;
                }else if (route.name === 'Locations') {
                  iconName = focused ? 'location-pin' : 'location-pin';
                  return <Entypo name={iconName} size={32} color={color} />;
                }

                // You can return any component that you like here!
            
              },
            })}
            tabBarOptions={{
              activeTintColor: 'black',
              inactiveTintColor: 'gray',
              showLabel:false,
            }} 
           >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Settings" component={secondTab} />
      <Tab.Screen name="Locations" component={Publicites} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
          <HomeStack.Navigator>
              <HomeStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
              <HomeStack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
              <HomeStack.Screen name="SignUp" component={RegistrationForm} options={{headerShown: false}} />
          </HomeStack.Navigator>
    </NavigationContainer>
  );
}