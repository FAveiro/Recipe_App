import React from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

//* Import images
import carousel1 from "../Assets/carousel_1.jpg";
import carousel2 from "../Assets/carousel_2.jpg";
import carousel3 from "../Assets/carousel_3.jpg";
import carousel4 from "../Assets/carousel_4.jpg";

function CarouselFood() {
  const getConfigurableProps = () => ({
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    infiniteLoop: true,
    showThumbs: false,
    useKeyboardArrows: false,
    autoPlay: true,
    stopOnHover: false,
    swipeable: false,
    dynamicHeight: false,
    emulateTouch: false,
    autoFocus: false,
    thumbWidth: 100,
    selectedItem: 0,
    interval: 2000,
    transitionTime: 700,
    swipeScrollTolerance: 5,
    animationHandler: "fade",
  });

  const imgCarousel = [carousel1, carousel2, carousel3, carousel4];

  return (
    <Carousel {...getConfigurableProps()} width="30em" className="hidden lg:flex">
      {imgCarousel.map((image, i) => (
        <div className="h-[20em]" key={i}>
          <img src={image} alt="" className="h-full object-cover" />
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselFood;
