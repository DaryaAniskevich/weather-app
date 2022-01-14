import styles from "./WeatherCard.module.css";
import { Card } from "react-bootstrap";
import { useMemo } from "react";
import Line from "../Line/Line";
import { useSelector } from "react-redux";
import { cityTimezoneOffsetSelector } from "../../store/selectors/selectors";

const TempItem = (props) => {
  return (
    <div className={styles.indicator_item}>
      <div>{props.time}</div>
      <div>{props.func}</div>
    </div>
  );
};

const FeelsLikeTemp = (props) => {
  return <div className={styles.feels_temp_item}>{props.func}</div>;
};

export const getTemp = (temp) => {
  return Math.round(temp) > 0 ? `+${Math.round(temp)}` : Math.round(temp);
};

export const getCardDate = (dt, timezoneOffset) => {
  const date = new Date((dt + timezoneOffset) * 1000);
  const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  const month = [
    "янв",
    "фев",
    "мар",
    "апр",
    "мая",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];

  const cardDate = `${date.toUTCString().slice(5, 7)} ${
    month[date.getMonth()]
  }, ${daysOfWeek[date.getDay()]}`;

  return cardDate;
};

const WeatherCard = (props) => {
  const cityTimezoneOffset = useSelector(cityTimezoneOffsetSelector);

  const date = new Date((props.dt + cityTimezoneOffset) * 1000);
  const cardDate = useMemo(
    () => getCardDate(props.dt, cityTimezoneOffset),
    [props.dt, cityTimezoneOffset]
  );

  const src = `http://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`;

  return (
    <Card className={styles.card}>
      <Card.Body className={styles.body}>
        <div className={styles.head}>
          <Card.Img variant="top" src={src} className={styles.img} />
          <Card.Title className={styles.date}>
            {props.today &&
            date.getUTCDate() ===
              new Date((props.today + cityTimezoneOffset) * 1000).getUTCDate()
              ? `Сегодня, ${cardDate}`
              : cardDate}
          </Card.Title>
        </div>
        <div className={styles.indicator_wrapper}>
          <TempItem time="Утро" func={getTemp(props.temp.morn)} />
          <TempItem time="День" func={getTemp(props.temp.day)} />
          <TempItem time="Вечер" func={getTemp(props.temp.eve)} />
          <TempItem time="Ночь" func={getTemp(props.temp.night)} />
        </div>

        <Line child="Ощущается как" />
        <div className={styles.feels_temp}>
          <FeelsLikeTemp func={getTemp(props.feels_like.morn)} />
          <FeelsLikeTemp func={getTemp(props.feels_like.day)} />
          <FeelsLikeTemp func={getTemp(props.feels_like.eve)} />
          <FeelsLikeTemp func={getTemp(props.feels_like.night)} />
        </div>

        <hr className={styles.line}></hr>

        <div className={styles.indicator}>
          <div
            className={`${styles.indicator_wrapper} ${styles.indicator_wrapper_column}`}
          >
            <div className={styles.indicator_item}>
              <div>Ветер</div>
              <div className={styles.indicator_num}>
                {Math.round(props.speed)} м/с
              </div>
            </div>
            <div className={styles.indicator_item}>
              <div>Влажность</div>
              <div className={styles.indicator_num}>
                {Math.round(props.humidity)} %
              </div>
            </div>
            <div className={styles.indicator_item}>
              <div>Давление</div>
              <div className={styles.indicator_num}>
                {Math.round(props.pressure * 0.750063755419211)} мм рт. ст.
              </div>
            </div>
          </div>
        </div>

        <hr className={styles.line}></hr>

        <div className={styles.length}>
          <div className={styles.length_item}>
            <img
              src="https://img.icons8.com/material-sharp/50/000000/sunrise.png"
              alt="sunrise"
              className={styles.length_img}
            />
            <div>Восход</div>
            <div>
              {new Date(props.sunrise * 1000).getHours() < 10
                ? `0${new Date(props.sunrise * 1000).getHours()}`
                : new Date(props.sunrise * 1000).getHours()}
              :
              {new Date(props.sunrise * 1000).getMinutes() < 10
                ? `0${new Date(props.sunrise * 1000).getMinutes()}`
                : new Date(props.sunrise * 1000).getMinutes()}
            </div>
          </div>
          <div className={styles.length_item}>
            <img
              src="https://img.icons8.com/material-sharp/50/000000/sunset.png"
              alt="sunset"
              className={styles.length_img}
            />
            <div>Закат</div>
            <div>
              {new Date(props.sunset * 1000).getHours()}:
              {new Date(props.sunset * 1000).getMinutes() < 10
                ? `0${new Date(props.sunset * 1000).getMinutes()}`
                : new Date(props.sunset * 1000).getMinutes()}
              {}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
