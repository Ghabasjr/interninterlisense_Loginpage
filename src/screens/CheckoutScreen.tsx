import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '../store';
import { selectCartItems, selectCartTotal, clearCart } from '../store/slices/cartSlice';
import { createOrder } from '../store/slices/orderSlice';
import { Address, PaymentMethod } from '../types';

const CheckoutScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.orders.isLoading);

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(user?.address || null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = 10;
  const tax = cartTotal * 0.08; // 8% tax
  const totalAmount = cartTotal + shippingCost + tax;

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      name: 'Credit/Debit Card',
      brand: 'Visa',
      last4: '1234',
    },
    {
      id: '2',
      type: 'upi',
      name: 'UPI Payment',
    },
    {
      id: '3',
      type: 'netbanking',
      name: 'Net Banking',
    },
    {
      id: '4',
      type: 'wallet',
      name: 'Digital Wallet',
    },
  ];

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      Alert.alert('Error', 'Please select a shipping address.');
      return;
    }

    if (!selectedPaymentMethod) {
      Alert.alert('Error', 'Please select a payment method.');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      const orderData = {
        userId: user?.id || '1',
        items: cartItems,
        totalAmount,
        shippingAddress: selectedAddress,
        billingAddress: selectedAddress,
        paymentMethod: selectedPaymentMethod,
        paymentStatus: 'completed' as const,
        orderStatus: 'confirmed' as const,
      };

      await dispatch(createOrder(orderData));
      
      // Clear cart after successful order
      dispatch(clearCart());

      Alert.alert(
        'Order Placed Successfully!',
        'Your order has been placed and payment processed successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Orders'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderAddressSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Shipping Address</Text>
      {selectedAddress ? (
        <View style={styles.addressCard}>
          <View style={styles.addressContent}>
            <Text style={styles.addressText}>
              {selectedAddress.street}
            </Text>
            <Text style={styles.addressText}>
              {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
            </Text>
            <Text style={styles.addressText}>{selectedAddress.country}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={16} color="#007AFF" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.addAddressButton}>
          <Ionicons name="add" size={20} color="#007AFF" />
          <Text style={styles.addAddressText}>Add Shipping Address</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderPaymentSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.paymentMethodCard,
            selectedPaymentMethod?.id === method.id && styles.selectedPaymentMethod,
          ]}
          onPress={() => handlePaymentMethodSelect(method)}
        >
          <View style={styles.paymentMethodContent}>
            <Ionicons
              name={
                method.type === 'card' ? 'card' :
                method.type === 'upi' ? 'phone-portrait' :
                method.type === 'netbanking' ? 'business' : 'wallet'
              }
              size={24}
              color={selectedPaymentMethod?.id === method.id ? '#007AFF' : '#666'}
            />
            <View style={styles.paymentMethodInfo}>
              <Text style={styles.paymentMethodName}>{method.name}</Text>
              {method.last4 && (
                <Text style={styles.paymentMethodDetails}>
                  {method.brand} ending in {method.last4}
                </Text>
              )}
            </View>
          </View>
          <Ionicons
            name={selectedPaymentMethod?.id === method.id ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={selectedPaymentMethod?.id === method.id ? '#007AFF' : '#CCC'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderOrderSummary = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      <View style={styles.orderItems}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <Text style={styles.orderItemName} numberOfLines={1}>
              {item.product.name} x{item.quantity}
            </Text>
            <Text style={styles.orderItemPrice}>
              ${(item.product.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.orderTotals}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>${cartTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Shipping</Text>
          <Text style={styles.totalValue}>${shippingCost.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tax</Text>
          <Text style={styles.totalValue}>${tax.toFixed(2)}</Text>
        </View>
        <View style={[styles.totalRow, styles.finalTotal]}>
          <Text style={styles.finalTotalLabel}>Total</Text>
          <Text style={styles.finalTotalValue}>${totalAmount.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderAddressSection()}
        {renderPaymentSection()}
        {renderOrderSummary()}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.placeOrderButton, isProcessing && styles.disabledButton]}
          onPress={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
              <Text style={styles.placeOrderButtonAmount}>${totalAmount.toFixed(2)}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  addressCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  addressContent: {
    flex: 1,
  },
  addressText: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  editButton: {
    padding: 8,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  addAddressText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 12,
    fontWeight: '600',
  },
  paymentMethodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedPaymentMethod: {
    backgroundColor: '#E3F2FD',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodInfo: {
    marginLeft: 12,
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  paymentMethodDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  orderItems: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  orderItemName: {
    fontSize: 16,
    color: '#1A1A1A',
    flex: 1,
    marginRight: 16,
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  orderTotals: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalValue: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  finalTotal: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 12,
    marginTop: 8,
  },
  finalTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  finalTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  placeOrderButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  placeOrderButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeOrderButtonAmount: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;