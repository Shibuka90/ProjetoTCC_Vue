<template>
  <aside class="menu">
      <p>Menu</p>
  </aside>
</template>

<script>
export default {
    name: 'Menu'
}
</script>

<style>
.menu {
    grid-area: menu;
    background: #e52d27;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
</style>