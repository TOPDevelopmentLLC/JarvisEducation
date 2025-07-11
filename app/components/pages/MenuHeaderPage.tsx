import { useNavigation, useRouter } from "expo-router";
import { IconType } from "components/IconContainer";
import { IconButtonProps } from "components/buttons/IconButton";
import BaseHeader from "components/headers/BaseHeader";
import BasePage from "components/pages/BasePage";
import { DrawerActions } from "@react-navigation/native";

interface MenuHeaderPageProps {
    title?: string;
    rightActionIcon?: IconButtonProps;
  }
  
const MenuHeaderPage: React.FC<React.PropsWithChildren<MenuHeaderPageProps>> = ({ 
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
            <BaseHeader 
                title={title}
                leftActionIcon={{
                    iconProps: {
                        name:'menu',
                        size:24,
                        color:'#000000',
                        type:IconType.Feather
                    },
                    onIconClicked: handleMenuButtonClicked
                }}
                rightActionIcon={rightActionIcon}
            />
            {children}
        </BasePage>
    );
};

export default MenuHeaderPage;