<template>
  <q-dialog v-model="$store.state.dialogo.verServicio">
    <q-carousel
      swipeable
      animated
      v-model="$store.state.slideServicio"
      infinite
      arrows
      transition-prev="slide-left"
      transition-next="slide-rigth"
      control-color="primary"
    >
      <q-carousel-slide class="column no-wrap"
        :name="servicio.id" v-for="servicio in $store.state.servicios" :key="servicio.id"
      >
        <div class="row justify-center items-center">
          <div>
            <div class="q-mt-xs row justify-end">
              <q-item-label class="text-primary text-body1 text-center col-10">
                {{ servicio.nombre }}
              </q-item-label>

              <q-btn class="text-primary" flat dense size="10px"
                @click="$store.state.dialogo.verServicio = false" icon-right="mdi-window-close"
              />
            </div>
              
            <!-- <q-separator class="q-mb-md" /> -->

            <div class="q-mt-none row justify-around">
              <div class="q-mt-md col-5 text-caption" v-if="$q.screen.gt.xs">
                <q-img :src="'img/servicios/' + servicio.foto"
                  :lazy-src="'img/servicios/' + servicio.foto"
                  v-if="servicio.foto"
                  style="width:100%"
                />
                <p class="q-mt-md">{{ servicio.descripcion }}</p>
                <strong>Tarifa:</strong>
                {{ servicio.tarifa }}
              </div>

              <div class="q-mt-md col-11" v-else>
                <q-img :src="'img/servicios/' + servicio.foto"
                :lazy-src="'img/servicios/' + servicio.foto"
                v-if="servicio.foto"
                sizes="100%"
                />
                <p class="q-mt-md">{{ servicio.descripcion }}</p>
                <strong>Tarifa:</strong>
                {{ servicio.tarifa }}
              </div>

              <q-separator inset vertical />

              <div class="q-mt-none col-6"
                v-if="$q.screen.gt.xs && $store.state.credencial.token !== '' && servicio.casa === 1"
              >
                <SolicitarServicio />
              </div>

              <div class="q-mt-lg col-11"
                v-else-if="$store.state.credencial.token !== '' && servicio.casa === 1"
              >
                <q-separator inset />
                <SolicitarServicio />
              </div>

              <div class="q-mt-xl col-5 text-red text-center"
                v-else-if="$store.state.credencial.token === '' && servicio.casa === 1"
              >
                <div class="q-mt-xl">
                  Para solicitar este servicio, usted debe estar autenticado.
                </div>

                <div class="q-mt-lg">
                  <q-btn label="entrar" color="primary"
                    @click="$store.state.dialogo.formularioAcceso = true, $store.state.dialogo.verServicio = false" />
                </div>
              </div>

              <div class="q-mt-xl col-5 text-red text-center" v-else>
                <div class="q-mt-xl">
                  Por el momento, el servicio no está disponible desde esta aplicación.<br>
                  Si desea contratarlo, acérquese a su Joven Club más cercano.
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-dialog>   
</template>

<script>

export default {
  name: 'VerServicio',

  components: {
    SolicitarServicio: require('components/servicios/SolicitarServicio').default
  },
  
  data: () => ({
  }),

  created () {
    /* var aux = window.location.hash.split('/')
    console.log(aux[2])
    if (this.$store.state.unservicio.id == '' || this.$store.state.unservicio.id == null ||
      this.$store.state.unservicio.id == undefined) {
      this.$store.state.unservicio.id = aux[2]
      console.log(aux[2])
    }
    this.$axios.get(this.$store.state.urlAPI + '/servicios/' + this.$store.state.unservicio.id).then(response => {
      this.$store.state.unservicio = response.data
      console.log(this.$store.state.unservicio)
    }).catch(error => {
      console.log(error)
    }) */
  }
}
</script>