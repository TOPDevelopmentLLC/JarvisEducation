import { Course } from "lib/course";
import CourseListItem from "components/lists/CourseListItem";


export interface CourseListProps {
    courses: Course[];
}

const CourseList = ({
    courses
}: CourseListProps) => {

    return (
        <>
            {
                courses.map(course => {
                    return (
                        <CourseListItem course={course} />
                    )
                })
            }
        </>
    )
}

export default CourseList;