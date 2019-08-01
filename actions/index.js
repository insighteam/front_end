import axios from 'axios';
import qs from 'qs';
import { AsyncStorage } from 'react-native';
import { Config } from '../config';
import NavigationService from '../utils/navigation-service';

const statusCode = require('../utils/status-code');

export function signup(id, password, name, email, address) {
    return async dispatch => {
      try {
        const response = await axios.post(`${Config.server}/auth/signup`,
        qs.stringify({
          id: id,
          password: password,
          name: name,
          email: email,
          address: address
        }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        if (response.status == statusCode.OK) {
          NavigationService.navigate('Login');
        }
      } catch (err) {
        if (err.response.status == statusCode.DB_ERROR || err.response.status == statusCode.BAD_REQUEST) {
          console.log(err);
        }      
      }
    }
  }
  
  export function signin(id, password) {
    return async dispatch => {
      try {
        console.log("here");
        this.refs.toast.show('hello, world!', DURATION.FOREVER);
        const response = await axios.post(`${Config.server}/auth/signin`,
          qs.stringify({
            id: id,
            password: password,
          }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        if (response.status == statusCode.OK) {
          await AsyncStorage.setItem('user', JSON.stringify(user.data));
          NavigationService.navigate('Main');
        }
      } catch (err) {
        console.log(err);
      }
    };
  }