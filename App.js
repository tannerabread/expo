import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {Amplify} from 'aws-amplify';
import config from './aws-exports';
import {
  Predictions,
  AmazonAIPredictionsProvider,
} from '@aws-amplify/predictions';
Amplify.configure(config);
Amplify.Logger.LOG_LEVEL = 'DEBUG';
Amplify.addPluggable(new AmazonAIPredictionsProvider());

Predictions.convert({
  translateText: {
    source: {
      text: 'Hello World',
    },
  },
})
  .then(result => console.log({result}))
  .catch(err => console.log({err}));

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
