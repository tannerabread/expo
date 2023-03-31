import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {Amplify, API, Auth} from 'aws-amplify';
import config from './aws-exports';
Amplify.configure({
  ...config,
  API: {
    endpoints: [
      {
        name: 'apiauth',
        endpoint: config.aws_cloud_logic_custom[1].endpoint,
        region: config.aws_cloud_logic_custom[1].region,
        custom_header: async () => {
          return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
        }
      }
    ]
  }
});
Amplify.Logger.LOG_LEVEL = 'DEBUG';

API.post('apiauth', '/items', {body: {name: 'item1'}})
  .then(response => {
    console.log({response});
  })
  .catch(error => {
    console.log(error.response);
  });

API.get('apiauth', '/items', {})
  .then(response => {
    console.log({response});
  })
  .catch(error => {
    console.log(error.response);
  });


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
