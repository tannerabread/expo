import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Amplify, DataStore } from "aws-amplify";
import { Todo } from "./models";
import { SQLiteAdapter } from '@aws-amplify/datastore-storage-adapter/SQLiteAdapter';
import 'core-js/full/symbol/async-iterator';
import config from "./aws-exports";
Amplify.configure({
  ...config,
  DataStore: {
    storageAdapter: SQLiteAdapter,
    authModeStrategyType: "MULTI_AUTH",
  }
});
Amplify.Logger.LOG_LEVEL = "DEBUG";

async function saveDatastoreTodo() {
  try {
    const post = await DataStore.save(
      new Todo({
        name: "Datastore",
        description: "hello datastore!",
      })
    );
  } catch (error) {
    console.log(error);
  }
}
saveDatastoreTodo();

async function readDatastore() {
  try {
    const todos = await DataStore.query(Todo);
    console.log("todos: ", JSON.stringify(todos, null, 2));
  } catch (error) {
    console.log(error);
  }
}
readDatastore();

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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
