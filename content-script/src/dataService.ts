import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./i18n";

const USER_PATH = "/api/v1/users/self";
const COURSES_PATH = "/api/v1/courses";
const COURSE_ASSIGNMENTS_PATH = (courseId: number) =>
    `/api/v1/courses/${courseId}/assignments`;

const SEVEN_DAYS_AGO_DATE = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

export const fetchUserLocale = async (baseUrl: string) => {
    const USER_URL = baseUrl + USER_PATH;

    try {
        const response = await fetch(USER_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch user locale");
        }

        const data = await response.json();
        const rawLocale = data.locale?.substr(0, 2);

        return SUPPORTED_LOCALES.includes(rawLocale)
            ? rawLocale
            : DEFAULT_LOCALE;
    } catch (error) {
        console.error("Error fetching user locale:", error);
        return DEFAULT_LOCALE;
    }
};

export const fetchCourses = async (baseUrl: string) => {
    const COURSES_URL = baseUrl + COURSES_PATH;

    const response = await fetch(COURSES_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch courses");
    }
    return response.json();
};

export const fetchAssignmentsForCourse = async (
    baseUrl: string,
    courseId: number,
) => {
    const COURSE_ASSIGNMENTS_URL = baseUrl + COURSE_ASSIGNMENTS_PATH(courseId);

    const response = await fetch(COURSE_ASSIGNMENTS_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch assignments for course ${courseId}`);
    }
    return response.json();
};

export const fetchCoursesAndAssignments = async (baseUrl: string) => {
    try {
        let courses = await fetchCourses(baseUrl);
        const assignmentsData = await Promise.all(
            courses.map((course: { id: number }) =>
                fetchAssignmentsForCourse(baseUrl, course.id),
            ),
        );

        courses = courses.filter(
            (_course: any, index: number) =>
                assignmentsData[index].length > 0
                && assignmentsData[index].some((assignment: { due_at: string | number | Date; }) => new Date(assignment.due_at) > SEVEN_DAYS_AGO_DATE)
        );

        const assignments = assignmentsData.filter(
            (assignmentData) => assignmentData.length > 0,
        );

        return { courses, assignments };
    } catch (error) {
        console.error("Error:", error);
    }
};
