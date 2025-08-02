export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  discountPercentage?: number;
  tags: string[];
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  defaultAddressId?: string;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: string;
  currency: string;
  theme: 'light' | 'dark' | 'auto';
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  estimatedDelivery?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  selectedOptions?: Record<string, string>;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

export type PaymentMethod = 
  | 'credit_card'
  | 'debit_card'
  | 'paypal'
  | 'apple_pay'
  | 'google_pay'
  | 'bank_transfer'
  | 'cash_on_delivery';

export interface Category {
  id: string;
  name: string;
  description?: string;
  image: string;
  parentId?: string;
  children?: Category[];
  productCount: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'promotion' | 'system' | 'delivery';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

export interface SearchFilters {
  category?: string;
  brand?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  availability?: 'in_stock' | 'out_of_stock' | 'all';
  sortBy?: 'price_low' | 'price_high' | 'rating' | 'newest' | 'popular';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}