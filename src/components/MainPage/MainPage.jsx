import styles from "./MainPage.module.css";
import HourlyCardWrapper from "../HourlyCardWrapper/HourlyCardWrapper";

const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <HourlyCardWrapper />
      </div>
    </div>
  );
};

export default MainPage;
