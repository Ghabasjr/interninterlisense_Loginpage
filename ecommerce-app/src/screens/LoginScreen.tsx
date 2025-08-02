import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  useTheme,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      // TODO: Show validation error
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual login logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful login
      console.log('Login successful');
      // TODO: Navigate to main app
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#FF6B35', '#FF8A65']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Logo/Header */}
          <View style={styles.header}>
            <Ionicons name="cart" size={80} color="#FFFFFF" />
            <Text style={styles.appName}>E-Commerce</Text>
            <Text style={styles.tagline}>Shop Smart, Live Better</Text>
          </View>

          {/* Login Form */}
          <Card style={styles.formCard}>
            <Card.Content>
              <Text variant="headlineSmall" style={styles.formTitle}>
                Welcome Back
              </Text>
              <Text variant="bodyMedium" style={styles.formSubtitle}>
                Sign in to your account
              </Text>

              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
              />

              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />

              <TouchableOpacity
                onPress={() => {
                  // TODO: Navigate to forgot password screen
                  console.log('Forgot password');
                }}
                style={styles.forgotPassword}
              >
                <Text variant="bodySmall" style={styles.forgotPasswordText}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <Button
                mode="contained"
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                style={styles.loginButton}
                contentStyle={styles.buttonContent}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text variant="bodySmall" style={styles.dividerText}>
                  OR
                </Text>
                <View style={styles.dividerLine} />
              </View>

              <Button
                mode="outlined"
                onPress={() => {
                  // TODO: Implement Google login
                  console.log('Google login');
                }}
                style={styles.socialButton}
                contentStyle={styles.buttonContent}
                icon="google"
              >
                Continue with Google
              </Button>

              <Button
                mode="outlined"
                onPress={() => {
                  // TODO: Implement Apple login
                  console.log('Apple login');
                }}
                style={styles.socialButton}
                contentStyle={styles.buttonContent}
                icon="apple"
              >
                Continue with Apple
              </Button>
            </Card.Content>
          </Card>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text variant="bodyMedium" style={styles.signupText}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text variant="bodyMedium" style={styles.signupLink}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 8,
  },
  formCard: {
    elevation: 8,
    borderRadius: 16,
  },
  formTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  formSubtitle: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#FF6B35',
  },
  loginButton: {
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#666666',
  },
  socialButton: {
    marginBottom: 12,
    borderRadius: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    color: '#FFFFFF',
  },
  signupLink: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;