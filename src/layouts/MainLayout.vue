<template>
  <q-layout view="hHr lpR fFf">
    <q-header reveal style="height: 60px">
      <q-toolbar inset class="bg-grey-2 text-black row justify-center no-wrap shadow-1" style="height: 60px">  
        <div class="col-3" v-if="$q.screen.gt.sm">
          <q-toolbar-title class="text-h4 row items-center">
            <img width="15%" height="20%" class="q-ml-lg q-mr-sm q-mt-sm" src="icons/nuestro-logo.png" />
            <h4 class="text-primary text-bold" style="font-family: Serif">Serviclub</h4>          
          </q-toolbar-title>
        </div>

        <div class="col-12" v-if="$q.screen.lt.md">
          <q-toolbar-title class="text-h4 row items-center">
            <q-btn
              flat round dense
              color="black" size="md"
              icon="menu" aria-label="Menu"
              @click="$store.state.leftDrawerOpen = !$store.state.leftDrawerOpen"
            />

            <img width="10%" height="15%" class="q-ml-lg q-mr-sm q-mt-sm" src="icons/nuestro-logo.png" />
            <h4 class="text-primary text-bold" style="font-family: Serif">Serviclub</h4>          
          </q-toolbar-title>
        </div>            
        

        <div class="col-6" v-if="$q.screen.gt.sm">
          <q-toolbar-title class="row">
            <q-btn stretch flat label="Inicio" to="/" class="cursor-pointer"
              :disable="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''"
            />
            <q-separator vertical inset style="height:70px" />
            <q-btn stretch flat label="Servicios" to="/servicios" class="cursor-pointer"
              :disable="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''"
            />
            <q-separator vertical inset style="height:70px" />
            <q-btn stretch flat label="Productos" to="/productos" class="cursor-pointer"
              :disable="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''"
            />
            <q-separator vertical inset style="height:70px" />
            <q-btn stretch flat label="Entrar" class="cursor-pointer"
              @click="$store.state.dialogo.formularioAcceso = true"
              v-if="$store.state.credencial.token === ''"
            />
            <q-separator vertical inset style="height:70px" v-if="$store.state.credencial.token !== ''" />
            <q-btn-dropdown stretch flat label="Opciones" class="cursor-pointer"
              v-if="$store.state.credencial.token !== ''"
            >
              <q-list dense>
                <q-item clickable exact
                  :disable="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''"
                >
                  <q-item-section @click="refrescarPedidos()">
                    <q-item-label>Mis Pedidos</q-item-label>
                  </q-item-section>
                  <q-tooltip content-class="bg-grey-8" anchor="top left"
                    self="bottom left" :offset="[0, 8]"
                    v-if="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''"
                  >
                    Debe llenar los datos del perfil
                  </q-tooltip>
                </q-item>

                <q-item clickable exact
                  :disable="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''" 
                  @click="$store.state.dialogo.recomendar = true"
                >
                  <q-item-section><q-item-label>Recomendar</q-item-label></q-item-section>
                  <q-tooltip content-class="bg-grey-8" anchor="top left"
                    self="bottom left" :offset="[0, 8]"
                    v-if="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''"
                  >
                    Debe llenar los datos del perfil
                  </q-tooltip>
                </q-item>

                <q-item clickable exact to="/perfil">
                  <q-item-section><q-item-label>Perfil</q-item-label></q-item-section>
                </q-item>

                <q-separator inset spaced />

                <q-item clickable exact>
                  <q-item-section @click="desconectar()">
                    <q-item-label>Salir <q-icon name="logout" /></q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            
            <FormularioAcceso />
            <Recomendar />
          </q-toolbar-title>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="$store.state.leftDrawerOpen"
      bordered
      overlay
      elevated
      content-class="bg-grey-2"
      :width="240"
      :breakpoint="500"
      v-if="$q.screen.lt.md"
    >      
      <Drawer />
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

    <q-footer reveal class="bg-grey-2 text-black row justify-center no-wrap shadow-up-1">
      <q-item-label class="q-mt-md q-mb-md row justify-center">
        <strong>&copy; 2022 </strong><p> Joven Club de Computación y Electrónica</p>
      </q-item-label>
    </q-footer>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',

  components: {
    // MenuSuperior: require('../components/MenuSuperior').default,
    Drawer: require('../components/Drawer').default,
    FormularioAcceso: require('components/dialogos/FormularioAcceso').default,
    Recomendar: require('components/dialogos/Recomendar').default
  },

  data: () => ({
    slide: 'inicio',
    disable: false
  }),

  created () {

    // obt los servicios y productos necesarios
    // this.serviciosInicio()
    //this.productosInicio()
    this.$refrescarServicios()
    this.$refrescarProductos()
    // Obtener el valor de la cadena guardada en localStorage
    const string = localStorage.getItem('key')
    var value = JSON.parse(string)
    console.log(value)
    if (this.$store.state.credencial.token === '' && value !== null) {
      this.$store.state.credencial = value.credencial
      if (value.credencial.instalacionId) {
        this.$store.state.instalacionDelPedido = value.credencial.instalacion
        this.$store.state.instalacionPreferida = value.credencial.instalacion.nombre
      }
    }/* 
    if (this.$store.state.habilitado === true) {
      this.disable = false
    } else {
      this.disable = true
    } */
  },

  methods: {
    refrescarPedidos () {
      console.log('pedidos del user')
      const filter = {
        where: {
          estado : { neq :'cancelado' },
          and: [
            {
              usuarioId: { eq: this.$store.state.credencial.id_usuario}
            }
          ]
        },
        include: [
          {
            relation: 'servicio',
          },
          {
            relation: 'instalacion',
          },
          {
            relation: 'user'
          }
        ]
      }
      const myfilter = encodeURIComponent(JSON.stringify(filter));
      this.$axios.get(this.$store.state.urlAPI + '/pedidos?filter=' + myfilter).then(response => {
        this.$store.state.pedidos = response.data
        this.loading = false
        this.$router.push('/escritorio')
      }).catch(error => {
        console.log(error)
      })
    },

    desconectar () {
      localStorage.clear()
      this.$store.state.credencial.token = ''
      this.$store.state.credencial.nombre = ''
      this.$store.state.credencial.id_usuario = ''
      this.$store.state.credencial.email = ''
      this.$store.state.credencial.municipio.nombre = ''
      this.$store.state.credencial.municipio.id = ''
      this.$store.state.credencial.municipio.provinciaId = ''
      this.$store.state.credencial.municipio.provincia.nombre = ''
      this.$store.state.credencial.municipio.provincia.id = ''
      this.$store.state.credencial.telefono = ''
      this.$store.state.credencial.direccion = ''
      this.$store.state.credencial.ci = ''
      this.$store.state.emailAutenticar = ''
      this.$router.push('/')
    },
  }
}
</script>

<style lang="scss">
  .logo-image {
    position: relative;
    float: left;
    height: 15px;
    transform: translateY(0%);
    background-size: unset
  }
  .card8:hover {
  // background-color: rgb(198, 222, 231);
  border-color: #0D47A1;
  border-width: 2pt;
  max-width: 100%;
}
</style>

