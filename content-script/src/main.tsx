import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import AssignmentTimeline from "./AssignmentTimeline";

const CONTENT_SCRIPT_ROOT_ELEMENT_ID = "content-script-root";

const dashboard = document.querySelector("#dashboard");
const dashboardHeaderContainer = document.querySelector(
    "#dashboard_header_container",
);

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
    dashboardHeaderContainer.nextSibling
) {
    dashboard.insertBefore(app, dashboardHeaderContainer.nextSibling);
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

const getBaseUrl = () => {
    return window.location.origin;
};

const init = async () => {
    const initialMarkedAssignments = await getInitialMarkedAssignments();

    root.render(
        <React.StrictMode>
            <AssignmentTimeline
                initialMarkedAssignments={initialMarkedAssignments}
                baseUrl={getBaseUrl()}
            />
        </React.StrictMode>,
    );
};

init();
