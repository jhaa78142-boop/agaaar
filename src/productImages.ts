const PRODUCT_IMAGE_URLS: Record<string, string> = {
  "chandan-natural": "/product-chandan-natural.webp",
  "rose-gold": "/product-rose-gold.webp",
  "chafa-green": "/product-chafa-green.webp",
  "black-oudh": "/gemini-generated-image-q0o5itq0o5itq0o5.webp",
  "camphor-jasmine": "/product-chafa-green.webp",
};

const FALLBACK_IMAGE = "/agarbatti-hero.webp";

export function getProductImage(productId: string): string {
  // If we're looking for black-oudh and it might be missing, 
  // we can't check file existence in browser, but we can return a better default
  return PRODUCT_IMAGE_URLS[productId] || FALLBACK_IMAGE;
}

export { PRODUCT_IMAGE_URLS };
