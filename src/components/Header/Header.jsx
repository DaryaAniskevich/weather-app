import { NavLink, useHistory, useLocation } from "react-router-dom";
import { FormControl, Button } from "react-bootstrap";
import styles from "./Header.module.css";
import { setCitySelector } from "../../store/selectors/selectors";
import { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCity } from "../../store/setCity/setCityActions";
import FavoriteCityButton from "../FavoriteCityButton/FavoriteCityButton";

const Header = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const location = useLocation();
  const cityStore = useSelector(setCitySelector);
  const [searchValue, setSearchValue] = useState("");
  const [inFavorites, setInFavorits] = useState(false);
  const favoriteCitiesArray = useMemo(() => {
    return JSON.parse(localStorage.getItem("favoriteCities"))
      ? JSON.parse(localStorage.getItem("favoriteCities"))
      : [];
  }, []);
  const [changedFavorites, setChangedFavorites] = useState(favoriteCitiesArray);

  const upperCaseCity = (city, separator) => {
    return city
      .split(separator)
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(separator);
  };

  const cityName = useMemo(() => {
    if (cityStore.includes(" ")) {
      return upperCaseCity(cityStore, " ");
    } else if (cityStore.includes("-")) {
      return upperCaseCity(cityStore, "-");
    } else {
      return cityStore[0].toUpperCase() + cityStore.slice(1);
    }
  }, [cityStore]);

  const search = useCallback(
    (e, value) => {
      e.preventDefault();
      if (value.trim() === "") {
        setSearchValue("");
        return;
      }
      if (location.pathname.includes("/current")) {
        push(`/current/${value}`);
      } else if (location.pathname.includes("/long-forecast")) {
        push(`/long-forecast/${value}`);
      }

      dispatch(setCity(value));
      setSearchValue("");
    },
    [dispatch, location, push]
  );

  useMemo(() => {
    favoriteCitiesArray.includes(cityName)
      ? setInFavorits(true)
      : setInFavorits(false);
  }, [cityName, favoriteCitiesArray]);

  const addToFavoriteCities = useCallback(
    (city) => {
      if (favoriteCitiesArray.includes(city)) {
        setInFavorits(false);
        const cityIndex = favoriteCitiesArray.indexOf(city);

        favoriteCitiesArray.map((item, index) =>
          cityIndex === index ? favoriteCitiesArray.splice(index, 1) : null
        );

        localStorage.removeItem("favoriteCities");
        localStorage.setItem(
          "favoriteCities",
          JSON.stringify(favoriteCitiesArray)
        );

        setChangedFavorites(favoriteCitiesArray);
      } else if (!favoriteCitiesArray.includes(city)) {
        setInFavorits(true);

        favoriteCitiesArray.push(city);
        localStorage.setItem(
          "favoriteCities",
          JSON.stringify(favoriteCitiesArray)
        );
        setChangedFavorites(favoriteCitiesArray);
      }
    },
    [favoriteCitiesArray]
  );

  return (
    <header className={styles.wrapper}>
      <div className="container">
        <div className={styles.flex}>
          <nav className={styles.links}>
            <NavLink
              className={styles.link}
              activeClassName={styles.active}
              to={"/current"}
            >
              <img
                className={styles.logo}
                src="https://img.icons8.com/ios/50/000000/sun--v1.png"
                alt="Logo"
              />
            </NavLink>
            <NavLink
              className={styles.link}
              activeClassName={styles.active}
              to={`/current/${cityStore}`}
            >
              Главная
            </NavLink>
            <NavLink
              className={styles.link}
              activeClassName={styles.active}
              to={`/long-forecast/${cityStore}`}
            >
              Прогноз на 10 дней
            </NavLink>
            <div className={styles.text}>
              <b className={styles.text_city}>{cityName}</b>
              <button
                className={styles.button}
                onClick={() => addToFavoriteCities(cityName)}
              >
                <img
                  className={styles.button_img}
                  alt="Добавить в избранные"
                  title="Добавить в избранные"
                  src={
                    inFavorites
                      ? "https://img.icons8.com/fluency/48/000000/star.png"
                      : "https://img.icons8.com/fluency-systems-regular/48/000000/star--v1.png"
                  }
                />
              </button>
            </div>
          </nav>
          <form
            className={`mb-3 ${styles.search}`}
            onSubmit={(e) => search(e, searchValue)}
          >
            <FormControl
              placeholder="Введите город"
              aria-label="city"
              aria-describedby="basic-addon1"
              value={searchValue}
              type="search"
              onChange={(event) => setSearchValue(event.target.value)}
            />

            <Button
              variant="outline-secondary"
              id="button-addon1"
              type="submit"
            >
              Искать
            </Button>
          </form>
        </div>
        <div className={styles.buttons}>
          {changedFavorites.map((item) => {
            return (
              <FavoriteCityButton
                key={item}
                pathname={location.pathname}
                city={item}
              />
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
