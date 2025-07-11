import { useState } from "react";
import { FAB } from "react-native-paper";

export interface JarvisFABProps {
    handleAddButtonPressed?: () => void;
    handleEditButtonPressed?: () => void;
}

export default function JarvisFAB({
    handleAddButtonPressed,
    handleEditButtonPressed
}: JarvisFABProps) {
    const [isFABOpen,setIsFABOpen] = useState(false);
    
    return (
        <FAB.Group
            open={isFABOpen}
            icon={isFABOpen ? 'close' : 'plus'}
            visible={true}
            actions={[
                { icon: 'circle-edit-outline', onPress: handleEditButtonPressed },
                { icon: 'plus', onPress: handleAddButtonPressed },
            ]}
            onStateChange={({open}) => setIsFABOpen(open)}
            color={'#000000'}
            fabStyle={{
                backgroundColor: '#9cb43c',
            }}
        />
    )
}