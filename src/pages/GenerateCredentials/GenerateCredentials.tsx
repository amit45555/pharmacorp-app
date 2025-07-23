import styles from "./GenerateCredentials.module.css";

const GenerateCredentials: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>🔐</div>
        <h2 className={styles.title}>Credentials Generated</h2>
        <p className={styles.subtitle}>Access has been granted successfully.</p>
        <div className={styles.successBar}></div>
      </div>
    </div>
  );
};

export default GenerateCredentials;
