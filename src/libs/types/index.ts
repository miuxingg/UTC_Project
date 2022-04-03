import { AnyAction, Store } from '@reduxjs/toolkit';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { TRootState } from '../../redux';

type TWithReduxServerSideCallback<S, P> = (
  context: GetServerSidePropsContext<ParsedUrlQuery>,
  store: S,
) => Promise<GetServerSidePropsResult<P>>;

export type TWithSSRFn<
  S extends Store<TRootState, AnyAction> = Store<TRootState, AnyAction>,
  P extends Record<string, unknown> = Record<string, unknown>,
> = (
  cb: TWithReduxServerSideCallback<S, P>,
  redirectWhenLoggedIn?: boolean,
) => GetServerSideProps<P, ParsedUrlQuery>;
