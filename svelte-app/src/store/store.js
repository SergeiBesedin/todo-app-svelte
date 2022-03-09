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
  dayOfTheWeek: new Date().getDay(),
});
