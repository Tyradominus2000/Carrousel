import styles from "./App.module.scss";
import Carrousel from "./components/carrousel/Carrousel";
import Carousel from "./components/carrousel/CarouselDep";
import { useState } from "react";
function App() {
  const [type, setType] = useState(false);
  const items = [
    "/images/allied.jpg",
    "/images/laroyale.jpg",
    "/images/skygardian.jpg",
    "/images/victoryday.jpg",
    "/images/laroyale.jpg",
    "/images/allied.jpg",

    // Add more items as needed
  ];
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <h1>APP</h1>
      <div
        className={`d-flex flex-fill justify-content-center align-items-center`}
      >
        {type ? <Carrousel /> : <Carousel items={items} />}
      </div>
      <button onClick={() => setType(!type)}>Changer de type</button>
    </div>
  );
}

export default App;
