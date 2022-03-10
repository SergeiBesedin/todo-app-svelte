import { writable } from 'svelte/store';

export const tasks = writable({});

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
  getMonth() {
    return this.months[this.month];
  },
  getDayOfTheWeek() {
    return this.daysOfTheWeek[this.dayOfTheWeek];
  },
});
