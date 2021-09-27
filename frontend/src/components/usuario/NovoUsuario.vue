<template>
  <div class="novousuario">
        <PageTitle
      icon="fa fa-users"
      main="Colaboradores"
      sub="Cadastro de Colaborador"
    />
    <div class="form">
        <b-form>
            <input id="usuario-codigo" type="hidden" v-model="usuario.codigo">
            <b-row>
                <b-col md="6" sm="12">
                     <b-form-group label="Nome:" label-for="usuario-nome">
                    <b-form-input id="usuario-nome" type="text" v-model="usuario.nome" required 
                    :readonly="mode === 'remove'" placeholder="Informe o Nome do Usuário...."/>
                </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                <b-form-group label="E-mail:" label-for="usuario-email">
                    <b-form-input id="usuario-email" type="text" v-model="usuario.email" required 
                    :readonly="mode === 'remove'" placeholder="Informe o E-mail do Usuário...."/>
                </b-form-group>
              </b-col>
            </b-row>
        </b-form>
    </div>
  </div>  
</template>

<script>
import PageTitle from "../template/PageTitle.vue"

export default {
    name: "NovoUsuario",
    components: { PageTitle },
    data: function() {
        return {
            mode:'save',
            usuario: {}
        }
    }
}
</script>

<style>

</style>