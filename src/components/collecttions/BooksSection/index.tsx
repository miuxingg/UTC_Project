import { Box } from '@mui/material';
import React from 'react';
import SimpleSlider from '../../elements/SimpleSlider';
import BookCard, { IBook } from '../BookCard';

export interface IBookSection {
  listItem: IBook[];
  title: string;
  description?: string;
}
export const BooksSection: React.FC<IBookSection> = ({
  listItem,
  description,
  title,
}) => {
  const newTitle = title.split(' ');
  const data = listItem.map((item) => {
    return item;
  });
  // const data = [
  //   listItem[0],
  //   listItem[1],
  //   listItem[2],
  //   listItem[3],
  //   listItem[4],
  // ];
  return (
    <section className="wn__product__area brown--color pt--80  pb--30">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section__title text-center">
              <h2 className="title__be--2">
                {newTitle.slice(0, Math.ceil(newTitle.length / 2)).join(' ')}{' '}
                <span className="color--theme">
                  {newTitle
                    .slice(Math.ceil(newTitle.length / 2), newTitle.length)
                    .join(' ')}
                </span>
              </h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
        <Box mt={5}>
          {
            <SimpleSlider>
              {data.map((item, index) => {
                return (
                  <Box
                    maxWidth={270}
                    minWidth={270}
                    // minHeight={380}
                    // maxHeight={380}
                    key={index}
                  >
                    <BookCard {...item} />
                  </Box>
                );
              })}
            </SimpleSlider>
          }
        </Box>
      </div>
    </section>
  );
};

export default BooksSection;
