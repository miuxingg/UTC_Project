import { COOKIE_KEYS, HTTP_STATUS } from '../../configs';
import { Routers } from '../../configs/navigator';
import { wrapper } from '../../redux';
import { authorized } from '../../redux/auth/action';
import { setApiContext } from '../apis';
import { TWithSSRFn } from '../types';
import { getCookies } from '../utils/cookies';
import { retrieveToken } from '../utils/retriveCookie';

export const getServerSideWithProtectedRoute: TWithSSRFn = (cb: any) => {
  return wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      await retrieveToken(ctx);
      const cookies = getCookies(ctx);
      setApiContext(ctx);
      if (!cookies[COOKIE_KEYS.ACCESS_TOKEN]) {
        return {
          redirect: {
            destination: `${Routers.login.path}?redirect_uri=${ctx.resolvedUrl}`,
            permanent: false,
          },
        };
      }
      store.dispatch(authorized());

      return await cb(ctx, store);
    } catch (error: any) {
      if (error.statusCode === HTTP_STATUS.NOT_FOUND) return { notFound: true };
      return { props: {} };
    }
  });
};
