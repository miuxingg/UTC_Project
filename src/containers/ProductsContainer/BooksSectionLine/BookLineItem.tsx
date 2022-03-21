import React from 'react';

export interface IBookLineItem {
  name: string;
  image: string;
  price: number;
  priceUnDiscount: number;
  description?: string;
}

const BookLineItem: React.FC<IBookLineItem> = ({
  name,
  image,
  price,
  priceUnDiscount,
  description,
}) => {
  return (
    <div className="list__view">
      <div className="thumb">
        <a className="first__img" href="single-product.html">
          <img src={image ?? 'images/product/1.jpg'} alt="product images" />
        </a>
        <a className="second__img animation1" href="single-product.html">
          <img src={image ?? 'images/product/1.jpg'} alt="product images" />
        </a>
      </div>
      <div className="content">
        <h2>
          <a href="single-product.html">{name}</a>
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
          <li>{price}</li>
          <li className="old__prize">$220.00</li>
        </ul>
        <p>{description}</p>
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
  );
};

export default BookLineItem;
