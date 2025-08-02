import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  IconButton,
  Divider,
  Chip,
  useTheme,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { CartItem, Product } from '../types';

// Mock cart data - replace with actual state management
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

const CartScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
          },
        },
      ]
    );
  };

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

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const renderCartItem = (item: CartItem) => (
    <Card key={item.id} style={styles.cartItemCard}>
      <Card.Content style={styles.cartItemContent}>
        <View style={styles.cartItemImageContainer}>
          <Card.Cover
            source={{ uri: item.product.images[0] }}
            style={styles.cartItemImage}
          />
        </View>
        
        <View style={styles.cartItemDetails}>
          <Text variant="titleSmall" numberOfLines={2} style={styles.productName}>
            {item.product.name}
          </Text>
          <Text variant="bodySmall" style={styles.brandName}>
            {item.product.brand}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text variant="titleMedium" style={styles.price}>
              ${item.product.price}
            </Text>
            {item.product.originalPrice && (
              <Text variant="bodySmall" style={styles.originalPrice}>
                ${item.product.originalPrice}
              </Text>
            )}
          </View>

          <View style={styles.quantityContainer}>
            <IconButton
              icon="minus"
              size={20}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
              style={styles.quantityButton}
            />
            <Text variant="titleMedium" style={styles.quantityText}>
              {item.quantity}
            </Text>
            <IconButton
              icon="plus"
              size={20}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              style={styles.quantityButton}
            />
          </View>
        </View>

        <View style={styles.cartItemActions}>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => removeFromCart(item.id)}
            style={styles.deleteButton}
          />
          <Text variant="titleMedium" style={styles.itemTotal}>
            ${(item.product.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color="#CCCCCC" />
        <Text variant="headlineSmall" style={styles.emptyTitle}>
          Your cart is empty
        </Text>
        <Text variant="bodyMedium" style={styles.emptySubtitle}>
          Add some products to get started
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Products')}
          style={styles.shopNowButton}
        >
          Start Shopping
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cartItemsContainer} showsVerticalScrollIndicator={false}>
        {cartItems.map(renderCartItem)}
      </ScrollView>

      {/* Order Summary */}
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.summaryTitle}>
            Order Summary
          </Text>
          
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
          
          <Divider style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text variant="titleMedium" style={styles.totalLabel}>Total</Text>
            <Text variant="titleMedium" style={styles.totalAmount}>
              ${calculateTotal().toFixed(2)}
            </Text>
          </View>

          {calculateDiscount() > 0 && (
            <Chip
              mode="flat"
              textStyle={styles.savingsChipText}
              style={[styles.savingsChip, { backgroundColor: theme.colors.secondary }]}
            >
              You save ${calculateDiscount().toFixed(2)}
            </Chip>
          )}
        </Card.Content>
      </Card>

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Checkout')}
          style={styles.checkoutButton}
          contentStyle={styles.checkoutButtonContent}
        >
          Proceed to Checkout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  cartItemsContainer: {
    flex: 1,
    padding: 16,
  },
  cartItemCard: {
    marginBottom: 12,
    elevation: 2,
  },
  cartItemContent: {
    flexDirection: 'row',
    padding: 12,
  },
  cartItemImageContainer: {
    marginRight: 12,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontWeight: '500',
    marginBottom: 4,
  },
  brandName: {
    color: '#666666',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontWeight: 'bold',
    color: '#FF6B35',
    marginRight: 8,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#666666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    margin: 0,
  },
  quantityText: {
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },
  cartItemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  deleteButton: {
    margin: 0,
  },
  itemTotal: {
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  summaryCard: {
    margin: 16,
    elevation: 2,
  },
  summaryTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
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
  savingsChip: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  savingsChipText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  checkoutContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  checkoutButton: {
    borderRadius: 8,
  },
  checkoutButtonContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
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

export default CartScreen;