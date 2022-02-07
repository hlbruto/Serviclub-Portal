<template>
  <div class="q-mt-md">
    <q-input filled v-model="$store.state.problema" type="textarea"
      label-slot clearable dense
      lazy-rules :rules="[val => !!val || 'El campo es obligatorio']"
    >
      <template v-slot:label>
        <div class="row items-center all-pointer-events">
          Problema

          <q-tooltip content-class="bg-grey-8" anchor="top left"
            self="bottom left" :offset="[0, 8]"
          >
            ¿Cuál es el motivo por el que necesita de este Servicio?
          </q-tooltip>
        </div>
      </template>
    </q-input>

    <q-input v-model="$store.state.momento" filled mask="date" dense
      clearable lazy-rules :rules="[val => !!val || 'El campo es obligatorio']"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="$store.state.momento">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-btn v-model="$store.state.instalacionPreferida" icon="home"
      class="bg-primary text-white full-width" :label="$store.state.instalacionPreferida"
      @click="$store.state.dialogo.eligeMcpio = true"
    />
    <q-btn class="q-mt-sm bg-primary text-white full-width" v-if="$store.state.unservicio.tarifa !== 'Gratis'"
      label="pagar" @click="validarDatos()"
    />

    <q-btn class="q-mt-sm bg-primary text-white full-width" v-else
      label="solicitar" @click="validarDatos()"
    />

    <!-- <formularioAccesoSISCAE /> -->
    <eligeMcpio />
  </div>
</template>

<script>

export default {
  name: 'SolicitarServicio',

  components: {
    // formularioAccesoSISCAE: require('components/dialogos/FormularioAccesoSISCAE').default,
    eligeMcpio: require('components/dialogos/InstalacionPedido').default
  },

  data: () => ({
    date:'2021/02/01',
    datos: {
      problema: '',
      momento: '',
      servicioId: '',
      instalacionId: '',
      usuarioId: '',
      estado: '',
      municipioId: '',
      provinciaId: ''

    }
  }),
  
  methods: {
    validarDatos () {
      this.datos.problema = this.$store.state.problema
      this.datos.momento = this.$store.state.momento
      if (this.datos.problema === '' || this.datos.problema === null ||
        this.datos.momento === '' || this.datos.momento === null ||
        this.$store.state.instalacionPreferida === '' ||
        this.$store.state.instalacionPreferida === null ||
        this.$store.state.instalacionPreferida === 'Escoge una instalación') {
        this.mensajeDatosIncompletos()
      } else {
        if (this.$store.state.unservicio.tarifa === 'GRATIS' || this.$store.state.unservicio.tarifa === 'Gratis' ||
          this.$store.state.unservicio.tarifa === 'gratis') {
          this.solicitarServicio()
        } else {
          this.$store.state.dialogo.autenticarSiscae = true
        }
      }
    },

    mensajeDatosIncompletos () {
      // error
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Debe llenar todos los campos obligatorios y escoger una instalación',
        icon: 'mdi-alert-circle'
      })
    },

    mensajeError () {
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Ha ocurrido un error inesperado y el Pedido no pudo realizarse. Intente de nuevo.',
        icon: 'mdi-alert-circle'
      })
    },

    mensajeSatisfactorio () {
      this.$q.notify({
        color: 'positive',
        position: 'bottom',
        message: 'Su solicitud ha sido enviada, muy pronto contactaremos con usted.',
        icon: 'mdi-check-circle'
      })
    },

    async solicitarServicio () {
      this.datos.servicioId = this.$store.state.unservicio.id
      this.datos.instalacionId = this.$store.state.instalacionDelPedido.id
      this.datos.municipioId = this.$store.state.instalacionDelPedido.municipioId
      this.datos.provinciaId = this.$store.state.instalacionDelPedido.provinciaId
      this.datos.usuarioId = this.$store.state.credencial.id_usuario
      this.datos.estado = 'pendiente'
      var datosUser = {
        instalacionId: this.datos.instalacionId
      }
      this.$axios.post(this.$store.state.urlAPI + '/pedidos', this.datos).then(response => {
        this.$axios.patch(this.$store.state.urlAPI + '/usuarios/' + this.$store.state.credencial.id_usuario, datosUser).then(response => {
        }).catch(error => {
          console.log(error)
          // mensaje de error
        });
        this.refrescarPedidos()
      }).catch(error => {
        console.log(error)
        // mensaje de error
      });
      
      // satisfactorio
    },

    refrescarPedidos () {
      console.log('entra para ir al escritorio')
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
          }
        ],
      };
      const myfilter = encodeURIComponent(JSON.stringify(filter));
      this.$axios.get(this.$store.state.urlAPI + '/pedidos?filter=' + myfilter).then(response => {
        console.log(response.data)
        this.$store.state.pedidos = response.data
        this.$store.state.nombreTrab = ''
        this.mensajeSatisfactorio()
        this.$router.push('/escritorio')
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
 