import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { IconType } from "components/IconContainer";
import { IconButtonProps } from "components/buttons/IconButton";
import BaseHeader from "components/headers/BaseHeader";
import BasePage from "components/pages/BasePage";

interface MenuHeaderPageProps {
    backgroundColor: string;
    title?: string;
    rightActionIcon?: IconButtonProps;
  }
  
const MenuHeaderPage: React.FC<React.PropsWithChildren<MenuHeaderPageProps>> = ({ 
    backgroundColor,
    title = '', 
    rightActionIcon = undefined,
    children
}) => {
    const router = useRouter();

    const handleMenuButtonClicked = () => {
        //TODO: Open Menu Drawer
    }

    return (
        <BasePage backgroundColor={backgroundColor}>
            <BaseHeader 
                title={title}
                leftActionIcon={{
                    iconProps: {
                        name:'menu',
                        size:24,
                        color:'white',
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

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#9cb43c',
      height: 30,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
});

export default MenuHeaderPage;