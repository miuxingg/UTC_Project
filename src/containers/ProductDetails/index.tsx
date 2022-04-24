import { Box, Divider, Rating, styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '../../components/elements/Typography';
import { REVIEW_COUNT } from '../../configs';
import {
  getItemDataStorage,
  LocalStorageKey,
  setItemDataStorage,
} from '../../libs/utils/localStorage';
import { setError, setSuccess } from '../../redux/app';
import { authSelector } from '../../redux/auth/selectors';
import {
  allCloudtag,
  bookDetailSelector,
  newBook,
} from '../../redux/book/selectors';
import { addItemToCart, createCartItem } from '../../redux/cart';
import {
  allCategories,
  currentCategories,
} from '../../redux/categories/selectors';
import { createReviewOnBook, getMoreReviewOnBook } from '../../redux/review';
import { allReviewOnBook } from '../../redux/review/selectors';
import SliderRange from '../ProductsContainer/SliderRange';
import ImageSlide from './ImageSlide';
import Review from './Reviews';
import dayjs from 'dayjs';
import { moneyFormat } from '../../libs/utils';
import BookInCombo, { ListBookInCombo } from './Combo';
import { useTranslation } from 'react-i18next';
import { toggleFavorite } from '../../redux/favorite';

const SeeMore = styled('span')({
  color: 'blue',
  cursor: 'pointer',
});

const ProductDetailContainer: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelector);
  const [quantity, setQuantity] = useState<number>(1);
  const bookDetail = useSelector(bookDetailSelector);
  // const newBookSelector = useSelector(newBook);;
  const reviews = useSelector(allReviewOnBook);

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [favoriteHover, setFavoriteHover] = useState<boolean>(false);

  const handleAddToCart = () => {
    if (bookDetail.id && quantity > 0) {
      if (isAuthenticated) {
        dispatch(
          createCartItem({
            bookId: bookDetail.id,
            quantity: quantity,
          }),
        );
        dispatch(setSuccess({ message: 'Thêm vào giỏ hàng thành công' }));
      } else {
        const cartLocal = getItemDataStorage(LocalStorageKey.BookStoreCart);
        const currentCart = cartLocal ? JSON.parse(cartLocal) : [];
        const isBookOnCart = currentCart.find(
          (item: any) => item.bookId === bookDetail.id,
        );
        if (!isBookOnCart) {
          currentCart.push({
            bookId: bookDetail.id,
            quantity: quantity,
          });
          setItemDataStorage(
            LocalStorageKey.BookStoreCart,
            JSON.stringify(currentCart),
          );
        } else {
          setItemDataStorage(
            LocalStorageKey.BookStoreCart,
            JSON.stringify(
              currentCart.map((item: any) => {
                return item.bookId === isBookOnCart.bookId
                  ? { ...item, quantity: quantity }
                  : item;
              }),
            ),
          );
        }
        dispatch(
          addItemToCart({
            id: bookDetail.id,
            quantity: quantity,
            item: {
              id: bookDetail.id,
              name: bookDetail.name,
              thumbnail: bookDetail.thumbnail,
              price: bookDetail.price,
              priceUnDiscount: bookDetail.priceUnDiscount,
            },
          }),
        );
        dispatch(setSuccess({ message: 'Thêm vào giỏ hàng thành công' }));
      }
    } else {
      if (quantity <= 0) {
        dispatch(setError({ message: 'Số lượng không hợp lệ' }));
      } else dispatch(setError({ message: 'Thêm vào giỏ hàng thất bại' }));
    }
  };

  const handleSlideRange = (startPrice: number, endPrice: number) => {};

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null,
  ) => {
    if (value) {
      setRating(value);
    }
  };

  const handleSubmitReview = () => {
    if (isAuthenticated) {
      dispatch(
        createReviewOnBook({
          rating,
          comment,
          bookId: bookDetail.id,
        }),
      );
    } else {
      dispatch(setError({ message: 'Cần phải đăng nhập để tiếp tục' }));
    }
  };

  const handleSeeMoreReview = () => {
    dispatch(
      getMoreReviewOnBook({
        idBook: bookDetail.id,
        queries: { limit: REVIEW_COUNT, offset: reviews.items.length },
      }),
    );
  };

  const handleToggleFavoriteClick = () => {
    if (!isAuthenticated) {
      dispatch(setError({ message: t('unAuthenticated') }));
    } else {
      dispatch(toggleFavorite(bookDetail.id));
    }
  };

  return (
    <div className="wrapper" id="wrapper">
      {/* Start Bradcaump area */}
      <div className="ht__bradcaump__area bg-image--4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <div className="bradcaump__inner text-center">
                <h2 className="bradcaump-title">Shop Single</h2>
                <nav className="bradcaump-content">
                  <a className="breadcrumb_item" href="index.html">
                    Home
                  </a>
                  <span className="brd-separetor">/</span>
                  <span className="breadcrumb_item active">Shop Single</span>
                </nav>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* End Bradcaump area */}
      {/* Start main Content */}
      <div className="maincontent bg--white pt--80 pb--55">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-12">
              <div className="wn__single__product">
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <ImageSlide listImage={bookDetail.images} />
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="product__info__main">
                      <h1>{bookDetail.name}</h1>
                      <Rating
                        name="size-small"
                        value={bookDetail.rating}
                        size="small"
                        defaultValue={bookDetail.rating}
                        disabled
                      />
                      <Typography fontSize="14px">
                        {bookDetail.author}
                      </Typography>
                      <div className="price-box">
                        <span>{moneyFormat(bookDetail.price)}</span>
                      </div>
                      <div className="product__overview">
                        <aside className="wedget__categories poroduct--tag">
                          <ul>
                            {bookDetail.cloudTag?.map((item, i) => {
                              return (
                                <li key={i}>
                                  <a>{item}</a>
                                </li>
                              );
                            })}
                          </ul>
                        </aside>
                      </div>
                      <div className="box-tocart d-flex">
                        <span>Qty</span>
                        <input
                          id="qty"
                          className="input-text qty"
                          name="qty"
                          min={1}
                          defaultValue={1}
                          title="Qty"
                          type="number"
                          onChange={(e) => setQuantity(+e.target.value)}
                        />
                        <div className="addtocart__actions">
                          <button
                            className="tocart"
                            type="button"
                            title="Add to Cart"
                            onClick={() => handleAddToCart()}
                          >
                            {t('product-detail.add-cart')}
                          </button>
                        </div>
                        <div className="product-addto-links clearfix">
                          <a
                            className="wishlist"
                            onClick={handleToggleFavoriteClick}
                            style={{
                              backgroundColor:
                                bookDetail.isFavorite || favoriteHover
                                  ? '#e59285'
                                  : '#fff',
                              // color:
                              //   bookDetail.isFavorite || favoriteHover
                              //     ? '#fff'
                              //     : '#333',
                              borderColor:
                                bookDetail.isFavorite || favoriteHover
                                  ? '#e59285'
                                  : '#ebebeb',
                              cursor: 'pointer',
                            }}
                            onMouseEnter={() => setFavoriteHover(true)}
                            onMouseLeave={() => setFavoriteHover(false)}
                          />
                          <a className="compare" href="#" />
                        </div>
                      </div>
                      <div className="product_meta">
                        <span className="posted_in">
                          {t('product-detail.category')}:&nbsp;
                          {bookDetail?.category
                            ? bookDetail.category.map((item, i) => {
                                return (
                                  <a key={item.id}>
                                    {item.name}&nbsp;
                                    {i !== bookDetail?.category?.length! - 1
                                      ? ', '
                                      : null}
                                  </a>
                                );
                              })
                            : null}
                        </span>
                      </div>
                      <div className="product-share">
                        <ul>
                          <li className="categories-title">
                            {t('product-detail.share')} :
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-social-twitter icons" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-social-tumblr icons" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-social-facebook icons" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-social-linkedin icons" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {bookDetail.isCombo ? (
                <Box mt={6} mb={4}>
                  <Box>
                    <Typography fontWeight={600} fontSize={24} mb={3}>
                      {t('product-detail.combo')}
                    </Typography>
                  </Box>
                  <ListBookInCombo list={bookDetail.books || []} />
                </Box>
              ) : null}

              <div className="product__info__detailed">
                <div
                  className="pro_details_nav nav justify-content-start"
                  role="tablist"
                >
                  <a
                    className="nav-item nav-link active"
                    data-toggle="tab"
                    href="#nav-details"
                    role="tab"
                  >
                    {t('product-detail.detail')}
                  </a>
                  <a
                    className="nav-item nav-link"
                    data-toggle="tab"
                    href="#nav-summary"
                    role="tab"
                  >
                    {t('product-detail.summary')}
                  </a>
                  <a
                    className="nav-item nav-link"
                    data-toggle="tab"
                    href="#nav-review"
                    role="tab"
                  >
                    {t('product-detail.review')}
                  </a>
                </div>
                <div className="tab__container">
                  {/* Start Single Tab Content */}
                  <div
                    className="pro__tab_label tab-pane fade show active"
                    id="nav-details"
                    role="tabpanel"
                  >
                    <div className="description__attribute">
                      <p>{bookDetail.description}</p>
                      {/* <ul>
                        <li>• Two-tone gray heather hoodie.</li>
                        <li>• Drawstring-adjustable hood. </li>
                        <li>• Machine wash/dry.</li>
                      </ul> */}
                    </div>
                  </div>
                  {/* End Single Tab Content */}
                  {/* Start Single Tab Content */}
                  <div
                    className="pro__tab_label tab-pane fade"
                    id="nav-summary"
                    role="tabpanel"
                  >
                    <div className="description__attribute">
                      <p>
                        <pre>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: bookDetail?.summary || '',
                            }}
                          />
                        </pre>
                      </p>
                      {/* <ul>
                        <li>• Two-tone gray heather hoodie.</li>
                        <li>• Drawstring-adjustable hood. </li>
                        <li>• Machine wash/dry.</li>
                      </ul> */}
                    </div>
                  </div>
                  {/* End Single Tab Content */}
                  {/* Start Single Tab Content */}
                  <div
                    className="pro__tab_label tab-pane fade"
                    id="nav-review"
                    role="tabpanel"
                  >
                    <div>
                      <h3>{t('product-detail.review.custom-review')}</h3>
                      {reviews.items.map((item, i) => {
                        return (
                          <React.Fragment key={i}>
                            <Review
                              comment={item.comment}
                              rating={item.rating}
                              username={`${item.user.firstName} ${item.user.lastName}`}
                              avatar={item.user.avatar}
                              timestamps={dayjs(item.createdAt).format(
                                'DD/MM/YYYY',
                              )}
                            />
                            {i !== reviews.items.length - 1 ? (
                              <Divider />
                            ) : null}
                          </React.Fragment>
                        );
                      })}
                      {reviews.total !== reviews.items.length ? (
                        <SeeMore onClick={handleSeeMoreReview}>
                          {t('product-detail.review.see-more', {
                            total: reviews.total - reviews.items.length,
                          })}
                        </SeeMore>
                      ) : null}
                    </div>
                    <div className="review-fieldset">
                      <h3>{t('product-detail.review.your-review')}</h3>
                      <div className="review_form_field">
                        <div className="review__ratings__type d-flex">
                          <div className="review-ratings">
                            <Box display="flex" alignItems="center" mb={3}>
                              <Typography fontWeight={600}>
                                {t('product-detail.review.rating')}
                              </Typography>
                              <Box mt={1} mx={2}>
                                <Rating
                                  name="size-small"
                                  onChange={handleRatingChange}
                                  size="small"
                                />
                              </Box>
                            </Box>
                          </div>
                        </div>
                        <div className="input__box">
                          <Typography fontWeight={600}>
                            {t('product-detail.review.review-content')}
                          </Typography>
                          <textarea
                            name="review"
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <div className="review-form-actions">
                          <button onClick={handleSubmitReview}>
                            {t('product-detail.review.submit-review')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Single Tab Content */}
                </div>
              </div>
              {/* <div className="wn__related__product pt--40 pb--30">
                <Box width="700px">
                  <BooksSection
                    listItem={transformBookCart(newBookSelector.items)}
                    title="RELATED PRODUCTS"
                  />
                </Box>
              </div>
              <div className="wn__related__product">
                <Box width="700px">
                  <BooksSection
                    listItem={transformBookCart(newBookSelector.items)}
                    title="UPSELL PRODUCTS"
                  />
                </Box>
              </div> */}
            </div>
            {/* <div className="col-lg-3 col-12 md-mt-40 sm-mt-40">
              <div className="shop__sidebar">
                <aside className="wedget__categories poroduct--cat">
                  <h3 className="wedget__title">Product Categories</h3>
                  <ul>
                    {listCategories.items.map((item) => {
                      return (
                        <li key={item.id}>
                          <a>
                            {item.name} <span></span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </aside>
                <aside className="wedget__categories pro--range">
                  <h3 className="wedget__title">Filter by price</h3>
                  <div className="content-shopby">
                    <div className="price_filter s-filter clear">
                      <SliderRange onFilter={handleSlideRange} />
                    </div>
                  </div>
                </aside>

                <aside className="wedget__categories poroduct--tag">
                  <h3 className="wedget__title">Product Tags</h3>
                  <ul>
                    {cloudtag.items.map((item, index) => {
                      return (
                        <li key={index}>
                          <a>{item}</a>
                        </li>
                      );
                    })}
                  </ul>
                </aside>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContainer;
