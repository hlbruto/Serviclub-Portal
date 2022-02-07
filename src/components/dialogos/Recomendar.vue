<template>
  <div class="q-pa-md q-gutter-sm" v-if="$store.state.credencial.token !== '' && $store.state.habilitado">
    <q-dialog v-model="$store.state.dialogo.recomendar">
      <q-card>
        <q-card-section>
          <div class="q-mt-xs q-mb-md row justify-end">
            <q-item-label class="text-primary text-body1 text-center col-10">
              Recomendarnos
            </q-item-label>

            <q-btn class="text-primary" flat dense size="10px"
              @click="$store.state.dialogo.recomendar = false" icon-right="mdi-window-close"
            />
          </div>

          <div class="text-grey text-caption text-center">
            <q-item-label>Recomiende <strong>Serviclub</strong> a sus amigos.</q-item-label>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-gutter-y-md column">
            <q-input v-model="email" filled type="email"
              label-slot clearable dense
              lazy-rules
              :rules="[val => !!val || 'El campo es obligatorio',
                val => /.+@.+\..+/.test(val) || 'El correo debe ser válido']"
            >
              <template v-slot:label>
                <div class="row items-center all-pointer-events">
                  Email(s)

                  <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                    Escriba los correos electrónicos de sus amigos separados por una coma (,) y sin espacios; para enviar la misma recomendación a todos
                  </q-tooltip>
                </div>
              </template>
            </q-input>
          </div>

          <div class="q-gutter-y-md column">
            <q-input v-model="mensaje" filled type="textarea"
              label-slot clearable dense
              lazy-rules :rules="[val => !!val || 'El campo es obligatorio']"
            >
              <template v-slot:label>
                <div class="row items-center all-pointer-events">
                  Mensaje

                  <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                    Si lo desea puede escribir un mensaje de su parte aquí
                  </q-tooltip>
                </div>
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md q-gutter-y-md column">
            <q-item-label class="text-h8"><strong>Así se verá el mensaje final:</strong></q-item-label>
            <q-item-label class="text-subtitle">
               <p>
                  Hola, <strong>{{ $store.state.credencial.nombre }}</strong>
                  le recomienda Serviclub. Un lugar para solicitar servicios
                  y descargar los productos de los Joven Club de Computación y Electrónica
                  de una forma sencilla y desde cualquier lugar.
                </p>
                <p v-if="mensaje !== ''">
                  De su parte quiere comentarle: <strong><cite>"{{ mensaje }}"</cite></strong>
                </p>
                <p>
                  No tarde y visítenos en
                  <a href="http://serviclub.jovenclub.cu">
                    "http://serviclub.jovenclub.cu"
                  </a>
                </p>
            </q-item-label>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn push label="Enviar" class="bg-primary text-white" size="md" @click="validarDatos()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

export default {
  name: 'Recomendar',

  data: () => ({
    email: '',
    mensaje: '',
    from: ''
  }),

  created () {
    this.email = ''
    this.mensaje = ''
  },

  methods: {
    validarDatos () {
      if (this.mensaje === '' || this.mensaje === null ||
        this.email === '' || this.email === null) {
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

    enviar () {
      let estosDatos = {
        email: this.email,
        mensaje: this.mensaje,
        from: this.$store.state.credencial.email,
        asunto: 'Recomendacion'
      }
      // satisfactorio
      this.$axios.post(this.$store.state.urlAPI + '/recomendar', estosDatos).then(response => {
        console.log(response.data)
        this.email = ''
        this.mensaje = ''
        this.loading = false
        this.$store.state.dialogo.recomendar = false
      }).catch(error => {
        console.log(error)
      })
      this.mensajeSatisfactorio()
    }
  }
}
</script>
