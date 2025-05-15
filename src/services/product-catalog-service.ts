
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
    imageUrl: `https://placehold.co/300x300.png?text=Tee`,
  },
  {
    id: 'prod_002',
    name: 'Slim Fit Denim Jeans - Blue',
    description: 'Modern slim fit jeans in a classic blue wash, made with stretch denim for comfort.',
    category: 'Apparel',
    tags: ['jeans', 'denim', 'slim fit', 'blue', 'pants'],
    price: 60.00,
    imageUrl: `https://placehold.co/300x300.png?text=Jeans`,
  },
  {
    id: 'prod_003',
    name: 'Minimalist Leather Sneakers - White',
    description: 'Clean and stylish white leather sneakers with a minimalist design.',
    category: 'Footwear',
    tags: ['sneakers', 'leather', 'white', 'minimalist', 'shoes'],
    price: 90.00,
    imageUrl: `https://placehold.co/300x300.png?text=Sneaker`,
  },
  {
    id: 'prod_004',
    name: 'Lightweight Linen Shirt - Beige',
    description: 'A breathable linen shirt in a neutral beige, ideal for warmer weather.',
    category: 'Apparel',
    tags: ['shirt', 'linen', 'beige', 'summer', 'top'],
    price: 45.00,
    imageUrl: `https://placehold.co/300x300.png?text=LShirt`,
  },
  {
    id: 'prod_005',
    name: 'Canvas Tote Bag - Navy',
    description: 'Durable canvas tote bag in navy blue, spacious enough for daily essentials.',
    category: 'Accessories',
    tags: ['bag', 'tote', 'canvas', 'navy', 'accessory'],
    price: 30.00,
    imageUrl: `https://placehold.co/300x300.png?text=Tote`,
  },
  {
    id: 'prod_006',
    name: 'Wool Beanie - Charcoal',
    description: 'A warm wool beanie in a versatile charcoal grey color.',
    category: 'Accessories',
    tags: ['hat', 'beanie', 'wool', 'charcoal', 'winter'],
    price: 20.00,
    imageUrl: `https://placehold.co/300x300.png?text=Beanie`,
  },
  {
    id: 'prod_007',
    name: 'Vintage Wash Denim Jacket',
    description: 'A classic denim jacket with a comfortable vintage wash. Perfect for layering.',
    category: 'Apparel',
    tags: ['jacket', 'denim', 'outerwear', 'vintage'],
    price: 75.00,
    imageUrl: `https://placehold.co/300x300.png?text=Jacket`,
  },
  {
    id: 'prod_008',
    name: 'Silk Scarf - Floral Print',
    description: 'A luxurious silk scarf with an elegant floral print. Adds a touch of color to any outfit.',
    category: 'Accessories',
    tags: ['scarf', 'silk', 'floral', 'accessory'],
    price: 35.00,
    imageUrl: `https://placehold.co/300x300.png?text=Scarf`,
  },
  {
    id: 'prod_009',
    name: 'Comfortable Joggers - Grey Marl',
    description: 'Soft and comfortable joggers in a grey marl. Ideal for lounging or casual outings.',
    category: 'Apparel',
    tags: ['joggers', 'sweatpants', 'casual', 'loungewear'],
    price: 50.00,
    imageUrl: `https://placehold.co/300x300.png?text=Joggers`,
  },
  {
    id: 'prod_010',
    name: 'Leather Belt - Brown',
    description: 'A classic brown leather belt with a silver buckle. A wardrobe staple.',
    category: 'Accessories',
    tags: ['belt', 'leather', 'brown', 'accessory'],
    price: 40.00,
    imageUrl: `https://placehold.co/300x300.png?text=Belt`,
  },
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
    return sampleProducts;
  }

  const lowerCaseQuery = query.toLowerCase();
  return sampleProducts.filter(product =>
    product.name.toLowerCase().includes(lowerCaseQuery) ||
    product.description.toLowerCase().includes(lowerCaseQuery) ||
    product.category.toLowerCase().includes(lowerCaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
  );
}
