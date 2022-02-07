<template>
  <q-dialog v-model="$store.state.dialogo.verProducto">
    <q-carousel
      swipeable
      animated
      v-model="$store.state.slideProducto"
      infinite
      arrows
      transition-prev="slide-left"
      transition-next="slide-rigth"
      control-color="primary"
    >
      <q-carousel-slide class="column no-wrap"
        :name="producto.id" v-for="producto in $store.state.productos" :key="producto.id"
      >
        <div>
          <div>
            <div class="q-mt-xs row justify-end">
              <q-item-label class="text-primary text-body1 text-center col-10">
                {{ producto.nombre }}
              </q-item-label>

              <q-btn class="text-primary" flat dense size="10px"
                @click="$store.state.dialogo.verProducto = false" icon-right="mdi-window-close"
              />
            </div>

            <div class="q-mt-none row justify-center">
              <div class="q-mt-md col-5 text-caption" v-if="$q.screen.gt.xs">
                <q-img :src="'img/productos/' + producto.foto"
                  :lazy-src="'img/productos/' + producto.foto"
                  v-if="producto.foto"
                  style="width:80%"
                  class="q-mb-md"
                />
                <br>

                <strong class="q-mt-xl">Tarifa:</strong>
                {{ producto.precio }}
                <br>

                <q-rating
                  v-if="producto.calificacion > 0"
                  v-model="producto.calificacion"
                  size="1em"
                  color="warning"
                  icon="star"
                  readonly
                  class="col"
                />

                <div v-if="$store.state.credencial.token !== ''">
                  <q-btn label="descargar" icon="download"
                    color="primary" dense class="q-mt-md" size="sm"
                    v-if="producto.precio === 'gratis'"
                    @click="descargar()"
                  />

                  <q-btn label="pagar"
                    color="primary" dense class="q-mt-md" size="sm"
                    v-if="producto.precio !== 'gratis'"
                    @click="pagar()"
                  />
                  <br>
                  <small>
                    <strong>{{ producto.cant_descargas }}</strong> descargas
                  </small>
                </div>

                <div class="q-mt-md q-mr-sm col-5 text-red text-center" v-else>
                    Para descargar este producto, usted debe estar autenticado.

                    <q-btn label="entrar" color="primary" class="q-mt-sm" push
                      @click="$store.state.dialogo.formularioAcceso = true, $store.state.dialogo.verProducto = false"
                    />
                </div>
              </div>

              <div class="q-mt-md col-11" v-else>
                <q-img :src="'img/productos/' + producto.foto"
                  :lazy-src="'img/productos/' + producto.foto"
                  v-if="producto.foto"
                  style="width:80%"
                  class="q-mb-md"
                />
                <br>

                <strong class="q-mt-xl">Tarifa:</strong>
                {{ producto.precio }}
                <br>

                <q-rating
                  v-if="producto.calificacion > 0"
                  v-model="producto.calificacion"
                  size="1em"
                  color="warning"
                  icon="star"
                  readonly
                  class="col"
                />

                <div v-if="$store.state.credencial.token !== ''">
                  <q-btn label="descargar" icon="download"
                    color="primary" dense class="q-mt-md" size="sm"
                    v-if="producto.precio === 'gratis'"
                    @click="descargar()"
                  />

                  <q-btn label="pagar"
                    color="primary" dense class="q-mt-md" size="sm"
                    v-if="producto.precio !== 'gratis'"
                    @click="pagar()"
                  />
                  <br>
                  <small>
                    <strong>{{ producto.cant_descargas }}</strong> descargas
                  </small>
                </div>

                <div class="q-mt-md col-5 text-red text-center" v-else>
                    Para descargar este producto, usted debe estar autenticado.

                    <q-btn label="entrar" color="primary"  class="q-mt-sm" push
                      @click="$store.state.dialogo.formularioAcceso = true, $store.state.dialogo.verProducto = false"
                    />
                </div>
              </div>

              <q-separator inset vertical v-if="$q.screen.gt.xs" />

              <p class="q-mt-xl q-ml-md col-6 text-caption" v-if="$q.screen.gt.xs">
                {{ producto.descripcion }}
              </p>

              <p class="q-mt-xl col-11 text-caption" v-else>
                {{ producto.descripcion }}
              </p>
            </div>
          </div>
        </div>

        <q-separator class="q-mt-sm" />
        <ComentariosProducto />
      </q-carousel-slide>
    </q-carousel>
  </q-dialog>   
</template>

<script>

export default {
  name: 'verProducto',

  components: {
    ComentariosProducto: require('components/productos/ComentariosProducto').default
  },
  
  data: () => ({
    datos: {
      cant_descargas: 0
    }
  }),

  created () {
    /* var aux = window.location.hash.split('/')
    console.log(aux[2])
    if (this.$store.state.unproducto.id == '' || this.$store.state.unproducto.id == null ||
      this.$store.state.unproducto.id == undefined) {
      this.$store.state.unproducto.id = aux[2]
      console.log(aux[2])
    }
    this.$axios.get(this.$store.state.urlAPI + '/productos/' + this.$store.state.unproducto.id).then(response => {
      this.$store.state.unproducto = response.data
      console.log(this.$store.state.unproducto)
    }).catch(error => {
      console.log(error)
    }) */
  },

  methods: {
    descargar () {
     this.datos.cant_descargas = this.$store.state.unproducto.cant_descargas + 1
     this.$axios.patch(this.$store.state.urlAPI + '/productos/' + this.$store.state.unproducto.id, this.datos).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
        // mensaje de error
      });
    },

    pagar () {
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'La opción no está disponible por el momento',
        icon: 'mdi-alert-circle'
      })
    }
  }
}
</script>