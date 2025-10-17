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
            <Text className="text-white font-semibold">Report Type: </Text>
            <Chip
                onPress={() => reportTypeSelected(ReportType.Attendance)}
                selected={selectedReportType === ReportType.Attendance}
                style={[
                    { alignSelf: 'flex-start', backgroundColor: selectedReportType === ReportType.Attendance ? '#9cb43c' : '#374151' }
                ]}
                textStyle={{ color: selectedReportType === ReportType.Attendance ? '#000000' : '#FFFFFF' }}
            >Attendance</Chip>
            <Chip
                onPress={() => reportTypeSelected(ReportType.Behavior)}
                selected={selectedReportType === ReportType.Behavior}
                style={[
                    { alignSelf: 'flex-start', backgroundColor: selectedReportType === ReportType.Behavior ? '#9cb43c' : '#374151' }
                ]}
                textStyle={{ color: selectedReportType === ReportType.Behavior ? '#000000' : '#FFFFFF' }}
            >Behavior</Chip>
            <Chip
                onPress={() => reportTypeSelected(ReportType.Conflict)}
                selected={selectedReportType === ReportType.Conflict}
                style={[
                    { alignSelf: 'flex-start', backgroundColor: selectedReportType === ReportType.Conflict ? '#9cb43c' : '#374151' }
                ]}
                textStyle={{ color: selectedReportType === ReportType.Conflict ? '#000000' : '#FFFFFF' }}
            >Conflict</Chip>
            <Chip
                onPress={() => reportTypeSelected(ReportType.Expelled)}
                selected={selectedReportType === ReportType.Expelled}
                style={[
                    { alignSelf: 'flex-start', backgroundColor: selectedReportType === ReportType.Expelled ? '#9cb43c' : '#374151' }
                ]}
                textStyle={{ color: selectedReportType === ReportType.Expelled ? '#000000' : '#FFFFFF' }}
            >Expelled</Chip>
            <Chip
                onPress={() => reportTypeSelected(ReportType.Mood)}
                selected={selectedReportType === ReportType.Mood}
                style={[
                    { alignSelf: 'flex-start', backgroundColor: selectedReportType === ReportType.Mood ? '#9cb43c' : '#374151' }
                ]}
                textStyle={{ color: selectedReportType === ReportType.Mood ? '#000000' : '#FFFFFF' }}
            >Mood</Chip>
            <Chip
                onPress={() => reportTypeSelected(ReportType.Secluded)}
                selected={selectedReportType === ReportType.Secluded}
                style={[
                    { alignSelf: 'flex-start', backgroundColor: selectedReportType === ReportType.Secluded ? '#9cb43c' : '#374151' }
                ]}
                textStyle={{ color: selectedReportType === ReportType.Secluded ? '#000000' : '#FFFFFF' }}
            >Secluded</Chip>
            <Chip
                onPress={() => reportTypeSelected(ReportType.SIP)}
                selected={selectedReportType === ReportType.SIP}
                style={[
                    { alignSelf: 'flex-start', backgroundColor: selectedReportType === ReportType.SIP ? '#9cb43c' : '#374151' }
                ]}
                textStyle={{ color: selectedReportType === ReportType.SIP ? '#000000' : '#FFFFFF' }}
            >SIP</Chip>
        </View>
    )
}

export default ReportTypeList;