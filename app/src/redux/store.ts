import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = () => {};

const middleware = applyMiddleware(thunk);
export const store = createStore(rootReducer, middleware);
