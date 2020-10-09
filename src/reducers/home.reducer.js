import {
  LOADING, GET_REGISTRO_TRAZA, RESPONSE_PROCESAR_ARCHIVO,
} from '../types/home.type';

const INITIAL_STATE = {
  loading: false,
  traza: {},
  dataResponse: {},
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
    case RESPONSE_PROCESAR_ARCHIVO:
      return {
        ...state,
        dataResponse: action.payload,
      };
    default:
      return state;
  }
};
