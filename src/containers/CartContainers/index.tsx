import React from 'react';

const CartContainer: React.FC = () => {
  return (
    <div className="wrapper" id="wrapper">
      {/* Start Bradcaump area */}
      <div className="ht__bradcaump__area bg-image--3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcaump__inner text-center">
                <h2 className="bradcaump-title">Shopping Cart</h2>
                <nav className="bradcaump-content">
                  <a className="breadcrumb_item" href="index.html">
                    Home
                  </a>
                  <span className="brd-separetor">/</span>
                  <span className="breadcrumb_item active">Shopping Cart</span>
                </nav>
              </div>
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
              <form action="#">
                <div className="table-content wnro__table table-responsive">
                  <table>
                    <thead>
                      <tr className="title-top">
                        <th className="product-thumbnail">Image</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Total</th>
                        <th className="product-remove">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="product-thumbnail">
                          <a href="#">
                            <img
                              src="images/product/sm-3/1.jpg"
                              alt="product img"
                            />
                          </a>
                        </td>
                        <td className="product-name">
                          <a href="#">Natoque penatibus</a>
                        </td>
                        <td className="product-price">
                          <span className="amount">$165.00</span>
                        </td>
                        <td className="product-quantity">
                          <input type="number" defaultValue={1} />
                        </td>
                        <td className="product-subtotal">$165.00</td>
                        <td className="product-remove">
                          <a href="#">X</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="product-thumbnail">
                          <a href="#">
                            <img
                              src="images/product/sm-3/2.jpg"
                              alt="product img"
                            />
                          </a>
                        </td>
                        <td className="product-name">
                          <a href="#">Quisque fringilla</a>
                        </td>
                        <td className="product-price">
                          <span className="amount">$50.00</span>
                        </td>
                        <td className="product-quantity">
                          <input type="number" defaultValue={1} />
                        </td>
                        <td className="product-subtotal">$50.00</td>
                        <td className="product-remove">
                          <a href="#">X</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="product-thumbnail">
                          <a href="#">
                            <img
                              src="images/product/sm-3/3.jpg"
                              alt="product img"
                            />
                          </a>
                        </td>
                        <td className="product-name">
                          <a href="#">Vestibulum suscipit</a>
                        </td>
                        <td className="product-price">
                          <span className="amount">$50.00</span>
                        </td>
                        <td className="product-quantity">
                          <input type="number" defaultValue={1} />
                        </td>
                        <td className="product-subtotal">$50.00</td>
                        <td className="product-remove">
                          <a href="#">X</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
              <div className="cartbox__btn">
                <ul className="cart__btn__list d-flex flex-wrap flex-md-nowrap flex-lg-nowrap justify-content-between">
                  <li>
                    <a href="#">Coupon Code</a>
                  </li>
                  <li>
                    <a href="#">Apply Code</a>
                  </li>
                  <li>
                    <a href="#">Update Cart</a>
                  </li>
                  <li>
                    <a href="#">Check Out</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-6">
              <div className="cartbox__total__area">
                <div className="cartbox-total d-flex justify-content-between">
                  <ul className="cart__total__list">
                    <li>Cart total</li>
                    <li>Sub Total</li>
                  </ul>
                  <ul className="cart__total__tk">
                    <li>$70</li>
                    <li>$70</li>
                  </ul>
                </div>
                <div className="cart__total__amount">
                  <span>Grand Total</span>
                  <span>$140</span>
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
