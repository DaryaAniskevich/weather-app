import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.title}>404</div>
        <div className={styles.message}>
          Извините, страница, которую вы ищите, не существует
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
