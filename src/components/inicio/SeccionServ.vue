<template>
  <q-card flat class="q-mb-md" style="background: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0)">
    <q-card-section class="q-pa-md text-center">
      <q-item-label class="text-h4 textoGrande" v-if="$q.screen.gt.sm">
        Algunos de los servicios
      </q-item-label>

      <q-item-label class="text-h5 q-mt-md textoGrande" v-else>
        Algunos de los servicios
      </q-item-label>

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
        height="350px"
        class="bg-transparent"
        v-if="$q.screen.gt.sm"
      >
        <q-carousel-slide :name="1" class="column no-wrap" >
          <div class="row fit justify-evenly items-center q-gutter-xs q-col-gutter no-wrap">
            <div class="col-2" v-for="(servicio,index) in filtrarServicios(0,4)" :key="index">
              <TarjetaSeccServ :servicio="servicio" />
            </div>
          </div>     
        </q-carousel-slide> 
        <q-carousel-slide :name="2" class="column no-wrap">
          <div class="row fit justify-evenly items-center q-gutter-xs q-col-gutter no-wrap">
            <div v-for="(servicio,index) in filtrarServicios(4,8)" :key="index">              
              <TarjetaSeccServ :servicio="servicio" />
            </div>
          </div>     
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap">
          <div class="row fit justify-evenly items-center q-gutter-xs q-col-gutter no-wrap">
            <div v-for="(servicio,index) in filtrarServicios(8,12)" :key="index">
              <TarjetaSeccServ :servicio="servicio" />
            </div>
          </div>     
        </q-carousel-slide>
        <q-carousel-slide :name="4" class="column no-wrap">
          <div class="row fit justify-evenly items-center q-gutter-xs q-col-gutter no-wrap">
            <div v-for="(servicio,index) in filtrarServicios(12,16)" :key="index">
              <TarjetaSeccServ :servicio="servicio" />
            </div>
          </div>     
        </q-carousel-slide>
      </q-carousel>

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
        class="bg-transparent q-mt-xs q-mb-xs"
        v-else
      >
        <q-carousel-slide :name="servicio.id" class="column no-wrap" v-for="servicio in $store.state.servicios" :key="servicio.id">
          <div class="row fit justify-evenly items-center q-gutter-xs q-col-gutter no-wrap">
            <TarjetaSeccServ :servicio="servicio" />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-card-section>
    <q-separator />
  

    <q-card-actions align="center">
      <q-btn flat size="md" color="black" label="ver todos los servicios" @click="$router.push('/servicios')" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {

  components: {
    TarjetaSeccServ: require('components/inicio/TarjetaSeccServ').default
  },

  data: () => ({
    slide: '',
    aux: [
      /* {
        id:'4',
        icon:'groups',
        label:'Servicios Terceros'
      },
      {
        id:'5',
        icon:'question_answer',
        label:'Servicios Sociales'
      },
      {
        id:'6',
        icon:'web',
        label:'Servicios web'
      }, */
      {
        id:'1',
        icon:'room',
        label:'Dentro del JC'
      },
      {
        id:'2',
        icon:'location_city',
        label:'Fuera del JC'
      },
      {
        id:'3',
        icon:'net',
        label:'En la Red'
      }
    ]
  }),

  computed: {
    /* filtrarServicios () {
      return this.$store.state.servicios.filter((item, index) =>  index <  4)
    } */
  },

  created () {
  },

  methods: {
    filtrarServicios (inicia, termina) {
      var arreglofiltrado = []
      for (let index = inicia; index < termina; index++) {
        arreglofiltrado.push(this.$store.state.servicios[index])        
      }
      return arreglofiltrado
    }
  }
}
</script>

<style lang="scss">
</style>
