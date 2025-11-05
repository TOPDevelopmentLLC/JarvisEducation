import { Text, View } from "react-native";
import clsx from "clsx";
import DeleteButton from "components/buttons/DeleteButton";

export interface TeamMember {
    id: string;
    name: string;
    type: 'teacher' | 'admin';
}

export interface TeamMemberListItemProps {
    className?: string;
    member: TeamMember;
    onDelete?: (memberId: string, memberType: 'teacher' | 'admin') => void;
}

const TeamMemberListItem = ({
    className,
    member,
    onDelete
}: TeamMemberListItemProps) => {
    return (
        <View
            className={clsx(
                "flex-row items-center bg-gray-700 rounded-xl p-4 mb-3 justify-between",
                className
            )}>
            <View className="flex-1">
                <Text className="text-white text-lg font-semibold">{member.name}</Text>
                <Text className="text-gray-400 text-sm mt-1">
                    {member.type === 'teacher' ? 'Teacher' : 'Administrator'}
                </Text>
            </View>
            {onDelete && (
                <DeleteButton
                    onIconClicked={() => onDelete(member.id, member.type)}
                />
            )}
        </View>
    );
};

export default TeamMemberListItem;
