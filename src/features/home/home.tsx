import AppText from "@shared/components/AppText";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { logoutUser } from "../../services/auth/firebase.service";
import { useI18n } from "../../i18n";
import { spacing, typography } from "../../design";
import { colors } from "@design/colors";

const Home = () => {
    const { language, setLanguage, t } = useI18n();

    return (
        <View style={styles.container}>
            <AppText style={styles.label}>{t("homeLanguage")}</AppText>
            <View style={styles.languageRow}>
                <TouchableOpacity
                    style={[styles.languageButton, language === "en" && styles.activeButton]}
                    onPress={() => {
                        setLanguage("en").catch(() => undefined);
                    }}
                >
                    <AppText style={[styles.languageText, language === "en" && styles.activeText]}>
                        {t("homeEnglish")}
                    </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.languageButton, language === "hi" && styles.activeButton]}
                    onPress={() => {
                        setLanguage("hi").catch(() => undefined);
                    }}
                >
                    <AppText style={[styles.languageText, language === "hi" && styles.activeText]}>
                        {t("homeHindi")}
                    </AppText>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={() => logoutUser()}>
                <AppText style={styles.logoutText}>{t("homeLogout")}</AppText>
            </TouchableOpacity>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
    },
    label: {
        fontSize: typography.regular,
        color: colors.black,
        marginBottom: spacing.md,
        fontWeight: "600",
    },
    languageRow: {
        flexDirection: "row",
        gap: spacing.sm,
    },
    languageButton: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 8,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
    },
    activeButton: {
        backgroundColor: colors.primary,
    },
    languageText: {
        color: colors.primary,
        fontSize: typography.caption,
        fontWeight: "600",
    },
    activeText: {
        color: colors.white,
    },
    logoutButton: {
        marginTop: spacing.xl,
    },
    logoutText: {
        color: colors.black,
        fontSize: typography.regular,
    },
});