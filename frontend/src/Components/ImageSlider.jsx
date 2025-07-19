import React from "react";
import { useState, useEffect } from "react";
import image1 from "../assets/ba1.png";
import image2 from "../assets/ba2.png";
import image3 from "../assets/ba3.png";

const ImageSlider = () => {
  const images = [image1, image2, image3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <div className="relative h-64 md:h-96 w-[95%] overflow-hidden rounded-lg shadow-lg mx-auto mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Cleaning service ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>
      <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-5xl font-bold z-10 animate-pulse">
        Welcome, To CleanSL
      </h2>
    </div>
  );
};

export default ImageSlider;
