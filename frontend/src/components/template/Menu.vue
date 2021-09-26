<template>
  <aside class="menu" v-show="isMenuVisible">
      <p>Menu</p>
  </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Menu',
    computed: mapState(['isMenuVisible'])
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