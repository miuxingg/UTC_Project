import React from 'react';

export interface IBook {
  status?: string;
  name: string;
  price: number;
  priceUnDiscount?: number;
  image: string;
}
export const BookCart: React.FC<IBook> = ({
  status,
  name,
  price,
  priceUnDiscount,
  image,
}) => {
  return (
    <>
      <div className="product product__style--3">
        {/* <div className="col-lg-3 col-md-4 col-sm-6 col-12"> */}
        <div className="product__thumb">
          <a className="first__img" href="single-product.html">
            <img
              src={image ? image : 'images/books/1.jpg'}
              alt="product image"
            />
          </a>
          <a className="second__img animation1" href="single-product.html">
            <img
              src={image ? image : 'images/books/2.jpg'}
              alt="product image"
            />
          </a>
          {status && (
            <div className="hot__box">
              <span className="hot-label">{status}</span>
            </div>
          )}
        </div>
        <div className="product__content content--center">
          <h4>
            <a href="single-product.html">{name}</a>
          </h4>
          <ul className="prize d-flex">
            <li>{price}</li>
            <li className="old_prize">{priceUnDiscount}</li>
          </ul>
          <div className="action">
            <div className="actions_inner">
              <ul className="add_to_links">
                <li>
                  <a className="cart" href="cart.html">
                    <i className="bi bi-shopping-bag4" />
                  </a>
                </li>
                <li>
                  <a className="wishlist" href="wishlist.html">
                    <i className="bi bi-shopping-cart-full" />
                  </a>
                </li>
                <li>
                  <a className="compare" href="#">
                    <i className="bi bi-heart-beat" />
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="modal"
                    title="Quick View"
                    className="quickview modal-view detail-link"
                    href="#productmodal"
                  >
                    <i className="bi bi-search" />
                  </a>
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
