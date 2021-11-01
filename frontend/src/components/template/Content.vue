<!--Layout para Área de Conteúdo-->
<template>
  <div class="content">
      <!-- Traz as informações do conteúdo pela rota da página -->
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
.content{
    grid-area: content;
    background: #efefef;
    padding: 20px;
}

</style>