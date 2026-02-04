import { View, Text, SafeAreaView, ScrollView } from 'react-native';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I create an account?',
    answer: 'To create an account, tap on the "Sign Up" button on the login screen. Enter your email address and create a password. You will receive a verification email to confirm your account.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive an email with tracking information. You can also view your order status in the Order History section of your profile.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.',
  },
  {
    question: 'How do I return an item?',
    answer: 'To return an item, go to your Order History, select the order containing the item you wish to return, and tap on "Return Item". Follow the instructions to complete the return process.',
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Yes, we take your privacy seriously. All personal information is encrypted and stored securely. Please refer to our Privacy Policy for more details.',
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can contact our customer support team through the Contact Us page in the app, or by emailing support@example.com.',
  },
];

export default function FAQ() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</Text>
        
        {faqs.map((faq, index) => (
          <View key={index} className="mb-6">
            <Text className="font-semibold text-gray-800 text-lg mb-2">{faq.question}</Text>
            <Text className="text-gray-600 leading-6">{faq.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
