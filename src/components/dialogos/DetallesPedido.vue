<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="$store.state.dialogo.detallesPedido">
      <q-card style="width: 400px">
        <q-card-section>
          <div class="q-mt-xs q-mb-md row justify-end">
            <q-item-label class="text-primary text-body1 text-center col-10">
              Detalles
            </q-item-label>

            <q-btn class="text-primary" flat dense size="10px"
              @click="$store.state.dialogo.detallesPedido = false" icon-right="mdi-window-close"
            />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none" v-if="$store.state.credencial.token !== ''">
            <q-item-label><strong>Fecha Pedido: </strong>{{ $store.state.pedido.fecha_pedido }}</q-item-label>
            <q-item-label><strong>Servicio solicitado: </strong>{{ $store.state.pedido.servicio.nombre }}</q-item-label>
            <q-item-label><strong>Precio: </strong>{{ $store.state.pedido.servicio.tarifa }}</q-item-label>
            <q-item-label><strong>Momento: </strong>{{ $store.state.pedido.momento }}</q-item-label>
            <q-item-label><strong>Problema: </strong>{{ $store.state.pedido.problema }}</q-item-label>
            <q-item-label><strong>Estado: </strong>
                <small class="text-red" v-if="$store.state.pedido.estado=='cancelado'">{{ $store.state.pedido.estado }}</small>
                <small class="text-blue" v-if="$store.state.pedido.estado=='pendiente'">{{ $store.state.pedido.estado }}</small>
                <small class="text-orange" v-if="$store.state.pedido.estado=='procesando_pago'">{{ $store.state.pedido.estado }}</small>
                <small class="text-purple" v-if="$store.state.pedido.estado=='asignado'">{{ $store.state.pedido.estado }}</small>
                <small class="text-green" v-if="$store.state.pedido.estado=='ofrecido'">{{ $store.state.pedido.estado }}</small>
            </q-item-label>
            <q-item-label v-if="$store.state.pedido.instalacionId !== undefined">
              <strong>Joven Club elegido: </strong>{{ $store.state.pedido.instalacion.nombre }}
            </q-item-label>
            <q-item-label v-if="$store.state.pedido.userId !== '' &&
              $store.state.pedido.userId !== undefined && $store.state.pedido.userId !== null">
              <strong>Trabajador asignado: </strong>{{ $store.state.pedido.user.name }}
            </q-item-label>

            <div v-if="$store.state.pedido.estado === 'ofrecido'">
              <q-item-label v-if="$store.state.pedido.resumen !== ''"><strong>Resumen: </strong>{{ $store.state.pedido.resumen }}</q-item-label>
              <q-item-label><strong>Fecha Ofrecido: </strong>{{ $store.state.pedido.fecha_ofrecido }}</q-item-label>
              <q-item-label v-if="$store.state.pedido.calificacion">
                <strong>Calificación: </strong>
                <q-rating
                  size="sm"
                  color="warning"
                  icon="star"
                  readonly
                  :value="$store.state.pedido.calificacion"
                />
              </q-item-label>

              <q-card class="q-pa-md q-mt-md q-gutter-y-md text-primary" v-else>
                <q-item-label>
                  <strong>Por favor, califique el servicio que usted recibió:</strong>
                </q-item-label>

                <div class="row justify-center">
                  <div class="col-4">
                    <q-rating
                      size="xs"
                      color="warning"
                      icon="star"
                      v-model="rating"
                      :value="$store.state.pedido.calificacion"
                    />
                  </div>
                
                  <div class="col-auto">
                    <q-btn flat class="bg-primary text-white" icon="check" size="sm" @click="calificar()" />
                  </div>
                </div>
              </q-card>
            </div>
          </q-card-section>

        <q-card-actions align="between">
          <q-btn flat label="Cancelar Pedido" class="text-red" size="md" icon="cancel"
            v-if="$store.state.pedido.estado === 'pendiente'"
            @click="cancelarPedido()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
      <CancelarPedido />
  </div>
</template>

<script>

export default {
  name: 'DetallesPedido',

  components: {
    CancelarPedido: require('components/dialogos/CancelarPedido').default
  },

  data: () => ({
    rating: 0,
    value: 0,
    datos: {
      calificacion: 0
    }
  }),

  created () {
    if (this.$store.state.pedido.calificacion !== undefined) {
      this.rating = this.$store.state.pedido.calificacion
    }
  },

  methods: {
    calificar () {
      this.$store.state.pedido.calificacion = this.rating
      this.datos.calificacion = this.rating
      console.log(this.datos.calificacion)
      this.$axios.patch(this.$store.state.urlAPI + '/pedidos/' + this.$store.state.pedido.id, this.datos).then(response => {
        console.log(response.data)
        this.mensajeSatisfactorio()
      }).catch(error => {
        console.log(error)
        // mensaje de error
      });
      // para evitar q en otro item salga esta calificacion por defecto, limpio rating
      this.rating = 0
      if (this.datos.calificacion === 0) {
        this.mensajeError()
      }
    },

    validarDatos () {
      if (this.$store.state.credencial.token !== '') {
        if (this.mensaje === '' || this.mensaje === null) {
          this.mensajeDatosIncompletos()
        } else {
          this.enviar()
        }
      } else {
        if (this.mensaje === '' || this.mensaje === null ||
          this.nombre === '' || this.nombre === null ||
          this.email === '' || this.email === null) {
          this.mensajeDatosIncompletos()
        } else {
          this.enviar()
        }
      }
    },

    cancelarPedido () {
      this.$store.state.dialogo.detallesPedido = false
      this.$store.state.dialogo.cancelarPedido = true
    },

    mensajeError () {
      // error
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Debe calificar el servicio al menos con una estrella',
        icon: 'mdi-alert-circle'
      })
    },

    mensajeSatisfactorio () {
      this.$q.notify({
        color: 'positive',
        position: 'bottom',
        message: 'El mensaje fue enviado',
        icon: 'mdi-check-circle'
      })
    },

    enviar () {
      // satisfactorio
      this.mensajeSatisfactorio()
    }
  }
}
</script>
