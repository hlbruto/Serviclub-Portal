<template>
  <div class="q-mb-lg">
    <q-card>
      <form @submit="onSubmit">
        <q-card-section class="q-pa-md">
          <div class="q-pt-none">
            <q-input ref="nombre" v-model="datos.nombre" filled
              label-slot clearable
              lazy-rules :rules="[val => !!val || 'El campo es obligatorio']"
            >
              <template v-slot:label>
                <div class="col-auto">Nombre y apellidos</div>
              </template>
            </q-input>

            <q-input ref="ci"  v-model="datos.ci" filled type="number"
              label-slot clearable counter lazy-rules
              :rules="[val => !!val || 'El campo es obligatorio',
              val => val.length >= 11 || 'Debe tener 11 dígitos']"
            >
              <template v-slot:label>
                <div class="col-auto">No. Identidad</div>
              </template>
            </q-input>

            <q-input ref="telefono" v-model="datos.telefono" filled type="number"
              label-slot clearable lazy-rules counter
              :rules="[val => !!val || 'El campo es obligatorio',
              val => val.length >= 8 || 'Debe ser mayor de 7 dígitos']"
            >
              <template v-slot:label>
                <div class="col-auto">Teléfono</div>
              </template>
            </q-input>

            <q-input ref="direccion" v-model="datos.direccion" filled type="text"
              label-slot clearable lazy-rules
              :rules="[val => !!val || 'El campo es obligatorio']"
            >
              <template v-slot:label>
                <div class="col-auto">Dirección particular</div>
              </template>
            </q-input>

            <SelectsProvMun />
          </div>
        </q-card-section>

          <q-card-actions align="right">
            <!-- <q-btn type="submit" push label="Guardar" class="bg-primary text-white" size="md" /> -->
            <q-btn class="bg-primary text-white" size="md" push
              label="Guardar" @click="onSubmit()"
            />
          </q-card-actions>
      </form>    
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DatosPersonales',

  components: {
    SelectsProvMun: require('components/SelectsProvMun').default
  },

  computed: {
    ...mapState(['provincias', 'arrayNombresProv', 'municipios'])
  },

  data: () => ({
    datos : {
      nombre: '',
      ci: '',
      telefono: '',
      direccion: '',
      municipioId: ''
    },
    /* emailSISCAE: '' */
    /* user: {
      email: '',
      password: ''
    } */
  }),

  created () {
   this.llenarPerfil()
  },

  mounted () {
    // this.llenarPerfil()
  },

  methods: {
    

    onSubmit () {
      this.$refs.nombre.validate()
      this.$refs.ci.validate()
      this.$refs.telefono.validate()
      this.$refs.direccion.validate()
      if (this.$refs.nombre.hasError || this.$refs.ci.hasError || this.$refs.telefono.hasError || this.$refs.direccion.hasError) {
        this.formHasError = true
      } if (this.$store.state.credencial.municipio.id == '') {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'Debe llenar los campos provincia y municipio',
          icon: 'mdi-alert-circle'
        })
      } else {
        console.log('va a actualizar el perfil')
        this.guardar()
      }
    },

    mensajeSatisfactorio () {
      this.$q.notify({
        color: 'positive',
        position: 'bottom',
        message: 'Su datos han sido actualizados',
        icon: 'mdi-check-circle'
      })
    },

    llenarPerfil () {
     /*  var value = JSON.stringify({
        'credencial': this.$store.state.credencial
      })
      localStorage.setItem('key', value) */
      console.log(this.$store.state.credencial.nombre)
      this.datos.nombre = this.$store.state.credencial.nombre
      this.datos.ci = this.$store.state.credencial.ci
      this.datos.telefono = this.$store.state.credencial.telefono
      this.datos.direccion = this.$store.state.credencial.direccion
     
      /* this.emailSISCAE = this.$store.state.datosSISCAE.email */
    },

    guardar () {
      this.datos.municipioId = this.$store.state.credencial.municipio.id
      console.log(this.datos)
      console.log('entra al 1')
      localStorage.clear()
      this.$axios.patch(this.$store.state.urlAPI + '/perfil/' + this.$store.state.credencial.id_usuario, this.datos).then(response => {
        this.$store.state.credencial.id_usuario = response.data.credencial.id_usuario
        this.$store.state.credencial.activo = response.data.credencial.activo
        this.$store.state.credencial.estado = response.data.credencial.estado
        this.$store.state.credencial.email = response.data.credencial.email
        this.$store.state.credencial.token = response.data.credencial.token
        this.$store.state.credencial.municipio = response.data.credencial.municipio
        this.$store.state.credencial.municipio.nombre = response.data.credencial.municipio.nombre
        this.$store.state.credencial.municipio.provincia.nombre = response.data.credencial.municipio.provincia.nombre
        if (response.data.credencial.instalacionId) {
          this.$store.state.credencial.instalacion = response.data.credencial.instalacion
          this.$store.state.instalacionPreferida = response.data.credencial.instalacion.nombre
          this.$store.state.instalacionDelPedido = response.data.credencial.instalacion
        }
        this.$store.state.credencial.nombre = response.data.credencial.nombre
        this.$store.state.credencial.telefono = response.data.credencial.telefono
        this.$store.state.credencial.direccion = response.data.credencial.direccion
        this.$store.state.credencial.ci = response.data.credencial.ci

        var value = JSON.stringify({
          'credencial': response.data.credencial
        })
        localStorage.setItem('key', value)
        console.log(value)
        this.llenarPerfil()
        this.mensajeSatisfactorio()
      }).catch(error => {
        console.log('entra al 3')
        console.log(error)
        // mensaje de error
      });
    }
  }
}
</script>
