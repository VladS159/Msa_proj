import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <text>Monkey Business</text>
      <form>
        <label>
          User:
          <input type="text" name="user" />
        </label>
          <label>
              Password:
              <input type="text" name="password" />
          </label>
        <input type="submit" value="Submit" />
      </form>
        <a>Sign Up</a>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

    label: {
        display: "inline-block",
        width: "100%",
    },

    form: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
