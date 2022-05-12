import { Rating } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '../../../components/elements/Typography';
import { Routers } from '../../../configs/navigator';
import {
  getItemDataStorage,
  LocalStorageKey,
  setItemDataStorage,
} from '../../../libs/utils/localStorage';
import { setError, setSuccess, setWarning } from '../../../redux/app';
import { authSelector } from '../../../redux/auth/selectors';
import { addItemToCart, createCartItem } from '../../../redux/cart';
import { toggleFavorite } from '../../../redux/favorite';

export interface IBookLineItem {
  id: string;
  name: string;
  image: string;
  price: number | string;
  priceUnDiscount?: number | string;
  description?: string;
  rating: number;
  isFavorite: boolean;
}

const BookLineItem: React.FC<IBookLineItem> = ({
  id,
  name,
  image,
  price,
  priceUnDiscount,
  description,
  rating,
  isFavorite,
}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelector);
  const { t } = useTranslation();
  const [favoriteHover, setFavoriteHover] = useState<boolean>(false);
  const handleAddToCart = () => {
    if (isAuthenticated) {
      if (id) {
        dispatch(
          createCartItem({
            bookId: id,
            quantity: 1,
          }),
        );
        dispatch(setSuccess({ message: t('notify.add-to-cart.success') }));
      } else {
        dispatch(setError({ message: t('notify.add-to-cart.error') }));
      }
    } else {
      const cartLocal = getItemDataStorage(LocalStorageKey.BookStoreCart);
      const currentCart = cartLocal ? JSON.parse(cartLocal) : [];
      const isBookOnCart = currentCart.find((item: any) => item?.bookId === id);
      if (!isBookOnCart) {
        currentCart.push({
          bookId: id,
          quantity: 1,
        });
        setItemDataStorage(
          LocalStorageKey.BookStoreCart,
          JSON.stringify(currentCart),
        );
        dispatch(
          addItemToCart({
            id: id,
            quantity: 1,
            item: {
              id: id,
              name: name,
              thumbnail: image,
              price: price,
              priceUnDiscount: priceUnDiscount,
            },
          }),
        );
        dispatch(setSuccess({ message: t('notify.add-to-cart.success') }));
      } else {
        dispatch(setWarning({ message: t('notify.add-to-cart.exist') }));
      }
    }
  };

  const handleToggleFavoriteClick = () => {
    if (!isAuthenticated) {
      dispatch(setError({ message: t('unAuthenticated') }));
    } else {
      dispatch(toggleFavorite(id));
    }
  };
  return (
    <div className="list__view">
      <div className="thumb" style={{ minHeight: 270, maxHeight: 270 }}>
        <Link href={`${Routers.products.path}/${id}`}>
          <a className="first__img" style={{ minHeight: 270, maxHeight: 270 }}>
            <img src={image ?? 'images/product/1.jpg'} alt="product images" />
          </a>
        </Link>
        <Link href={`${Routers.products.path}/${id}`}>
          <a className="second__img animation1" href="single-product.html">
            <img src={image ?? 'images/product/1.jpg'} alt="product images" />
          </a>
        </Link>
      </div>
      <div className="content">
        <Link href={`${Routers.products.path}/${id}`}>
          <a style={{ fontSize: 16, fontWeight: '400' }}>
            <Typography fontWeight={600} style={{ fontSize: 16 }}>
              {name}
            </Typography>
          </a>
        </Link>

        <Rating
          name="size-small"
          value={rating}
          size="small"
          defaultValue={rating}
          disabled
        />
        <ul className="prize__box">
          <li>{price}</li>
          <li className="old__prize">{priceUnDiscount}</li>
        </ul>
        <p>{description}</p>
        <ul className="cart__action d-flex">
          <li
            className="cart"
            onClick={handleAddToCart}
            style={{ cursor: 'pointer' }}
          >
            <a>Add to cart</a>
          </li>
          <li className="wishlist" onClick={handleToggleFavoriteClick}>
            <a
              style={{
                cursor: 'pointer',
                backgroundColor:
                  isFavorite || favoriteHover ? '#ce7852' : '#f5f5f5',
                color: isFavorite || favoriteHover ? '#fff' : '#333',
              }}
              onMouseEnter={() => setFavoriteHover(true)}
              onMouseLeave={() => setFavoriteHover(false)}
            />
          </li>
          <li className="compare">
            <a />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookLineItem;
