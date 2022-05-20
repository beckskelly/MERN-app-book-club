import { createStore, combineReducers, applyMiddleware } from 'redux'
// createStore - creates our store
// combineReducers - help combine all the reducers into one single reducer
// applyMiddleware - help add middleware to the application
import thunk from 'redux-thunk' // middleware
import { composeWithDevTools } from 'redux-devtools-extension'
import { addToFavsUserReducer, userLoginReducer, userRegisterReducer, userUpdateReducer, deleteUserReducer } from './reducers/userReducers'
import { bookCreateReducer, bookListReducer } from './reducers/bookReducers'
import { allbookListReducer } from './reducers/allbookReducers'

const reducer = combineReducers ({
// this will contain our reducers
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    bookList: bookListReducer,
    bookCreate: bookCreateReducer,
    allbookList: allbookListReducer,
    userUpdate: userUpdateReducer,
    addToFavs: addToFavsUserReducer,
    deleteUser: deleteUserReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin:{ userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;