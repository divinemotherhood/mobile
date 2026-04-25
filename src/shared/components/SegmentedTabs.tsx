import { colors } from "@design/colors";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StyleProp } from "react-native";

type Option = {
    label: string;
    value: string;
};

type Props = {
    options: Option[];
    selected: string;
    onChange: (value: string) => void;
    style?: StyleProp<any>;
};

const SegmentedTabs: React.FC<Props> = ({ options, selected, onChange, style }) => {
    return (
        <View style={[styles.container, style]}>
            {options.map((item) => {
                const isActive = selected === item.value;
                return (
                    <TouchableOpacity
                        key={item.value}
                        style={[styles.tab, isActive && styles.activeTab]}
                        onPress={() => onChange(item.value)}
                    >
                        <Text style={[styles.text, isActive && styles.activeText]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default SegmentedTabs;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: colors.stroke,
        borderRadius: 8,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 6,
    },
    activeTab: {
        backgroundColor: colors.primary,
    },
    text: {
        color: colors.black,
        fontWeight: "500",
    },
    activeText: {
        color: colors.white,
        fontWeight: "600",
    },
});