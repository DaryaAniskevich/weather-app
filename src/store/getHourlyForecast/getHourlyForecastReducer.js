import {
  setHourlyForecastType,
  hourlyForecastIsLoadingType,
  cityTimezoneOffsetType,
} from "./getHourlyForecastActions";

const initialState = {
  isLoading: false,
  timezoneOffset: "",
  forecast: [],
};

const getHourlyForecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case setHourlyForecastType: {
      return {
        ...state,
        forecast: action.payload,
      };
    }
    case hourlyForecastIsLoadingType: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case cityTimezoneOffsetType: {
      return {
        ...state,
        timezoneOffset: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default getHourlyForecastReducer;
