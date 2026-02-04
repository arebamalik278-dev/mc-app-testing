import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { apiPut } from '../../services/api';
import { authStorage } from '../../services/authStorage';

interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export default function CompleteProfile() {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchUser = async () => {
    try {
      const userData = await authStorage.getUserData();
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!user.name || !user.email) {
      Alert.alert('Error', 'Name and email are required');
      return;
    }

    setSaving(true);
    try {
      await apiPut('/user/profile', user);
      await authStorage.setUserData(JSON.stringify(user));
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</Text>
          
          <Text className="text-sm font-medium text-gray-600 mb-2">Full Name</Text>
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
          />
          
          <Text className="text-sm font-medium text-gray-600 mb-2">Email</Text>
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Text className="text-sm font-medium text-gray-600 mb-2">Phone</Text>
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
            value={user.phone || ''}
            onChangeText={(text) => setUser({ ...user, phone: text })}
            keyboardType="phone-pad"
          />
          
          <Text className="text-sm font-medium text-gray-600 mb-2">Address</Text>
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 bg-gray-50 h-24"
            value={user.address || ''}
            onChangeText={(text) => setUser({ ...user, address: text })}
            multiline
            textAlignVertical="top"
          />
          
          <TouchableOpacity 
            className="w-full p-4 bg-blue-600 rounded-lg"
            onPress={handleSave}
            disabled={saving}
          >
            <Text className="text-white text-center font-semibold">
              {saving ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
