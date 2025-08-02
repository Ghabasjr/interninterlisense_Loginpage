import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  TextInput,
  RadioButton,
  Divider,
  Chip,
  useTheme,
  List,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { Address, PaymentMethod, CartItem } from '../types';

// Mock data - replace with actual state management
const mockCartItems: CartItem[] = [
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
  },
];

const mockAddresses: Address[] = [
  {
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
  {
    id: '2',
    type: 'work',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    street: '456 Business Ave',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    country: 'USA',
    isDefault: false,
  },
];

const paymentMethods: { method: PaymentMethod; label: string; icon: string }[] = [
  { method: 'credit_card', label: 'Credit Card', icon: 'card' },
  { method: 'debit_card', label: 'Debit Card', icon: 'card' },
  { method: 'paypal', label: 'PayPal', icon: 'logo-paypal' },
  { method: 'apple_pay', label: 'Apple Pay', icon: 'logo-apple' },
  { method: 'google_pay', label: 'Google Pay', icon: 'logo-google' },
];

const CheckoutScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [cartItems] = useState<CartItem[]>(mockCartItems);
  const [addresses] = useState<Address[]>(mockAddresses);
  const [selectedAddress, setSelectedAddress] = useState<Address>(mockAddresses[0]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states for new address
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.product.originalPrice) {
        return total + ((item.product.originalPrice - item.product.price) * item.quantity);
      }
      return total;
    }, 0);
  };

  const calculateShipping = () => {
    return cartItems.length > 0 ? 9.99 : 0;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax rate
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const handlePayment = async () => {
    if (!selectedAddress) {
      Alert.alert('Error', 'Please select a shipping address');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // TODO: Integrate with actual payment gateway
      // Example: Stripe, PayPal, Razorpay, etc.
      
      Alert.alert(
        'Payment Successful!',
        'Your order has been placed successfully. You will receive a confirmation email shortly.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to order confirmation or tracking
              navigation.navigate('OrderTracking');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Payment Failed', 'There was an error processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderAddressCard = (address: Address) => (
    <Card
      key={address.id}
      style={[
        styles.addressCard,
        selectedAddress?.id === address.id && { borderColor: theme.colors.primary }
      ]}
    >
      <Card.Content>
        <View style={styles.addressHeader}>
          <Chip mode="flat" style={styles.addressTypeChip}>
            {address.type === 'home' ? '🏠 Home' : address.type === 'work' ? '🏢 Work' : '📍 Other'}
          </Chip>
          {address.isDefault && (
            <Chip mode="flat" style={styles.defaultChip}>
              Default
            </Chip>
          )}
        </View>
        
        <Text variant="titleSmall" style={styles.addressName}>
          {address.firstName} {address.lastName}
        </Text>
        <Text variant="bodyMedium" style={styles.addressText}>
          {address.street}
        </Text>
        <Text variant="bodyMedium" style={styles.addressText}>
          {address.city}, {address.state} {address.zipCode}
        </Text>
        <Text variant="bodyMedium" style={styles.addressText}>
          {address.country}
        </Text>
        <Text variant="bodyMedium" style={styles.addressPhone}>
          📞 {address.phone}
        </Text>
      </Card.Content>
    </Card>
  );

  const renderPaymentMethod = (method: { method: PaymentMethod; label: string; icon: string }) => (
    <List.Item
      key={method.method}
      title={method.label}
      left={(props) => <Ionicons {...props} name={method.icon as any} size={24} color={theme.colors.primary} />}
      right={() => (
        <RadioButton
          value={method.method}
          status={selectedPaymentMethod === method.method ? 'checked' : 'unchecked'}
          onPress={() => setSelectedPaymentMethod(method.method)}
        />
      )}
      onPress={() => setSelectedPaymentMethod(method.method)}
      style={styles.paymentMethodItem}
    />
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Order Summary */}
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Order Summary
          </Text>
          
          {cartItems.map((item) => (
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
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          
          <Divider style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Subtotal</Text>
            <Text variant="bodyMedium">${calculateSubtotal().toFixed(2)}</Text>
          </View>
          
          {calculateDiscount() > 0 && (
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Discount</Text>
              <Text variant="bodyMedium" style={styles.discountText}>
                -${calculateDiscount().toFixed(2)}
              </Text>
            </View>
          )}
          
          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Shipping</Text>
            <Text variant="bodyMedium">${calculateShipping().toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Tax</Text>
            <Text variant="bodyMedium">${calculateTax().toFixed(2)}</Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text variant="titleMedium" style={styles.totalLabel}>Total</Text>
            <Text variant="titleMedium" style={styles.totalAmount}>
              ${calculateTotal().toFixed(2)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Shipping Address */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Shipping Address
            </Text>
            <Button
              mode="text"
              onPress={() => setShowNewAddressForm(!showNewAddressForm)}
            >
              {showNewAddressForm ? 'Cancel' : 'Add New'}
            </Button>
          </View>
          
          {addresses.map(renderAddressCard)}
          
          {showNewAddressForm && (
            <View style={styles.newAddressForm}>
              <TextInput
                label="First Name"
                value={newAddress.firstName}
                onChangeText={(text) => setNewAddress({ ...newAddress, firstName: text })}
                style={styles.input}
              />
              <TextInput
                label="Last Name"
                value={newAddress.lastName}
                onChangeText={(text) => setNewAddress({ ...newAddress, lastName: text })}
                style={styles.input}
              />
              <TextInput
                label="Phone"
                value={newAddress.phone}
                onChangeText={(text) => setNewAddress({ ...newAddress, phone: text })}
                style={styles.input}
                keyboardType="phone-pad"
              />
              <TextInput
                label="Street Address"
                value={newAddress.street}
                onChangeText={(text) => setNewAddress({ ...newAddress, street: text })}
                style={styles.input}
              />
              <View style={styles.row}>
                <TextInput
                  label="City"
                  value={newAddress.city}
                  onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
                  style={[styles.input, styles.halfInput]}
                />
                <TextInput
                  label="State"
                  value={newAddress.state}
                  onChangeText={(text) => setNewAddress({ ...newAddress, state: text })}
                  style={[styles.input, styles.halfInput]}
                />
              </View>
              <View style={styles.row}>
                <TextInput
                  label="ZIP Code"
                  value={newAddress.zipCode}
                  onChangeText={(text) => setNewAddress({ ...newAddress, zipCode: text })}
                  style={[styles.input, styles.halfInput]}
                />
                <TextInput
                  label="Country"
                  value={newAddress.country}
                  onChangeText={(text) => setNewAddress({ ...newAddress, country: text })}
                  style={[styles.input, styles.halfInput]}
                />
              </View>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Payment Method */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Payment Method
          </Text>
          
          {paymentMethods.map(renderPaymentMethod)}
        </Card.Content>
      </Card>

      {/* Payment Button */}
      <View style={styles.paymentContainer}>
        <Button
          mode="contained"
          onPress={handlePayment}
          loading={isProcessing}
          disabled={isProcessing}
          style={styles.paymentButton}
          contentStyle={styles.paymentButtonContent}
        >
          {isProcessing ? 'Processing Payment...' : `Pay $${calculateTotal().toFixed(2)}`}
        </Button>
        
        <Text variant="bodySmall" style={styles.securityText}>
          🔒 Your payment information is secure and encrypted
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  summaryCard: {
    margin: 16,
    elevation: 2,
  },
  sectionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  discountText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  divider: {
    marginVertical: 12,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  addressCard: {
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  addressHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  addressTypeChip: {
    alignSelf: 'flex-start',
  },
  defaultChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#4CAF50',
  },
  addressName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  addressText: {
    marginBottom: 2,
  },
  addressPhone: {
    marginTop: 4,
  },
  newAddressForm: {
    marginTop: 16,
  },
  input: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  paymentMethodItem: {
    paddingVertical: 8,
  },
  paymentContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  paymentButton: {
    borderRadius: 8,
    marginBottom: 12,
  },
  paymentButtonContent: {
    paddingVertical: 8,
  },
  securityText: {
    textAlign: 'center',
    color: '#666666',
  },
});

export default CheckoutScreen;