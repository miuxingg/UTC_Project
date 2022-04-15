import { Box, Divider, Rating, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BooksSection } from '../../components/collecttions';
import Typography from '../../components/elements/Typography';
import { REVIEW_COUNT } from '../../configs';
import {
  getItemDataStorage,
  LocalStorageKey,
  setItemDataStorage,
} from '../../libs/utils/localStorage';
import { setError, setSuccess } from '../../redux/app';
import { authSelector } from '../../redux/auth/selectors';
import { transformBookCart } from '../../redux/book/dto';
import {
  allCloudtag,
  bookDetailSelector,
  newBook,
} from '../../redux/book/selectors';
import { addItemToCart, createCartItem } from '../../redux/cart';
import { getCategoryByIds } from '../../redux/categories';
import {
  allCategories,
  currentCategories,
} from '../../redux/categories/selectors';
import { createReviewOnBook, getMoreReviewOnBook } from '../../redux/review';
import { allReviewOnBook } from '../../redux/review/selectors';
import SliderRange from '../ProductsContainer/SliderRange';
import ImageSlide from './ImageSlide';
import Review from './Reviews';

const SeeMore = styled('span')({
  color: 'blue',
  cursor: 'pointer',
});

const ProductDetailContainer: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelector);
  const [quantity, setQuantity] = useState<number>(1);
  const bookDetail = useSelector(bookDetailSelector);
  const newBookSelector = useSelector(newBook);
  const listCategories = useSelector(allCategories);
  const cloudtag = useSelector(allCloudtag);
  const currentCategoryList = useSelector(currentCategories);
  const reviews = useSelector(allReviewOnBook);

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  const handleAddToCart = () => {
    if (bookDetail.id && quantity) {
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
      dispatch(setError({ message: 'Thêm vào giỏ hàng thất bại' }));
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
      dispatch(createReviewOnBook({ rating, comment, bookId: bookDetail.id }));
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
                      <div className="product-reviews-summary d-flex">
                        <ul className="rating-summary d-flex">
                          <li>
                            <i className="zmdi zmdi-star-outline" />
                          </li>
                          <li>
                            <i className="zmdi zmdi-star-outline" />
                          </li>
                          <li>
                            <i className="zmdi zmdi-star-outline" />
                          </li>
                          <li className="off">
                            <i className="zmdi zmdi-star-outline" />
                          </li>
                          <li className="off">
                            <i className="zmdi zmdi-star-outline" />
                          </li>
                        </ul>
                      </div>
                      <div className="price-box">
                        <span>{bookDetail.price}</span>
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
                            Add to Cart
                          </button>
                        </div>
                        <div className="product-addto-links clearfix">
                          <a className="wishlist" href="#" />
                          <a className="compare" href="#" />
                        </div>
                      </div>
                      <div className="product_meta">
                        <span className="posted_in">
                          Categories:&nbsp;
                          {bookDetail?.category
                            ? bookDetail.category.map((item, i) => {
                                return (
                                  <a key={item.id}>
                                    {item.name}&nbsp;
                                    {i !== currentCategoryList.length - 1
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
                          <li className="categories-title">Share :</li>
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
                    Details
                  </a>
                  <a
                    className="nav-item nav-link"
                    data-toggle="tab"
                    href="#nav-review"
                    role="tab"
                  >
                    Reviews
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
                    id="nav-review"
                    role="tabpanel"
                  >
                    <div>
                      <h3>Customer Reviews</h3>
                      {reviews.items.map((item, i) => {
                        return (
                          <React.Fragment key={i}>
                            <Review
                              comment={item.comment}
                              rating={item.rating}
                              username={`${item.user.firstName} ${item.user.lastName}`}
                              avatar={item.user.avatar}
                            />
                            {i !== reviews.items.length - 1 ? (
                              <Divider />
                            ) : null}
                          </React.Fragment>
                        );
                      })}
                      {reviews.total !== reviews.items.length ? (
                        <SeeMore onClick={handleSeeMoreReview}>
                          Xem thêm ({reviews.total - reviews.items.length}) bình
                          luận...
                        </SeeMore>
                      ) : null}
                    </div>
                    <div className="review-fieldset">
                      <h3>Your review</h3>
                      <div className="review_form_field">
                        <div className="review__ratings__type d-flex">
                          <div className="review-ratings">
                            <Box
                              // className="rating-summary d-flex"
                              display="flex"
                              alignItems="center"
                              mb={3}
                            >
                              <Typography fontWeight={600}>Đánh giá</Typography>
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
                          <Typography fontWeight={600}>Review</Typography>
                          <textarea
                            name="review"
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <div className="review-form-actions">
                          <button onClick={handleSubmitReview}>
                            Submit Review
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
            <div className="col-lg-3 col-12 md-mt-40 sm-mt-40">
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
                      {/* <div className="price--filter">
                        <a href="#">Filter</a>
                      </div> */}
                    </div>
                  </div>
                </aside>
                {/* <aside className="wedget__categories poroduct--compare">
                  <h3 className="wedget__title">Compare</h3>
                  <ul>
                    <li>
                      <a href="#">x</a>
                      <a href="#">Condimentum posuere</a>
                    </li>
                    <li>
                      <a href="#">x</a>
                      <a href="#">Condimentum posuere</a>
                    </li>
                    <li>
                      <a href="#">x</a>
                      <a href="#">Dignissim venenatis</a>
                    </li>
                  </ul>
                </aside> */}
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
            </div>
          </div>
        </div>
      </div>
      {/* End main Content */}
      {/* Start Search Popup */}
      <div className="box-search-content search_active block-bg close__top">
        <form id="search_mini_form--2" className="minisearch" action="#">
          <div className="field__search">
            <input type="text" placeholder="Search entire store here..." />
            <div className="action">
              <a href="#">
                <i className="zmdi zmdi-search" />
              </a>
            </div>
          </div>
        </form>
        <div className="close__wrap">
          <span>close</span>
        </div>
      </div>
      {/* End Search Popup */}
      {/* QUICKVIEW PRODUCT */}
      <div id="quickview-wrapper">
        {/* Modal */}
        <div
          className="modal fade"
          id="productmodal"
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog modal__container" role="document">
            <div className="modal-content">
              <div className="modal-header modal__header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-product">
                  {/* Start product images */}
                  <div className="product-images">
                    <div className="main-image images">
                      <img
                        alt="big images"
                        src="images/product/big-img/1.jpg"
                      />
                    </div>
                  </div>
                  {/* end product images */}

                  {/* .product-info */}
                </div>
                {/* .modal-product */}
              </div>
              {/* .modal-body */}
            </div>
            {/* .modal-content */}
          </div>
          {/* .modal-dialog */}
        </div>
        {/* END Modal */}
      </div>
      {/* END QUICKVIEW PRODUCT */}
    </div>
  );
};

export default ProductDetailContainer;
