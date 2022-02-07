<template>
 <div class="row items-center">
     <q-btn v-if="$q.screen.gt.sm" to="/" flat size="12px" label="Inicio"
      :disable="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''"
    />
    <q-btn v-if="$q.screen.gt.sm" to="/servicios" flat size="12px" label="Servicios"            
      :disable="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''"
    />
    <!-- <q-btn v-if="$q.screen.gt.sm" to="/productos" flat size="12px" label="Productos"
      :disable="$store.state.credencial.estado !== 2 && $store.state.credencial.token !== ''"
    /> -->
    <q-btn v-if="$store.state.credencial.token === '' && $q.screen.gt.sm" size="12px"
      label="Registrar" flat @click="$store.state.dialogo.formularioAcceso = true"
    />
    <q-btn v-if="$store.state.credencial.token !== '' && $q.screen.gt.sm" 
      size="12px" label="opciones" icon-right="mdi-menu-down" flat
    >
      <q-menu>
        <div class="row no-wrap q-pa-sm text-center">
          <div class="column">
            <q-list dense style="min-width: 100px">
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

              <q-separator />

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

              <q-separator />

              <q-item clickable exact to="/perfil">
                <q-item-section>Perfil</q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable exact>
                <q-item-section @click="desconectar()">Salir</q-item-section>
              </q-item>
            </q-list>
            </div>
        </div>
      </q-menu>
    </q-btn>
    <FormularioAcceso />
    <Recomendar />
  </div>
</template>

<script>

export default {
  name: 'MenuSuperior',

  components: {
    FormularioAcceso: require('components/dialogos/FormularioAcceso').default,
    Recomendar: require('components/dialogos/Recomendar').default
  },


  data: () => ({
    disable: false
  }),

  created () {
    /* const string = localStorage.getItem('key')
    var value = JSON.parse(string)
    console.log(value)
    if (this.$store.state.credencial.token === '' && value !== null) {
      this.$store.state.credencial = value.credencial
      this.$store.state.instalacionDelPedido = value.credencial.instalacion
      this.$store.state.instalacionPreferida = value.credencial.instalacion.nombre
    } */
    /* if (this.$store.state.habilitado === true) {
      this.disable = false
    } else {
      this.disable = true
    } */
  },

  methods: {
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

    refrescarPedidos () {
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
            relation: 'servicio'
          },
          {
            relation: 'instalacion'
          }
        ]
      };
      const myfilter = encodeURIComponent(JSON.stringify(filter));
      this.$axios.get(this.$store.state.urlAPI + '/pedidos?filter=' + myfilter).then(response => {
        console.log(response.data)
        this.$store.state.pedidos = response.data
        this.$store.state.nombreTrab = ''
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
      this.$router.push('/escritorio')
    }
  }
}
</script>

