import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  Chip,
  useTheme,
  List,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Order, OrderStatus } from '../types';

const { width: screenWidth } = Dimensions.get('window');

// Mock order data - replace with actual API calls
const mockOrder: Order = {
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
  status: 'shipped',
  paymentStatus: 'completed',
  paymentMethod: 'credit_card',
  subtotal: 399.97,
  tax: 32.00,
  shipping: 9.99,
  discount: 59.98,
  total: 381.98,
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
  notes: 'Please deliver during business hours',
  createdAt: '2024-01-10T10:00:00Z',
  updatedAt: '2024-01-12T14:30:00Z',
};

const trackingSteps = [
  {
    status: 'pending',
    title: 'Order Placed',
    description: 'Your order has been placed successfully',
    icon: 'receipt',
    completed: true,
    timestamp: '2024-01-10 10:00 AM',
  },
  {
    status: 'confirmed',
    title: 'Order Confirmed',
    description: 'We have confirmed your order and payment',
    icon: 'checkmark-circle',
    completed: true,
    timestamp: '2024-01-10 11:30 AM',
  },
  {
    status: 'processing',
    title: 'Processing',
    description: 'Your order is being prepared for shipment',
    icon: 'construct',
    completed: true,
    timestamp: '2024-01-11 09:15 AM',
  },
  {
    status: 'shipped',
    title: 'Shipped',
    description: 'Your order has been shipped',
    icon: 'car',
    completed: true,
    timestamp: '2024-01-12 02:30 PM',
  },
  {
    status: 'delivered',
    title: 'Delivered',
    description: 'Your order has been delivered',
    icon: 'home',
    completed: false,
    timestamp: null,
  },
];

const OrderTrackingScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [order] = useState<Order>(mockOrder);
  const [currentStep, setCurrentStep] = useState(3); // Index of current step

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

  const renderTrackingStep = (step: any, index: number) => (
    <View key={step.status} style={styles.trackingStep}>
      <View style={styles.stepIconContainer}>
        <View
          style={[
            styles.stepIcon,
            {
              backgroundColor: step.completed ? theme.colors.primary : '#E0E0E0',
            },
          ]}
        >
          <Ionicons
            name={step.icon as any}
            size={20}
            color={step.completed ? '#FFFFFF' : '#666666'}
          />
        </View>
        {index < trackingSteps.length - 1 && (
          <View
            style={[
              styles.stepLine,
              {
                backgroundColor: step.completed ? theme.colors.primary : '#E0E0E0',
              },
            ]}
          />
        )}
      </View>
      
      <View style={styles.stepContent}>
        <Text variant="titleSmall" style={styles.stepTitle}>
          {step.title}
        </Text>
        <Text variant="bodySmall" style={styles.stepDescription}>
          {step.description}
        </Text>
        {step.timestamp && (
          <Text variant="bodySmall" style={styles.stepTimestamp}>
            {step.timestamp}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Order Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.orderHeader}>
            <View>
              <Text variant="titleLarge" style={styles.orderId}>
                {order.id}
              </Text>
              <Text variant="bodyMedium" style={styles.orderDate}>
                Ordered on {new Date(order.createdAt).toLocaleDateString()}
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
        </Card.Content>
      </Card>

      {/* Tracking Timeline */}
      <Card style={styles.timelineCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Order Timeline
          </Text>
          <View style={styles.timelineContainer}>
            {trackingSteps.map((step, index) => renderTrackingStep(step, index))}
          </View>
        </Card.Content>
      </Card>

      {/* Tracking Information */}
      <Card style={styles.trackingCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Tracking Information
          </Text>
          
          <View style={styles.trackingInfo}>
            <View style={styles.trackingRow}>
              <Ionicons name="barcode" size={20} color={theme.colors.primary} />
              <Text variant="bodyMedium" style={styles.trackingLabel}>
                Tracking Number:
              </Text>
              <Text variant="bodyMedium" style={styles.trackingValue}>
                {order.trackingNumber}
              </Text>
            </View>
            
            <View style={styles.trackingRow}>
              <Ionicons name="calendar" size={20} color={theme.colors.primary} />
              <Text variant="bodyMedium" style={styles.trackingLabel}>
                Estimated Delivery:
              </Text>
              <Text variant="bodyMedium" style={styles.trackingValue}>
                {order.estimatedDelivery}
              </Text>
            </View>
            
            <View style={styles.trackingRow}>
              <Ionicons name="car" size={20} color={theme.colors.primary} />
              <Text variant="bodyMedium" style={styles.trackingLabel}>
                Carrier:
              </Text>
              <Text variant="bodyMedium" style={styles.trackingValue}>
                Express Shipping
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Order Details */}
      <Card style={styles.detailsCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Order Details
          </Text>
          
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
          
          <View style={styles.orderSummary}>
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Subtotal</Text>
              <Text variant="bodyMedium">${order.subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Shipping</Text>
              <Text variant="bodyMedium">${order.shipping.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Tax</Text>
              <Text variant="bodyMedium">${order.tax.toFixed(2)}</Text>
            </View>
            {order.discount > 0 && (
              <View style={styles.summaryRow}>
                <Text variant="bodyMedium">Discount</Text>
                <Text variant="bodyMedium" style={styles.discountText}>
                  -${order.discount.toFixed(2)}
                </Text>
              </View>
            )}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text variant="titleMedium" style={styles.totalLabel}>Total</Text>
              <Text variant="titleMedium" style={styles.totalAmount}>
                ${order.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Shipping Address */}
      <Card style={styles.addressCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Shipping Address
          </Text>
          
          <View style={styles.addressInfo}>
            <Text variant="bodyMedium" style={styles.addressName}>
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </Text>
            <Text variant="bodyMedium" style={styles.addressText}>
              {order.shippingAddress.street}
            </Text>
            <Text variant="bodyMedium" style={styles.addressText}>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </Text>
            <Text variant="bodyMedium" style={styles.addressText}>
              {order.shippingAddress.country}
            </Text>
            <Text variant="bodyMedium" style={styles.addressPhone}>
              📞 {order.shippingAddress.phone}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <Button
          mode="contained"
          onPress={() => {
            // TODO: Open tracking URL or carrier app
            console.log('Open tracking details');
          }}
          style={styles.actionButton}
        >
          Track Package
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Orders')}
          style={styles.actionButton}
        >
          View All Orders
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerCard: {
    margin: 16,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  timelineCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timelineContainer: {
    paddingLeft: 16,
  },
  trackingStep: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepIconContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLine: {
    width: 2,
    height: 40,
    marginTop: 8,
  },
  stepContent: {
    flex: 1,
    paddingTop: 8,
  },
  stepTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepDescription: {
    color: '#666666',
    marginBottom: 4,
  },
  stepTimestamp: {
    color: '#999999',
    fontSize: 12,
  },
  trackingCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  trackingInfo: {
    gap: 12,
  },
  trackingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trackingLabel: {
    fontWeight: '500',
    minWidth: 120,
  },
  trackingValue: {
    flex: 1,
    fontWeight: 'bold',
  },
  detailsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  orderSummary: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  discountText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  addressCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  addressInfo: {
    gap: 4,
  },
  addressName: {
    fontWeight: 'bold',
  },
  addressText: {
    color: '#666666',
  },
  addressPhone: {
    marginTop: 4,
  },
  actionContainer: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    borderRadius: 8,
  },
});

export default OrderTrackingScreen;