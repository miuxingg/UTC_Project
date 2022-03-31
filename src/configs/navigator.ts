type TRouterName = 'home' | 'products' | 'productsDetail' | 'login';

const baseUrl = '/';
export const Routers: Record<TRouterName, { title: string; path: string }> = {
  home: { title: 'page.home.title', path: `${baseUrl}` },
  products: { title: 'page.home.products', path: `${baseUrl}products` },
  productsDetail: {
    title: 'page.home.product.details',
    path: `${baseUrl}[id]`,
  },
  login: { title: 'page.login', path: `${baseUrl}login` },
};
