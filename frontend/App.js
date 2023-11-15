import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const LogInPage = props => {

  const onPress = () => {
    props.navigation.navigate('SignUpPage');
  };

  return (
    <View style={styles.container}>
      <Text>Monkey Business</Text>
      <form>
        <label>
          Username:
          <input type="text" name="user" />
        </label>
        <label>
            Password:
            <input type="text" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <TouchableOpacity onPress={onPress}>
        <button>Sign Up</button>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const SignUpPage = props => {

  const onPress = () => {
    props.navigation.navigate('LogInPage');
  };

  return (
    <View style={styles.container}>
      <Text>Monkey Business</Text>
      <form>
        <label>
          Username:
          <input type="text" name="user" />
        </label>
        <label>
            Password:
            <input type="text" name="password" />
          </label>
        <label>
            Confirm Password:
            <input type="text" name="password" />
          </label>
        <input type="submit" value="Submit" />
      </form>
      <TouchableOpacity onPress={onPress}>
        <button>Log in</button>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const App = () => {
  //const
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogInPage" component={LogInPage} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUpPage" component={SignUpPage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

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
