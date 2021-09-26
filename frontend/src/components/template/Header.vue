<template>
  <header class="header">
      <a class="toggle">
          <i class="fa fa-lg"></i>
      </a>
      <h1 class="title"><i class="fa fa-home"></i> - {{title}}</h1>
  </header>
</template>

<script>
export default {
        name: 'Header',
        props: {
            title: String,
            hideToogle: Boolean
        }
}
</script>

<style>
    .header{
        grid-area: header;
        background: linear-gradient(to right,  #e52d27, #b31217 );

        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

      .title{
        font-size: 1.4rem;; 
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
    }

    .title a{
        color: #FFF;
        text-decoration: none;
    }

    .fa{
        font-size: 1.6em;
    }
</style>