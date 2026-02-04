import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { apiPost } from '../../services/api';

export default function ResetPassword() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!code || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await apiPost('/auth/reset-password', { code, newPassword });
      Alert.alert('Success', 'Password reset successfully');
      router.replace('/auth/login' as any);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to reset password');
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
          <Text className="text-3xl font-bold text-center mb-4 text-gray-800">Reset Password</Text>
          <Text className="text-center text-gray-600 mb-8">
            Enter the code and your new password
          </Text>
          
          <Text className="text-sm font-medium text-gray-600 mb-2">Verification Code</Text>
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
            placeholder="Enter verification code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
          />
          
          <Text className="text-sm font-medium text-gray-600 mb-2">New Password</Text>
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          
          <Text className="text-sm font-medium text-gray-600 mb-2">Confirm Password</Text>
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 bg-gray-50"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          
          <TouchableOpacity 
            className="w-full p-4 bg-blue-600 rounded-lg mb-4"
            onPress={handleReset}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold">
              {loading ? 'Resetting...' : 'Reset Password'}
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
