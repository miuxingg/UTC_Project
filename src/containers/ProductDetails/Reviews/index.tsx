import { Avatar, Box, Rating } from '@mui/material';
import React from 'react';
import Typography from '../../../components/elements/Typography';

export interface IReview {
  username: string;
  avatar?: string;
  rating: number;
  comment: string;
  timestamps: string;
}

const Review: React.FC<IReview> = ({
  username,
  avatar,
  rating,
  comment,
  timestamps,
}) => {
  return (
    <Box mx={1} my={3}>
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <Avatar
          alt="Remy Sharp"
          src={
            avatar ??
            'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg'
          }
        />
        <Box ml={2} display="flex" justifyContent="space-between" width="100%">
          <h5>{username}</h5>

          <Box ml={1}>
            <Typography fontSize="12px">{timestamps}</Typography>
          </Box>
        </Box>
      </Box>
      <Box ml={3} my={1}>
        <div className="review__ratings__type d-flex">
          <div className="review-ratings">
            <Box
              // className="rating-summary d-flex"
              display="flex"
              alignItems="center"
            >
              <>
                <Typography fontWeight={600}>Đánh giá</Typography>
                <Box mt="3px" mx={2} display="flex">
                  <Rating
                    name="size-small"
                    value={rating}
                    size="small"
                    defaultValue={rating}
                    disabled
                  />
                </Box>
              </>
            </Box>
          </div>
        </div>
        <p>{comment}</p>
      </Box>
    </Box>
  );
};

export default Review;
