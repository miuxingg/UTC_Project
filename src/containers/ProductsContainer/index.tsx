import { Box } from '@mui/material';
import React from 'react';
import { BookCart } from '../../components/collecttions';

const ProductsContainer: React.FC = () => {
  return (
    <div className="wrapper" id="wrapper">
      {/* Start Bradcaump area */}
      <div className="ht__bradcaump__area bg-image--6">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcaump__inner text-center">
                <h2 className="bradcaump-title">Shop Grid</h2>
                <nav className="bradcaump-content">
                  <a className="breadcrumb_item" href="index.html">
                    Home
                  </a>
                  <span className="brd-separetor">/</span>
                  <span className="breadcrumb_item active">Shop Grid</span>
                </nav>
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
                    <li>
                      <a href="#">
                        Biography <span>(3)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Business <span>(4)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Cookbooks <span>(6)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Health &amp; Fitness <span>(7)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        History <span>(8)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Mystery <span>(9)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Inspiration <span>(13)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Romance <span>(20)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Fiction/Fantasy <span>(22)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Self-Improvement <span>(13)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Humor Books <span>(17)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Harry Potter <span>(20)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Land of Stories <span>(34)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Kids Music <span>(60)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Toys &amp; Games <span>(3)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        hoodies <span>(3)</span>
                      </a>
                    </li>
                  </ul>
                </aside>
                <aside className="wedget__categories pro--range">
                  <h3 className="wedget__title">Filter by price</h3>
                  <div className="content-shopby">
                    <div className="price_filter s-filter clear">
                      <form action="#" method="GET">
                        <div id="slider-range" />
                        <div className="slider__range--output">
                          <div className="price__output--wrap">
                            <div className="price--output">
                              <span>Price :</span>
                              <input type="text" id="amount" />
                            </div>
                            <div className="price--filter">
                              <a href="#">Filter</a>
                            </div>
                          </div>
                        </div>
                      </form>
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
                    <p>Showing 1–12 of 40 results</p>
                    <div className="orderby__wrapper">
                      <span>Sort By</span>
                      <select className="shot__byselect">
                        <option>Default sorting</option>
                        <option>HeadPhone</option>
                        <option>Furniture</option>
                        <option>Jewellery</option>
                        <option>Handmade</option>
                        <option>Kids</option>
                      </select>
                    </div>
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
                    <Box ml={3} display="flex" flexWrap="wrap">
                      <Box mx={1}>
                        <BookCart
                          name={'Ten sach'}
                          price={100000}
                          image={''}
                          status={'HOT'}
                        />
                      </Box>
                      <Box mx={1}>
                        <BookCart
                          name={'Ten sach'}
                          price={100000}
                          image={''}
                          status={'HOT'}
                        />
                      </Box>
                      <Box mx={1}>
                        <BookCart
                          name={'Ten sach'}
                          price={100000}
                          image={''}
                          status={'HOT'}
                        />
                      </Box>
                      <Box mx={1}>
                        <BookCart
                          name={'Ten sach'}
                          price={100000}
                          image={''}
                          status={'HOT'}
                        />
                      </Box>
                    </Box>
                    {/* End Single Product */}
                  </div>
                  <ul className="wn__pagination">
                    <li className="active">
                      <a href="#">1</a>
                    </li>
                    <li>
                      <a href="#">2</a>
                    </li>
                    <li>
                      <a href="#">3</a>
                    </li>
                    <li>
                      <a href="#">4</a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="zmdi zmdi-chevron-right" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  className="shop-grid tab-pane fade"
                  id="nav-list"
                  role="tabpanel"
                >
                  <div className="list__view__wrapper">
                    {/* Start Single Product */}
                    <div className="list__view">
                      <div className="thumb">
                        <a className="first__img" href="single-product.html">
                          <img
                            src="images/product/1.jpg"
                            alt="product images"
                          />
                        </a>
                        <a
                          className="second__img animation1"
                          href="single-product.html"
                        >
                          <img
                            src="images/product/2.jpg"
                            alt="product images"
                          />
                        </a>
                      </div>
                      <div className="content">
                        <h2>
                          <a href="single-product.html">Ali Smith</a>
                        </h2>
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
                        <ul className="prize__box">
                          <li>$111.00</li>
                          <li className="old__prize">$220.00</li>
                        </ul>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nam fringilla augue nec est tristique auctor.
                          Donec non est at libero vulputate rutrum. Morbi ornare
                          lectus quis justo gravida semper. Nulla tellus mi,
                          vulputate adipiscing cursus eu, suscipit id nulla.
                        </p>
                        <ul className="cart__action d-flex">
                          <li className="cart">
                            <a href="cart.html">Add to cart</a>
                          </li>
                          <li className="wishlist">
                            <a href="cart.html" />
                          </li>
                          <li className="compare">
                            <a href="cart.html" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* End Single Product */}
                    {/* Start Single Product */}
                    <div className="list__view mt--40">
                      <div className="thumb">
                        <a className="first__img" href="single-product.html">
                          <img
                            src="images/product/2.jpg"
                            alt="product images"
                          />
                        </a>
                        <a
                          className="second__img animation1"
                          href="single-product.html"
                        >
                          <img
                            src="images/product/4.jpg"
                            alt="product images"
                          />
                        </a>
                      </div>
                      <div className="content">
                        <h2>
                          <a href="single-product.html">Blood In Water</a>
                        </h2>
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
                        <ul className="prize__box">
                          <li>$111.00</li>
                          <li className="old__prize">$220.00</li>
                        </ul>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nam fringilla augue nec est tristique auctor.
                          Donec non est at libero vulputate rutrum. Morbi ornare
                          lectus quis justo gravida semper. Nulla tellus mi,
                          vulputate adipiscing cursus eu, suscipit id nulla.
                        </p>
                        <ul className="cart__action d-flex">
                          <li className="cart">
                            <a href="cart.html">Add to cart</a>
                          </li>
                          <li className="wishlist">
                            <a href="cart.html" />
                          </li>
                          <li className="compare">
                            <a href="cart.html" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* End Single Product */}
                    {/* Start Single Product */}
                    <div className="list__view mt--40">
                      <div className="thumb">
                        <a className="first__img" href="single-product.html">
                          <img
                            src="images/product/3.jpg"
                            alt="product images"
                          />
                        </a>
                        <a
                          className="second__img animation1"
                          href="single-product.html"
                        >
                          <img
                            src="images/product/6.jpg"
                            alt="product images"
                          />
                        </a>
                      </div>
                      <div className="content">
                        <h2>
                          <a href="single-product.html">Madeness Overated</a>
                        </h2>
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
                        <ul className="prize__box">
                          <li>$111.00</li>
                          <li className="old__prize">$220.00</li>
                        </ul>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nam fringilla augue nec est tristique auctor.
                          Donec non est at libero vulputate rutrum. Morbi ornare
                          lectus quis justo gravida semper. Nulla tellus mi,
                          vulputate adipiscing cursus eu, suscipit id nulla.
                        </p>
                        <ul className="cart__action d-flex">
                          <li className="cart">
                            <a href="cart.html">Add to cart</a>
                          </li>
                          <li className="wishlist">
                            <a href="cart.html" />
                          </li>
                          <li className="compare">
                            <a href="cart.html" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* End Single Product */}
                    {/* Start Single Product */}
                    <div className="list__view mt--40">
                      <div className="thumb">
                        <a className="first__img" href="single-product.html">
                          <img
                            src="images/product/4.jpg"
                            alt="product images"
                          />
                        </a>
                        <a
                          className="second__img animation1"
                          href="single-product.html"
                        >
                          <img
                            src="images/product/6.jpg"
                            alt="product images"
                          />
                        </a>
                      </div>
                      <div className="content">
                        <h2>
                          <a href="single-product.html">Watching You</a>
                        </h2>
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
                        <ul className="prize__box">
                          <li>$111.00</li>
                          <li className="old__prize">$220.00</li>
                        </ul>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nam fringilla augue nec est tristique auctor.
                          Donec non est at libero vulputate rutrum. Morbi ornare
                          lectus quis justo gravida semper. Nulla tellus mi,
                          vulputate adipiscing cursus eu, suscipit id nulla.
                        </p>
                        <ul className="cart__action d-flex">
                          <li className="cart">
                            <a href="cart.html">Add to cart</a>
                          </li>
                          <li className="wishlist">
                            <a href="cart.html" />
                          </li>
                          <li className="compare">
                            <a href="cart.html" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* End Single Product */}
                    {/* Start Single Product */}
                    <div className="list__view mt--40">
                      <div className="thumb">
                        <a className="first__img" href="single-product.html">
                          <img
                            src="images/product/5.jpg"
                            alt="product images"
                          />
                        </a>
                        <a
                          className="second__img animation1"
                          href="single-product.html"
                        >
                          <img
                            src="images/product/9.jpg"
                            alt="product images"
                          />
                        </a>
                      </div>
                      <div className="content">
                        <h2>
                          <a href="single-product.html">Court Wings Run</a>
                        </h2>
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
                        <ul className="prize__box">
                          <li>$111.00</li>
                          <li className="old__prize">$220.00</li>
                        </ul>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nam fringilla augue nec est tristique auctor.
                          Donec non est at libero vulputate rutrum. Morbi ornare
                          lectus quis justo gravida semper. Nulla tellus mi,
                          vulputate adipiscing cursus eu, suscipit id nulla.
                        </p>
                        <ul className="cart__action d-flex">
                          <li className="cart">
                            <a href="cart.html">Add to cart</a>
                          </li>
                          <li className="wishlist">
                            <a href="cart.html" />
                          </li>
                          <li className="compare">
                            <a href="cart.html" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* End Single Product */}
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
