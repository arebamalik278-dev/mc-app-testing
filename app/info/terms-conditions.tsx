import { View, Text, SafeAreaView, ScrollView } from 'react-native';

export default function TermsConditions() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Terms & Conditions</Text>
        
        <Text className="text-gray-600 mb-4">
          Last updated: {new Date().toLocaleDateString()}
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">1. Acceptance of Terms</Text>
        <Text className="text-gray-600 mb-4">
          By downloading or using our mobile application, these terms and conditions will automatically apply to you. Make sure therefore that you read them carefully before using the app.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">2. Intellectual Property</Text>
        <Text className="text-gray-600 mb-4">
          You are not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to us.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">3. User Accounts</Text>
        <Text className="text-gray-600 mb-4">
          To use certain features of the app, you must create a user account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">4. Purchases and Payments</Text>
        <Text className="text-gray-600 mb-4">
          All purchases made through the app are subject to our refund policy. We reserve the right to refuse or cancel orders at any time. Payment must be received before orders are processed.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">5. User-Generated Content</Text>
        <Text className="text-gray-600 mb-4">
          By posting content to the app, you grant us a non-exclusive, royalty-free license to use, modify, and display such content in connection with our services.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">6. Prohibited Uses</Text>
        <Text className="text-gray-600 mb-4">
          You may not use the app for any unlawful purpose, to solicit others to perform unlawful acts, to violate any regulations, or to engage in any behavior that could harm or harass others.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">7. Limitation of Liability</Text>
        <Text className="text-gray-600 mb-4">
          We will not be liable for any indirect, incidental, or consequential damages arising from your use of the app. We make no warranties about the accuracy or reliability of the app's content.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">8. Changes to Terms</Text>
        <Text className="text-gray-600 mb-4">
          We reserve the right to modify these terms at any time. Continued use of the app after any changes constitutes acceptance of the new terms.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">9. Governing Law</Text>
        <Text className="text-gray-600 mb-4">
          These terms and conditions are governed by the laws of your jurisdiction and any disputes will be resolved in the courts of that jurisdiction.
        </Text>
        
        <Text className="text-gray-800 font-semibold mb-2">10. Contact Information</Text>
        <Text className="text-gray-600">
          If you have any questions about these Terms & Conditions, please contact us at support@example.com.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
