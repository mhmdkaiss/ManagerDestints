import React from 'react';
import {View,Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import Input from '../components/Input'
import Spinner from '../components/Spinner';

class ForgotPassword extends React.Component {  
  state = {email:'',password:'',regId:'',error:'',loading:false,iconType:'Feather'};
  
  navigatetoSignIn(){
      this.props.navigation.navigate('SignIn');
  }

  navigatetoForgotPass(){
    this.props.navigation.navigate('ForgotPassword');
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

  renderButton(){
    if(this.state.loading){
      return <Spinner/>
    }
    
      return (
        <Button 
            Label={'SEND RESET LINK'}
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
        
        <Text style={styles.titleStyle}>Forgot Password?</Text>
        <Card>
        <CardSection>
            <Input 
                iconName={'email-open'}
                iconColor={'purple'}
                value={this.state.email}
                onChangeText={email=>this.setState({email})}
                placeholder={'E-mail'}
                />
            </CardSection> 


            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            
            <CardSection>
            {this.renderButton()}
            </CardSection>

            </Card>
            <View style={styles.noAccountSignUp}>
              <Text style={{fontSize:11}}>Back to </Text>
                <TouchableOpacity onPress={this.navigatetoSignIn.bind(this)} >
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
    color:'red'
  }
  ,
  noAccountSignUp:{
    alignSelf:'center',
    flexDirection:'row',
    marginTop:20,
  }
})


export default ForgotPassword;

