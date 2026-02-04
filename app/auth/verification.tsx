import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { apiPost } from '../../services/api';

export default function Verification() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!code) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    setLoading(true);
    try {
      await apiPost('/auth/verify', { code });
      router.replace('/auth/login');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await apiPost('/auth/resend-code');
      Alert.alert('Success', 'Verification code sent again');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to resend code');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6">
          <Text className="text-3xl font-bold text-center mb-4 text-gray-800">Verify Email</Text>
          <Text className="text-center text-gray-600 mb-8">
            Enter the verification code sent to your email
          </Text>
          
          <Text className="text-sm font-medium text-gray-600 mb-2">Verification Code</Text>
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 bg-gray-50 text-center text-xl tracking-widest"
            placeholder="000000"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
          />
          
          <TouchableOpacity 
            className="w-full p-4 bg-blue-600 rounded-lg mb-4"
            onPress={handleVerify}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold">
              {loading ? 'Verifying...' : 'Verify'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleResend}>
            <Text className="text-center text-blue-600">
              Didn't receive code? Resend
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
