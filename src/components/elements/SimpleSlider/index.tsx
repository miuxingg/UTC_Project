/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import { Box, styled } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import cn from 'classnames';
import { IBook } from '../../collecttions';
import BookCard from '../../collecttions/BookCard';

const PrevButton = styled(ArrowBackIosNewIcon)({
  color: '#000 !important',
  left: '-55px !important',
  top: '38% !important',
});

const NextButton = styled(ArrowForwardIosIcon)({
  color: '#000 !important',
  top: '38% !important',
});
const SlickArrowLeft: React.FC<any> = ({
  currentSlide,
  slideCount,
  ...props
}) => (
  <button
    {...props}
    className={cn(
      'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : ''),
    )}
    sx={{ top: '40% !important' }}
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >
    <PrevButton />
  </button>
);
const SlickArrowRight: React.FC<any> = ({
  currentSlide,
  slideCount,
  ...props
}) => (
  <button
    {...props}
    className={
      'slick-next slick-arrow' +
      (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
    }
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  >
    <NextButton />
  </button>
);
// export interface ISimpleSlider {
//   listItem: IBook[];
// }
export const SimpleSlider: React.FC = ({ children }) => {
  const settings = {
    infinite: false,
    className: 'center',
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box maxWidth={1190}>
        <Slider {...settings}>{children}</Slider>

        {/* {children} */}
      </Box>
    </Box>
  );
};

export default SimpleSlider;
