<template>
  <q-page>
    <div v-if="$store.state.credencial.token !== ''">
      <div class="q-pa-lg text-blue-grey-1 text-caption">
        <q-item-label>INFORMACIÓN PERSONAL Y DATOS DE ACCESO</q-item-label>
        <q-separator class="bg-blue-grey-1" inset />
      </div>

      <div class="q-pa-md row justify-evenly">
        <div class="col-5" v-if="$q.screen.gt.xs">
          <DatosPersonales />
        </div>

        <div class="col-10" v-else>
          <DatosPersonales />
          <CambiarCorreo />
          <CambiarPass />
        </div>

        <div class="col-5" v-if="$q.screen.gt.xs">
          <div class="row">
            <div class="col">
              <CambiarCorreo />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <CambiarPass />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else><NoAcceso /></div>
  </q-page>
</template>

<script>

export default {
  name: 'Perfil',

  components: {
    DatosPersonales: require('components/perfil/DatosPersonales').default,
    CambiarCorreo: require('components/perfil/CambiarCorreo').default,
    CambiarPass: require('components/perfil/CambiarPass').default,
    NoAcceso: require('components/NoAcceso').default
  }
}
</script>
