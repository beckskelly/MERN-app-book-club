import {
    ALL_BOOK_LIST_REQUEST,
    ALL_BOOK_LIST_SUCCESS,
    ALL_BOOK_LIST_FAIL,
} from "../constants/allbookConstants";
  
  export const allbookListReducer = (state = { allbooks: [] }, action) => {
    switch (action.type) {
      case ALL_BOOK_LIST_REQUEST:
        return { loading: true };
      case ALL_BOOK_LIST_SUCCESS:
        return { loading: false, books: action.payload };
      case ALL_BOOK_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };