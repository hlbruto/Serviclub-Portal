<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      arrows
      control-color="primary"
      swipeable
      animated
      infinite
      autoplay
      height="150px"
      class="bg-transparent"
    >
      <q-carousel-slide :name="1" class="column no-wrap">
        <div class="row fit justify-around items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-3" src="images/productos/recon.png" />
          <q-img class="rounded-borders col-3" src="images/productos/descap.png" />
          <q-img class="rounded-borders col-3" src="images/productos/emprofarma.png" />
        </div>     
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap">
        <div class="row fit justify-around items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-3" src="images/productos/descap.png" />
          <q-img class="rounded-borders col-3" src="images/productos/emprofarma.png" />
          <q-img class="rounded-borders col-3" src="images/productos/sgp.png" />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap">
        <div class="row fit justify-around items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-3" src="images/productos/emprofarma.png" />
          <q-img class="rounded-borders col-3" src="images/productos/sgp.png" />
          <q-img class="rounded-borders col-3" src="images/productos/ludox.png" />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="4" class="column no-wrap">
        <div class="row fit justify-around items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-3" src="images/productos/sgp.png" />
          <q-img class="rounded-borders col-3" src="images/productos/ludox.png" />
          <q-img class="rounded-borders col-3" src="images/productos/tino.png" />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="5" class="column no-wrap">
        <div class="row fit justify-around items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-3" src="images/productos/ludox.png" />
          <q-img class="rounded-borders col-3" src="images/productos/tino.png" />
          <q-img class="rounded-borders col-3" src="images/productos/ecured.png" />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="6" class="column no-wrap">
        <div class="row fit justify-around items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-3" src="images/productos/tino.png" />
          <q-img class="rounded-borders col-3" src="images/productos/ecured.png" />
          <q-img class="rounded-borders col-3" src="images/productos/recon.png" />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="7" class="column no-wrap">
        <div class="row fit justify-around items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-3" src="images/productos/ecured.png" />
          <q-img class="rounded-borders col-3" src="images/productos/recon.png" />
          <q-img class="rounded-borders col-3" src="images/productos/descap.png" />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script lang="js">

export default {
  data () {
    return {
      slide: 1,
      fotosC: [
        {
          id: 1,
          texto: 'Recon',
          url: 'images/productos/recon.png'
        },
        {
          id: 2,
          texto: 'Descap',
          url: 'images/productos/descap.png'
        },
        {
          id: 3,
          texto: 'Emprofarma',
          url: 'images/productos/emprofarma.png'
        },
        {
          id: 4,
          texto: 'SGP',
          url: 'images/productos/sgp.png'
        },
        {
          id: 5,
          texto: 'Ludox',
          url: 'images/productos/ludox.png'
        },
        {
          id: 6,
          texto: 'Tino',
          url: 'images/productos/tino.png'
        },
        {
          id: 7,
          texto: 'Ecured',
          url: 'images/productos/ecured.png'
        }
      ]
    }
  }
}
</script>
