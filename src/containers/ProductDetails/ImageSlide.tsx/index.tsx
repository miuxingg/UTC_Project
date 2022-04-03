import { Box, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PrimaryImage = styled(Box)(
  ({
    image,
    width,
    height,
    m,
  }: {
    image: string;
    width: number | string;
    height: number | string;
    m?: number | string;
  }) => ({
    width: width,
    height: height,
    margin: m,
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    //   backgroundAttachment: 'fixed',
    backgroundSize: '100% 100%',
    position: 'relative',
    transition: '0.5s',
  }),
);

const Icon = styled(Box)(({ top, left, right, bottom }: any) => ({
  position: 'absolute',
  top,
  left,
  right,
  bottom,
  transition: '0.5s',
}));

interface IImageSlide {
  listImage: string[];
}

const ImageSlide: React.FC<IImageSlide> = ({ listImage }) => {
  const [image, setImage] = useState<number>(0);
  const [horver, setHorver] = useState<boolean>(false);
  useEffect(() => {
    setImage(0);
  }, [listImage]);

  return (
    <Box
      height={600}
      width={420}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <PrimaryImage
        image={listImage[image]}
        width="100%"
        height="527px"
        onMouseEnter={() => setHorver(true)}
        onMouseLeave={() => setHorver(false)}
      >
        {horver ? (
          <>
            <Icon top="50%">
              <ArrowBackIosNewIcon
                style={{
                  color: `${image === 0 ? '#c6c6c6' : '#fff'}`,
                  cursor: 'pointer',
                }}
                onClick={() => setImage((pre) => (pre - 1 < 0 ? 0 : pre - 1))}
              />
            </Icon>
            <Icon top="50%" right="0">
              <ArrowForwardIosIcon
                style={{
                  color: `${
                    image === listImage.length - 1 ? '#c6c6c6' : '#fff'
                  }`,
                  cursor: 'pointer',
                }}
                onClick={() =>
                  setImage((pre) =>
                    pre + 1 === listImage.length ? pre : pre + 1,
                  )
                }
              />
            </Icon>
          </>
        ) : null}
      </PrimaryImage>
      <Box
        width="100%"
        height={64}
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        {listImage.map((item, i) => {
          return (
            <PrimaryImage
              key={i}
              image={item}
              width="64px"
              height="100%"
              m="0 2px"
              style={{ cursor: 'pointer' }}
              onClick={() => setImage(i)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default ImageSlide;
