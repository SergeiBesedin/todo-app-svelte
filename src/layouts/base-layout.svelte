<header>
  <slot name="header" />
</header>

<main>
  <slot />
</main>

<style>
  header {
    position: relative;
    padding: 15px 10px 10px;
    background: linear-gradient(0deg, #696eff, #f6a9ff);
    border-radius: 5px 5px 0 0;
  }

  main {
    background: #ffffff;
    border-radius: 0 0 5px 5px;
    position: relative;
  }
</style>
