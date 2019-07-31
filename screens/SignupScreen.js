// import React from 'react';
// import { View, Text, Button, StyleSheet, Alert, ToastAndroid } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
// // import { connect } from 'react-redux';

// // import { checkEmail } from '../../actions';

// class SignupScreen extends React.Component {
//   state = {
//     id: ''
//   }

//   handleID = (text) => {
//     this.setState({ id: text })
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.topContainer}>
//           <Text style={styles.emailText}>아이디</Text>
//           <TextInput
//             style={styles.input}
//             underlineColorAndroid='transparent'
//             placeholder=" 아이디"
//             value={this.state.id}
//             onChangeText={this.handleID}
//           />
//           <Button
//             style={styles.button}
//             disabled={!this.state.id}
//             // onPress={()=>this.props.navigation.navigate('CheckPw', { email : this.state.email})}
//             title="다음"
//           />
//         </View>
//         <View style={styles.loginContainer}>
//           <Text style={styles.loginText}>이미 계정이 있으신가요?</Text>
//           <Text 
//             style={styles.loginText2}
//             onPress={()=>this.props.navigation.navigate('Login')}>로그인</Text>
//         </View>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'white',
//     paddingTop: Expo.Constants.statusBarHeight,
//   },
//   topContainer: {
//     flex: 0.95,
//     paddingTop: 20, 
//     paddingLeft: 20,
//     paddingRight: 20,
//     borderBottomWidth: 0.5,
//     borderBottomColor: 'lightgray'
//   },
//   emailText: {
//     fontSize: 20,
//     textAlign: 'center',
//     marginBottom: 20
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 5,
//     width: '100%',
//     height: 33,
//     borderColor: 'lightgray',
//     backgroundColor: '#f2f2f2',
//     textDecorationColor: 'gray',
//     marginBottom: 20
//   },
//   button: {
//     width: '100%',
//     marginTop: 50,
//     padding: 5
//   },
//   loginContainer: {
//     flex: 0.05,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   loginText: {
//     color: 'gray',
//     fontSize: 10,
//     marginRight: 10,
//     textAlign: 'center'  
//   },
//   loginText2: {
//     color: 'steelblue',
//     fontSize: 10,
//     textAlign: 'center'
//   }
// })

// export default SignupScreen;

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal
} from 'react-native';

// import { Auth } from 'aws-amplify'
// import { connect } from 'react-redux'

import { fonts, colors } from '../theme'
// import { createUser, confirmUserSignUp } from '../actions'

import Input from '../components/Input'
import Button from '../components/Button'

const initialState = {
  username: '',
  password: '',
  id: '',
  phone_number: '',
  authCode: ''
}

class SignupScreen extends React.Component {
  state = initialState

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  signUp() {
    const { username, password, id, phone_number } = this.state
    this.props.dispatchCreateUser(username, password, id, phone_number)
  }

  confirm() {
    const { authCode, username } = this.state
    this.props.dispatchConfirmUser(username, authCode)
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { showSignUpConfirmationModal }} = nextProps
    if (!showSignUpConfirmationModal && this.props.auth.showSignUpConfirmationModal) {
      this.setState(initialState)
    }
  }

  render() {
    // const { auth: {
    //   showSignUpConfirmationModal,
    //   isAuthenticating,
    //   signUpError,
    //   signUpErrorMessage
    // }} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text>Heading</Text>
        </View>
        <Text style={styles.greeting}>
          Welcome,
        </Text>
        <Text style={styles.greeting2}>
          sign up to continue
        </Text>
        <View style={styles.inputContainer}>
          <View>
            <Input
              value={this.state.username}
              placeholder="User Name"
              type='username'
              onChangeText={this.onChangeText}
            />
            {/* < */}
          </View>
          <Input
            value={this.state.id}
            placeholder="ID"
            type='id'
            onChangeText={this.onChangeText}
          />
          <Input
            value={this.state.password}
            placeholder="Password"
            secureTextEntry
            type='password'
            onChangeText={this.onChangeText}
          />
          <Input
            value={this.state.password}
            placeholder="Password Check"
            secureTextEntry
            type='password'
            onChangeText={this.onChangeText}
          />
        </View>
        <Button
          title='Sign Up'
          onPress={this.signUp.bind(this)}
        //   isLoading={isAuthenticating}
        />
        {/* <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>Error logging in. Please try again.</Text>
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>{signUpErrorMessage}</Text> */}
        {
        //   showSignUpConfirmationModal && (
        //     <Modal>
        //       <View style={styles.modal}>
        //         <Input
        //           placeholder="Authorization Code"
        //           type='authCode'
        //           keyboardType='numeric'
        //           onChangeText={this.onChangeText}
        //           value={this.state.authCode}
        //           keyboardType='numeric'
        //         />
        //         <Button
        //           title='Confirm'
        //           onPress={this.confirm.bind(this)}
        //         //   isLoading={isAuthenticating}
        //         />
        //       </View>
        //     </Modal>
        //   )
        }
      </View>
    );
  }
}

// const mapStateToProps = state => ({
//   auth: state.auth
// })

// const mapDispatchToProps = {
//   dispatchConfirmUser: (username, authCode) => confirmUserSignUp(username, authCode),
//   dispatchCreateUser: (username, password, email, phone_number) => createUser(username, password, email, phone_number)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    fontFamily: fonts.light,
    fontSize: 24
  },
  greeting2: {
    fontFamily: fonts.light,
    color: '#666',
    fontSize: 24,
    marginTop: 5
  },
  heading: {
    flexDirection: 'row'
  },
  headingImage: {
    width: 38,
    height: 38
  },
  errorMessage: {
    fontFamily: fonts.base,
    fontSize: 12,
    marginTop: 10,
    color: 'transparent'
  }
});

export default SignupScreen;