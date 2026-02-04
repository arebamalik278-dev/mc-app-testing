import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Image, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { apiGet } from '../../services/api';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: { name: string; quantity: number; price: number }[];
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const data = await apiGet<Order[]>('/orders');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600';
      case 'shipped': return 'text-blue-600';
      case 'delivered': return 'text-green-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <View className="bg-white p-4 rounded-lg shadow-sm mb-4 mx-4">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="font-bold text-gray-800">Order #{item.id}</Text>
        <Text className={`font-medium ${getStatusColor(item.status)}`}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
      <Text className="text-gray-500 text-sm mb-2">{item.date}</Text>
      <View className="border-t border-gray-100 pt-2 mt-2">
        {item.items.map((orderItem, index) => (
          <View key={index} className="flex-row justify-between py-1">
            <Text className="text-gray-600">{orderItem.quantity}x {orderItem.name}</Text>
            <Text className="text-gray-800">${orderItem.price}</Text>
          </View>
        ))}
      </View>
      <View className="border-t border-gray-100 pt-2 mt-2 flex-row justify-between">
        <Text className="font-bold text-gray-800">Total</Text>
        <Text className="font-bold text-blue-600">${item.total}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Text className="text-xl font-bold text-gray-800 p-4">Order History</Text>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Loading...</Text>
        </View>
      ) : orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 4 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No orders yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
