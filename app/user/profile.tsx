import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { authStorage } from '../../services/authStorage';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleLogout = async () => {
    try {
      await authStorage.clearAll();
      router.replace('/auth/login');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
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
      <ScrollView>
        <View className="p-6 items-center border-b border-gray-200">
          <View className="w-24 h-24 rounded-full bg-blue-100 justify-center items-center mb-4">
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} className="w-24 h-24 rounded-full" />
            ) : (
              <Text className="text-3xl font-bold text-blue-600">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            )}
          </View>
          <Text className="text-xl font-bold text-gray-800">{user?.name || 'User'}</Text>
          <Text className="text-gray-500">{user?.email || ''}</Text>
        </View>

        <View className="p-4">
          <Link href="/user/complete-profile" asChild>
            <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-lg mb-3">
              <Text className="text-lg mr-3">✏️</Text>
              <Text className="flex-1 text-gray-800">Edit Profile</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/user/order-history-page" asChild>
            <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-lg mb-3">
              <Text className="text-lg mr-3">📦</Text>
              <Text className="flex-1 text-gray-800">Order History</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/user/wishlist-page" asChild>
            <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-lg mb-3">
              <Text className="text-lg mr-3">♡</Text>
              <Text className="flex-1 text-gray-800">Wishlist</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/info/contact" asChild>
            <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-lg mb-3">
              <Text className="text-lg mr-3">📞</Text>
              <Text className="flex-1 text-gray-800">Contact Us</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/info/faq" asChild>
            <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-lg mb-3">
              <Text className="text-lg mr-3">❓</Text>
              <Text className="flex-1 text-gray-800">FAQ</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/info/privacy-policy" asChild>
            <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-lg mb-3">
              <Text className="text-lg mr-3">🔒</Text>
              <Text className="flex-1 text-gray-800">Privacy Policy</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/info/terms-conditions" asChild>
            <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-lg mb-3">
              <Text className="text-lg mr-3">📄</Text>
              <Text className="flex-1 text-gray-800">Terms & Conditions</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity 
            className="flex-row items-center p-4 bg-red-50 rounded-lg mt-6"
            onPress={handleLogout}
          >
            <Text className="text-lg mr-3">🚪</Text>
            <Text className="flex-1 text-red-600">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
