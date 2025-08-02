import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, Category } from '../../types';

interface ProductState {
  products: Product[];
  categories: Category[];
  featuredProducts: Product[];
  searchResults: Product[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string | null;
  searchQuery: string;
}

const initialState: ProductState = {
  products: [],
  categories: [],
  featuredProducts: [],
  searchResults: [],
  isLoading: false,
  error: null,
  selectedCategory: null,
  searchQuery: '',
};

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 999,
    originalPrice: 1099,
    images: ['https://via.placeholder.com/300x300?text=iPhone+15+Pro'],
    category: 'Electronics',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 1250,
    stock: 50,
    isAvailable: true,
    isFeatured: true,
    tags: ['smartphone', 'camera', 'premium'],
    specifications: {
      'Screen Size': '6.1 inches',
      'Storage': '128GB',
      'Color': 'Titanium',
    },
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    description: 'Premium Android smartphone with AI features',
    price: 899,
    originalPrice: 999,
    images: ['https://via.placeholder.com/300x300?text=Samsung+Galaxy+S24'],
    category: 'Electronics',
    brand: 'Samsung',
    rating: 4.6,
    reviewCount: 890,
    stock: 75,
    isAvailable: true,
    isFeatured: true,
    tags: ['smartphone', 'android', 'ai'],
    specifications: {
      'Screen Size': '6.2 inches',
      'Storage': '256GB',
      'Color': 'Black',
    },
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Air Max technology',
    price: 150,
    originalPrice: 180,
    images: ['https://via.placeholder.com/300x300?text=Nike+Air+Max+270'],
    category: 'Fashion',
    brand: 'Nike',
    rating: 4.5,
    reviewCount: 567,
    stock: 100,
    isAvailable: true,
    isFeatured: false,
    tags: ['shoes', 'running', 'sports'],
    specifications: {
      'Size': 'US 10',
      'Color': 'White/Black',
      'Material': 'Mesh',
    },
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'MacBook Pro 14"',
    description: 'Professional laptop with M3 Pro chip',
    price: 1999,
    originalPrice: 2199,
    images: ['https://via.placeholder.com/300x300?text=MacBook+Pro+14'],
    category: 'Electronics',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 432,
    stock: 25,
    isAvailable: true,
    isFeatured: true,
    tags: ['laptop', 'professional', 'macbook'],
    specifications: {
      'Screen Size': '14 inches',
      'Storage': '512GB SSD',
      'RAM': '16GB',
    },
    createdAt: new Date(),
  },
];

const mockCategories: Category[] = [
  { id: '1', name: 'Electronics', icon: '📱', productCount: 45 },
  { id: '2', name: 'Fashion', icon: '👕', productCount: 120 },
  { id: '3', name: 'Home & Garden', icon: '🏠', productCount: 78 },
  { id: '4', name: 'Sports', icon: '⚽', productCount: 56 },
  { id: '5', name: 'Books', icon: '📚', productCount: 234 },
  { id: '6', name: 'Beauty', icon: '💄', productCount: 89 },
];

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProducts;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCategories;
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase())
    );
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.featuredProducts = action.payload.filter(product => product.isFeatured);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Search failed';
      });
  },
});

export const { setSelectedCategory, setSearchQuery, clearSearch } = productSlice.actions;

// Selectors
export const selectProducts = (state: { products: ProductState }) => state.products.products;
export const selectCategories = (state: { products: ProductState }) => state.products.categories;
export const selectFeaturedProducts = (state: { products: ProductState }) => state.products.featuredProducts;
export const selectSearchResults = (state: { products: ProductState }) => state.products.searchResults;
export const selectIsLoading = (state: { products: ProductState }) => state.products.isLoading;
export const selectError = (state: { products: ProductState }) => state.products.error;

export default productSlice.reducer;