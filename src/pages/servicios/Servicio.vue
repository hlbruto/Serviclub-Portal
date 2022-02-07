<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Listado de Servicios" to="/servicios" />
        <q-breadcrumbs-el :label="$store.state.unservicio.nombre" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md">
      <q-card>
        <q-card-section class="q-mt-xs q-mb-none row justify-between" v-if="$q.screen.gt.xs">
          <q-item-label class="text-primary text-h5 q-ml-lg col-10">
            {{ $store.state.unservicio.nombre }}
          </q-item-label>
          <q-btn class="text-primary" flat dense size="12px"
          to="/servicios" icon-right="mdi-window-close" />
        </q-card-section>
        
        <q-separator inset v-if="$q.screen.gt.xs" />

        <q-card-section class="q-mt-xs q-mb-none row justify-end" v-else>
          <q-btn class="text-primary" flat dense size="12px"
          to="/servicios" icon-right="mdi-window-close" />
        </q-card-section>

        <q-card-section class="q-mt-none row justify-around">
          <div class="q-mt-none col-5" v-if="$q.screen.gt.xs">
            <q-img :src="'img/servicios/' + $store.state.unservicio.foto"
              :lazy-src="'img/servicios/' + $store.state.unservicio.foto"
              v-if="$store.state.unservicio.foto"
              sizes="100%"
            />
            <p class="q-mt-md">{{$store.state.unservicio.descripcion}}</p>
            <strong>Tarifa:</strong>
            {{$store.state.unservicio.tarifa}}
          </div>

          <div class="q-mt-none col-10" v-else>
            <q-img :src="'img/servicios/' + $store.state.unservicio.foto"
              :lazy-src="'img/servicios/' + $store.state.unservicio.foto"
              v-if="$store.state.unservicio.foto"
              sizes="100%"
            />
            <p class="q-mt-md">{{$store.state.unservicio.descripcion}}</p>
            <strong>Tarifa:</strong>
            {{$store.state.unservicio.tarifa}}
          </div>

          <div class="q-mt-none col-6"
            v-if="$q.screen.gt.xs && $store.state.credencial.token !== '' && $store.state.unservicio.casa === 1"
          >
            <SolicitarServicio />
          </div>

          <div class="q-mt-lg col-12"
            v-else-if="$store.state.credencial.token !== '' && $store.state.unservicio.casa === 1"
          >
            <q-separator inset />
            <SolicitarServicio />
          </div>

          <div class="q-mt-xl col-6 text-red text-center"
            v-else-if="$store.state.credencial.token === '' && $store.state.unservicio.casa === 1"
          >
            <div class="q-mt-xl">
            Para solicitar este servicio, usted debe estar autenticado.
            </div>

            <div class="q-mt-lg">
              <q-btn label="entrar" color="primary"
              @click="$store.state.dialogo.formularioAcceso = true" />
            </div>
          </div>

          <div class="q-mt-xl col-6 text-red text-center" v-else>
            <div class="q-mt-xl">
            Por el momento, el servicio no está disponible desde esta aplicación.<br>
            Si desea contratarlo, acérquese a su Joven Club más cercano.
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'Servicio',

  components: {
    SolicitarServicio: require('components/servicios/SolicitarServicio').default
  },

  created () {
    var aux = window.location.hash.split('/')
    console.log(aux[2])
    if (this.$store.state.unservicio.id == '' || this.$store.state.unservicio.id == null || this.$store.state.unservicio.id == undefined) {
      this.$store.state.unservicio.id = aux[2]
      console.log(aux[2])
    }
    this.$axios.get(this.$store.state.urlAPI + '/servicios/' + this.$store.state.unservicio.id).then(response => {
      this.$store.state.unservicio = response.data
      console.log(this.$store.state.unservicio)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
