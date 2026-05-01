import { Platform } from "react-native";

export const Fonts = {
    LarkenMedium: Platform.OS == 'android' ? 'Larken-Medium' : 'LarkenDEMO-Medium',
    InstrumentSansRegular: Platform.OS == 'android' ? 'InstrumentSans-Regular' : 'InstrumentSansCondensed-Regular',
    InstrumentSansMedium: Platform.OS == 'android' ? 'InstrumentSans-Medium' : 'InstrumentSansSemiCondensed-Medium',
}