import { Box, Button, CircularProgress, styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import InputElement from '../../components/elements/Input';
import { useTranslation } from 'react-i18next';
import { Formik, FormikValues } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import SelectBox from '../../components/elements/SelectBox';
import {
  getDistricts,
  getProvinces,
  getWards,
} from '../../redux/address/selectors';
import { getDistrictsThunk, getWardsThunk } from '../../redux/address';
import * as Yup from 'yup';
import { authSelector, profileSelector } from '../../redux/auth/selectors';
import { findNamebyCode } from '../CheckoutContainer';
import { getProfile, updateProfile } from '../../redux/auth/action';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../configs/firebase.config';
import { IProfile } from '../../libs/apis/auth/types';
import { unwrapResult } from '@reduxjs/toolkit';
import { setSuccess } from '../../redux/app';
import Typography from '../../components/elements/Typography';

const Camera = styled(AddAPhotoIcon)({
  width: 35,
  height: 35,
  cursor: 'pointer',
  color: '#ff0099',
  position: 'absolute',
  top: '70%',
  right: '-5px',
});

const LoadingAvatar = styled(CircularProgress)({
  width: 35,
  height: 35,
  cursor: 'pointer',
  color: '#ff0099',
  position: 'absolute',
  top: '70%',
  right: '-5px',
});

export const ButtonSubmit = styled(Button)({
  width: '150px',
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
  phoneNumber: Yup.string()
    .required('Số điện thoại không được để trống')
    .min(8, 'Số điện thoại không đúng định dạng'),
  email: Yup.string(),
});

const Avatar = styled(Box)(({ avatar }: { avatar: string }) => ({
  width: 180,
  height: 180,
  backgroundImage: `url('${avatar}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '50%',
  border: '1px dashed #eee',
  position: 'relative',
}));

const Input = styled(InputElement)({});

export interface IProfileContainer {
  onChangePasswordLinkClick?: () => void;
}

const Profile: React.FC<IProfileContainer> = ({
  onChangePasswordLinkClick,
}) => {
  const provinces = useSelector(getProvinces);
  const districts = useSelector(getDistricts);
  const wards = useSelector(getWards);
  const isAuthenticated = useSelector(authSelector);
  const profile = useSelector(profileSelector);

  const [avatar, setAvatar] = useState(profile?.avatar ?? '');
  const { t } = useTranslation();
  const cameraRef = useRef<any>();
  const dispatch = useDispatch();
  const [address, setAddress] = useState({
    province: 1,
    district: 1,
    ward: 1,
  });
  const [isLoading, setIsLoading] = useState<number>(100);

  const initialValues = {
    firstName: profile?.firstName || '',
    lastName: profile?.lastName ?? '',
    province: profile?.province ?? { code: 0, name: '' },
    district: profile?.district ?? { code: 0, name: '' },
    ward: profile?.ward ?? { code: 0, name: '' },
    privateHome: profile?.privateHome ?? '',
    phoneNumber: profile?.phoneNumber ?? '',
    email: profile?.email ?? '',
  };

  useEffect(() => {
    dispatch(getDistrictsThunk(address.province));
    dispatch(getWardsThunk(address.district));
  }, [dispatch, address]);

  const handleChangeProvice = (code: number) => {
    setAddress((pre) => {
      return { ...pre, province: code };
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

  const handleChangeAvatar = (e: any) => {
    const images = e.target.files[0];
    if (!images) return null;
    const storageRef = ref(
      storage,
      `/avatar/${new Date().getTime()}-${images.name}`,
    );
    const uploadTask = uploadBytesResumable(storageRef, images);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(prog);
        setIsLoading(prog);
      },
      (err) => {
        return null;
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setAvatar(url);
      },
    );
  };

  const handleSubmitForm = async (values: FormikValues) => {
    if (isAuthenticated) {
      delete values?.email;
      const response = await dispatch(
        updateProfile({
          ...values,
          avatar: avatar || '',
        }),
      );
      const data = unwrapResult(response as any);
      if (data) {
        dispatch(setSuccess({ message: 'Update success' }));
      } else {
        dispatch(setSuccess({ message: 'Update error' }));
      }
    }
  };

  return (
    <Box maxWidth={900} margin="auto" my={10}>
      <Box width="100%" display="flex" justifyContent="center">
        <Avatar avatar={avatar ?? '/images/avatar_default.jpeg'}>
          {isLoading >= 100 ? (
            <Camera onClick={() => cameraRef.current.click()} />
          ) : (
            <LoadingAvatar />
          )}

          <input
            type="file"
            accept="image/*"
            ref={cameraRef}
            onChange={handleChangeAvatar}
            hidden
          />
        </Avatar>
      </Box>
      <Box my={10}>
        <Formik
          validationSchema={Schema}
          validateOnChange={false}
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
        >
          {({ handleSubmit, errors, values, handleChange, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="customer_details">
                  <div className="customar__field">
                    <div className="margin_between">
                      <div className="input_box space_between">
                        <label>
                          {t('check-out.shipping.first-name')} <span>*</span>
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
                          {t('check-out.shipping.last-name')} <span>*</span>
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
                    <div className="margin_between">
                      <div className="input_box  space_between">
                        <label>
                          {t('check-out.shipping.emails')} <span>*</span>
                        </label>
                        <Input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          error={errors.email}
                          value={values.email}
                          disabled
                        />
                      </div>
                      <div className="input_box space_between">
                        <label>
                          {t('check-out.shipping.phone')} <span>*</span>
                        </label>
                        <Input
                          type="text"
                          name="phoneNumber"
                          onChange={handleChange}
                          error={errors.phoneNumber}
                          value={values.phoneNumber}
                        />
                      </div>
                    </div>
                    <div className="margin_between">
                      <div className="input_box space_between">
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
                          error={errors.province?.name || errors.province?.code}
                          value={values.province.code}
                        />
                      </div>

                      <div className="input_box space_between">
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
                          error={errors.district?.code || errors.district?.name}
                          value={values.district.code}
                        />
                      </div>

                      <div className="input_box space_between">
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
                          error={errors.ward?.name || errors.ward?.code}
                          value={values.ward.code}
                        />
                      </div>
                    </div>
                    <div className="input_box">
                      <label>
                        {t('check-out.shipping.private-home')} <span>*</span>
                      </label>
                      <Input
                        type="text"
                        name="privateHome"
                        onChange={handleChange}
                        error={errors.privateHome}
                        value={values.privateHome}
                      />
                    </div>
                  </div>
                </div>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    fontSize="16px"
                    style={{ color: '#7eabd0', cursor: 'pointer' }}
                    onClick={onChangePasswordLinkClick}
                  >
                    {t('change-password')}
                  </Typography>
                  <ButtonSubmit type="submit">
                    {t('submit.update')}
                  </ButtonSubmit>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default Profile;
