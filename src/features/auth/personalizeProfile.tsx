import { colors } from "@design/colors";
import { AppState, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@assets/images/logo.svg";
import { ms } from "@design/responsive";
import AppText from "@shared/components/AppText";
import { typography } from "@design/typography";
import { Fonts } from "@design/fonts";
import CameraIcon from "@assets/images/camera.svg";
import CameraIconActive from "@assets/images/camera_Icon.svg";
import InputField from "@shared/components/InputField";
import Button from "@shared/components/Button";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { logoutUser } from "../../services/auth/firebase.service";
import { secureStorage } from "@shared/utils/storage";
import { useI18n } from "../../i18n";
import { useAuthStore } from "../../store/authStore";
import { Controller, useForm } from "react-hook-form";
import { launchImageLibrary } from "react-native-image-picker";
import DownArrowIcon from "@assets/images/downIcon.svg";
import { personalizeProfileApi } from "../../api/endpoints/auth.api";
import { CountryPicker } from "react-native-country-codes-picker";
import Flag from "react-native-flags";

type FormData = {
    full_name: string;
    email: string;
    country_code: string;
    whatsapp_number: string;
    profile_image: string;
};

const PersonalizeProfile = () => {
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();
    const isLoggingOutRef = useRef(false);
    const { t } = useI18n();
    const user = useAuthStore((state) => state.firebaseUser);
    const [profile, setProfile] = useState("");
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [countryCode, setCountryCode] = useState<{ code: string, dial_code: string }>({
        code: "IN",
        dial_code: "+91",
    });
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (user) {
            reset({
                full_name: user.givenName || "",
                email: user.email || "",
            })
            setProfile(user.photo);
        }
    }, [user]);

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

    const onTakePhoto = async () => {
        try {
            // Launch image library
            const result = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 1,
            });

            if (result.didCancel) {
                console.log("User cancelled image picker");
                return;
            }

            if (result.assets && result.assets.length > 0) {
                const selectedImage = result.assets[0].uri;
                setProfile(selectedImage || ""); // Update the profile state with the selected image URI
            }
        } catch (error) {
            console.error("Error picking image: ", error);
        }
    };

    const onSubmit = async (data: FormData) => {
        data.country_code = countryCode?.dial_code?.replace("+", "") || "91";
        data.profile_image = profile;
        const formData = new FormData();
        formData.append("full_name", data.full_name);
        formData.append("email", data.email);
        formData.append("country_code", data.country_code.toString());
        formData.append("whatsapp_number", data.whatsapp_number.toString());
        if (data.profile_image) {
            formData.append("profile_image", profile);
        }
        await personalizeProfileApi(formData).then(() => {
            handleVerifyPress();
        }).catch((err) => {
            handleVerifyPress();
            console.log("Error personalizing profile: ", err);
        });
    }

    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={Styles.main}>
                    <Logo style={Styles.logo} />
                    <AppText style={Styles.personalizeText}>
                        {t("personalizeTitle")} <AppText style={Styles.profileText}>{t("personalizeProfile")}</AppText>
                    </AppText>
                    {
                        profile ?
                            <TouchableOpacity onPress={() => onTakePhoto()}>
                                <Image source={{ uri: profile }} style={{ width: ms(100), height: ms(100), borderRadius: ms(50), marginTop: ms(23) }} />
                                <CameraIconActive style={Styles.cameraActive} />
                            </TouchableOpacity>
                            :
                            <CameraIcon style={Styles.cameraIcon} />
                    }

                </View>
                <View style={Styles.centerView}>
                    <AppText style={Styles.title}>{t("personalizeName")}</AppText>
                    <Controller
                        control={control}
                        name="full_name"
                        rules={{
                            required: "Name is required",
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                placeholder={t("personalizeName")}
                                defaultValue={user?.givenName || ""}
                                value={value}
                                onChangeText={onChange} />
                        )}
                    />
                    {errors?.full_name?.message && <AppText style={Styles.error}>{errors?.full_name?.message}</AppText>}
                    <AppText style={[Styles.title, { marginTop: ms(20) }]}>{t("personalizeEmail")}</AppText>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: "Email is required",
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                placeholder={t("personalizeEmail")}
                                defaultValue={user?.email || ""}
                                value={value}
                                onChangeText={onChange}
                                editable={false} />
                        )}
                    />
                    {errors?.email?.message && <AppText style={Styles.error}>{errors?.email?.message}</AppText>}
                    <AppText style={[Styles.title, { marginTop: ms(20) }]}>{t("personalizeWhatsapp")}</AppText>
                    <CountryPicker
                        show={show}
                        lang="en"
                        pickerButtonOnPress={(country) => {
                            setCountryCode(country);
                            setShow(false);
                        }}
                        onBackdropPress={() => setShow(false)}
                        itemTemplate={({ item, name, onPress }) => (
                            <TouchableOpacity onPress={onPress} style={Styles.countryPickerRow}>
                                <Flag code={item.code.toUpperCase()} size={24} />
                                <AppText style={Styles.countryPickerDialCode}>{item.dial_code}</AppText>
                                <AppText style={Styles.countryPickerName}>{name}</AppText>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={Styles.mobileContainer}>
                        <TouchableOpacity onPress={() => setShow(true)} style={Styles.countryCodeContainer}>
                            <Flag code={(countryCode?.code || "IN").toUpperCase()} size={24} />
                            <AppText style={Styles.countryCode}>{countryCode?.dial_code || "+91"}</AppText>
                            <DownArrowIcon style={Styles.downArrowIcon} />
                        </TouchableOpacity>
                        <Controller
                            control={control}
                            name="whatsapp_number"
                            rules={{
                                required: "WhatsApp number is required",
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "Only numeric values are allowed",
                                },
                                maxLength: 10,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <InputField
                                    style={{ flex: 1 }}
                                    placeholder={t("personalizeWhatsappPlaceholder")}
                                    value={value ? value.toString() : undefined}
                                    onChangeText={onChange}
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                />
                            )}
                        />
                    </View>
                    {errors?.whatsapp_number?.message && <AppText style={Styles.error}>{errors?.whatsapp_number?.message}</AppText>}
                    <Button title={t("personalizeVerify")} onPress={handleSubmit(onSubmit)} style={Styles.button} />
                    <AppText style={Styles.bottomText}>{t("personalizeSecureText")}</AppText>
                </View>
            </ScrollView>
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
    cameraActive: {
        position: 'absolute',
        bottom: 0,
        right: 0,
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
    },
    countryCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 8,
        padding: ms(13),
        marginTop: ms(6),
        backgroundColor: colors.fill,
        marginRight: ms(8),
    },
    mobileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryCode: {
        marginLeft: ms(8),
        fontSize: typography.caption,
    },
    error: {
        color: colors.red,
        marginTop: ms(4),
    },
    countryPickerRow: {
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
        width: '100%',
        minHeight: 50,
        paddingHorizontal: 25,
        alignItems: 'center',
        marginVertical: 2,
        flexDirection: 'row',
        borderRadius: 10,
    },
    countryPickerDialCode: {
        flex: 0.3,
        marginLeft: ms(8),
    },
    countryPickerName: {
        flex: 1,
    },
    downArrowIcon: {
        marginLeft: ms(5),
    }
});