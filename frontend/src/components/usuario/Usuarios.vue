<template>
  <div class="usuarios">
    <PageTitle
      icon="fa fa-users"
      main="Colaboradores"
      sub="Grid de Colaboradores"
    />
    <b-row class="botoes">
      <b-button router-link to="/novousuario" variant="primary" size='lg'>Novo</b-button>
      <b-button router-link to="/homecadastro" class="ml-2 mr-2" size="lg">Voltar</b-button>  
      <b-button router-link to="/" class="fa fa-home" variant="danger" size="lg"></b-button>
    </b-row>

    <b-table hover striped :items="usuarios" :fields="fields">
      <template slot="actions"> </template>
    </b-table>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "Usuarios",
  components: { PageTitle },
  data: function () {
    return {
      mode: "save",
      usuario: {},
      usuarios: [],
      fields: [
        { key: "codigo", label: "Código", sortable: true },
        { key: "nome", label: "Nome", sortable: true },
        { key: "email", label: "E-mail" },
        { key: "cpf", label: "CPF" },
        { key: "cargo", label: "Cargo" },
        {
          key: "admin",
          label: "Adminstrador",
          formatter: (value) => (value ? "Sim" : "Não"),
        },
      ],
    };
  },
  methods: {
    loadUsuarios() {
      const url = `${baseApiUrl}/usuarios`;
      axios.get(url).then((res) => {
        this.usuarios = res.data;
      });
    },
  },
  mounted() {
    this.loadUsuarios();
  },
};
</script>


<style>

.botoes{
    display: flex;
    justify-content: flex-end;
    margin: 10px;
}
</style>