import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Text,
  useTheme,
} from 'react-native-paper';

const WishlistScreen = ({ navigation }: any) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="titleLarge" style={styles.title}>
          My Wishlist
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Your saved products will appear here...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666666',
    textAlign: 'center',
  },
});

export default WishlistScreen;