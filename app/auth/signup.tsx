import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { apiPost } from '../../services/api';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await apiPost('/auth/signup', { name, email, password });
      router.replace('/auth/verification');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Signup failed');
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
          <Text className="text-3xl font-bold text-center mb-8 text-gray-800">Create Account</Text>
          
          <Text className="text-sm font-medium text-gray-600 mb-2">Full Name</Text>
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          
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
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <Text className="text-sm font-medium text-gray-600 mb-2">Confirm Password</Text>
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 bg-gray-50"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          
          <TouchableOpacity 
            className="w-full p-4 bg-blue-600 rounded-lg mb-4"
            onPress={handleSignup}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold">
              {loading ? 'Creating account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
          
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <Link href="/auth/login" asChild>
              <Text className="text-blue-600 font-semibold">Sign In</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
