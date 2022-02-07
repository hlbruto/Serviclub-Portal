<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="$store.state.dialogo.cancelarPedido">
      <q-card style="width: 320px">
        <q-card-section>
          <div class="q-mt-xs row justify-end">
            <q-item-label class="text-primary text-body1 text-center col-10">
              Cancelar el pedido
            </q-item-label>

            <q-btn class="text-primary" flat dense size="10px"
              @click="$store.state.dialogo.cancelarPedido = false" icon-right="mdi-window-close"
            />
          </div>
        </q-card-section>
        <q-card-section class="text-center">
          <q-item-label>
            ¿Está seguro que desea Cancelar el servicio de <strong>{{$store.state.pedido.servicio.nombre}}
            </strong>?
          </q-item-label>

            <q-select
              class="q-mt-md"
              filled
              dense
              options-dense
              v-model="motivo"
              label="Seleccione el motivo"
              label-slot
              lazy-rules
              :rules="[val => !!val || 'El campo es obligatorio']"
              :options="motivos"
              style="width: 280px"
            />
            <q-input v-model="otroMotivo" filled type="textarea"
              label-slot clearable style="width: 280px" dense
              v-if="motivo === 'Otro motivo'"
            >
              <template v-slot:label>
                <div class="row items-center all-pointer-events">
                  Escriba el motivo

                  <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                    Escriba cuál ha sido el motivo por el que desea cancelar
                  </q-tooltip>
                </div>
              </template>
            </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" v-close-popup class="text-primary" size="md" />
          <q-btn push label="Sí" class="text-white bg-primary" size="md" @click="validarDatos()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

export default {
  name: 'CancelarPedido',

  data: () => ({
    motivo: '',
    otroMotivo: '',
    motivos: [
      'Me equivoqué al escoger la instalación',
      'Demora en recibir el servicio',
      'Ya resolví el problema',
      'Otro motivo'
    ],
    datos: {
      estado: "",
      motivo_cancelado: ""
    }
  }),

  created () {},

  methods: {

    validarDatos () {
      if (this.motivo === '' || this.motivo === null) {
        this.mensajeError()
      } else {
        this.enviar()
      }
    },

    mensajeError () {
      // error
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Debe escoger un motivo',
        icon: 'mdi-alert-circle'
      })
    },

    mensajeSatisfactorio () {
      this.$q.notify({
        color: 'positive',
        position: 'bottom',
        message: 'El pedido ha sido cancelado',
        icon: 'mdi-check-circle'
      })
    },

    enviar () {
      this.datos.estado = 'cancelado'
      this.datos.motivo_cancelado = this.motivo
      if (this.motivo == 'Otro motivo') {
        this.datos.motivo_cancelado = this.otroMotivo
      }
      this.$axios.patch(this.$store.state.urlAPI + '/pedidos/' + this.$store.state.pedido.id, this.datos).then(response => {
        console.log(response.data)
        this.refrescarPedidos()
        this.mensajeSatisfactorio()
        this.$store.state.dialogo.cancelarPedido = false
        this.$store.state.dialogo.detallesPedido = false
      }).catch(error => {
        console.log(error)
        // mensaje de error
      });
      // satisfactorio
    },

    refrescarPedidos () {
      console.log('entra para ir al escritorio')
      const filter = {
        where: {
          estado : { neq :'cancelado' },
          and: [
            {
              usuarioId: { eq: this.$store.state.credencial.id_usuario}
            }
          ]
        },
        include: [
          {
            relation: 'servicio',
          },
          {
            relation: 'instalacion',
          },
          {
            relation: 'user'
          }
        ],
      };
      const myfilter = encodeURIComponent(JSON.stringify(filter));
      this.$axios.get(this.$store.state.urlAPI + '/pedidos?filter=' + myfilter).then(response => {
        console.log(response.data)
        this.$store.state.pedidos = response.data
        this.$store.state.nombreTrab = ''
        this.mensajeSatisfactorio()
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
