import clsx from "clsx";
import IconContainer, { IconType } from "components/IconContainer";
import { MoodType } from "lib/models/report";
import { View, Text } from "react-native";
import { Chip } from "react-native-paper";


export interface MoodLabelListProps {
    className?: string;
    selectedMoodType: MoodType|null;
    moodTypeSelected: (moodType:MoodType) => void;
}

const MoodLabelList = ({
    className,
    selectedMoodType,
    moodTypeSelected,
}: MoodLabelListProps) => {
    return (
        <View className={clsx("flex-row items-center gap-2", className)}>
            <Text>Mood Type:</Text>
            <Chip 
                onPress={() => moodTypeSelected(MoodType.Green)}
                selected={selectedMoodType === MoodType.Green}
                style={[
                    { alignSelf: 'flex-start'},
                    selectedMoodType === MoodType.Green && { backgroundColor: '#8080c2'}
                ]}
                icon={() => (
                    <IconContainer iconProps={{
                        name: 'bookmark',
                        type: IconType.Ionicons,
                        color: '#008000',
                        size: 24
                    }} />
                )}
            >Green</Chip>
            <Chip 
                onPress={() => moodTypeSelected(MoodType.Blue)}
                selected={selectedMoodType === MoodType.Blue}
                style={[
                    { alignSelf: 'flex-start' },
                    selectedMoodType === MoodType.Blue && { backgroundColor: '#8080c2'}
                ]}
                icon={() => (
                    <IconContainer iconProps={{
                        name: 'bookmark',
                        type: IconType.Ionicons,
                        color: '#0000FF',
                        size: 24
                    }} />
                )}
            >Blue</Chip>
            <Chip 
                onPress={() => moodTypeSelected(MoodType.Yellow)}
                selected={selectedMoodType === MoodType.Yellow}
                style={[
                    { alignSelf: 'flex-start' },
                    selectedMoodType === MoodType.Yellow && { backgroundColor: '#8080c2'}
                ]}
                icon={() => (
                    <IconContainer iconProps={{
                        name: 'bookmark',
                        type: IconType.Ionicons,
                        color: '#FFFF00',
                        size: 24
                    }} />
                )}
            >Yellow</Chip>
            <Chip 
                onPress={() => moodTypeSelected(MoodType.Red)}
                selected={selectedMoodType === MoodType.Red}
                style={[
                    { alignSelf: 'flex-start' },
                    selectedMoodType === MoodType.Red && { backgroundColor: '#8080c2'}
                ]}
                icon={() => (
                    <IconContainer iconProps={{
                        name: 'bookmark',
                        type: IconType.Ionicons,
                        color: '#FF0000',
                        size: 24
                    }} />
                )}
            >Red</Chip>
        </View>
    )
}

export default MoodLabelList;