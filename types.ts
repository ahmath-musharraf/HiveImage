
export interface Specifications {
  dimensions: string;
  weight: string;
  powerConsumption: string;
  warranty: string;
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Smartphones' | 'Laptops' | 'Smart Home' | 'Kitchen' | 'Audio';
  price: number;
  description: string;
  image: string;
  rating: number;
  stock: number;
  featured?: boolean;
  specs: Specifications;
  reviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};

export enum ViewMode {
  Home,
  Shop,
  ProductDetail,
  Cart,
  Checkout,
  Success,
  Compare,
  Wishlist,
  Warranty,
  HelpCentre,
  Delivery,
  Returns,
  OrderHistory,
  Privacy,
  Terms,
  Cookies
}
