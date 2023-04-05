import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import { Amplify, DataStore } from "aws-amplify";
import { Todo } from "./models";
import "core-js/full/symbol/async-iterator";
import config from "./aws-exports";
Amplify.configure({
  ...config,
  DataStore: {
    authModeStrategyType: "MULTI_AUTH",
  },
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
    console.log("post: ", JSON.stringify(post, null, 2));
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
  async function readDatastore() {
    try {
      const todos = await DataStore.query(Todo);
      console.log("todos: ", JSON.stringify(todos, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title="Read" onPress={readDatastore} />
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
