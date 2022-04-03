import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Routers } from '../../../configs/navigator';
import { useRouter } from 'next/router';
import { t } from 'i18next';
import { Language } from '../../../configs';
import i18n from '../../../languages/i18n';
import { setItemStorage } from '../../../libs/utils/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../redux/auth/selectors';
import { allCart } from '../../../redux/cart/selectors';
import { moneyFormat } from '../../../libs/utils';
import { removeItem } from '../../../redux/cart';
import { Box, styled } from '@mui/material';

const Image = styled('img')({
  width: '75px',
  height: '94px',
});

const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isShowCart, setIsShowCart] = useState<boolean>(false);
  const [isShowProfile, setIsShowProfile] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const isAuthenticated = useSelector(authSelector);
  const cartItem = useSelector(allCart);

  const totalMoney = useMemo(() => {
    return cartItem.items.reduce((total, current) => {
      return total + current.item.price * current.quantity;
    }, 0);
  }, [cartItem]);

  const [search, setSearch] = useState<string>('');
  const handleSearchClick = () => {
    router.push({ pathname: Routers.products.path, query: { search: search } });
  };

  const handleChangeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    setItemStorage('language', language);
  };

  const handleRemoveItemCart = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <>
      <header
        id="wn__header"
        className="header__area header__absolute sticky__header"
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-6 col-lg-2">
              <div className="logo">
                <Link href={Routers.home.path}>
                  <a>
                    <img src="images/logo/logo.png" alt="logo images" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-8 d-none d-lg-block">
              <nav className="mainmenu__nav">
                <ul className="meninmenu d-flex justify-content-start">
                  <li className="drop with--one--item">
                    <Link href={Routers.home.path}>
                      <a>Home</a>
                    </Link>
                  </li>
                  <li className="drop">
                    <Link href={Routers.products.path}>
                      <a>Shop</a>
                    </Link>
                  </li>
                  <li className="drop">
                    <Link href={Routers.products.path}>
                      <a>Books</a>
                    </Link>
                  </li>
                  <li className="drop">
                    <Link href={Routers.cart.path}>
                      <a>Cart</a>
                    </Link>
                  </li>
                  <li className="drop">
                    <Link href={Routers.checkout.path}>
                      <a>Checkout</a>
                    </Link>
                  </li>
                  <li className="drop">
                    <Link href={Routers.products.path}>
                      <a>Blog</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={Routers.products.path}>
                      <a>Contact</a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-6 col-sm-6 col-6 col-lg-2">
              <ul className="header__sidebar__right d-flex justify-content-end align-items-center">
                <li
                  className="shop_search"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsSearch((pre) => !pre)}
                >
                  <a className="search__active" />
                </li>
                <li className="wishlist" style={{ cursor: 'pointer' }}>
                  <a />
                </li>
                <li
                  className="shopcart"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setIsShowCart((pre) => !pre);
                  }}
                >
                  <a>
                    <span className="product_qun">{cartItem.total}</span>
                  </a>
                  {/* Start Shopping Cart */}
                  {isShowCart ? (
                    <div
                      className={`block-minicart minicart__active ${
                        isShowCart ? 'is-visible' : null
                      }`}
                    >
                      <div className="minicart-content-wrapper">
                        <div className="micart__close">
                          <span>close</span>
                        </div>
                        <div className="items-total d-flex justify-content-between">
                          <span>{cartItem.total} items</span>
                          <span>Cart Subtotal</span>
                        </div>
                        <div className="total_amount text-right">
                          <span>{moneyFormat(totalMoney)}</span>
                        </div>
                        <div className="mini_action checkout">
                          <a className="checkout__btn">Go to Checkout</a>
                        </div>
                        <div className="single__items">
                          <div className="miniproduct">
                            {cartItem.items.map(({ id, item, quantity }) => {
                              return (
                                <Box key={id} my={2}>
                                  <div className="item01 d-flex">
                                    <div className="thumb">
                                      <a>
                                        <Image
                                          src={item.thumbnail}
                                          alt="product images"
                                        />
                                      </a>
                                    </div>
                                    <div className="content">
                                      <h6>
                                        <a>{item.name}</a>
                                      </h6>
                                      <span className="prize">
                                        {moneyFormat(item.price)}
                                      </span>
                                      <div className="product_prize d-flex justify-content-between">
                                        <span className="qun">
                                          Qty: {quantity}
                                        </span>
                                        <ul className="d-flex justify-content-end">
                                          <li>
                                            <a>
                                              <i className="zmdi zmdi-settings" />
                                            </a>
                                          </li>
                                          <li
                                            onClick={() =>
                                              handleRemoveItemCart(id)
                                            }
                                          >
                                            <a>
                                              <i className="zmdi zmdi-delete" />
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </Box>
                              );
                            })}
                          </div>
                        </div>
                        <div className="mini_action cart">
                          <a className="cart__btn">View and edit cart</a>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* End Shopping Cart */}
                </li>

                <li
                  className="setting__bar__icon"
                  onClick={() => {
                    setIsShowProfile((pre) => !pre);
                  }}
                >
                  <a className="setting__active" />
                  {isShowProfile ? (
                    <>
                      <div
                        className={`searchbar__content ${
                          isShowProfile
                            ? 'setting__block is-visible'
                            : 'setting__block'
                        }`}
                      >
                        <div className="content-inner">
                          <div className="switcher-currency">
                            <strong className="label switcher-label">
                              <span>Language</span>
                            </strong>
                            <div className="switcher-options">
                              <div className="switcher-currency-trigger">
                                <span
                                  className="currency-trigger"
                                  onClick={() =>
                                    handleChangeLanguage(Language.EN)
                                  }
                                >
                                  {t('header.language.en')}
                                </span>
                                <span
                                  className="currency-trigger"
                                  onClick={() =>
                                    handleChangeLanguage(Language.VI)
                                  }
                                >
                                  {t('header.language.vi')}
                                </span>
                                {/* <ul className="switcher-dropdown">
                              <li>English02</li>
                              <li>English03</li>
                              <li>English04</li>
                              <li>English05</li>
                            </ul> */}
                              </div>
                            </div>
                          </div>
                          {/* <div className="switcher-currency">
                        <strong className="label switcher-label">
                          <span>Select Store</span>
                        </strong>
                        <div className="switcher-options">
                          <div className="switcher-currency-trigger">
                            <span className="currency-trigger">
                              Fashion Store
                            </span>
                            <ul className="switcher-dropdown">
                              <li>Furniture</li>
                              <li>Shoes</li>
                              <li>Speaker Store</li>
                              <li>Furniture</li>
                            </ul>
                          </div>
                        </div>
                      </div> */}
                          <div className="switcher-currency">
                            <strong className="label switcher-label">
                              <span>My Account</span>
                            </strong>
                            <div className="switcher-options">
                              <div className="switcher-currency-trigger">
                                <div className="setting__menu">
                                  {isAuthenticated ? (
                                    <span>
                                      <Link href={Routers.register.path}>
                                        <a>Logout</a>
                                      </Link>
                                    </span>
                                  ) : (
                                    <>
                                      <span>
                                        <Link href={Routers.login.path}>
                                          <a>Login</a>
                                        </Link>
                                      </span>
                                      <span>
                                        <Link href={Routers.register.path}>
                                          <a>Register</a>
                                        </Link>
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </li>
              </ul>
            </div>
          </div>
          {/* Start Mobile Menu */}
          <div className="row d-none">
            <div className="col-lg-12 d-none">
              <nav className="mobilemenu__nav">
                <ul className="meninmenu">
                  <li>
                    <a>Home</a>
                  </li>
                  <li>
                    <a>Pages</a>
                  </li>
                  <li>
                    <a>Shop</a>
                  </li>
                  <li>
                    <a>Blog</a>
                  </li>
                  <li>
                    <a>Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          {/* End Mobile Menu */}
          <div className="mobile-menu d-block d-lg-none"></div>
          {/* Mobile Menu */}
        </div>
      </header>
      <div
        className={`brown--color box-search-content ${
          isSearch ? 'search__active is-visible' : 'search_active'
        }  block-bg close__top`}
      >
        <form id="search_mini_form" className="minisearch" action="#">
          <div className="field__search">
            <input
              type="text"
              placeholder="Search entire store here..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <div
              className="action"
              style={{ cursor: 'pointer' }}
              onClick={handleSearchClick}
            >
              <a>
                <i className="zmdi zmdi-search" />
              </a>
            </div>
          </div>
        </form>
        <div className="close__wrap" onClick={() => setIsSearch(false)}>
          <span>close</span>
        </div>
      </div>
    </>
  );
};

export default Header;
