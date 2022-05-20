import { 
    USER_LOGIN_FAIL, 
    USER_LOGOUT, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_REGISTRATION_REQUEST, 
    USER_REGISTRATION_SUCCESS, 
    USER_REGISTRATION_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    ADD_TO_FAVS_REQUEST,
    ADD_TO_FAVS_SUCCESS,
    ADD_TO_FAVS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from "../constants/userConstants"

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: true, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {};
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTRATION_REQUEST:
            return { loading: true }
        case USER_REGISTRATION_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTRATION_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state;
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true };
      case USER_UPDATE_SUCCESS:
        return { loading: false, userInfo: action.payload, success: true };
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };

  export const addToFavsUserReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_TO_FAVS_REQUEST:
        return { loading: true };
      case ADD_TO_FAVS_SUCCESS:
        return { loading: false, userInfo: action.payload, success: true };
      case ADD_TO_FAVS_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };


  export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_USER_REQUEST:
        return { loading: true };
      case DELETE_USER_SUCCESS:
        return { loading: false, userInfo: action.payload, success: true };
      case DELETE_USER_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };