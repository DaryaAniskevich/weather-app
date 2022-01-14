import styles from "./FavoriteCityButton.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { setCitySelector } from "../../store/selectors/selectors";

const FavoriteCityButton = (props) => {
  const cityStore = useSelector(setCitySelector);

  return (
    <NavLink
      activeClassName={styles.btn_active}
      to={
        props.pathname.includes("/current")
          ? `/current/${props.city}`
          : `/long-forecast/${props.city}`
      }
      className={
        props.city === cityStore
          ? `${styles.btn} ${styles.btn_active}`
          : styles.btn
      }
    >
      {props.city}
    </NavLink>
  );
};

export default FavoriteCityButton;
