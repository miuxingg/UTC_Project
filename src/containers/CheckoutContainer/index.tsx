import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectBox from '../../components/elements/SelectBox';
import { moneyFormat } from '../../libs/utils';
import { getDistrictsThunk, getWardsThunk } from '../../redux/address';
import {
  getDistricts,
  getProvinces,
  getWards,
} from '../../redux/address/selectors';
import { allCart } from '../../redux/cart/selectors';
import * as Yup from 'yup';
import { Formik, FormikValues } from 'formik';
import { Button, styled } from '@mui/material';
import Input from '../../components/elements/Input';
import { createOrder } from '../../redux/order';
import {
  IOrderInput,
  IOrderStatus,
  IPaymentMethod,
  IPaymentStatus,
} from '../../libs/apis/order/types';
import { unwrapResult } from '@reduxjs/toolkit';
import { setError, setSuccess } from '../../redux/app';
import { deleteCart } from '../../redux/cart';
import PaymentGatewayCart from './PaymentGatewayCart';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { apiSdk } from '../../libs/apis';
import PaymentForm from '../Payment/PaymentForm';
import { profileSelector } from '../../redux/auth/selectors';
import {
  removeItemDataStorage,
  LocalStorageKey,
} from '../../libs/utils/localStorage';
import { checkQuantityBook } from '../../redux/book';
import { ICheckQuantityBook } from '../../libs/apis/book/types';
import { shipAmount } from '../../configs/types';
import { useTranslation } from 'react-i18next';
import PopupVocher from '../../components/collecttions/PopupVocher';
import { allVoucherSelector } from '../../redux/voucher/selectors';
import { IVoucherApi } from '../../libs/apis/voucher/types';

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
  province: Yup.object({
    name: Yup.string().required('Tỉnh / thành phố không được để trống'),
    code: Yup.number(),
  }).required('Tỉnh / thành phố không được để trống'),
  district: Yup.object({
    name: Yup.string().required('Quận/huyện không được để trống'),
    code: Yup.number(),
  }).required('Quận/huyện không được để trống'),
  ward: Yup.object({
    name: Yup.string().required('Phường/Xã không được để trống'),
    code: Yup.number(),
  }).required('Phường/Xã không được để trống'),
  privateHome: Yup.string().required('Địa chỉ nhà không được để trống'),
  phone: Yup.string()
    .required('Số điện thoại không được để trống')
    .min(8, 'Số điện thoại không đúng định dạng'),
  email: Yup.string().required('Email không được để trống'),
});

export const findNamebyCode = (address: any[], code: number) => {
  const dataFind = address.find((item) => item.code === code);
  return dataFind?.name || '';
};

const CheckoutContainer: React.FC = () => {
  const { t } = useTranslation();
  const [isStripePayment, setIsStripePayment] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [address, setAddress] = useState({
    provice: 1,
    district: 1,
    ward: 1,
  });

  const [voucherSelected, setVoucherSelected] = useState<IVoucherApi>();
  const cartItem = useSelector(allCart);
  const provinces = useSelector(getProvinces);
  const districts = useSelector(getDistricts);
  const wards = useSelector(getWards);
  const profile = useSelector(profileSelector);
  const vouchers = useSelector(allVoucherSelector);

  const initialValues = {
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    province: profile?.province || { code: 0, name: '' },
    district: profile?.district || { code: 0, name: '' },
    ward: profile?.ward || { code: 0, name: '' },
    privateHome: profile?.privateHome || '',
    phone: profile?.phoneNumber || '',
    email: profile?.email || '',
  };

  const handleChooseVoucher = (value: IVoucherApi) => {
    setVoucherSelected(value);
  };

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

  /**
   *
   * Start stripe func
   */
  const stripe = useStripe();
  const elements = useElements();

  const handleStripeSubmit = async (
    amount: number,
    orderDetail: IOrderInput,
  ) => {
    if (stripe && elements) {
      const cardElement = await elements.getElement(CardElement);

      if (cardElement) {
        const token = await stripe.createToken(cardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
        if (!error && paymentMethod) {
          try {
            const { id } = paymentMethod;
            const response = await apiSdk.payment.createPayment({
              amount,
              id,
              orderDetail,
            });
            if (response) {
              dispatch(
                setSuccess({
                  message: t('notify.add-to-cart.checkout.success'),
                }),
              );
              return true;
            }
          } catch (err) {
            console.log('Err: ', err);
          }
        } else {
          console.log(error?.message);
        }
      }
    }
    return false;
  };
  /**
   *
   * End stripe func
   */

  const handleFormSubmit = async (values: FormikValues) => {
    const orderLines = cartItem.items.map(
      ({ item: { id, price }, quantity }) => {
        return { bookId: id, price, quantity };
      },
    );
    if (!orderLines.length) {
      dispatch(setError({ message: t('notify.checkout.empty-product') }));
    } else {
      const checkoutLines = orderLines.map((line) => {
        return { bookId: line.bookId, quantity: line.quantity };
      });
      const dataCheckQuantity = await dispatch(
        checkQuantityBook(checkoutLines),
      );
      const dataCheckQuantityResult: ICheckQuantityBook[] = unwrapResult(
        dataCheckQuantity as any,
      );
      const dataBookFail = dataCheckQuantityResult.filter(
        (item) => !item.isQuantity,
      );

      if (dataBookFail.length) {
        dispatch(
          setError({ message: t('notify.checkout.product-not-enough') }),
        );
      } else {
        const discount = voucherSelected?.priceDiscound || 0;
        const paymentUnDiscound = totalMoney + shipAmount;
        const orderDetail: IOrderInput = {
          totalMoney: paymentUnDiscound,
          discount: discount,
          status: IOrderStatus.Pending,
          paymentStatus: IPaymentStatus.Pending,
          paymentMethod: IPaymentMethod.COD,
          shippingMethod: {
            firstName: values.firstName,
            lastName: values.lastName,
            province: values.province,
            district: values.district,
            wards: values.ward,
            privateHome: values.privateHome,
            phoneNumber: values.phone,
            email: values.email,
            amount: shipAmount,
          },
          orderLines,
        };
        if (isStripePayment) {
          if (paymentUnDiscound - discount <= 10000) {
            dispatch(
              setError({
                message: t('notify.checkout.payment-amount-small'),
              }),
            );
          } else {
            const stripePayment = await handleStripeSubmit(
              paymentUnDiscound - discount,
              {
                ...orderDetail,
                paymentMethod: IPaymentMethod.VisaCard,
              },
            );
            console.log(stripePayment);
            if (stripePayment) {
              dispatch(deleteCart({ message: 'remove cart' }));
              removeItemDataStorage(LocalStorageKey.BookStoreCart);
            } else {
              dispatch(setError({ message: t('notify.checkout.error') }));
            }
          }
        } else {
          const response = await dispatch(createOrder(orderDetail));
          const dataResult: any = unwrapResult(response as any);
          console.log(dataResult);

          if (dataResult) {
            dispatch(deleteCart({ message: 'remove cart' }));
            removeItemDataStorage(LocalStorageKey.BookStoreCart);
            dispatch(setSuccess({ message: t('notify.checkout.success') }));
            // router.push(Routers.home.path);
          } else {
            dispatch(setError({ message: t('notify.checkout.error') }));
          }
        }
      }
    }
  };

  return (
    <div className="wrapper" id="wrapper">
      {/* Start Bradcaump area */}
      <div
        className="ht__bradcaump__area"
        style={{
          backgroundImage: 'url(images/bg/banner-checkout.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <div className="bradcaump__inner text-center">
                <h2 className="bradcaump-title">Checkout</h2>
                <nav className="bradcaump-content">
                  <a className="breadcrumb_item" href="index.html">
                    Home
                  </a>
                  <span className="brd-separetor">/</span>
                  <span className="breadcrumb_item active">Checkout</span>
                </nav>
              </div> */}
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
                    <PopupVocher
                      listVoucher={vouchers?.items ?? []}
                      onClick={handleChooseVoucher}
                    />
                    {/* <div className="col-lg-12">
                      <div className="wn_checkout_wrap">
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
                    </div> */}
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <div className="customer_details">
                        <h3>{t('check-out.shipping.title')}</h3>
                        <div className="customar__field">
                          <div className="margin_between">
                            <div className="input_box space_between">
                              <label>
                                {t('check-out.shipping.first-name')}{' '}
                                <span>*</span>
                              </label>
                              <Input
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                error={errors.firstName}
                                value={values.firstName}
                              />
                            </div>
                            <div className="input_box space_between">
                              <label>
                                {t('check-out.shipping.last-name')}{' '}
                                <span>*</span>
                              </label>
                              <Input
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                error={errors.lastName}
                                value={values.lastName}
                              />
                            </div>
                          </div>
                          <div className="input_box">
                            <label>
                              {t('check-out.shipping.province')}
                              <span>*</span>
                            </label>
                            <SelectBox
                              items={provinces}
                              label={t('check-out.shipping.province')}
                              onChange={(code: number) => {
                                handleChangeProvice(code);
                                setFieldValue('province', {
                                  code,
                                  name: findNamebyCode(provinces, code),
                                });
                              }}
                              name="province"
                              error={
                                errors.province?.code || errors.province?.name
                              }
                              value={values.province.code}
                            />
                          </div>

                          <div className="input_box">
                            <label>
                              {t('check-out.shipping.districts')}
                              <span>*</span>
                            </label>
                            <SelectBox
                              items={districts}
                              label={t('check-out.shipping.districts')}
                              onChange={(code: number) => {
                                handleChangeDistrict(code);
                                setFieldValue('district', {
                                  code,
                                  name: findNamebyCode(districts, code),
                                });
                              }}
                              name="district"
                              error={
                                errors.district?.code || errors.district?.name
                              }
                              value={values.district.code}
                            />
                          </div>

                          <div className="input_box">
                            <label>
                              {t('check-out.shipping.wards')}
                              <span>*</span>
                            </label>
                            <SelectBox
                              items={wards}
                              label={t('check-out.shipping.wards')}
                              onChange={(code: number) => {
                                handleChangeWard(code);
                                setFieldValue('ward', {
                                  code,
                                  name: findNamebyCode(wards, code),
                                });
                              }}
                              name="ward"
                              error={errors.ward?.code || errors.ward?.name}
                              value={values.ward.code}
                            />
                          </div>
                          <div className="input_box">
                            <label>
                              {t('check-out.shipping.private-home')}{' '}
                              <span>*</span>
                            </label>
                            <Input
                              type="text"
                              name="privateHome"
                              onChange={handleChange}
                              error={errors.privateHome}
                              value={values.privateHome}
                            />
                          </div>
                          <div className="margin_between">
                            <div className="input_box space_between">
                              <label>
                                {t('check-out.shipping.phone')} <span>*</span>
                              </label>
                              <Input
                                type="text"
                                name="phone"
                                onChange={handleChange}
                                error={errors.phone}
                                value={values.phone}
                              />
                            </div>
                            <div className="input_box space_between">
                              <label>
                                {t('check-out.shipping.emails')} <span>*</span>
                              </label>
                              <Input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                error={errors.email}
                                value={values.email}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="accordion"
                        className="checkout_accordion mt--30"
                        role="tablist"
                      >
                        <PaymentGatewayCart
                          name="Paypal"
                          onChange={(state: boolean) =>
                            setIsStripePayment(state)
                          }
                          content={<PaymentForm />}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-12 md-mt-40 sm-mt-40">
                      <div className="wn__order__box">
                        <h3 className="onder__title">
                          {t('check-out.order.your-order')}
                        </h3>
                        <ul className="order__total">
                          <li>{t('check-out.order.products')}</li>
                          <li>{t('check-out.order.total')}</li>
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
                            {t('check-out.order.cart-sub-total')}{' '}
                            <span>{moneyFormat(totalMoney)}</span>
                          </li>
                          <li>
                            {t('check-out.order.discount')}
                            <ul>
                              <li>
                                <label>
                                  {moneyFormat(
                                    voucherSelected?.priceDiscound || 0,
                                  )}
                                </label>
                              </li>
                            </ul>
                          </li>
                          <li>
                            {t('check-out.order.shipping')}
                            <ul>
                              <li>
                                <label>{moneyFormat(shipAmount)}</label>
                              </li>
                            </ul>
                          </li>
                        </ul>
                        <ul className="total__amount">
                          <li>
                            {t('check-out.order.order-total')}
                            <span>
                              {moneyFormat(
                                totalMoney +
                                  shipAmount -
                                  (voucherSelected?.priceDiscound || 0),
                              )}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <ButtonSubmit type="submit">
                        {t('check-out.order.check-out')}
                      </ButtonSubmit>
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
