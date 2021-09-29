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
                    :readonly="mode === 'remove'" placeholder="Informe o Nome do(a) Colaborador(a)...."/>
                </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                <b-form-group label="E-mail:" label-for="usuario-email">
                    <b-form-input id="usuario-email" type="text" v-model="usuario.email" required 
                    :readonly="mode === 'remove'" placeholder="Informe o E-mail do(a) Colaborador(a)...."/>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
                <b-col  md="auto">
                    <b-form-group label="CPF:" label-for="usuario-cpf">
                        <b-form-input id="usuario-cpf" type="text" v-mask="'###.###.###-##'" v-model="usuario.cpf" required
                        :readonly="mode === 'remove'" placeholder="xxx.xxx.xxx-xx" />
                    </b-form-group>
                </b-col>
                 <b-col md="auto">
                    <b-form-group label="Data de Nascimento:" label-for="usuario-datanasc">
                        <b-form-input id="usuario-datanasc" type="date"  v-model="usuario.datanasc" required
                        :readonly="mode === 'remove'" />
                    </b-form-group>
                </b-col>
                  <b-col md="auto">
                    <b-form-group label="Estado Civil:" label-for="usuario-estadocivil">
                        <b-form-input list="usuario-estadocivil" type="text"  v-model="usuario.estadocivil" required
                        :readonly="mode === 'remove'" />
                        <datalist id="usuario-estadocivil">
                            <option v-for="estadoCivil in estadoCivil" :key="estadoCivil">{{estadoCivil}}</option>
                        </datalist>
                    </b-form-group>
                </b-col>   
                  <b-col md="auto">
                    <b-form-group label="Sexo:" label-for="usuario-sexo">
                        <b-form-input list="usuario-sexo" type="text"  v-model="usuario.sexo" required
                        :readonly="mode === 'remove'" />
                        <datalist id="usuario-sexo">
                            <option v-for="sexo in sexo" :key="sexo">{{sexo}}</option>
                        </datalist>
                    </b-form-group>
                </b-col>       
                   <!-- <b-col md="auto">
                    <b-form-group label="Tipo de Usuário:" label-for="usuario-admin">
                        <b-form-input list="usuario-admin" type="text"  v-model="usuario.admin" required
                        :readonly="mode === 'remove'" />
                        <datalist id="usuario-admin">
                            <option v-for="admin in admin" :key="admin">{{admin}}</option>
                        </datalist>
                    </b-form-group>
                </b-col>             -->
            </b-row>
            <b-row>
                  <b-col md="6">
                    <b-form-group label="Cargo:" label-for="usuario-cargo">
                        <b-form-input id="usuario-cargo" type="text" v-model="usuario.cargo" required
                        :readonly="mode === 'remove'" placeholder="Informe o Cargo do(a) Colaborador(a)" />
                    </b-form-group>
                </b-col> 
                 <b-col md="auto">
                    <b-form-group label="Sigla CR:" label-for="usuario-siglacr">
                        <b-form-input list="usuario-siglacr" type="text"  v-model="usuario.siglacr" 
                        :readonly="mode === 'remove'" />
                        <datalist id="usuario-siglacr">
                            <option v-for="siglacr in siglacr" :key="siglacr">{{siglacr}}</option>
                        </datalist>
                    </b-form-group>
                </b-col> 
                    <b-col md="auto">
                    <b-form-group label="CR:" label-for="usuario-cr">
                        <b-form-input id="usuario-cr" type="text" v-model="usuario.cr" 
                        :readonly="mode === 'remove'" placeholder="Informe o CR " />
                    </b-form-group>
                </b-col>  
                <b-col md="auto">
                     <b-form-group label="UF CR:" label-for="usuario-ufcr">
                        <b-form-input list="usuario-ufcr" type="text"  v-model="usuario.ufcr" 
                         :readonly="mode === 'remove'" />
                            <datalist id="usuario-ufcr">
                                 <option v-for="ufcr in ufcr" :key="ufcr">{{ufcr}}</option>
                            </datalist>
                    </b-form-group>
                </b-col>  
            </b-row>
            <b-row>
               <b-col md="auto">
                    <b-form-group label="CEP:" label-for="usuario-cepusuario">
                        <b-form-input id="usuario-cepusuario" type="text" v-mask="'#####-###'" v-model="usuario.cepusuario" required
                        :readonly="mode === 'remove'" placeholder="xxxxx-xxx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                     <b-form-group label="Tipo:" label-for="usuario-tipo">
                        <b-form-input list="usuario-tipo" type="text"  v-model="usuario.tipo" 
                         :readonly="mode === 'remove'" />
                            <datalist id="usuario-tipo">
                                 <option v-for="tipo in tipo" :key="tipo">{{tipo}}</option>
                            </datalist>
                    </b-form-group>
                </b-col> 
                <b-col sm="8">
                    <b-form-group label="Endereço:" label-for="usuario-enderenco">
                        <b-form-input id="usuario-enderenco" type="text"  v-model="usuario.endereco" required
                        :readonly="mode === 'remove'" placeholder="Informe o Endereço......." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                 <b-col md="auto">
                    <b-form-group label="Número:" label-for="usuario-numero">
                        <b-form-input id="usuario-numero" type="text"  v-model="usuario.numero" required
                        :readonly="mode === 'remove'" placeholder="Informe o Número......." />
                    </b-form-group>
                </b-col>
                 <b-col md="6">
                    <b-form-group label="Bairro:" label-for="usuario-bairro">
                        <b-form-input id="usuario-bairro" type="text"  v-model="usuario.bairro" required
                        :readonly="mode === 'remove'" placeholder="Informe o Bairro......." />
                    </b-form-group>
                </b-col>
                 <b-col md="auto">
                    <b-form-group label="Municipio:" label-for="usuario-municipio">
                        <b-form-input id="usuario-municipio" type="text" v-model="usuario.municipio" required
                        :readonly="mode === 'remove'" placeholder="Informe o Municipio..." />
                    </b-form-group>
                </b-col>
                    <b-col md="auto">
                     <b-form-group label="UF:" label-for="usuario-ufmunicipio">
                        <b-form-input list="usuario-ufmunicipio" type="text"  v-model="usuario.ufmunicipio" 
                         :readonly="mode === 'remove'" />
                            <datalist id="usuario-ufmunicipio">
                                 <option v-for="ufmunicipio in ufmunicipio" :key="ufmunicipio">{{ufmunicipio}}</option>
                            </datalist>
                    </b-form-group>
                </b-col> 
            </b-row>
            <b-row>
                <b-col md="auto">
                    <b-form-group label="Tel.DDD:" label-for="usuario-telddd">
                        <b-form-input id="usuario-telddd" type="text" v-mask="'##'" v-model="usuario.telddd" 
                        :readonly="mode === 'remove'" placeholder="xx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Telefone:" label-for="usuario-telefone">
                        <b-form-input id="usuario-telefone" type="text" v-mask="'####-####'" v-model="usuario.tel" 
                        :readonly="mode === 'remove'" placeholder="xxxx-xxxx " />
                    </b-form-group>
                </b-col>
                  <b-col md="auto">
                    <b-form-group label="Cel.DDD:" label-for="usuario-celddd">
                        <b-form-input id="usuario-celddd" type="text" v-mask="'##'" v-model="usuario.celddd" required
                        :readonly="mode === 'remove'" placeholder="xx" />
                    </b-form-group>
                </b-col>
                 <b-col md="auto">
                    <b-form-group label="Celular:" label-for="usuario-celular">
                        <b-form-input id="usuario-celular" type="text" v-mask="'#####-####'" v-model="usuario.cel" required
                        :readonly="mode === 'remove'" placeholder="xxxxx-xxxx " />
                    </b-form-group>
                </b-col>
                 <b-col md="auto">
                    <b-form-group label="Senha:" label-for="usuario-password">
                        <b-form-input id="usuario-password" type="password"  v-model="usuario.password" required
                        :readonly="mode === 'remove'" placeholder="xxxxxxxxxxx" />
                    </b-form-group>
                </b-col>
                  <b-col md="auto">
                    <b-form-group label="Confimar Senha:" label-for="usuario-confirmpassword">
                        <b-form-input id="usuario-confirmpassword" type="password"  v-model="usuario.confirmPassword" required
                        :readonly="mode === 'remove'" placeholder="xxxxxxxxxxx" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6">
                <b-button router-link to="/usuario" size='lg' class="mb-2" block>Cancelar</b-button>
                </b-col>
                <b-col md="6">
                <b-button variant="success" size='lg' class="mb-2" block v-if="mode === 'save'" @click="save" >Incluir</b-button>
                <b-button variant="danger"  size='lg' block v-if="mode === 'remove'" @click="remove">Excluir</b-button>
                </b-col>
            </b-row>
        </b-form>
    </div>
  </div>  
</template>

<script>
import PageTitle from "../template/PageTitle.vue"
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: "NovoUsuario",
    components: { PageTitle },
    data: function() {
        return {
            mode:'save',
            usuario: {},
            estadoCivil: ['Solteiro(a)', 'Divorciado(a)', 'Amasiado(a)', 'Casado(a)', 'Separado(a)', 'Uniao Estavel', 'Viuvo(a)'],
            sexo: ['M', 'F'],
            admin: ['Gerente', 'Colaborador','Medico'],
            siglacr: ['CRM', 'COREN'],
            ufcr: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO',
                    'RR', 'RS', 'SC', 'SP', 'SE', 'TO'],
            tipo: ['Area', 'Avenida', 'Alamenda', 'Beco', 'Chacara', 'Condominio', 'Conjunto', 'Distrito', 'Estrada', 'Fazenda', 'Ladeira', 
                    'Largo', 'Loteamento', 'Modulo', 'Parque', 'Praca', 'Quadra', 'Residencial', 'Rodovia', 'Rua', 'Sitio', 'Travessa', 'Trevo',
                    'Vale', 'Via', 'Viela', 'Vila'],
            ufmunicipio: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO',
                    'RR', 'RS', 'SC', 'SP', 'SE', 'TO'],
        }
    },
    methods: {
       save() {
            const method = this.usuario.codigo ? 'put' : 'post'
            const codigo = this.usuario.codigo ? `/${this.usuario.codigo}` : ''
            axios[method](`${baseApiUrl}/usuarios${codigo}`, this.usuario)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
          getUsuario(){
            const url = `${baseApiUrl}/usuarios/${this.usuario.codigo}`
             axios(url).then(res => this.usuario = res.data)
        }
    },
     mounted() {
        this.usuario.codigo = this.$route.params.codigo
        this.getUsuario()

  },
}
</script>

<style>

</style>