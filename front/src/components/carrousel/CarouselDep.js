// Carousel.js
import React, { useState, useEffect, useRef } from "react";
import "./Carousel.scss";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Calculate initial offset to center the selected image
    const initialOffset = Math.floor((items.length - 1) / 2);
    setCurrentIndex(initialOffset);
  }, [items]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    // Scroll to center of the selected item
    scrollToCenter(currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
    // Scroll to center of the selected item
    scrollToCenter(currentIndex - 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    // Scroll to center of the selected item
    scrollToCenter(index);
  };

  const scrollToCenter = (index) => {
    if (carouselRef.current) {
      const selectedElement = carouselRef.current.querySelector(
        `.carousel-slide:nth-child(${index + 1})`
      );
      if (selectedElement) {
        const containerWidth = carouselRef.current.offsetWidth;
        const itemWidth = selectedElement.offsetWidth;
        const scrollLeft =
          selectedElement.offsetLeft - (containerWidth - itemWidth) / 2;

        // Smoothly scroll to the center
        carouselRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel" ref={carouselRef}>
        <div className="carousel-arrow left" onClick={prevSlide}>
          &lt;
        </div>
        <div className="carousel-track">
          {items.map((item, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <img
                src={item}
                alt={`Slide ${index}`}
                style={{
                  maxWidth: `${currentIndex === index ? "100%" : "80%"}`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="carousel-arrow right" onClick={nextSlide}>
          &gt;
        </div>
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
    </div>
  );
};

export default Carousel;
