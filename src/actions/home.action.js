import axios from 'axios';
import {
  LOADING,
  GET_REGISTRO_TRAZA,
  RESPONSE_PROCESAR_ARCHIVO,
} from '../types/home.type';
import { API_MUDANZAS } from '../config/config';

export const procesarArchivoAction = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.post(`${API_MUDANZAS}/api/procesomudanza/Procesar`, data);
    debugger;
    if (response.status === 200) {
      dispatch({
        type: RESPONSE_PROCESAR_ARCHIVO,
        payload: response.data,
      });
      dispatch(getDataTrazasAction());
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        console.error(error.response.data);
      } else if (error.response.status === 500) {
        console.error('Error en el servidor.');
      }
    }
    console.error(`Error al procesar archivo de análisis : ${error.message}`);
  }
  dispatch({ type: LOADING, payload: false });
};

export const getDataTrazasAction = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.get(`${API_MUDANZAS}/api/RegistroTraza/ObtenerDataProcesada`);
    const { data } = response;
    dispatch({
      type: GET_REGISTRO_TRAZA,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
  dispatch({ type: LOADING, payload: false });
};
