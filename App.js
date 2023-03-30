import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import {Amplify, Interactions} from 'aws-amplify';
import config from './aws-exports';

import {AWSLexV2Provider} from '@aws-amplify/interactions';
Amplify.addPluggable(new AWSLexV2Provider());

Amplify.configure(config);
Amplify.Logger.LOG_LEVEL = 'DEBUG';

async function chatBot() {
  let userInput = 'I want to reserve a hotel for tonight';
  // Provide a bot name and user input
  const response = await Interactions.send('BookTrip_dev', userInput);
  // Log chatbot response
  console.log(response.message);
}
chatBot();

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
