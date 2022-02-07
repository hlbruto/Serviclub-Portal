<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="$store.state.dialogo.formularioAccesoSISCAE">
      <q-card>
        <q-card-section>
          <div class="text-h5 text-primary">
            <q-item-label>
              Formulario de Acceso al SISCAE
            </q-item-label>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md q-gutter-y-md column">
            <q-input v-model="email" filled type="email" input-class="text-right"
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

          <div class="q-pa-md q-gutter-y-md column">
            <q-input v-model="password" filled  :type="isPwd ? 'password' : 'text'"
              hint="Password with toggle" input-class="text-right" label-slot clearable
              counter lazy-rules
              :rules="[val => !!val || 'El campo es obligatorio',
                val => val.length >= 8 || 'Debe ser mayor de 7 caracteres']"
            >
              <template v-slot:append>
                <div class="row items-center all-pointer-events">
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </div>
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row justify-center">
          <q-card-actions align="right">
            <q-btn flat label="¿Ha olvidado su clave?" class="text-primary" size="sm" />
          </q-card-actions>
          </div>

          <div class="q-pa-md q-gutter-y-md column" style="max-width: 300px">
            <q-item-label class="text-caption">
              <p>
                <q-icon name="mdi-information"/>
                <small>SI USTED NO POSEE UN USUARIO EN EL SISTEMA, AL ENTRAR SE LE CREARÁ UNO</small>
              </p>
            </q-item-label>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Entrar" class="bg-primary text-white" size="md" @click="validarDatos()"/>
          <q-btn flat label="Cerrar" v-close-popup class="text-primary" size="md" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

export default {
  name: 'formularioAcceso',

  data: () => ({
    email: '',
    password: '',
    isPwd: true
  }),

  methods: {
    validarDatos () {
      if (this.password === '' || this.password === null ||
      this.email === '' || this.email === null) {
        this.mensajeDatosIncompletos()
      } else {
        this.entrar()
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
        color: 'secondary',
        position: 'bottom',
        message: 'Bienvenid@ ' + this.$store.state.credencial.nombre,
        icon: 'mdi-check-circle'
      })
    },

    entrar () {
      /* this.$store.state.habilitado = true
      this.$store.state.credencial.token = '1'
      this.$store.state.credencial.nombre = 'Lucia' */
      this.$store.state.dialogo.formularioAccesoSISCAE = false
      this.mensajeSatisfactorio()
    }
  }
}
</script>
