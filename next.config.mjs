/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        domains: ["m.media-amazon.com", "t4.ftcdn.net"],
    },
};

export default nextConfig;
