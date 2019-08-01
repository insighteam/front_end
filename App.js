import React from 'react';
import { 
  Platform, 
  StatusBar, 
  View 
} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import NavigationService from './utils/navigation-service';
import reducers from './reducers';

const composeStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={composeStoreWithMiddleware(reducers)}>
        <AppNavigator ref={navigationRef => {
          NavigationService.setTopLevelNavigator(navigationRef);
        }} />
      </Provider>
    );
  }
}