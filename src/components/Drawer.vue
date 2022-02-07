<template>
  <div>
    <q-item-label class="q-pa-sm q-mt-md q-mb-md text-bold">
      0 elementos - ($0.00)
    </q-item-label>

    <div v-for="opcion in menu" :key="opcion.label">
      <q-item clickable exact :to="opcion.link"
        :disable="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''"
      >
        <q-item-section>
          <q-item-label>{{opcion.label}}</q-item-label>
          <q-tooltip content-class="bg-grey-8" anchor="top left"
            self="bottom left" :offset="[0, 8]"
            v-if="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''"
          >
            Debe llenar los datos del perfil
          </q-tooltip>
        </q-item-section>
      </q-item>
    </div>

    <q-item clickable exact v-if="$store.state.credencial.token === ''"
      @click="$store.state.dialogo.formularioAcceso = true"
    >
      <q-item-section>
        <q-item-label>REGISTRAR <q-icon name="login" size="sm" /> </q-item-label>
      </q-item-section>
    </q-item>

    <q-expansion-item
      v-if="$store.state.credencial.token !== ''"         
      label="OPCIONES"
      expand-separator
    >
      <q-separator inset />

      <q-list class="q-ml-lg" dense>
        <q-item clickable exact
          :disable="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''"
        >
          <q-item-section @click="refrescarPedidos()">Mis Pedidos</q-item-section>
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
          <q-item-section>Recomendar</q-item-section>
          <q-tooltip content-class="bg-grey-8" anchor="top left"
            self="bottom left" :offset="[0, 8]"
            v-if="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''"
          >
            Debe llenar los datos del perfil
          </q-tooltip>
        </q-item>

        <q-item clickable exact to="/perfil">
          <q-item-section>Perfil</q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>

    <q-item clickable exact>
      <q-item-label @click="desconectar()"> SALIR <q-icon name="logout" size="sm" /></q-item-label>
    </q-item>

    <Recomendar />
    <FormularioAcceso />
  </div>
</template>

<script>
export default {
  name: 'Drawer',

  components: {
    FormularioAcceso: require('components/dialogos/FormularioAcceso').default,
    Recomendar: require('components/dialogos/Recomendar').default
  },

  data: () => ({
    menu: [
      { label: 'INICIO', link: '/', icon: 'mdi-view-dashboard' },
      { label: 'SERVICIOS', link: '/servicios', icon: 'mdi-alpha-s-box' },
      { label: 'PRODUCTOS', link: '/productos', icon: 'mdi-alpha-p-box' }/*,
      { label: 'NOTICIAS', link: '/noticias', icon: 'mdi-email-edit' },
      { label: 'GALERÍAS', link: '/galerias', icon: 'mdi-email-edit' } */
    ]
  }),

  created () {},

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
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.texto1 {
  font-family: 'Courier New', Courier, monospace
}

.cards-servicios {
  height: 200px;
  position: relative;
}

</style>
