import React from 'react';

const ProductDetailContainer: React.FC = () => {
  return (
    <div className="wrapper" id="wrapper">
      {/* Start Bradcaump area */}
      <div className="ht__bradcaump__area bg-image--4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcaump__inner text-center">
                <h2 className="bradcaump-title">Shop Single</h2>
                <nav className="bradcaump-content">
                  <a className="breadcrumb_item" href="index.html">
                    Home
                  </a>
                  <span className="brd-separetor">/</span>
                  <span className="breadcrumb_item active">Shop Single</span>
                </nav>
              </div>
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
                    <div className="wn__fotorama__wrapper">
                      <div
                        className="fotorama wn__fotorama__action"
                        data-nav="thumbs"
                      >
                        <a href="1.jpg">
                          <img src="images/product/1.jpg" alt="" />
                        </a>
                        <a href="2.jpg">
                          <img src="images/product/2.jpg" alt="" />
                        </a>
                        <a href="3.jpg">
                          <img src="images/product/3.jpg" alt="" />
                        </a>
                        <a href="4.jpg">
                          <img src="images/product/4.jpg" alt="" />
                        </a>
                        <a href="5.jpg">
                          <img src="images/product/5.jpg" alt="" />
                        </a>
                        <a href="6.jpg">
                          <img src="images/product/6.jpg" alt="" />
                        </a>
                        <a href="7.jpg">
                          <img src="images/product/7.jpg" alt="" />
                        </a>
                        <a href="8.jpg">
                          <img src="images/product/8.jpg" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="product__info__main">
                      <h1>Chaz Kangeroo Hoodie</h1>
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
                        <span>$52.00</span>
                      </div>
                      <div className="product__overview">
                        <p>
                          Ideal for cold-weather training or work outdoors, the
                          Chaz Hoodie promises superior warmth with every wear.
                          Thick material blocks out the wind as ribbed cuffs and
                          bottom band seal in body heat.
                        </p>
                        <p>
                          Ideal for cold-weather training or work outdoors, the
                          Chaz Hoodie promises superior warmth with every wear.
                          {}
                        </p>
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
                        />
                        <div className="addtocart__actions">
                          <button
                            className="tocart"
                            type="submit"
                            title="Add to Cart"
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
                          Categories:
                          <a href="#">Adventure</a>,<a href="#">Kids Music</a>
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
                      <p>
                        Ideal for cold-weather training or work outdoors, the
                        Chaz Hoodie promises superior warmth with every wear.
                        Thick material blocks out the wind as ribbed cuffs and
                        bottom band seal in body heat.Ideal for cold-weather
                        training or work outdoors, the Chaz Hoodie promises
                        superior warmth with every wear. Thick material blocks
                        out the wind as ribbed cuffs and bottom band seal in
                        body heat.Ideal for cold-weather training or work
                        outdoors, the Chaz Hoodie promises superior warmth with
                        every wear. Thick material blocks out the wind as ribbed
                        cuffs and bottom band seal in body heat.Ideal for
                        cold-weather training or work outdoors, the Chaz Hoodie
                        promises superior warmth with every wear. Thick material
                        blocks out the wind as ribbed cuffs and bottom band seal
                        in body heat.
                      </p>
                      <ul>
                        <li>• Two-tone gray heather hoodie.</li>
                        <li>• Drawstring-adjustable hood. </li>
                        <li>• Machine wash/dry.</li>
                      </ul>
                    </div>
                  </div>
                  {/* End Single Tab Content */}
                  {/* Start Single Tab Content */}
                  <div
                    className="pro__tab_label tab-pane fade"
                    id="nav-review"
                    role="tabpanel"
                  >
                    <div className="review__attribute">
                      <h1>Customer Reviews</h1>
                      <h2>Hastech</h2>
                      <div className="review__ratings__type d-flex">
                        <div className="review-ratings">
                          <div className="rating-summary d-flex">
                            <span>Quality</span>
                            <ul className="rating d-flex">
                              <li>
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li>
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li>
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                            </ul>
                          </div>
                          <div className="rating-summary d-flex">
                            <span>Price</span>
                            <ul className="rating d-flex">
                              <li>
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li>
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li>
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                            </ul>
                          </div>
                          <div className="rating-summary d-flex">
                            <span>value</span>
                            <ul className="rating d-flex">
                              <li>
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li>
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li>
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="review-content">
                          <p>Hastech</p>
                          <p>Review by Hastech</p>
                          <p>Posted on 11/6/2018</p>
                        </div>
                      </div>
                    </div>
                    <div className="review-fieldset">
                      <h2>You re reviewing:</h2>
                      <h3>Chaz Kangeroo Hoodie</h3>
                      <div className="review-field-ratings">
                        <div className="product-review-table">
                          <div className="review-field-rating d-flex">
                            <span>Quality</span>
                            <ul className="rating d-flex">
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                            </ul>
                          </div>
                          <div className="review-field-rating d-flex">
                            <span>Price</span>
                            <ul className="rating d-flex">
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                            </ul>
                          </div>
                          <div className="review-field-rating d-flex">
                            <span>Value</span>
                            <ul className="rating d-flex">
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                              <li className="off">
                                <i className="zmdi zmdi-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="review_form_field">
                        <div className="input__box">
                          <span>Nickname</span>
                          <input
                            id="nickname_field"
                            type="text"
                            name="nickname"
                          />
                        </div>
                        <div className="input__box">
                          <span>Summary</span>
                          <input
                            id="summery_field"
                            type="text"
                            name="summery"
                          />
                        </div>
                        <div className="input__box">
                          <span>Review</span>
                          <textarea name="review" defaultValue={''} />
                        </div>
                        <div className="review-form-actions">
                          <button>Submit Review</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Single Tab Content */}
                </div>
              </div>
              <div className="wn__related__product pt--80 pb--50">
                <div className="section__title text-center">
                  <h2 className="title__be--2">Related Products</h2>
                </div>
              </div>
              <div className="wn__related__product">
                <div className="section__title text-center">
                  <h2 className="title__be--2">upsell products</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12 md-mt-40 sm-mt-40">
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
                <aside className="wedget__categories poroduct--compare">
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
