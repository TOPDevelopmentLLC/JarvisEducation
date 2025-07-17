import clsx from "clsx";
import { ReportType } from "lib/models/report";
import { View, Text } from "react-native";
import { Chip } from "react-native-paper";


export interface ReportTypeListProps {
    className?: string;
    selectedReportType: ReportType|null;
    reportTypeSelected: (reportType:ReportType) => void;
}

const ReportTypeList = ({
    className,
    selectedReportType,
    reportTypeSelected,
}: ReportTypeListProps) => {
    return (
        <View className={clsx("flex-row flex-wrap items-center gap-2",className)}>
            <Text>Report Type: </Text>
            <Chip 
                onPress={() => reportTypeSelected(ReportType.Attendance)}
                selected={selectedReportType === ReportType.Attendance}
                style={[                        
                    { alignSelf: 'flex-start' },
                    selectedReportType === ReportType.Attendance && { backgroundColor: '#8080c2'}
                ]}
            >Attendance</Chip>
            <Chip 
                onPress={() => reportTypeSelected(ReportType.Behavior)}
                selected={selectedReportType === ReportType.Behavior}
                style={[
                    { alignSelf: 'flex-start' },
                    selectedReportType === ReportType.Behavior && { backgroundColor: '#8080c2'}
                ]}
            >Behavior</Chip>
            <Chip 
                onPress={() => reportTypeSelected(ReportType.Conflict)}
                selected={selectedReportType === ReportType.Conflict}
                style={[
                    { alignSelf: 'flex-start' },
                    selectedReportType === ReportType.Conflict && { backgroundColor: '#8080c2'}
                ]}
            >Conflict</Chip>
            <Chip 
                onPress={() => reportTypeSelected(ReportType.Expelled)}
                selected={selectedReportType === ReportType.Expelled}
                style={[
                    { alignSelf: 'flex-start' },
                    selectedReportType === ReportType.Expelled && { backgroundColor: '#8080c2'}
                ]}
            >Expelled</Chip>
            <Chip 
                onPress={() => reportTypeSelected(ReportType.Mood)}
                selected={selectedReportType === ReportType.Mood}
                style={[
                    { alignSelf: 'flex-start' },
                    selectedReportType === ReportType.Mood && { backgroundColor: '#8080c2'}
                ]}
            >Mood</Chip>
            <Chip 
                onPress={() => reportTypeSelected(ReportType.Secluded)}
                selected={selectedReportType === ReportType.Secluded}
                style={[
                    { alignSelf: 'flex-start' },
                    selectedReportType === ReportType.Secluded && { backgroundColor: '#8080c2'}
                ]}
            >Secluded</Chip>
            <Chip 
                onPress={() => reportTypeSelected(ReportType.SIP)}
                selected={selectedReportType === ReportType.SIP}
                style={[
                    { alignSelf: 'flex-start' },
                    selectedReportType === ReportType.SIP && { backgroundColor: '#8080c2'}
                ]}
            >SIP</Chip>
        </View>
    )
}

export default ReportTypeList;