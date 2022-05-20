import axios from "axios"
import {
  BOOK_LIST_FAIL,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_REQUEST,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL
} from "../constants/bookConstants";

export const listBooks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

  
    const { data } = await axios.get(`/api/users/addfavourites`, config);


    dispatch({
      type: BOOK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOK_LIST_FAIL,
      payload: message,
    });
  }
};



export const createBookAction = (title, author) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BOOK_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/mybooks/create`,
      { title, author },
      config
    );

    dispatch({
      type: BOOK_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOK_CREATE_FAIL,
      payload: message,
    });
  }
};