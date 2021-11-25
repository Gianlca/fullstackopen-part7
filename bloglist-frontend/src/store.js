import {createStore, combineReducers, applyMiddleware } from 'redux'
import  thunk  from 'redux-thunk'
import BloglistReducer from './reducers/bloglistReducer'
import NotificationReducer from './reducers/notificationReducer'
import LoginReducer from './reducers/loginReducer'
import UsersReducer from './reducers/usersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  blogLists: BloglistReducer,
  loginReducer: LoginReducer,
  notificationReducer: NotificationReducer,
  users: UsersReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store