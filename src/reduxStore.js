import "regenerator-runtime/runtime";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import dashboard from './dashboard/reducers/dashboard'


const appReducer = combineReducers({
    dashboard
  });

  const reducer = (state, action) => {
    return appReducer(state, action);
  };
  
  
  
  const getMiddleware = () => {
      return applyMiddleware(thunk, createLogger());   
    
  };

  const composeEnhancers = compose;
const createStoreWithMiddleware = composeEnhancers(getMiddleware());
  
  
  const reduxStore = createStoreWithMiddleware(createStore)(reducer, {});
  
  export default reduxStore;