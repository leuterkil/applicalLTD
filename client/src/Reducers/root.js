import { combineReducers } from 'redux';
import errors from './errors/error';
import session from './session/session';

export default combineReducers({
  session,
  errors,
});
console.log(session);
