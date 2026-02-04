import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { Platform } from 'react-native';
import { Report } from 'lib/models/report';
import { StudentReport } from 'lib/models/report';

interface ReportExportData {
    reportType: string;
    description: string;
    reportedByName: string;
    studentName?: string;
    moodType?: string | null;
}

class ReportExportService {
    private formatDate(): string {
        const now = new Date();
        return now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    private createReportSection(report: ReportExportData, includeStudentName: boolean = false): Paragraph[] {
        const paragraphs: Paragraph[] = [];

        // Report Type
        paragraphs.push(
            new Paragraph({
                children: [
                    new TextRun({ text: 'Report Type: ', bold: true }),
                    new TextRun({ text: report.reportType })
                ],
                spacing: { after: 200 }
            })
        );

        // Student Name (if applicable)
        if (includeStudentName && report.studentName) {
            paragraphs.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Student: ', bold: true }),
                        new TextRun({ text: report.studentName })
                    ],
                    spacing: { after: 200 }
                })
            );
        }

        // Mood Type (if applicable)
        if (report.moodType) {
            paragraphs.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Mood Type: ', bold: true }),
                        new TextRun({ text: report.moodType })
                    ],
                    spacing: { after: 200 }
                })
            );
        }

        // Description
        paragraphs.push(
            new Paragraph({
                children: [
                    new TextRun({ text: 'Description: ', bold: true }),
                ],
                spacing: { after: 100 }
            })
        );

        paragraphs.push(
            new Paragraph({
                children: [
                    new TextRun({ text: report.description || 'No description provided' })
                ],
                spacing: { after: 200 }
            })
        );

        // Reported By
        paragraphs.push(
            new Paragraph({
                children: [
                    new TextRun({ text: 'Reported By: ', bold: true }),
                    new TextRun({ text: report.reportedByName })
                ],
                spacing: { after: 400 }
            })
        );

        return paragraphs;
    }

    async exportSingleReport(report: Report, studentName?: string): Promise<void> {
        const reportData: ReportExportData = {
            reportType: report.type,
            description: report.description || '',
            reportedByName: report.reportedByName,
            studentName: studentName,
            moodType: undefined
        };

        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    // Title
                    new Paragraph({
                        text: 'Report Export',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { after: 400 }
                    }),
                    // Export Date
                    new Paragraph({
                        children: [
                            new TextRun({ text: 'Export Date: ', bold: true }),
                            new TextRun({ text: this.formatDate() })
                        ],
                        spacing: { after: 400 }
                    }),
                    // Separator
                    new Paragraph({
                        text: '─'.repeat(50),
                        spacing: { after: 400 }
                    }),
                    // Report Content
                    ...this.createReportSection(reportData, !!studentName)
                ]
            }]
        });

        await this.saveAndShareDocument(doc, `Report_${report.type}_${Date.now()}.docx`);
    }

    async exportStudentReports(reports: StudentReport[], studentName: string): Promise<void> {
        const sections: Paragraph[] = [
            // Title
            new Paragraph({
                text: `Reports for ${studentName}`,
                heading: HeadingLevel.HEADING_1,
                spacing: { after: 400 }
            }),
            // Export Date
            new Paragraph({
                children: [
                    new TextRun({ text: 'Export Date: ', bold: true }),
                    new TextRun({ text: this.formatDate() })
                ],
                spacing: { after: 200 }
            }),
            // Total Reports
            new Paragraph({
                children: [
                    new TextRun({ text: 'Total Reports: ', bold: true }),
                    new TextRun({ text: reports.length.toString() })
                ],
                spacing: { after: 400 }
            }),
        ];

        // Add each report
        reports.forEach((report, index) => {
            // Report header
            sections.push(
                new Paragraph({
                    text: `Report ${index + 1}`,
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 400, after: 200 }
                })
            );

            // Separator
            sections.push(
                new Paragraph({
                    text: '─'.repeat(30),
                    spacing: { after: 200 }
                })
            );

            const reportData: ReportExportData = {
                reportType: report.reportType,
                description: report.description,
                reportedByName: report.reportedByName,
                moodType: report.moodType
            };

            sections.push(...this.createReportSection(reportData, false));
        });

        const doc = new Document({
            sections: [{
                properties: {},
                children: sections
            }]
        });

        const sanitizedName = studentName.replace(/[^a-zA-Z0-9]/g, '_');
        await this.saveAndShareDocument(doc, `Reports_${sanitizedName}_${Date.now()}.docx`);
    }

    private async saveAndShareDocument(doc: Document, filename: string): Promise<void> {
        try {
            // Generate the document as a blob
            const blob = await Packer.toBlob(doc);

            if (Platform.OS === 'web') {
                // Web: Create a download link and trigger download
                await this.downloadOnWeb(blob, filename);
            } else {
                // Native (iOS/Android): Use expo-file-system and expo-sharing
                await this.shareOnNative(blob, filename);
            }
        } catch (error) {
            console.error('Failed to export document:', error);
            throw error;
        }
    }

    private async downloadOnWeb(blob: Blob, filename: string): Promise<void> {
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL object
        URL.revokeObjectURL(url);
    }

    private async shareOnNative(blob: Blob, filename: string): Promise<void> {
        // Dynamically import native modules to avoid web bundling issues
        const FileSystem = await import('expo-file-system');
        const Sharing = await import('expo-sharing');

        // Convert blob to base64
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
            reader.onloadend = () => {
                const base64data = reader.result as string;
                // Remove the data URL prefix to get just the base64 string
                const base64 = base64data.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
        });
        reader.readAsDataURL(blob);

        const base64 = await base64Promise;

        // Save to file system
        const fileUri = FileSystem.documentDirectory + filename;
        await FileSystem.writeAsStringAsync(fileUri, base64, {
            encoding: FileSystem.EncodingType.Base64
        });

        // Check if sharing is available
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
            await Sharing.shareAsync(fileUri, {
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                dialogTitle: 'Export Report'
            });
        } else {
            throw new Error('Sharing is not available on this device');
        }
    }
}

export const reportExportService = new ReportExportService();
export default reportExportService;
