import { ScrollView, Text, ViewStyle } from "react-native";
import TeamMemberListItem, { TeamMember } from "./TeamMemberListItem";

export interface TeamMemberListProps {
    className?: string;
    members: TeamMember[];
    onDeleteMember?: (memberId: string, memberType: 'teacher' | 'admin') => void;
    style?: ViewStyle;
}

const TeamMemberList = ({
    className,
    members,
    onDeleteMember,
    style
}: TeamMemberListProps) => {
    return (
        <ScrollView className={className} style={style} showsVerticalScrollIndicator={true}>
            {members.length > 0 ? (
                members.map((member) => (
                    <TeamMemberListItem
                        key={`${member.type}:${member.id}`}
                        member={member}
                        onDelete={onDeleteMember}
                    />
                ))
            ) : (
                <Text className="text-gray-400 text-center py-8">No members assigned</Text>
            )}
        </ScrollView>
    );
};

export default TeamMemberList;
