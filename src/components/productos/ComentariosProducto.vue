<template>
  <div>
    <div class="row justify-between q-mt-md">
      <q-item-label class="q-mt-md col-8 text-caption"
        v-if="$store.state.cant_comentarios === 0">
        <small><q-icon name="mdi-comment" size="xs" /> No se ha(n) publicado comentarios</small>
      </q-item-label>

      <q-item-label class="q-mt-md col-8 text-caption" v-else>
        <q-icon name="mdi-comment" size="xs" /> Se ha(n) publicado
        <strong> {{$store.state.cant_comentarios}} </strong>
        comentario(s)
      </q-item-label>

      <q-btn label="opinar" class="q-mt-sm text-primary col" flat size="sm"
        @click="opinar()"
      />
    </div>

    <div class="q-mt-lg text-caption" v-if="$store.state.cant_comentarios !== 0">
      <div v-for="item in $store.state.comentarios" :key="item.id">
        <q-card class="bg-grey-3 q-mb-md">
          <q-card-section>
            <q-item-label class="q-mb-md">
              <q-icon size="xs" name="mdi-comment-outline" left/>
              <strong>{{ item.usuario.email }}:</strong>
            </q-item-label>

            <q-rating
              v-if="item.calificacion !== 0"
              v-model="item.calificacion"
              readonly
              color="warning"
            />

            <q-item-label
              v-if="item.comentario !== undefined && item.comentario !== ''
              && item.comentario !== null && item.aprobado === true"
            >
              {{item.comentario}}
            </q-item-label>

            <q-item-label class="text-right">
              <small>{{ item.fecha_publicado }}</small>
            </q-item-label>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <CalificarProducto />
  </div>
</template>

<script>
export default {
  name: 'ComentariosProducto',

  components: {
    CalificarProducto: require('components/dialogos/CalificarProducto').default
  },

  data: () => ({}),

  created () {
    // this.refrescarComentarios ()
  },

  methods: {
    refrescarComentarios () {
      this.$store.state.comentarios = []
      this.$store.state.cant_comentarios = 0
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

    opinar () {
      if (this.$store.state.credencial.token !== '') {
        this.$store.state.dialogo.calificarProducto = true
      } else {
        this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Debe autenticarse si desea opinar sobre el producto',
        icon: 'mdi-alert-circle'
      })
      }
    }
  }
}
</script>
 