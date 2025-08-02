import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  Searchbar,
  Chip,
  useTheme,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-snap-carousel';

import { Product, Category } from '../types';

const { width: screenWidth } = Dimensions.get('window');

// Mock data - replace with actual API calls
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    image: 'https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=E',
    productCount: 150,
  },
  {
    id: '2',
    name: 'Fashion',
    image: 'https://via.placeholder.com/80x80/4ECDC4/FFFFFF?text=F',
    productCount: 200,
  },
  {
    id: '3',
    name: 'Home & Garden',
    image: 'https://via.placeholder.com/80x80/45B7D1/FFFFFF?text=H',
    productCount: 120,
  },
  {
    id: '4',
    name: 'Sports',
    image: 'https://via.placeholder.com/80x80/96CEB4/FFFFFF?text=S',
    productCount: 80,
  },
];

const mockFeaturedProducts: Product[] = [
  {
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
  {
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
];

const HomeScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const renderBannerItem = ({ item }: { item: any }) => (
    <View style={styles.bannerContainer}>
      <LinearGradient
        colors={['#FF6B35', '#FF8A65']}
        style={styles.bannerGradient}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Summer Sale</Text>
          <Text style={styles.bannerSubtitle}>Up to 50% off on selected items</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Products')}
            style={styles.bannerButton}
            labelStyle={styles.bannerButtonText}
          >
            Shop Now
          </Button>
        </View>
      </LinearGradient>
    </View>
  );

  const renderProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      style={styles.productCard}
    >
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.images[0] }} style={styles.productImage} />
        <Card.Content style={styles.cardContent}>
          <Text variant="titleSmall" numberOfLines={2} style={styles.productName}>
            {item.name}
          </Text>
          <View style={styles.priceContainer}>
            <Text variant="titleMedium" style={styles.price}>
              ${item.price}
            </Text>
            {item.originalPrice && (
              <Text variant="bodySmall" style={styles.originalPrice}>
                ${item.originalPrice}
              </Text>
            )}
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text variant="bodySmall" style={styles.rating}>
              {item.rating} ({item.reviewCount})
            </Text>
          </View>
          {item.isOnSale && (
            <Chip
              mode="flat"
              textStyle={styles.saleChipText}
              style={[styles.saleChip, { backgroundColor: theme.colors.error }]}
            >
              {item.discountPercentage}% OFF
            </Chip>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text variant="headlineSmall" style={styles.greeting}>
            Welcome back!
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Discover amazing products today
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <Searchbar
        placeholder="Search products..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor={theme.colors.primary}
      />

      {/* Banner Carousel */}
      <View style={styles.bannerSection}>
        <Carousel
          data={[{ id: 1 }, { id: 2 }]}
          renderItem={renderBannerItem}
          sliderWidth={screenWidth - 32}
          itemWidth={screenWidth - 32}
          loop
          autoplay
          autoplayInterval={5000}
        />
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Categories
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text variant="bodyMedium" style={styles.seeAllText}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mockCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => navigation.navigate('Category', { category })}
            >
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text variant="bodyMedium" style={styles.categoryName}>
                {category.name}
              </Text>
              <Text variant="bodySmall" style={styles.categoryCount}>
                {category.productCount} items
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Featured Products
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text variant="bodyMedium" style={styles.seeAllText}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mockFeaturedProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              {renderProductCard({ item: product })}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => navigation.navigate('Orders')}
        >
          <Ionicons name="list" size={24} color={theme.colors.primary} />
          <Text variant="bodySmall" style={styles.quickActionText}>
            My Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => navigation.navigate('Wishlist')}
        >
          <Ionicons name="heart" size={24} color={theme.colors.primary} />
          <Text variant="bodySmall" style={styles.quickActionText}>
            Wishlist
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => navigation.navigate('OrderTracking')}
        >
          <Ionicons name="location" size={24} color={theme.colors.primary} />
          <Text variant="bodySmall" style={styles.quickActionText}>
            Track Order
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subtitle: {
    color: '#666666',
    marginTop: 2,
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  bannerSection: {
    marginBottom: 24,
  },
  bannerContainer: {
    height: 180,
    marginHorizontal: 16,
  },
  bannerGradient: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
  },
  bannerContent: {
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
  },
  bannerButtonText: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  seeAllText: {
    color: '#FF6B35',
    fontWeight: '500',
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryName: {
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryCount: {
    color: '#666666',
    fontSize: 10,
  },
  productCard: {
    width: 160,
    marginHorizontal: 8,
  },
  card: {
    elevation: 2,
  },
  productImage: {
    height: 120,
  },
  cardContent: {
    padding: 8,
  },
  productName: {
    fontWeight: '500',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    color: '#666666',
  },
  saleChip: {
    alignSelf: 'flex-start',
  },
  saleChipText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionText: {
    marginTop: 4,
    color: '#666666',
  },
});

export default HomeScreen;