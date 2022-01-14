export const forcastIsLoadingType = "FORECAST_IS_LOADING";
export const setForecastType = "SET_FORECAST";
const API_KEY = "58b6f7c78582bffab3936dac99c31b25";

export const forecastIsLoading = (bool) => ({
  type: forcastIsLoadingType,
  payload: bool,
});

export const setForecast = (forecast) => ({
  type: setForecastType,
  payload: forecast,
});

export const getForecastData = (city) => async (dispatch) => {
  dispatch(forecastIsLoading(true));
  const forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=10&appid=${API_KEY}&units=metric`
  ).then((result) => result.json());
  dispatch(setForecast(forecast.list));
  dispatch(forecastIsLoading(false));
};
