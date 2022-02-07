<template>
  <div>
    <q-card class="my-card shadow-10" bordered>
      <q-img :src="'img/servicios/' + servicio.foto"
      :lazy-src="'img/servicios/' + servicio.foto"
      />
      <q-card-section>
        <q-item-label class="row ellipsis">
          <strong>{{ servicio.nombre }}</strong>
        </q-item-label>
        <q-item-label class="text-caption text-primary text-linea">$.{{ servicio.tarifa }}</q-item-label>
      </q-card-section>
      <q-separator />
      <q-card-actions align="center">
        <q-btn flat size="sm" color="primary" label="ver más" @click="esteServicio(servicio)" />
      </q-card-actions>
    </q-card>
    <VerServicio />
  </div>
</template>

<script>
export default {
  name: 'tarjetaSeccServ',

  props: ['servicio'],

  components: {
    VerServicio: require('components/dialogos/VerServicio').default
  },

  data: () => ({
  }),  

  methods: {
      // devuelve el servicio segun el id de la tarjeta en la q se dio click
    esteServicio (elservicio) {
      this.$store.state.problema = ''
      this.$store.state.momento = ''
      this.$store.state.unservicio = elservicio
      this.$store.state.slideServicio = this.$store.state.unservicio.id
      this.$store.state.dialogo.verServicio = true
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

.my-card {  
  width: 230px;
  max-width: 300px;
  border-color: rgba(100, 154, 236, 0.575);
  border-width: 0.5pt;
  border-radius: 0.2cm;
}
</style>
 