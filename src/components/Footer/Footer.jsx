import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <div className="container">
        <div className={styles.icons}>
          Иконки:{" "}
          <a className={styles.link} href="https://icons8.com/icon/648/солнце">
            Солнце icon by Icons8
          </a>
          ,
          <a
            className={styles.link}
            href="https://icons8.com/icon/103406/восход"
          >
            Восход icon by Icons8
          </a>
          ,
          <a
            className={styles.link}
            href="https://icons8.com/icon/103398/закат-солнца"
          >
            Закат солнца icon by Icons8
          </a>
          <a
            className={styles.link}
            href="https://icons8.com/icon/tAfqdu2AVpjT/звезда"
          >
            Звезда icon by Icons8
          </a>
          <a
            className={styles.link}
            href="https://icons8.com/icon/8ggStxqyboK5/звезда"
          >
            Звезда icon by Icons8
          </a>
        </div>
        <div>
          <a
            className={styles.link}
            href="https://www.linkedin.com/in/darya-aniskevich/"
          >
            Darya Aniskevich
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
