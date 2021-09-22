import {
  LOAD_PRODUCTS,
  LOADING_PRODUCTS,
  LOAD_DETAIL_PRODUCT,
  LOADING_DETAIL_PRODUCT,
  ADD_PRODUCTS,
} from "../Actions/actionType";

const initialState = {
  products: [],
  product: [],
  addProducts: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }

    case LOADING_PRODUCTS: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case LOAD_DETAIL_PRODUCT: {
      return {
        ...state,
        product: action.payload,
      };
    }

    case LOADING_DETAIL_PRODUCT: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case ADD_PRODUCTS: {
      return {
        ...state,
        addProducts: action.payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
