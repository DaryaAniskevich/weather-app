import styles from "./Line.module.css";

const Line = (props) => {
  return (
    <div className={styles.line}>
      <span className={styles.line_title}>{props.child}</span>
    </div>
  );
};

export default Line;
