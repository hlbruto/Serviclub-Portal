<template>
  <div class="q-mt-lg">
    <q-btn flat round dense size="10px" icon="email" @click="$store.state.dialogo.contactar = true" />
    <q-btn flat round dense size="10px" icon="mdi-facebook" />
    <q-btn flat round dense size="10px" icon="mdi-twitter" />
    <q-btn flat round dense size="10px" icon="mdi-facebook-messenger" />
    <q-btn flat round dense size="10px" icon="search" />
    <Contactar></Contactar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'OpcionesMenu',

  components: {
    Contactar: require('components/dialogos/Contactar').default
  },

  data: () => ({
    /* opciones: [
      { label: "Contáctenos", link: "/contactar", icon: "email" },
      { label: "Facebook", link: "http://facebook.com", icon: "mdi-facebook" },
      { label: "Twitter", link: "http://twitter.com", icon: "mdi-twitter" },
      { label: "Messenger", link: "http://facebook.com/messenger", icon: "mdi-facebook-messenger" },
      { label: "Buscar", link: " ", icon: "search" }
    ] */
  })
})
</script>
