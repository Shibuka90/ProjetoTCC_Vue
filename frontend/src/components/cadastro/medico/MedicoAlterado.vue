<template>
  <div class="medicoalterado">
        <PageTitle
      icon="fa fa-user-md"
      main="Médicos"
      sub="Cadastro do Médico"
    />
    <div class="form">
        <b-form>
            <input id="medico-codigo" type="hidden" v-model="medico.codigo">
            <b-row>
                <b-col md="6" sm="12">
                     <b-form-group label="Nome:" label-for="medico-nome">
                    <b-form-input id="medico-nome" type="text" v-model="medico.nome" required 
                    :readonly="mode === 'remove'" placeholder="Informe o Nome do(a) Médico(a)...."/>
                </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                <b-form-group label="E-mail:" label-for="medico-email">
                    <b-form-input id="medico-email" type="text" v-model="medico.email" required 
                    :readonly="mode === 'remove'" placeholder="Informe o E-mail do(a) Médico(a)...."/>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
                <b-col  md="auto">
                    <b-form-group label="CPF:" label-for="medico-cpf">
                        <b-form-input id="medico-cpf" type="text" v-mask="'###.###.###-##'" v-model="medico.cpf" required
                        :readonly="mode === 'remove'" placeholder="xxx.xxx.xxx-xx" />
                    </b-form-group>
                </b-col>
                 <b-col md="auto">
                    <b-form-group label="Data de Nascimento:" label-for="medico-datanasc">
                        <b-form-input id="medico-datanasc" type="date"  v-model="medico.datanasc" required
                        :readonly="mode === 'remove'" />
                    </b-form-group>
                </b-col>
                  <b-col md="auto">
                    <b-form-group label="Estado Civil:" label-for="medico-estadocivil">
                        <b-form-input list="medico-estadocivil" type="text"  v-model="medico.estadocivil" required
                        :readonly="mode === 'remove'" />
                        <datalist id="medico-estadocivil">
                            <option v-for="estadoCivil in estadoCivil" :key="estadoCivil">{{estadoCivil}}</option>
                        </datalist>
                    </b-form-group>
                </b-col>   
                  <b-col md="auto">
                    <b-form-group label="Sexo:" label-for="medico-sexo">
                        <b-form-input list="medico-sexo" type="text"  v-model="medico.sexo" required
                        :readonly="mode === 'remove'" />
                        <datalist id="medico-sexo">
                            <option v-for="sexo in sexo" :key="sexo">{{sexo}}</option>
                        </datalist>
                    </b-form-group>
                </b-col>       
            </b-row>
            <b-row>
                <b-col md="6">
                    <b-form-group label="Especialidade:" label-for="medico-especialidade">
                        <b-form-select id="medico-especialidade" :options="especialidades" v-model="medico.especialidade" required>
                        </b-form-select>
                    </b-form-group>
                </b-col> 
                <b-col md="auto">
                    <b-form-group label="CRM:" label-for="medico-crm">
                        <b-form-input id="medico-crm" type="text" v-model="medico.crm" 
                        :readonly="mode === 'remove'" placeholder="Informe o CRM " />
                    </b-form-group>
                </b-col>  
                <b-col md="auto">
                     <b-form-group label="UF CR:" label-for="medico-ufcr">
                        <b-form-input list="medico-ufcr" type="text"  v-model="medico.ufcr" 
                         :readonly="mode === 'remove'" />
                            <datalist id="medico-ufcr">
                                 <option v-for="ufcr in ufcr" :key="ufcr">{{ufcr}}</option>
                            </datalist>
                    </b-form-group>
                </b-col>  
            </b-row>
            <b-row>
               <b-col md="auto">
                    <b-form-group label="CEP:" label-for="medico-cepmedico">
                        <b-form-input id="medico-cepmedico" type="text" v-mask="'#####-###'" v-model="medico.cepmedico" required
                        :readonly="mode === 'remove'" placeholder="xxxxx-xxx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                     <b-form-group label="Tipo:" label-for="medico-tipo">
                        <b-form-input list="medico-tipo" type="text"  v-model="medico.tipo" 
                         :readonly="mode === 'remove'" />
                            <datalist id="medico-tipo">
                                 <option v-for="tipo in tipo" :key="tipo">{{tipo}}</option>
                            </datalist>
                    </b-form-group>
                </b-col> 
                <b-col md="6">
                    <b-form-group label="Endereço:" label-for="medico-enderenco">
                        <b-form-input id="medico-enderenco" type="text"  v-model="medico.endereco" required
                        :readonly="mode === 'remove'" placeholder="Informe o Endereço......." />
                    </b-form-group>
                </b-col>
                   <b-col md="auto">
                    <b-form-group label="Número:" label-for="medico-numero">
                        <b-form-input id="medico-numero" type="text"  v-model="medico.numero" required
                        :readonly="mode === 'remove'" placeholder="Informe o Número......." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="auto">
                    <b-form-group label="Complemento:" label-for="medico-complemento">
                        <b-form-input id="medico-complemento" type="text"  v-model="medico.complemento" 
                        :readonly="mode === 'remove'" placeholder="Informe o Complemento......." />
                    </b-form-group>
                </b-col>
                 <b-col md="6">
                    <b-form-group label="Bairro:" label-for="medico-bairro">
                        <b-form-input id="medico-bairro" type="text"  v-model="medico.bairro" required
                        :readonly="mode === 'remove'" placeholder="Informe o Bairro......." />
                    </b-form-group>
                </b-col>
                 <b-col md="auto">
                    <b-form-group label="Municipio:" label-for="medico-municipio">
                        <b-form-input id="medico-municipio" type="text" v-model="medico.municipio" required
                        :readonly="mode === 'remove'" placeholder="Informe o Municipio..." />
                    </b-form-group>
                </b-col>
                    <b-col md="auto">
                     <b-form-group label="UF:" label-for="medico-ufmunicipio">
                        <b-form-input list="medico-ufmunicipio" type="text"  v-model="medico.ufmunicipio" 
                         :readonly="mode === 'remove'" />
                            <datalist id="medico-ufmunicipio">
                                 <option v-for="ufmunicipio in ufmunicipio" :key="ufmunicipio">{{ufmunicipio}}</option>
                            </datalist>
                    </b-form-group>
                </b-col> 
            </b-row>
            <b-row>
                <b-col md="auto">
                    <b-form-group label="Tel.DDD:" label-for="medico-telddd">
                        <b-form-input id="medico-telddd" type="text" v-mask="'##'" v-model="medico.telddd" 
                        :readonly="mode === 'remove'" placeholder="xx" />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Telefone:" label-for="medico-telefone">
                        <b-form-input id="medico-telefone" type="text" v-mask="'####-####'" v-model="medico.tel" 
                        :readonly="mode === 'remove'" placeholder="xxxx-xxxx " />
                    </b-form-group>
                </b-col>
                  <b-col md="auto">
                    <b-form-group label="Cel.DDD:" label-for="medico-celddd">
                        <b-form-input id="medico-celddd" type="text" v-mask="'##'" v-model="medico.celddd" required
                        :readonly="mode === 'remove'" placeholder="xx" />
                    </b-form-group>
                </b-col>
                 <b-col md="auto">
                    <b-form-group label="Celular:" label-for="medico-celular">
                        <b-form-input id="medico-celular" type="text" v-mask="'#####-####'" v-model="medico.cel" required
                        :readonly="mode === 'remove'" placeholder="xxxxx-xxxx " />
                    </b-form-group>
                </b-col>
            </b-row>
               <b-row>
                <b-col md="4">
                <b-button router-link to="/medicos" size='lg' class="mb-2" block>Cancelar</b-button>
                </b-col>
                <b-col md="2">
                <b-button variant="danger" size='lg' class="mb-2" block @click="remove" router-link to="/medicos">Excluir</b-button>
                </b-col>
                <b-col md="6">
                <b-button variant="success" size='lg' class="mb-2" block  @click="save" router-link to="/medicos">Alterar</b-button>
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
    name: "MedicoAlterado",
    components: { PageTitle},
    data: function() {
        return {
            mode:'save',
            medico: {},
            medicos: [],
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
        }
    },
    methods: {
            loadEspecialidades() {
            const url = `${baseApiUrl}/especialidades`;
            axios.get(url).then((res) => {
            this.especialidades = res.data.map(especialidade => {
                return{value: especialidade.especialidade, text: `${especialidade.especialidade}` }
            })
            })
        },
            loadEspecialidade(especialidade, mode='save'){
            this.mode = mode
            this.especialidade = {...especialidade}
        },
            save() {
            const method = this.medico.codigo ? 'put' : 'post'
            const codigo = this.medico.codigo ? `/${this.medico.codigo}` : ''
            axios[method](`${baseApiUrl}/medicos${codigo}`, this.medico)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
        },
          getMedico(){
            const url = `${baseApiUrl}/medicos/${this.medico.codigo}`
             axios(url).then(res => this.medico = res.data)
        },
             remove() {
            const codigo = this.medico.codigo
            axios.delete(`${baseApiUrl}/medicos/${codigo}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
         },
          onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
        }
        
    },
     mounted() {
        this.medico.codigo = this.$route.params.codigo
        this.getMedico()     
        this.loadEspecialidades()   
     },
}
</script>

<style>

</style>