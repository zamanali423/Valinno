/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Portfolio cover images are SVG placeholders until real case-study
    // images replace them (see lib/data.ts).
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
