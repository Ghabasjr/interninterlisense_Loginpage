import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '../store';
import { trackOrder } from '../store/slices/orderSlice';

const OrderTrackingScreen = ({ route, navigation }: any) => {
  const { order } = route.params;
  const dispatch = useDispatch();
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (order.trackingNumber) {
      fetchTrackingData();
    }
  }, [order.trackingNumber]);

  const fetchTrackingData = async () => {
    setIsLoading(true);
    try {
      const result = await dispatch(trackOrder(order.trackingNumber));
      setTrackingData(result.payload);
    } catch (error) {
      console.error('Failed to fetch tracking data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FF9500';
      case 'confirmed':
        return '#007AFF';
      case 'processing':
        return '#5856D6';
      case 'shipped':
        return '#34C759';
      case 'delivered':
        return '#30D158';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return 'time-outline';
      case 'confirmed':
        return 'checkmark-circle-outline';
      case 'processing':
        return 'settings-outline';
      case 'shipped':
        return 'car-outline';
      case 'delivered':
        return 'checkmark-done-circle-outline';
      case 'cancelled':
        return 'close-circle-outline';
      default:
        return 'help-outline';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderOrderInfo = () => (
    <View style={styles.orderInfoSection}>
      <Text style={styles.sectionTitle}>Order Information</Text>
      <View style={styles.orderInfoCard}>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Order ID:</Text>
          <Text style={styles.orderInfoValue}>#{order.id}</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Order Date:</Text>
          <Text style={styles.orderInfoValue}>{formatDate(order.createdAt)}</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Total Amount:</Text>
          <Text style={styles.orderInfoValue}>${order.totalAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Payment Status:</Text>
          <Text style={[styles.orderInfoValue, { color: getStatusColor(order.paymentStatus) }]}>
            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderTrackingInfo = () => (
    <View style={styles.trackingSection}>
      <Text style={styles.sectionTitle}>Tracking Information</Text>
      {order.trackingNumber ? (
        <View style={styles.trackingCard}>
          <View style={styles.trackingNumberRow}>
            <Text style={styles.trackingLabel}>Tracking Number:</Text>
            <Text style={styles.trackingNumber}>{order.trackingNumber}</Text>
          </View>
          
          {trackingData && (
            <View style={styles.trackingStatus}>
              <View style={styles.currentStatus}>
                <Ionicons
                  name={getStatusIcon(order.orderStatus)}
                  size={24}
                  color={getStatusColor(order.orderStatus)}
                />
                <Text style={[styles.statusText, { color: getStatusColor(order.orderStatus) }]}>
                  {trackingData.status}
                </Text>
              </View>
              <Text style={styles.locationText}>{trackingData.location}</Text>
            </View>
          )}
          
          {order.estimatedDelivery && (
            <View style={styles.estimatedDelivery}>
              <Text style={styles.estimatedLabel}>Estimated Delivery:</Text>
              <Text style={styles.estimatedDate}>
                {formatDate(order.estimatedDelivery)}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.noTrackingCard}>
          <Ionicons name="information-circle-outline" size={24} color="#666" />
          <Text style={styles.noTrackingText}>Tracking information not available yet</Text>
        </View>
      )}
    </View>
  );

  const renderOrderItems = () => (
    <View style={styles.itemsSection}>
      <Text style={styles.sectionTitle}>Order Items</Text>
      <View style={styles.itemsCard}>
        {order.items.map((item: any, index: number) => (
          <View key={index} style={styles.orderItem}>
            <Image source={{ uri: item.product.images[0] }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              <Text style={styles.itemPrice}>${item.product.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderShippingAddress = () => (
    <View style={styles.addressSection}>
      <Text style={styles.sectionTitle}>Shipping Address</Text>
      <View style={styles.addressCard}>
        <Ionicons name="location-outline" size={20} color="#666" />
        <View style={styles.addressInfo}>
          <Text style={styles.addressText}>{order.shippingAddress.street}</Text>
          <Text style={styles.addressText}>
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
          </Text>
          <Text style={styles.addressText}>{order.shippingAddress.country}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderOrderInfo()}
        {renderTrackingInfo()}
        {renderOrderItems()}
        {renderShippingAddress()}
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  orderInfoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  orderInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  orderInfoLabel: {
    fontSize: 14,
    color: '#666',
  },
  orderInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  trackingSection: {
    padding: 20,
    paddingTop: 0,
  },
  trackingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  trackingNumberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trackingLabel: {
    fontSize: 14,
    color: '#666',
  },
  trackingNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  trackingStatus: {
    marginBottom: 16,
  },
  currentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 32,
  },
  estimatedDelivery: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 16,
  },
  estimatedLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  estimatedDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  noTrackingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  noTrackingText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  itemsSection: {
    padding: 20,
    paddingTop: 0,
  },
  itemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  addressSection: {
    padding: 20,
    paddingTop: 0,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  addressInfo: {
    flex: 1,
    marginLeft: 12,
  },
  addressText: {
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 2,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default OrderTrackingScreen;