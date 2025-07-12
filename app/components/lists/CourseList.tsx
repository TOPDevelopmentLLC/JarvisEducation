import { Course } from "lib/models/course";
import CourseListItem from "components/lists/CourseListItem";
import { FlatList } from "react-native";
import { useState } from "react";


export interface CourseListProps {
    className?: string;
    courses: Course[];
}

const CourseList = ({
    className,
    courses,
}: CourseListProps) => {
    const [selectedId, setSelectedId] = useState<string|null>(null);

    const handleDetailsButtonPressed = (course: Course) => {
    
    }

    const handleListItemClicked = (adminId:string) => {
        if (selectedId === adminId) {
            setSelectedId(null);
        } else {
            setSelectedId(adminId);
        }
    }

    return (
        <FlatList
            className={className}
            data={courses}
            keyExtractor={(item) => item.courseId}
            renderItem={data => {
                return (
                    <CourseListItem 
                        className={data.item.courseId === selectedId ? 'bg-selectedListItemBackgroundColor' : 'bg-listItemBackgroundColor'}
                        course={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                        onListItemClicked={() => handleListItemClicked(data.item.courseId)}
                    />
                )
            }}
        />
    )
}

export default CourseList;