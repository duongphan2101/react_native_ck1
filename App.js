import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screen/login';
import Home from './screen/home';
import Register from './screen/register';
import Admin from './screen/admin';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Admin' component={Admin}/>
        <Stack.Screen name='Register' component={Register}options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

