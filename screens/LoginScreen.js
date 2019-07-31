// import * as WebBrowser from 'expo-web-browser';
// import React from 'react';
// import { 
//   StyleSheet, 
//   Text,
//   View, 
//   Image,
//   Button,
//   Alert
// } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';

// class LoginScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state={
//       id: '',
//       password: ''
//     };
//   }

//   onPressButton = () => {
//     // this.props.signin(this.state.email, this.state.password)
//     this.setState({
//       id: '',
//       password: ''
//     })
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.logo}>
//           <Text>Moment</Text>
//         </View>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             underlineColorAndroid='transparent'
//             placeholder="아이디"
//             onChangeText={(id) => this.setState({id})}
//             value={this.state.id}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="비밀번호"
//             secureTextEntry={true}
//             underlineColorAndroid='transparent'
//             onChangeText={(password) => this.setState({password})}
//             value={this.state.password}
//           />
//           <Button
//             style={styles.button}
//             onPress={this.onPressButton}
//             disabled={!this.state.id || !this.state.password}
//             title="로그인"
//           />
//         </View>
//         <View style={styles.signinContainer}>
//           <Text style={styles.signinText}>계정이 없으신가요?</Text>
//           <Text 
//             style={styles.signinText2}
//             onPress={()=>this.props.navigation.navigate('Signup')}>가입하기</Text>
//         </View>
//       </View>
//     );
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   logo: {
//     flex: 2,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: 30
//   },
//   inputContainer: {
//     flex: 3,
//     paddingLeft: 20,
//     paddingRight: 20,
//     borderBottomWidth: 0.5,
//     borderBottomColor: 'lightgray'
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: 'lightgray',
//     padding: 3,
//     paddingLeft: 10,
//     backgroundColor: '#f2f2f2',
//     textDecorationColor: 'gray',
//     marginBottom: 10,
//   },
//   passwordText: {
//     textAlign: 'right',
//     color: 'steelblue',
//     fontSize: 10,
//     marginBottom: 10
//   },
//   button: {
//     padding: 5,
//     marginBottom: 50
//   },
//   signinContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   signinText: {
//     color: 'gray',
//     fontSize: 10,
//     marginRight: 10,
//     textAlign: 'center'  
//   },
//   signinText2: {
//     color: 'steelblue',
//     fontSize: 10,
//     textAlign: 'center'
//   }
// });

// export default LoginScreen;

import React, { Component } from 'react';
import {
Platform,
Text,
View,
TextInput,
StyleSheet,
TouchableOpacity,
ActivityIndicator,
Image,
Modal
} from 'react-native';
// import { Auth } from 'aws-amplify'
// import { connect } from 'react-redux'
// import { authenticate, confirmUserLogin } from '../actions'
import { fonts, colors } from '../theme'
import Input from '../components/Input'
import Button from '../components/Button'
class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
    accessCode: ''
  }
onChangeText = (key, value) => {
this.setState({
      [key]: value
    })
  }
// signIn() {
// const { username, password } = this.state
// this.props.dispatchAuthenticate(username, password)
//   }
// confirm() {
// const { authCode } = this.state
// this.props.dispatchConfirmUserLogin(authCode)
//   }
render() {
const { fontsLoaded } = this.state
// const { auth: {
// signInErrorMessage,
// isAuthenticating,
// signInError,
// showSignInConfirmationModal
//     }} = this.props
return (
<View style={styles.container}>
<View style={styles.heading}>
  <Text>Moment</Text>
{/* <Image
            source={require('../assets/shape.png')}
            style={styles.headingImage}
            resizeMode="contain"
/> */}
</View>
<Text style={[styles.greeting]}>
          Welcome back,
</Text>
<Text style={[styles.greeting2]}>
          sign in to continue
</Text>
<View style={styles.inputContainer}>
<Input
            placeholder="User Name"
            type='username'
            onChangeText={this.onChangeText}
            value={this.state.username}
/>
<Input
            placeholder="Password"
            type='password'
            onChangeText={this.onChangeText}
            value={this.state.password}
            secureTextEntry
/>
</View>
<Button
          // isLoading={isAuthenticating}
          title='Sign In'

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

export default LoginScreen;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    flexDirection: 'row'
  },
  headingImage: {
    width: 38,
    height: 38
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