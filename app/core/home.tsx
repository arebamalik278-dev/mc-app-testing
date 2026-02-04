import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Image, TextInput, RefreshControl } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { apiGet } from '../../services/api';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await apiGet<Product[]>('/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderProduct = ({ item }: { item: Product }) => (
    <Link href={`/core/product-page?id=${item.id}`} asChild>
      <TouchableOpacity className="w-48 bg-white rounded-xl shadow-sm mr-4 overflow-hidden">
        <Image 
          source={{ uri: item.image }} 
          className="w-full h-40"
          resizeMode="cover"
        />
        <View className="p-3">
          <Text className="font-semibold text-gray-800" numberOfLines={1}>{item.name}</Text>
          <Text className="text-blue-600 font-bold mt-1">${item.price}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-4 bg-white">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Discover</Text>
        <Link href="/core/search-page" asChild>
          <TouchableOpacity className="bg-gray-100 p-3 rounded-lg flex-row items-center">
            <Text className="text-gray-500">Search products...</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View className="p-4">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Featured Products</Text>
        {loading ? (
          <Text className="text-gray-500">Loading...</Text>
        ) : (
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>

      <View className="p-4">
        <Text className="text-lg font-semibold text-gray-800 mb-3">All Products</Text>
        <FlatList
          data={products}
          numColumns={2}
          renderItem={({ item }) => (
            <Link href={`/core/product-page?id=${item.id}`} asChild>
              <TouchableOpacity className="flex-1 bg-white rounded-xl shadow-sm m-2 overflow-hidden">
                <Image 
                  source={{ uri: item.image }} 
                  className="w-full h-32"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text className="font-semibold text-gray-800" numberOfLines={1}>{item.name}</Text>
                  <Text className="text-blue-600 font-bold mt-1">${item.price}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
}
