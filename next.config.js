const withCSS = require('@zeit/next-css');
const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
};

module.exports = {
  // reactStrictMode: true,
  // swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
};
module.exports = nextConfig;

// module.exports = withCSS({
//   cssLoaderOptions: {
//     url: false,
//   },
// });
