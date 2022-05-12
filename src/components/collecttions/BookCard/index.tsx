import { Rating } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Routers } from '../../../configs/navigator';
import { IBookInCombo } from '../../../libs/apis/book/types';
import { ICategoryApi } from '../../../libs/apis/category/types';
import {
  getItemDataStorage,
  LocalStorageKey,
  setItemDataStorage,
} from '../../../libs/utils/localStorage';
import { setSuccess, setError, setWarning } from '../../../redux/app';
import { authSelector } from '../../../redux/auth/selectors';
import { addItemToCart, createCartItem } from '../../../redux/cart';
import { toggleFavorite } from '../../../redux/favorite';

export interface IBook {
  id: string;
  status?: string;
  name: string;
  price: number | string;
  priceUnDiscount?: number | string;
  thumbnail: string;
  images: string[];
  description?: string;
  author?: string;
  category?: ICategoryApi[];
  cloudTag?: string[];
  quantity?: number;
  summary?: string;
  isCombo?: boolean;
  books?: IBookInCombo[];
  isFavorite?: boolean;
  rating?: number;
}
export const BookCart: React.FC<IBook> = ({
  id = '',
  status = '',
  name = '',
  price = 0,
  priceUnDiscount = 0,
  thumbnail = '',
  isFavorite = false,
  rating = 0,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isAuthenticated = useSelector(authSelector);
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
              thumbnail: thumbnail,
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
    <>
      <div className="product product__style--3">
        {/* <div className="col-lg-3 col-md-4 col-sm-6 col-12"> */}
        <div
          className="product__thumb"
          style={{ minHeight: 270, maxHeight: 270 }}
        >
          <Link href={`${Routers.products.path}/${id}`}>
            <a
              className="first__img"
              style={{ minHeight: 270, maxHeight: 270 }}
            >
              <img
                src={thumbnail ? thumbnail : 'images/books/1.jpg'}
                alt="product image"
              />
            </a>
          </Link>
          <Link href={`${Routers.products.path}/${id}`}>
            <a className="second__img animation1">
              <img
                src={thumbnail ? thumbnail : 'images/books/2.jpg'}
                alt="product image"
              />
            </a>
          </Link>
          {status && (
            <div className="hot__box">
              <span className="hot-label">{status}</span>
            </div>
          )}
        </div>
        <div className="product__content content--center">
          <h4>
            <Link href={`${Routers.products.path}/${id}`}>
              <a>{name}</a>
            </Link>
          </h4>
          <ul className="prize d-flex">
            <li>{price}</li>
            <li className="old_prize">{priceUnDiscount}</li>
          </ul>
          <div className="action">
            <div className="actions_inner">
              <ul className="add_to_links">
                <li>
                  <Link href="/">
                    <a className="cart" title="chua biet">
                      <i className="bi bi-shopping-bag4" />
                    </a>
                  </Link>
                </li>
                <li>
                  <div onClick={handleAddToCart}>
                    <a className="wishlist" title="Add To Cart">
                      <i className="bi bi-shopping-cart-full" />
                    </a>
                  </div>
                </li>
                <li>
                  {/* <Link href="/"> */}
                  <a
                    onClick={handleToggleFavoriteClick}
                    className="compare"
                    title="Favorite"
                    style={{
                      backgroundColor:
                        isFavorite || favoriteHover ? '#ce7852' : '#f5f5f5',
                      color: isFavorite || favoriteHover ? '#fff' : '#333',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setFavoriteHover(true)}
                    onMouseLeave={() => setFavoriteHover(false)}
                  >
                    <i className="bi bi-heart-beat" />
                  </a>
                  {/* </Link> */}
                </li>
                <li>
                  <Link href="/">
                    <a
                      data-toggle="modal"
                      title="Quick View"
                      className="quickview modal-view detail-link"
                    >
                      <i className="bi bi-search" />
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="product__hover--content">
            <Rating
              name="size-small"
              value={rating}
              size="small"
              defaultValue={rating}
              disabled
            />
            {/* <ul className="rating d-flex">
              <li className="on">
                <i className="fa fa-star-o" />
              </li>
              <li className="on">
                <i className="fa fa-star-o" />
              </li>
              <li className="on">
                <i className="fa fa-star-o" />
              </li>
              <li>
                <i className="fa fa-star-o" />
              </li>
              <li>
                <i className="fa fa-star-o" />
              </li>
            </ul> */}
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default BookCart;
