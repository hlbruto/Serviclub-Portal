<template>
  <div>
    <q-card class="card8" bordered @click="elegirInstalacion(instalacion)">
      <q-card-section class="q-mb-sm">
        <div class="row justify-center text-primary">
          <q-icon name="mdi-home" size="sm" />
        </div>

        <div class="row justify-center text-primary">
          <q-item-label><strong>{{ instalacion.nombre }}</strong></q-item-label>
        </div>
        
        <div class="row justify-center text-grey-7 q-mt-md">
          <q-item-label>{{ instalacion.direccion }}</q-item-label>
        </div>

        <div class="row justify-center text-grey-7">
          <q-item-label>Teléfono: {{ instalacion.telefono }}</q-item-label>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'TarjetaInstalacion',

  props: ['instalacion'],

  methods: {
    elegirInstalacion (instalacion) {
      this.$store.state.instalacionPreferida = instalacion.nombre
      this.$store.state.instalacionDelPedido = instalacion
      this.$store.state.municipioId = instalacion.municipioId
      this.$store.state.dialogo.eligeMcpio = false
      this.mensajeSatisfactorio()
    },

    mensajeSatisfactorio () {
      this.$q.notify({
        color: 'positive',
        position: 'bottom',
        message: 'Usted ha elegido su Joven Club preferido',
        icon: 'mdi-check-circle'
      })
    }
  }
}
</script>

<style lang="scss">
.card8:hover {
  // background-color: rgb(198, 222, 231);
  border-color: #0D47A1;
  border-width: 2pt;
  max-width: 100%;
}
</style>
 