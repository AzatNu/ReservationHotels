import React, { useState } from 'react';
import arrow from "../../../assets/hotel-id-rooms-image-carusel-icons/icons8-стрелка-вправо-100.png";
import imageCaruselStyle from "./image-carusel.module.css";


export const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
    return (
        <div className={imageCaruselStyle["roomImageCarusel"]}>
            <button className={`${imageCaruselStyle["arrow-left"]}`} onClick={prevImage}><img src={arrow} alt="logo" /></button>
            <a href={images[currentIndex]}><img src={images[currentIndex]} alt={`room-${currentIndex}`} className={imageCaruselStyle["roomImage"]} /></a>
            <button className={`${imageCaruselStyle["arrow-right"]}`} onClick={nextImage}><img src={arrow} alt="logo" /></button>
        </div>
    );
};
