import { colors } from "@design/colors";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@assets/images/logo.svg";
import { ms } from "@design/responsive";
import AppText from "@shared/components/AppText";
import { typography } from "@design/typography";
import { Fonts } from "@design/fonts";
import CameraIcon from "@assets/images/camera.svg";
import InputField from "@shared/components/InputField";
import Button from "@shared/components/Button";
import { useNavigation } from "@react-navigation/native";

const PersonalizeProfile = () => {
    const navigation = useNavigation<any>();
    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.main}>
                <Logo style={Styles.logo} />
                <AppText style={Styles.personalizeText}>Personalize your <AppText style={Styles.profileText}>profile</AppText></AppText>
                <CameraIcon style={Styles.cameraIcon} />
            </View>
            <View style={Styles.centerView}>
                <AppText style={Styles.title}>Name</AppText>
                <InputField placeholder="Name" />
                <AppText style={[Styles.title, { marginTop: ms(20) }]}>Email</AppText>
                <InputField placeholder="Email" />
                <AppText style={[Styles.title, { marginTop: ms(20) }]}>WhatsApp Number *</AppText>
                <InputField placeholder="Enter your whatsapp number" />
                <Button title="Verify Detail" onPress={() => navigation.navigate('PregencyDetail')} style={Styles.button} />
                <AppText style={Styles.bottomText}>Your details are secured and will not be shared by anyone</AppText>
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