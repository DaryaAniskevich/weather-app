import { setFavoriteCitiesType } from "./setFavoriteCitiesActions";

const initialState = {
  favoriteCities: [],
};

const setFavoriteCitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case setFavoriteCitiesType: {
      return {
        ...state,
        favoriteCities: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default setFavoriteCitiesReducer;
