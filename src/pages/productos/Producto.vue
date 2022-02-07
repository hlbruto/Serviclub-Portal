<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Listado de Productos" to="/productos" />
        <q-breadcrumbs-el :label="$store.state.unproducto.nombre" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md">
      <q-card>
        <q-card-section class="q-mt-xs q-mb-none row justify-between" v-if="$q.screen.gt.xs">
          <q-item-label class="text-primary text-h5 q-ml-lg col-10">
            {{ $store.state.unproducto.nombre }}
          </q-item-label>
          <q-btn class="text-primary" flat dense size="12px"
          to="/productos" icon-right="mdi-window-close" />
        </q-card-section>
        
        <q-separator inset v-if="$q.screen.gt.xs" />

        <q-card-section class="q-mt-mb-xs q-mb-none row justify-end" v-else>
          <q-btn class="text-primary" flat dense size="12px"
          to="/productos" icon-right="mdi-window-close" />
        </q-card-section>

         <q-card-section>
          <DescripcionProducto />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>

export default ({
  name: 'Producto',

  components: {
    DescripcionProducto: require('components/productos/DescripcionProducto').default
  },

  created () {
    var aux = window.location.hash.split('/')
    console.log(aux[2])
    if (this.$store.state.unproducto.id == '' || this.$store.state.unproducto.id == null || this.$store.state.unproducto.id == undefined) {
      this.$store.state.unproducto.id = aux[2]
      console.log(aux[2])
    }
    this.$axios.get(this.$store.state.urlAPI + '/productos/' + this.$store.state.unproducto.id).then(response => {
      this.$store.state.unproducto = response.data
      console.log(this.$store.state.unproducto)
    }).catch(error => {
      console.log(error)
    })
  }
})
</script>
