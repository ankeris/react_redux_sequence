import {createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import {valuesReducer, VALUES_EPICS} from './values';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || null;
const epicMiddleware = createEpicMiddleware();

export default createStore(
    combineReducers({
        values: valuesReducer,
    }),
    composeEnhancers ? composeEnhancers(applyMiddleware(epicMiddleware)) : applyMiddleware(epicMiddleware)
)

epicMiddleware.run(VALUES_EPICS);