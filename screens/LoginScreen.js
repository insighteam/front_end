import React, { Component } from 'react';
import {
  Text,
  View,
  Keyboard,
  Nav,
  StyleSheet,
} from 'react-native';
import { fonts, colors } from '../theme'
import Input from '../components/Input'
import Button from '../components/Button'
import Toast from 'react-native-easy-toast'

import { connect } from 'react-redux';
import { signin } from '../actions';

class LoginScreen extends React.Component {
  state = {
    id: '',
    password: '',
  }

  // componentDidUpdate(prevProps) {
  //   if(this.props.alert && this.props.alert !== prevProps.alert) {
  //     this.refs.toast.show(this.props.alert.message);
  //   }
  // }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }
  
  onPressButton = () => {
    console.log("please");
    this.props.signin(this.state.id, this.state.password);
    this.setState({
      id: '',
      password: ''
    })
    this.refs.toast.show('hello, world!');
  }

  render() {
    const { fontsLoaded } = this.state;
  // const { auth: {
  // signInErrorMessage,
  // isAuthenticating,
  // signInError,
  // showSignInConfirmationModal
  //     }} = this.props
    return (
      <View style={styles.container}>
        <Toast 
          ref='toast'
          position='top'
          opacity={0.8}
          style={{backgroundColor:'red'}}
        />
        <View style={styles.heading}>
          <Text>Moment</Text>
        </View>
        <Text style={[styles.greeting]}>
                Welcome!
        </Text>
        <Text style={[styles.greeting2]}>
                sign in to continue
        </Text>
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          <View style={styles.inputContainer}>
            <Input
              placeholder="ID"
              type='id'
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={this.onChangeText}
              value={this.state.id}
            />
            <Input
              placeholder="Password"
              type='password'
              onSubmitEditing={ Keyboard.dismiss }
              onChangeText={ this.onChangeText}
              value={ this.state.password }
              secureTextEntry
            />
          </View>
        <Button
          title='Sign In'
          onPress={() => this.props.navigation.navigate('Main')}
          // onPress={ this.onPressButton }
          disabled={ !this.state.id || !this.state.password }
          // onPress={this.signIn.bind(this)}
        />   
        <Button
          // isLoading={isAuthenticating}
          title='Sign Up'
          onPress={()=>this.props.navigation.navigate('Signup')}
          // onPress={this.signIn.bind(this)}
        />     
{/* <Text style={[styles.errorMessage, signInError && { color: 'black' }]}>Error logging in. Please try again.</Text> */}
{/* <Text style={[styles.errorMessage, signInError && { color: 'black' }]}>{signInErrorMessage}</Text> */}
        {
//           showSignInConfirmationModal && (
// <Modal>
// <View style={styles.modal}>
// <Input
//                   placeholder="Authorization Code"
//                   type='authCode'
//                   keyboardType='numeric'
//                   onChangeText={this.onChangeText}
//                   value={this.state.authCode}
//                   keyboardType='numeric'
// />
// <Button
//                   title='Confirm'
//                   onPress={this.confirm.bind(this)}
//                   isLoading={isAuthenticating}
// />
// </View>
// </Modal>
//           )
        }
      </View>
    );
  }
}
// const mapDispatchToProps = {
// dispatchConfirmUserLogin: authCode => confirmUserLogin(authCode),
// dispatchAuthenticate: (username, password) => authenticate(username, password)
// }
// const mapStateToProps = state => ({
//   auth: state.auth
// })

// export default connect(({alerts}) => ({ alert: alerts.alert}), { signin })(LoginScreen);
export default connect(null, { signin })(LoginScreen);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    flexDirection: 'row'
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: 'transparent',
    fontFamily: fonts.base
  },
  inputContainer: {
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  greeting: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: fonts.light
  },
  greeting2: {
    color: '#666',
    fontSize: 24,
    marginTop: 5,
    fontFamily: fonts.light
  }
});