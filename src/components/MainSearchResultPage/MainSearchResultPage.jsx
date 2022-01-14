import styles from "./MainSearchResultPage.module.css";
import HourlyCardWrapper from "../HourlyCardWrapper/HourlyCardWrapper";
import { useDispatch } from "react-redux";
import { setCity } from "../../store/setCity/setCityActions";
import { useParams } from "react-router";
import { useEffect } from "react";

const MainSearchResultPage = () => {
  const dispatch = useDispatch();

  const { city } = useParams();
  useEffect(() => {
    dispatch(setCity(city));
  }, [dispatch, city]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <HourlyCardWrapper />
      </div>
    </div>
  );
};

export default MainSearchResultPage;
