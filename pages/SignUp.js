import React from 'react';
import {View,Text, StyleSheet,Image,TouchableOpacity} from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import Input from '../components/Input'
import Spinner from '../components/Spinner';

class RegistrationForm extends React.Component {  
  state = {email:'',password:'',regId:'',error:'',loading:false,iconType:'Feather'};

  navigateScreen(){
    this.props.navigation.navigate('SignIn');
  }
  
  onButtonPress(){
    // const {email,password,regId} = this.state;
    this.setState({error:'pressed',loading:false});

//     firebase.auth().signInWithEmailAndPassword(email,password)
//   .then(this.onLoginSuccess.bind(this))
//   .catch(()=>{
//     firebase.auth().createUserWithEmailAndPassword(email,password)
//     .then(this.onLoginSuccess.bind(this))
//     .catch(()=>{
//       this.setState({error:'Authentication failed!',loading:false})
//     });
//   });

  }
  iconTypeFun(){
    // switch('feather'){
    //   case 'feather':
    //     return <Text>feather!</Text>;
    //   default:
    //     return <Text>nothing</Text>
    // }
    return <Text>feather</Text>
  }

  renderButton(){
    if(this.state.loading){
      return <Spinner/>
    }
    
      return (
        <Button 
            Label = {'CREATE ACCOUNT'}
            onButtonPress={this.onButtonPress.bind(this)}
        />
        );
  }

//   onLoginSuccess(){
//     this.setState({
//       email:'',
//       password:'',
//       error:'',
//       regId:'',
//       loading:false,
//     })
//   }

  render(){
      return (
        
        <View style={styles.containerForm}>

        <View style={styles.imageContainer}>
            <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
        </View>

        <Text style={styles.titleStyle}>Sign Up</Text>
        <Card>
            <CardSection> 
                <Input 
                iconName={'account-circle'}
                iconColor={'purple'}
                value={this.state.regId}
                onChangeText={text=>this.setState({regId:text})}
                placeholder={'Numero inscription'}
              
                />
            </CardSection>

            <CardSection>
            <Input 
                iconName={'email-open'}
                iconColor={'purple'}
                value={this.state.email}
                onChangeText={email=>this.setState({email})}
                placeholder={'E-mail'}
                />
            </CardSection> 

            <CardSection>
            <Input 
                iconName={'lock-plus'}
                iconColor={'purple'}
                value={this.state.password}
                onChangeText={password=>this.setState({password})}
                placeholder={'password'}
                secureTextEntry
                />
            </CardSection> 

            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            
            <CardSection>
            {this.renderButton()}
            </CardSection>

            </Card>
            <View style={styles.alreadyhaveAccount}>
              <Text style={{fontSize:11}}>Already have an account ? </Text>
              <TouchableOpacity onPress={this.navigateScreen.bind(this)}>
                     <Text style={{color:'blue',fontSize:12}}>Sign In</Text>
                </TouchableOpacity>
              
            </View>
          </View>
        

        
    );
  };
}

const styles= StyleSheet.create({
  containerForm:{
    flex:1,
    backgroundColor:'white'
  }
  ,
  imageStyle:{
    alignSelf:'flex-end',
    height:150,
    width:100,
  }
  ,
  titleStyle:{
    alignSelf:'center',
    fontSize:22,
  }
  ,
  errorTextStyle:{
    fontSize:20,
    alignSelf:'center',
    color:'red',
  }
  ,
  alreadyhaveAccount:{
    alignSelf:'center',
    flexDirection:'row'
  }
})


export default RegistrationForm;

