import { colors } from "@design/colors";
import { ms } from "@design/responsive";
import { typography } from "@design/typography";
import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from "react-native";

type Props = {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

const Button = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    style,
    textStyle,
}: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                disabled && styles.disabled,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text allowFontScaling={false} style={[styles.text, textStyle]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        height: ms(40),
        borderRadius: 7,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: colors.white,
        fontSize: typography.regular,
        fontWeight: "600",
    },
    disabled: {
        opacity: 0.5,
    },
});