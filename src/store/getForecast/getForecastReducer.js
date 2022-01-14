import { setForecastType, forcastIsLoadingType } from "./getForecastActions";

const initialState = {
  forecast: [],
  isLoading: false,
};

const getForecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case setForecastType: {
      return {
        ...state,
        forecast: action.payload,
      };
    }
    case forcastIsLoadingType: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default getForecastReducer;
