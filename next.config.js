@"
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
"@ | Set-Content -Path "next.config.js" -Encoding UTF8