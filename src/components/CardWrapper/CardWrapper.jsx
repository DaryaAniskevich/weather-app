import styles from "./CardWrapper.module.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getForecastSelector,
  setCitySelector,
  forecastIsLoadingSelector,
} from "../../store/selectors/selectors";
import { getForecastData } from "../../store/getForecast/getForecastActions";
import Loader from "../Loader/Loader";

const CardWrapper = () => {
  const numberOfDays = 10;
  const forecast = useSelector(getForecastSelector);
  const forecastIsLoading = useSelector(forecastIsLoadingSelector);
  const dispatch = useDispatch();

  const city = useSelector(setCitySelector);

  useEffect(() => {
    dispatch(getForecastData(city));
  }, [dispatch, city]);

  const slicedForecast = useMemo(() => {
    return forecast.slice(0, numberOfDays);
  }, [forecast, numberOfDays]);

  return forecastIsLoading ? (
    <Loader />
  ) : (
    <div className={styles.card_wrapper}>
      {slicedForecast.map((day, index, array) => {
        return (
          <WeatherCard
            today={array[0].dt}
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
      })}
    </div>
  );
};

export default CardWrapper;
