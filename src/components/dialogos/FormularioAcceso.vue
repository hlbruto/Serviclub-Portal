<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="$store.state.dialogo.formularioAcceso">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-primary text-center">
            <q-item-label>
              Formulario de Acceso
            </q-item-label>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md q-gutter-y-md column">
            <q-input v-model="$store.state.emailAutenticar" filled type="email"
              label-slot lazy-rules clearable dense
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

            <q-input v-model="data.password" filled  :type="isPwd ? 'password' : 'text'"
              label-slot dense
              counter lazy-rules clearable
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

        <q-card-actions align="center">
          <q-btn push label="Entrar" class="bg-primary text-white" size="md" @click="validarDatos()"/>
        </q-card-actions>

        <q-card-section class="q-pt-none">
          <div class="row justify-center">
          <q-card-actions align="right">
            <q-btn @click="recuperarClave()" flat label="¿Ha olvidado su clave?" class="text-primary" size="sm" />
          </q-card-actions>
          <!-- <div class="row justify-center">
          <q-card-actions align="right">
            <q-btn @click="manejaDialogos()" flat label="Autenticarse con SISCAE" class="text-primary" size="sm" />
          </q-card-actions>
          </div> -->
          </div>

          <div class="q-pa-md q-gutter-y-md column" style="max-width: 300px">
            <q-item-label class="text-caption">
              <p>
                <q-icon name="mdi-information"/>
                <small>SI USTED NO POSEE UN USUARIO EN EL SISTEMA, AL ENTRAR SE LE CREARÁ UNO</small>
              </p>
              <!-- <p>
                <q-icon name="mdi-information"/>
                <small>SI USTED POSEE UN USUARIO EN EL SISCAE, DE CLICK EN "AUTENTICARSE CON SISCAE"</small>
              </p> -->
            </q-item-label>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <ValidarEmail />
    <AutenticarSiscae />
  </div>
</template>

<script>

export default {
  name: 'formularioAcceso',

  components: {
    ValidarEmail: require('components/dialogos/ValidarEmail').default,
    AutenticarSiscae: require('components/dialogos/AutenticarSiscae').default
  },

  data: () => ({
    data: {
      email: '',
      password: ''
    },
    isPwd: true
  }),

  methods: {
    validarDatos () {
      if (this.data.password === '' || this.data.password === null || this.data.password === undefined ||
        this.$store.state.emailAutenticar === '' ||
        this.$store.state.emailAutenticar  === null ||
        this.$store.state.emailAutenticar === undefined || this.data.password.length < 8) {
        this.mensajeDatosIncompletos()
      } else {
        this.entrar()
      }
    },

    /* manejaDialogos () {
      this.$store.state.dialogo.formularioAcceso = false
      this.$store.state.dialogo.autenticarSiscae = true
    }, */

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
      // error al enviar correo de cod de validac
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'No se le ha podido enviar el código a su dirección de correo',
        icon: 'mdi-alert-circle'
      })
    },

   /*  mensajeIncorrecto () {
      // error al enviar correo de cod de validac
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Usuario y/o contraseña incorrecto(s)',
        icon: 'mdi-alert-circle'
      })
    }, */

    mensajeInactivo () {
      // error al enviar correo de cod de validac
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Su usuario no tiene acceso a este sistema porque ha sido desactivado por el administrador',
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

    mensajeSinCorreo (codigo) {
      this.$q.notify({
        color: 'secondary',
        position: 'bottom',
        message: 'Su codigo de verificación es ' + codigo,
        icon: 'mdi-check-circle'
      })
    },

    recuperarClave () {
      if (this.$store.state.emailAutenticar == '') {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'Debe escribir su correo electrónico',
          icon: 'mdi-check-circle'
        })
      }
      else {
        var datos = {
          email: this.$store.state.emailAutenticar
        }
        this.$axios.post(this.$store.state.urlAPI + '/recuperar-clave', datos).then(response => {
          console.log(response.data)
          if (response.data == true || response.data == false) {
            this.$store.state.dialogo.validarEmail = true
          }
          else if (response.data == 'no-existe') {
            this.$q.notify({
              color: 'negative',
              position: 'bottom',
              message: this.$store.state.emailAutenticar +' '+ 'no se encuentra registrado en nuestro sistema',
              icon: 'mdi-check-circle'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },

    entrar () {
      this.data.email = this.$store.state.emailAutenticar
      this.$axios.post(this.$store.state.urlAPI + '/usuarios/login', this.data).then(response => {
        console.log(response.data.codigo)
        console.log(response.data.correo)
        console.log(response.data)
        if (response.data.correo === false) {
          this.mensajeError()
          /* this.$store.state.dialogo.formularioAcceso = false
          this.$store.state.dialogo.validarEmail = true
          this.mensajeSinCorreo(response.data.codigo) */
        } else if (response.data === 'verificar-codigo') {          
          this.$store.state.dialogo.formularioAcceso = false
          this.$store.state.dialogo.validarEmail = true          
        } else if (response.data === 'incorrecto') {
          var mensaje = 'Su usuario y/o contraseña son incorrectos'
          this.$manejarError(mensaje)
        } else if (response.data === 'inactivo') {
          this.mensajeInactivo()
        } else {
          this.$store.state.dialogo.formularioAcceso = false
          localStorage.clear()
          var value = JSON.stringify({
            'credencial': response.data.credencial
          })
          localStorage.setItem('key', value)
          this.$store.state.credencial.id_usuario = response.data.credencial.id_usuario
          this.$store.state.credencial.activo = response.data.credencial.activo
          this.$store.state.credencial.estado = response.data.credencial.estado
          this.$store.state.credencial.email = response.data.credencial.email
          this.$store.state.credencial.token = response.data.credencial.token
          if (response.data.credencial.municipioId != undefined && response.data.credencial.municipioId != '') {
            this.$store.state.credencial.municipio = response.data.credencial.municipio
          }
          if (response.data.credencial.instalacionId != undefined && response.data.credencial.instalacionId != '') {
            this.$store.state.credencial.instalacion = response.data.credencial.instalacion
            this.$store.state.instalacionPreferida = this.$store.state.credencial.instalacion.nombre
            this.$store.state.instalacionDelPedido = this.$store.state.credencial.instalacion
          }
          if (response.data.credencial.nombre != undefined && response.data.credencial.nombre != '') {
            this.$store.state.credencial.nombre = response.data.credencial.nombre
          }
          if (response.data.credencial.telefono != undefined && response.data.credencial.telefono != '') {
            this.$store.state.credencial.telefono = response.data.credencial.telefono
          }
          if (response.data.credencial.direccion != undefined && response.data.credencial.direccion != '') {
            this.$store.state.credencial.direccion = response.data.credencial.direccion
          }
          if (response.data.credencial.ci != undefined && response.data.credencial.ci != '') {
            this.$store.state.credencial.ci = response.data.credencial.ci
          }
          // this.$store.state.dialogo.formularioAcceso = false
          if (response.data.credencial.estado !== 2) {
            this.$router.push('/perfil')
            this.$q.notify({
              color: 'secondary',
              position: 'bottom',
              message: 'Bienvenid@ ' + this.$store.state.credencial.nombre + ', por favor llene su perfil para poder navegar por el sitio',
              icon: 'mdi-check-circle'
            })
          } else {
            this.$refrescarPedidos()
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },

    loguearUsuario () {
      
    }
  }
}
</script>
