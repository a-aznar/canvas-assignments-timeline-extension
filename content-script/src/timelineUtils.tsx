import classNames from "classnames";

import { _1_DAY_MILLIS, _7_DAYS_MILLIS } from "./timelineConstants";

export interface Assignment {
    id: number;
    unlock_at: string;
    due_at: string;
    name: string;
    course_id: number;
}

export interface Course {
    id: number;
    name: string;
}

export function createItems(
    assignments: Assignment[],
    markedAssignmentIds: number[],
): any[] {
    return assignments
        .filter((assignment) => assignment && assignment.due_at != null)
        .map((assignment) => ({
            start: assignment.unlock_at || new Date(new Date(assignment.due_at).getTime() - _1_DAY_MILLIS),
            end: assignment.due_at,
            content: assignment.name,
            id: assignment.id,
            group: assignment.course_id,
            className: generateAssignmentClassName(
                assignment,
                markedAssignmentIds,
            ),
        }));
}

export function createGroups(courses: Course[]): any[] {
    return courses.map((course) => ({
        id: course.id,
        content: course.name,
    }));
}

function generateAssignmentClassName(
    assignment: Assignment,
    markedAssignmentIds: number[],
): string {
    const nowDate = new Date();
    const assignmentDueDate = new Date(assignment.due_at);
    const assignmentUnlockDate = new Date(assignment.unlock_at);

    return classNames({
        done: markedAssignmentIds.includes(assignment.id),
        locked: assignment.unlock_at && assignmentUnlockDate > nowDate,
        past: assignment.due_at && assignmentDueDate < nowDate,
        soon:
            assignment.due_at &&
            assignmentDueDate > nowDate &&
            assignmentDueDate < new Date(Date.now() + _7_DAYS_MILLIS),
    });
}

export function createOptions(
    defaultOptions: any,
    lastStartTimelinePosition: any,
    lastEndTimelinePosition: any,
    locale: any,
    tooltipTemplateWithLocale: any,
    groupTemplate: any,
) {
    return {
        ...defaultOptions,
        start: lastStartTimelinePosition || new Date(),
        end:
            lastEndTimelinePosition ||
            new Date(Date.now() + _7_DAYS_MILLIS * 2),
        locale: locale,
        tooltip: {
            ...defaultOptions.tooltip,
            template: tooltipTemplateWithLocale,
        },
        groupTemplate: groupTemplate,
    };
}

export function updateTimelineData(
    timeline: any,
    assignments: Assignment[],
    courses: Course[],
    markedAssignmentIds: number[],
) {
    const groups = createGroups(courses);
    const items = createItems(assignments, markedAssignmentIds);

    if (timeline) {
        timeline.items.clear();
        timeline.items.add(items);
        timeline.groups.clear();
        timeline.groups.add(groups);
    }
}
