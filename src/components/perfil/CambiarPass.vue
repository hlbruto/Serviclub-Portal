<template>
  <div>
    <q-card>
      <q-card-section class="q-pa-md">
        <div class="q-pt-none">
          <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'"
            label-slot
            clearable counter lazy-rules
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

      <q-card-actions align="right">
        <q-btn push label="Cambiar" class="bg-primary text-white" size="md" @click="validarDatos()" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'CambiarPass',

  data: () => ({
    password: '',
    isPwd: true
  }),

  methods: {
    validarDatos () {
      if (this.password !== '') {
        this.cambiar()
      } else {
        this.mensajeDatosIncompletos()
      }
    },

    mensajeDatosIncompletos () {
      // error
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Debe escribir una nueva contraseña de más de 7 caracteres',
        icon: 'mdi-alert-circle'
      })
    },

    mensajeSatisfactorio () {
      this.$q.notify({
        color: 'positive',
        position: 'bottom',
        message: 'La contraseña se modificó correctamente',
        icon: 'mdi-check-circle'
      })
    },

    cambiar () {
      var datos = {
        password: this.password
      }
      this.$axios.patch(this.$store.state.urlAPI + '/usuarios/' + this.$store.state.credencial.id_usuario, datos).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
        // mensaje de error
      });
      this.mensajeSatisfactorio()
    }
  }
}
</script>
