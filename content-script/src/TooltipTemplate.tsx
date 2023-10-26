import React from 'react';
import moment from 'moment';
import { t } from './i18n';

type TooltipTemplateProps = {
  item: {
    content: string;
    start: string;
    end: string;
  };
  editedData: any; 
  locale: string;
};

const TooltipTemplate: React.FC<TooltipTemplateProps> = ({ item, editedData, locale }) => {
  const today = moment();
  const dueDate = moment(item.end);
  const unlockDate = moment(item.start);

  const daysUntilDue = dueDate.diff(today, 'days');
  const daysUntilUnlock = unlockDate.diff(today, 'days');

  const daysUntilDueLabel = daysUntilDue >= 0 ? `${daysUntilDue} ${t("daysLeft", locale)}` : t("pastDue", locale);
  const daysUntilUnlockLabel = daysUntilUnlock >= 0 ? `${daysUntilUnlock} ${t("daysLeft", locale)}` : t("alreadyUnlocked", locale);

  return (
    <div>
      <strong>{item.content}</strong>
      <br /><br />
      {t("unlockDate", locale)}: {unlockDate.format('YYYY-MM-DD')} ({daysUntilUnlockLabel})
      <br />
      {t("dueDate", locale)}: {dueDate.format('YYYY-MM-DD')} ({daysUntilDueLabel})
      <br /><br />
      <span style={{ fontSize: '0.8em', color: '#999' }}>
        ({t("hint", locale)})
      </span>
    </div>
  );
};


export default TooltipTemplate;