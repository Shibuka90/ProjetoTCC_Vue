<template>
  <div id="app">
    <Header title="SGCM - Sistema de Gestão de Clínica Médica"/>
    <Menu />
    <Content />
    <Footer />
    <Logo />
    
  </div>
</template>

<script>
import Header from "@/components/template/Header"
import Menu from "@/components/template/Menu"
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
import Logo from "@/components/template/Logo"


export default {
  name: 'App',
  components: { Header, Menu, Content, Footer, Logo }
}
</script>

<style>
*{
  font-family: "Lato", sans-serif;
}

body{
  margin: 0;
}

#app{
  height: 100vh;
  display: grid;
  grid-template-rows: 100px 1fr 40px;
  grid-template-columns: 250px 1fr;
  grid-template-areas: 
        "logo header"
        "menu content"
        "menu footer";
}
</style>
