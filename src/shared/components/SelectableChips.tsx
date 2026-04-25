import { colors } from "@design/colors";
import { typography } from "@design/typography";
import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";

type Chip = {
    id: string;
    label: string;
};

type Props = {
    data: Chip[];
    selectedIds: string[];
    onSelect: (id: string) => void;
    multiSelect?: boolean;
};

const SelectableChips: React.FC<Props> = ({
    data,
    selectedIds,
    onSelect,
    multiSelect = true,
}) => {
    const handlePress = (id: string) => {
        onSelect(id);
    };

    const renderItem = ({ item }: { item: Chip }) => {
        const isSelected = selectedIds.includes(item.id);

        return (
            <TouchableOpacity
                style={[Styles.chip, isSelected && Styles.selectedChip]}
                onPress={() => handlePress(item.id)}
                activeOpacity={0.7}
            >
                <Text style={[Styles.text, isSelected && Styles.selectedText]}>
                    {item.label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={2} // adjust based on UI
            columnWrapperStyle={{ gap: 10 }}
            contentContainerStyle={{ gap: 10 }}
            scrollEnabled={false}
        />
    );
};

export default SelectableChips;

const Styles = StyleSheet.create({
    chip: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: "#F7F7F7",
    },
    selectedChip: {
        borderColor: colors.primary,
    },
    text: {
        fontSize: typography.caption,
        color: colors.black,
    },
    selectedText: {
        color: colors.black,
        fontWeight: "600",
    },
});