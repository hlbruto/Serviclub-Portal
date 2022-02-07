<template>
  <q-page class="imagenFondo" style="background-image: url(images/hero.png);">
    <q-card flat class="q-pa-md" style="background: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0)">
      <div class="q-gutter-y-md">
          <div class="q-pa-lg row justify-end">
            <q-input outlined dense type="search" 
              v-model="filter" placeholder="Buscar apps" style="width: 300px"
            >
              <template v-slot:append >
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          
          <q-tabs
            v-model="tab"
            shrink
            stretch
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab name="celulares" label="CELULARES" icon="mdi-cellphone-android" class="q-mt-lg" />
            <q-tab name="computadoras" label="COMPUTADORAS" icon="mdi-laptop-mac" class="q-mt-lg" />
            <q-tab name="web" label="EN LA WEB" icon="mdi-check-network" class="q-mt-lg" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated transition-prev="fade" transition-next="fade"  class="bg-transparent">
            <q-tab-panel name="celulares">
              <div class="text-caption text-grey text-center">
                APLICACIONES PARA CELULARES
              </div>

              <div class="row q-col-gutter-sm justify-center text-center">
                <div class="q-mt-md" v-for="producto in $store.state.productosCel" :key="producto.id">
                  <tarjetaProducto class="q-ml-sm q-mr-sm  col-md-2 col-sm-10" :producto="producto" />
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="computadoras">
              <div class="text-caption text-grey text-center">
                APLICACIONES PARA COMPUTADORAS
              </div>

              <div class="row q-col-gutter-sm justify-center text-center">
                <div class="q-mt-md" v-for="producto in $store.state.productosPC" :key="producto.id">
                  <tarjetaProducto class="q-ml-sm q-mr-sm  col-md-2 col-sm-10" :producto="producto" />
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="web">
              <div class="text-caption text-grey text-center">
                APLICACIONES EN LA WEB
              </div>

              <div class="row q-col-gutter-sm justify-center text-center">
                <div class="q-mt-md" v-for="producto in $store.state.productosWeb" :key="producto.id">
                  <tarjetaProducto class="q-ml-sm q-mr-sm  col-md-2 col-sm-10" :producto="producto" />
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import tarjetaProducto from 'components/productos/TarjetaProducto'

export default ({
  name: 'Productos',
  components: {
    tarjetaProducto
  },

  data: () => ({
    tab: 'celulares',
    filter: ''
  }),

  created () {
    // obtener el listado de productos en general
    // this.$refrescarProductos()
  },

  methods: {}
})
</script>
