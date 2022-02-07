<template>
  <div class="q-pt-none">
    <q-select
      filled
      options-dense
      v-model="$store.state.credencial.municipio.provincia.nombre"
      label="Provincia"
      label-slot
      lazy-rules
      :rules="[val => !!val || 'El campo es obligatorio']"
      :options="$store.state.arrayNombresProv"
      @input="limpiarSelectMun()"
    >
    </q-select>

    <q-select
      filled
      options-dense
      v-model="nombreMun"
      label="Municipio"
      label-slot
      lazy-rules
      :rules="[val => !!val || 'El campo es obligatorio']"
      :options="$store.state.arrayNombresMun"
      :disabled="$store.state.credencial.municipio.provincia.nombre === ''"
      @input="obtInstDMun()"
    >
    </q-select>
  </div>
</template>

<script>

export default {
  name: 'SelectsProvMun',

  data: () => ({
    provincia: {
      id: '',
      nombre: ''
    },
    nombreMun: ''
  }),

  computed: {
    /* esVisible () {
      if (this.$store.state.credencial.provincia.nombre === '' ||
      this.$store.state.credencial.provincia.nombre === null ||
      this.$store.state.credencial.provincia.nombre === undefined) {
        return false
      } else {
        return true
      }
    } */
  },

  created () {
    // llenar mi model de municipio
    /* if (this.$store.state.credencial.municipio.nombre !== '' &&
    this.$store.state.credencial.municipio.nombre !== null &&
    this.$store.state.credencial.municipio.nombre !== undefined) {
      this.nombreMun = this.$store.state.credencial.municipio.nombre
    } */
    this.nombreMun = this.$store.state.credencial.municipio.nombre
    // para obtener el listado de las prov
    console.log('entra al metodo de prov')
    if (this.$store.state.provincias.length === 0) {
      this.$axios.get(this.$store.state.urlAPI + '/provincias').then(response => {
        this.$store.state.provincias = response.data
        console.log(response.data)
        // para mis opciones del select guardo solo los nombres en un array
        for (let index = 0; index < this.$store.state.provincias.length; index++) {
          /* if (this.$store.state.provincias[index].nombre !== 'Palacio Central') {
            this.$store.state.arrayNombresProv.push(this.$store.state.provincias[index].nombre)
          } */
          this.$store.state.arrayNombresProv.push(this.$store.state.provincias[index].nombre)  
        }
        console.log(this.$store.state.arrayNombresProv)
      }).catch(error => {
        console.log(error)
      })
      if (this.$store.state.credencial.municipio.provincia.nombre !== '' &&
      this.$store.state.credencial.municipio.provincia.nombre !== null &&
      this.$store.state.credencial.municipio.provincia.nombre !== undefined) {
        this.obtMunDProv()
      }
    }
  },

  methods: {
    obtMunDProv () {
      console.log('entra al metodo de mun')
      // buscar el id de la prov
      for (let index = 0; index < this.$store.state.provincias.length; index++) {
        if (this.$store.state.credencial.municipio.provincia.nombre === this.$store.state.provincias[index].nombre) {
          this.$store.state.credencial.municipio.provinciaId = this.$store.state.provincias[index].id
        }
      }
      // pasar el id de la prov para obtener sus municipios
      this.$axios.get(this.$store.state.urlAPI + '/provincias/' + this.$store.state.credencial.municipio.provinciaId + '/municipios').then(response => {
        this.$store.state.municipios = response.data
        console.log(this.$store.state.municipios)
        // para mis opciones del select, guardo solo los nombres en un array
        for (let index = 0; index < this.$store.state.municipios.length; index++) {
          /* if (this.$store.state.municipios[index].nombre !== 'Palacio Central') {
            this.$store.state.arrayNombresMun.push(this.$store.state.municipios[index].nombre)
          } */
          this.$store.state.arrayNombresMun.push(this.$store.state.municipios[index].nombre)  
        }
      }).catch(error => {
        console.log(error)
      })
      if (this.nombreMun !== '' &&
      this.nombreMun !== null &&
      this.nombreMun !== undefined) {
        this.obtInstDMun()
      }
    },

    obtInstDMun () {
      // limpiar las instalaciones
      this.$store.state.instalaciones = []
      console.log('entra al metodo de inst')
      // buscar el id de la prov
      for (let index = 0; index < this.$store.state.municipios.length; index++) {
        if (this.nombreMun === this.$store.state.municipios[index].nombre) {
          this.$store.state.credencial.municipio.id = this.$store.state.municipios[index].id
        }
      }
      // pasar el id de la prov para obtener sus municipios
      this.$axios.get(this.$store.state.urlAPI + '/municipios/' + this.$store.state.credencial.municipio.id + '/instalacions').then(response => {
      // this.$axios.get(this.$store.state.urlAPI + '/instalaciones').then(response => {
        this.$store.state.instalaciones = response.data
        console.log(this.$store.state.instalaciones)
      }).catch(error => {
        console.log(error)
      })
    },

    limpiarSelectMun () {
      // limpiar el select de mun y el listado de ellos; porque cambio la prov
      this.$store.state.municipios = []
      this.$store.state.arrayNombresMun = []
      this.nombreMun = ''
      // limpiar las instalaciones tambien
      this.$store.state.instalaciones = []
      this.obtMunDProv()
    }
  }
}
</script>
