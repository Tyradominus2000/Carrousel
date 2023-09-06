// Carousel.js
import React, { useState, useEffect } from "react";
import "./Carousel.scss";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = window.innerWidth/6; // Increase this value to scroll more
  console.log(scrollAmount);
  const Image = document.getElementsByClassName("imgCarrousel");
  useEffect(() => {
    // Calculate initial offset to center the selected image
    setCurrentIndex(0);
  }, [items]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    // Scroll more to the right when clicking the next button
    setScrollPosition(
      (prevScrollPosition) => prevScrollPosition + scrollAmount
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
    // Scroll more to the left when clicking the previous button
    setScrollPosition(
      (prevScrollPosition) => prevScrollPosition - scrollAmount
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    document.getElementsByClassName("carousel-track").scrollLeft += 20;
    console.log(Image[index]);
  };

  return (
    <div className="carousel">
      <div className="carousel-arrow left" onClick={prevSlide}>
        &lt;
      </div>
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${
            currentIndex * (scrollAmount / items.length)
          }%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === currentIndex ? "active" : ""
            }`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%", // Ensure all elements take full width
            }}
          >
            <img
              className="imgCarrousel"
              src={item}
              alt={`Slide ${index}`}
              style={{ maxWidth: `${currentIndex === index ? "100%" : "80%"}` }}
            />
          </div>
        ))}
      </div>
      <div className="carousel-arrow right" onClick={nextSlide}>
        &gt;
      </div>
      <div className="carousel-dots">
        {items.map((_, index) => (
          <span
            key={index}
            className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      <div className="scroll-position">Scroll Position: {scrollPosition}px</div>
    </div>
  );
};

export default Carousel;
