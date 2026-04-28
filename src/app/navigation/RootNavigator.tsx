import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from "./AuthNavigator";
import { useAuthStore } from '../../store/authStore';
import { useEffect, useState } from 'react';
import AppNavigator from './AppNavigator';
import { secureStorage } from '@shared/utils/storage';
import { getUserApi } from '../../api/endpoints/auth.api';

const RootNavigator = () => {
    const [loading, setLoading] = useState(true);
    const { setAuth, isAuthenticated, logout } = useAuthStore();

    useEffect(() => {
        const init = async () => {
            const shouldForceLogin = await secureStorage.getForceLoginOnReopen();
            if (shouldForceLogin) {
                await secureStorage.setForceLoginOnReopen(false);
                await secureStorage.clearTokens();
                logout();
                setLoading(false);
                return;
            }

            const tokens = await secureStorage.getTokens();

            if (tokens) {
                try {
                    const profileResponse = await getUserApi(tokens.idToken);
                    setAuth({
                        accessToken: tokens.idToken,
                        user: profileResponse?.user ?? null,
                    });
                } catch (error) {
                    await secureStorage.clearTokens();
                    logout();
                }
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