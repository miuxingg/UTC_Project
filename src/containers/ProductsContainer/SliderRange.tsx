import { Box, Button as ButtonMui, Slider, styled } from '@mui/material';
import { height } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { moneyFormat } from '../../libs/utils';

const valuetext = (value: number) => {
  return `${value / 10000}đ`;
};
export const min = 0;
export const max = 500000;
const minDistance = 0;

const SliderRangeMui = styled(Slider)({
  color: '#222',
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 42,
    height: 42,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#222',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

export const Button = styled(ButtonMui)({
  width: 110,
  height: 30,
  backgroundColor: '#222',
  color: '#fff',
  ':hover': { backgroundColor: '#222' },
  ':focus': { outline: 'none' },
});

export interface ISlideRange {
  onFilter: (min: number, max: number) => void;
}

const SliderRange: React.FC<ISlideRange> = ({ onFilter }) => {
  const { t } = useTranslation();
  const [value1, setValue1] = React.useState<number[]>([min, max]);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const marks = [
    {
      value: min,
      label: moneyFormat(value1[0]),
    },
    {
      value: max,
      label: `${moneyFormat(value1[1])}${value1[1] === max ? '+' : ''}`,
    },
  ];

  const handleFilterPrice = () => {
    onFilter(value1[0], value1[1]);
  };

  return (
    <Box width={'250px'}>
      <SliderRangeMui
        getAriaLabel={() => 'Minimum distance'}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={min}
        max={max}
        marks={marks}
        disableSwap
      />
      <Button onClick={handleFilterPrice}>{t('product.filter.filter')}</Button>
    </Box>
  );
};

export default SliderRange;
