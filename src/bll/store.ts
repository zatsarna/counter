import {applyMiddleware, combineReducers, createStore} from 'redux';
import {counter2Reducer} from './counter-reducer';
import thunk from 'redux-thunk';

const rootReducer=combineReducers({
    counter: counter2Reducer
})
export type AppRootStateType=ReturnType<typeof rootReducer>
export const store=createStore(rootReducer, applyMiddleware(thunk))