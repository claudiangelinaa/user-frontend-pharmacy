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
  initProducts: [],
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
      
   case 'INIT_PRODUCTS':
      return {
      ...state,
      initProducts: action.payload
      }

    default:
      return {
        ...state,
      };
  }
};

// const initialState = []
  
//   export default function productsReducer(state = initialState, action) {
//     switch(action.type) {
//       case 'INIT_PRODUCTS':
//         return action.payload
        
//       default:
//         return state;
//     }
//   }
