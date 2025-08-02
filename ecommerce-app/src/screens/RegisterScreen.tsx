import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

const RegisterScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      // TODO: Show validation error
      return;
    }

    if (password !== confirmPassword) {
      // TODO: Show password mismatch error
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual registration logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful registration
      console.log('Registration successful');
      // TODO: Navigate to main app or verification screen
    } catch (error) {
      console.error('Registration failed:', error);
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Create Account</Text>
            </View>

            {/* Registration Form */}
            <Card style={styles.formCard}>
              <Card.Content>
                <Text variant="headlineSmall" style={styles.formTitle}>
                  Join Us Today
                </Text>
                <Text variant="bodyMedium" style={styles.formSubtitle}>
                  Create your account to start shopping
                </Text>

                <View style={styles.nameRow}>
                  <TextInput
                    label="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                    mode="outlined"
                    style={styles.halfInput}
                    left={<TextInput.Icon icon="person" />}
                  />
                  <TextInput
                    label="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                    mode="outlined"
                    style={styles.halfInput}
                  />
                </View>

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
                  label="Phone Number"
                  value={phone}
                  onChangeText={setPhone}
                  mode="outlined"
                  keyboardType="phone-pad"
                  style={styles.input}
                  left={<TextInput.Icon icon="call" />}
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

                <TextInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  mode="outlined"
                  secureTextEntry={!showConfirmPassword}
                  style={styles.input}
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    <TextInput.Icon
                      icon={showConfirmPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  }
                />

                <Button
                  mode="contained"
                  onPress={handleRegister}
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.registerButton}
                  contentStyle={styles.buttonContent}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
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
                    // TODO: Implement Google registration
                    console.log('Google registration');
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
                    // TODO: Implement Apple registration
                    console.log('Apple registration');
                  }}
                  style={styles.socialButton}
                  contentStyle={styles.buttonContent}
                  icon="apple"
                >
                  Continue with Apple
                </Button>
              </Card.Content>
            </Card>

            {/* Sign In Link */}
            <View style={styles.signinContainer}>
              <Text variant="bodyMedium" style={styles.signinText}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text variant="bodyMedium" style={styles.signinLink}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 16,
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
  nameRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
  registerButton: {
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
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signinText: {
    color: '#FFFFFF',
  },
  signinLink: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;