import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  Chip,
  useTheme,
  Divider,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';

import { Product } from '../types';

const { width: screenWidth } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }: any) => {
  const theme = useTheme();
  const { product } = route.params;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const renderImageItem = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <Card.Cover source={{ uri: item }} style={styles.productImage} />
    </View>
  );

  const addToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', product.id, quantity);
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    // TODO: Implement wishlist functionality
    console.log('Toggle wishlist:', product.id);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image Gallery */}
      <View style={styles.imageSection}>
        <Carousel
          data={product.images}
          renderItem={renderImageItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          onSnapToItem={setSelectedImageIndex}
          loop
        />
        
        {/* Image Indicators */}
        <View style={styles.imageIndicators}>
          {product.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                selectedImageIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        {/* Wishlist Button */}
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={toggleWishlist}
        >
          <Ionicons
            name={isInWishlist ? 'heart' : 'heart-outline'}
            size={24}
            color={isInWishlist ? '#FF6B35' : '#FFFFFF'}
          />
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <Card style={styles.infoCard}>
        <Card.Content>
          <View style={styles.productHeader}>
            <Text variant="titleLarge" style={styles.productName}>
              {product.name}
            </Text>
            <Text variant="bodyMedium" style={styles.brandName}>
              by {product.brand}
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <Text variant="headlineSmall" style={styles.price}>
              ${product.price}
            </Text>
            {product.originalPrice && (
              <Text variant="titleMedium" style={styles.originalPrice}>
                ${product.originalPrice}
              </Text>
            )}
            {product.isOnSale && (
              <Chip
                mode="flat"
                textStyle={styles.saleChipText}
                style={[styles.saleChip, { backgroundColor: theme.colors.error }]}
              >
                {product.discountPercentage}% OFF
              </Chip>
            )}
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.ratingStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= product.rating ? 'star' : 'star-outline'}
                  size={16}
                  color="#FFD700"
                />
              ))}
            </View>
            <Text variant="bodyMedium" style={styles.ratingText}>
              {product.rating} ({product.reviewCount} reviews)
            </Text>
          </View>

          <Text variant="bodyMedium" style={styles.description}>
            {product.description}
          </Text>

          {/* Stock Status */}
          <View style={styles.stockContainer}>
            <Ionicons
              name={product.isAvailable ? 'checkmark-circle' : 'close-circle'}
              size={20}
              color={product.isAvailable ? '#4CAF50' : '#F44336'}
            />
            <Text variant="bodyMedium" style={styles.stockText}>
              {product.isAvailable ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Quantity Selector */}
      <Card style={styles.quantityCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.quantityLabel}>
            Quantity
          </Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Ionicons name="remove" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
            <Text variant="titleMedium" style={styles.quantityText}>
              {quantity}
            </Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.min(product.stock, quantity + 1))}
            >
              <Ionicons name="add" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      {/* Specifications */}
      {Object.keys(product.specifications).length > 0 && (
        <Card style={styles.specsCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.specsTitle}>
              Specifications
            </Text>
            {Object.entries(product.specifications).map(([key, value]) => (
              <View key={key} style={styles.specItem}>
                <Text variant="bodyMedium" style={styles.specKey}>
                  {key}:
                </Text>
                <Text variant="bodyMedium" style={styles.specValue}>
                  {value}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Tags */}
      {product.tags.length > 0 && (
        <Card style={styles.tagsCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.tagsTitle}>
              Tags
            </Text>
            <View style={styles.tagsContainer}>
              {product.tags.map((tag) => (
                <Chip key={tag} mode="outlined" style={styles.tag}>
                  {tag}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <Button
          mode="contained"
          onPress={addToCart}
          disabled={!product.isAvailable}
          style={styles.addToCartButton}
          contentStyle={styles.buttonContent}
        >
          Add to Cart
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Cart')}
          style={styles.viewCartButton}
          contentStyle={styles.buttonContent}
        >
          View Cart
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
  imageSection: {
    position: 'relative',
  },
  imageContainer: {
    width: screenWidth,
    height: 300,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
  },
  wishlistButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    margin: 16,
    elevation: 2,
  },
  productHeader: {
    marginBottom: 12,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  brandName: {
    color: '#666666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontWeight: 'bold',
    color: '#FF6B35',
    marginRight: 12,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#666666',
    marginRight: 12,
  },
  saleChip: {
    alignSelf: 'flex-start',
  },
  saleChipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    color: '#666666',
  },
  description: {
    marginBottom: 12,
    lineHeight: 20,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockText: {
    marginLeft: 8,
    color: '#666666',
  },
  quantityCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  quantityLabel: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  specsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  specsTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  specItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  specKey: {
    fontWeight: '500',
    minWidth: 100,
  },
  specValue: {
    flex: 1,
    color: '#666666',
  },
  tagsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  tagsTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    marginBottom: 4,
  },
  actionContainer: {
    padding: 16,
    gap: 12,
  },
  addToCartButton: {
    borderRadius: 8,
  },
  viewCartButton: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default ProductDetailScreen;