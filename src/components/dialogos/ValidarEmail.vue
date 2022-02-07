<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="$store.state.dialogo.validarEmail">
      <q-card>
        <q-card-section>
          <div class="text-h5 text-primary">
            <q-item-label>
              <q-icon name="mdi-account" size="25px" color="primary" />
              Completando el registro
            </q-item-label>
          </div>
        </q-card-section>

         <q-card-section>
          <div class="text-grey text-caption text-center">
            <q-item-label>ESCRIBA EL CÓDIGO DE VERIFICACIÓN (PASO 2/2)
            </q-item-label>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md q-gutter-y-md column">
            <p v-if="$store.state.credencial.token === ''"
            >
              Para completar el registro, debe confirmar que posee
              un correo electrónico válido; para ello le hemos enviado un mensaje a
              <strong >{{ $store.state.emailAutenticar }}</strong>.
            Revise su correo y escriba el código de verificación.</p>

            <p v-else>Para recuperar su contraseña, le hemos enviado un mensaje a
              <strong>{{ $store.state.emailAutenticar }}</strong>.
              Revise su correo y escriba el código de verificación.
            </p>  

            <div class="q-pa-md q-gutter-y-md column items-center">
              <q-input v-model="data.codigo" filled input-class="text-right"
                label-slot clearable style="width: 250px" counter lazy-rules
                :rules="[val => !!val || 'El campo es obligatorio']"
              >
                <template v-slot:label>
                  <div class="col-auto">Código</div>
                </template>
              </q-input>

              <q-btn flat label="Enviar código" class="bg-primary text-white" size="md" @click="validarDatos()" />
            </div>        
          </div>
          
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md q-gutter-y-md row">
              <q-item-label class="text-caption">
                <q-icon name="mdi-information" />
                Si no ha recibido el código
              </q-item-label>
              <q-btn flat label="solicite uno nuevo" class="text-primary" size="sm" @click="solicitar()"/>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

export default {
  name: 'Recomendar',

  data: () => ({
    data: {
      codigo: '',
      email: '',
      credencial: ''
    }
  }),

  created () {},

  methods: {
    validarDatos () {
      if (this.data.codigo === '' || this.data.codigo === null || this.data.codigo === undefined) {
        this.mensajeDatosIncompletos()
      } else {
        this.enviar()
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
        message: 'El mensaje fue enviado.',
        icon: 'mdi-check-circle'
      })
    },

    mensajeError (mensaje) {
      // error al enviar correo de cod de validac
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: mensaje,
        icon: 'mdi-alert-circle'
      })
    },

    enviar () {
      this.data.email = this.$store.state.emailAutenticar
      this.data.credencial = this.$store.state.credencial
      console.log(this.data)
      this.$axios.post(this.$store.state.urlAPI + '/usuarios/verificar-codigo', this.data).then(response => {
        console.log(response.data)
        if (response.data != 'email-cambiado' && response.data != 'codigo-incorrecto') {
         // this.$store.state.credencial = response.data
         this.$store.state.credencial.id_usuario = response.data.credencial.id_usuario
          this.$store.state.credencial.activo = response.data.credencial.activo
          this.$store.state.credencial.estado = response.data.credencial.estado
          this.$store.state.credencial.email = response.data.credencial.email
          this.$store.state.credencial.token = response.data.credencial.token
          if (response.data.credencial.municipio != undefined) {
            this.$store.state.credencial.municipio = response.data.credencial.municipio
          }
          if (response.data.credencial.instalacion != undefined) {
            this.$store.state.credencial.instalacion = response.data.credencial.instalacion
          }
          if (response.data.credencial.nombre != undefined) {
            this.$store.state.credencial.nombre = response.data.credencial.nombre
          }
          if (response.data.credencial.telefono != undefined) {
            this.$store.state.credencial.telefono = response.data.credencial.telefono
          }
          if (response.data.credencial.direccion != undefined) {
            this.$store.state.credencial.direccion = response.data.credencial.direccion
          }
          if (response.data.credencial.ci != undefined) {
            this.$store.state.credencial.ci = response.data.credencial.ci
          }
          this.$store.state.dialogo.validarEmail = false
          this.$router.push('/perfil')
          this.$q.notify({
            color: 'secondary',
            position: 'bottom',
            message: 'Bienvenid@ ' + this.$store.state.credencial.nombre + ', por favor llene su perfil para poder navegar por el sitio',
            icon: 'mdi-check-circle'
          })
        } else if (response.data == 'codigo-incorrecto') {
          var mensaje = 'El código es incorrecto'
          this.mensajeError(mensaje)
        }
        else if (response.data == 'email-cambiado') {
          var value = JSON.stringify({
            'credencial': this.$store.state.credencial
          })
          localStorage.setItem('key', value)
          this.$store.state.dialogo.validarEmail = false
        }
      }).catch(error => {
        console.log(error)
        this.mensajeError()
      })
      // // satisfactorio
      // this.mensajeSatisfactorio()
      // this.$store.state.dialogo.validarEmail = false
    },

    solicitar () {
      var datos = {
        email: this.$store.state.emailAutenticar
      }
      this.$axios.post(this.$store.state.urlAPI + '/recuperar-clave', datos).then(response => {
        console.log(response.data)
        if (response.data == true || response.data == false) {
          this.$q.notify({
            color: 'secondary',
            position: 'bottom',
            message: this.$store.state.emailAutenticar +' '+ 'se le ha enviado un nuevo código',
            icon: 'mdi-check-circle'
          })
          
          /* this.$store.state.dialogo.validarEmail = false
          this.$router.push('/perfil') */
        }
        /* else if (response.data == 'false') {
          this.$q.notify({
            color: 'negative',
            position: 'bottom',
            message: this.$store.state.emailAutenticar +' '+ 'Ha ocurrido un error al enviarle el correo',
            icon: 'mdi-check-circle'
          })
        } */
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
