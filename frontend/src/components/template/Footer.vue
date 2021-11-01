<!--Layout para o Rodapé do site -->
<template>
  <footer class="footer">
      <i class="fa fa-code "></i><span>Desenvolvido pelos alunos <strong> - Grupo 3 TCC - Turma CC8P12 - 2018/2021</strong></span><i class="fa fa-code "></i>
  </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
.footer{
    grid-area: footer;
    background: linear-gradient(to right, #e52d27, #b31217  );
    color: #fff;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
}

span{
    font-size: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:5px 5px 0 5px;
}
</style>