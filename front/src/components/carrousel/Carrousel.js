import style from "./Carrousel.module.scss";
import { useEffect, useState } from "react";
export default function Carrousel() {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Memory of currentIndex that update are real time
  const [currentIndexMem, setCurrentIndexMem] = useState(currentIndex);
  const [wait, setWait] = useState(false);
  const [direction, setDirection] = useState();

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
  // useEffect(() => {
  //   console.log("image : ", image);
  //   console.log("image length : ", image.length);
  // }, [image]);
  // useEffect(() => {
  //   console.log("loading : ", loading);
  // }, [loading]);
  // useEffect(() => {
  //   console.log("current index : ", currentIndex);
  // }, [currentIndex]);
  // useEffect(() => {
  //   console.log("current index mem : ", currentIndexMem);
  // }, [currentIndexMem]);
  // useEffect(() => {
  //   console.log("wait : ", wait);
  // }, [wait]);

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
      updateCurrentIndex(image.length - 1);
    } else {
      updateCurrentIndex(currentIndex - 1);
    }
  }

  /**
   * Function to change the index to the next one
   */
  function nextIndex() {
    // If we are in the last item go to the first one else just go plus one
    if (currentIndex === image.length - 1) {
      updateCurrentIndex(0);
    } else {
      updateCurrentIndex(currentIndex + 1);
    }
  }

  /**
   * Function to move the index to a defined index
   * @param {Number} index
   */
  function moveToIndex(index) {
    updateCurrentIndex(index);
  }

  /**
   * Update the CurrentIndex while waiting for animation
   * @param {Number} index
   */
  function updateCurrentIndex(index) {
    console.log("current index : ", currentIndex);
    console.log("index : ", index);
    setWait(true);
    setCurrentIndexMem(index);
    getDirection(index);
    // Timeout to make the anim
    setTimeout(() => {
      setCurrentIndex(index);
      setWait(false);
    }, 500);
  }
  /**
   * Set direction to the direction of the carrousel
   * @param {Number} index
   */
  function getDirection(index) {
    if (index > currentIndex) {
      if (index === image.length - 1 && currentIndex === 0) {
        setDirection("left");
      } else {
        setDirection("right");
      }
    } else if (index < currentIndex) {
      if (index === 0 && currentIndex === image.length - 1) {
        setDirection("right");
      } else {
        setDirection("left");
      }
    }
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
                className={`${style.minor} ${
                  wait ? (direction === "left" ? style.prevToSelected : "") : ""
                }`}
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
                onClick={prevIndex}
              />
              {/* Selected */}
              <img
                src={`/images/${image[currentIndex].src}.jpg`}
                alt={image[currentIndex].src}
                className={`${
                  wait
                    ? direction === "right"
                      ? style.selectedToPrev
                      : direction === "left"
                      ? style.selectedToNext
                      : ""
                    : ""
                }`}
              />
              {/* Next */}
              <img
                className={`${style.minor} ${
                  wait
                    ? direction === "right"
                      ? style.nextToSelected
                      : ""
                    : ""
                }`}
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
                onClick={nextIndex}
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
          if (currentIndexMem === index) {
            return (
              <i key={index} className={`fa-solid fa-circle ${style.dot} `}></i>
            );
          } else {
            return (
              <i
                key={index}
                className={`fa-regular fa-circle ${style.dot} ${
                  wait ? style.desactivated : ""
                }`}
                onClick={() => {
                  if (!wait) {
                    moveToIndex(index);
                  }
                }}
              ></i>
            );
          }
        })}
      </div>
    </div>
  );
}
