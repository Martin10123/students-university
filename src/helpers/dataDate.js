const month = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const days = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

export const createAccountDate = (date) => {
  return `${days[new Date().getDay(date)]} ${new Date().getDate(date)} de ${
    month[new Date().getMonth(date)]
  } ${new Date().getFullYear(date)}`;
};

const dateUnits = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};

const getSecondsDiff = (timestamp) => (Date.now() - timestamp) / 1000;

const getUnitAndValueDate = (secondsElapsed) => {
  for (const [unit, secondsInUnit] of Object.entries(dateUnits)) {
    if (secondsElapsed >= secondsInUnit || unit === "second") {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1;
      return { value, unit };
    }
  }
};

export const getTimeAgo = (timestamp, locale) => {
  const rtf = new Intl.RelativeTimeFormat(locale);

  const secondsElapsed = getSecondsDiff(timestamp);
  const { value, unit } = getUnitAndValueDate(secondsElapsed);

  const dateTime = rtf.format(value, unit);

  let dateNew;

  if (dateTime.split(" ")[2] === "días") {
    dateNew = `${dateTime.split(" ")[1]}d`;
  } else if (dateTime.split(" ")[2] === "hora") {
    dateNew = `${dateTime.split(" ")[1]}h`;
  } else if (dateTime.split(" ")[2] === "minutos") {
    dateNew = `${dateTime.split(" ")[1]}min`;
  }

  return dateNew;
};
