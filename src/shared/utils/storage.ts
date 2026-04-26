import * as Keychain from "react-native-keychain";

const SERVICE = "auth";

export const secureStorage = {
    setTokens: async (accessToken: string, refreshToken: string) => {
        await Keychain.setGenericPassword(
            "token",
            JSON.stringify({ accessToken, refreshToken }),
            {
                service: SERVICE,
                accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
            }
        );
    },

    getTokens: async () => {
        const credentials = await Keychain.getGenericPassword({
            service: SERVICE,
        });

        if (!credentials) return null;

        return JSON.parse(credentials.password);
    },

    clearTokens: async () => {
        await Keychain.resetGenericPassword({
            service: SERVICE,
        });
    },
};