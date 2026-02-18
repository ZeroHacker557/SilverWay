export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at?: string;
  sizes?: string[]; // Joined from product_sizes
  selectedSize?: string; // Client-side selection
}

export const categories = [
  { id: 'zirak', name: 'Ziraklar', count: 12, image: 'https://images.unsplash.com/photo-1535633302704-b02f4ffad5d9?w=800&q=80' },
  { id: 'uzuk', name: 'Uzuklar', count: 8, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80' },
  { id: 'marjon', name: 'Marjonlar', count: 5, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80' },
  { id: 'bilakuzuk', name: 'Bilakuzuklar', count: 4, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80' }
];

export const instagramPosts = [
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce33e?w=800&q=80',
  'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=800&q=80',
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80',
  'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=800&q=80',
  'https://images.unsplash.com/photo-1620960512833-286828859942?w=800&q=80'
];

export function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
}
