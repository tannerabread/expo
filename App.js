import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {Amplify, PubSub, Auth} from 'aws-amplify';
import {AWSIoTProvider} from '@aws-amplify/pubsub';
import config from './aws-exports';
Amplify.configure(config);
Amplify.Logger.LOG_LEVEL = 'DEBUG';

Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: 'us-east-1',
    aws_pubsub_endpoint:
      'wss://a2b5xt8ljhusrb-ats.iot.us-east-1.amazonaws.com/mqtt',
  }),
);

async function signIn() {
  try {
    const user = await Auth.signIn('testuser20', 'testtest');
    console.log({user});
    Auth.currentCredentials().then(info => {
      const cognitoIdentityId = info.identityId;
      console.log({cognitoIdentityId});
    });
  } catch (error) {
    console.log('error signing in', error);
  }
}
signIn();

PubSub.subscribe('myTopic').subscribe({
  next: data => console.log('Message received', data),
  error: error => console.error(error),
  complete: () => console.log('Done'),
});
async function publish() {
  await PubSub.publish('myTopic', {msg: 'Hello to all subscribers!'});
}
publish();

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
