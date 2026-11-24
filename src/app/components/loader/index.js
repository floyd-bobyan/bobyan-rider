
import styles from "./styles.module.scss";

const BobyanLoader = ({text}) => {
  return (
    <div className={styles.loader}>

      <div className={styles.spinner} />

      <h3>{text}</h3>
      <p>Please wait a moment</p>
    </div>
  );
};

export default BobyanLoader;
