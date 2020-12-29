module.exports = ({ env }) => ({
  host: env('STRAPI_HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', 1337),
  url: env.int('STRAPI_URL', 'http://localhost'),
  proxy: true,
  admin: {
    auth: {
      secret: env('STRAPI_JWT_SECRET', null),
    },
  },
});
