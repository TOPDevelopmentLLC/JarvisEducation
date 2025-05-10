import { View, Dimensions, StyleProp, ViewStyle } from "react-native";
import BaseHeader from "../headers/BaseHeader";

export interface BasePageProps {
    backgroundColor: string;
    displayHeader?: boolean;
    style?: StyleProp<ViewStyle>;
}

const BasePage: React.FC<React.PropsWithChildren<BasePageProps>> = ({
    backgroundColor, 
    displayHeader = true,
    style,
    children
}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <View style={[{
            backgroundColor: backgroundColor, 
            width: windowWidth,
            height: windowHeight,
        }, style]}>
            {displayHeader && <BaseHeader />}
            {children}
        </View>
    );
}

export default BasePage;