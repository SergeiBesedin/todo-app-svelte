import { writable } from 'svelte/store';

export const tasks = writable({});

export const createTaskData = writable({
  category: ['Shopping', 'Hobby', 'Sport', 'Education', 'Job', 'Housework'],
  categoryInd: 0,
  markers: ['blue', 'green', 'red', 'purple', 'yellow', 'orange'],
  markersInd: 0,
  descriptionTask: '',
});

export const basket = writable({});

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
  hour: new Date().getHours(),
  minutes: new Date().getMinutes(),
  getMonth() {
    return this.months[this.month];
  },
  getDayOfTheWeek() {
    return this.daysOfTheWeek[this.dayOfTheWeek];
  },
  getTotalDays(month = this.month, year = this.year) {
    return new Date(year, month + 1, 0).getDate();
  },
  getFullDate() {
    return `${this.day}.${this.month}.${this.year}`;
  },
});
