import { Box, styled } from '@mui/material';
import { Formik } from 'formik';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moneyFormat } from '../../libs/utils';
import { removeItem } from '../../redux/cart';
import { allCart } from '../../redux/cart/selectors';
import * as Yup from 'yup';
import CartLine from './CartLine';
import { useRouter } from 'next/router';
import { Routers } from '../../configs/navigator';
import { useTranslation } from 'react-i18next';
import { authSelector } from '../../redux/auth/selectors';

export const Button = styled('button')({
  background: '#fff none repeat scroll 0 0',
  borderRadius: '5px',
  display: 'block',
  fontSize: '16px',
  fontWeight: 400,
  height: '50px',
  lineHeight: '50px',
  padding: '0 26px',
  textTransform: 'capitalize',
  transition: 'all 0.3s ease 0s',
  border: 'none',
  ':hover': {
    background: '#e59285 none repeat scroll 0 0',
  },
  ':focus': {
    outline: 'none',
  },
});

const CartContainer: React.FC = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(authSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItem = useSelector(allCart);
  const totalMoney = useMemo(() => {
    return cartItem.items.reduce((total, current) => {
      return total + current.item.price * current.quantity;
    }, 0);
  }, [cartItem]);

  const handleCheckout = () => {
    router.push(`/${Routers.checkout.path}`);
  };

  return (
    <div className="wrapper" id="wrapper">
      {/* Start Bradcaump area */}
      <div
        className="ht__bradcaump__area"
        style={{
          backgroundImage: 'url(images/bg/banner-cart.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <div className="bradcaump__inner text-center">
                <h2 className="bradcaump-title">Shopping Cart</h2>
                <nav className="bradcaump-content">
                  <a className="breadcrumb_item" href="index.html">
                    Home
                  </a>
                  <span className="brd-separetor">/</span>
                  <span className="breadcrumb_item active">Shopping Cart</span>
                </nav>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* End Bradcaump area */}
      {/* cart-main-area start */}
      <div className="cart-main-area section-padding--lg bg--white">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 ol-lg-12">
              <>
                <form>
                  <div className="table-content wnro__table table-responsive">
                    <table>
                      <thead>
                        <tr className="title-top">
                          <th className="product-thumbnail">
                            {t('cart.title.image')}
                          </th>
                          <th className="product-name">
                            {t('cart.title.product')}
                          </th>
                          <th className="product-price">
                            {t('cart.title.price')}
                          </th>
                          <th className="product-quantity">
                            {t('cart.title.quantity')}
                          </th>
                          <th className="product-subtotal">
                            {t('cart.title.total')}
                          </th>
                          <th className="product-remove">
                            {t('cart.title.remove')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItem.items.map(({ id, item, quantity }) => {
                          return (
                            <CartLine
                              key={id}
                              item={item}
                              quantity={quantity}
                              id={id}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="cartbox__btn">
                    <ul
                      className="cart__btn__list d-flex flex-wrap flex-md-nowrap flex-lg-nowrap justify-content-between"
                      style={{ justifyContent: 'flex-end !important' }}
                    >
                      {/* <li>
                        <Button>{t('cart.title.coupon.code')}</Button>
                      </li>
                      <li>
                        <Button>{t('cart.title.apply.code')}</Button>
                      </li> */}
                      {/* <li>
                        <Button onClick={handleUpdateCart}>{t('cart.title.update.cart')}</Button>
                      </li> */}
                      <li>
                        <Button type="button" onClick={handleCheckout}>
                          {t('cart.title.checkout')}
                        </Button>
                      </li>
                    </ul>
                  </div>
                </form>
              </>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-6">
              <div className="cartbox__total__area">
                <div className="cartbox-total d-flex justify-content-between">
                  <ul className="cart__total__list">
                    {/* <li>{t('cart.title.cart.total')}</li> */}
                    {/* <li>{t('cart.title.sub.total')}</li> */}
                  </ul>
                  <ul className="cart__total__tk">
                    {/* <li>{moneyFormat(totalMoney)}</li> */}
                    {/* <li>$70</li> */}
                  </ul>
                </div>
                <div className="cart__total__amount">
                  <span>{t('cart.title.grand.total')}</span>
                  <span>{moneyFormat(totalMoney)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* cart-main-area end */}
    </div>
  );
};

export default CartContainer;
