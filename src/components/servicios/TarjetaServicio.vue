<template>
  <div>
    <q-card class="my-card-serv shadow-10" bordered>
      <q-img :src="'img/servicios/' + servicio.foto"
      :lazy-src="'img/servicios/' + servicio.foto"
      />

      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col ellipsis"><strong>{{ servicio.nombre }}</strong></div>
        </div>

        <div class="text-caption text-linea">$.{{ servicio.tarifa }}</div>

        <div class="q-mt-md text-parrafo">
          <small>{{ servicio.descripcion }}</small>
        </div>
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
  name: 'tarjetaServicio',

  props: ['servicio'],

  components: {
    VerServicio: require('components/dialogos/VerServicio').default
  },

  data: () => ({
  }),  

  methods: {
      // devuelve el servicio segun el id de la tarjeta en la q se dio click
    esteServicio (elservicio) {
      console.log('serv:')
      console.log(elservicio)
      this.$store.state.problema = ''
      this.$store.state.momento = ''
      this.$store.state.unservicio = elservicio
      this.$store.state.slideServicio = this.$store.state.unservicio.id
      console.log('un serv:')
      console.log(this.$store.state.unservicio)
      this.$store.state.dialogo.verServicio = true
      // this.$router.push('/servicios')
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

.my-card-serv {  
  width: 230px;
  max-width: 230px;
  border-color: rgba(100, 154, 236, 0.575);
  border-width: 0.5pt;
  border-radius: 0.2cm;
}
</style>
 