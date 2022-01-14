import styles from "./HourlyWeatherCard.module.css";
import { getTemp, getCardDate } from "../WeatherCard/WeatherCard";
import { Card } from "react-bootstrap";
import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { cityTimezoneOffsetSelector } from "../../store/selectors/selectors";

const HourlyWeatherCard = (props) => {
  const cityTimezoneOffset = useSelector(cityTimezoneOffsetSelector);

  const date = new Date((props.day[0].dt + cityTimezoneOffset) * 1000);
  const cardDate = useMemo(
    () => getCardDate(props.day[0].dt, cityTimezoneOffset),
    [props.day, cityTimezoneOffset]
  );
  const createSrc = useCallback((icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }, []);

  const getWindDirection = useCallback((deg) => {
    if (deg > 348.75 || deg <= 11.25) {
      return "С";
    } else if (deg > 11.25 && deg <= 78.75) {
      return "СВ";
    } else if (deg > 78.75 && deg <= 101.25) {
      return "В";
    } else if (deg > 101.25 && deg <= 168.75) {
      return "ЮВ";
    } else if (deg > 168.75 && deg <= 191.25) {
      return "Ю";
    } else if (deg > 191.25 && deg <= 258.75) {
      return "ЮЗ";
    } else if (deg > 258.75 && deg <= 281.25) {
      return "З";
    } else if (deg > 281.25 && deg <= 384.75) {
      return "СЗ";
    }
  }, []);
  const month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  return (
    <Card>
      <Card.Body className={styles.wrapper}>
        <div className={styles.wrapper_left}>
          <Card.Title className={`${styles.date} ${styles.date_today}`}>
            {cardDate}
          </Card.Title>
          <div className={styles.titles}>
            <div
              className={`${styles.titles_item} ${styles.titles_empty}`}
            ></div>
            <div className={styles.titles_item}>Температура, С</div>
            <div className={styles.titles_item}>Ощущается как</div>
            <div className={styles.titles_item}>Давление, мм.рт.ст.</div>
            <div className={styles.titles_item}>Влажность, %</div>
            <div className={styles.titles_item}>Ветер, м/c</div>
          </div>
        </div>
        <div className={styles.wrapper_right}>
          <div className={styles.time}>
            {props.day.map((item, index) => {
              const time = new Date((item.dt + cityTimezoneOffset) * 1000);
              const slicedTime = time.toUTCString().slice(17, 22);
              return (
                <div className={styles.time_item} key={item.time}>
                  {(slicedTime === "00:00" ||
                    slicedTime === "01:00" ||
                    slicedTime === "02:00") &&
                  new Date(time).getUTCDate() !== +cardDate.slice(0, 2) ? (
                    <b>{`${slicedTime}, ${time.toUTCString().slice(5, 7)}.${
                      month[time.getMonth()]
                    }`}</b>
                  ) : (
                    slicedTime
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.values}>
            {props.day.map((item) => {
              return (
                <div className={styles.values_column} key={item.time}>
                  <div className={styles.values_icon}>
                    <img
                      src={createSrc(item.weather.icon)}
                      alt={item.weather.description}
                      className={styles.values_icon_img}
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className={styles.values_item}>
                    {getTemp(item.temp.temp)}
                  </div>
                  <div className={styles.values_item}>
                    {getTemp(item.temp.feels_like)}
                  </div>
                  <div className={styles.values_item}>
                    {Math.round(item.temp.pressure * 0.750063755419211)}
                  </div>
                  <div className={styles.values_item}>{item.temp.humidity}</div>
                  <div className={styles.values_item}>
                    {Math.round(item.wind.speed * 10) / 10}
                    <span className={styles.values_wind}>
                      {getWindDirection(item.wind.deg)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HourlyWeatherCard;
