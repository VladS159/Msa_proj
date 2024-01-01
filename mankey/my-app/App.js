import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import SignInScreens from "./src/screens/SignInScreens";
import SignUpScreens from "./src/screens/SignUpScreens";
import Navigation from "./src/navigation"
const App = () => {
  return (
      <Navigation />
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF1E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
