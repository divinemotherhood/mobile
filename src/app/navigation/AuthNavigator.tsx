import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../../features/auth/login";
import PersonalizeProfile from '../../features/auth/personalizeProfile';
import PregencyDetail from '../../features/auth/pregnancyDetail';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="PersonalizeProfile" component={PersonalizeProfile} />
            <Stack.Screen name="PregencyDetail" component={PregencyDetail} />
        </Stack.Navigator>
    )
};

export default AuthNavigator;