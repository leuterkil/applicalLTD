import { RECEIVE_CURRENT_USER } from '../../Actions/session';
import { CLEAR_ERRORS, RECEIVE_ERRORS } from '../../Actions/error';
export default (state = '', { message, type }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_ERRORS:
      return message;
    case RECEIVE_CURRENT_USER:
    case CLEAR_ERRORS:
      return '';
    default:
      return state;
  }
};
