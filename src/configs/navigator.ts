type TRouterName =
  | 'home'
  | 'products'
  | 'productsDetail'
  | 'login'
  | 'register'
  | 'checkout'
  | 'cart'
  | 'profile'
  | 'myOrder';

const baseUrl = '/';
export const Routers: Record<TRouterName, { title: string; path: string }> = {
  home: { title: 'page.home.title', path: `${baseUrl}` },
  products: { title: 'page.home.products', path: `${baseUrl}products` },
  productsDetail: {
    title: 'page.home.product.details',
    path: `${baseUrl}[id]`,
  },
  login: { title: 'page.login', path: `${baseUrl}login` },
  register: { title: 'page.register', path: `${baseUrl}register` },
  checkout: { title: 'page.checkout', path: `${baseUrl}checkout` },
  cart: { title: 'page.cart', path: `${baseUrl}cart` },
  profile: { title: 'page.profile', path: `${baseUrl}profile` },
  myOrder: { title: 'page.myOrder', path: `${baseUrl}my-order` },
};
