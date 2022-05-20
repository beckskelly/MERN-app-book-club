import axios from "axios"
import {
    ALL_BOOK_LIST_REQUEST,
    ALL_BOOK_LIST_SUCCESS,
    ALL_BOOK_LIST_FAIL,
} from "../constants/allbookConstants";


export const listAllBooks = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ALL_BOOK_LIST_REQUEST,
      });
  
      const { data } = await axios.get(`/api/books/books`);
  
      dispatch({
        type: ALL_BOOK_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ALL_BOOK_LIST_FAIL,
        payload: message,
      });
    }
  };
  