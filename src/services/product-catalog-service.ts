
'use server';

/**
 * @fileOverview A mock service for fetching product data.
 * In a real application, this would connect to a database or e-commerce API.
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  imageUrl?: string; // Optional image URL
}

// Sample product data - replace with your actual product data source
const sampleProducts: Product[] = [
  {
    id: 'prod_001',
    name: 'Classic Cotton Tee - Black',
    description: 'A comfortable and versatile black cotton t-shirt, perfect for everyday wear.',
    category: 'Apparel',
    tags: ['t-shirt', 'cotton', 'basic', 'black', 'top'],
    price: 25.00,
    imageUrl: `https://placehold.co/300x300.png`,
    "data-ai-hint": "tee shirt"
  },
  {
    id: 'prod_002',
    name: 'Slim Fit Denim Jeans - Blue',
    description: 'Modern slim fit jeans in a classic blue wash, made with stretch denim for comfort.',
    category: 'Apparel',
    tags: ['jeans', 'denim', 'slim fit', 'blue', 'pants'],
    price: 60.00,
    imageUrl: `https://placehold.co/300x300.png`,
    "data-ai-hint": "denim jeans"
  },
  {
    id: 'prod_003',
    name: 'Minimalist Leather Sneakers - White',
    description: 'Clean and stylish white leather sneakers with a minimalist design.',
    category: 'Footwear',
    tags: ['sneakers', 'leather', 'white', 'minimalist', 'shoes'],
    price: 90.00,
    imageUrl: `https://placehold.co/300x300.png`,
    "data-ai-hint": "white sneaker"
  },
  {
    id: 'prod_004',
    name: 'Lightweight Linen Shirt - Beige',
    description: 'A breathable linen shirt in a neutral beige, ideal for warmer weather.',
    category: 'Apparel',
    tags: ['shirt', 'linen', 'beige', 'summer', 'top'],
    price: 45.00,
    imageUrl: `https://placehold.co/300x300.png`,
    "data-ai-hint": "linen shirt"
  },
  {
    id: 'prod_005',
    name: 'Canvas Tote Bag - Navy',
    description: 'Durable canvas tote bag in navy blue, spacious enough for daily essentials.',
    category: 'Accessories',
    tags: ['bag', 'tote', 'canvas', 'navy', 'accessory'],
    price: 30.00,
    imageUrl: `https://placehold.co/300x300.png`,
    "data-ai-hint": "canvas bag"
  },
  {
    id: 'prod_006',
    name: 'Wool Beanie - Charcoal',
    description: 'A warm wool beanie in a versatile charcoal grey color.',
    category: 'Accessories',
    tags: ['hat', 'beanie', 'wool', 'charcoal', 'winter'],
    price: 20.00,
    imageUrl: `https://placehold.co/300x300.png`,
    "data-ai-hint": "wool beanie"
  },
  {
    id: 'prod_007',
    name: 'Vintage Wash Denim Jacket',
    description: 'A classic denim jacket with a comfortable vintage wash. Perfect for layering.',
    category: 'Apparel',
    tags: ['jacket', 'denim', 'outerwear', 'vintage'],
    price: 75.00,
    imageUrl: `https://placehold.co/300x300.png`,
    "data-ai-hint": "denim jacket"
  },
  {
    id: 'prod_008',
    name: 'Silk Scarf - Floral Print',
    description: 'A luxurious silk scarf with an elegant floral print. Adds a touch of color to any outfit.',
    category: 'Accessories',
    tags: ['scarf', 'silk', 'floral', 'accessory'],
    price: 35.00,
    imageUrl: `https://placehold.co/300x300.png`,
    "data-ai-hint": "silk scarf"
  },
  {
    id: 'prod_009',
    name: 'Comfortable Joggers - Grey Marl',
    description: 'Soft and comfortable joggers in a grey marl. Ideal for lounging or casual outings.',
    category: 'Apparel',
    tags: ['joggers', 'sweatpants', 'casual', 'loungewear'],
    price: 50.00,
    imageUrl: `https://placehold.co/300x300.png`,
    "data-ai-hint": "grey joggers"
  },
  {
    id: 'prod_010',
    name: 'Leather Belt - Brown',
    description: 'A classic brown leather belt with a silver buckle. A wardrobe staple.',
    category: 'Accessories',
    tags: ['belt', 'leather', 'brown', 'accessory'],
    price: 40.00,
    imageUrl: `https://placehold.co/300x300.png`,
    "data-ai-hint": "leather belt"
  },
  // Baggy Clothes Start
  {
    id: 'prod_011',
    name: 'Oversized Graphic Hoodie - Black',
    description: 'A super comfy oversized black hoodie with a cool graphic print on the back. Ultimate streetwear vibe.',
    category: 'Apparel',
    tags: ['hoodie', 'oversized', 'baggy', 'streetwear', 'graphic', 'black', 'top'],
    price: 65.00,
    imageUrl: `https://placehold.co/400x400.png`,
    "data-ai-hint": "graphic hoodie"
  },
  {
    id: 'prod_012',
    name: 'Baggy Denim Jeans - Light Wash',
    description: 'Relaxed fit, light wash denim jeans offering a classic baggy silhouette. Perfect for a casual, laid-back look.',
    category: 'Apparel',
    tags: ['jeans', 'denim', 'baggy', 'oversized', 'light wash', 'pants', 'streetwear'],
    price: 70.00,
    imageUrl: `https://placehold.co/400x400.png`,
    "data-ai-hint": "baggy jeans"
  },
  {
    id: 'prod_013',
    name: 'Loose-Fit Cargo Pants - Olive Green',
    description: 'Durable and stylish loose-fit cargo pants in olive green, featuring multiple pockets and a comfortable cut.',
    category: 'Apparel',
    tags: ['cargo pants', 'loose fit', 'baggy', 'utilitarian', 'olive', 'pants'],
    price: 55.00,
    imageUrl: `https://placehold.co/400x400.png`,
    "data-ai-hint": "cargo pants"
  },
  {
    id: 'prod_014',
    name: 'Baggy Skater T-Shirt - White',
    description: 'A crisp white t-shirt with an extra loose, baggy fit, inspired by skater style. Made from heavy cotton.',
    category: 'Apparel',
    tags: ['t-shirt', 'baggy', 'oversized', 'skater', 'white', 'top', 'streetwear'],
    price: 30.00,
    imageUrl: `https://placehold.co/400x400.png`,
    "data-ai-hint": "skater shirt"
  },
  {
    id: 'prod_015',
    name: 'Relaxed Fit Corduroy Trousers - Brown',
    description: 'Comfortable and trendy relaxed fit corduroy trousers in a rich brown color. Soft texture and easy to style.',
    category: 'Apparel',
    tags: ['trousers', 'corduroy', 'relaxed fit', 'baggy', 'brown', 'pants'],
    price: 60.00,
    imageUrl: `https://placehold.co/400x400.png`,
    "data-ai-hint": "corduroy trousers"
  },
  {
    id: 'prod_016',
    name: 'Oversized Knit Sweater - Cream',
    description: 'A cozy oversized knit sweater in cream, perfect for a relaxed and warm look. Features a chunky knit pattern.',
    category: 'Apparel',
    tags: ['sweater', 'knitwear', 'oversized', 'baggy', 'cream', 'top', 'cozy'],
    price: 75.00,
    imageUrl: `https://placehold.co/400x400.png`,
    "data-ai-hint": "knit sweater"
  },
  {
    id: 'prod_017',
    name: 'Baggy Track Pants - Grey',
    description: 'Comfortable and stylish baggy track pants in grey, ideal for a sporty or casual streetwear look.',
    category: 'Apparel',
    tags: ['track pants', 'sweatpants', 'baggy', 'oversized', 'grey', 'sporty', 'streetwear'],
    price: 48.00,
    imageUrl: `https://placehold.co/400x400.png`,
    "data-ai-hint": "track pants"
  }
  // Baggy Clothes End
];

/**
 * Fetches products from the catalog.
 * @param query Optional search query to filter products.
 * @returns A promise that resolves to an array of products.
 */
export async function fetchProductsFromCatalog(
  query?: string
): Promise<Product[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!query) {
    // Return a random subset if no query to simulate variety, or all for testing
    // return sampleProducts.sort(() => 0.5 - Math.random()).slice(0, 10);
    return sampleProducts;
  }

  const lowerCaseQuery = query.toLowerCase();
  const keywords = lowerCaseQuery.split(/\s+/).filter(k => k.length > 1); // split query into keywords

  return sampleProducts.filter(product => {
    const productName = product.name.toLowerCase();
    const productDescription = product.description.toLowerCase();
    const productCategory = product.category.toLowerCase();
    const productTags = product.tags.map(tag => tag.toLowerCase());

    // Check if any keyword matches product name, description, category, or tags
    return keywords.some(keyword =>
      productName.includes(keyword) ||
      productDescription.includes(keyword) ||
      productCategory.includes(keyword) ||
      productTags.some(tag => tag.includes(keyword))
    );
  }).slice(0, 15); // Limit results to avoid overly long lists
}
