console.log(99999);

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from '../../share/store/reducers'

export default () => createStore(reducer, {}, applyMiddleware(thunk));
