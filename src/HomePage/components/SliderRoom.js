import { useState, useEffect } from "react";
import { Row } from 'react-bootstrap';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// import { sliderData } from "./slider-data";
// import "./Slider.css";
import room1 from './images/room-1.jpg'
import room2 from './images/room-3.jpg'
import room3 from './images/room-4.jpg'

const SliderRoom = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slideLength = imageRoom.length;

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;


    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    }
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    };

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    useEffect(() => {
        setCurrentSlide(0);
    }, []);

    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [currentSlide]);

    return (
        <div className="slider">
            <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
            <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
            {imageRoom.map((slide, index) => {
                return (
                    <div
                        className={index === currentSlide ? "slide current" : "slide"}
                        key={index}
                    >
                        {index === currentSlide && (
                            <div>
                                <img src={slide.image} alt="slide" className="image" />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

    );
};

export default SliderRoom;