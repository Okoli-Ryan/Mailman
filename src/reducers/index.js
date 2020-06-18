import loginReducer from './loginReducer'
import sendMessageReducer from './sendMessageReducer'
import hideMenuReducer from './displayMenuReducer'
import menuBarReducer from './menuBarReducer'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    loginReducer, sendMessageReducer, hideMenuReducer, menuBarReducer
})

export default allReducers
