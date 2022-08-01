import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import AddEventPage from './pages/AddEventPage';
import { EventGroup } from './types/EventGroup';

type RootStackParamList = {
  Register: {name: string},
  Login: {name: string},
  Home: {eventGroups: EventGroup[]},
  AddEvent: {name: string},
}

export type { RootStackParamList };

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterPage} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomePage} />
        <Stack.Screen name="AddEvent" component={AddEventPage}/>
      </Stack.Navigator>
    </NavigationContainer>
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
