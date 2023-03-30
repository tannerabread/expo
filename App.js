import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Amplify, I18n } from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);
Amplify.Logger.LOG_LEVEL = "DEBUG";

I18n.setLanguage("fr");
const dict = {
  fr: {
    "Sign In": "Se connecter",
    "Sign Up": "S'inscrire",
  },
  es: {
    "Sign In": "Registrarse",
    "Sign Up": "Regístrate",
  },
};
I18n.putVocabularies(dict);
console.log(I18n.get("Sign In"));

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
