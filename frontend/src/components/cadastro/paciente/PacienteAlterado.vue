<template>
  <div class="novopaciente">
        <PageTitle
      icon="fa fa-user"
      main="Pacientes"
      sub="Cadastro de Paciente"
    />
    <div class="form">
        <b-form>
            <input id="paciente-codigo" type="hidden" v-model="paciente.codigo">
            <b-row>
                <b-col md="6" sm="12">
                     <b-form-group label="Nome:" label-for="paciente-nome">
                    <b-form-input id="paciente-nome" type="text" v-model="paciente.nome" required 
                    :readonly="mode === 'remove'" placeholder="Informe o Nome do(a) Colaborador(a)...."/>
                </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                <b-form-group label="E-mail:" label-for="paciente-email">
                    <b-form-input id="paciente-email" type="text" v-model="paciente.email" required 
                    :readonly="mode === 'remove'" placeholder="Informe o E-mail do(a) Colaborador(a)...."/>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
                <b-col  md="auto">
                    <b-form-group label="CPF:" label-for="paciente-cpf">
                        <b-form-input id="paciente-cpf" type="text" v-mask="'###.###.###-##'" v-model="paciente.cpf" required
                        :readonly="mode === 'remove'" placeholder="xxx.xxx.xxx-xx" />
                    </b-form-group>
                </b-col>
                 <b-col md="auto">
                    <b-form-group label="Data de Nascimento:" label-for="paciente-datanasc">
                        <b-form-input id="paciente-datanasc" type="date"  v-model="paciente.datanasc" required
                        :readonly="mode === 'remove'" />
                    </b-form-group>
                </b-col>
                  <b-col md="auto">
                    <b-form-group label="Estado Civil:" label-for="paciente-estadocivil">
                        <b-form-input list="paciente-estadocivil" type="text"  v-model="paciente.estadocivil" required
                        :readonly="mode === 'remove'" />
                        <datalist id="paciente-estadocivil">
                            <option v-for="estadoCivil in estadoCivil" :key="estadoCivil">{{estadoCivil}}</option>
                        </datalist>
                    </b-form-group>
                </b-col>   
                  <b-col md="auto">
                    <b-form-group label="Sexo:" label-for="paciente-sexo">
                        <b-form-input list="paciente-sexo" type="text"  v-model="paciente.sexo" required
                        :readonly="mode === 'remove'" />
                        <datalist id="paciente-sexo">
                            <option v-for="sexo in sexo" :key="sexo">{{sexo}}</option>
                        </datalist>
                    </b-form-group>
                </b-col>  
                <b-col md="4"> 
                    <b-form-group label="Convênio:" label-for="paciente-convenio">
                        <b-form-select id="paciente-convenio" :options="convenios" v-model="paciente.convenio" required>
                        </b-form-select>
                    </b-form-group>
                </b-col>     
            </b-row>
            <b-row>
                  <b-col md="6">
                    <b-form-group label="Mãe:" label-for="paciente-mae">
                        <b-form-input id="paciente-mae" type="text" v-model="paciente.mae" required
                        :readonly="mode === 'remove'" placeholder="Informe o Cargo do(a) Colaborador(a)" />
                    </b-form-group>
                </b-col> 
                 <b-col md="6">
                    <b-form-group label="Pai:" label-for="paciente-pai">
                      <b-form-input id="paciente-pai" type="text" v-model="paciente.pai" required
                        :readonly="mode === 'remove'" placeholder="Informe o Cargo do(a) Colaborador(a)" />
                    </b-form-group>
                </b-col> 
            </b-row>
            <b-row>
               <b-col md="auto">
                    <b-form-group label="CEP:" label-for="paciente-ceppaciente">
                        <b-form-input id="paciente-ceppaciente" type="text" v-mask="'#####-###'" v-model="paciente.ceppaciente" required
                        :readonly="mode === 'remove'" placeholder="xxxxx-xxx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                     <b-form-group label="Tipo:" label-for="paciente-tipo">
                        <b-form-input list="paciente-tipo" type="text"  v-model="paciente.tipo" 
                         :readonly="mode === 'remove'" />
                            <datalist id="paciente-tipo">
                                 <option v-for="tipo in tipo" :key="tipo">{{tipo}}</option>
                            </datalist>
                    </b-form-group>
                </b-col> 
                <b-col md="6">
                    <b-form-group label="Endereço:" label-for="paciente-enderenco">
                        <b-form-input id="paciente-enderenco" type="text"  v-model="paciente.endereco" required
                        :readonly="mode === 'remove'" placeholder="Informe o Endereço......." />
                    </b-form-group>
                </b-col>
                   <b-col md="auto">
                    <b-form-group label="Número:" label-for="paciente-numero">
                        <b-form-input id="paciente-numero" type="text"  v-model="paciente.numero" required
                        :readonly="mode === 'remove'" placeholder="Informe o Número......." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="auto">
                    <b-form-group label="Complemento:" label-for="paciente-complemento">
                        <b-form-input id="paciente-complemento" type="text"  v-model="paciente.complemento" 
                        :readonly="mode === 'remove'" placeholder="Informe o Complemento......." />
                    </b-form-group>
                </b-col>
                 <b-col md="6">
                    <b-form-group label="Bairro:" label-for="paciente-bairro">
                        <b-form-input id="paciente-bairro" type="text"  v-model="paciente.bairro" required
                        :readonly="mode === 'remove'" placeholder="Informe o Bairro......." />
                    </b-form-group>
                </b-col>
                 <b-col md="auto">
                    <b-form-group label="Municipio:" label-for="paciente-municipio">
                        <b-form-input id="paciente-municipio" type="text" v-model="paciente.municipio" required
                        :readonly="mode === 'remove'" placeholder="Informe o Municipio..." />
                    </b-form-group>
                </b-col>
                    <b-col md="auto">
                     <b-form-group label="UF:" label-for="paciente-ufmunicipio">
                        <b-form-input list="paciente-ufmunicipio" type="text"  v-model="paciente.ufmunicipio" 
                         :readonly="mode === 'remove'" />
                            <datalist id="paciente-ufmunicipio">
                                 <option v-for="ufmunicipio in ufmunicipio" :key="ufmunicipio">{{ufmunicipio}}</option>
                            </datalist>
                    </b-form-group>
                </b-col> 
            </b-row>
            <b-row>
                <b-col md="auto">
                    <b-form-group label="Matricula:" label-for="paciente-matricula">
                        <b-form-input id="paciente-matricula" type="text" v-model="paciente.matricula" required
                        :readonly="mode === 'remove'" placeholder="xxxxxxxxxxxxxx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Vencimento:" label-for="paciente-vencimento">
                        <b-form-input id="paciente-vencimento" type="date" v-model="paciente.vencimento" required
                        :readonly="mode === 'remove'" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Tel.DDD:" label-for="paciente-telddd">
                        <b-form-input id="paciente-telddd" type="text" v-mask="'##'" v-model="paciente.telddd" 
                        :readonly="mode === 'remove'" placeholder="xx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Telefone:" label-for="paciente-telefone">
                        <b-form-input id="paciente-telefone" type="text" v-mask="'####-####'" v-model="paciente.tel" 
                        :readonly="mode === 'remove'" placeholder="xxxx-xxxx " />
                    </b-form-group>
                </b-col>
                  <b-col md="auto">
                    <b-form-group label="Cel.DDD:" label-for="paciente-celddd">
                        <b-form-input id="paciente-celddd" type="text" v-mask="'##'" v-model="paciente.celddd" required
                        :readonly="mode === 'remove'" placeholder="xx" />
                    </b-form-group>
                </b-col>
                 <b-col md="auto">
                    <b-form-group label="Celular:" label-for="paciente-celular">
                        <b-form-input id="paciente-celular" type="text" v-mask="'#####-####'" v-model="paciente.cel" required
                        :readonly="mode === 'remove'" placeholder="xxxxx-xxxx " />
                    </b-form-group>
                </b-col>
            </b-row>
               <b-row>
                <b-col md="4">
                <b-button router-link to="/pacientes" size='lg' class="mb-2" block>Cancelar</b-button>
                </b-col>
                <b-col md="2">
                <b-button variant="danger" size='lg' class="mb-2" block @click="remove" router-link to="/pacientes">Excluir</b-button>
                </b-col>
                <b-col md="6">
                <b-button variant="success" size='lg' class="mb-2" block  @click="save" router-link to="/pacientes">Alterar</b-button>
                </b-col>
            </b-row>
        </b-form>
  </div>  
  </div>  
</template>

<script>
import PageTitle from "../../template/PageTitle.vue"
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'


export default {
    name: "PacienteAlterado",
    components: { PageTitle},
    data: function() {
        return {
            mode:'save',
            paciente: {},
            pacientes: [],
            convenio: {},
            convenios:[],
            estadoCivil: ['Solteiro(a)', 'Divorciado(a)', 'Amasiado(a)', 'Casado(a)', 'Separado(a)', 'Uniao Estavel', 'Viuvo(a)'],
            sexo: ['M', 'F'],
            admin: ['Gerente', 'Colaborador','Medico'],
            siglacr: ['CRM', 'COREN'],
            ufcr: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO',
                    'RR', 'RS', 'SC', 'SP', 'SE', 'TO'],
            tipo: ['Area', 'Avenida', 'Alamenda', 'Beco', 'Chacara', 'Condominio', 'Conjunto', 'Distrito', 'Estrada', 'Fazenda', 'Ladeira', 
                    'Largo', 'Loteamento', 'Modulo', 'Parque', 'Praca', 'Quadra', 'Residencial', 'Rodovia', 'Rua', 'Sitio', 'Travessa', 'Trevo',
                    'Vale', 'Via', 'Viaduto', 'Viela', 'Vila'],
            ufmunicipio: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO',
                    'RR', 'RS', 'SC', 'SP', 'SE', 'TO'],
        }
    },
    methods: {
         loadConvenios() {
            const url = `${baseApiUrl}/convenios`;
            axios.get(url).then((res) => {
            this.convenios = res.data.map(convenio => {
                return{value: convenio.convenio, text: `${convenio.convenio}` }
            })
            })
        },
          save() {
            const method = this.paciente.codigo ? 'put' : 'post'
            const codigo = this.paciente.codigo ? `/${this.paciente.codigo}` : ''
            axios[method](`${baseApiUrl}/pacientes${codigo}`, this.paciente)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
        },
          getPaciente(){
            const url = `${baseApiUrl}/pacientes/${this.paciente.codigo}`
             axios(url).then(res => this.paciente = res.data)
        },
             remove() {
            const codigo = this.paciente.codigo
            axios.delete(`${baseApiUrl}/pacientes/${codigo}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
         },
        
    },
     mounted() {
        this.paciente.codigo = this.$route.params.codigo
        this.getPaciente()  
        this.loadConvenios()      
     },
}
</script>

<style>

</style>