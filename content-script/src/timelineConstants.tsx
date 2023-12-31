export const _1_DAY_MILLIS = 1000 * 60 * 60 * 24;
export const _7_DAYS_MILLIS = _1_DAY_MILLIS * 7;
const _1_MONTH_MILLIS = _1_DAY_MILLIS * 31;

export const defaultProps = {
    initialGroups: [],
    initialItems: [],
};

export const defaultOptions = {
    width: "100%",
    minHeight: "250px",
    editable: false,
    selectable: false,
    autoResize: true,
    stack: false,
    orientation: "top",
    showTooltips: true,
    zoomMin: _7_DAYS_MILLIS,
    zoomMax: _1_MONTH_MILLIS * 3,
    tooltip: {
        delay: 0,
        followMouse: true,
        overflowMethod: "cap" as "cap",
    },
};
