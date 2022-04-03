import { COOKIE_KEYS, HTTP_STATUS } from '../../configs';
import { wrapper } from '../../redux';
import { authorized } from '../../redux/auth/action';
import { setApiContext } from '../apis';
import { TWithSSRFn } from '../types';
import { getCookies } from '../utils/cookies';
import { retrieveToken } from '../utils/retriveCookie';
import { setToken } from '../utils/token';

export const getServerSideWithPublicRoute: TWithSSRFn = (
  cb,
  redirectWhenLoggedIn = false,
) => {
  return wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      await retrieveToken(ctx);

      const cookies = getCookies(ctx);
      setApiContext(ctx);

      if (cookies[COOKIE_KEYS.ACCESS_TOKEN]) {
        store.dispatch(authorized());
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const query: any = ctx.query;
      const redirectUrl = query.redirectUrl;
      if (query.access_token && redirectUrl) {
        const replacedRedirectUrl = redirectUrl.replace(/-/g, '&');
        setToken(query, ctx);
        return {
          redirect: {
            destination: replacedRedirectUrl,
            permanent: false,
          },
        };
      }

      if (cookies[COOKIE_KEYS.ACCESS_TOKEN] && redirectWhenLoggedIn) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      return await cb(ctx, store);
    } catch (error: any) {
      if (error.statusCode === HTTP_STATUS.NOT_FOUND) return { notFound: true };
      return { props: {} };
    }
  });
};
