import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@design/colors";
import Logo from "@assets/images/logo.svg";
import { spacing, typography } from "../../design";
import { ms } from "@design/responsive";
import { Fonts } from "@design/fonts";
import PeopleIcon from "@assets/images/loginPeople.svg";
import GoogleIcon from "@assets/images/google.svg";
import AppText from "@shared/components/AppText";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const navigation = useNavigation<any>();
    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.main}>
                <Logo style={Styles.logo} />
                <AppText style={Styles.title}>Welcome to a</AppText>
                <AppText style={Styles.titleSub}>Beautiful Journey</AppText>
                <AppText style={Styles.subTitle}>Join our community of expectant mothers</AppText>
                <AppText style={Styles.subTitleEndText}>for expert-led prenatal care & support</AppText>
                <View style={Styles.centerView}>
                    <PeopleIcon />
                    <AppText style={Styles.joinedText}>Joined by <AppText style={Styles.count}>10k+</AppText> happy mothers</AppText>
                </View>
                <TouchableOpacity style={Styles.googleButton} onPress={() => navigation.navigate('PersonalizeProfile')}>
                    <GoogleIcon />
                    <AppText style={Styles.googleButtonText}>Countinue with Google</AppText>
                </TouchableOpacity>
                <View style={Styles.bottomView}>
                    <AppText style={Styles.bottomText}>By continuing, you agree to our <AppText style={Styles.serviceText}>Terms of Service.</AppText></AppText>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    main: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        marginTop: ms(74),
    },
    title: {
        color: colors.black,
        fontSize: typography.h1,
        marginTop: ms(64),
        fontFamily: Fonts.LarkenMedium,
    },
    titleSub: {
        color: colors.black,
        fontSize: typography.h1,
        fontFamily: Fonts.LarkenMedium,
    },
    subTitle: {
        color: colors.black,
        fontSize: typography.body,
        marginTop: spacing.lg,
    },
    subTitleEndText: {
        color: colors.black,
        fontSize: typography.body,
    },
    centerView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: ms(31),
        gap: spacing.sm,
    },
    count: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: typography.caption,
    },
    joinedText: {
        color: colors.black,
        fontSize: typography.caption,
    },
    googleButton: {
        backgroundColor: colors.white,
        marginTop: ms(37),
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        // iOS shadow
        shadowColor: "#2E8F0",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        // Android shadow
        elevation: 6,
        paddingVertical: spacing.md,
        borderRadius: ms(8),
        paddingHorizontal: ms(75),
    },
    googleButtonText: {
        color: colors.black,
        fontSize: typography.regular,
        fontWeight: '600',
    },
    bottomView: {
        position: 'absolute',
        bottom: ms(10),
    },
    bottomText: {
        color: colors.black,
        fontSize: typography.caption,
    },
    serviceText: {
        color: colors.primary,
        fontWeight: '600',
    }
})