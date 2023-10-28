import React from 'react';

import './GroupTemplate.css';

type GroupTemplateProps = {
    group: any;
    baseUrl: string;
};

const GroupTemplate: React.FC<GroupTemplateProps> = ({ group, baseUrl }) => {
    const url = `${baseUrl}/courses/${group.id}/modules`;

    return (
        <p>
            <a href={url} className='modules-link' target="_blank" rel="noopener noreferrer">
                {group.content}
            </a>
        </p>
    );
};


export default GroupTemplate;
