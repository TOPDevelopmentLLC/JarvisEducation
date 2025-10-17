import { Text, View } from "react-native"
import IconContainer, { IconType } from "components/IconContainer";
import { AccountType } from "lib/models/account";
import clsx from "clsx";


export interface NoDataViewProps {
    className?: string;
    dataType: DataType;
    currentSearchText: string;
}

export enum DataType {
    STUDENT = 'Student', 
    PARENT = 'Parent', 
    TEACHER = 'Teacher', 
    ADMIN = 'Admin',
    REPORT = 'Report',
    COURSE = 'Course',
}

const NoDataView = ({
    className,
    dataType,
    currentSearchText,
}: NoDataViewProps) => {
    const dataTypeAsString = dataType.toString().toLowerCase();

    return (
        <View className={clsx(className, "items-center justify-center")}>
            <IconContainer 
                iconProps={{
                    name: "account-search",
                    size: 64,
                    color: '#4B5563',
                    type: IconType.MaterialCommunityIcons
                }} 
            />            
            <Text className="text-gray-400 text-lg mt-4">{`No ${dataTypeAsString}s found`}</Text>
            <Text className="text-gray-500 text-sm mt-2">
                {currentSearchText ? 'Try a different search term' : `Add your first ${dataTypeAsString} to get started`}
            </Text>
        </View>
    )
}

export default NoDataView;