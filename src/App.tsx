/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { ReactComponent as GithubIcon } from './icons/github_icon.svg';
import { ReactComponent as LinkedinIcon } from './icons/linkedin_icon.svg';
import { ReactComponent as EmailIcon } from './icons/email_send_icon.svg';
import Icon from "./Icon";

import "./App.css";


const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="gradient-text">Canvas Assignments Timeline</h1>
                <p className="App-description">Track your assignments from the Canvas dashboard</p>
                <div className="App-more-features">Want more features?
                    <a className="App-request-features" href="https://github.com/a-aznar/canvas-assignments-timeline-extension/issues/new" target="_blank" rel="noopener noreferrer">
                        Request a feature!
                    </a>
                </div>
                <a className="App-leave-star" href="https://github.com/a-aznar/canvas-assignments-timeline-extension/stargazers" target="_blank" rel="noopener noreferrer">
                    Leave a star if you find it useful!
                </a>
                <div className="icons">
                    <Icon href="https://github.com/a-aznar" alt="Github" SvgIcon={GithubIcon} />
                    <Icon href="https://www.linkedin.com/in/a-aznar/" alt="LinkedIn" SvgIcon={LinkedinIcon} />
                    <Icon href="mailto:contact.alejandro.aznar@gmail.com" alt="Email" SvgIcon={EmailIcon} />
                </div>
            </header>
        </div>
    );
}

export default App;

