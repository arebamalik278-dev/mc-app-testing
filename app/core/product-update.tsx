import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { apiGet, apiPut } from '../../services/api';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
}

export default function ProductUpdate() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProduct = async () => {
    try {
      const data = await apiGet<Product>(`/products/${id}`);
      setProduct(data);
      setName(data.name);
      setPrice(data.price.toString());
      setDescription(data.description);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    if (!name || !price || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setSaving(true);
    try {
      await apiPut(`/products/${id}`, {
        name,
        price: parseFloat(price),
        description,
      });
      Alert.alert('Success', 'Product updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update product');
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
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Update Product</Text>
        
        <Text className="text-sm font-medium text-gray-600 mb-2">Product Name</Text>
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
          value={name}
          onChangeText={setName}
        />
        
        <Text className="text-sm font-medium text-gray-600 mb-2">Price</Text>
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        
        <Text className="text-sm font-medium text-gray-600 mb-2">Description</Text>
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50 h-32"
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
        />
        
        <TouchableOpacity 
          className="w-full p-4 bg-blue-600 rounded-lg mt-4"
          onPress={handleUpdate}
          disabled={saving}
        >
          <Text className="text-white text-center font-semibold">
            {saving ? 'Saving...' : 'Update Product'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
