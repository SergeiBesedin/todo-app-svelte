import { writable } from 'svelte/store';

export const tasks = writable({
  Sun: [],
  Mon: [],
  Tues: [],
  Wed: [],
  Thurs: [],
  Fri: [],
  Sat: [],
});

export const date = writable({
  day: new Date().getDate(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  months: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  daysOfTheWeek: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
  dayOfTheWeek: new Date().getDay(),
});
