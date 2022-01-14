import { combineReducers } from "redux";
import getForecastReducer from "./getForecast/getForecastReducer";
import setCityReducer from "./setCity/setCityReducer";
import getHourlyForecastReducer from "./getHourlyForecast/getHourlyForecastReducer";
import setFavoriteCitiesReducer from "./setFavoriteCities/setFavoriteCitiesReducer";

const rootReducer = combineReducers({
  setCity: setCityReducer,
  getForecast: getForecastReducer,
  getHourlyForecast: getHourlyForecastReducer,
  setFavoriteCities: setFavoriteCitiesReducer,
});

export default rootReducer;
