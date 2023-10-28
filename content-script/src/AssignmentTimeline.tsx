import ReactDOMServer from "react-dom/server";
import React, { useEffect, useState, useRef } from "react";
import Timeline from "react-vis-timeline";

import { fetchUserLocale, fetchCoursesAndAssignments } from "./dataService";
import TooltipTemplate from "./TooltipTemplate";
import GroupTemplate from "./GroupTemplate";
import { useSyncedStateWithChromeStorage } from "./useSyncedStateWithChromeStorage";
import { defaultOptions, defaultProps } from "./timelineConstants";
import {
    Assignment,
    Course,
    createOptions,
    updateTimelineData,
} from "./timelineUtils";
import { DEFAULT_LOCALE } from "./i18n";

import "./AssignmentTimeline.css";

interface AssignmentTimelineProps {
    markedAssignments: number[];
    baseUrl: string;
    timelineStart: string | undefined;
    timelineEnd: string | undefined;
}

const AssignmentTimeline: React.FC<AssignmentTimelineProps> = ({
    markedAssignments,
    baseUrl,
    timelineStart,
    timelineEnd,
}) => {
    const timelineRef = useRef<any>(null);
    const [locale, setLocale] = useState(DEFAULT_LOCALE);
    const [markedAssignmentIds, setMarkedAssignmentIds] =
        useSyncedStateWithChromeStorage(
            "markedAssignmentIds",
            markedAssignments,
        );
    const [courses, setCourses] = useState<Course[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [lastStartTimelinePosition, setLastStartTimelinePosition] =
        useSyncedStateWithChromeStorage(
            "lastStartTimelinePosition",
            timelineStart,
        );
    const [lastEndTimelinePosition, setLastEndTimelinePosition] =
        useSyncedStateWithChromeStorage("lastEndTimelinePosition", timelineEnd);

    const tooltipTemplateWithLocale = (item: any, editedData: any) => {
        const tooltipElement = TooltipTemplate({ item, editedData, locale });
        return ReactDOMServer.renderToString(
            tooltipElement as React.ReactElement,
        );
    };

    const groupTemplate = (item: any, _element: any, _data: any) => {
        const groupTemplate = GroupTemplate({ group: item, baseUrl });
        return ReactDOMServer.renderToString(
            groupTemplate as React.ReactElement,
        );
    };

    const rangeChangedHandler = (props: any) => {
        if (props.start) {
            setLastStartTimelinePosition(props.start.toISOString());
        }
        if (props.end) {
            setLastEndTimelinePosition(props.end.toISOString());
        }
    };

    const clickHandler = (props: any) => {
        if (!props.item) return;
        const id = props.item;

        setMarkedAssignmentIds((prevIds: number[]) =>
            prevIds.includes(id)
                ? prevIds.filter((itemId) => itemId !== id)
                : [...prevIds, id],
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userLocale = await fetchUserLocale(baseUrl);
                setLocale(userLocale);

                const data = await fetchCoursesAndAssignments(baseUrl);
                if (data) {
                    setCourses(data.courses);
                    setAssignments(data.assignments.flat());
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []); // Only run once

    useEffect(() => {
        if (courses.length > 0 && assignments.length > 0) {
            updateTimelineData(
                timelineRef.current,
                assignments,
                courses,
                markedAssignmentIds,
            );
        }
    }, [courses, assignments, markedAssignmentIds]);

    const options = createOptions(
        defaultOptions,
        lastStartTimelinePosition,
        lastEndTimelinePosition,
        locale,
        tooltipTemplateWithLocale,
        groupTemplate,
    );

    return (
        <div id="assignment-timeline">
            <Timeline
                {...defaultProps}
                ref={timelineRef}
                options={options}
                clickHandler={clickHandler}
                rangechangedHandler={rangeChangedHandler}
            />
        </div>
    );
};

export default AssignmentTimeline;
