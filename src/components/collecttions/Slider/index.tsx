import Link from 'next/link';
import React from 'react';
import { Routers } from '../../../configs/navigator';

export const Slider: React.FC = () => {
  return (
    <div className="slider-area brown__nav slider--15 slide__activation slide__arrow01 owl-carousel owl-theme">
      {/* Start Single Slide */}
      <div className="slide animation__style10 bg-image--1 fullscreen align__center--left">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="slider__content">
                <div className="contentbox">
                  <h2>
                    Buy <span>your </span>
                  </h2>
                  <h2>
                    favourite <span>Book </span>
                  </h2>
                  <h2>
                    from <span>Here </span>
                  </h2>
                  <Link href={Routers.products.path}>
                    <a className="shopbtn">shop now</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Single Slide */}
      {/* Start Single Slide */}
      {/* <div className="slide animation__style10 bg-image--7 fullscreen align__center--left">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="slider__content">
                        <div className="contentbox">
                        <h2>Buy <span>your </span></h2>
                        <h2>favourite <span>Book </span></h2>
                        <h2>from <span>Here </span></h2>
                        <a className="shopbtn" href="#">shop now</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div> */}
      {/* End Single Slide */}
    </div>
  );
};

export default Slider;
