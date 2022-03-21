<script>
  export let num;
  export let id;
  export let rating;
</script>

<input
  id={`rating-${id + num}`}
  type="radio"
  value={num}
  name="rating"
  class="rating-item"
  on:input
/>
<label
  for={`rating-${id + num}`}
  class="rating-label"
  class:active={rating >= num}
/>

<style>
  .rating-item {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    margin: 0;
    visibility: hidden;
  }

  .rating-label {
    flex: 0 0 33.333%;
    height: 100%;
    cursor: pointer;
    color: #d1d1d1;
  }

  .rating-label::before {
    content: '★';
    display: block;
    transition: color 0.3s ease 0s;
  }

  .active {
    color: rgb(243, 159, 3);
  }

  .rating-label:hover,
  .rating-label:hover ~ .rating-label,
  .rating-label:checked ~ .rating-label:hover {
    color: rgb(243, 205, 135);
  }

  /* .rating-item:checked,
  .rating-item:checked ~ .rating-label {
    color: rgb(243, 159, 3);
  } */
</style>
