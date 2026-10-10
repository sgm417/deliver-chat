/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: '/widget.js', destination: '/widget' }];
  },
};
module.exports = nextConfig;
