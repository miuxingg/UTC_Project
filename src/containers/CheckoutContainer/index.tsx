import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectBox from '../../components/elements/SelectBox';
import { moneyFormat } from '../../libs/utils';
import address, { getDistrictsThunk, getWardsThunk } from '../../redux/address';
import {
  getDistricts,
  getProvices,
  getWards,
} from '../../redux/address/selectors';
import { allCart } from '../../redux/cart/selectors';
import * as Yup from 'yup';
import { Formik, FormikValues } from 'formik';
import { Button, styled } from '@mui/material';
import Input from '../../components/elements/Input';
import { createOrder } from '../../redux/order';
import { IPaymentMethod, IPaymentStatus } from '../../libs/apis/order/types';
import { unwrapResult } from '@reduxjs/toolkit';
import { setError, setSuccess } from '../../redux/app';
import { Routers } from '../../configs/navigator';
import { useRouter } from 'next/router';
import { deleteCart } from '../../redux/cart';

const ButtonSubmit = styled(Button)({
  width: '100%',
  background: '#000 none repeat scroll 0 0',
  color: '#fff',
  display: 'block',
  padding: '10px 10px',
  fontSize: '14px',
  textTransform: 'uppercase',
  borderRadius: '5px',
  fontWeight: '700',
  transition: '0.4s',
  marginTop: '30px',
  ':hover': {
    background: '#e59285 none repeat scroll 0 0',
    color: '#fff',
  },
  ':focus': {
    outline: 'none',
  },
});

const Schema = Yup.object().shape({
  firstName: Yup.string().required('Họ không được để trống'),
  lastName: Yup.string().required('Tên không được để trống'),
  provice: Yup.string().required('Tỉnh / thành phố khồn được để trống'),
  district: Yup.string().required('Quận/huyện không được để trống'),
  ward: Yup.string().required('Phường/Xã không được để trống'),
  privateHome: Yup.string().required('Địa chỉ nhà không được để trống'),
  phone: Yup.string()
    .required('Số điện thoại không được để trống')
    .min(8, 'Số điện thoại không đúng định dạng'),
  email: Yup.string().required('Email không được để trống'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  provice: '',
  district: '',
  ward: '',
  privateHome: '',
  phone: '',
  email: '',
};

const findNamebyCode = (address: any[], code: number) => {
  const dataFind = address.find((item) => item.code === code);
  return dataFind?.name || '';
};

const CheckoutContainer: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [address, setAddress] = useState({
    provice: 1,
    district: 1,
    ward: 1,
  });
  const cartItem = useSelector(allCart);
  const provices = useSelector(getProvices);
  const districts = useSelector(getDistricts);
  const wards = useSelector(getWards);

  const totalMoney = useMemo(() => {
    return cartItem.items.reduce((total, current) => {
      return total + current.item.price * current.quantity;
    }, 0);
  }, [cartItem]);

  useEffect(() => {
    dispatch(getDistrictsThunk(address.provice));
    dispatch(getWardsThunk(address.district));
  }, [dispatch, address]);

  const handleChangeProvice = (code: number) => {
    setAddress((pre) => {
      return { ...pre, provice: code };
    });
  };

  const handleChangeDistrict = (code: number) => {
    setAddress((pre) => {
      return { ...pre, district: code };
    });
  };

  const handleChangeWard = (code: number) => {
    setAddress((pre) => {
      return { ...pre, ward: code };
    });
  };

  const handleFormSubmit = async (values: FormikValues) => {
    const orderLines = cartItem.items.map(
      ({ item: { id, price }, quantity }) => {
        return { bookId: id, price, quantity };
      },
    );
    if (!orderLines.length) {
      dispatch(setError({ message: 'Không có sản phẩm nào để thanh toán' }));
    } else {
      const response = await dispatch(
        createOrder({
          totalMoney: totalMoney,
          discount: 0,
          status: IPaymentStatus.Pending,
          paymentMethod: IPaymentMethod.COD,
          shippingMethod: {
            firstName: values.firstName,
            lastName: values.lastName,
            provice: findNamebyCode(provices, values.provice),
            district: findNamebyCode(districts, values.district),
            wards: findNamebyCode(wards, values.ward),
            privateHome: values.privateHome,
            phoneNumber: values.phone,
            email: values.email,
          },
          orderLines,
        }),
      );

      const dataResult: any = unwrapResult(response as any);

      if (dataResult) {
        dispatch(deleteCart({ message: 'remove' }));
        dispatch(setSuccess({ message: 'Mua hàng thành công' }));
        // router.push(Routers.home.path);
      } else {
        dispatch(setError({ message: 'Mua hàng thất bại' }));
      }
    }
  };

  return (
    <div className="wrapper" id="wrapper">
      {/* Start Bradcaump area */}
      <div className="ht__bradcaump__area bg-image--4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcaump__inner text-center">
                <h2 className="bradcaump-title">Checkout</h2>
                <nav className="bradcaump-content">
                  <a className="breadcrumb_item" href="index.html">
                    Home
                  </a>
                  <span className="brd-separetor">/</span>
                  <span className="breadcrumb_item active">Checkout</span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Bradcaump area */}
      {/* Start Checkout Area */}
      <section className="wn__checkout__area section-padding--lg bg__white">
        <Formik
          onSubmit={handleFormSubmit}
          validationSchema={Schema}
          validateOnChange={false}
          initialValues={initialValues}
        >
          {({ handleSubmit, errors, values, handleChange, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="wn_checkout_wrap">
                        <div className="checkout_info">
                          <span>Returning customer ?</span>
                          <a className="showlogin" href="#">
                            Click here to login
                          </a>
                        </div>
                        <div className="checkout_login">
                          <form className="wn__checkout__form" action="#">
                            <p>
                              If you have shopped with us before, please enter
                              your details in the boxes below. If you are a new
                              customer please proceed to the Billing &amp;
                              Shipping section.
                            </p>
                            <div className="input__box">
                              <label>
                                Username or email <span>*</span>
                              </label>
                              <input type="text" />
                            </div>
                            <div className="input__box">
                              <label>
                                password <span>*</span>
                              </label>
                              <input type="password" />
                            </div>
                            <div className="form__btn">
                              <button>Login</button>
                              <label className="label-for-checkbox">
                                <input
                                  id="rememberme"
                                  name="rememberme"
                                  defaultValue="forever"
                                  type="checkbox"
                                />
                                <span>Remember me</span>
                              </label>
                              <a href="#">Lost your password?</a>
                            </div>
                          </form>
                        </div>
                        <div className="checkout_info">
                          <span>Have a coupon? </span>
                          <a className="showcoupon" href="#">
                            Click here to enter your code
                          </a>
                        </div>
                        <div className="checkout_coupon">
                          <form action="#">
                            <div className="form__coupon">
                              <input type="text" placeholder="Coupon code" />
                              <button>Apply coupon</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <div className="customer_details">
                        <h3>Shipping details</h3>

                        <div className="customar__field">
                          <div className="margin_between">
                            <div className="input_box space_between">
                              <label>
                                First name <span>*</span>
                              </label>
                              <Input
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                error={errors.firstName}
                              />
                            </div>
                            <div className="input_box space_between">
                              <label>
                                last name <span>*</span>
                              </label>
                              <Input
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                error={errors.lastName}
                              />
                            </div>
                          </div>
                          <div className="input_box">
                            <label>
                              Provices<span>*</span>
                            </label>
                            <SelectBox
                              items={provices}
                              label="Provice"
                              onChange={(code: number) => {
                                handleChangeProvice(code);
                                setFieldValue('provice', code);
                              }}
                              name="provice"
                              error={errors.provice}
                            />
                          </div>

                          <div className="input_box">
                            <label>
                              Districts<span>*</span>
                            </label>
                            <SelectBox
                              items={districts}
                              label="Districts"
                              onChange={(code: number) => {
                                handleChangeDistrict(code);
                                setFieldValue('district', code);
                              }}
                              name="district"
                              error={errors.district}
                            />
                          </div>

                          <div className="input_box">
                            <label>
                              Wards<span>*</span>
                            </label>
                            <SelectBox
                              items={wards}
                              label="Wards"
                              onChange={(code: number) => {
                                handleChangeWard(code);
                                setFieldValue('ward', code);
                              }}
                              name="ward"
                              error={errors.ward}
                            />
                          </div>
                          <div className="input_box">
                            <label>
                              Private home <span>*</span>
                            </label>
                            <Input
                              type="text"
                              name="privateHome"
                              onChange={handleChange}
                              error={errors.privateHome}
                            />
                          </div>
                          <div className="margin_between">
                            <div className="input_box space_between">
                              <label>
                                Phone <span>*</span>
                              </label>
                              <Input
                                type="text"
                                name="phone"
                                onChange={handleChange}
                                error={errors.phone}
                              />
                            </div>
                            <div className="input_box space_between">
                              <label>
                                Email address <span>*</span>
                              </label>
                              <Input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                error={errors.email}
                              />
                            </div>
                          </div>
                        </div>

                        {/* <div className="create__account">
                  <div className="wn__accountbox">
                    <input
                      className="input-checkbox"
                      name="createaccount"
                      defaultValue={1}
                      type="checkbox"
                    />
                    <span>Create an account ?</span>
                  </div>
                  <div className="account__field">
                    <form action="#">
                      <label>
                        Account password <span>*</span>
                      </label>
                      <input type="text" placeholder="password" />
                    </form>
                  </div>
                </div> */}
                      </div>
                      <div
                        id="accordion"
                        className="checkout_accordion mt--30"
                        role="tablist"
                      >
                        <div className="payment">
                          <div
                            className="che__header"
                            role="tab"
                            id="headingOne"
                          >
                            <a
                              className="checkout__title"
                              data-toggle="collapse"
                              href="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              <span>Direct Bank Transfer</span>
                            </a>
                          </div>
                          <div
                            id="collapseOne"
                            className="collapse show"
                            role="tabpanel"
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div className="payment-body">
                              Make your payment directly into our bank account.
                              Please use your Order ID as the payment reference.
                              Your order won’t be shipped until the funds have
                              cleared in our account.
                            </div>
                          </div>
                        </div>
                        <div className="payment">
                          <div
                            className="che__header"
                            role="tab"
                            id="headingTwo"
                          >
                            <a
                              className="collapsed checkout__title"
                              data-toggle="collapse"
                              href="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              <span>Cheque Payment</span>
                            </a>
                          </div>
                          <div
                            id="collapseTwo"
                            className="collapse"
                            role="tabpanel"
                            aria-labelledby="headingTwo"
                            data-parent="#accordion"
                          >
                            <div className="payment-body">
                              Please send your cheque to Store Name, Store
                              Street, Store Town, Store State / County, Store
                              Postcode.
                            </div>
                          </div>
                        </div>
                        <div className="payment">
                          <div
                            className="che__header"
                            role="tab"
                            id="headingThree"
                          >
                            <a
                              className="collapsed checkout__title"
                              data-toggle="collapse"
                              href="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              <span>Cash on Delivery</span>
                            </a>
                          </div>
                          <div
                            id="collapseThree"
                            className="collapse"
                            role="tabpanel"
                            aria-labelledby="headingThree"
                            data-parent="#accordion"
                          >
                            <div className="payment-body">
                              Pay with cash upon delivery.
                            </div>
                          </div>
                        </div>
                        <div className="payment">
                          <div
                            className="che__header"
                            role="tab"
                            id="headingFour"
                          >
                            <a
                              className="collapsed checkout__title"
                              data-toggle="collapse"
                              href="#collapseFour"
                              aria-expanded="false"
                              aria-controls="collapseFour"
                            >
                              <span>
                                PayPal{' '}
                                <img
                                  src="images/icons/payment.png"
                                  alt="payment images"
                                />{' '}
                              </span>
                            </a>
                          </div>
                          <div
                            id="collapseFour"
                            className="collapse"
                            role="tabpanel"
                            aria-labelledby="headingFour"
                            data-parent="#accordion"
                          >
                            <div className="payment-body">
                              Pay with cash upon delivery.
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="customer_details mt--20">
                <div className="differt__address">
                  <input
                    name="ship_to_different_address"
                    defaultValue={1}
                    type="checkbox"
                  />
                  <span>Ship to a different address ?</span>
                </div>
                <div className="customar__field differt__form mt--40">
                  <div className="margin_between">
                    <div className="input_box space_between">
                      <label>
                        First name <span>*</span>
                      </label>
                      <input type="text" />
                    </div>
                    <div className="input_box space_between">
                      <label>
                        last name <span>*</span>
                      </label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="input_box">
                    <label>
                      Company name <span>*</span>
                    </label>
                    <input type="text" />
                  </div>
                  <div className="input_box">
                    <label>
                      Country<span>*</span>
                    </label>
                    <select className="select__option">
                      <option>Select a country…</option>
                      <option>Afghanistan</option>
                      <option>American Samoa</option>
                      <option>Anguilla</option>
                      <option>American Samoa</option>
                      <option>Antarctica</option>
                      <option>Antigua and Barbuda</option>
                    </select>
                  </div>
                  <div className="input_box">
                    <label>
                      Address <span>*</span>
                    </label>
                    <input type="text" placeholder="Street address" />
                  </div>
                  <div className="input_box">
                    <input
                      type="text"
                      placeholder="Apartment, suite, unit etc. (optional)"
                    />
                  </div>
                  <div className="input_box">
                    <label>
                      District<span>*</span>
                    </label>
                    <select className="select__option">
                      <option>Select a country…</option>
                      <option>Afghanistan</option>
                      <option>American Samoa</option>
                      <option>Anguilla</option>
                      <option>American Samoa</option>
                      <option>Antarctica</option>
                      <option>Antigua and Barbuda</option>
                    </select>
                  </div>
                  <div className="input_box">
                    <label>
                      Postcode / ZIP <span>*</span>
                    </label>
                    <input type="text" />
                  </div>
                  <div className="margin_between">
                    <div className="input_box space_between">
                      <label>
                        Phone <span>*</span>
                      </label>
                      <input type="text" />
                    </div>
                    <div className="input_box space_between">
                      <label>
                        Email address <span>*</span>
                      </label>
                      <input type="email" />
                    </div>
                  </div>
                </div>
              </div> */}
                    </div>
                    <div className="col-lg-6 col-12 md-mt-40 sm-mt-40">
                      <div className="wn__order__box">
                        <h3 className="onder__title">Your order</h3>
                        <ul className="order__total">
                          <li>Product</li>
                          <li>Total</li>
                        </ul>
                        <ul className="order_product">
                          {cartItem.items.map((item) => {
                            return (
                              <li>
                                {`${item.item.name} × ${item.quantity}`}
                                <span>
                                  {moneyFormat(item.quantity * item.item.price)}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                        <ul className="shipping__method">
                          <li>
                            Cart Subtotal <span>{moneyFormat(totalMoney)}</span>
                          </li>
                          <li>
                            Shipping
                            <ul>
                              <li>
                                <input
                                  name="shipping_method[0]"
                                  data-index={0}
                                  defaultValue="legacy_flat_rate"
                                  defaultChecked
                                  type="radio"
                                />
                                <label>Flat Rate: $48.00</label>
                              </li>
                              <li>
                                <input
                                  name="shipping_method[0]"
                                  data-index={0}
                                  defaultValue="legacy_flat_rate"
                                  defaultChecked
                                  type="radio"
                                />
                                <label>Flat Rate: $48.00</label>
                              </li>
                            </ul>
                          </li>
                        </ul>
                        <ul className="total__amount">
                          <li>
                            Order Total <span>{moneyFormat(totalMoney)}</span>
                          </li>
                        </ul>
                      </div>
                      <ButtonSubmit type="submit">Check out</ButtonSubmit>
                    </div>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </section>

      {/* End Checkout Area */}
    </div>
  );
};

export default CheckoutContainer;
