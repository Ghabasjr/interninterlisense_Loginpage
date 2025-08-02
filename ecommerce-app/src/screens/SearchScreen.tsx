import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Text,
  Searchbar,
  Card,
  Chip,
  useTheme,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search products..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor={theme.colors.primary}
      />
      
      <View style={styles.content}>
        <Text variant="titleLarge" style={styles.title}>
          Search Results
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Search functionality coming soon...
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
  searchBar: {
    margin: 16,
    elevation: 2,
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

export default SearchScreen;