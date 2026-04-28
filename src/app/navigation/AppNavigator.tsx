import Home from "../../features/home/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonalizeProfile from "../../features/auth/personalizeProfile";
import { useAuthStore } from "../../store/authStore";
import PregencyDetail from "../../features/auth/pregnancyDetail";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const user = useAuthStore((state) => state.user);
    const shouldOpenPersonalize = user?.onboardingCompleted === false && user?.onboardingStep === 1;
    const shouldOpenPregencyDetail = user?.onboardingCompleted === false && user?.onboardingStep === 2;

    return (
        <Stack.Navigator initialRouteName={shouldOpenPersonalize ? "PersonalizeProfile" : shouldOpenPregencyDetail ? "PregencyDetail" : "Home"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="PersonalizeProfile" component={PersonalizeProfile} />
            <Stack.Screen name="PregencyDetail" component={PregencyDetail} />
        </Stack.Navigator>
    );
}

export default AppNavigator;