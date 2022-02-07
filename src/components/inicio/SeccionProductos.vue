<template>
  <q-card flat class="q-mt-md">
    <q-card-section class="q-pa-md text-center">
      <q-item-label class="text-h4 textoGrande" v-if="$q.screen.gt.sm">
        Algunos de los productos
      </q-item-label>

      <q-item-label class="text-h5 textoGrande" v-else>
        Algunos de los productos
      </q-item-label>
    </q-card-section>

    <q-card-section v-if="$q.screen.gt.sm">
      <div class="q-mb-md row justify-evenly">
        <q-card flat class="col-1"><q-img src="images/productos/recon.png" /></q-card>
        <q-card flat class="col-1"><q-img src="images/productos/descap.png" /></q-card>
        <q-card flat class="col-1"><q-img src="images/productos/tino.png" /></q-card>
        <q-card flat class="col-1"><q-img src="images/productos/ludox.png" /></q-card>
        <q-card flat class="col-1"><q-img src="images/productos/mochila.jpg" /></q-card>
        <q-card flat class="col-1"><q-img src="images/productos/ecured.png" /></q-card>
      </div>

      <div class="q-mb-md row justify-around">
        <q-card flat class="col-1"><q-img src="images/productos/estanquillo.png" /></q-card>
        <q-card flat class="col-1" style="width:60px"><q-img src="images/productos/tendedera.jpeg" />Tendedera</q-card>
        <q-card flat class="col-1"><q-img src="images/productos/sgp.png" /></q-card>
        <q-card flat class="col-2"><q-img src="images/productos/emprofarma.png" /></q-card>
      </div>
    </q-card-section>

    <q-card-section v-else>
      <div class="q-mb-md row justify-evenly">
        <q-card flat class="col-2"><q-img src="images/productos/recon.png" /></q-card>
        <q-card flat class="col-2"><q-img src="images/productos/descap.png" /></q-card>
        <q-card flat class="col-2"><q-img src="images/productos/tino.png" /></q-card>
        <q-card flat class="col-2"><q-img src="images/productos/ludox.png" /></q-card>
      </div>

      <div class="q-mb-md row justify-around">
        <q-card flat class="col-2"><q-img src="images/productos/mochila.jpg" /></q-card>
        <q-card flat class="col-2"><q-img src="images/productos/ecured.png" /></q-card>
        <q-card flat class="col-3"><q-img src="images/productos/estanquillo.png" /></q-card>
      </div>

      <div class="q-mb-md row justify-evenly">
        <q-card flat class="col-1" style="width:60px"><q-img src="images/productos/tendedera.jpeg" />Tendedera</q-card>
        <q-card flat class="col-3"><q-img src="images/productos/sgp.png" /></q-card>
        <q-card flat class="col-3"><q-img src="images/productos/emprofarma.png" /></q-card>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="center">
      <q-btn flat size="md" color="back" label="ver todos los productos" @click="$router.push('/productos')" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'Productos',

  data: () => ({
  }),
  created () {
  },

  methods: {
    // devuelve el servicio segun el id de la tarjeta en la q se dio click
    esteProducto (producto) {
      this.$store.state.unproducto = producto
      this.$router.push({
        path: '/producto/' + this.$store.state.unproducto.id
      })
    }
  }
}
</script>

<style lang="scss">
.cards-productos {
  max-height: 350px;
  position: relative;
}

.text-descripcion {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
  text-align: left;
}

.text-titulo {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
  text-align: center;
}

</style>
