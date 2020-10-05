import {
  LOADING, GET_REGISTRO_TRAZA
} from '../types/home.type';

const INITIAL_STATE = {
  loading: false,
  traza: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_REGISTRO_TRAZA:
      return {
        ...state,
        traza: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
