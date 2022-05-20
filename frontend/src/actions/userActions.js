import { 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTRATION_FAIL, 
    USER_REGISTRATION_REQUEST, 
    USER_REGISTRATION_SUCCESS,
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
import axios from 'axios'

export const login = ( email, password ) => async (dispatch) => {
    // using redux tongue. enables nesting of functions
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                "Content-type":"application/json"
            }
        }

        const { data } = await axios.post(
            './api/users/login',
            {
                email,
                password,
            },
            config
        )

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT })
}


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTRATION_REQUEST })

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
    
    const { data } = await axios.post(
        "/api/users",
        { name, email, password },
        config
    );

    dispatch({ type: USER_REGISTRATION_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTRATION_FAIL,
            payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

// (user) is an object and its passed to the backend
export const updateProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST }); // sets the loading to true
  
      const {
        userLogin: { userInfo },
      } = getState(); // takes userlogin info from get state so it can be verified and check auth of user
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post("/api/users/profile", user, config);
  
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data)); // get all the data and put into localstorage
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
}

export const addToFavsUser = (title) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_TO_FAVS_REQUEST }); // sets the loading to true
  
    const {
      userLogin: { userInfo },
    } = getState();
  
    const config = {
      // method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        // Authorization : localStorage.getItem('token'),
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        title
      })
    };

      const { data } = await axios.patch(`/api/users/addfavourites`, config);
      
      dispatch({ type: ADD_TO_FAVS_SUCCESS, payload: data });

      // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
    } catch (error) {
      dispatch({
        type: ADD_TO_FAVS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
}

export const deleteProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST }); // sets the loading to true

    const {
      userLogin: { userInfo },
    } = getState(); // takes userlogin info from get state so it can be verified and check auth of user

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete("/api/users/profile", user, config);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });

    localStorage.setItem(""); // get all the data and put into localstorage
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

