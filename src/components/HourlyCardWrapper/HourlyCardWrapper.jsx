import styles from "./HourlyCardWrapper.module.css";
import HourlyWeatherCard from "../HourlyWeatherCard/HourlyWeatherCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getHourlyForecastSelector,
  getForecastSelector,
  setCitySelector,
  hourlyForecastIsLoadingSelector,
  forecastIsLoadingSelector,
} from "../../store/selectors/selectors";
import { getHourlyForecastDate } from "../../store/getHourlyForecast/getHourlyForecastActions";
import { getForecastData } from "../../store/getForecast/getForecastActions";
import Loader from "../Loader/Loader";

const HourlyCardWrapper = () => {
  const numberOfDays = 3;
  const dispatch = useDispatch();

  const city = useSelector(setCitySelector);
  const hourlyForecast = useSelector(getHourlyForecastSelector);
  const forecast = useSelector(getForecastSelector);
  const hourlyForecastIsLoading = useSelector(hourlyForecastIsLoadingSelector);
  const forecastIsLoading = useSelector(forecastIsLoadingSelector);

  useEffect(() => {
    dispatch(getHourlyForecastDate(city));
  }, [dispatch, city]);

  useEffect(() => {
    dispatch(getForecastData(city));
  }, [dispatch, city]);

  const weatherArray = useMemo(() => {
    const createDaysArray = (data) => {
      let daysArray = [];
      let weatherDataFirstDay = [];
      const createHourlyWeatherData = (day) => {
        const dayObj = {
          dt: day.dt,
          time: day.dt_txt,
          temp: day.main,
          weather: day.weather[0],
          wind: day.wind,
          pop: day.pop,
        };

        return dayObj;
      };

      data.forEach((day, index) => {
        if (index <= 7) {
          const dayObj = createHourlyWeatherData(day);
          weatherDataFirstDay.push(dayObj);
        }
      });

      daysArray.push(weatherDataFirstDay);
      return daysArray;
    };

    return createDaysArray(hourlyForecast);
  }, [hourlyForecast]);

  const shortForecast = useMemo(() => {
    return forecast.slice(1, numberOfDays);
  }, [forecast, numberOfDays]);

  return hourlyForecastIsLoading || forecastIsLoading ? (
    <Loader />
  ) : (
    <div className={styles.card_wrapper}>
      <div className={styles.wrapper_hourly}>
        {weatherArray[0].length > 0
          ? weatherArray.map((day, index) => {
              return <HourlyWeatherCard day={day} key={day[index].dt} />;
            })
          : null}
      </div>
      <div className={styles.wrapper_daily}>
        {weatherArray[0].length > 0
          ? shortForecast.map((day) => {
              return (
                <WeatherCard
                  class={styles.daily_card}
                  today={""}
                  dt={day.dt}
                  feels_like={day.feels_like}
                  temp={day.temp}
                  sunrise={day.sunrise}
                  sunset={day.sunset}
                  humidity={day.humidity}
                  speed={day.speed}
                  pressure={day.pressure}
                  weather={day.weather}
                  key={day.dt}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default HourlyCardWrapper;
