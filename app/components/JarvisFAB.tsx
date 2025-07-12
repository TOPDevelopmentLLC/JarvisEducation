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

    const actions = [];
    if (handleAddButtonPressed) actions.push({ icon: 'plus', onPress: handleAddButtonPressed });
    if (handleEditButtonPressed) actions.push({ icon: 'circle-edit-outline', onPress: handleEditButtonPressed })
    
    return (
        <FAB.Group
            open={isFABOpen}
            icon={isFABOpen ? 'close' : 'plus'}
            visible={true}
            actions={actions}
            onStateChange={({open}) => setIsFABOpen(open)}
            color={'#000000'}
            fabStyle={{
                backgroundColor: '#9cb43c',
            }}
        />
    )
}