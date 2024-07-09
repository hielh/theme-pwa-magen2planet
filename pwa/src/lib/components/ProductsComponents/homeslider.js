import React from 'react';
import styles from './homeslider.module.css';
import SlickSlider from "react-slick";
import sliderClasses from "./homeslider.module.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        style={{ ...style, display: "none", background: "transparent" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        style={{ ...style, display: "none", background: "transparent" }}
        onClick={onClick}
      />
    );
  }

var sliderSettings = {
    dots: true,
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    lazyLoad: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
};

const HomeSlider = () => {

  return (
    <>
        {window.location.pathname === "/" && <div className={sliderClasses.root}>
            <SlickSlider {...sliderSettings}>
                <div style={{height: '1000px'}}>
                    <img style={{maxHeight: "100%", objectFit: "contain", width: '100%'}} src='https://images.pexels.com/photos/454880/pexels-photo-454880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                </div>
                <div style={{height: '1000px'}}>
                    <img style={{maxHeight: "100%", objectFit: "contain", width: '100%'}} src='https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                </div>
                <div style={{height: '1000px'}}>
                    <img style={{maxHeight: "100%", objectFit: "contain", width: '100%'}} src='https://images.pexels.com/photos/454880/pexels-photo-454880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                </div>
                <div style={{height: '1000px'}}>
                    <img style={{maxHeight: "100%", objectFit: "contain", width: '100%'}} src='https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                </div>
            </SlickSlider>
        </div>}
    </>
  );
};

export default HomeSlider;
