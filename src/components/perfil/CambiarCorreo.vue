<template>
  <div>
    <q-card>
      <q-card-section class="q-pa-md">
        <div class="q-pt-none">
          <q-input v-model="$store.state.credencial.email" filled type="email"
            label-slot clearable
            lazy-rules
              :rules="[val => !!val || 'El campo es obligatorio',
                val => /.+@.+\..+/.test(val) || 'El correo debe ser válido']"
          >
              <template v-slot:label>
                <div class="row items-center all-pointer-events">
                  Email

                  <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                    Dirección de correo
                  </q-tooltip>
                </div>
              </template>
            </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn push label="Cambiar y verificar" class="bg-primary text-white" size="md" @click="validarDatos()" />
      </q-card-actions>
    </q-card>
    <ValidarEmail />
  </div>
</template>

<script>

export default {
  name: 'CambiarCorreo',
  components: {
    ValidarEmail: require('components/dialogos/ValidarEmail').default
  },

  data: () => ({
    datos: {
      email: '',
      credencial: ''
    }
  }),

  created () {
    this.datos.email = this.$store.state.credencial.email
  },

  methods: {
    validarDatos () {
      if (this.datos.email !== '' && this.datos.email !== null) {
        if (this.datos.email !== this.$store.state.credencial.email) {
          this.cambiar()
        } else {
          this.mensajeDatosIncorrectos()
        }
      } else {
        this.mensajeDatosIncompletos()
      }
    },

    mensajeDatosIncorrectos () {
      // error
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Usted no ha modificado su correo electrónico',
        icon: 'mdi-alert-circle'
      })
    },

    mensajeDatosIncompletos () {
      // error
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Debe escribir un nuevo correo electrónico',
        icon: 'mdi-alert-circle'
      })
    },

    mensajeSatisfactorio () {
      this.$q.notify({
        color: 'positive',
        position: 'bottom',
        message: 'El correo electrónico se modificó correctamente',
        icon: 'mdi-check-circle'
      })
    },

    cambiar () {
      this.datos.email = this.$store.state.credencial.email
      this.datos.credencial = this.$store.state.credencial
      this.$axios.post(this.$store.state.urlAPI + '/cambiar-email', this.datos).then(response => {
        console.log(response.data)
        if (response.data == 'existe1' || response.data == 'existe') {
          console.log('mensaje de usuario ya existe en el sistema')
          this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'Debe escribir un nuevo correo electrónico ese ya se encuentra registrado en el sistema',
          icon: 'mdi-alert-circle'
      })
        }
        else if (response.data == false) {
          console.log('mensaje de error al enviar correo')
          this.$store.state.emailAutenticar = this.$store.state.credencial.email
          this.$store.state.dialogo.validarEmail = true
        }
        else if (response.data == true) {
          console.log('mensaje de correo enviado, mandar a verificar codigo');
          this.$store.state.dialogo.validarEmail = true
        }
        this.mensajeSatisfactorio()
      }).catch(error => {
        console.log(error)
        // mensaje de error
      });
      this.mensajeSatisfactorio()
    }
  }
}
</script>
