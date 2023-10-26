export const SUPPORTED_LOCALES = ['en', 'es', 'it', 'nl', 'de', 'fr', 'uk', 'ru', 'pl', 'pt', 'sv', 'nb', 'lt'];
export const DEFAULT_LOCALE = 'en';

const translations: Record<string, any> = {
  en: {
    unlockDate: "Unlock Date",
    dueDate: "Due Date",
    daysLeft: "days left",
    alreadyUnlocked: "already unlocked",
    pastDue: "past due",
    hint: "Hint: Click to mark as done",
  },
  es: {
    unlockDate: "Fecha de desbloqueo",
    dueDate: "Fecha de vencimiento",
    daysLeft: "días restantes",
    alreadyUnlocked: "ya desbloqueado",
    pastDue: "vencido",
    hint: "Pista: Haz clic para marcar como hecho",
  },
  it: {
    unlockDate: "Data di sblocco",
    dueDate: "Data di scadenza",
    daysLeft: "giorni rimasti",
    alreadyUnlocked: "già sbloccato",
    pastDue: "in ritardo",
    hint: "Suggerimento: Clicca per segnare come completato",
  },
  nl: {
    unlockDate: "Ontgrendeldatum",
    dueDate: "Vervaldatum",
    daysLeft: "dagen over",
    alreadyUnlocked: "al ontgrendeld",
    pastDue: "verstreken",
    hint: "Tip: Klik om als voltooid te markeren",
  },
  de: {
    unlockDate: "Entsperrdatum",
    dueDate: "Fälligkeitsdatum",
    daysLeft: "Tage übrig",
    alreadyUnlocked: "bereits entsperrt",
    pastDue: "überfällig",
    hint: "Hinweis: Klicken, um als erledigt zu markieren",
  },
  fr: {
    unlockDate: "Date de déblocage",
    dueDate: "Date d'échéance",
    daysLeft: "jours restants",
    alreadyUnlocked: "déjà débloqué",
    pastDue: "en retard",
    hint: "Astuce : Cliquer pour marquer comme terminé",
  },
  uk: {
    unlockDate: "Дата розблокування",
    dueDate: "Кінцевий термін",
    daysLeft: "днів залишилося",
    alreadyUnlocked: "вже розблоковано",
    pastDue: "прострочено",
    hint: "Підказка: Натисніть, щоб відзначити як виконане",
  },
  ru: {
    unlockDate: "Дата разблокировки",
    dueDate: "Срок сдачи",
    daysLeft: "дней осталось",
    alreadyUnlocked: "уже разблокировано",
    pastDue: "просрочено",
    hint: "Подсказка: Нажмите, чтобы отметить как выполненное",
  },
  pl: {
    unlockDate: "Data Odblokowania",
    dueDate: "Termin",
    daysLeft: "dni zostało",
    alreadyUnlocked: "już odblokowane",
    pastDue: "po terminie",
    hint: "Wskazówka: Kliknij, aby oznaczyć jako wykonane",
  },
  pt: {
    unlockDate: "Data de Desbloqueio",
    dueDate: "Data de Vencimento",
    daysLeft: "dias restantes",
    alreadyUnlocked: "já desbloqueado",
    pastDue: "atrasado",
    hint: "Dica: Clique para marcar como concluído",
  },
  sv: {
    unlockDate: "Upplåsningsdatum",
    dueDate: "Förfallodatum",
    daysLeft: "dagar kvar",
    alreadyUnlocked: "redan upplåst",
    pastDue: "försenad",
    hint: "Tips: Klicka för att markera som klar",
  },
  nb: {
    unlockDate: "Opplåsningsdato",
    dueDate: "Frist",
    daysLeft: "dager igjen",
    alreadyUnlocked: "allerede opplåst",
    pastDue: "forfalt",
    hint: "Hint: Klikk for å markere som gjort",
  },
  lt: {
    unlockDate: "Atrakinti Datą",
    dueDate: "Termino data",
    daysLeft: "dienų liko",
    alreadyUnlocked: "jau atrakinta",
    pastDue: "pradelstas",
    hint: "Užuomina: Spustelėkite, kad pažymėtumėte kaip atliktą",
  }
};

export function t(key: string, locale: string = "en") {
  return translations[locale]?.[key] || translations["en"][key] || key;
}
