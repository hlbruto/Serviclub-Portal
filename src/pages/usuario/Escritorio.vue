<template>
  <q-page>
    <div v-if="$store.state.credencial.estado === 2 && $store.state.credencial.token !== ''">         
        <!-- <q-item-label>
          <q-icon name="shopping_cart" size="sm" />MI CARRITO
        </q-item-label> -->

        
      <div class="q-pa-lg text-white text-caption">
        <q-item-label>INFORMACIÓN SOBRE LOS SERVICIOS QUE UD. HA SOLICITADO</q-item-label>
        <q-separator inset class="bg-white" />
      </div>

      <div class="row justify-left q-mb-md text-white" v-if="$q.screen.gt.xs">
        <q-item-label class="q-ml-xl text-body2 col-3"><strong>Usuario:</strong> henry.perez@cubava.cu</q-item-label>
        <q-item-label class="text-body2 col-3"><strong>Saldo disponible:</strong> $500.00</q-item-label>
      </div>

      <div class="text-white" v-else>
        <q-item-label class="q-ml-xl q-mt-none text-body2"><strong>Usuario:</strong> henry.perez@cubava.cu</q-item-label>
        <q-item-label class="q-ml-xl text-body2"><strong>Saldo disponible:</strong> $500.00</q-item-label>
      </div>

      <!-- <q-card class="q-pa-lg q-ml-xl q-mr-xl bg-yellow-2" flat>
        <q-card-section class="text-orange-6">
          <q-item-label>
          <q-icon name="mdi-information" />
            Si ud. no tiene saldo suficiente en la cuenta henry.perez@gmail.com, puede recargar a través de las aplicaciones
            Transfermóvil y EnZona o a través de las instalaciones de Joven Club.
          </q-item-label>
        </q-card-section>
      </q-card> -->

      <div class="q-pa-md">        
        <div class="q-gutter-y-md">
          <!-- <q-tabs
            v-model="tab"
            shrink
            stretch
            dense
            class="text-white"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab v-for="tab in tabs" :key="tab.name" v-bind="tab" />
          </q-tabs>

          <q-tab-panels
            class="bg-transparent"
            v-model="tab"
            animated
            swipeable
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="servicios"> -->
              <div class="q-mr-xl row justify-end text-white text-bold">
                <q-toggle v-model="vistaTabla" :val="vistaTabla" label="Ver como Tabla" />
              </div>

              <div v-if="$q.screen.gt.xs">
                <div class="row q-col-gutter-md" v-if="$store.state.pedidos.length !== 0 && vistaTabla === false">
                  <div class="col-4" v-for="pedido in $store.state.pedidos" :key="pedido.id">
                    <q-card class="my-content" bordered>
                      <q-card-section>
                        <q-item-label>
                          <small><strong>Servicio solicitado: </strong>{{ pedido.servicio.nombre }}</small>
                        </q-item-label>

                        <div class="row justify-between">
                          <div class="col">
                            <q-item-label>
                              <small><strong>Precio: </strong>{{ pedido.servicio.tarifa }}</small>
                            </q-item-label>

                            <q-item-label>
                              <small><strong>Momento: </strong>{{ pedido.momento }}</small>
                            </q-item-label>

                            <q-item-label>
                              <small><strong>Estado: </strong></small>
                              <small class="text-red" v-if="pedido.estado=='cancelado'">{{ pedido.estado }}</small>
                              <small class="text-blue" v-if="pedido.estado=='pendiente'">{{ pedido.estado }}</small>
                              <small class="text-orange" v-if="pedido.estado=='procesando_pago'">{{ pedido.estado }}</small>
                              <small class="text-purple" v-if="pedido.estado=='asignado'">{{ pedido.estado }}</small>
                              <small class="text-green" v-if="pedido.estado=='ofrecido'">{{ pedido.estado }}</small>
                            </q-item-label>
                          </div>

                          <q-img class="q-mt-sm col"
                            :src="'img/servicios/' + pedido.servicio.foto"
                            :lazy-src="'img/servicios/' + pedido.servicio.foto"
                          />
                        </div>
                      </q-card-section>

                      <q-card-actions class="q-mb-none row justify-between">
                        <q-btn
                          class="text-red"
                          icon="cancel"
                          dense
                          size="sm"
                          flat
                          label="Cancelar"
                          @click="$store.state.dialogo.cancelarPedido = true"
                          v-if="pedido.estado == 'pendiente'"
                        />

                        <div v-else>&nbsp;</div>

                        <q-btn
                          class="text-primary"
                          flat
                          dense
                          size="sm"
                          label="Detalles" @click="detallesPedido(pedido)"
                        />
                      </q-card-actions>
                    </q-card>
                  </div>
                </div>

                <q-table
                  v-else-if="$store.state.pedidos.length !== 0 && vistaTabla === true"
                  dense
                  :data="this.$store.state.pedidos"
                  :columns="columns"
                  :filter="filter"
                  no-results-label="No se obtuvieron resultados en la búsqueda"
                  color="primary"
                  row-key="name"
                  no-data-label="No hay resultados que mostrar"
                  :loading="loading"
                  loading-label="Obteniendo la información"
                  :visible-columns="visibleColumns"
                >
                  <template v-slot:top="props">
                    <q-space />

                    <div v-if="$q.screen.gt.xs" class="col">
                      <q-toggle v-model="visibleColumns" val="problema" label="Problema" />
                      <q-toggle v-model="visibleColumns" val="servicio" label="Servicio" />
                      <q-toggle v-model="visibleColumns" val="instalacion" label="Instalación" />
                    </div>

                    <q-select
                      v-else
                      v-model="visibleColumns"
                      multiple
                      borderless
                      dense
                      options-dense
                      :display-value="$q.lang.table.columns"
                      emit-value
                      map-options
                      :options="columns"
                      option-value="name"
                      style="min-width: 150px"
                    />

                    <template>
                      <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
                        <q-icon slot="append" name="search" />
                      </q-input>

                      <q-btn
                        flat round dense
                        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                        @click="props.toggleFullscreen"
                        class="q-ml-md"
                      />
                    </template>
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="fecha_pedido" :props="props">{{ props.row.fecha_pedido }}</q-td>
                      <q-td key="problema" :props="props">{{ props.row.problema }}</q-td>
                      <q-td key="momento" :props="props">{{ props.row.momento }}</q-td>
                      <q-td key="servicio" :props="props">{{ props.row.servicio.nombre }}</q-td>
                      <q-td key="instalacion" :props="props">{{ props.row.instalacion.nombre }}</q-td>
                      <q-td key="estado" :props="props">
                        <caption class="text-red" v-if="props.row.estado=='cancelado'">{{ props.row.estado }}</caption>
                        <caption class="text-blue" v-if="props.row.estado=='pendiente'">{{ props.row.estado }}</caption>
                        <caption class="text-purple" v-if="props.row.estado=='asignado'">{{ props.row.estado }}</caption>
                        <caption class="text-green" v-if="props.row.estado=='ofrecido'">{{ props.row.estado }}</caption>
                        <br>
                        <q-rating
                          v-if="$store.state.pedidos.calificacion !== undefined &&
                          $store.state.pedidos.calificacion > 0"
                          size="xs"
                          color="warning"
                          icon="star"
                          readonly
                          :value="$store.state.pedidos.calificacion"
                        />
                      </q-td>
                      <q-td key="actions" :props="props">
                        <q-icon name="mdi-eye-check" size="sm" color="primary" @click="detallesPedido(props.row)"/>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>

                <div class="text-center" v-else>
                  No hay resultados que mostrar. Si desea solicitar un Servicio, ver la sección <a href="#/servicios"> Servicios </a>
                </div>
              </div>

              <div v-else>
                <div v-if="$store.state.pedidos.length !== 0 && vistaTabla === false">
                  <div class="q-mb-md" v-for="pedido in $store.state.pedidos" :key="pedido.id">
                    <q-card class="my-content" bordered>
                      <q-card-section>
                        <q-item-label>
                          <small><strong>Servicio solicitado: </strong>{{ pedido.servicio.nombre }}</small>
                        </q-item-label>

                        <div class="row justify-between">
                          <div class="col">
                            <q-item-label>
                              <small><strong>Precio: </strong>{{ pedido.servicio.tarifa }}</small>
                            </q-item-label>

                            <q-item-label>
                              <small><strong>Momento: </strong>{{ pedido.momento }}</small>
                            </q-item-label>

                            <q-item-label>
                              <small><strong>Estado: </strong></small>
                              <small class="text-red" v-if="pedido.estado=='cancelado'">{{ pedido.estado }}</small>
                              <small class="text-blue" v-if="pedido.estado=='pendiente'">{{ pedido.estado }}</small>
                              <small class="text-orange" v-if="pedido.estado=='procesando_pago'">{{ pedido.estado }}</small>
                              <small class="text-purple" v-if="pedido.estado=='asignado'">{{ pedido.estado }}</small>
                              <small class="text-green" v-if="pedido.estado=='ofrecido'">{{ pedido.estado }}</small>
                            </q-item-label>
                          </div>

                          <q-img class="q-mt-sm col"
                            :src="'img/servicios/' + pedido.servicio.foto"
                            :lazy-src="'img/servicios/' + pedido.servicio.foto"
                          />
                        </div>
                      </q-card-section>

                      <q-card-actions class="q-mb-none row justify-between">
                        <q-btn
                          class="text-red"
                          icon="cancel"
                          dense
                          size="sm"
                          flat
                          label="Cancelar"
                          @click="$store.state.dialogo.cancelarPedido = true"
                          v-if="pedido.estado == 'pendiente'"
                        />

                        <div v-else>&nbsp;</div>

                        <q-btn
                          class="text-primary"
                          flat
                          dense
                          size="sm"
                          label="Detalles" @click="detallesPedido(pedido)"
                        />
                      </q-card-actions>
                    </q-card>
                  </div>
                </div>

                <q-table
                  v-else-if="$store.state.pedidos.length !== 0 && vistaTabla === true"
                  dense
                  :data="this.$store.state.pedidos"
                  :columns="columns"
                  :filter="filter"
                  no-results-label="No se obtuvieron resultados en la búsqueda"
                  color="primary"
                  row-key="name"
                  no-data-label="No hay resultados que mostrar"
                  :loading="loading"
                  loading-label="Obteniendo la información"
                  :visible-columns="visibleColumns"
                >
                  <template v-slot:top="props">
                    <q-space />

                    <div v-if="$q.screen.gt.xs" class="col">
                      <q-toggle v-model="visibleColumns" val="problema" label="Problema" />
                      <q-toggle v-model="visibleColumns" val="momento" label="momento" />
                      <q-toggle v-model="visibleColumns" val="servicio" label="Servicio" />
                      <q-toggle v-model="visibleColumns" val="instalacion" label="Instalación" />
                    </div>

                    <q-select
                      v-else
                      v-model="visibleColumns"
                      multiple
                      borderless
                      dense
                      options-dense
                      :display-value="$q.lang.table.columns"
                      emit-value
                      map-options
                      :options="columns"
                      option-value="name"
                      style="min-width: 150px"
                    />

                    <template>
                      <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
                        <q-icon slot="append" name="search" />
                      </q-input>

                      <q-btn
                        flat round dense
                        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                        @click="props.toggleFullscreen"
                        class="q-ml-md"
                      />
                    </template>
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="fecha_pedido" :props="props">{{ props.row.fecha_pedido }}</q-td>
                      <q-td key="problema" :props="props">{{ props.row.problema }}</q-td>
                      <q-td key="momento" :props="props">{{ props.row.momento }}</q-td>
                      <q-td key="servicio" :props="props">{{ props.row.servicio.nombre }}</q-td>
                      <q-td key="instalacion" :props="props">{{ props.row.instalacion.nombre }}</q-td>
                      <q-td key="estado" :props="props">
                        <caption class="text-red" v-if="props.row.estado=='cancelado'">{{ props.row.estado }}</caption>
                        <caption class="text-blue" v-if="props.row.estado=='pendiente'">{{ props.row.estado }}</caption>
                        <caption class="text-purple" v-if="props.row.estado=='asignado'">{{ props.row.estado }}</caption>
                        <caption class="text-green" v-if="props.row.estado=='ofrecido'">{{ props.row.estado }}</caption>
                        <br>
                        <q-rating
                          v-if="$store.state.pedidos.calificacion !== undefined &&
                          $store.state.pedidos.calificacion > 0"
                          size="xs"
                          color="warning"
                          icon="star"
                          readonly
                          :value="$store.state.pedidos.calificacion"
                        />
                      </q-td>
                      <q-td key="actions" :props="props">
                        <q-icon name="mdi-eye-check" size="sm" color="primary" @click="detallesPedido(props.row)"/>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>

                <div class="text-center" v-else>
                  No hay resultados que mostrar. Si desea solicitar un Servicio, ver la sección <a href="#/servicios"> Servicios </a>
                </div>
              </div>
            <!-- </q-tab-panel>              

            <q-tab-panel name="productos">
              <div class="text-center">
                No hay resultados que mostrar. Si desea descargar uno de nuestros Productos, ver la sección <a href="#/productos"> Productos </a>
              </div>
            </q-tab-panel>
          </q-tab-panels> -->
        </div>
      </div>
    </div>

    <div v-else><NoAcceso /></div>

    <DetallesPedido />
    <CancelarPedido />
  </q-page>
</template>

<script>
const allTabs = [
  { name: 'servicios', label: 'Servicios' },
  { name: 'productos', label: 'Productos' }
]

export default ({
  name: 'Escritorio',

  components: {
    DetallesPedido: require('components/dialogos/DetallesPedido').default,
    NoAcceso: require('components/NoAcceso').default,
    CancelarPedido: require('components/dialogos/CancelarPedido').default
  },

  data: () => ({
    loading: false,
    vistaTabla: false,
    tab: 'servicios',
    tabs: allTabs,
    filter: '',
    visibleColumns: [ 'Problema', 'Servicio', 'Instalación' ],

    columns: [
      {
        name: 'fecha_pedido',
        required: true,
        label: 'Fecha Pedido',
        align: 'left',
        field: 'fecha_pedido',
        format: val => `${val}`,
        sortable: true
      },
      {
        name: 'problema',
        required: false,
        label: 'Problema',
        align: 'left',
        field: 'problema',
        sortable: true
      },
      {
        name: 'momento',
        required: false,
        label: 'Momento',
        align: 'left',
        field: 'momento',
        sortable: true
      },
      {
        name: 'servicio',
        required: false,
        label: 'Servicio',
        align: 'left',
        field: 'servicio',
        sortable: true
      },
      {
        name: 'instalacion',
        required: false,
        label: 'Instalación',
        align: 'left',
        field: 'instalacion',
        sortable: true
      },
      {
        name: 'estado',
        required: true,
        label: 'Estado',
        align: 'left',
        field: 'estado',
        sortable: true
      },
      {
        name: 'actions',
        required: true,
        label: 'Detalles',
        align: 'left',
        field: 'actions',
        sortable: false
      }
    ]
  }),

  computed: {
    allTabs () {
      return allTabs.map(tab => ({
        tab
      }))
    }
  },

  created () {
    this.loading = true
    this.refrescarPedidos()
  },

  methods: {
    refrescarPedidos () {
      console.log('pedidos del user')
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
        ]
      }
      const myfilter = encodeURIComponent(JSON.stringify(filter));
      this.$axios.get(this.$store.state.urlAPI + '/pedidos?filter=' + myfilter).then(response => {
        this.$store.state.pedidos = response.data
        this.$store.state.nombreTrab = ''
        console.log(response.data)
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },

    detallesPedido (pedido) {
      this.$store.state.pedido = pedido
      console.log('mi pedido')
      console.log(this.$store.state.pedido)
      this.$store.state.dialogo.detallesPedido = true
    }
  }
})
</script>

<style scoped>
.my-content {
  padding: 10px 15px;
  border: 1px solid rgba(86,61,124,.2)
}
</style>
