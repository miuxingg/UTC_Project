import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';
import { IAddressApi } from '../../../libs/apis/address/types';
import { Error } from '../Input';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ISelectBox {
  name: string;
  label: string;
  items: any[];
  onChange: (key: any) => void;
  error?: string;
  value?: any;
}
const SelectBox: React.FC<ISelectBox> = ({
  name,
  items,
  label,
  onChange,
  error,
  value,
}) => {
  const handleChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    onChange(value);
  };
  return (
    <div>
      <FormControl sx={{ width: '100%', mt: 1 }}>
        <InputLabel id="demo-multiple-name-label" style={{ top: '-10px' }}>
          {label}
        </InputLabel>
        <Select
          name={name}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          onChange={handleChange}
          value={value}
          input={
            <OutlinedInput
              label={label}
              style={{ borderRadius: 0, height: '40px' }}
            />
          }
          MenuProps={MenuProps}
        >
          {items.map(({ code, name }) => (
            <MenuItem key={code} value={code}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error ? <Error>{error}</Error> : null}
    </div>
  );
};

export default SelectBox;
