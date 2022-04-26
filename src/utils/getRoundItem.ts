export const getRoundItem = (a: number) => {
  return a.toFixed().toString();
};

export const getPressure = (a: number) => {
  return a * 0.75;
};

export const getWeekDay = () => {
  const date = new Date();

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return days[date.getDay()];
};