import React from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";

interface AppTextProps extends TextProps {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
}

const AppText: React.FC<AppTextProps> = ({
    children,
    style,
    ...rest
}) => {
    return (
        <Text
            allowFontScaling={false}
            style={style}
            {...rest}
        >
            {children}
        </Text>
    );
};

export default AppText;