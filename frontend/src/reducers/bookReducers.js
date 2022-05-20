import {
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL
} from "../constants/bookConstants"

export const bookListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_LIST_REQUEST:
      return { loading: true };
    case BOOK_LIST_SUCCESS:
      return { loading: false, books: action.payload };
    case BOOK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_CREATE_REQUEST:
      return { loading: true };
    case BOOK_CREATE_SUCCESS:
      return { loading: false, success: true };
    case BOOK_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};






