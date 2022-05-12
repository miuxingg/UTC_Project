import { Box } from '@mui/material';
import React from 'react';
import { BookCart, IBook } from '../../../components/collecttions';

export interface IBookSectionGrid {
  listItem: IBook[];
}
const BooksSectionGrid: React.FC<IBookSectionGrid> = ({ listItem }) => {
  return (
    <Box ml={3} display="flex" flexWrap="wrap">
      {listItem.map((item, i) => {
        return (
          <Box mx={1} key={item.id} width="270px" height="400px">
            <BookCart
              {...item}
              name={item.name}
              price={item.price}
              thumbnail={item.thumbnail}
              status={'HOT'}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default BooksSectionGrid;
