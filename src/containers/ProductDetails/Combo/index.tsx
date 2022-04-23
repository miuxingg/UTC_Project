import { Box, Grid, styled } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Typography from '../../../components/elements/Typography';
import { IBookInCombo } from '../../../libs/apis/book/types';
import { moneyFormat } from '../../../libs/utils';

export const Image = styled(Box)(({ src }: { src: string }) => ({
  width: 80,
  height: '100px',
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

export const Text = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '-webkit-line-clamp': '2',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  cursor: 'pointer',
  ':hover': {
    color: '#e59285',
  },
});

const BookInCombo: React.FC<IBookInCombo> = ({
  name,
  thumbnail,
  author,
  id,
}) => {
  return (
    <Box width="250px" height="100px" style={{ backgroundColor: '#eee' }}>
      <Grid container>
        <Grid item xs={4}>
          <Image src={thumbnail || ''} />
        </Grid>
        <Grid item xs={8}>
          <Box p={1}>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <Link href={`/products/${id}`}>
                  <Text width="100%" fontWeight={600} fontSize={16}>
                    {name}
                  </Text>
                </Link>
              </Grid>
              <Grid item>
                <Text fontSize={14}>{author}</Text>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export interface IListBookInCombo {
  list: IBookInCombo[];
}
export const ListBookInCombo: React.FC<IListBookInCombo> = ({ list }) => {
  return (
    <Grid container spacing={4}>
      {list.map((book, i) => {
        return (
          <Grid item key={i}>
            <BookInCombo {...book} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ListBookInCombo;
