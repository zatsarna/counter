import {applyMiddleware, combineReducers, createStore} from 'redux';

import thunk from 'redux-thunk';
import {counter2Reducer} from './counter-reducer2';
import {counter1Reducer} from './counter-reducer1';
import {loadState, saveState} from '../utils/local-storage-utils';

const rootReducer=combineReducers({
    counter: counter2Reducer,
    counter1: counter1Reducer
})
export type AppRootStateType=ReturnType<typeof rootReducer>

export const store=createStore(rootReducer, loadState(), applyMiddleware(thunk))
store.subscribe(()=>{
    saveState(store.getState())

})