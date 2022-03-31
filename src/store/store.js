import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export const createTaskData = writable({
  category: ['Shopping', 'Hobby', 'Sport', 'Education', 'Job', 'Housework'],
  categoryInd: 0,
  markers: ['blue', 'green', 'red', 'purple', 'yellow', 'orange'],
  markersInd: 0,
  descriptionTask: '',
  currentId: '',
});

export const date = writable({
  day: '',
  month: '',
  year: '',
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
  dayOfTheWeek: '',
  hour: '',
  minutes: '',
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

const createTodoStore = () => {
  const { subscribe, update } = writable({});
  return {
    subscribe,
    updateTasks: (date) => {
      update((items) => {
        return { ...items, [date]: [] };
      });
    },

    addTask: (date, hour, minutes, marker, category, description) => {
      update((items) => {
        return {
          ...items,
          [date]: [
            ...items[date],
            {
              id: uuidv4(),
              hour: hour,
              minute: minutes,
              markersInd: marker,
              categoryInd: category,
              description: description,
              done: false,
              rating: 0,
            },
          ],
        };
      });
    },

    taskRemove: (date, id) => {
      update((items) => {
        return {
          ...items,
          [date]: items[date].filter((item) => {
            return item.id !== id;
          }),
        };
      });
    },

    editTask: (
      date,
      hour,
      minutes,
      markersInd,
      categoryInd,
      descriptionTask,
      id
    ) => {
      update((items) => {
        return {
          ...items,
          [date]: items[date].map((item) => {
            if (item.id === id) {
              return {
                ...item,
                hour: hour,
                minute: minutes,
                markersInd: markersInd,
                categoryInd: categoryInd,
                description: descriptionTask,
              };
            } else {
              return item;
            }
          }),
        };
      });
    },

    clearTasks: (date) => {
      update((items) => {
        return {
          ...items,
          [date]: [],
        };
      });
    },

    sortTasks: (date, value) => {
      update((items) => {
        return {
          ...items,
          [date]: items[date].sort((a, b) => {
            return b[value] - a[value];
          }),
        };
      });
    },

    sortTasksByTime: (date) => {
      update((items) => {
        return {
          ...items,
          [date]: items[date].sort((a, b) => {
            return `${a.hour}${a.minute}` - `${b.hour}${b.minute}`;
          }),
        };
      });
    },

    changeRating: (date, value, id) => {
      update((items) => {
        return {
          ...items,
          [date]: items[date].map((item) => {
            if (item.id === id) {
              return { ...item, rating: value };
            } else {
              return item;
            }
          }),
        };
      });
    },

    taskCompleted: (date, checked, id) => {
      update((items) => {
        return {
          ...items,
          [date]: items[date].map((item) => {
            if (item.id === id) {
              return { ...item, done: checked };
            } else {
              return item;
            }
          }),
        };
      });
    },
  };
};

export const tasks = createTodoStore();

// const createDataStore = () => {
//   const {
//     subscribe,
//     update,
//     categories,
//     categoriesInd,
//     markers,
//     markersInd,
//     descriptionTask,
//   } = writable({
//     categories: ['Shopping', 'Hobby', 'Sport', 'Education', 'Job', 'Housework'],
//     categoriesInd: 0,
//     markers: ['blue', 'green', 'red', 'purple', 'yellow', 'orange'],
//     markersInd: 0,
//     descriptionTask: '',
//   });
//   return {
//     subscribe,
//     categories,
//     categoriesInd,
//     markers,
//     markersInd,
//     descriptionTask,

//     resetData: () => {
//       update((items) => {
//         return {
//           ...items,
//           descriptionTask: '',
//           categoriesInd: 0,
//           markersInd: 0,
//         };
//       });
//     },

//     updateData: (descriptionTask, categoriesInd, markersInd) => {
//       update((items) => {
//         return {
//           ...items,
//           descriptionTask,
//           categoriesInd,
//           markersInd,
//         };
//       });
//     },
//   };
// };
