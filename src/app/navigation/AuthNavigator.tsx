import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../../features/auth/login";
import Splash from '../../features/splash/splash';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
};

export default AuthNavigator;