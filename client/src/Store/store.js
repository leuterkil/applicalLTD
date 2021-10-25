import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Reducers/root';

export default (preloadedState) =>
  createStore(reducer, preloadedState, applyMiddleware(thunk));
