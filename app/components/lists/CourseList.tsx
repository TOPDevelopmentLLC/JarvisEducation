import { Course } from "lib/models/course";
import CourseListItem from "components/lists/CourseListItem";
import { FlatList } from "react-native";
import { useStoredCourseData } from "components/contexts/CourseContext";
import { router } from "expo-router";


export interface CourseListProps {
    className?: string;
    courses: Course[];
}

const CourseList = ({
    className,
    courses,
}: CourseListProps) => {
    const { selectedCourse, setSelectedCourse } = useStoredCourseData();

    const handleDetailsButtonPressed = (course: Course) => {
        setSelectedCourse(course);
        router.push({
            pathname: '/pages/classes/CourseDetailsPage',
            params: {
                edit: 0
            }
        });
    }

    const handleListItemClicked = (course: Course) => {
        if (selectedCourse?.courseId === course.courseId) {
            setSelectedCourse(null);
        } else {
            setSelectedCourse(course);
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
                        className={data.item.courseId === selectedCourse?.courseId ? 'bg-selectedListItemBackgroundColor' : 'bg-listItemBackgroundColor'}
                        course={data.item} 
                        detailsButtonPressed={handleDetailsButtonPressed}
                        onListItemClicked={() => handleListItemClicked(data.item)}
                    />
                )
            }}
        />
    )
}

export default CourseList;