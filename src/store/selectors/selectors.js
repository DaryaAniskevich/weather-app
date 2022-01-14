export const getForecastSelector = (state) => state.getForecast.forecast;
export const forecastIsLoadingSelector = (state) => state.getForecast.isLoading;
export const getHourlyForecastSelector = (state) =>
  state.getHourlyForecast.forecast;
export const hourlyForecastIsLoadingSelector = (state) =>
  state.getHourlyForecast.isLoading;
export const cityTimezoneOffsetSelector = (state) =>
  state.getHourlyForecast.timezoneOffset;
export const setCitySelector = (state) => state.setCity.city;
export const setFavoriteCitiesSelector = (state) =>
  state.setFavoriteCities.favoriteCities;
