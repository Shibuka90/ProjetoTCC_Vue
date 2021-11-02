<!--Página de cadastro de Paciente -->
<template>
<!-- titulo da página -->
  <div class="novopacienteatendimento">
        <PageTitle icon="fa fa-user" main="Pacientes" sub="Cadastro de Paciente"
    />
    <!-- início do formulário do cadastro do paciente -->
    <div class="form">
        <b-form>
            <input id="paciente-codigo" type="hidden" v-model="paciente.codigopac">
            <b-row>
                <b-col md="6" sm="12">
                     <b-form-group label="Nome:" label-for="paciente-nome">
                    <b-form-input id="paciente-nome" type="text" v-model="paciente.nomepac" required  placeholder="Informe o Nome do(a) Colaborador(a)...."/>
                </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                <b-form-group label="E-mail:" label-for="paciente-email">
                    <b-form-input id="paciente-email" type="text" v-model="paciente.email" required  placeholder="Informe o E-mail do(a) Colaborador(a)...."/>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
                <b-col  md="auto">
                    <b-form-group label="CPF:" label-for="paciente-cpf">
                        <b-form-input id="paciente-cpf" type="text" v-mask="'###.###.###-##'" v-model="paciente.cpf" required placeholder="xxx.xxx.xxx-xx" />
                    </b-form-group>
                </b-col>
                 <b-col md="auto">
                    <b-form-group label="Data de Nascimento:" label-for="paciente-datanasc">
                        <b-form-input id="paciente-datanasc" type="date"  v-model="paciente.datanasc" required />
                    </b-form-group>
                </b-col>
                  <b-col md="auto">
                    <b-form-group label="Estado Civil:" label-for="paciente-estadocivil">
                        <b-form-input list="paciente-estadocivil" type="text"  v-model="paciente.estadocivil" required />
                        <datalist id="paciente-estadocivil">
                            <option v-for="estadoCivil in estadoCivil" :key="estadoCivil">{{estadoCivil}}</option>
                        </datalist>
                    </b-form-group>
                </b-col>   
                  <b-col md="auto">
                    <b-form-group label="Sexo:" label-for="paciente-sexo">
                        <b-form-input list="paciente-sexo" type="text"  v-model="paciente.sexo" required />
                        <datalist id="paciente-sexo">
                            <option v-for="sexo in sexo" :key="sexo">{{sexo}}</option>
                        </datalist>
                    </b-form-group>
                </b-col>  
                <b-col md="4"> 
                    <b-form-group label="Convênio:" label-for="paciente-convenio">
                        <b-form-select id="paciente-convenio" :options="convenios" v-model="paciente.codconvenio" required>
                        </b-form-select>
                    </b-form-group>
                </b-col>     
            </b-row>
            <b-row>
                  <b-col md="6">
                    <b-form-group label="Mãe:" label-for="paciente-mae">
                        <b-form-input id="paciente-mae" type="text" v-model="paciente.mae" required placeholder="Informe o Cargo do(a) Colaborador(a)" />
                    </b-form-group>
                </b-col> 
                 <b-col md="6">
                    <b-form-group label="Pai:" label-for="paciente-pai">
                      <b-form-input id="paciente-pai" type="text" v-model="paciente.pai" required placeholder="Informe o Cargo do(a) Colaborador(a)" />
                    </b-form-group>
                </b-col> 
            </b-row>
            <b-row>
               <b-col md="auto">
                    <b-form-group label="CEP:" label-for="paciente-ceppaciente">
                        <b-form-input id="paciente-ceppaciente" type="text" v-mask="'#####-###'" v-model="paciente.ceppaciente" required placeholder="xxxxx-xxx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                     <b-form-group label="Tipo:" label-for="paciente-tipo">
                        <b-form-input list="paciente-tipo" type="text"  v-model="paciente.tipo" />
                            <datalist id="paciente-tipo">
                                 <option v-for="tipo in tipo" :key="tipo">{{tipo}}</option>
                            </datalist>
                    </b-form-group>
                </b-col> 
                <b-col md="6">
                    <b-form-group label="Endereço:" label-for="paciente-enderenco">
                        <b-form-input id="paciente-enderenco" type="text"  v-model="paciente.endereco" required placeholder="Informe o Endereço......." />
                    </b-form-group>
                </b-col>
                   <b-col md="auto">
                    <b-form-group label="Número:" label-for="paciente-numero">
                        <b-form-input id="paciente-numero" type="text"  v-model="paciente.numero" required placeholder="Informe o Número......." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="auto">
                    <b-form-group label="Complemento:" label-for="paciente-complemento">
                        <b-form-input id="paciente-complemento" type="text"  v-model="paciente.complemento" placeholder="Informe o Complemento......." />
                    </b-form-group>
                </b-col>
                 <b-col md="6">
                    <b-form-group label="Bairro:" label-for="paciente-bairro">
                        <b-form-input id="paciente-bairro" type="text"  v-model="paciente.bairro" required placeholder="Informe o Bairro......." />
                    </b-form-group>
                </b-col>
                 <b-col md="auto">
                    <b-form-group label="Municipio:" label-for="paciente-municipio">
                        <b-form-input id="paciente-municipio" type="text" v-model="paciente.municipio" required placeholder="Informe o Municipio..." />
                    </b-form-group>
                </b-col>
                    <b-col md="auto">
                     <b-form-group label="UF:" label-for="paciente-ufmunicipio">
                        <b-form-input list="paciente-ufmunicipio" type="text"  v-model="paciente.ufmunicipio" />
                            <datalist id="paciente-ufmunicipio">
                                 <option v-for="ufmunicipio in ufmunicipio" :key="ufmunicipio">{{ufmunicipio}}</option>
                            </datalist>
                    </b-form-group>
                </b-col> 
            </b-row>
            <b-row>
                <b-col md="auto">
                    <b-form-group label="Matricula:" label-for="paciente-matricula">
                        <b-form-input id="paciente-matricula" type="text" v-model="paciente.matricula" required placeholder="xxxxxxxxxxxxxx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Vencimento:" label-for="paciente-vencimento">
                        <b-form-input id="paciente-vencimento" type="date" v-model="paciente.vencimento" required />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Tel.DDD:" label-for="paciente-telddd">
                        <b-form-input id="paciente-telddd" type="text" v-mask="'##'" v-model="paciente.telddd"  placeholder="xx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Telefone:" label-for="paciente-telefone">
                        <b-form-input id="paciente-telefone" type="text" v-mask="'####-####'" v-model="paciente.tel" placeholder="xxxx-xxxx " />
                    </b-form-group>
                </b-col>
                  <b-col md="auto">
                    <b-form-group label="Cel.DDD:" label-for="paciente-celddd">
                        <b-form-input id="paciente-celddd" type="text" v-mask="'##'" v-model="paciente.celddd" required placeholder="xx" />
                    </b-form-group>
                </b-col>
                 <b-col md="auto">
                    <b-form-group label="Celular:" label-for="paciente-celular">
                        <b-form-input id="paciente-celular" type="text" v-mask="'#####-####'" v-model="paciente.cel" requiredplaceholder="xxxxx-xxxx " />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6">
                <b-button router-link to="/novoatendimento" size='lg' class="mb-2" block>Voltar/Cancelar</b-button>
                </b-col>
                <b-col md="6">
                <b-button variant="success" size='lg' class="mb-2" block  @click="save" >Incluir</b-button>
                </b-col>
            </b-row>
        </b-form>
  </div>  
  </div>  
</template>

<script>
import PageTitle from "../../template/PageTitle.vue" // Importa o layout do titulo da página
import { baseApiUrl, showError } from '@/global' // Importa as configuração de acesso para página e mensagens
import axios from 'axios' // Importa as configurações do AXIOS

export default {
    name: "NovoPacienteAtendimento",
    components: { PageTitle },
    data: function() {
        return {
            paciente: {},
            convenio: {},
            convenios:[],
            estadoCivil: ['Solteiro(a)', 'Divorciado(a)', 'Amasiado(a)', 'Casado(a)', 'Separado(a)', 'Uniao Estavel', 'Viuvo(a)'],
            sexo: ['M', 'F'],
            admin: ['Gerente', 'Colaborador','Medico'],
            tipo: ['Area', 'Avenida', 'Alamenda', 'Beco', 'Chacara', 'Condominio', 'Conjunto', 'Distrito', 'Estrada', 'Fazenda', 'Ladeira', 
                    'Largo', 'Loteamento', 'Modulo', 'Parque', 'Praca', 'Quadra', 'Residencial', 'Rodovia', 'Rua', 'Sitio', 'Travessa', 'Trevo',
                    'Vale', 'Via', 'Viaduto', 'Viela', 'Vila'],
            ufmunicipio: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO',
                    'RR', 'RS', 'SC', 'SP', 'SE', 'TO'],
            pacientes: [],        
        }
    },
    methods: {

        // Carregada as informações da Tabela Convênio para o FORM-SELECT
        loadConvenios() {
            const url = `${baseApiUrl}/convenios`;
            axios.get(url).then((res) => {
            this.convenios = res.data.map(convenio => {
                return{value: convenio.codigo, text: `${convenio.convenio}` }
            })
            })
        },
        //Limpa a tela após a inclusão do Paciente
        reset(){
            this.paciente = {}
        },

        //Inclui ou Altera o Cadastro Paciente
        save() {
            const method = this.paciente.codigopac ? 'put' : 'post'
            const codigopac = this.paciente.codigopac ? `/${this.paciente.codigopac}` : ''
            axios[method](`${baseApiUrl}/pacientes${codigopac}`, this.paciente)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
    },
    //Clico de Vida -> Renderização
    mounted(){
        this.loadConvenios()//Carrega as informações da Tabela Convênios
    }
 
}
</script>

<style>

</style>