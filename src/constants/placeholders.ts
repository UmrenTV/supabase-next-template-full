export const PLACEHOLDER_IMAGES = {
  // Profile/Avatar placeholders
  AVATAR: '/placeholders/avatar.png',
  AVATAR_FEMALE: '/placeholders/avatar-female.png',
  AVATAR_MALE: '/placeholders/avatar-male.png',
  
  // Blog placeholders
  BLOG_COVER: '/placeholders/blog-cover.png',
  BLOG_WIDE: '/placeholders/blog-wide.png',
  
  // Product placeholders
  PRODUCT: '/placeholders/product.png',
  PRODUCT_SQUARE: '/placeholders/product-square.png',
  PRODUCT_TALL: '/placeholders/product-tall.png',
  
  // Banner/Hero placeholders
  HERO_BANNER: '/placeholders/hero-banner.png',
  WIDE_BANNER: '/placeholders/wide-banner.png',
  
  // Category/Collection placeholders
  CATEGORY: '/placeholders/category.png',
  COLLECTION: '/placeholders/collection.png',
  
  // Logo placeholders
  LOGO: '/placeholders/logo.png',
  BRAND: '/placeholders/brand.png',
  
  // Default fallback
  DEFAULT: '/placeholders/default.png'
} as const

export const PLACEHOLDER_COLORS = {
  primary: '#570DF8',
  secondary: '#F000B8',
  accent: '#1DCDBC',
  neutral: '#2A323C',
  base100: '#1D232A',
  base200: '#191E24',
  base300: '#15191E',
} as const

// Utility function to generate placeholder URLs
export function getPlaceholderImage(
  type: keyof typeof PLACEHOLDER_IMAGES = 'DEFAULT',
  width = 400,
  height = 400,
  text?: string
): string {
  // For development, use placeholder.com service
  const baseUrl = 'https://placehold.co'
  const bgColor = PLACEHOLDER_COLORS.base200.replace('#', '')
  const textColor = PLACEHOLDER_COLORS.primary.replace('#', '')
  const displayText = text || type.toLowerCase().replace('_', ' ')
  
  return `${baseUrl}/${width}x${height}/${bgColor}/${textColor}?text=${displayText}`
} 