import { colors } from "@design/colors";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@assets/images/logo.svg";
import { ms } from "@design/responsive";
import AppText from "@shared/components/AppText";
import { typography } from "@design/typography";
import { Fonts } from "@design/fonts";
import InputField from "@shared/components/InputField";
import Button from "@shared/components/Button";
import SegmentedTabs from "@shared/components/SegmentedTabs";
import { useState } from "react";
import SelectableChips from "@shared/components/SelectableChips";

const OPTIONS = [
    { id: "1", label: "Gestational Diabetes" },
    { id: "2", label: "High Blood Pressure" },
    { id: "3", label: "Morning Sickness" },
    { id: "4", label: "Fatigue" },
    { id: "5", label: "Anxiety" },
];

const PregencyDetail = () => {
    const [value, setValue] = useState("yes");
    const [selected, setSelected] = useState<string[]>([]);

    const handleSelect = (id: string) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.main}>
                <Logo style={Styles.logo} />
                <AppText style={Styles.pregnancyText}>Pregnancy <AppText style={Styles.detailsText}>Details</AppText></AppText>
                <AppText style={Styles.tellUsText}>Tell us a bit more about your journey to</AppText>
                <AppText style={[Styles.tellUsText, { marginTop: 0 }]}>personalize your experience</AppText>
            </View>
            <View style={Styles.centerView}>
                <AppText style={Styles.title}>Is this your first baby?</AppText>
                <SegmentedTabs
                    options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                    ]}
                    selected={value}
                    onChange={setValue}
                    style={{ marginTop: ms(12) }}
                />
                <AppText style={Styles.title}>What is your last period (LMP) date?</AppText>
                <InputField placeholder="mm/dd/yyyy" />
                <AppText style={Styles.title}>Are you experiencing any complications? (Optional)</AppText>
                <View style={Styles.chipView}>
                    <SelectableChips
                        data={OPTIONS}
                        selectedIds={selected}
                        onSelect={handleSelect}
                    />
                </View>
                <Button title="Continue" onPress={() => { }} style={Styles.button} />
                <AppText style={Styles.bottomText}>Your details are secured and will not be shared by anyone</AppText>
            </View>
        </SafeAreaView>
    )
}

export default PregencyDetail;

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
    pregnancyText: {
        fontSize: typography.h2,
        color: colors.black,
        fontFamily: Fonts.LarkenMedium,
        marginTop: ms(23),
    },
    detailsText: {
        color: colors.secondary,
    },
    tellUsText: {
        marginTop: ms(12),
        fontSize: typography.body,
        color: colors.black,
    },
    centerView: {
        marginLeft: ms(24),
        marginRight: ms(24),
    },
    title: {
        fontSize: typography.caption,
        color: colors.black,
        fontWeight: '600',
        marginTop: ms(31),
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
    chipView: {
        marginTop: ms(12),
    }
});