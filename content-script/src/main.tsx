import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import AssignmentTimeline from "./AssignmentTimeline";

const CONTENT_SCRIPT_ROOT_ELEMENT_ID = "content-script-root";
const dashboard = document.querySelector("#main") as HTMLElement;
const dashboardHeaderContainer = document.querySelector(
    "#not_right_side",
);

if (window.location.pathname === "/") {
    if (dashboard) {
        dashboard.style.paddingLeft = "5%";
        dashboard.style.paddingTop = "2%";
        dashboard.style.paddingRight = "5%";
    }
    
    const wrapper = document.querySelector("#wrapper") as HTMLElement;
    if (wrapper) {
        wrapper.classList.remove("ic-Layout-wrapper");
    }
    
    const footer = document.querySelector("#footer") as HTMLElement;
    if (footer) {
        footer.style.paddingLeft = "5%";
    }
}

const app = document.createElement("div");
app.id = CONTENT_SCRIPT_ROOT_ELEMENT_ID;

// Make sure the element that you want to mount the app to has loaded. You can
// also use `append` or insert the app using another method:
// https://developer.mozilla.org/en-US/docs/Web/API/Element#methods
//
// Also control when the content script is injected from the manifest.json:
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time
if (
    dashboard &&
    dashboardHeaderContainer &&
    dashboardHeaderContainer.previousSibling &&
    window.location.pathname === "/"
) {
    dashboard.insertBefore(app, dashboardHeaderContainer);
}

const container = document.getElementById(CONTENT_SCRIPT_ROOT_ELEMENT_ID);
const root = createRoot(container!);

const getInitialMarkedAssignments = () => {
    return new Promise<number[]>((resolve) => {
        chrome.storage.local.get(["markedAssignmentIds"], (result) => {
            resolve(result.markedAssignmentIds || []);
        });
    });
};

const getInitialTimelinePositions = () => {
    return new Promise<{ start: string; end: string }>((resolve) => {
        chrome.storage.local.get(
            ["lastStartTimelinePosition", "lastEndTimelinePosition"],
            (result) => {
                const lastStartTimelinePosition =
                    result.lastStartTimelinePosition || undefined;
                const lastEndTimelinePosition =
                    result.lastEndTimelinePosition || undefined;
                resolve({
                    start: lastStartTimelinePosition,
                    end: lastEndTimelinePosition,
                });
            },
        );
    });
};

const getBaseUrl = () => {
    return window.location.origin;
};

const init = async () => {
    const initialMarkedAssignments = await getInitialMarkedAssignments();
    const { start, end } = await getInitialTimelinePositions();

    root.render(
        <React.StrictMode>
            <AssignmentTimeline
                markedAssignments={initialMarkedAssignments}
                baseUrl={getBaseUrl()}
                timelineStart={start}
                timelineEnd={end}
            />
        </React.StrictMode>,
    );
};

init();