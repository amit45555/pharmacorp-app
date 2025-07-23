import styles from './GenerateCredentials.module.css';

const GenerateCredentials: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>Credentials Generated</h2>
      <p>Access has been granted successfully.</p>
    </div>
  );
};

export default GenerateCredentials;
