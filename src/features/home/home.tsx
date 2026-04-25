import AppText from "@shared/components/AppText";
import { TouchableOpacity, View } from "react-native";

const Home = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'red' }}>
            <TouchableOpacity>
                <AppText>Logout</AppText>
            </TouchableOpacity>
        </View>
    )
}

export default Home;