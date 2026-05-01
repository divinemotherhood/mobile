import { SafeAreaView } from "react-native-safe-area-context";
import AppLogo from '@assets/images/logo.svg';
import { StyleSheet, View, Text } from "react-native";
import { colors } from "@design/colors";
import AppText from "@shared/components/AppText";
import HeartIcon from '@assets/images/heart.svg';
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
    const navigation = useNavigation<any>();

    const timer = setTimeout(() => {
        navigation.replace('Login');
        return () => clearTimeout(timer);
    }, 2000);

    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.main}>
                <AppLogo />
            </View>
            <AppText style={Styles.bottomText}>
                Made with<HeartIcon height={14} width={20} />for Expecting Parents Globally!
            </AppText>
        </SafeAreaView>
    );
};

export default Splash;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomText: {
        textAlign: "center",
    },
});