<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="$store.state.dialogo.calificarProducto">
      <q-card v-if="$store.state.credencial.token !== ''" style="width: 500px">
        <q-card-section>
          <div class="q-mt-xs q-mb-md row justify-end">
            <q-item-label class="text-primary text-body1 text-center col-10">
              Opinar sobre <strong>{{ $store.state.unproducto.nombre }}</strong>
            </q-item-label>

            <q-btn class="text-primary" flat dense size="10px"
              @click="$store.state.dialogo.calificarProducto = false" icon-right="mdi-window-close"
            />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md q-gutter-y-md">
            <q-item-label class="text-caption text-grey-8"><strong>Calificación:</strong></q-item-label>
            <q-rating
              size="md"
              color="warning"
              v-model="datos.calificacion"
              :value="datos.calificacion"
              dense
            />
          </div>

          <div class="q-pa-md q-gutter-y-md">
              <q-input v-model="datos.comentario" filled type="textarea" dense
                input-class="text-right" label-slot clearable
                hint="Este sitio se reserva el derecho de la publicación de los comentarios.
                  No se harán visibles aquellos que sean denigrantes, ofensivos, difamatorios o
                  que estén fuera de contexto."
              >
                <template v-slot:label>
                  <div class="row items-center all-pointer-events">
                    Si lo desea, puede brindarnos su opinión
                  </div>
                </template>
              </q-input>
            </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn push label="Opinar" class="bg-primary text-white" size="md" @click="validarDatos()" />
        </q-card-actions>
      </q-card>
      
      <q-card v-else>
        <q-card-section>
          <div class="text-red">
            <q-item-label>
              <q-icon name="error" size="25px" color="red" />
               Debe estar autenticado para opinar sobre este producto.
            </q-item-label>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

export default {
  name: 'CalificarProducto',

  data: () => ({
    datos: {
    calificacion: 0,
    comentario: '',
    productoId: '',
    usuarioId: '',
    aprobado: Boolean
    }
  }),

  created () {
    /* this.calificacion = 0
    this.comentario = '' */
  },

  methods: {

    validarDatos () {
      if (this.datos.calificacion === 0 && this.datos.comentario === '') {
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
        message: 'Debe calificar el producto o escribir un comentario',
        icon: 'mdi-alert-circle'
      })
    },

    mensajeSatisfactorio () {
      this.$q.notify({
        color: 'positive',
        position: 'bottom',
        message: 'Gracias por su opinión',
        icon: 'mdi-check-circle'
      })
    },

    calculaPromedio () { 
      let estosDatos = {
        calificacion: this.datos.calificacion
      }
      this.$axios.patch(this.$store.state.urlAPI + '/productos/' + this.$store.state.unproducto.id, estosDatos).then(response => {
        console.log(response.data)
        this.refrescarComentarios()
      }).catch(error => {
        console.log(error)
        // mensaje de error
      });
    },

    refrescarComentarios () {
      const filter = {
        where: {
          or: [
            { calificacion: {neq : 0} },
            { aprobado : { eq : true } }
          ],
          and: [
            {
              productoId: { eq: this.$store.state.unproducto.id }
            }
          ]
        },
        include: [
          {
            relation: 'usuario',
          }
        ]
      };
      const myfilter = encodeURIComponent(JSON.stringify(filter));
      this.$axios.get(this.$store.state.urlAPI + '/comentarios?filter=' + myfilter).then(response => {
        this.$store.state.comentarios = response.data
        this.$store.state.cant_comentarios = this.$store.state.comentarios.length
        console.log(this.$store.state.comentarios)
      }).catch(error => {
        console.log(error)
      })
    },

    async enviar () {
      if (this.datos.comentario !== '') {
        if (this.datos.calificacion != 0) {
          await this.calculaPromedio()
        }
        this.datos.productoId = this.$store.state.unproducto.id
        this.datos.usuarioId = this.$store.state.credencial.id_usuario
        this.$axios.post(this.$store.state.urlAPI + '/comentarios', this.datos).then(response => {
          this.datos.comentario = ''
          this.datos.calificacion = 0
          this.mensajeSatisfactorio()
          this.$store.state.dialogo.calificarProducto = false
        }).catch(error => {
          console.log(error)
          // mensaje de error
        });
      }
      if (this.datos.calificacion != 0 && this.datos.comentario == '') {
        await this.calculaPromedio()
        this.datos.productoId = this.$store.state.unproducto.id
        this.datos.usuarioId = this.$store.state.credencial.id_usuario
        this.datos.aprobado = true
        this.$axios.post(this.$store.state.urlAPI + '/comentarios', this.datos).then(response => {
          this.datos.calificacion = 0
          this.mensajeSatisfactorio()
          this.refrescarComentarios()
          this.$store.state.dialogo.calificarProducto = false
        }).catch(error => {
          console.log(error)
          // mensaje de error
        });
      }
    }
  }
}
</script>
