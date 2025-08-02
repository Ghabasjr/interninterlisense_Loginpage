import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  Text,
  Card,
  Chip,
  Button,
  Searchbar,
  Menu,
  Divider,
  useTheme,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { SuperGridSectionList } from 'react-native-super-grid';

import { Product, SearchFilters } from '../types';

const { width: screenWidth } = Dimensions.get('window');

// Mock data - replace with actual API calls
const mockProducts: Product[] = [
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
  {
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
  {
    id: '4',
    name: 'Running Shoes',
    description: 'Comfortable running shoes with excellent cushioning',
    price: 89.99,
    images: ['https://via.placeholder.com/300x300/96CEB4/FFFFFF?text=Shoes'],
    category: 'Sports',
    brand: 'RunFast',
    rating: 4.6,
    reviewCount: 156,
    stock: 40,
    isAvailable: true,
    isFeatured: false,
    isOnSale: false,
    tags: ['running', 'sports', 'comfortable'],
    specifications: {},
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Sports'];
const brands = ['All', 'TechBrand', 'FitTech', 'BrewMaster', 'RunFast'];
const sortOptions = [
  { label: 'Price: Low to High', value: 'price_low' },
  { label: 'Price: High to Low', value: 'price_high' },
  { label: 'Rating: High to Low', value: 'rating' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Most Popular', value: 'popular' },
];

const ProductsScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    filterAndSortProducts();
  }, [searchQuery, selectedCategory, selectedBrand, sortBy, filters]);

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== 'All') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product =>
        product.price >= filters.priceRange!.min && product.price <= filters.priceRange!.max
      );
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= filters.rating!);
    }

    // Sort products
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    setFilteredProducts(filtered);
  };

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
          <Text variant="bodySmall" style={styles.brandName}>
            {item.brand}
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
            <Ionicons name="star" size={14} color="#FFD700" />
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

  const renderCategoryChip = (category: string) => (
    <Chip
      key={category}
      mode={selectedCategory === category ? 'flat' : 'outlined'}
      onPress={() => setSelectedCategory(category)}
      style={[
        styles.categoryChip,
        selectedCategory === category && { backgroundColor: theme.colors.primary }
      ]}
      textStyle={[
        styles.categoryChipText,
        selectedCategory === category && { color: '#FFFFFF' }
      ]}
    >
      {category}
    </Chip>
  );

  const renderBrandChip = (brand: string) => (
    <Chip
      key={brand}
      mode={selectedBrand === brand ? 'flat' : 'outlined'}
      onPress={() => setSelectedBrand(brand)}
      style={[
        styles.brandChip,
        selectedBrand === brand && { backgroundColor: theme.colors.secondary }
      ]}
      textStyle={[
        styles.brandChipText,
        selectedBrand === brand && { color: '#FFFFFF' }
      ]}
    >
      {brand}
    </Chip>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Searchbar
          placeholder="Search products..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={theme.colors.primary}
        />
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.sortButton}
        >
          <Ionicons name="funnel" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Sort Menu */}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={<View />}
        style={styles.menu}
      >
        {sortOptions.map((option) => (
          <Menu.Item
            key={option.value}
            onPress={() => {
              setSortBy(option.value);
              setMenuVisible(false);
            }}
            title={option.label}
            leadingIcon={sortBy === option.value ? 'check' : undefined}
          />
        ))}
      </Menu>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(renderCategoryChip)}
        </ScrollView>
      </View>

      {/* Brands */}
      <View style={styles.brandsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {brands.map(renderBrandChip)}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text variant="bodyMedium" style={styles.resultsText}>
          {filteredProducts.length} products found
        </Text>
      </View>

      {/* Products Grid */}
      <SuperGridSectionList
        staticDimension={screenWidth}
        fixed
        spacing={8}
        sections={[
          {
            title: 'Products',
            data: filteredProducts,
          },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={renderProductCard}
        renderSectionHeader={() => null}
        style={styles.productsGrid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={64} color="#CCCCCC" />
            <Text variant="titleMedium" style={styles.emptyTitle}>
              No products found
            </Text>
            <Text variant="bodyMedium" style={styles.emptySubtitle}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  searchBar: {
    flex: 1,
    elevation: 2,
  },
  sortButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  menu: {
    marginTop: 50,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryChip: {
    marginRight: 8,
  },
  categoryChipText: {
    fontSize: 12,
  },
  brandsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  brandChip: {
    marginRight: 8,
  },
  brandChipText: {
    fontSize: 12,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    color: '#666666',
  },
  productsGrid: {
    flex: 1,
    paddingHorizontal: 8,
  },
  productCard: {
    flex: 1,
    margin: 4,
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
    marginBottom: 2,
  },
  brandName: {
    color: '#666666',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    marginTop: 16,
    color: '#666666',
  },
  emptySubtitle: {
    marginTop: 8,
    color: '#999999',
    textAlign: 'center',
  },
});

export default ProductsScreen;