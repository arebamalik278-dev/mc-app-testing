import { View, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { apiGet } from '../../services/api';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function SearchPage() {
  const { query: initialQuery } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialQuery as string || '');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await apiGet<Product[]>('/products/search', { q: query });
      setResults(data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      searchProducts(searchQuery);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-200">
        <TextInput
          className="w-full p-3 bg-gray-100 rounded-lg"
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Searching...</Text>
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Link href={`/core/product-page?id=${item.id}`} asChild>
              <TouchableOpacity className="flex-row p-4 border-b border-gray-100">
                <Image 
                  source={{ uri: item.image }} 
                  className="w-20 h-20 rounded-lg"
                  resizeMode="cover"
                />
                <View className="ml-4 flex-1 justify-center">
                  <Text className="font-semibold text-gray-800">{item.name}</Text>
                  <Text className="text-blue-600 font-bold mt-1">${item.price}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : searchQuery ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No products found</Text>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-gray-500 text-center">Enter a search term to find products</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
