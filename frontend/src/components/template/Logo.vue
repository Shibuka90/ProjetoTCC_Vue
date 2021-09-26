<template>
  <aside class="logo">
      <img src="@/assets/logo.jpg" width="250" alt="Logo" />
  </aside>
</template>

<script>
export default {
    name: 'Logo'
}
</script>

<style>
.logo{
    grid-area: logo;
    background: #e52d27;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>