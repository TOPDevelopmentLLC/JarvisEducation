import { IconButtonProps } from "components/buttons/IconButton";
import BasePage from "components/pages/BasePage";
import DetailsHeader from "components/headers/DetailsHeader";
import { IconType } from "components/IconContainer";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";


interface MenuHeaderPageProps {
    title?: string;
    rightActionIcon?: IconButtonProps;
}

const DetailsHeaderPage: React.FC<React.PropsWithChildren<MenuHeaderPageProps>> = ({
    title = '', 
    rightActionIcon = undefined,
    children
}) => {
    const nav = useNavigation();
    const handleMenuButtonClicked = () => {
        nav.dispatch(DrawerActions.toggleDrawer());
    }

    return (
        <BasePage>
            <DetailsHeader 
                title={title}
                rightActionIcon={rightActionIcon}
                leftActionIcon={{
                    iconProps: {
                        name:'menu',
                        size:24,
                        color:'#000000',
                        type:IconType.Feather
                    },
                    onIconClicked: handleMenuButtonClicked
                }}
            />
            {children}
        </BasePage>
    );
}

export default DetailsHeaderPage;