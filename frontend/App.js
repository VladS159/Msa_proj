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
        <TouchableOpacity style={styles.BigButton}>
          <View>
            <Text style={{color: '#FAF1E4'}}>Log In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <View>
            <Text style={{color: '#FAF1E4'}}>Sign Up</Text>
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
          <TextInput style={styles.input}  underlineColorAndroid="transparent" placeholder="Enter your username" />
        </View>
        <View style={styles.label}>
          <Text>Password:</Text>
          <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry={true} />
        </View>
        <View style={styles.label}>
          <Text>Confirm Password:</Text>
          <TextInput style={styles.input} placeholder="Confirm your password" secureTextEntry={true} />
        </View>
        <TouchableOpacity style={styles.BigButton}>
          <View>
            <Text style={{color: '#FAF1E4'}}>Sign Up</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <View>
            <Text style={{color: '#FAF1E4'}}>Log In</Text>
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
    outlineWidth: 0,
    borderWidth: 0,
  },
  input: {
    height: 40,
    borderColor: '',
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
    outlineStyle: 'none',
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#9EB384',
    color: '#FAF1E4',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    height: '5%',
    width: '100%',
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },
  BigButton: {
    backgroundColor: '#435334',
    color:'#FAF1E4',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    height: '7.5%',
    width: '100%',
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: '#FAF1E4',
    alignItems: 'center',
  },
});

export default App;