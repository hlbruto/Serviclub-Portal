<template>
  <div>
    <q-card-section class="row justify-between q-mt-none" v-if="$q.screen.gt.xs">
      <div class="col-1">
        <div class="column items-start" style="height:100px">
          <img :src="'img/productos/faviconQ-96x96.png'" :lazy-src="'img/productos/faviconQ-96x96.png'"
            style="max-width: 100%"
            v-if="$store.state.unproducto.foto" class="col"
          />
        </div>
      </div>

      <div class="col-7">
        <q-item-label class="col">{{$store.state.unproducto.descripcion}}</q-item-label>
      </div>

      <div class="col-3">
        <div class="column items-start" style="height:120px">
          <q-item-label class="col">Precio: {{$store.state.unproducto.precio}}</q-item-label>
          <q-rating
            v-if="calificacion > 0"
            v-model="$store.state.unproducto.calificacion"
            size="1em"
            color="warning"
            icon="star"
            readonly
            class="col"
          />
          <small class="col" v-if="$store.state.unproducto.cant_descargas > 0">
            <strong>{{ $store.state.unproducto.cant_descargas }}</strong> descargas
            <q-icon name="download" />
          </small>

          <q-btn label="descargar" color="blue-10" class="col" />
        </div>
      </div>
    </q-card-section>

    <q-card-section class="row justify-start q-mt-none" v-else>
      <div class="col-5">
        <div class="column items-start" style="height:80px">
          <img :src="'img/productos/faviconQ-96x96.png'" :lazy-src="'img/productos/faviconQ-96x96.png'"
            style="max-width: 80%"
            v-if="$store.state.unproducto.foto" class="col"
          />
        </div>
      </div>

      <div class="col-6">
        <div class="column items-start q-ml-sm" style="height:120px">
          <q-item-label class="col">Precio: {{$store.state.unproducto.precio}}</q-item-label>
          <q-rating
            v-if="calificacion > 0"
            v-model="$store.state.unproducto.calificacion"
            size="1em"
            color="warning"
            icon="star"
            readonly
            class="col"
          />
          <small class="col" v-if="$store.state.unproducto.cant_descargas > 0">
            <strong>{{ $store.state.unproducto.cant_descargas }}</strong> descargas
            <q-icon name="download" />
          </small>

          <q-btn label="descargar" color="blue-10" class="col" dense />
        </div>
      </div>
    </q-card-section>

    <q-card-section class="row justify-start q-mt-sm" v-if="$q.screen.lt.sm">
      <q-item-label class="col">{{$store.state.unproducto.descripcion}}</q-item-label>
    </q-card-section>

    <q-card-section>
      <q-separator />
      <ComentariosProducto />
    </q-card-section>
  </div>
</template>

<script>
export default {
  name: 'DescripcionProducto',

  components: {
    ComentariosProducto: require('components/productos/ComentariosProducto').default
  },

 /*  data () {
    return {
      slide: 1,
      ratingModel: 3,
      calificacion: 4
    }
    datos = {

    }
  }, */
  data: () => ({
    slide: 1,
    ratingModel: 3,
    calificacion: 4,
    datos: {
      cant_descargas: 0
    }
  }),

  created () {
    // this.$store.state.unproducto.cant_descargas = 1
  },

  methods: {

    mensajeSatisfactorio () {
      this.$q.notify({
        color: 'secondary',
        position: 'bottom',
        message: 'Descarga realizada',
        icon: 'mdi-check-circle'
      })
    },
      // devuelve el servicio segun el id de la tarjeta en la q se dio click
    esteProducto (producto) {
      this.$store.state.unproducto = producto
      this.$router.push({
        path: '/producto/' + this.$store.state.unproducto.id
      })
    },

    descargar () {
     this.datos.cant_descargas = this.$store.state.unproducto.cant_descargas + 1
     this.$axios.patch(this.$store.state.urlAPI + '/productos/' + this.$store.state.unproducto.id, this.datos).then(response => {
        console.log(response.data)
        this.mensajeSatisfactorio()
      }).catch(error => {
        console.log(error)
        // mensaje de error
      });
    }
  }
}
</script>
 