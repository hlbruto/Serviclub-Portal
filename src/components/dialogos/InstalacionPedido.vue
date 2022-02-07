<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="$store.state.dialogo.eligeMcpio">
      <q-card>
        <q-card-section>
          <div class="q-mt-xs q-mb-md row justify-end">
            <q-item-label class="text-primary text-body1 text-center col-10">
              Elegir Joven Club más cercano
            </q-item-label>

            <q-btn class="text-primary" flat dense size="10px"
              @click="$store.state.dialogo.eligeMcpio = false" icon-right="mdi-window-close"
            />
          </div>

          <div class="text-grey text-caption text-center">
            <q-item-label>
              A esta instalación le llegará el pedido
              cuando ud. solicite un servicio a domicilio,
              elija la más cercana a su casa
            </q-item-label>
          </div>
        </q-card-section>

        <q-card-section>
          <div>
            <SelectsProvMun />
          </div>
        </q-card-section>

        <div class="row justify-evenly" v-if="$q.screen.gt.xs">
          <q-card-section  class="col-5" v-for="instalacion in $store.state.instalaciones" :key="instalacion.id">
            <TarjetaInstalacion :instalacion="instalacion" />
          </q-card-section>
        </div>

        <div v-else>
          <q-card-section v-for="instalacion in $store.state.instalaciones" :key="instalacion.id">
            <TarjetaInstalacion :instalacion="instalacion" />
          </q-card-section>
        </div>           

        <!-- <q-card-actions align="right">
          <q-btn push label="Cerrar" class="bg-primary text-white" size="md"
            @click="limpiarSelects()"
          />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

export default {
  name: 'eligeMcpio',

  components: {
    SelectsProvMun: require('components/SelectsProvMun').default,
    TarjetaInstalacion: require('components/servicios/TarjetaInstalacion').default
  },

  data: () => ({
    nombre: '',
    email: '',
    mensaje: ''
  }),

  created () {
    this.nombre = ''
    this.email = ''
    this.mensaje = ''
    if (this.$store.state.credencial.token !== '') {
      this.nombre = this.$store.state.credencial.nombre
      this.email = this.$store.state.credencial.email
    }
  },

  methods: {
    /* limpiarSelects () {
      this.$store.state.credencial.municipio.provincia.nombre = ''
      this.$store.state.credencial.municipio.nombre = ''
      this.$store.state.instalaciones = []
      this.$store.state.dialogo.eligeMcpio = false
    }, */

    validarDatos () {
      if (this.$store.state.credencial.token !== '') {
        if (this.mensaje === '' || this.mensaje === null) {
          this.mensajeDatosIncompletos()
        } else {
          this.enviar()
        }
      } else {
        if (this.mensaje === '' || this.mensaje === null ||
          this.nombre === '' || this.nombre === null ||
          this.email === '' || this.email === null) {
          this.mensajeDatosIncompletos()
        } else {
          this.enviar()
        }
      }
    },

    mensajeDatosIncompletos () {
      // error
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Debe llenar todos los campos obligatorios',
        icon: 'mdi-alert-circle'
      })
    },

    mensajeSatisfactorio () {
      this.$q.notify({
        color: 'positive',
        position: 'bottom',
        message: 'El mensaje fue enviado',
        icon: 'mdi-check-circle'
      })
    },

    enviar () {
      // satisfactorio
      this.mensajeSatisfactorio()
    }
  }
}
</script>
