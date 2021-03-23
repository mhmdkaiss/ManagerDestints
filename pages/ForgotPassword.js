import React from 'react';
import {View,Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import Input from '../components/Input'
import Spinner from '../components/Spinner';

class ForgotPassword extends React.Component {  
  state = {email:'mohamad_kaiss@hotmail.com',password:'',error:'',loading:false};
  
  navigatetoSignIn(){
      this.props.navigation.navigate('SignIn');
  }

  navigatetoForgotPass(){
    this.props.navigation.navigate('ForgotPassword');
  }

  onButtonPress(){
    const {email,password} = this.state;
    this.setState({error:'Vérifiez maintenant votre boîte de réception',loading:false});

    var auth = firebase.auth();
    
    auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });

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


  render(){
      return (
        
        <View style={styles.containerForm}>

        <View style={styles.imageContainer}>
            <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
        </View>
        
        <Text style={styles.titleStyle}>Mot de passe oublié</Text>
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


            {this.state.error?<Text style={styles.errorTextStyle}>{this.state.error}</Text>:null}
            
            <CardSection>
            {this.renderButton()}
            </CardSection>

            </Card>
            <View style={styles.noAccountSignUp}>
              <Text style={{fontSize:11}}>Retour </Text>
                <TouchableOpacity onPress={this.navigatetoSignIn.bind(this)} >
                     <Text style={{color:'blue',fontSize:12}}>Connexion</Text>
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
    fontSize:16,
    alignSelf:'center',
    color:'red',
    padding:8,
  }
  ,
  noAccountSignUp:{
    alignSelf:'center',
    flexDirection:'row',
    marginTop:20,
  }
})


export default ForgotPassword;

