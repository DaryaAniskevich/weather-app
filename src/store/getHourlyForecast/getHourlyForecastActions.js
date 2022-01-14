export const setHourlyForecastType = "SET_HOURLY_FORECAST";
export const hourlyForecastIsLoadingType = "HOURLY_FORECAST_IS_LOADING";
export const cityTimezoneOffsetType = "CITY_TIMEZONE_OFFSET";
const API_KEY = "58b6f7c78582bffab3936dac99c31b25";

export const hourlyForecastIsLoading = (bool) => ({
  type: hourlyForecastIsLoadingType,
  payload: bool,
});

export const setHourlyForecast = (forecast) => ({
  type: setHourlyForecastType,
  payload: forecast,
});

export const setCityTimeZone = (timezoneOffset) => ({
  type: cityTimezoneOffsetType,
  payload: timezoneOffset,
});

export const getHourlyForecastDate = (city) => async (dispatch) => {
  dispatch(hourlyForecastIsLoading(true));
  const forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  ).then((result) => result.json());

  dispatch(setHourlyForecast(forecast.list));
  dispatch(setCityTimeZone(forecast.city.timezone));
  dispatch(hourlyForecastIsLoading(false));
};
