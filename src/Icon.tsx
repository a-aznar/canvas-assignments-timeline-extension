import React from 'react';
import './App.css';

type IconProps = {
    href: string;
    alt: string;
    SvgIcon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const Icon: React.FC<IconProps> = ({ href, alt, SvgIcon }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}>
        <SvgIcon width="16" height="16" />
    </a>
);

export default Icon;