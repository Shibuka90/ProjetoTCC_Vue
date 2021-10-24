<!--Página de cadastro do Médico -->
<template>
<!-- titulo da página -->
  <div class="novomedico">
        <PageTitle icon="fa fa-user-md" main="Médicos" sub="Cadastro de Médico"
    />
     <!-- início do formulário do cadastro do meédico -->
    <div class="form">
        <b-form>
            <input id="medico-codigo" type="hidden" v-model="medico.codigomed">
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="medico-nome">
                        <b-form-input id="medico-nome" type="text" v-model="medico.nome" required placeholder="Informe o Nome do(a) Colaborador(a)...."/>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="medico-email">
                        <b-form-input id="medico-email" type="text" v-model="medico.email" required placeholder="Informe o E-mail do(a) Colaborador(a)...."/>
                    </b-form-group>
              </b-col>
            </b-row>
            <b-row>
                <b-col  md="auto">
                    <b-form-group label="CPF:" label-for="medico-cpf">
                        <b-form-input id="medico-cpf" type="text" v-mask="'###.###.###-##'" v-model="medico.cpf" required placeholder="xxx.xxx.xxx-xx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Data de Nascimento:" label-for="medico-datanasc">
                        <b-form-input id="medico-datanasc" type="date"  v-model="medico.datanasc" required />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Estado Civil:" label-for="medico-estadocivil">
                        <b-form-input list="medico-estadocivil" type="text"  v-model="medico.estadocivil" required />
                            <datalist id="medico-estadocivil">
                                <option v-for="estadoCivil in estadoCivil" :key="estadoCivil">{{estadoCivil}}</option>
                            </datalist>
                    </b-form-group>
                </b-col>   
                <b-col md="auto">
                    <b-form-group label="Sexo:" label-for="medico-sexo">
                        <b-form-input list="medico-sexo" type="text"  v-model="medico.sexo" required />
                            <datalist id="medico-sexo">
                                <option v-for="sexo in sexo" :key="sexo">{{sexo}}</option>
                            </datalist>
                    </b-form-group>
                </b-col>       
            </b-row>
            <b-row>
                <b-col md="6">
                    <b-form-group label="Especialidade:" label-for="medico-especialidade">
                        <b-form-select id="medico-especialidade" :options="especialidades" v-model="medico.codespecialidade" required></b-form-select>
                    </b-form-group>
                </b-col> 
                    <b-col md="auto">
                        <b-form-group label="CRM:" label-for="medico-crm">
                            <b-form-input id="medico-crm" type="text" v-model="medico.crm" placeholder="Informe o CRM " />
                        </b-form-group>
                </b-col>  
                <b-col md="auto">
                     <b-form-group label="UF CR:" label-for="medico-ufcr">
                        <b-form-input list="medico-ufcr" type="text"  v-model="medico.ufcr" />
                            <datalist id="medico-ufcr">
                                 <option v-for="ufcr in ufcr" :key="ufcr">{{ufcr}}</option>
                            </datalist>
                    </b-form-group>
                </b-col>  
            </b-row>
            <b-row>
               <b-col md="auto">
                    <b-form-group label="CEP:" label-for="medico-cepmedico">
                        <b-form-input id="medico-cepmedico" type="text" v-mask="'#####-###'" v-model="medico.cepmedico" required placeholder="xxxxx-xxx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                     <b-form-group label="Tipo:" label-for="medico-tipo">
                        <b-form-input list="medico-tipo" type="text"  v-model="medico.tipo" />
                            <datalist id="medico-tipo">
                                 <option v-for="tipo in tipo" :key="tipo">{{tipo}}</option>
                            </datalist>
                    </b-form-group>
                </b-col> 
                <b-col md="6">
                    <b-form-group label="Endereço:" label-for="medico-enderenco">
                        <b-form-input id="medico-enderenco" type="text"  v-model="medico.endereco" required placeholder="Informe o Endereço......." />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Número:" label-for="medico-numero">
                        <b-form-input id="medico-numero" type="text"  v-model="medico.numero" required placeholder="Informe o Número......." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="auto">
                    <b-form-group label="Complemento:" label-for="medico-complemento">
                        <b-form-input id="medico-complemento" type="text"  v-model="medico.complemento" placeholder="Informe o Complemento......." />
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Bairro:" label-for="medico-bairro">
                        <b-form-input id="medico-bairro" type="text"  v-model="medico.bairro" required placeholder="Informe o Bairro......." />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Municipio:" label-for="medico-municipio">
                        <b-form-input id="medico-municipio" type="text" v-model="medico.municipio" required placeholder="Informe o Municipio..." />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="UF:" label-for="medico-ufmunicipio">
                        <b-form-input list="medico-ufmunicipio" type="text"  v-model="medico.ufmunicipio" />
                            <datalist id="medico-ufmunicipio">
                                 <option v-for="ufmunicipio in ufmunicipio" :key="ufmunicipio">{{ufmunicipio}}</option>
                            </datalist>
                    </b-form-group>
                </b-col> 
            </b-row>
            <b-row>
                <b-col md="auto">
                    <b-form-group label="Tel.DDD:" label-for="medico-telddd">
                        <b-form-input id="medico-telddd" type="text" v-mask="'##'" v-model="medico.telddd" placeholder="xx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Telefone:" label-for="medico-telefone">
                        <b-form-input id="medico-telefone" type="text" v-mask="'####-####'" v-model="medico.tel" placeholder="xxxx-xxxx " />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Cel.DDD:" label-for="medico-celddd">
                        <b-form-input id="medico-celddd" type="text" v-mask="'##'" v-model="medico.celddd" required placeholder="xx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Celular:" label-for="medico-celular">
                        <b-form-input id="medico-celular" type="text" v-mask="'#####-####'" v-model="medico.cel" required placeholder="xxxxx-xxxx " />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6">
                    <b-button router-link to="/medicos" size='lg' class="mb-2" block>Cancelar</b-button>
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
import PageTitle from "../../template/PageTitle.vue"
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: "NovoMedico",
    components: { PageTitle },
    data: function() {
        return {
            medico: {},
            especialidade: {},
            especialidades: [],
            estadoCivil: ['Solteiro(a)', 'Divorciado(a)', 'Amasiado(a)', 'Casado(a)', 'Separado(a)', 'Uniao Estavel', 'Viuvo(a)'],
            sexo: ['M', 'F'],
            ufcr: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO',
                    'RR', 'RS', 'SC', 'SP', 'SE', 'TO'],
            tipo: ['Area', 'Avenida', 'Alamenda', 'Beco', 'Chacara', 'Condominio', 'Conjunto', 'Distrito', 'Estrada', 'Fazenda', 'Ladeira', 
                    'Largo', 'Loteamento', 'Modulo', 'Parque', 'Praca', 'Quadra', 'Residencial', 'Rodovia', 'Rua', 'Sitio', 'Travessa', 'Trevo',
                    'Vale', 'Via', 'Viela', 'Vila'],
            ufmunicipio: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO',
                    'RR', 'RS', 'SC', 'SP', 'SE', 'TO'],
            medicos: [],
            }
    },
    methods: {
         loadEspecialidades() {
            const url = `${baseApiUrl}/especialidades`;
            axios.get(url).then((res) => {
            this.especialidades = res.data.map(especialidade => {
                return{value: especialidade.codigo, text: `${especialidade.especialidade}` }
            })
            })
        },
           reset(){
            this.medico = {}
        },
       save() {
            const method = this.medico.codigomed ? 'put' : 'post'
            const codigomed = this.medico.codigomed ? `/${this.medico.codigomed}` : ''
            axios[method](`${baseApiUrl}/medicos${codigomed}`, this.medico)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
         remove() {
            const codigomed = this.medico.codigomed
            axios.delete(`${baseApiUrl}/medicos/${codigomed}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
         },
        loadMedico(medico){
            this.medico = {...medico}
        },

        loadEspecialidade(especialidade){
            this.especialidade = {...especialidade}
        },
    },
    mounted(){
        this.loadEspecialidades()
    }
}
</script>

<style>

</style>