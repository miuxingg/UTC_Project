/* eslint-disable require-jsdoc */
import { Box, styled } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PrevButton = styled(ArrowBackIosNewIcon)({
  color: '#000 !important',
  left: '-55px !important',
  top: '43% !important',
});

const NextButton = styled(ArrowForwardIosIcon)({
  color: '#000 !important',
  top: '43% !important',
});
export const MultipleSlider: React.FC = ({ children }) => {
  const settings = {
    className: 'center',
    infinite: true,
    slidesToShow: 4,
    speed: 500,
    rows: 2,
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
      </Box>
    </Box>
  );
};

export default MultipleSlider;
