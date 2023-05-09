import {
    ADD_GAME,
    GET_GAMES,
    GET_GENRES,
    GET_PLATFORMS,
    SEARCH_GAME,
    ORDER_RANK,
    ORDER_ALFAB,
    RESETGAMES,
    RESETGENRES,
    NEXT_PAGE,
    PREV_PAGE,
    HANDLE_NUMBER
  } from "./types";
  
  import axios from "axios";
  
  export function addGame(game) {
    return async function (dispatch) {
        try { 
          const {data} = await axios.post(`http://localhost:3001/videogames`,game);
          return dispatch({
            type: ADD_GAME,
            payload: data,
          });
        } catch (error) {
          console.log("game error ===>", error);
        }
      };
  }
  export function getGames() {
    return async function (dispatch) {
        try {
          const {data} = await axios.get(
            `http://localhost:3001/videogames`);
            return dispatch({
            type: GET_GAMES,
            payload: data,
          });
        } catch (error) {
          console.log("games not found ===>", error);
        }
      };
  }
  export function getGenres() {
    return async function (dispatch) {
        try {
          const {data} = await axios.get(
            `http://localhost:3001/genres`);
          return dispatch({
            type: GET_GENRES,
            payload: data,
          });
        } catch (error) {
          console.log("genres not found ===>", error);
        }
      };
  }
  export function getPlatforms() {
    return async function (dispatch) {
        try {
          const {data} = await axios.get(
            `http://localhost:3001/platforms`);
          return dispatch({
            type: GET_PLATFORMS,
            payload: data,
          });
        } catch (error) {
          console.log("platforms not found ===>", error);
        }
      };
  }
  export function prevPage() {
    return {
      type: PREV_PAGE,
    };
  }
  
  export function nextPage() {
    return {
      type: NEXT_PAGE,
    };
  }

  export function handleNumber(num) {
    return {
      type: HANDLE_NUMBER,
      payload: num,
    };
  }

  export function searchGame(name) {
    return async function (dispatch) {
        try {
          const {data} = await axios.get(
            `http://localhost:3001/videogames?search=${name}`);
          return dispatch({
            type: SEARCH_GAME,
            payload: data,
          });
        } catch (error) {
          console.log("game not found ===>", error);
        }
      };
  }

  export function orderByRank(order,type) {
    // A: ascendente o D: descendente
    // el type es lo que se va a ordenar como el genres, games
    return {
      type: ORDER_RANK,
      payload: [order,type],
    };
  }
  export function orderByAlfb() {
    // A: ascendente o D: descendente
    // el type es lo que se va a ordenar como el genres, games
    return {
      type: ORDER_ALFAB,
    };
  }
  export function resetGames() {
    // el type es lo que se va a ordenar como el genres, games
    return {
      type: RESETGAMES,
    };
  }
  /*
    filterCards: esta función recibe por parámetro un gender. 
    Debe retornar una action con el type igual a "FILTER" y el payload será igual al parámetro recibido.
  
  orderCards: esta función recibe por parámetro un orden (será: A: ascendente o D: descendente). 
  Debe retornar una action con el type igual a "ORDER" y el payload será igual al parámetro recibido.
    */
  