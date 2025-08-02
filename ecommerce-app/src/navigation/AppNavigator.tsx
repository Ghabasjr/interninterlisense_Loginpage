import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen';
import WishlistScreen from '../screens/WishlistScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SearchScreen from '../screens/SearchScreen';
import CategoryScreen from '../screens/CategoryScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Products') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  // TODO: Add authentication state management
  const isAuthenticated = false; // This should come from your auth context

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF6B35',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {!isAuthenticated ? (
        // Auth Stack
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ headerShown: false }}
          />
        </>
      ) : (
        // Main App Stack
        <>
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen}
            options={{ title: 'Product Details' }}
          />
          <Stack.Screen 
            name="Checkout" 
            component={CheckoutScreen}
            options={{ title: 'Checkout' }}
          />
          <Stack.Screen 
            name="OrderTracking" 
            component={OrderTrackingScreen}
            options={{ title: 'Track Order' }}
          />
          <Stack.Screen 
            name="Search" 
            component={SearchScreen}
            options={{ title: 'Search Products' }}
          />
          <Stack.Screen 
            name="Category" 
            component={CategoryScreen}
            options={{ title: 'Category' }}
          />
          <Stack.Screen 
            name="Wishlist" 
            component={WishlistScreen}
            options={{ title: 'My Wishlist' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;