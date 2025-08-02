import React, { useState } from 'react';
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
  Avatar,
  List,
  Switch,
  Divider,
  useTheme,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { User } from '../types';

// Mock user data - replace with actual state management
const mockUser: User = {
  id: 'user123',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1234567890',
  avatar: 'https://via.placeholder.com/100x100/FF6B35/FFFFFF?text=JD',
  addresses: [
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
  ],
  defaultAddressId: '1',
  preferences: {
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    language: 'en',
    currency: 'USD',
    theme: 'light',
  },
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

const ProfileScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [user] = useState<User>(mockUser);
  const [notifications, setNotifications] = useState(user.preferences.notifications);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement logout logic
            console.log('Logout pressed');
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      title: 'My Orders',
      icon: 'list',
      onPress: () => navigation.navigate('Orders'),
      showBadge: true,
      badgeCount: 3,
    },
    {
      title: 'Wishlist',
      icon: 'heart',
      onPress: () => navigation.navigate('Wishlist'),
      showBadge: false,
    },
    {
      title: 'Addresses',
      icon: 'location',
      onPress: () => {
        // TODO: Navigate to addresses screen
        console.log('Addresses pressed');
      },
      showBadge: false,
    },
    {
      title: 'Payment Methods',
      icon: 'card',
      onPress: () => {
        // TODO: Navigate to payment methods screen
        console.log('Payment methods pressed');
      },
      showBadge: false,
    },
    {
      title: 'Notifications',
      icon: 'notifications',
      onPress: () => {
        // TODO: Navigate to notifications screen
        console.log('Notifications pressed');
      },
      showBadge: false,
    },
    {
      title: 'Settings',
      icon: 'settings',
      onPress: () => {
        // TODO: Navigate to settings screen
        console.log('Settings pressed');
      },
      showBadge: false,
    },
    {
      title: 'Help & Support',
      icon: 'help-circle',
      onPress: () => {
        // TODO: Navigate to help screen
        console.log('Help pressed');
      },
      showBadge: false,
    },
    {
      title: 'About',
      icon: 'information-circle',
      onPress: () => {
        // TODO: Navigate to about screen
        console.log('About pressed');
      },
      showBadge: false,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <View style={styles.profileInfo}>
            <Avatar.Image
              size={80}
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text variant="titleLarge" style={styles.userName}>
                {user.firstName} {user.lastName}
              </Text>
              <Text variant="bodyMedium" style={styles.userEmail}>
                {user.email}
              </Text>
              <Text variant="bodySmall" style={styles.userPhone}>
                {user.phone}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              // TODO: Navigate to edit profile screen
              console.log('Edit profile pressed');
            }}
          >
            <Ionicons name="pencil" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </Card.Content>
      </Card>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => navigation.navigate('Orders')}
        >
          <Text variant="titleLarge" style={styles.statNumber}>
            12
          </Text>
          <Text variant="bodySmall" style={styles.statLabel}>
            Orders
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => navigation.navigate('Wishlist')}
        >
          <Text variant="titleLarge" style={styles.statNumber}>
            8
          </Text>
          <Text variant="bodySmall" style={styles.statLabel}>
            Wishlist
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => {
            // TODO: Navigate to reviews screen
            console.log('Reviews pressed');
          }}
        >
          <Text variant="titleLarge" style={styles.statNumber}>
            5
          </Text>
          <Text variant="bodySmall" style={styles.statLabel}>
            Reviews
          </Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <Card style={styles.menuCard}>
        <Card.Content>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.title}>
              <List.Item
                title={item.title}
                left={(props) => (
                  <Ionicons
                    {...props}
                    name={item.icon as any}
                    size={24}
                    color={theme.colors.primary}
                  />
                )}
                right={(props) => (
                  <View style={styles.menuItemRight}>
                    {item.showBadge && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badgeCount}</Text>
                      </View>
                    )}
                    <Ionicons
                      {...props}
                      name="chevron-forward"
                      size={20}
                      color="#666666"
                    />
                  </View>
                )}
                onPress={item.onPress}
                style={styles.menuItem}
              />
              {index < menuItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Card.Content>
      </Card>

      {/* Notification Settings */}
      <Card style={styles.settingsCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.settingsTitle}>
            Notification Settings
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="mail" size={20} color={theme.colors.primary} />
              <Text variant="bodyMedium" style={styles.settingLabel}>
                Email Notifications
              </Text>
            </View>
            <Switch
              value={notifications.email}
              onValueChange={(value) =>
                setNotifications({ ...notifications, email: value })
              }
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={20} color={theme.colors.primary} />
              <Text variant="bodyMedium" style={styles.settingLabel}>
                Push Notifications
              </Text>
            </View>
            <Switch
              value={notifications.push}
              onValueChange={(value) =>
                setNotifications({ ...notifications, push: value })
              }
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="chatbubble" size={20} color={theme.colors.primary} />
              <Text variant="bodyMedium" style={styles.settingLabel}>
                SMS Notifications
              </Text>
            </View>
            <Switch
              value={notifications.sms}
              onValueChange={(value) =>
                setNotifications({ ...notifications, sms: value })
              }
            />
          </View>
        </Card.Content>
      </Card>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          textColor={theme.colors.error}
        >
          Logout
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
  profileCard: {
    margin: 16,
    elevation: 2,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: '#666666',
    marginBottom: 2,
  },
  userPhone: {
    color: '#999999',
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    color: '#666666',
  },
  menuCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  settingsTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    marginLeft: 12,
  },
  logoutContainer: {
    padding: 16,
  },
  logoutButton: {
    borderRadius: 8,
    borderColor: '#FF5252',
  },
});

export default ProfileScreen;