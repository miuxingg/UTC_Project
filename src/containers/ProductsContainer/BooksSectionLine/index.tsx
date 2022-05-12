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
              {...item}
              id={item.id}
              rating={item?.rating ?? 0}
              name={item.name}
              image={item.thumbnail}
              price={item.price}
              description={item.description}
              isFavorite={!!item?.isFavorite}
            />
          </Box>
        );
      })}
    </>
  );
};

export default BooksSectionLine;
