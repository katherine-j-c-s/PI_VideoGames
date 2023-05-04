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
  } from "./actions/types";
  
  const initialState = {
    newGames: [],
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
          newGames: [...state.newGames, payload],
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
      case RESETGENRES:
        let alternG = state.genresOrigin
        return {
          ...state,
          genres: alternG,
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
        if (payload[1] ==="genres") {
          const newOrder = state.genres.sort((a, b) => {
            if (a.rating > b.rating) {
              return "Ascendente" === payload[0] ? 1 : -1;
            }
            if (a.rating < b.rating) {
              return "Descendente" === payload[0] ? 1 : -1;
            }
            return 0;
          });
          return {
            ...state,
            genres: newOrder,
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
  