import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routers } from '../../../configs/navigator';
import { ICategoryApi } from '../../../libs/apis/category/types';
import {
  getItemDataStorage,
  LocalStorageKey,
  setItemDataStorage,
} from '../../../libs/utils/localStorage';
import { setSuccess, setError, setWarning } from '../../../redux/app';
import { authSelector } from '../../../redux/auth/selectors';
import { addItemToCart, createCartItem } from '../../../redux/cart';

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
}
export const BookCart: React.FC<IBook> = ({
  id = '',
  status = '',
  name = '',
  price = 0,
  priceUnDiscount = 0,
  thumbnail = '',
}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelector);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      if (id) {
        dispatch(
          createCartItem({
            bookId: id,
            quantity: 1,
          }),
        );
        dispatch(setSuccess({ message: 'Thêm vào giỏ hàng thành công' }));
      } else {
        dispatch(setError({ message: 'Thêm vào giỏ hàng thất bại' }));
      }
    } else {
      const cartLocal = getItemDataStorage(LocalStorageKey.BookStoreCart);
      const currentCart = cartLocal ? JSON.parse(cartLocal) : [];
      const isBookOnCart = currentCart.find((item: any) => item.bookId === id);
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
        dispatch(setSuccess({ message: 'Thêm vào giỏ hàng thành công' }));
      } else {
        dispatch(setWarning({ message: 'Sản phẩm đã tồn tại' }));
      }
    }
  };
  return (
    <>
      <div className="product product__style--3">
        {/* <div className="col-lg-3 col-md-4 col-sm-6 col-12"> */}
        <div className="product__thumb">
          <Link href={`${Routers.products.path}/${id}`}>
            <a className="first__img">
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
                  <Link href="/">
                    <a className="compare" title="Favorite">
                      <i className="bi bi-heart-beat" />
                    </a>
                  </Link>
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
            <ul className="rating d-flex">
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
            </ul>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default BookCart;
