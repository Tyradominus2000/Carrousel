import style from "./Carrousel.module.scss";
import { useEffect, useState } from "react";
export default function Carrousel() {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function fetchImage() {
    const response = await fetch("http://localhost:8000/image", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseFromBackEnd = await response.json();
      setImage(responseFromBackEnd);
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("image : ", image);
  }, [image]);
  useEffect(() => {
    console.log("loading : ", loading);
  }, [loading]);

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    setLoading(true);
    fetchImage();
  }, []);

  function prevIndex() {
    // If we are in the first item go to the last one else just go minus one
    if (currentIndex === 0) {
      setCurrentIndex(image.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function nexIndex() {
    // If we are in the last item go to the first one else just go plus one
    if (currentIndex === image.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function moveToIndex(index) {
    setCurrentIndex(index);
  }

  return (
    <div
      className={`${style.Container} d-flex flex-fill justify-content-center flex-column`}
    >
      <div
        className={`${style.carrouselContainer} d-flex justify-content-center`}
      >
        <div className={`${style.arrow} d-flex align-items-center`}>
          <i className="fa-solid fa-arrow-left" onClick={prevIndex}></i>
        </div>
        {loading ? (
          <i className="fa-solid fa-loader fa-spin"></i>
        ) : (
          <div
            className={`${style.carrousel} d-flex align-items-center justify-content-center`}
          >
            {image.map((img, index) => {
              return (
                <img
                  key={img.id}
                  className={`${style.image} ${
                    currentIndex === index
                      ? style.selected
                      : currentIndex === index + 1
                      ? style.next
                      : currentIndex === index - 1
                      ? style.prev
                      : ""
                  } ${
                    currentIndex === 0
                      ? index === image.length - 1
                        ? style.prev
                        : ""
                      : ""
                  }
                  } ${
                    currentIndex === image.length - 1
                      ? index === 0
                        ? style.next
                        : ""
                      : ""
                  }
                  `}
                  src={`/images/${img.src}.jpg`}
                  alt={img.src}
                />
              );
            })}
          </div>
        )}
        <div className={`${style.arrow} d-flex align-items-center`}>
          <i className="fa-solid fa-arrow-right" onClick={nexIndex}></i>
        </div>
      </div>
      <div className={`${style.dotsContainer} d-flex justify-content-center`}>
        {image.map((image, index) => {
          if (currentIndex === index) {
            return <i className={`fa-solid fa-circle ${style.dot}`}></i>;
          } else {
            return (
              <i
                className={`fa-regular fa-circle ${style.dot}`}
                onClick={() => moveToIndex(index)}
              ></i>
            );
          }
        })}
      </div>
    </div>
  );
}
