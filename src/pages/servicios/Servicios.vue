<template>
  <q-page class="imagenFondo" style="background-image: url(images/hero.png);">
    <q-card flat class="q-pa-md" style="background: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0)">
      <div class="q-gutter-y-md">
        <q-tabs
          v-model="tab"
          shrink
          stretch
          dense
          class="text-black"
          active-color="primary"
          indicator-color="primary"
          narrow-indicator
        >
          <q-tab name="casa" label="EN LA CASA" icon="mdi-home" 
          class="q-mt-lg" />
          <q-tab name="red" label="EN LA RED" icon="mdi-wifi"
          class="q-mt-lg" />
          <q-tab name="instalacion" label="EN LA INSTALACIÓN"
          icon="mdi-map-marker-radius" class="q-mt-lg" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated transition-prev="fade" transition-next="fade" class="bg-transparent">
          <q-tab-panel name="casa">
            <div class="row q-col-gutter-sm justify-center text-center">
              <div class="q-mt-md" v-for="servicio in $store.state.serviciosCasa" :key="servicio.id">
                <tarjetaServicio class="q-ml-sm q-mr-sm col-md-2 col-sm-10" :servicio="servicio" />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="red">
            <div class="row q-col-gutter-sm justify-center text-center">
              <div class="q-mt-md" v-for="servicio in $store.state.serviciosRed" :key="servicio.id">
                <tarjetaServicio class="q-ml-sm q-mr-sm  col-md-2 col-sm-10" :servicio="servicio" />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="instalacion">
            <div class="row q-col-gutter-sm justify-evenly text-center">
              <div class="q-mt-md" v-for="servicio in $store.state.serviciosJC" :key="servicio.id">
                <tarjetaServicio class="q-ml-sm q-mr-sm col-md-2 col-sm-10" :servicio="servicio" />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import tarjetaServicio from 'components/servicios/TarjetaServicio'

export default ({
  name: 'Servicios',
  components: {
    tarjetaServicio
  },

  data: () => ({
    tab: 'casa'
  }),

  created () {
    // obtener el listado de servicios en general
    // this.$refrescarServicios()
  },

  methods: {}
})
</script>
