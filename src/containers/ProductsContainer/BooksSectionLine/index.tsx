import { Box } from '@mui/material';
import React from 'react';
import { IBook } from '../../../components/collecttions';
import BookLineItem from './BookLineItem';

export interface IBookSectionLine {
  listItem: IBook[];
}
const BooksSectionLine: React.FC<IBookSectionLine> = ({ listItem }) => {
  return (
    <>
      {listItem.map((item) => {
        return (
          <Box my={2} key={item.id}>
            <BookLineItem
              name={item.name}
              image={item.image}
              price={item.price}
              priceUnDiscount={0}
              description={item.description}
            />
          </Box>
        );
      })}
    </>
  );
};

export default BooksSectionLine;
