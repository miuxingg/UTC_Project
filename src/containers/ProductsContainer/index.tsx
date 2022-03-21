import { Box, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITEM_PER_PAGE } from '../../configs';
import { allBooksByFilter } from '../../redux/book';
import { transformBookCart } from '../../redux/book/dto';
import { allBookByFilter } from '../../redux/book/selectors';
import { allCategories } from '../../redux/categories/selectors';
import BooksSectionGrid from './BooksSectionGrid';
import BooksSectionLine from './BooksSectionLine';
import SliderRange from './SliderRange';

const ProductsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [queries, setQueries] = useState({
    category: '',
    limit: ITEM_PER_PAGE,
  });
  const listCategories = useSelector(allCategories);
  const listBook = useSelector(allBookByFilter);
  useEffect(() => {
    dispatch(allBooksByFilter(queries));
  }, [queries]);
  const handleCategoryClick = (id?: string) => {
    if (id) {
      setQueries((pre) => {
        return { ...pre, category: id };
      });
    } else {
      setQueries((pre) => {
        return { ...pre, category: '' };
      });
    }
  };
  return (
    <div className="wrapper" id="wrapper">
      {/* Start Bradcaump area */}
      <div className="ht__bradcaump__area bg-image--6">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcaump__inner text-center">
                {/* <h2 className="bradcaump-title">Shop Grid</h2>
                <nav className="bradcaump-content">
                  <a className="breadcrumb_item" href="index.html">
                    Home
                  </a>
                  <span className="brd-separetor">/</span>
                  <span className="breadcrumb_item active">Shop Grid</span>
                </nav> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Bradcaump area */}
      {/* Start Shop Page */}
      <div className="page-shop-sidebar left--sidebar bg--white section-padding--lg">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-12 order-2 order-lg-1 md-mt-40 sm-mt-40">
              <div className="shop__sidebar">
                <aside className="wedget__categories poroduct--cat">
                  <h3 className="wedget__title">Product Categories</h3>
                  <ul>
                    <li style={{ cursor: 'pointer' }}>
                      <Box onClick={() => handleCategoryClick()}>
                        <a>
                          Tất cả <span>({listBook.total})</span>
                        </a>
                      </Box>
                    </li>
                    {listCategories.items.map((item, index) => {
                      return (
                        <li key={item._id} style={{ cursor: 'pointer' }}>
                          <Box onClick={() => handleCategoryClick(item._id)}>
                            <a>
                              {item.name} <span>({index})</span>
                            </a>
                          </Box>
                        </li>
                      );
                    })}
                  </ul>
                </aside>
                <aside className="wedget__categories pro--range">
                  <h3 className="wedget__title">Filter by price</h3>
                  <div className="content-shopby">
                    <div className="price_filter s-filter clear">
                      {/* <form action="#" method="GET">
                        <div className="slider__range--output">
                          <div className="price__output--wrap">
                            <div className="price--output">
                              <span>Price :</span>
                              <SliderRange />
                            </div>
                            <div className="price--filter">
                              <a href="#">Filter</a>
                            </div>
                          </div>
                        </div>
                      </form> */}
                      <SliderRange />
                      <div className="price--filter">
                        <a href="#">Filter</a>
                      </div>
                    </div>
                  </div>
                </aside>
                <aside className="wedget__categories poroduct--tag">
                  <h3 className="wedget__title">Product Tags</h3>
                  <ul>
                    <li>
                      <a href="#">Biography</a>
                    </li>
                    <li>
                      <a href="#">Business</a>
                    </li>
                    <li>
                      <a href="#">Cookbooks</a>
                    </li>
                    <li>
                      <a href="#">Health &amp; Fitness</a>
                    </li>
                    <li>
                      <a href="#">History</a>
                    </li>
                    <li>
                      <a href="#">Mystery</a>
                    </li>
                    <li>
                      <a href="#">Inspiration</a>
                    </li>
                    <li>
                      <a href="#">Religion</a>
                    </li>
                    <li>
                      <a href="#">Fiction</a>
                    </li>
                    <li>
                      <a href="#">Fantasy</a>
                    </li>
                    <li>
                      <a href="#">Music</a>
                    </li>
                    <li>
                      <a href="#">Toys</a>
                    </li>
                    <li>
                      <a href="#">Hoodies</a>
                    </li>
                  </ul>
                </aside>
                {/* <aside className="wedget__categories sidebar--banner">
                  <img
                    src="images/others/banner_left.jpg"
                    alt="banner images"
                  />
                  <div className="text">
                    <h2>new products</h2>
                    <h6>
                      save up to <br /> <strong>40%</strong>off
                    </h6>
                  </div>
                </aside> */}
              </div>
            </div>
            <div className="col-lg-9 col-12 order-1 order-lg-2">
              <div className="row">
                <div className="col-lg-12">
                  <div className="shop__list__wrapper d-flex flex-wrap flex-md-nowrap justify-content-between">
                    <div
                      className="shop__list nav justify-content-center"
                      role="tablist"
                    >
                      <a
                        className="nav-item nav-link active"
                        data-toggle="tab"
                        href="#nav-grid"
                        role="tab"
                      >
                        <i className="fa fa-th" />
                      </a>
                      <a
                        className="nav-item nav-link"
                        data-toggle="tab"
                        href="#nav-list"
                        role="tab"
                      >
                        <i className="fa fa-list" />
                      </a>
                    </div>
                    {/* <p>Showing 1–12 of 40 results</p> */}
                    {/* <div className="orderby__wrapper">
                      <span>Sort By</span>
                      <select className="shot__byselect">
                        <option>Default sorting</option>
                        <option>HeadPhone</option>
                        <option>Furniture</option>
                        <option>Jewellery</option>
                        <option>Handmade</option>
                        <option>Kids</option>
                      </select>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="tab__container">
                <div
                  className="shop-grid tab-pane fade show active"
                  id="nav-grid"
                  role="tabpanel"
                >
                  <div className="row">
                    <BooksSectionGrid
                      listItem={transformBookCart(listBook.items ?? [])}
                    />
                    {/* End Single Product */}
                  </div>
                  <Box display="flex" justifyContent="center">
                    <Pagination
                      count={Math.ceil(listBook.total / ITEM_PER_PAGE)}
                      shape="rounded"
                    />
                  </Box>
                </div>
                <div
                  className="shop-grid tab-pane fade"
                  id="nav-list"
                  role="tabpanel"
                >
                  <div className="list__view__wrapper">
                    <BooksSectionLine
                      listItem={transformBookCart(listBook.items ?? [])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Shop Page */}
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
                  <div className="product-info">
                    <h1>Simple Fabric Bags</h1>
                    <div className="rating__and__review">
                      <ul className="rating">
                        <li>
                          <span className="ti-star" />
                        </li>
                        <li>
                          <span className="ti-star" />
                        </li>
                        <li>
                          <span className="ti-star" />
                        </li>
                        <li>
                          <span className="ti-star" />
                        </li>
                        <li>
                          <span className="ti-star" />
                        </li>
                      </ul>
                      <div className="review">
                        <a href="#">4 customer reviews</a>
                      </div>
                    </div>
                    <div className="price-box-3">
                      <div className="s-price-box">
                        <span className="new-price">$17.20</span>
                        <span className="old-price">$45.00</span>
                      </div>
                    </div>
                    <div className="quick-desc">
                      Designed for simplicity and made from high quality
                      materials. Its sleek geometry and material combinations
                      creates a modern look.
                    </div>
                    <div className="select__color">
                      <h2>Select color</h2>
                      <ul className="color__list">
                        <li className="red">
                          <a title="Red" href="#">
                            Red
                          </a>
                        </li>
                        <li className="gold">
                          <a title="Gold" href="#">
                            Gold
                          </a>
                        </li>
                        <li className="orange">
                          <a title="Orange" href="#">
                            Orange
                          </a>
                        </li>
                        <li className="orange">
                          <a title="Orange" href="#">
                            Orange
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="select__size">
                      <h2>Select size</h2>
                      <ul className="color__list">
                        <li className="l__size">
                          <a title="L" href="#">
                            L
                          </a>
                        </li>
                        <li className="m__size">
                          <a title="M" href="#">
                            M
                          </a>
                        </li>
                        <li className="s__size">
                          <a title="S" href="#">
                            S
                          </a>
                        </li>
                        <li className="xl__size">
                          <a title="XL" href="#">
                            XL
                          </a>
                        </li>
                        <li className="xxl__size">
                          <a title="XXL" href="#">
                            XXL
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="social-sharing">
                      <div className="widget widget_socialsharing_widget">
                        <h3 className="widget-title-modal">
                          Share this product
                        </h3>
                        <ul className="social__net social__net--2 d-flex justify-content-start">
                          <li className="facebook">
                            <a href="#" className="rss social-icon">
                              <i className="zmdi zmdi-rss" />
                            </a>
                          </li>
                          <li className="linkedin">
                            <a href="#" className="linkedin social-icon">
                              <i className="zmdi zmdi-linkedin" />
                            </a>
                          </li>
                          <li className="pinterest">
                            <a href="#" className="pinterest social-icon">
                              <i className="zmdi zmdi-pinterest" />
                            </a>
                          </li>
                          <li className="tumblr">
                            <a href="#" className="tumblr social-icon">
                              <i className="zmdi zmdi-tumblr" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="addtocart-btn">
                      <a href="#">Add to cart</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END QUICKVIEW PRODUCT */}
    </div>
  );
};

export default ProductsContainer;
