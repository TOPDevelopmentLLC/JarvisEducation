import { View } from "react-native";
import BaseHeader from "components/headers/BaseHeader";
import clsx from "clsx";

export interface BasePageProps {
    className?: string;
    displayHeader?: boolean;
}

const BasePage: React.FC<React.PropsWithChildren<BasePageProps>> = ({
    className,
    displayHeader = true,
    children
}) => {

    return (
        <View className={clsx(className, "flex-1 w-full h-full bg-black")}>
            {displayHeader && <BaseHeader />}
            {children}
        </View>
    );
}

export default BasePage;