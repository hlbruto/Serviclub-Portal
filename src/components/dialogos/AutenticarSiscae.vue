<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="$store.state.dialogo.autenticarSiscae">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="q-pa-md q-pt-xs q-gutter-y-xs column">
            <q-item-label class="text-caption">
              <p><q-icon name="mdi-information"/>
                <small> INGRESE SUS DATOS DE ACCESO <br>
                  AL SISTEMA SISCAE.<br> SI UD. NO POSEE CUENTA DE ESTE TIPO,<br>
                  ACÉRQUESE AL JOVEN CLUB MÁS CERCANO.
                </small>
              </p>
            </q-item-label>

            <q-input v-model="data.usuario" dense filled type="email"
              label-slot lazy-rules clearable
              :rules="[val => !!val || 'El campo es obligatorio',
                val => /.+@.+\..+/.test(val) || 'El correo debe ser válido']"
            >
              <template v-slot:label>
                <div class="row items-center all-pointer-events">
                  Email

                  <q-tooltip content-class="bg-grey-8" anchor="top left"
                    self="bottom left" :offset="[0, 8]">
                    Dirección de correo
                  </q-tooltip>
                </div>
              </template>
            </q-input>

            <q-input v-model="data.clave" dense filled  :type="isPwd ? 'password' : 'text'"
              label-slot
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
          <q-btn flat label="Entrar" class="bg-primary text-white" size="md" @click="entrar()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
 
 export default {
  name: 'autenticarSiscae',

  

  data: () => ({
    data: {
      usuario: '',
      clave: '',
      id_servicio: '',
      total_servicios: '',
      // id_jovenclub: ''
    },
    isPwd: true
  }),

  methods: {
    entrar () {
      this.data.id_servicio = this.$store.state.unservicio.id_siscae
      this.data.total_servicios = '1'
      // este es el id que tiene el jovenclub en el siscae
      // this.data.id_jovenclub = this.$store.state.instalacionDelPedido.id_jovenclub
      console.log(this.data)
      this.$axios.post(this.$store.state.urlAPI + '/login-siscae', this.data).then(response => {
        console.log(response.data + 'henry en el front')
        if (response.data.datos.usuario_encontrado == false ) {
          this.$q.notify({
            color: 'warning',
            position: 'bottom',
            message: response.data.datos.detalle,
            icon: 'mdi-check-circle'
          })
        } else if (response.data.datos.usuario_encontrado == true && response.data.datos.detalle == 'El cliente tiene saldo suficiente para comprar el servicio'  ) {
          this.$solicitarServicio()
        } else if (response.data.datos.usuario_encontrado == true && response.data.datos.detalle == 'El cliente no tiene saldo suficiente para comprar el servicio'  ) {
          this.$q.notify({
            color: 'warning',
            position: 'bottom',
            message: 'Su saldo no es suficiente solo dispone de' + response.data.datos.saldo_disponible + 'por favor recargue',
            icon: 'mdi-check-circle'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }

    /* entrar () {
      var datos = {
        funcion: 'servicios-listar'
      }
      this.$axios.post(this.$store.state.urlAPI + '/servicios-siscae', datos).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    } */
  }
}  

</script>
