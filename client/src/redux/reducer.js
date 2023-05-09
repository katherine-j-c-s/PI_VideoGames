import {
    ADD_GAME,
    GET_GAMES,
    GET_GENRES,
    GET_PLATFORMS,
    SEARCH_GAME,
    ORDER_RANK,
    ORDER_ALFAB,
    RESETGAMES,
    NEXT_PAGE,
    PREV_PAGE,
    HANDLE_NUMBER
  } from "./actions/types";
  
  const initialState = {
    numPage: 1,
    genres: [],
    games: [],
    gamesFound: [],
    platforms: [],
    gamesOrigin: [],
    genresOrigin: [],
  };
  
  export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
      case ADD_GAME:
        return {
          ...state,
          games: [...state.games ,payload],
        };
      case SEARCH_GAME:
        return {
          ...state,
          gamesFound: payload,
        };
      case HANDLE_NUMBER:
        return {
          ...state,
          numPage: payload,
        };
      case NEXT_PAGE:
        return {
          ...state,
          numPage: state.numPage + 1,
        };
      case PREV_PAGE:
        return {
          ...state,
          numPage: state.numPage - 1,
        };
      case GET_GAMES:
        return {
          ...state,
          games: payload,
          gamesOrigin: payload
        };
      case GET_GENRES:
        return {
          ...state,
          genres: payload,
          genresOrigin: payload
        };
      case GET_PLATFORMS:
        return {
          ...state,
          platforms: payload,
        };
      case RESETGAMES:
        let altern = [...state.gamesOrigin]
        return {
          ...state,
          games: altern
        };
      case ORDER_RANK:
        if (payload[1] ==="games") {
          const newOrder = state.games.sort((a, b) => {
            if (a.rating > b.rating) {
              return "Lowest" === payload[0] ? 1 : -1;
            }
            if (a.rating < b.rating) {
              return "Highest" === payload[0] ? 1 : -1;
            }
            return 0;
          });
          return {
            ...state,
            games: newOrder,
          };
        }
        break
      case ORDER_ALFAB:
        const newOrder = state.games.sort((a, b) =>
        a.name.localeCompare(b.name));
        return {
          ...state,
          games: newOrder,
        };
      default:
        return state;
    }
  }
  