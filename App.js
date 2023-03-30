import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {Amplify, API, graphqlOperation} from 'aws-amplify';
import {createTodo} from './graphql/mutations';
import {listTodos} from './graphql/queries';
import config from './aws-exports';
Amplify.configure(config);
Amplify.Logger.LOG_LEVEL = 'DEBUG';

async function getListTodos() {
  const todo = {name: 'My first todo', description: 'Hello world!'};
  await API.graphql(graphqlOperation(createTodo, {input: todo}));
  const todos = await API.graphql(graphqlOperation(listTodos));
  console.log(todos.data.listTodos.items);
}
getListTodos();

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
