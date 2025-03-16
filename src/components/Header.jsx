import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { bg } from "../images/exporter";
import { motion } from "framer-motion";


const ImageSlider = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Ensure .env has "VITE_" prefix
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(backendUrl + `/api/get-images`);
        setImages(response.data?.images || []); // ✅ FIXED: Use "images" instead of "image"
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to fetch images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 300,
    fade: true,
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading images...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (images.length === 0)
    return <p className="text-center text-gray-500">No images found</p>;

  return (
    <div className="relative min-h-[85vh]">
  {/* Background Image with Opacity */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
    style={{ backgroundImage: `url(${bg})` }}
  ></div>

  {/* Content (Text + Slider) */}
  <div className="relative z-10 flex flex-col justify-center items-center min-h-[85vh]">

  <motion.h1
  className="text-pink-600 text-md"
  animate={{ x: [ -100, 0, 100, 0, -100 ] }} // Move left to right and back
  transition={{ duration: 4, repeat: Infinity, ease: "linear" }} // Infinite loop
>
  I love you, my everything. I can't imagine life without you. ❤️
</motion.h1>
    <div className="w-full max-w-4xl mx-auto px-4">
      <Slider {...settings}>
        {images.reverse().map((img, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={img.image}
              className="w-full max-w-[1000px]   object-cover rounded-xl"
              alt={`slide-${index}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  </div>
</div>

  );
};

export default ImageSlider;
