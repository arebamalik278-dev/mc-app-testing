import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { apiGet, apiPost } from '../../services/api';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
}

export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  const fetchProduct = async () => {
    try {
      const data = await apiGet<Product>(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!product) return;

    setAddingToCart(true);
    try {
      await apiPost('/cart/add', { productId: product.id, quantity: 1 });
      Alert.alert('Success', 'Added to cart');
    } catch (error) {
      Alert.alert('Error', 'Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const toggleWishlist = async () => {
    if (!product) return;

    try {
      await apiPost('/wishlist/toggle', { productId: product.id });
      Alert.alert('Success', 'Wishlist updated');
    } catch (error) {
      Alert.alert('Error', 'Failed to update wishlist');
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Product not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <Image 
          source={{ uri: product.image }} 
          className="w-full h-80"
          resizeMode="cover"
        />
        
        <View className="p-4">
          <View className="flex-row justify-between items-start">
            <Text className="text-2xl font-bold text-gray-800 flex-1">{product.name}</Text>
            <TouchableOpacity onPress={toggleWishlist} className="ml-4 p-2">
              <Text className="text-2xl">♡</Text>
            </TouchableOpacity>
          </View>
          
          <Text className="text-2xl text-blue-600 font-bold mt-2">${product.price}</Text>
          
          <View className="mt-4">
            <Text className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>
          
          <Text className="text-gray-600 mt-4">{product.description}</Text>
        </View>
      </ScrollView>
      
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity 
          className={`w-full p-4 rounded-lg ${product.inStock ? 'bg-blue-600' : 'bg-gray-400'}`}
          onPress={addToCart}
          disabled={!product.inStock || addingToCart}
        >
          <Text className="text-white text-center font-semibold">
            {addingToCart ? 'Adding...' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
