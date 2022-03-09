<script>
  import { date } from '../store/store';
  export let daysOfTheWeek;
  const { day, month, year, dayOfTheWeek } = $date;

  const months = [
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
  ];
</script>

<div class="date">
  <span>{day}</span>
  <span>{months[month]}, {year}</span>
  <span>{daysOfTheWeek[dayOfTheWeek]}</span>
</div>

<style>
  .date {
    display: grid;
    max-width: 160px;
    grid-template-areas:
      'A B'
      'A C';
    color: #ffffff;
  }

  .date span:first-child {
    font-size: 50px;
    grid-area: A;
    font-weight: 600;
  }

  .date :nth-child(2) {
    grid-area: C;
    font-size: 18px;
    color: #d1d1d1;
  }

  .date span:last-child {
    align-self: flex-end;
    grid-area: B;
    font-size: 18px;
  }
</style>
