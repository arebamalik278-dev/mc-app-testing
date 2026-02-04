import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { apiPost } from '../../services/api';
import { authStorage } from '../../services/authStorage';

interface LoginResponse {
  token: string;
  user: Record<string, unknown>;
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await apiPost<LoginResponse>('/auth/login', { email, password });
      await authStorage.setAuthToken(response.token);
      await authStorage.setUserData(JSON.stringify(response.user));
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6">
          <Text className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</Text>
          
          <Text className="text-sm font-medium text-gray-600 mb-2">Email</Text>
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Text className="text-sm font-medium text-gray-600 mb-2">Password</Text>
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 bg-gray-50"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity 
            className="w-full p-4 bg-blue-600 rounded-lg mb-4"
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold">
              {loading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
          
          <View className="flex-row justify-center mb-6">
            <Link href={{ pathname: "/auth/forgot-password" } as any} asChild>
              <Text className="text-blue-600">Forgot Password?</Text>
            </Link>
          </View>
          
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Don't have an account? </Text>
            <Link href={{ pathname: "/auth/signup" } as any} asChild>
              <Text className="text-blue-600 font-semibold">Sign Up</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
