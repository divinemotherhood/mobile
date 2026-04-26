import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from "./AuthNavigator";
import { useAuthStore } from '../../store/authStore';
import { useEffect, useState } from 'react';
import AppNavigator from './AppNavigator';
import { secureStorage } from '@shared/utils/storage';

const RootNavigator = () => {
    const [loading, setLoading] = useState(true);
    const { setAuth, isAuthenticated } = useAuthStore();

    useEffect(() => {
        const init = async () => {
            const tokens = await secureStorage.getTokens();

            if (tokens) {
                setAuth({
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    user: null,
                });
            }

            setLoading(false);
        };

        init();
    }, []);

    if (loading) return null;

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
};

export default RootNavigator;