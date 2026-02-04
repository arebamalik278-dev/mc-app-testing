import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { apiPost } from '../../services/api';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await apiPost('/contact', { name, email, message });
      Alert.alert('Success', 'Message sent successfully');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Contact Us</Text>
        
        <Text className="text-gray-600 mb-6">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </Text>
        
        <Text className="text-sm font-medium text-gray-600 mb-2">Your Name</Text>
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
          value={name}
          onChangeText={setName}
        />
        
        <Text className="text-sm font-medium text-gray-600 mb-2">Email</Text>
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Text className="text-sm font-medium text-gray-600 mb-2">Message</Text>
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-lg mb-6 bg-gray-50 h-32"
          value={message}
          onChangeText={setMessage}
          multiline
          textAlignVertical="top"
        />
        
        <TouchableOpacity 
          className="w-full p-4 bg-blue-600 rounded-lg"
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold">
            {loading ? 'Sending...' : 'Send Message'}
          </Text>
        </TouchableOpacity>
        
        <View className="mt-8 p-4 bg-gray-50 rounded-lg">
          <Text className="font-bold text-gray-800 mb-2">Other ways to reach us:</Text>
          <Text className="text-gray-600">Email: support@example.com</Text>
          <Text className="text-gray-600">Phone: +1 (555) 123-4567</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
