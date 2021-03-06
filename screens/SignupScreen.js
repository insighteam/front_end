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

import { fonts, colors } from '../theme'
import Toast from 'react-native-easy-toast'

import Input from '../components/Input'
import Button from '../components/Button'

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      id: '',
      password: '',
      username: '',
      address: '',
      email: ''
    };
  }

  async signup(id, password, name, email, address) {
    await fetch('http://10.250.72.159:3003/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'id': id,
        'password': password,
        "name": name,
        "email": email,
        "address": address
      }),
    })
    .then((response) => {
      return response.json()
    })
    .then(async(responseData) => {
      if(responseData.code && responseData.code == 200) {
        this.props.navigation.navigate('Login');
        this.refs.toast.show('회원가입 성공');
      }
    })
    .catch(function(err) {
      this.refs.toast.show(err);
    })
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  onPressButton = () => {
    this.signup(this.state.id, this.state.password, this.state.username, this.state.email, this.state.address);
    this.setState({
      id: '',
      password: '',
      username: '',
      email: '',
      address: ''
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
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={{color: colors.temp2}}>Moment</Text>
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
              placeholderTextColor={colors.temp1}
            />
          </View>
          <Input
            value={this.state.id}
            placeholder="ID"
            type='id'
            onChangeText={this.onChangeText}
            placeholderTextColor={colors.temp1}
          />
          <Input
            value={this.state.password}
            placeholder="Password"
            secureTextEntry
            type='password'
            onChangeText={this.onChangeText}
            placeholderTextColor={colors.temp1}
          />
          <Input
            value={this.state.email}
            placeholder="email"
            type='email'
            onChangeText={this.onChangeText}
            placeholderTextColor={colors.temp1}
          />
          <Input
            value={this.state.address}
            placeholder="address"
            type='address'
            onChangeText={this.onChangeText}
            placeholderTextColor={colors.temp1}
          />
        </View>
        <Button
          title='Sign Up'
          onPress={this.onPressButton}
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
    fontSize: 24,
    color: colors.secondary
  },
  greeting2: {
    fontFamily: fonts.light,
    color: colors.temp1,
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