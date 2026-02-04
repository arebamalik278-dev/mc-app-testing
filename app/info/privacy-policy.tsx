import { View, Text, SafeAreaView, ScrollView } from 'react-native';

export default function PrivacyPolicy() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Privacy Policy</Text>
        
        <Text className="text-gray-600 mb-4">
          Last updated: {new Date().toLocaleDateString()}
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">1. Introduction</Text>
        <Text className="text-gray-600 mb-4">
          Welcome to our privacy policy. This document explains how we collect, use, and protect your personal information when you use our mobile application.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">2. Information We Collect</Text>
        <Text className="text-gray-600 mb-4">
          We may collect the following types of information: name, email address, phone number, shipping address, payment information, and usage data when you create an account or make a purchase.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">3. How We Use Your Information</Text>
        <Text className="text-gray-600 mb-4">
          We use your information to provide and improve our services, process transactions, send you updates about your orders, and communicate with you about products and promotions.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">4. Data Security</Text>
        <Text className="text-gray-600 mb-4">
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">5. Third-Party Services</Text>
        <Text className="text-gray-600 mb-4">
          We may use third-party services that collect, monitor, and analyze the use of our application. These third parties have access to your Personal Data only to perform these tasks on our behalf.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">6. Children's Privacy</Text>
        <Text className="text-gray-600 mb-4">
          Our Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">7. Changes to This Policy</Text>
        <Text className="text-gray-600 mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">8. Contact Us</Text>
        <Text className="text-gray-600">
          If you have any questions about this Privacy Policy, please contact us at support@example.com.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
