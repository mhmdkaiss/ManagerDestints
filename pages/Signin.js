import React from 'react';
import {View,Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import Input from '../components/Input'
import Spinner from '../components/Spinner';
import CheckBox from '@react-native-community/checkbox';

class SignIn extends React.Component {  
  state = {email:'jane.doe@example.com',password:'12345678',error:'',loading:false,toggleCheckBox:null};

  navigatetoSignUp(){
      this.props.navigation.navigate('SignUp');
      this.onLoginSuccess();
  }

  navigatetoForgotPass(){
    this.props.navigation.navigate('ForgotPassword');
  }

  onButtonPress(){
        const {email,password} = this.state;
        this.setState({loading:true});

      auth().signInWithEmailAndPassword(email,password)
        .then(this.onLoginSuccess.bind(this))
        .catch(()=>{
          this.setState({error:'Signing In failed!',loading:false})
        });
      ;
  }

  onLoginSuccess(){
    const {toggleCheckBox} = state;
    console.log(toggleCheckBox);
    if(toggleCheckBox==false){
      this.setState({
        email:'',
        password:'',
        error:'',
        regId:'',
        loading:false,
      })
    }
    else if(toggleCheckBox==true){
      this.setState({
        email:this.state.email,
        password:this.state.password,
        error:'',
        regId:'',
        loading:false,
      })
    }
    
  }

  renderButton(){
    if(this.state.loading){
      return <Spinner/>
    }
    
      return (
        <Button 
            Label={'LOG IN'}
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
        
        <Text style={styles.titleStyle}>Connexion</Text>
        <Card>
            <CardSection> 
                <Input 
                iconName={'account-circle'}
                iconColor={'purple'}
                value={this.state.email}
                onChangeText={text=>this.setState({email:text})}
                placeholder={'Numero inscription'}
              
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

            <View style={styles.forgotPasswordContainer}>
              <View style={{flex:1,flexDirection:'row'}}>
              <CheckBox
              value={this.state.toggleCheckBox}
              onValueChange={(newValue) => this.setState({toggleCheckBox:newValue}) }
              // onChange={console.log(this.state.toggleCheckBox)}
              />
                <Text style={{fontSize:12,paddingTop:7}}>Se souvenir de moi</Text>
              </View>
                <TouchableOpacity onPress={this.navigatetoForgotPass.bind(this)} >
                     <Text style={{color:'blue',fontSize:12,paddingTop:7}}>mot de passe oublié?</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            
            <CardSection>
            {this.renderButton()}
            </CardSection>

            </Card>
            <View style={styles.noAccountSignUp}>
                <TouchableOpacity onPress={this.navigatetoSignUp.bind(this)} >
                     <Text style={{color:'blue',fontSize:12}}>Créer un compte</Text>
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
  forgotPasswordContainer:{
    flexDirection:'row',
    marginTop:10,
  }
  ,
  errorTextStyle:{
    fontSize:15,
    alignSelf:'center',
    color:'red'
  }
  ,
  noAccountSignUp:{
    alignSelf:'center',
    flexDirection:'row',
  }
})


export default SignIn;

