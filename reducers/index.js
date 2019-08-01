import { combineReducers } from 'redux';

function user(state = [], action) {
    switch (action.type) {
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: user
});
  
export default rootReducer;