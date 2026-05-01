declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
  }

declare module "react-native-flags" {
  import React from "react";
  import { StyleProp, ViewStyle } from "react-native";

  type FlagSize = 16 | 24 | 32 | 48 | 64;
  type FlagType = "flat" | "shiny";

  export interface FlagProps {
    code: string;
    size?: FlagSize;
    type?: FlagType;
    style?: StyleProp<ViewStyle>;
  }

  const Flag: React.ComponentType<FlagProps>;
  export default Flag;
}