<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="$store.state.dialogo.contactar">
      <q-card>
        <q-card-section>
          <div class="q-mt-xs q-mb-md row justify-end">
            <q-item-label class="text-primary text-body1 text-center col-10">
              Contactarnos
            </q-item-label>

            <q-btn class="text-primary" flat dense size="10px"
              @click="$store.state.dialogo.contactar = false" icon-right="mdi-window-close"
            />
          </div>

          <div class="text-grey text-caption">
            <q-item-label>No dude en contactarnos ante cualquier queja, duda o sugerencia.</q-item-label>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md q-gutter-y-md column" v-if="$store.state.credencial.token === ''">
            <q-input filled v-model="datos.email" type="email" label-slot clearable
              lazy-rules dense
              :rules="[val => !!val || 'El campo es obligatorio',
                val => /.+@.+\..+/.test(val) || 'El correo debe ser válido']"
            >
              <template v-slot:label>
                <div class="row items-center all-pointer-events">
                  Email

                  <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                    Dirección de correo. Ej: pepe.123@gmail.com
                  </q-tooltip>
                </div>
              </template>
            </q-input>
          </div>

          <div class="q-gutter-y-md column">
            <q-input filled v-model="datos.mensaje" type="textarea" label-slot clearable dense
              lazy-rules :rules="[val => !!val || 'El campo es obligatorio']"
            >
              <template v-slot:label>
                <div class="row items-center all-pointer-events">
                  Mensaje

                  <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">Lo que desea comunicarnos</q-tooltip>
                </div>
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn push label="Enviar" class="bg-primary text-white" size="md" @click="validarDatos()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

export default {
  name: 'Contactar',

  data: () => ({
    datos : {
      email: '',
      mensaje: ''
    }
  }),

  created () {
    if (this.$store.state.credencial.token !== '') {
      this.datos.email = this.$store.state.credencial.email
    }
  },

  methods: {
    validarDatos () {
      if (this.$store.state.credencial.token !== '') {
        if (this.datos.mensaje === '' || this.datos.mensaje === null) {
          this.mensajeDatosIncompletos()
        } else {
          this.enviar()
        }
      } else {
        if (this.datos.mensaje === '' || this.datos.mensaje === null ||
          this.datos.email === '' || this.datos.email === null) {
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

     mensajeError () {
      // error
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Ha ocurrido un error y no se ha podido enviar el correo, intentelo mas tarde',
        icon: 'mdi-alert-circle'
      })
    },

    mensajeSatisfactorio () {
      this.$q.notify({
        color: 'positive',
        position: 'bottom',
        message: 'Su correo electrónico ha sido enviado satisfactoriamente. En breve atenderemos su petición.',
        icon: 'mdi-check-circle'
      })
    },

    enviar () {
      let estosDatos = {
        email: 'serviclub@jovenclub.cu',
        mensaje: this.datos.mensaje,
        from: this.datos.email,
        asunto: 'Contacto'
      }
      this.$axios.post(this.$store.state.urlAPI + '/recomendar', estosDatos).then(response => {
        this.datos.email = ''
        this.datos.mensaje = ''
        if (response.data === false) {
          this.mensajeError()
        }
        else {
          this.$store.state.dialogo.contactar = false
          this.mensajeSatisfactorio()
          this.loading = false

        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
