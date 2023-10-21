# canvas-assignments-timeline-extension

A Chrome extension designed specifically for Canvas LMS users to provide a visual timeline of their assignments. This extension leverages the power of React and TypeScript to deliver a seamless user experience.

## Features

- **Timeline View**: Get a clear picture of your assignments in a timeline format.
- **Easy Integration**: Works seamlessly with Canvas LMS.
- **Built with React & TypeScript**: Ensures a robust and maintainable codebase.

## Build and run locally

### Install dependencies
yarn

### Build the extension
yarn build

### Load the extension into Chrome

1. Navigate to chrome://extensions/
2. Enable the "Developer mode" toggle switch in the top right of the window.
3. Click the "Load unpacked" button in the top left of the window.
4. Navigate to the `canvas-assignments-timeline-extension` directory and select the `dist` directory to load the extension.
5. Once loaded, navigate to your Canvas LMS dashboard to see the assignments in a timeline view.

## Codebase Overview

- **[Popup](https://developer.chrome.com/docs/extensions/mv3/user_interface/#popup)**: The source code for the popup interface is located at the root directory.
  
- **[Content Script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)**: Handles the injection of the React app into the Canvas page. Its source code can be found in the `content-script` directory.

## Acknowledgements

This project utilizes the framework from the `React TypeScript Chrome Extension` project.
