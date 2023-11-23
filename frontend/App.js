import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const LogInPage = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('SignUpPage');
  };

  return (
    <View style={styles.container}>
      <Text>Monkey Business</Text>
      <View style={styles.form}>
        <View style={styles.label}>
          <Text>Username:</Text>
          <TextInput style={styles.input} placeholder="Enter your username" />
        </View>
        <View style={styles.label}>
          <Text>Password:</Text>
          <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry={true} />
        </View>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text>Log In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SignUpPage = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('LogInPage');
  };

  return (
    <View style={styles.container}>
      <Text>Monkey Business</Text>
      <View style={styles.form}>
        <View style={styles.label}>
          <Text>Username:</Text>
          <TextInput style={styles.input} placeholder="Enter your username" />
        </View>
        <View style={styles.label}>
          <Text>Password:</Text>
          <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry={true} />
        </View>
        <View style={styles.label}>
          <Text>Confirm Password:</Text>
          <TextInput style={styles.input} placeholder="Confirm your password" secureTextEntry={true} />
        </View>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text>Sign Up</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text>Log In</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogInPage" component={LogInPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;