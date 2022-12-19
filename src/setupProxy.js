// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/rpc-xdc-mainnet',
    createProxyMiddleware({
      target: 'https://erpc.xinfin.network',
      changeOrigin: true,
    }),
  );
  app.use(
    '/rpc-xdc-testnet',
    createProxyMiddleware({
      target: 'https://rpc.apothem.network',
      changeOrigin: true,
    }),
  );

  app.use(
    '/rpc-bsc-mainnet',
    createProxyMiddleware({
      target: 'https://bsc-dataseed1.binance.org',
      changeOrigin: true,
    }),
  );
  app.use(
    '/rpc-bsc-testnet',
    createProxyMiddleware({
      target: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      changeOrigin: true,
    }),
  );
  app.use(
    '/rpc-polygon-testnet',
    createProxyMiddleware({
      target: 'https://matic-mumbai.chainstacklabs.com',
      changeOrigin: true,
    }),
  );
};
