import * as Keychain from "react-native-keychain";

const SERVICE = "auth";
const APP_STATE_SERVICE = "app_state";
const FORCE_LOGIN_KEY = "force_login_after_personalize_close";

export const secureStorage = {
    setTokens: async (idToken: string) => {
        await Keychain.setGenericPassword(
            "token",
            JSON.stringify({ idToken }),
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

        try {
            const parsed = JSON.parse(credentials.password);
            if (
                parsed &&
                typeof parsed === "object" &&
                "idToken" in parsed &&
                typeof parsed.idToken === "string"
            ) {
                return parsed as { idToken: string };
            }
            return null;
        } catch {
            // Old/invalid values (for example "undefined") should not crash the app.
            return null;
        }
    },

    clearTokens: async () => {
        await Keychain.resetGenericPassword({
            service: SERVICE,
        });
    },

    setForceLoginOnReopen: async (shouldForce: boolean) => {
        await Keychain.setGenericPassword("state", JSON.stringify({ [FORCE_LOGIN_KEY]: shouldForce }), {
            service: APP_STATE_SERVICE,
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        });
    },

    getForceLoginOnReopen: async () => {
        const credentials = await Keychain.getGenericPassword({
            service: APP_STATE_SERVICE,
        });

        if (!credentials) return false;

        try {
            const parsed = JSON.parse(credentials.password);
            return Boolean(parsed?.[FORCE_LOGIN_KEY]);
        } catch {
            return false;
        }
    },
};