import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Image, RefreshControl, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { apiGet, apiDelete } from '../../services/api';

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWishlist = async () => {
    try {
      const data = await apiGet<WishlistItem[]>('/wishlist');
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchWishlist();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (itemId: string) => {
    try {
      await apiDelete(`/wishlist/${itemId}`);
      setWishlist(wishlist.filter(item => item.id !== itemId));
    } catch (error) {
      Alert.alert('Error', 'Failed to remove from wishlist');
    }
  };

  const renderWishlistItem = ({ item }: { item: WishlistItem }) => (
    <View className="bg-white rounded-lg shadow-sm m-4 overflow-hidden">
      <Link href={`/core/product-page?id=${item.product.id}`} asChild>
        <TouchableOpacity className="flex-row">
          <Image 
            source={{ uri: item.product.image }} 
            className="w-24 h-24"
            resizeMode="cover"
          />
          <View className="flex-1 p-3 justify-center">
            <Text className="font-semibold text-gray-800" numberOfLines={2}>
              {item.product.name}
            </Text>
            <Text className="text-blue-600 font-bold mt-1">${item.product.price}</Text>
          </View>
        </TouchableOpacity>
      </Link>
      <View className="flex-row border-t border-gray-100">
        <TouchableOpacity 
          className="flex-1 p-3 items-center"
          onPress={() => removeFromWishlist(item.id)}
        >
          <Text className="text-red-600">Remove</Text>
        </TouchableOpacity>
        <Link href={`/core/product-page?id=${item.product.id}`} asChild>
          <TouchableOpacity className="flex-1 p-3 items-center border-l border-gray-100">
            <Text className="text-blue-600">View</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Text className="text-xl font-bold text-gray-800 p-4">Wishlist</Text>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Loading...</Text>
        </View>
      ) : wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-gray-500 text-center mb-4">Your wishlist is empty</Text>
          <Link href="/(tabs)" asChild>
            <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg">
              <Text className="text-white font-semibold">Browse Products</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </SafeAreaView>
  );
}
