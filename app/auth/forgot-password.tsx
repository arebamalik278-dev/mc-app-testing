import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { apiPost } from '../../services/api';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setLoading(true);
    try {
      await apiPost('/auth/forgot-password', { email });
      Alert.alert('Success', 'Verification code sent to your email');
      router.replace('/auth/reset-password');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to send code');
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
          <Text className="text-3xl font-bold text-center mb-4 text-gray-800">Forgot Password</Text>
          <Text className="text-center text-gray-600 mb-8">
            Enter your email to receive a verification code
          </Text>
          
          <Text className="text-sm font-medium text-gray-600 mb-2">Email</Text>
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 bg-gray-50"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TouchableOpacity 
            className="w-full p-4 bg-blue-600 rounded-lg mb-6"
            onPress={handleSendCode}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold">
              {loading ? 'Sending...' : 'Send Verification Code'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-center text-blue-600">
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
