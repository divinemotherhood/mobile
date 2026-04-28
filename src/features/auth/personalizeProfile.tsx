import { colors } from "@design/colors";
import { AppState, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@assets/images/logo.svg";
import { ms } from "@design/responsive";
import AppText from "@shared/components/AppText";
import { typography } from "@design/typography";
import { Fonts } from "@design/fonts";
import CameraIcon from "@assets/images/camera.svg";
import InputField from "@shared/components/InputField";
import Button from "@shared/components/Button";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { logoutUser } from "../../services/auth/firebase.service";
import { secureStorage } from "@shared/utils/storage";
import { useI18n } from "../../i18n";

const PersonalizeProfile = () => {
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();
    const isLoggingOutRef = useRef(false);
    const { t } = useI18n();

    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", (event: any) => {
            const actionType = event?.data?.action?.type;
            const isCloseAction = actionType === "GO_BACK" || actionType === "POP" || actionType === "POP_TO_TOP";

            if (!isCloseAction || isLoggingOutRef.current) {
                return;
            }

            event.preventDefault();
            isLoggingOutRef.current = true;

            logoutUser().finally(() => {
                isLoggingOutRef.current = false;
            });
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (!isFocused) {
            return;
        }

        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if (nextAppState !== "active") {
                secureStorage.setForceLoginOnReopen(true).catch(() => undefined);
            }
        });

        return () => {
            subscription.remove();
        };
    }, [isFocused]);

    const handleVerifyPress = async () => {
        await secureStorage.setForceLoginOnReopen(false);
        navigation.navigate('PregencyDetail');
    };

    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.main}>
                <Logo style={Styles.logo} />
                <AppText style={Styles.personalizeText}>
                    {t("personalizeTitle")} <AppText style={Styles.profileText}>{t("personalizeProfile")}</AppText>
                </AppText>
                <CameraIcon style={Styles.cameraIcon} />
            </View>
            <View style={Styles.centerView}>
                <AppText style={Styles.title}>{t("personalizeName")}</AppText>
                <InputField placeholder={t("personalizeName")} />
                <AppText style={[Styles.title, { marginTop: ms(20) }]}>{t("personalizeEmail")}</AppText>
                <InputField placeholder={t("personalizeEmail")} />
                <AppText style={[Styles.title, { marginTop: ms(20) }]}>{t("personalizeWhatsapp")}</AppText>
                <InputField placeholder={t("personalizeWhatsappPlaceholder")} />
                <Button title={t("personalizeVerify")} onPress={handleVerifyPress} style={Styles.button} />
                <AppText style={Styles.bottomText}>{t("personalizeSecureText")}</AppText>
            </View>
        </SafeAreaView>
    )
}

export default PersonalizeProfile;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    main: {
        alignItems: 'center',
    },
    logo: {
        marginTop: ms(24),
    },
    personalizeText: {
        fontSize: typography.h2,
        color: colors.black,
        fontFamily: Fonts.LarkenMedium,
        marginTop: ms(23),
    },
    profileText: {
        color: colors.secondary,
    },
    cameraIcon: {
        marginTop: ms(23),
        // iOS shadow
        shadowColor: "#2E8F0",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        // Android shadow
        elevation: 6,
    },
    centerView: {
        marginLeft: ms(24),
        marginRight: ms(24),
    },
    title: {
        fontSize: typography.caption,
        color: colors.black,
        fontWeight: '600'
    },
    button: {
        marginTop: ms(36),
    },
    bottomText: {
        color: colors.black,
        fontSize: typography.small,
        textAlign: 'center',
        marginTop: ms(8),
    }
});