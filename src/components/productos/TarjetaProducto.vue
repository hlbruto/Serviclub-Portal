<template>
  <div>
    <q-card class="my-card-prod shadow-10" bordered>
      <q-img :src="'images/productos/' + producto.foto"
        :lazy-src="'images/productos/' + producto.foto"
        style="width: 200px; height:100px"
        class="q-mt-sm"
      />

      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col ellipsis"><strong>{{ producto.nombre }}</strong></div>
        </div>

        <div class="q-mt-md text-grey-8 text-caption text-left">
          <strong>Precio: </strong>{{ producto.precio }}
          <br>
          <q-rating color="deep-orange" dense :value="producto.calificacion" />
        </div>

        <div class="q-mt-sm text-parrafo">
          <small>{{ producto.descripcion }}</small>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center">
        <q-btn flat size="sm" color="primary" label="ver más" @click="esteProducto(producto)" />
      </q-card-actions>
    </q-card>

    <verProducto />
  </div>
</template>

<script>
export default {
  name: 'tarjetaProducto',

  props: ['producto'],

  components: {
    verProducto: require('components/dialogos/VerProducto').default
  },

  methods: {
    // devuelve el producto segun el id de la tarjeta en la q se dio click
    esteProducto (producto) {
      this.$store.state.unproducto = producto      
      this.$store.state.slideProducto = this.$store.state.unproducto.id
      console.log('de ahora')
      console.log(this.$store.state.unproducto)
      // this.$store.state.unproducto.cant_descargas = 3
      // this.$store.state.unproducto.descripcion = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor.'
      this.$refrescarComentarios()
      this.$router.push({ path: '/producto/' + this.$store.state.unproducto.id })
      //this.$store.state.dialogo.verProducto = true
    }
  }
}
</script>
 
<style lang="scss">
.text-titulo {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
  text-align: center;
}
.text-linea {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
  text-align: left;
}

.text-parrafo {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-align: left;
}

.my-card-prod {  
  width: 230px;
  max-width: 230px;
  border-color: rgba(100, 154, 236, 0.575);
  border-width: 0.5pt;
  border-radius: 0.2cm;
}
</style>
 