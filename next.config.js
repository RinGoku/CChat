const withPWA = require("next-pwa")({
  dest: "public",
});
module.exports = withPWA({
  // pwa: {
  //   dest: "public",
  //   register: true,
  //   skipWaiting: true,
  // },
  reactStrinctMode: true,
  async redirects() {
    return [
      {
        source: "/", // リダイレクト元のURL
        destination: "/channels/list", // リダイレクト先のURL
        permanent: true, // 永続的なリダイレクトかのフラグ
      },
    ];
  },
});
