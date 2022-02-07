<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh" v-if="$q.screen.gt.sm">
        Oops...
      </div>

      <div style="font-size: 15vh" v-else>
        Oops...
      </div>

      <div class="text-h2" style="opacity:.4" v-if="$q.screen.gt.sm">
        No tiene acceso
      </div>

      <div class="text-h4" style="opacity:.4" v-else>
        No tiene acceso
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Ir a Inicio"
        no-caps
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'NoAcceso'
}
</script>
