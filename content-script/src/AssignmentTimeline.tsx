import React, { useEffect, useState, useRef } from 'react';
import Timeline from 'react-vis-timeline';

import { fetchUserLocale, fetchCourses, fetchAssignmentsForCourse, DEFAULT_LOCALE, fetchCoursesAndAssignments } from './dataService';

import './AssignmentTimeline.css';

interface Assignment {
  id: number;
  unlock_at: string;
  due_at: string;
  name: string;
  course_id: number;
}

interface Course {
  id: number;
  name: string;
}

export const createTooltipTemplate = (item: any, _editedData: any) => {
  const today = new Date();
  const dueDate = new Date(item.end);
  const unlockDate = new Date(item.start);
  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  const daysUntilUnlock = Math.ceil((unlockDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

  const title = `<strong>${item.content}<strong>`;
  const unlockInfo = `Unlock Date: ${unlockDate.toDateString()} (${daysUntilUnlock >= 0 ? daysUntilUnlock + ' days left' : 'already unlocked'})`;
  const dueInfo = `Due Date: ${dueDate.toDateString()} (${daysUntilDue >= 0 ? daysUntilDue + ' days left' : 'past due'})`;
  const markAsDoneHint = `<span style="font-size: 0.8em; color: #999;">(Hint: Click to mark as done)</span>`;

  return `
      <div>
        ${title}<br><br>
        ${unlockInfo}<br>
        ${dueInfo}<br><br>
        ${markAsDoneHint}
      </div>
  `;
};

const defaultProps = {
  initialGroups: [],
  initialItems: [],
};

const defaultOptions = {
  width: '100%',
  minHeight: '250px',
  editable: false,
  selectable: false,
  autoResize: true,
  stack: false, // false == overlap items
  orientation: 'top',
  start: new Date(),
  showTooltips: true,
  xss: { disabled: true, },
  zoomMin: 1000 * 60 * 60 * 24 * 7 * 1, // 1 week in milliseconds
  zoomMax: 1000 * 60 * 60 * 24 * 31 * 3, // about 3 months in milliseconds,
  tooltip: {
    delay: 0,
    followMouse: true,
    overflowMethod: "cap" as "cap",
    template: createTooltipTemplate,
  },
}

const createItems = (assignments: Assignment[], markedAssignmentIds: number[]) =>
  assignments.filter(assignment => assignment && assignment.due_at != null)
    .map((assignment) => ({
      start: assignment.unlock_at,
      end: assignment.due_at,
      content: assignment.name,
      id: assignment.id,
      group: assignment.course_id,
      className: generateClassName(assignment, markedAssignmentIds),
  }));

const createGroups = (courses: Course[]) =>
  courses.map(course => ({
    id: course.id,
    content: course.name,
  }));

const updateTimelineData = (timeline: any, items: any[], groups: any[]) => {
  if (timeline) {
    timeline.items.clear();
    timeline.items.add(items);
    timeline.groups.clear();
    timeline.groups.add(groups);
  }
};

interface AssignmentTimelineProps {
  initialMarkedAssignments: number[];
  baseUrl: string;
}

const AssignmentTimeline: React.FC<AssignmentTimelineProps> = ({ initialMarkedAssignments, baseUrl }) => {
  const timelineRef = useRef<any>(null);
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [markedAssignmentIds, setMarkedAssignmentIds] = useState<number[]>(initialMarkedAssignments);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);


  const clickHandler = (props: any) => {
    if (!props.item) return;

    const id = props.item;
    setMarkedAssignmentIds((prevMarkedIds) => {
      const markedAssignmentIds = prevMarkedIds.includes(id)
        ? prevMarkedIds.filter(itemId => itemId !== id)
        : [...prevMarkedIds, id];
  
      chrome.storage.local.set({ markedAssignmentIds });
      return markedAssignmentIds;
    });
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
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, []); // Only run once
  
  useEffect(() => {
    if (courses.length > 0 && assignments.length > 0) {
      const groups = createGroups(courses);
      const items = createItems(assignments, markedAssignmentIds);
      updateTimelineData(timelineRef.current, items, groups);
    }
  }, [courses, assignments, markedAssignmentIds]);

  const options = { ...defaultOptions, locale: locale };

  return (
    <div id="assignment-timeline">
      <Timeline 
        {...defaultProps} 
        ref={timelineRef}        
        options={options} 
        clickHandler={clickHandler}
      />
    </div>
  );
};

export default AssignmentTimeline;

function generateClassName(assignment: Assignment, markedAssignmentIds: number[]): any {
  const classNames = [];
  if (markedAssignmentIds.includes(assignment.id)) {
    classNames.push('done');
  }
  if (assignment.unlock_at && new Date(assignment.unlock_at) > new Date()) {
    classNames.push('locked');
  }
  if (assignment.due_at && new Date(assignment.due_at) < new Date()) {
    classNames.push('past');
  } else if (assignment.due_at && new Date(assignment.due_at) < new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)) {
    classNames.push('soon');
  }
  return classNames.join(' ');
}

