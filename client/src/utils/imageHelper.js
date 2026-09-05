/**
 * Helper to resolve product image URLs.
 * Static product images are bundled directly in client/public/images/
 * and served by the frontend CDN (Vercel / Render / Vite), avoiding
 * dependency on backend server latency or cold starts.
 */
export function getProductImageUrl(imagePath) {
  if (!imagePath) return '/placeholder.svg';

  // Absolute URL or data URI
  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('data:')
  ) {
    return imagePath;
  }

  // Ensure leading slash for root-relative path
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
}
