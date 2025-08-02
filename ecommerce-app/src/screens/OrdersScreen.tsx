import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Card,
  Chip,
  Button,
  useTheme,
  SegmentedButtons,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { Order, OrderStatus } from '../types';

// Mock orders data - replace with actual API calls
const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    userId: 'user123',
    items: [
      {
        id: '1',
        productId: '1',
        product: {
          id: '1',
          name: 'Wireless Bluetooth Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 99.99,
          originalPrice: 129.99,
          images: ['https://via.placeholder.com/300x300/FF6B35/FFFFFF?text=Headphones'],
          category: 'Electronics',
          brand: 'TechBrand',
          rating: 4.5,
          reviewCount: 128,
          stock: 50,
          isAvailable: true,
          isFeatured: true,
          isOnSale: true,
          discountPercentage: 23,
          tags: ['wireless', 'bluetooth', 'noise-cancellation'],
          specifications: {},
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        quantity: 2,
        price: 99.99,
      },
    ],
    status: 'shipped',
    paymentStatus: 'completed',
    paymentMethod: 'credit_card',
    subtotal: 199.98,
    tax: 16.00,
    shipping: 9.99,
    discount: 59.98,
    total: 165.99,
    shippingAddress: {
      id: '1',
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true,
    },
    billingAddress: {
      id: '1',
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true,
    },
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-01-15',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
  },
  {
    id: 'ORD-2024-002',
    userId: 'user123',
    items: [
      {
        id: '2',
        productId: '2',
        product: {
          id: '2',
          name: 'Smart Fitness Watch',
          description: 'Track your fitness goals with this advanced smartwatch',
          price: 199.99,
          images: ['https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Watch'],
          category: 'Electronics',
          brand: 'FitTech',
          rating: 4.8,
          reviewCount: 256,
          stock: 30,
          isAvailable: true,
          isFeatured: true,
          isOnSale: false,
          tags: ['fitness', 'smartwatch', 'health'],
          specifications: {},
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        quantity: 1,
        price: 199.99,
      },
    ],
    status: 'delivered',
    paymentStatus: 'completed',
    paymentMethod: 'paypal',
    subtotal: 199.99,
    tax: 16.00,
    shipping: 9.99,
    discount: 0,
    total: 225.98,
    shippingAddress: {
      id: '1',
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true,
    },
    billingAddress: {
      id: '1',
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true,
    },
    createdAt: '2024-01-05T15:30:00Z',
    updatedAt: '2024-01-08T11:20:00Z',
  },
  {
    id: 'ORD-2024-003',
    userId: 'user123',
    items: [
      {
        id: '3',
        productId: '3',
        product: {
          id: '3',
          name: 'Premium Coffee Maker',
          description: 'Automatic coffee maker with programmable settings',
          price: 149.99,
          originalPrice: 199.99,
          images: ['https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Coffee'],
          category: 'Home & Garden',
          brand: 'BrewMaster',
          rating: 4.3,
          reviewCount: 89,
          stock: 25,
          isAvailable: true,
          isFeatured: false,
          isOnSale: true,
          discountPercentage: 25,
          tags: ['coffee', 'kitchen', 'automatic'],
          specifications: {},
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        quantity: 1,
        price: 149.99,
      },
    ],
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'credit_card',
    subtotal: 149.99,
    tax: 12.00,
    shipping: 9.99,
    discount: 50.00,
    total: 121.98,
    shippingAddress: {
      id: '1',
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true,
    },
    billingAddress: {
      id: '1',
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true,
    },
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
  },
];

const OrdersScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [orders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState<string>('all');

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return '#FF9800';
      case 'confirmed':
        return '#2196F3';
      case 'processing':
        return '#9C27B0';
      case 'shipped':
        return '#4CAF50';
      case 'delivered':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      case 'refunded':
        return '#607D8B';
      default:
        return '#666666';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'time';
      case 'confirmed':
        return 'checkmark-circle';
      case 'processing':
        return 'construct';
      case 'shipped':
        return 'car';
      case 'delivered':
        return 'home';
      case 'cancelled':
        return 'close-circle';
      case 'refunded':
        return 'refresh';
      default:
        return 'help-circle';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const renderOrderCard = (order: Order) => (
    <Card key={order.id} style={styles.orderCard}>
      <Card.Content>
        <View style={styles.orderHeader}>
          <View>
            <Text variant="titleMedium" style={styles.orderId}>
              {order.id}
            </Text>
            <Text variant="bodySmall" style={styles.orderDate}>
              {new Date(order.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <Chip
            mode="flat"
            textStyle={styles.statusChipText}
            style={[
              styles.statusChip,
              { backgroundColor: getStatusColor(order.status) }
            ]}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Chip>
        </View>

        <View style={styles.orderItems}>
          {order.items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.orderItemInfo}>
                <Text variant="bodyMedium" style={styles.orderItemName}>
                  {item.product.name}
                </Text>
                <Text variant="bodySmall" style={styles.orderItemQuantity}>
                  Qty: {item.quantity}
                </Text>
              </View>
              <Text variant="bodyMedium" style={styles.orderItemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.orderTotal}>
          <Text variant="titleMedium" style={styles.totalAmount}>
            Total: ${order.total.toFixed(2)}
          </Text>
        </View>

        <View style={styles.orderActions}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('OrderTracking', { orderId: order.id })}
            style={styles.actionButton}
          >
            Track Order
          </Button>
          
          {order.status === 'delivered' && (
            <Button
              mode="contained"
              onPress={() => {
                // TODO: Navigate to review screen
                console.log('Write review for order:', order.id);
              }}
              style={styles.actionButton}
            >
              Write Review
            </Button>
          )}
          
          {order.status === 'pending' && (
            <Button
              mode="contained"
              onPress={() => {
                // TODO: Cancel order
                console.log('Cancel order:', order.id);
              }}
              style={[styles.actionButton, styles.cancelButton]}
              textColor={theme.colors.error}
            >
              Cancel Order
            </Button>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <SegmentedButtons
          value={filter}
          onValueChange={setFilter}
          buttons={[
            { value: 'all', label: 'All' },
            { value: 'pending', label: 'Pending' },
            { value: 'shipped', label: 'Shipped' },
            { value: 'delivered', label: 'Delivered' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      {/* Orders List */}
      <ScrollView style={styles.ordersContainer} showsVerticalScrollIndicator={false}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map(renderOrderCard)
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="list" size={80} color="#CCCCCC" />
            <Text variant="titleMedium" style={styles.emptyTitle}>
              No orders found
            </Text>
            <Text variant="bodyMedium" style={styles.emptySubtitle}>
              {filter === 'all' 
                ? 'You haven\'t placed any orders yet'
                : `No ${filter} orders found`
              }
            </Text>
            {filter === 'all' && (
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Products')}
                style={styles.shopNowButton}
              >
                Start Shopping
              </Button>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  filterContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  ordersContainer: {
    flex: 1,
    padding: 16,
  },
  orderCard: {
    marginBottom: 16,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderId: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  orderDate: {
    color: '#666666',
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  statusChipText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  orderItems: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontWeight: '500',
  },
  orderItemQuantity: {
    color: '#666666',
  },
  orderItemPrice: {
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  orderTotal: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
    marginBottom: 16,
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
  },
  cancelButton: {
    borderColor: '#FF5252',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    marginTop: 16,
    color: '#666666',
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 8,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopNowButton: {
    borderRadius: 8,
  },
});

export default OrdersScreen;