/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['fal.ai', 'v3.fal.media', 'r2-us-west.photoai.com', 'encrypted-tbn1.gstatic.com', "heronscrossing.vet", "queue.fal.run" ], // Add fal.ai to the list of allowed domains
    },
  };
export default nextConfig;
