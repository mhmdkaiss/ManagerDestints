import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import SignIn from './pages/Signin';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ForgotPassword from './pages/ForgotPassword';
import RegistrationForm from './pages/SignUp';
import searchPage from './pages/SearchPage';
import HeartPage from './pages/HeartPage';
import { Text} from 'react-native';
import PublicitePage from './pages/PublicitePage';
import AttestationPage from './pages/Attestation';
import ActualitePage from './pages/ActualitePage';
import DocumentationPage from './pages/Documentation';
import PaiementPage from './pages/PaiementPage';
import NotificationPage from './pages/Notification';
import NotificationSendMsgPage from './pages/NotificationSendMsg';
import repartition from './pages/repartition';
import NotificationBroadcast from './pages/NotificationBroadcast';
import InfoGeneral from './pages/InfoGeneral';


const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <HomeStack.Navigator>
    
        <HomeStack.Screen name="SearchPage" component={searchPage} options={{headerShown: false}} />
              <HomeStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
        <HomeStack.Screen name="Attestation" component={AttestationPage} options={{headerShown: false}} />
        <HomeStack.Screen name="PaiementPage" component={PaiementPage} options={{headerShown: false}} />
        <HomeStack.Screen name="NotificationPage" component={NotificationPage} options={{headerShown: false}} />
        <HomeStack.Screen name="NotificationBroadcast" component={NotificationBroadcast} options={{headerShown: false}} />
        <HomeStack.Screen name="NotificationSendMsgPage" component={NotificationSendMsgPage} options={{headerShown: false}} />    
        
   </HomeStack.Navigator>
  );
}

function HeartStackScreen() {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen name="HeartPage" component={HeartPage} options={{headerShown: false}} />
        <HomeStack.Screen name="ActualitePage" component={ActualitePage} options={{headerShown: false}} />
        <HomeStack.Screen name="DocumentationPage" component={DocumentationPage} options={{headerShown: false}} />
        <HomeStack.Screen name="RepartitionPage" component={repartition} options={{headerShown: false}} />
        <HomeStack.Screen name="InfoGeneralPage" component={InfoGeneral} options={{headerShown: false}} />
   </HomeStack.Navigator>
  );
}


class App extends React.Component{

  state={loggedIn:false};

  componentWillMount(){

    auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({loggedIn:true});
        this.setState({user});
        // console.log({user});
      } else {
        this.setState({loggedIn:false});
      }
    })
  }

  renderContent(){
    switch(this.state.loggedIn){
      case true:
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
                  iconName = focused ? 'shopping-cart' : 'shopping-cart';
                  return <FontAwesome name={iconName} size={30} color={color} />;
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
           
            <Tab.Screen name="Home" component={SearchStackScreen} />
            <Tab.Screen name="Settings" component={HeartStackScreen} />
            <Tab.Screen name="Locations" component={PublicitePage} />
        </Tab.Navigator>
        );
      case false:
        return (
          <HomeStack.Navigator>
              <HomeStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
              <HomeStack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
              <HomeStack.Screen name="SignUp" component={RegistrationForm} options={{headerShown: false}} />
              <HomeStack.Screen name="SearchPage" component={searchPage} options={{headerShown: false}} />
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