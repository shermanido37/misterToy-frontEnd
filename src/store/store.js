import { createStore, combineReducers} from 'redux'
import {userReducer} from './reducers/user.reducer.js'

const rootReducer = combineReducers({
    // todoModule: todoReducer,
    userModule: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store