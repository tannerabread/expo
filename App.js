import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {Amplify, Storage} from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);
Amplify.Logger.LOG_LEVEL = 'DEBUG';

async function putFile() {
  const result = await Storage.put('test.txt', 'Hello');
  console.log(result);
}
putFile();

Storage.list('') // for listing ALL files without prefix, pass '' instead
  .then(({results}) => console.log(results))
  .catch(err => console.log(err));

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
