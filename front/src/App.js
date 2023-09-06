import styles from "./App.module.scss";
import Carrousel from "./components/carrousel/Carrousel";

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <h1>APP</h1>
      <div className={`d-flex flex-fill justify-content-center align-items-center`}>
        <Carrousel />
      </div>
    </div>
  );
}

export default App;
