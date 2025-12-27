
import { Product } from './types';

export const BRAND = {
  name: 'Hive Image',
  firstPart: 'Hive',
  secondPart: 'Image',
  nameUpper: 'HIVE IMAGE',
  logoIcon: 'fa-camera-retro', // Changed from bolt to camera-retro to match "Image" theme
  supportPhone: '+44 7469 535612',
  supportEmail: 'support@hiveimage.co.uk',
  address: '56 Outram Road, London E6 1JR'
};

const MOCK_REVIEWS = [
  { user: "Sarah J.", rating: 5, comment: "Exceeded all expectations. The build quality is exceptional.", date: "2 days ago" },
  { user: "Mark D.", rating: 4, comment: "Great performance, slightly heavier than expected but worth it.", date: "1 week ago" }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'HivePhone Pro Max',
    category: 'Smartphones',
    price: 999.00,
    description: 'The pinnacle of mobile engineering with a Pro-level camera system and 120Hz display.',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    stock: 12,
    featured: true,
    specs: {
      dimensions: '160.7 x 77.6 x 7.9 mm',
      weight: '240g',
      powerConsumption: '20W Peak Charging',
      warranty: '2 Year UK Manufacturer Warranty'
    },
    reviews: MOCK_REVIEWS
  },
  {
    id: '2',
    name: 'HiveX Gaming Laptop',
    category: 'Laptops',
    price: 1499.99,
    description: 'NVIDIA RTX 4080 powered beast designed for extreme performance and 4K editing.',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    stock: 5,
    featured: true,
    specs: {
      dimensions: '357 x 252 x 19.9 mm',
      weight: '2.4kg',
      powerConsumption: '240W Power Adapter',
      warranty: '3 Year Premium On-site Warranty'
    },
    reviews: MOCK_REVIEWS
  },
  {
    id: '3',
    name: 'HiveSound ANC Headphones',
    category: 'Audio',
    price: 249.00,
    description: 'Immersive spatial audio with industry-leading active noise cancellation.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    stock: 25,
    specs: {
      dimensions: '180 x 160 x 80 mm',
      weight: '320g',
      powerConsumption: 'USB-C Fast Charge (5W)',
      warranty: '2 Year Standard Warranty'
    },
    reviews: MOCK_REVIEWS
  },
  {
    id: '4',
    name: 'HiveSmart Kettle',
    category: 'Kitchen',
    price: 89.99,
    description: 'WiFi-enabled temperature control for the perfect cup of British tea every time.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eea50f5?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    stock: 40,
    specs: {
      dimensions: '220 x 150 x 240 mm',
      weight: '1.2kg',
      powerConsumption: '3000W Rapid Boil',
      warranty: '1 Year Full Replacement'
    },
    reviews: MOCK_REVIEWS
  },
  {
    id: '5',
    name: 'HiveWash Pro 9000',
    category: 'Kitchen',
    price: 649.00,
    description: 'AI-driven washing cycles that optimize water and detergent usage automatically.',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    stock: 8,
    featured: true,
    specs: {
      dimensions: '850 x 600 x 550 mm',
      weight: '72kg',
      powerConsumption: 'Energy Rating A+++',
      warranty: '10 Year Motor Warranty'
    },
    reviews: MOCK_REVIEWS
  },
  {
    id: '6',
    name: 'HiveHome Hub',
    category: 'Smart Home',
    price: 129.00,
    description: 'Centralize your entire home automation with this sleek, touch-screen smart hub.',
    image: 'https://images.unsplash.com/photo-1558002038-103792e197ed?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    stock: 50,
    specs: {
      dimensions: '200 x 135 x 15 mm',
      weight: '450g',
      powerConsumption: '15W Power Delivery',
      warranty: '2 Year Tech Support included'
    },
    reviews: MOCK_REVIEWS
  },
  {
    id: '7',
    name: 'HiveMaster Air Fryer',
    category: 'Kitchen',
    price: 179.99,
    description: 'Large capacity 8L basket with 12 preset functions for healthy UK favorites.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    stock: 15,
    specs: {
      dimensions: '320 x 300 x 350 mm',
      weight: '5.8kg',
      powerConsumption: '1700W Eco-Mode',
      warranty: '2 Year Parts & Labour'
    },
    reviews: MOCK_REVIEWS
  },
  {
    id: '8',
    name: 'HiveTab Ultra',
    category: 'Laptops',
    price: 799.00,
    description: 'A tablet that performs like a laptop. Ultra-thin, OLED display, and stylus included.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    stock: 20,
    specs: {
      dimensions: '285 x 185 x 5.5 mm',
      weight: '560g',
      powerConsumption: '45W Fast Charging',
      warranty: '2 Year Manufacturer Warranty'
    },
    reviews: MOCK_REVIEWS
  }
];

export const NAV_LINKS = [
  { name: 'Home', view: 'Home' },
  { name: 'Shop All', view: 'Shop' },
  { name: 'Deals', view: 'Shop' },
  { name: 'Support', view: 'Home' }
];
