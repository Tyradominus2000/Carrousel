import style from "./Carrousel.module.scss";
import { useEffect, useState } from "react";
export default function Carrousel() {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wait, setWait] = useState(false);

  /**
   * Fetch all the image src and name and store it in image
   */
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
      // When we have the image we set the loader to false
      setLoading(false);
    }
  }
  /**
   * For Debug purpose
   */
  useEffect(() => {
    console.log("image : ", image);
    console.log("image length : ", image.length);
  }, [image]);
  useEffect(() => {
    console.log("loading : ", loading);
  }, [loading]);

  useEffect(() => {
    console.log("current index : ", currentIndex);
    if (!loading) {
      setWait(true);
      // setTimeout(() => {
      //   setWait(false);
      // }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);
  useEffect(() => {
    console.log("wait : ", wait);
  }, [wait]);

  /**
   * Initialise loading and get all the image
   */
  useEffect(() => {
    setLoading(true);
    fetchImage();
  }, []);

  /**
   * Function to change the index to the prev one
   */
  function prevIndex() {
    // If we are in the first item go to the last one else just go minus one
    if (currentIndex === 0) {
      setCurrentIndex(image.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }

  /**
   * Function to change the index to the next one
   */
  function nextIndex() {
    // If we are in the last item go to the first one else just go plus one
    if (currentIndex === image.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  /**
   * Function to move the index to a defined index
   * @param {Number} index
   */
  function moveToIndex(index) {
    setCurrentIndex(index);
  }

  return (
    <div
      className={`${style.Container} d-flex flex-fill justify-content-center flex-column`}
    >
      <div
        className={`${style.carrouselContainer} d-flex flex-fill justify-content-center`}
      >
        <div className={`${style.arrow} d-flex align-items-center`}>
          <i className="fa-solid fa-arrow-left" onClick={prevIndex}></i>
        </div>
        {loading ? (
          <i className="fa-solid fa-loader fa-spin"></i>
        ) : (
          <>
            <div
              className={`${style.carrousel} d-flex align-items-center justify-content-center`}
            >
              {/* Prev */}
              <img
                className={`${style.minor}`}
                src={`/images/${
                  image[
                    currentIndex === 0 ? image.length - 1 : currentIndex - 1
                  ].src
                }.jpg`}
                alt={
                  image[
                    currentIndex === 0 ? image.length - 1 : currentIndex - 1
                  ].src
                }
                onMouseOver={prevIndex}
              />
              {/* Selected */}
              <img
                src={`/images/${image[currentIndex].src}.jpg`}
                alt={image[currentIndex].src}
              />
              {/* Next */}
              {console.log(
                currentIndex === image.length - 1 ? 0 : currentIndex + 1
              )}
              <img
                className={`${style.minor}`}
                src={`/images/${
                  image[
                    currentIndex === image.length - 1 ? 0 : currentIndex + 1
                  ].src
                }.jpg`}
                alt={
                  image[
                    currentIndex === image.length - 1 ? 0 : currentIndex + 1
                  ].src
                }
                onMouseOver={nextIndex}
              />
            </div>
          </>
        )}
        <div className={`${style.arrow} d-flex align-items-center`}>
          <i className="fa-solid fa-arrow-right" onClick={nextIndex}></i>
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
