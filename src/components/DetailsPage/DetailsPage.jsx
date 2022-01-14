import styles from "./DetailsPage.module.css";
import { useParams } from "react-router-dom";
import CardWrapper from "../CardWrapper/CardWrapper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCity } from "../../store/setCity/setCityActions";

const DetailsPage = () => {
  const { city } = useParams();

  const dispatch = useDispatch();

  useEffect(() => dispatch(setCity(city)), [dispatch, city]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <CardWrapper />
      </div>
    </div>
  );
};

export default DetailsPage;
