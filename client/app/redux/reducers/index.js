import {combineReducers} from 'redux';

import adverts from './adverts';
import messages from './messages';
import users from './users';

export default combineReducers({
  adverts,
  messages,
  users,
});
