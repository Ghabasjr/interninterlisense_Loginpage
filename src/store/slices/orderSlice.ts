import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderStatus, PaymentStatus } from '../../types';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    items: [
      {
        id: '1',
        product: {
          id: '1',
          name: 'iPhone 15 Pro',
          description: 'Latest iPhone with advanced camera system',
          price: 999,
          images: ['https://via.placeholder.com/300x300?text=iPhone+15+Pro'],
          category: 'Electronics',
          brand: 'Apple',
          rating: 4.8,
          reviewCount: 1250,
          stock: 50,
          isAvailable: true,
          isFeatured: true,
          tags: ['smartphone', 'camera'],
          specifications: {},
          createdAt: new Date(),
        },
        quantity: 1,
      },
    ],
    totalAmount: 999,
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    billingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    paymentMethod: {
      id: '1',
      type: 'card',
      name: 'Visa ending in 1234',
      last4: '1234',
      brand: 'Visa',
    },
    paymentStatus: 'completed' as PaymentStatus,
    orderStatus: 'delivered' as OrderStatus,
    trackingNumber: 'TRK123456789',
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: '1',
    items: [
      {
        id: '2',
        product: {
          id: '3',
          name: 'Nike Air Max 270',
          description: 'Comfortable running shoes',
          price: 150,
          images: ['https://via.placeholder.com/300x300?text=Nike+Air+Max+270'],
          category: 'Fashion',
          brand: 'Nike',
          rating: 4.5,
          reviewCount: 567,
          stock: 100,
          isAvailable: true,
          isFeatured: false,
          tags: ['shoes', 'running'],
          specifications: {},
          createdAt: new Date(),
        },
        quantity: 2,
      },
    ],
    totalAmount: 300,
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    billingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    paymentMethod: {
      id: '2',
      type: 'upi',
      name: 'UPI Payment',
    },
    paymentStatus: 'completed' as PaymentStatus,
    orderStatus: 'shipped' as OrderStatus,
    trackingNumber: 'TRK987654321',
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
];

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockOrders.filter(order => order.userId === userId);
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      orderStatus: 'pending' as OrderStatus,
      paymentStatus: 'pending' as PaymentStatus,
    };
    
    return newOrder;
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { orderId, status };
  }
);

export const trackOrder = createAsyncThunk(
  'orders/trackOrder',
  async (trackingNumber: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock tracking data
    const trackingData = {
      trackingNumber,
      status: 'In Transit',
      location: 'Distribution Center',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      updates: [
        {
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          status: 'Package picked up',
          location: 'Warehouse',
        },
        {
          date: new Date(Date.now() - 12 * 60 * 60 * 1000),
          status: 'In transit',
          location: 'Distribution Center',
        },
      ],
    };
    
    return trackingData;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.unshift(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create order';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;
        const order = state.orders.find(o => o.id === orderId);
        if (order) {
          order.orderStatus = status;
          order.updatedAt = new Date();
        }
        if (state.currentOrder?.id === orderId) {
          state.currentOrder.orderStatus = status;
          state.currentOrder.updatedAt = new Date();
        }
      });
  },
});

export const { setCurrentOrder, clearError } = orderSlice.actions;

// Selectors
export const selectOrders = (state: { orders: OrderState }) => state.orders.orders;
export const selectCurrentOrder = (state: { orders: OrderState }) => state.orders.currentOrder;
export const selectIsLoading = (state: { orders: OrderState }) => state.orders.isLoading;
export const selectError = (state: { orders: OrderState }) => state.orders.error;

export default orderSlice.reducer;