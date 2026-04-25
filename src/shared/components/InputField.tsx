import { colors } from "@design/colors";
import { ms } from "@design/responsive";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface InputFieldProps extends TextInputProps {
}

const InputField: React.FC<InputFieldProps> = ({
    children,
    style,
    ...rest
}) => {
    return (
        <TextInput {...rest} style={[style, Styles.input]} />
    )
}

export default InputField;

const Styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 8,
        padding: ms(13),
        marginTop: ms(6),
        backgroundColor: colors.fill,
    }
})